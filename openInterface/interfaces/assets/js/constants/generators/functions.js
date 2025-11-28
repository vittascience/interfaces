// You can modify functions but don't refactoring strings writing format, it is used if python code has to be changed
// Spaces and indents are very important in python code
const FUNCTIONS = {
  /****** COLOUR CATEGORY ******/
    
  // Colour _ set rgb                             
  DEF_COLOUR_RGB:
`def colour_rgb(r, g, b):
  r = round(max(0, min(255, r)))
  g = round(max(0, min(255, g)))
  b = round(max(0, min(255, b)))
  return '#%02x%02x%02x' % (r, g, b)`,

  // Colour _ set rgb                             
  DEF_COLOUR_BLEND:
`def colour_blend(colour1, colour2, ratio):
  r1, r2 = int(colour1[1:3], 16), int(colour2[1:3], 16)
  g1, g2 = int(colour1[3:5], 16), int(colour2[3:5], 16)
  b1, b2 = int(colour1[5:7], 16), int(colour2[5:7], 16)
  ratio = min(1, max(0, ratio))
  r = round(r1 * (1 - ratio) + r2 * ratio)
  g = round(g1 * (1 - ratio) + g2 * ratio)
  b = round(b1 * (1 - ratio) + b2 * ratio)
  return '#%02x%02x%02x' % (r, g, b)`,

  /****** LOOPS CATEGORY ******/

  // Loops _ up range
  DEF_LOOPS_UP_RANGE:
`def upRange(start, stop, step):
  while start <= stop:
    yield start
    start += abs(step)`,

  // Loops _ down range
  DEF_LOOPS_DOWN_RANGE:
`def downRange(start, stop, step):
  while start >= stop:
    yield start
    start -= abs(step)`,

  /****** MATH CATEGORY ******/

  // Python - map
  DEF_PYTHON_MAP:
`def map (value, from_min, from_max, to_min, to_max):
  return round((value-from_min) * (to_max-to_min) / (from_max-from_min) + to_min, 3)`,

  // Math _ is number prime
  DEF_MATH_IS_PRIME:
`def math_isPrime(n):
  if not isinstance(n, int or float):
    try:
      n = float(n)
    except:
      return False
  if n == 2 or n == 3:
    return True
  if n <= 1 or n % 1 != 0 or n % 2 == 0 or n % 3 == 0:
    return False
  for x in range(6, int(math.sqrt(n)) + 2, 6):
    if n % (x - 1) == 0 or n % (x + 1) == 0:
      return False
  return True`,

  // Math _ mean
  DEF_MATH_MEAN:
`def math_mean(myList):
  localList = [e for e in myList if isinstance(e, (int, float))]
  if not localList:
    return None
  return sum(localList) / len(localList)`,

  // Math _ median
  DEF_MATH_MEDIAN:
`def math_median(myList):
    localList = sorted([e for e in myList if isinstance(e, int or float)])
    if not localList: return
    if len(localList) % 2 == 0:
      return (localList[len(localList) // 2 - 1] + localList[len(localList) // 2]) / 2.0
    else:
      return localList[(len(localList) - 1) // 2]`,

  // Math _ modes
  DEF_MATH_MODES:
`def math_modes(some_list):
  modes = []
  counts = []
  maxCount = 1
  for item in some_list:
    found = False
    for count in counts:
      if count[0] == item:
        count[1] += 1
        maxCount = max(maxCount, count[1])
        found = True
    if not found:
      counts.append([item, 1])
  for counted_item, item_count in counts:
    if item_count == maxCount:
      modes.append(counted_item)
  return modes`,

  // Math _ standard deviation
  DEF_MATH_STANDARD_DEVIATION:
`def math_standard_deviation(numbers):
  n = len(numbers)
  if n == 0:
    return
  mean = float(sum(numbers)) / n
  variance = sum((x - mean) ** 2 for x in numbers) / n
  return math.sqrt(variance)`,

  // Math _ random prime number generation
  DEF_MATH_GENERATE_PRIME:
  `def math_generate_prime(bits=16):
    if bits < 8 or bits > 32:
        raise ValueError("bits must be between 8 and 32")
    low = 1 << (bits - 1)
    high = (1 << bits) - 1
    while True:
        n = random.randint(low, high)
        if n % 2 == 0:
            n += 1
        if math_isPrime(n):
            return n
  `,

  // Math _ Greatest Common Divisor
  DEF_MATH_GCD:
  `def math_gcd(a, b):
  while b:
    a, b = b, a % b
  return abs(a)`,
  
  // Math _ Extended Greatest Common Divisor
  DEF_MATH_GCDE:
  `def math_gcde(a, b):
    r, rp = a, b
    u, up = 1, 0
    v, vp = 0, 1
    while rp != 0:
        q = r // rp
        r, rp = rp, r - q * rp
        u, up = up, u - q * up
        v, vp = vp, v - q * vp
    return [r, u, v]`,

  // Math _ Inverse Modulo
  DEF_MATH_MODINV:
  `def math_modinv(a, m):
    m0, x0, x1 = m, 0, 1
    if m == 1:
      return 0
    while a > 1:
      q = a // m
      m, a = a % m, m
      x0, x1 = x1 - q * x0, x0
    if x1 < 0:
      x1 += m0
    return x1`,

  // Math _ RSA keypair generation
  DEF_MATH_RSA_GENERATE_KEYS:
  `def math_RSA_generate_keys(bits=16):
    if bits < 8 or bits > 32:
      raise ValueError("bits must be between 8 and 32")
    p = math_generate_prime(bits)
    q = math_generate_prime(bits)
    while p == q:
      q = math_generate_prime(bits)
    n = p * q
    phi = (p - 1) * (q - 1)
    e = 65537
    if math_gcd(e, phi) != 1:
      e = random.randint(3, phi - 1)
      while math_gcd(e, phi) != 1:
        e = random.randint(3, phi - 1)
    r, u, v = math_gcde(e, phi)
    d = u % phi
    pub = (n, e)
    priv = (n, d)
    return [pub, priv]
  `,

  // Math _ cipher message
  DEF_MATH_RSA_CIPHER_MESSAGE:
  `def math_RSA_cipher_message(message, key):
    n, exp = key
    cipher_numbers = []
    for ch in message:
        m = ord(ch)
        if m >= n:
            raise ValueError("Character code too large for key size.")
        c = pow(m, exp, n)
        cipher_numbers.append(str(c))
    return " ".join(cipher_numbers)
  `,

  // Math _ decipher message
  DEF_MATH_RSA_DECIPHER_MESSAGE:
  `def math_RSA_decipher_message(cipher_text, key):
    n, exp = key
    cipher_numbers = cipher_text.strip().split()
    message_chars = []
    for c_str in cipher_numbers:
        c = int(c_str)
        m = pow(c, exp, n)
        message_chars.append(chr(m))
    return "".join(message_chars)
  `,
  /****** TEXT CATEGORY ******/

  // Text _ random_letter
  DEF_TEXT_RANDOM_LETTER:
`def random_letter(text):
  x = int(random.random() * len(text))
  return text[x]`,

  // Text _ prompt ext
  DEF_TEXT_PROMPT:
`def text_prompt(msg):
  try:
    return raw_input(msg)
  except NameError:
    return input(msg)`,
  
  DEF_TEXT_COUNT_CHARACTERS:
`def count_chars(charType, password):
  upper_count = 0
  lower_count = 0
  digit_count = 0
  special_count = 0

  for char in password:
    if char.isupper():
      upper_count += 1
    elif char.islower():
      lower_count += 1
    elif char.isdigit():
      digit_count += 1
    else:
      special_count += 1

  if charType == 'UPPER':
    return upper_count
  elif charType == 'LOWER':
    return lower_count
  elif charType == 'DIGITS':
    return digit_count
  else:
    return special_count`,
    
  DEF_TEXT_RANDOM_STRING:
`def random_string(length):
  uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  lowercase = 'abcdefghijklmnopqrstuvwxyz'
  digits = '0123456789'
  special_chars = '!@#$%^&*()-_=+[]{}|;:,.<>?/'

  all_chars = uppercase + lowercase + digits + special_chars

  result = ''.join(random.choice(all_chars) for i in range(length))
  return result`,

  DEF_TEXT_CAESAR_CIPHER:
`def caesar_cipher(text, shift, mode):
  result = ""
  for c in text:
    if c.isalpha():
      decalage = shift % 26
      if mode == "DECODE":
          decalage = -decalage
      base = ord('A') if c.isupper() else ord('a')
      result += chr((ord(c) - base + decalage) % 26 + base)
    else:
      result += c
  return result`,

  DEF_TEXT_CAESAR_CIPHER_BRUTE_FORCE:
`def caesar_cipher_brute_force(text, lang="fr"):
  if lang == "en":
    known_words = ["the", "and", "hello", "hi", "you", "are", "is", "this", "that", "of", "to", "a", "i", "it", "we"]
    msg_intro = "Message to decrypt: "
    msg_attempts = "Brute-force decryption attempts:"
    msg_key = "Key"
    msg_score = "score"
    msg_best = "\\nBest match(es):"
  else:
    known_words = ["le", "la", "les", "de", "des", "et", "bonjour", "salut", "tu", "es", "un", "une", "je", "il"]
    msg_intro = "Message à décrypter : "
    msg_attempts = "Tentatives de déchiffrement (force brute) :"
    msg_key = "Clé"
    msg_score = "score"
    msg_best = "\\nMeilleure(s) correspondance(s) :"

  best_results = []
  best_score = 0

  print(msg_intro + text)
  print(msg_attempts)

  for key in range(1, 26):
    attempt = caesar_cipher(text, key, "DECODE")
    score = 0
    lower_text = attempt.lower()

    for word in known_words:
      if word in lower_text:
        score += 1

    print("{} {:2d} : {} ({}: {})".format(msg_key, key, attempt, msg_score, score))

    if score > best_score:
      best_results = [(key, attempt)]
      best_score = score
    elif score == best_score:
      best_results.append((key, attempt))

  print(msg_best)
  for k, txt in best_results:
    print(">> {} {:2d} : {}".format(msg_key, k, txt))

  return [txt for _, txt in best_results]`,
  /****** LISTS CATEGORY ******/

  // Lists _ remove random item
  DEF_LISTS_REMOVE_RANDOM_ITEM:
`def remove_randomItem(myList):
  x = int(random.random() * len(myList))
  return myList.pop(x)`,

  // Lists _ sort
  DEF_LISTS_SORT:
`def lists_sort(my_list, type, reverse):
  def try_float(s):
    try:
      return float(s)
    except:
      return 0
  key_funcs = {
    'NUMERIC': try_float,
    'TEXT': str,
    'IGNORE_CASE': lambda s: str(s).lower()
  }
  key_func = key_funcs[type]
  list_cpy = list(my_list) # Clone the list.
  return sorted(list_cpy, key=key_func, reverse=reverse)`,

  //VITTAIA
  DEF_VITTAIA_GET_BEST_PROBABILITY_CLASS: 
`def get_best_probability_class(data, key = None):
  sorted_data = sorted(data, key=lambda x: x[1], reverse=True)[0]
  if key == "class":
    return sorted_data[0]
  elif key == "rate":
    return sorted_data[1]`,

/****** CAMERAS CATEGORY ******/

  // Wio Lite
  DEF_WIO_GET_INFO:
`def wio_get_info(data):
  info = wio.readfrom_mem(wio_addr, 1, 2)
  if data == "status":
    return info[0]
  elif data == "version":
    return info[1]
  else:
    return info`,
  
  DEF_WIO_GET_CLASS_DATA: 
`def wio_get_class_data(data = None):
  utime.sleep(1)
  byte_result = wio.readfrom_mem(wio_addr, 3, 10)
  integer_result = [int(byte) for byte in byte_result]
  if data == "max":
    return integer_result.index(max(integer_result)) + 1
  elif isinstance(data, int) and len(integer_result) > data and (data - 1) >= 0:
    return integer_result[data - 1]
  else:
    return integer_result`  
};