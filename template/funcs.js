function insertURLParam(key, value) {
    key = encodeURI(key); value = encodeURI(value);
    var kvp = document.location.search.substr(1).split('&');
    var i = kvp.length; var x; while (i--) {
        x = kvp[i].split('=');

        if (x[0] == key) {
            x[1] = value;
            kvp[i] = x.join('=');
            break;
        }
    }
    if (i < 0) { kvp[kvp.length] = [key, value].join('='); }
    document.location.search = kvp.join('&');
}

function getURLParam(key) {
    var url = new URL(window.location.href);
    return url.searchParams.get(key);
}

var curr_lang = '';

function getCurrentLanguage() {
    if (curr_lang == '') {
        curr_lang = getURLParam('lang');
        if (curr_lang == '' || curr_lang == null) curr_lang = 'en';
    }
    return curr_lang;
}

var logGTS = true;

function _gts(section, key) {
    try
    {
        var xLang = getCurrentLanguage();
        if (section == 'armor' && key.includes('LV') && key.includes('Slot')) {
            var xString = _gts('armor', 'lvlarmor');
            var xLv = key.trim().split(' ')[0];
            var xSlot = _gts('armorcalc', 'Slots');
            var xPiece = _gts('armorcalc', key.trim().split(' ')[2]);
            return xString.replace('{L}', xLv).replace('{S}', xSlot).replace('{A}', xPiece);
        }
        if (xLang in _translations[section][key])
            return toEncodedString(_translations[section][key][xLang]);
        return toEncodedString(_translations[section][key]['en']);
    }
    catch(err) {
        if (logGTS) {
            console.log(section + ' - ' + key);
        }
        return toEncodedString(key);
    }
}

function toEncodedString(obj) {
    return typeof obj === "object" && obj && 0 === obj.gb ? obj.content : String(obj).replace(encodeRegex, htmlEncode);
}

var encodeRegex = /[\x00\x22\x26\x27\x3c\x3e]/g,
    jb = /[\x00- \x22\x27-\x29\x3c\x3e\\\x7b\x7d\x7f\x85\xa0\u2028\u2029\uff01\uff03\uff04\uff06-\uff0c\uff0f\uff1a\uff1b\uff1d\uff1f\uff20\uff3b\uff3d]/g;

var _html_characters = {
    "\x00": "&#0;",
    '"': "&quot;",
    "&": "&amp;",
    "'": "&#39;",
    "<": "&lt;",
    ">": "&gt;",
    "\t": "&#9;",
    "\n": "&#10;",
    "\x0B": "&#11;",
    "\f": "&#12;",
    "\r": "&#13;",
    " ": "&#32;",
    "-": "&#45;",
    "/": "&#47;",
    "=": "&#61;",
    "`": "&#96;",
    "\u0085": "&#133;",
    "\u00a0": "&#160;",
    "\u2028": "&#8232;",
    "\u2029": "&#8233;"
};

function htmlEncode(c) {
    return _html_characters[c];
}
