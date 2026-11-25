// Ace highlighting for PICAXE BASIC (Ace ships no BASIC mode). Case-insensitive like the PICAXE compilers.
ace.define("ace/mode/picaxe_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function (require, exports, module) {
    "use strict";
    const oop = require("ace/lib/oop");
    const TextHighlightRules = require("ace/mode/text_highlight_rules").TextHighlightRules;

    const PicaxeHighlightRules = function () {
        const keywordMapper = this.createKeywordMapper({
            "keyword.control": "if|then|else|elseif|endif|do|loop|while|until|for|to|step|next|goto|gosub|return|"
                + "select|case|endselect|exit|end|stop|on|branch|symbol|let|data|eeprom|table|is",
            "keyword.operator": "and|or|xor|nand|nor|xornot|andnot|ornot|not|min|max|rev|dig|dcd|ncd|sqr|sin|cos|abs|atan|inv",
            "support.function": "high|low|toggle|input|output|reverse|pause|pauseus|wait|sound|tune|play|servo|servopos|"
                + "readadc|readadc10|readtemp|readtemp12|sertxd|serrxd|serin|serout|hserin|hserout|hi2csetup|hi2cin|hi2cout|"
                + "hspisetup|hspiin|hspiout|pwmout|pwmduty|count|pulsin|pulsout|button|random|read|write|readtable|peek|poke|"
                + "lookup|lookdown|bintoascii|bcdtoascii|irin|irout|infrain|infrain2|ultra|touch|touch16|setfreq|setint|"
                + "settimer|sleep|nap|doze|hibernate|reset|debug|debugoff|inc|dec|bit|byte|word|pullup|outpins|pins|dirs",
            "variable.language": "time|timer|ptr|flags"
        }, "identifier", true);

        this.$rules = {
            "start": [
                { token: "comment", regex: "[';].*$" },
                { token: "comment", regex: "\\brem\\b.*$", caseInsensitive: true },
                { token: "comment", regex: "#rem\\b", caseInsensitive: true, next: "rem" },
                { token: "keyword.other", regex: "#\\w+", caseInsensitive: true },
                { token: "string", regex: '"[^"]*"' },
                { token: "constant.numeric", regex: "%[01_]+|\\$[0-9a-fA-F]+|\\b\\d+\\b" },
                // b0, w3, bit7, B.0, pinC.3, outpinB.1, dirsA
                { token: "variable", regex: "\\b(?:b\\d+|w\\d+|bit\\d+|(?:out|dir)?pin[a-d]?\\.?\\d*|[a-d]\\.\\d)\\b", caseInsensitive: true },
                { token: "entity.name.function", regex: "^\\s*[a-zA-Z_]\\w*:" },
                { token: keywordMapper, regex: "[a-zA-Z_]\\w*\\b" },
                { token: "keyword.operator", regex: "[-+*/=<>&|^!]+|//|\\*\\*" },
                { token: "paren.lparen", regex: "[\\[(]" },
                { token: "paren.rparen", regex: "[\\])]" }
            ],
            "rem": [
                { token: "comment", regex: "#endrem\\b", caseInsensitive: true, next: "start" },
                { defaultToken: "comment" }
            ]
        };
        this.normalizeRules();
    };
    oop.inherits(PicaxeHighlightRules, TextHighlightRules);
    exports.PicaxeHighlightRules = PicaxeHighlightRules;
});

ace.define("ace/mode/picaxe", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text", "ace/mode/picaxe_highlight_rules"], function (require, exports, module) {
    "use strict";
    const oop = require("ace/lib/oop");
    const TextMode = require("ace/mode/text").Mode;
    const Mode = function () {
        this.HighlightRules = require("ace/mode/picaxe_highlight_rules").PicaxeHighlightRules;
    };
    oop.inherits(Mode, TextMode);
    Mode.prototype.lineCommentStart = "'";
    Mode.prototype.$id = "ace/mode/picaxe";
    exports.Mode = Mode;
});
