// You can modify functions but don't refactoring strings writing format, it is used if python code has to be changed
// Spaces and indents are very important in python code/***** INPUT/OUTPUT CATEGORY ****/
const FUNCTIONS_NAO = {
    GAME_CAPITAL_INIT: `
def game_capital_init():
    asr.setLanguage("French")
    asr.setVocabulary([data["capital"] for data in countries.values()])
`,
    GAME_GET_RANDOM_COUNTRY: `
def game_get_random_country():
    return random.choice(list(countries.keys()))
`,
    GAME_COUNTRY_PLAY: `
def game_play(country):
    global countries
    tts.say("Quelle est la capitale {pronounced} ?".format(pronounced=countries[country]["pronounced"]))
    time.sleep(1)
    asr.startRecognition(on_speech_recognized)
`,
    GAME_PLAY_CURRENT_SCENE: `
def game_play_current_scene(scene):
    tts.say(story[scene]["text"])
    return story[scene]["choices"]
`,
    GAME_GET_STORY_CHOICE: `
def game_get_story_choice(value):
    global current_scene
    current_scene = value
    return current_scene
`,
    GAME_MENTAL_MATH_INIT: `
def game_mental_math_init():
    asr.setLanguage("French")
    asr.setVocabulary(mental_math_numbers)
`,
    GAME_MENTAL_MATH_PLAY: `
def game_mental_math_play(operation):
    random_number_a = random.randint(5, 20)
    random_number_b = random.randint(5, 20)
    if operation == "add":
        tts.say(("Combien font {a} plus {b} ?".format(a=random_number_a, b=random_number_b)))
        return random_number_a + random_number_b
    elif operation == "sub":
        if random_number_a < random_number_b:
            random_number_a, random_number_b = random_number_b, random_number_a
        tts.say(("Combien font {a} moins {b} ?".format(a=random_number_a, b=random_number_b)))
        print(random_number_a, random_number_b)
        return random_number_a - random_number_b
    elif operation == "random":
        random_operation = random.choice(["add", "sub"])
        return game_mental_math_play(random_operation)
`
};
