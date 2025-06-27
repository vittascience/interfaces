function parseToUrl(string) {
    let html = string.replace(/[éèêëȩęɇěėẹēẽÉÈÊËȨĘɆĚĖẸĒẼ]/gi, "e")
    html = html.replace(/[áàäâa̧ąⱥǎȧạāãÁÀÂÄA̧ĄȺǍȦẠĀÃ]/gi, "a")
    html = html.replace(/[ćc̀ĉc̈çc̨ȼčċc̣c̄c̃ĆC̀ĈC̈ÇC̨ȻČĊC̣C̄C̃]/gi, "c")
    html = html.replace(/[íìîïi̧įɨǐiịīĩÍÌÎÏI̧ĮƗǏİỊĪĨ]/gi, "i")
    html = html.replace(/[j́j̀ĵj̈j̨j̨ɉǰjj̄j̃j̣J̣J́J̀ĴJ̈J̨ɈJ̌J̇J̄J̃]/gi, "j")
    html = html.replace(/[óòôöoǫøɵǒȯọōõÓÒÔÖO̧ǪØƟǑȮỌŌÕ]/gi, "o")
    html = html.replace(/[úùûüu̧ųʉǔu̇ụūũÚÙÛÜU̧ŲɄǓU̇ỤŪŨ]/gi, "u")
    html = html.replace(/[ýỳŷÿy̨ɏy̌ẏỵȳỹÝỲŶŸY̨ɎY̌ẎỴȲỸ]/gi, "y")
    html = html.replace(/[źz̀ẑz̈z̧z̨ƶžżẓz̄z̃ŹZ̀ẐZ̈Z̧Z̨ƵŽŻẒZ̄Z̃]/gi, "z")
    html = html.replace(/[0-9]+[.]/gi, "")
    html = html.replace(/[ *+~.()'":@,`’]/gi, "-")
    html = html.replace(/[-]+/gi, "-")
    html = html.replace(/^[-]/gi, "")
    html = html.replace(/[-]$/gi, "")
    html = html.toLowerCase()
    return html
}
