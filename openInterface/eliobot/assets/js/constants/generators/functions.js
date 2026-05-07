// You can modify functions but don't refactoring strings writing format, it is used if python code has to be changed
// Spaces and indents are very important in python code
const FUNCTIONS_ELIOBOT = {
DEF_MEASURE_DISTANCE:
`def measure_distance():
    trigger.value = True
    time.sleep(0.00001)
    trigger.value = False

    echo.clear()
    echo.resume()

    start = time.monotonic()
    while len(echo) == 0:
        if time.monotonic() - start > 0.2:
            echo.pause()
            return None

    echo.pause()
    duration = echo[0] / 1000000  # Convertir à des secondes
    distance = (duration * 34300) / 2
    return distance
`
};