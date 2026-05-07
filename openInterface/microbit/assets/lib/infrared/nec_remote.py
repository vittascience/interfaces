from ir_receiver import IR_RX
import gc

class NEC_ABC(IR_RX):
  def __init__(self, pin, extended, callback, *args):
    super().__init__(pin, callback, *args)
    self._extended = extended
    self._addr = 0

  def decode(self):
    cmd = 0
    addr = 0
    ext = 0

    try:
      gc.collect()
      if not self._cb_pin():
        raise RuntimeError(self.BADSTART)

      if self._times_len == 2:
        if self.is_around(self._times[0], 9000, 2500) and self.is_around(self._times[1], 2250, 800):
          raise RuntimeError(self.REPEAT)
        raise RuntimeError(self.OVERRUN)

      if self._times_len < 20:
        raise RuntimeError(self.OVERRUN)

      if not self.is_around(self._times[0], 9000, 2500) or not self.is_around(self._times[1], 4500, 1400):
        raise RuntimeError(self.BADSTART)

      bits = self.extract_bits(self._times, self._times_len)

      #print("bits_str:", ''.join(str(b) for b in bits))
      #print("len(bits):", len(bits))

      repaired = self.repair_nec_frame(bits, self._extended)
      if repaired is None:
        raise RuntimeError(self.BADDATA)

      addr, cmd, repaired_bits = repaired
      ext = addr
      self._addr = addr

      #print("repaired_bits:", ''.join(str(b) for b in repaired_bits))
      print("addr=0x{:02x} cmd=0x{:02x}".format(addr, cmd))

    except RuntimeError as e:
      if e.args[0] == self.REPEAT:
        self.do_callback(self.REPEAT, self._addr, self._addr, self.REPEAT)
      return

    self.do_callback(cmd, addr, ext, self.REPEAT)

  def extract_bits(self, times, length):
    bits = []
    i = 2

    while i + 1 < length and len(bits) < 40:
      dl = times[i]
      dh = times[i + 1]

      if dl is None or dh is None:
        bits.append(2)
        i += 2
        continue

      if not self.is_around(dl, 560, 260):
        bits.append(2)
        i += 2
        continue

      if 250 <= dh <= 900:
        bits.append(0)
      elif 1200 <= dh <= 2100:
        bits.append(1)
      else:
        bits.append(2)

      i += 2

    return bits

  def repair_nec_frame(self, bits, extended=False):
    candidates = self.generate_frame_candidates(bits)
    best = None
    best_score = -10**9

    for cand in candidates:
      fixed = self.try_fix_candidate(cand, extended)
      if fixed is None:
        continue

      score, addr, cmd, repaired_bits = fixed

      if score > best_score:
        best_score = score
        best = (addr, cmd, repaired_bits)

    return best

  def generate_frame_candidates(self, bits):
    n = len(bits)
    out = []
    seen = set()

    def add(c):
      if len(c) != 32:
        return
      key = tuple(c)
      if key not in seen:
        seen.add(key)
        out.append(c)

    # 1) Fenêtres directes
    if n >= 32:
      for start in range(0, n - 31):
        add(bits[start:start + 32])

    # 2) Si 31 bits : insertion d'un bit
    if n == 31:
      for pos in range(32):
        add(bits[:pos] + [2] + bits[pos:])
        add(bits[:pos] + [0] + bits[pos:])
        add(bits[:pos] + [1] + bits[pos:])

    # 3) Si 33 bits : suppression d'un bit
    if n == 33:
      for pos in range(33):
        add(bits[:pos] + bits[pos + 1:])

    # 4) Si 32 bits : on essaie aussi une micro-correction locale
    if n == 32:
      add(bits[:])

      for pos in range(32):
        if bits[pos] == 2:
          add(bits[:pos] + [0] + bits[pos + 1:])
          add(bits[:pos] + [1] + bits[pos + 1:])

      # simulation d'un bit parasite inséré puis suppression
      for pos in range(32):
        tmp = bits[:]
        if tmp[pos] == 2:
          tmp[pos] = 0
          add(tmp[:])
          tmp2 = bits[:]
          tmp2[pos] = 1
          add(tmp2[:])

    # 5) Cas 30 bits : deux insertions
    if n == 30:
      for p1 in range(31):
        base1 = bits[:p1] + [2] + bits[p1:]
        for p2 in range(32):
          add(base1[:p2] + [2] + base1[p2:])

    return out

  def try_fix_candidate(self, bits, extended=False):
    bits = bits[:]
    if len(bits) != 32:
      return None

    score = 0
    unknown_count = bits.count(2)

    def fix_complement_pair(start_a, start_b):
      nonlocal score
      for i in range(8):
        ia = start_a + i
        ib = start_b + i
        a = bits[ia]
        b = bits[ib]

        if a in (0, 1) and b in (0, 1):
          if b != (a ^ 1):
            return False
          score += 3
        elif a in (0, 1) and b == 2:
          bits[ib] = a ^ 1
          score += 1
        elif a == 2 and b in (0, 1):
          bits[ia] = b ^ 1
          score += 1
        else:
          # deux inconnus : on crée une paire valide mais on pénalise
          bits[ia] = 0
          bits[ib] = 1
          score -= 2
      return True

    if extended:
      if not fix_complement_pair(16, 24):
        return None
    else:
      if not fix_complement_pair(0, 8):
        return None
      if not fix_complement_pair(16, 24):
        return None

    # plus il y avait d'inconnus au départ, plus on pénalise
    score -= unknown_count * 2

    b0 = self.binToInt(bits[0:8])
    b1 = self.binToInt(bits[8:16])
    b2 = self.binToInt(bits[16:24])
    b3 = self.binToInt(bits[24:32])

    if min(b0, b1, b2, b3) < 0:
      return None

    if extended:
      addr = (b1 << 8) | b0
    else:
      if b1 != (b0 ^ 0xff):
        return None
      addr = b0

    if b3 != (b2 ^ 0xff):
      return None

    cmd = b2

    # bonus si adresse classique de ta télécommande
    if not extended and addr == 0x00:
      score += 8

    # bonus si la commande fait partie des touches connues du modèle Basic Black
    known_cmds = {
      0x45, 0x46, 0x47, 0x44, 0x40, 0x43, 0x07, 0x15, 0x09,
      0x16, 0x19, 0x0d, 0x0c, 0x18, 0x5e, 0x08, 0x1c, 0x5a,
      0x42, 0x52, 0x4a
    }
    if cmd in known_cmds:
      score += 6

    return (score, addr, cmd, bits)

  def binToInt(self, bits):
    v = 0
    for i, b in enumerate(bits):
      if b not in (0, 1):
        return -1
      v |= (b << i)
    return v

  def is_around(self, value, ref, offset=200):
    return value is not None and abs(value - ref) <= offset


class NEC_8(NEC_ABC):
  def __init__(self, pin, callback, *args):
    super().__init__(pin, False, callback, *args)


class NEC_16(NEC_ABC):
  def __init__(self, pin, callback, *args):
    super().__init__(pin, True, callback, *args)