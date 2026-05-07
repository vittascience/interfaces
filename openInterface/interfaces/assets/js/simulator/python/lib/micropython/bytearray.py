class bytearray:
    """
    Version simplifiée de bytearray en Python pur.
    - Stockage interne : liste d'entiers [0..255]
    - Compatible Skulpt (pas de trucs exotiques)
    """

    def __init__(self, source=None, encoding=None, errors="strict"):
        self._data = []

        # bytearray() -> vide
        if source is None:
            return

        # bytearray(int) -> n zéros
        if isinstance(source, int):
            if source < 0:
                raise ValueError("negative count")
            self._data = [0] * source
            return

        # bytearray(str, "utf-8")
        if isinstance(source, str):
            if encoding is None:
                raise TypeError("string argument without an encoding")
            b = source.encode(encoding, errors)
            self._data = list(b)
            return

        # bytearray(bytes-like / iterable d'entiers)
        try:
            b = bytes(source)
        except TypeError:
            # on suppose iterable d'entiers
            for x in source:
                self._append_int(x)
        else:
            self._data = list(b)

    # ---- helpers internes ----

    def _check_int(self, value):
        if not isinstance(value, int):
            raise TypeError("an integer is required")
        if not 0 <= value <= 255:
            raise ValueError("byte must be in range(0, 256)")
        return value

    def _append_int(self, value):
        self._data.append(self._check_int(value))

    def _norm_index(self, i):
        n = len(self._data)
        if i < 0:
            i += n
        if i < 0 or i >= n:
            raise IndexError("bytearray index out of range")
        return i

    # ---- représentation ----

    def __repr__(self):
        return "bytearray(%r)" % (bytes(self),)

    # ---- length / iteration ----

    def __len__(self):
        return len(self._data)

    def __iter__(self):
        return iter(self._data)

    # ---- accès en lecture ----

    def __getitem__(self, key):
        if isinstance(key, slice):
            return bytearray(self._data[key])
        idx = self._norm_index(key)
        return self._data[idx]

    # ---- accès en écriture ----

    def __setitem__(self, key, value):
        if isinstance(key, slice):
            # assignation de slice
            if isinstance(value, (bytes, bytearray)):
                seq = list(value)
            else:
                seq = [self._check_int(v) for v in value]
            self._data[key] = seq
        else:
            idx = self._norm_index(key)
            self._data[idx] = self._check_int(value)

    # ---- méthodes de modif ----

    def append(self, value):
        self._append_int(value)

    def extend(self, iterable):
        if isinstance(iterable, (bytes, bytearray)):
            for b in iterable:
                self._append_int(b)
        else:
            for x in iterable:
                self._append_int(x)

    def insert(self, index, value):
        value = self._check_int(value)
        if index < 0:
            index = 0
        if index > len(self._data):
            index = len(self._data)
        self._data.insert(index, value)

    def pop(self, index=-1):
        if not self._data:
            raise IndexError("pop from empty bytearray")
        if index == -1:
            return self._data.pop()
        idx = self._norm_index(index)
        return self._data.pop(idx)

    def clear(self):
        self._data[:] = []

    # ---- conversion ----

    def tobytes(self):
        return bytes(self._data)

    def __bytes__(self):
        return self.tobytes()

    # ---- comparaisons simples ----

    def __eq__(self, other):
        if isinstance(other, bytearray):
            return self._data == other._data
        if isinstance(other, (bytes,)):
            return bytes(self) == other
        return NotImplementedError

    # ---- concaténation ----

    def __add__(self, other):
        if isinstance(other, (bytearray, bytes)):
            return bytearray(bytes(self) + bytes(other))
        return NotImplementedError

    def __iadd__(self, other):
        if isinstance(other, (bytearray, bytes)):
            self.extend(other)
            return self
        return NotImplementedError
