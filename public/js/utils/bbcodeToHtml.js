function bbcodeToHtml(html) {
    //iframes
    html = html.replace(/(\[iframe\])(https:\/\/([a-z]*[\.]*)vittascience\.com[a-zA-Z0-9?=;\ufeff&%\\\/\-]+)(\[\/iframe\])/gi, "<iframe width='100%' height='500' frameborder='0' allowfullscreen style='border:1px #d6d6d6 solid;' src=\"$2&embed=1&frameid=" + generateRandomString(6) + "\" data-og-url=\"$2&embed=1&frameid=" + generateRandomString(6) + "\"></iframe>")
    html = html.replace(/(\[iframe\])(http:\/\/51\.178\.95\.45[a-zA-Z0-9?=&\-\/]+)(\[\/iframe\])/gi, "<iframe width='100%' height='500' frameborder='0' allowfullscreen style='border:1px #d6d6d6 solid;' src=\"$2&embed=1&frameid=" + generateRandomString(6) + "\" data-og-url=\"$2&embed=1&frameid=" + generateRandomString(6) + "\"></iframe>")
    html = html.replace(/(\[iframe\])(http:\/\/vittascience[a-zA-Z0-9?=&\-\/\\]+)(\[\/iframe\])/gi, "<iframe width='100%' height='500' frameborder='0' allowfullscreen style='border:1px #d6d6d6 solid;' src=\"$2&embed=1&frameid=" + generateRandomString(6) + "\" data-og-url=\"$2&embed=1&frameid=" + generateRandomString(6) + "\"></iframe>")
    html = html.replace(/(\[iframe\])(https:\/\/(vgamma|valpha|vbeta|vdelta|vdemo).vittascience[a-zA-Z0-9?=&\/\\\.\-]+)(\[\/iframe\])/gi, "<iframe width='100%' height='500' frameborder='0' allowfullscreen style='border:1px #d6d6d6 solid;' src=\"$2&embed=1&frameid=" + generateRandomString(6) + "\" data-og-url=\"$2&embed=1&frameid=" + generateRandomString(6) + "\"></iframe>")

    // Cabri iframe
    html = html.replace(/(\[iframe\])(https:\/\/cabricloud.com[a-zA-Z0-9\-_?=&\/\\]+)(\[\/iframe\])/gi, "<iframe width='100%' height='620' frameborder='0' allowfullscreen style='border:1px #d6d6d6 solid;' src=\"$2\" data-og-url=\"$2\"></iframe>");
    html = html.replace(/(\[iframe\])(https:\/\/view\.genial\.ly[a-zA-Z0-9?=&_\-\/﻿]+)(\[\/iframe\])/gi, "<iframe width='100%' height='500' frameborder='0' allowfullscreen style='border:1px #d6d6d6 solid;' src=\"$2\" data-og-url=\"$2\"></iframe>");
    html = html.replace(/(\[iframe\])(https:\/\/docs\.google\.com[a-zA-Z0-9?=&_\-\/﻿]+)(\[\/iframe\])/gi, "<iframe width='100%' height='500' frameborder='0' allowfullscreen style='border:1px #d6d6d6 solid;' src=\"$2\" data-og-url=\"$2\"></iframe>");

    //url
    html = html.replace(/(href=)/gi, " target=\"_blank\" $1")
    html = html.replace(/(\[url=)(.+?(?=\]))(\])(.+?(?=\[))(\[\/url\])/gi, "<a href='$2' target=\"_blank\">$4</a>")

    //pdf
    html = html.replace(/\[embed title=(.+)\](.+)(\[\/embed\])/gi, "<embed width=100% height=500 type=\"application/pdf\" src=\"$2\"/ title=\"$1\">")
    html = html.replace(/(\[embed\])(.+)(\[\/embed\])/gi, "<embed width=100% height=500 type=\"application/pdf\" src=\"$2\"/>")
    html = html.replace(/\[embed=A4\](.+)\[\/embed\]/gi, "<embed class='pdf-a4' type='application/pdf' src='$1'/>")

    //vimeo
    html = html.replace(/(\[vimeo\])([a-zA-Z0-9?=\-_&\/]+)(\[\/vimeo\])/gi, "<iframe src=\"https://player.vimeo.com/video/$2\" data-og-url=\"https://player.vimeo.com/video/$2\" allowfullscreen allow='autoplay'>")
    //youtube
    html = html.replace(/(\[video\])([a-zA-Z0-9?=\-_&\/]+)(\[\/video\])/gi, "<iframe src='https://www.youtube.com/embed/$2' width=\"100%\" height=\"480\" data-is-video='true' data-og-url='https://www.youtube.com/embed/$2' width=\"100%\" height=\"480\" frameborder=\"0\" allowfullscreen></iframe>")

    //peertube
    html = html.replace(/(\[peertube\])([a-zA-Z0-9?=\-_&.:\/]+)(\[\/peertube\])/gi, "<iframe src='$2' data-og-url='$2' width=\"100%\" height=\"480\" frameborder=\"0\" allowfullscreen></iframe>")

    //bold
    html = html.replace(/\[b\]/gi, "<strong>")
    html = html.replace(/\[\/b\]/gi, "</strong>")

    //required equipment
    html = html.replace(/\[fa-list\]/gi, "<ul class='fa-ul'>");
    html = html.replace(/(\[fa-url=)(.+?(?=\]))(\])(.+?(?=\[))(\[\/url\])/gi, "<a href='$2' target=\"_blank\"><span class=\"fa-li tutorial-product-list\"><i class=\"fas fa-square\"></i></span> $4</a>");
    html = html.replace(/\[fa-\*\]/gi, "<span class=\"fa-li tutorial-product-list\"><i class=\"fas fa-square\"></i></span>")

    //list
    // unordered
    html = html.replace(/\[list\]/gi, "<ul>")
    html = html.replace(/\[\/list\]/gi, "</ul><br>")
    // ordered
    html = html.replace(/\[list=1\]/gi, "<ol>")
    html = html.replace(/\[\/list=1\]/gi, "</ol><br>")
    html = html.replace(/\[\*\]/gi, "<li>")
    html = html.replace(/\[\/\*\]/gi, "</li>")
    //italic
    html = html.replace(/\[i\]/gi, "<i>")
    html = html.replace(/\[\/i\]/gi, "</i>")
    //underline
    html = html.replace(/\[u\]/gi, "<u>")

    html = html.replace(/\[\/u\]/gi, "</u>")

    //image
    html = html.replace(/\[img(\s+[a-zA-Z0-9]+=[^\]]+)*\](.*?)\[\/img\]/gi, function(match, params, url) {
        let result = `<img src='${url}' class='img-fluid'`;
        if (params) {
            let parsedParams = parseBBCodeTagParams(params);
            if (parsedParams["title"] != undefined) {
              result += ` title='${parsedParams["title"]}' alt='${parsedParams["title"]}'`;
            }
            if (parsedParams["max-width"] != undefined) {
              result += ` style='max-width:${parsedParams["max-width"]} !important;'`;
            }
          }
          result += '/>';
          return result;
      });

    //line return
    html = html.replace(/\n/gi, "<br>")
    //exponent
    html = html.replace(/\[exp\]/gi, "<sup>")
    html = html.replace(/\[\/exp\]/gi, "</sup>")
    //right
    html = html.replace(/\[right\]/gi, "<p style='text-align:right;'>")
    html = html.replace(/\[\/right\]/gi, "</p>")
    //left
    html = html.replace(/\[left\]/gi, "<p style='text-align:left;'>")
    html = html.replace(/\[\/left\]/gi, "</p>")
    //center
    html = html.replace(/\[center\]/gi, "<p style='text-align:center;'>")
    html = html.replace(/\[\/center\]/gi, "</p>")
    // color
    html = html.replace(/\[color=([a-zA-Z0-9#]+)\]/gi, "<span style='color:$1;'>")
    html = html.replace(/\[\/color\]/gi, "</span>")
    //quote
    html = html.replace(/\[quote([=]?.*?)\]/gi, "<p style='font-style: italic;'>$1 a dit : </p><p style='text-align:center;background-color:var(--bg-1);'><span style='font-size:2em;'>\"</span>")
    html = html.replace(/\[\/quote\]/gi, "<span style='font-size:2em;'>\"</span></p>")

    //strikethrough text
    html = html.replace(/\[s\]/gi, "<strike>")
    html = html.replace(/\[\/s\]/gi, "</strike>")

    // math index bbcode
    html = html.replace(/\[sub\]/gi, "<sub>")
    html = html.replace(/\[\/sub\]/gi, "</sub>")

    // exponent bbcode
    html = html.replace(/\[sup\]/gi, "<sup>")
    html = html.replace(/\[\/sup\]/gi, "</sup>")

    // code 
    html = html.replace(/\[code\]/gi, "<div style='background:#e9e9e9;padding:0.5rem;max-height:500px;overflow-y:auto;'><code>")
    html = html.replace(/\[\/code\]/gi, "</code></div>")
    //size
    html = html.replace(/\[size\=([0-9]{1,3})]/gi, "<span style='font-size:$1px;'>")
    html = html.replace(/\[\/size\]/gi, "</span>")
    return html
}

function generateRandomString(length = 10) {
    let characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let randomString = '';
    for (let i = 0; i < length; i++) {
        randomString += characters.charAt(getRandomInt(characters.length - 1));
    }
    return randomString;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function parseBBCodeTagParams(params) {
    let splitParams = params.match(/([A-z-]+)=.+?(?=[A-z-]+=)|([A-z-]+)=.+/gi);
    let parsedParams = {};
    splitParams.forEach(param => {
        let splittedParam = param.split('=')
        parsedParams[splittedParam[0]] = splittedParam[1]
    });
    return parsedParams;
}