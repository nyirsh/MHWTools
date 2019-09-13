function changeLoadedGear(firstTime) {
    pa = [];
    if ($("#chkLRGear").prop('checked') == true) {
        loadExternalArmors("LR", "index");
    }
    if ($("#chkHRGear").prop('checked') == true) {
        loadExternalArmors("HR", "index");
    }
    if (firstTime == true || $("#chkMRGear").prop('checked') == true) {
        loadExternalArmors("MR", "index");
    }
    if ($("#chkCHGear").prop('checked') == false) {
        loadExternalArmors("CH", "index");
    }
    loadExternalArmors("CH", "maxindex");    
}

function loadExternalArmors(level, index) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "/MHWTools/armorcalc/armors/" + level + "/" + index + ".js?" + new Date().getTime(), false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status === 0) {
                var allArmors = JSON.parse(rawFile.responseText);
                var i;
                for (i = 0; i < allArmors.length; i++) {
                    var varArmorFile = new XMLHttpRequest();
                    varArmorFile.open("GET", "/MHWTools/armorcalc/armors/" + level + "/" + allArmors[i] + ".js?" + new Date().getTime(), false);
                    varArmorFile.onreadystatechange = function () {
                        if (varArmorFile.readyState === 4) {
                            if (varArmorFile.status === 200 || varArmorFile.status === 0) {
                                pa = pa.concat(eval(varArmorFile.responseText));
                            }
                        }
                    }
                    varArmorFile.send(null);
                }
            }
        }
    }
    rawFile.send(null);
}

function findObjectByKey(array, key, value) {
		for (var i = 0; i < array.length; i++) {
			if (array[i][key] === value) {
				return array[i];
			}
		}
		return null;
	}
	
function dbgObj(nyc)
{
	var propValue;
	for(var propName in nyc) {
		propValue = nyc[propName]

		console.log(propName,propValue);
	}
}	

var _uri_characters = {
    "\x00": "%00",
    "\u0001": "%01",
    "\u0002": "%02",
    "\u0003": "%03",
    "\u0004": "%04",
    "\u0005": "%05",
    "\u0006": "%06",
    "\u0007": "%07",
    "\b": "%08",
    "\t": "%09",
    "\n": "%0A",
    "\x0B": "%0B",
    "\f": "%0C",
    "\r": "%0D",
    "\u000e": "%0E",
    "\u000f": "%0F",
    "\u0010": "%10",
    "\u0011": "%11",
    "\u0012": "%12",
    "\u0013": "%13",
    "\u0014": "%14",
    "\u0015": "%15",
    "\u0016": "%16",
    "\u0017": "%17",
    "\u0018": "%18",
    "\u0019": "%19",
    "\u001a": "%1A",
    "\u001b": "%1B",
    "\u001c": "%1C",
    "\u001d": "%1D",
    "\u001e": "%1E",
    "\u001f": "%1F",
    " ": "%20",
    '"': "%22",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "<": "%3C",
    ">": "%3E",
    "\\": "%5C",
    "{": "%7B",
    "}": "%7D",
    "\u007f": "%7F",
    "\u0085": "%C2%85",
    "\u00a0": "%C2%A0",
    "\u2028": "%E2%80%A8",
    "\u2029": "%E2%80%A9",
    "\uff01": "%EF%BC%81",
    "\uff03": "%EF%BC%83",
    "\uff04": "%EF%BC%84",
    "\uff06": "%EF%BC%86",
    "\uff07": "%EF%BC%87",
    "\uff08": "%EF%BC%88",
    "\uff09": "%EF%BC%89",
    "\uff0a": "%EF%BC%8A",
    "\uff0b": "%EF%BC%8B",
    "\uff0c": "%EF%BC%8C",
    "\uff0f": "%EF%BC%8F",
    "\uff1a": "%EF%BC%9A",
    "\uff1b": "%EF%BC%9B",
    "\uff1d": "%EF%BC%9D",
    "\uff1f": "%EF%BC%9F",
    "\uff20": "%EF%BC%A0",
    "\uff3b": "%EF%BC%BB",
    "\uff3d": "%EF%BC%BD"
};

function uriEncode(c) {
    return _uri_characters[c];
}

function get_type(obj) {
    var type_string = typeof obj;
    if ("object" == type_string)
        if (obj) {
            if (obj instanceof Array)
                return "array";
            if (obj instanceof Object)
                return type_string;
            var proto = Object.prototype.toString.call(obj);
            if ("[object Window]" == proto)
                return "object";
            if ("[object Array]" == proto ||
                "number" == typeof obj.length &&
                "undefined" != typeof obj.splice &&
                "undefined" != typeof obj.propertyIsEnumerable &&
                !obj.propertyIsEnumerable("splice"))
                return "array";
            if ("[object Function]" == proto ||
                "undefined" != typeof obj.call &&
                "undefined" != typeof obj.propertyIsEnumerable &&
                !obj.propertyIsEnumerable("call"))
                return "function";
        } else return "null";
    else if ("function" == type_string && "undefined" == typeof obj.call)
        return "object";
    return type_string;
}

function is_array(obj) {
    return "array" == get_type(obj);
}

function is_vector(obj) {
    var type_string = get_type(obj);
    return "array" == type_string || ("object" == type_string && "number" == typeof obj.length);
}

function is_string(obj) {
    return "string" == typeof obj;
}

function isObjOrFunc(obj) {
    var type_string = typeof obj;
    return ("object" == type_string && obj != null) || "function" == type_string;
}

function getElementById(a) {
    return document.getElementById(a);
}









(function() {
    var klass, _app = this;
	
    function init_symbol() {
        Symbol = _app.Symbol || {};
        Symbol.iterator || (Symbol.iterator = "$jscomp$iterator");
        init_symbol = function() {}
    }

    function ea(a) {
        init_symbol();
        if (a[Symbol.iterator])
            return a[Symbol.iterator]();
        if (!(a instanceof Array) && "string" != typeof a)
            throw Error();
        var b = 0;
        return { next: function() { return b == a.length ? { done: !0 } : { done: !1, value: a[b++] } } }
    }

    var var_or_emptyObj = var_or_emptyObj || {};

    function empty_f() {}

    var _sessionId = "closure_uid_" + (1E9 * Math.random() >>> 0);
    var closure_ver = 0;

    function na(a, b, c) {
        return a.call.apply(a.bind, arguments)
    }

    function oa(a, b, c) {
        if (!a)
            throw Error();
        if (2 < arguments.length) {
            var d = Array.prototype.slice.call(arguments, 2);
            return function() {
                var c = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(c, d);
                return a.apply(b, c)
            }
        }
        return function() { return a.apply(b, arguments) }
    }

    function u(a, b, c) {
        u = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? na : oa;
        return u.apply(null, arguments)
    }

    function v(a, b) {
        var c = Array.prototype.slice.call(arguments, 1);
        return function() {
            var b = c.slice();
            b.push.apply(b, arguments);
            return a.apply(this, b)
        }
    }

    var _dateNow = Date.now || function() { return +new Date };

    function y(a, b) {
        var c = a.split("."), d = _app;
        c[0] in d || !d.execScript || d.execScript("var " + c[0]);
        for (var e; c.length && (e = c.shift());) c.length || void 0 === b ? d[e] ? d = d[e] : d = d[e] = {} : d[e] = b
    }

    function A(a, b) {
        function c() {}

        c.prototype = b.prototype;
        a.ra = b.prototype;
        a.prototype = new c;
        a.prototype.constructor = a;
        a.vb = function(a, c, f) {
            for (var g = Array(arguments.length - 2), h = 2; h < arguments.length; h++) g[h - 2] = arguments[h];
            return b.prototype[c].apply(a, g)
        }
    };

    

    var qa = String.prototype.trim
        ? function(a) { return a.trim() }
        : function(a) { return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "") };

    function ra(a, b) { return a < b ? -1 : a > b ? 1 : 0 };

    var C = Array.prototype,
        sa = C.indexOf
            ? function(a, b, c) { return C.indexOf.call(a, b, c) }
            : function(a, b, c) {
                c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
                if (is_string(a)) return is_string(b) && 1 == b.length ? a.indexOf(b, c) : -1;
                for (; c < a.length; c++) if (c in a && a[c] === b) return c;
                return -1
            },
        D = C.forEach
            ? function(a, b, c) { C.forEach.call(a, b, c) }
            : function(a, b, c) {
                for (var d = a.length, e = is_string(a) ? a.split("") : a, f = 0; f < d; f++) f in e && b.call(c, e[f], f, a)
            },
        E = C.filter
            ? function(a, b, c) { return C.filter.call(a, b, c) }
            : function(a, b, c) {
                for (var d = a.length, e = [], f = 0, g = is_string(a) ? a.split("") : a, h = 0; h < d; h++)
                    if (h in g) {
                        var m = g[h];
                        b.call(c, m, h, a) && (e[f++] = m)
                    }
                return e
            },
        F = C.map
            ? function(a, b, c) { return C.map.call(a, b, c) }
            : function(a, b, c) {
                for (var d = a.length, e = Array(d), f = is_string(a) ? a.split("") : a, g = 0; g < d; g++)
                    g in f && (e[g] = b.call(c, f[g], g, a));
                return e
            },
        ta = C.reduce
            ? function(a, b, c, d) {
                d && (b = u(b, d));
                return C.reduce.call(a, b, c)
            }
            : function(a, b, c, d) {
                var e = c;
                D(a, function(c, g) { e = b.call(d, e, c, g, a) });
                return e
            },
        ua = C.every
            ? function(a, b, c) { return C.every.call(a, b, c) }
            : function(a, b, c) {
                for (var d = a.length, e = is_string(a) ? a.split("") : a, f = 0; f < d; f++)
                    if (f in e && !b.call(c, e[f], f, a)) return !1;
                return !0
            };

    function va(a) {
        var b = G, c = 0;
        D(a, function(a, e, f) { b.call(void 0, a, e, f) && ++c }, void 0);
        return c
    }

    function H(a, b) {
        var c = wa(a, b);
        return 0 > c ? null : is_string(a) ? a.charAt(c) : a[c]
    }

    function wa(a, b) {
        for (var c = a.length, d = is_string(a) ? a.split("") : a, e = 0; e < c; e++)
            if (e in d && b.call(void 0, d[e], e, a)) return e;
        return -1
    }

    function I(a, b) { return 0 <= sa(a, b) }

    function xa(a, b) {
        var c = sa(a, b), d;
        (d = 0 <= c) && C.splice.call(a, c, 1);
        return d
    }

    function ya(a, b) {
        var c = wa(a, b);
        return 0 <= c ? (C.splice.call(a, c, 1), !0) : !1
    }

    function Aa(a) { return C.concat.apply(C, arguments) }

    function Ba(a) {
        var b = a.length;
        if (0 < b) {
            for (var c = Array(b), d = 0; d < b; d++) c[d] = a[d];
            return c
        }
        return []
    }

    function Ca(a, b) {
        for (var c = 1; c < arguments.length; c++) {
            var d = arguments[c];
            if (is_vector(d)) {
                var e = a.length || 0, f = d.length || 0;
                a.length = e + f;
                for (var g = 0; g < f; g++) a[e + g] = d[g]
            } else a.push(d)
        }
    }

    function Da(a, b, c) { return 2 >= arguments.length ? C.slice.call(a, b) : C.slice.call(a, b, c) }

    function Ea(a) {
        for (var b = {}, c = 0, d = 0; d < a.length;) {
            var e = a[d++], f = isObjOrFunc(e) ? "o" + (e[_sessionId] || (e[_sessionId] = ++closure_ver)) : (typeof e).charAt(0) + e;
            Object.prototype.hasOwnProperty.call(b, f) || (b[f] = !0, a[c++] = e)
        }
        a.length = c
    }

    function Fa(a, b) { a.sort(b || Ga) }

    function Ga(a, b) { return a > b ? 1 : a < b ? -1 : 0 };

    var _currentUserAgent;
    agent: {
        var _appNavigator = _app.navigator;
        if (_appNavigator) {
            var _appUA = _appNavigator.userAgent;
            if (_appUA) {
                _currentUserAgent = _appUA;
                break agent;
            }
        }
        _currentUserAgent = ""
    };

    function K(a, b, c) { for (var d in a) b.call(c, a[d], d, a) }

    function Ja(a, b) {
        var c = {}, d;
        for (d in a) b.call(void 0, a[d], d, a) && (c[d] = a[d]);
        return c
    }

    function Ka(a, b) {
        var c = {}, d;
        for (d in a) c[d] = b.call(void 0, a[d], d, a);
        return c
    }

    function Oa(a) {
        var b = [], c = 0, d;
        for (d in a) b[c++] = a[d];
        return b
    }

    function Pa(a) {
        var b = [], c = 0, d;
        for (d in a) b[c++] = d;
        return b
    }

    function Qa(a, b, c) { for (var d in a) if (b.call(c, a[d], d, a)) return d }

    function Ra(a, b) {
        var c = Qa(a, b, void 0);
        return c && a[c]
    }

    var Sa = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");

    function Ta(a, b) {
        for (var c, d, e = 1; e < arguments.length; e++) {
            d = arguments[e];
            for (c in d) a[c] = d[c];
            for (var f = 0; f < Sa.length; f++) c = Sa[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
        }
    }

    function Ua(a) {
        var b = arguments.length;
        if (1 == b && is_array(arguments[0])) return Ua.apply(null, arguments[0]);
        for (var c = {}, d = 0; d < b; d++) c[arguments[d]] = !0;
        return c
    };

    function M() { return -1 != _currentUserAgent.indexOf("Edge") };

    var Va = -1 != _currentUserAgent.indexOf("Opera") || -1 != _currentUserAgent.indexOf("OPR"),
        N = -1 != _currentUserAgent.indexOf("Edge") || -1 != _currentUserAgent.indexOf("Trident") || -1 != _currentUserAgent.indexOf("MSIE"),
        Wa = -1 != _currentUserAgent.indexOf("Gecko") &&
            !(-1 != _currentUserAgent.toLowerCase().indexOf("webkit") && !M()) &&
            !(-1 != _currentUserAgent.indexOf("Trident") || -1 != _currentUserAgent.indexOf("MSIE")) &&
            !M(),
        Xa = -1 != _currentUserAgent.toLowerCase().indexOf("webkit") && !M();

    function Ya() {
        var a = _currentUserAgent;
        if (Wa) return /rv\:([^\);]+)(\)|;)/.exec(a);
        if (N && M()) return /Edge\/([\d\.]+)/.exec(a);
        if (N) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
        if (Xa) return /WebKit\/(\S+)/.exec(a)
    }

    function Za() {
        var a = _app.document;
        return a ? a.documentMode : void 0
    }

    var $a = function() {
        if (Va && _app.opera) {
            var a = _app.opera.version;
                return "function" == get_type(a) ? a() : a
            }
            var a = "", b = Ya();
            b && (a = b ? b[1] : "");
            return N && !M() && (b = Za(), b > parseFloat(a)) ? String(b) : a
        }(),
        ab = {};

    function O(a) {
        var b;
        if (!(b = ab[a])) {
            b = 0;
            for (var c = qa(String($a)).split("."),
                d = qa(String(a)).split("."),
                e = Math.max(c.length, d.length),
                f = 0;
                0 == b && f < e;
                f++) {
                var g = c[f] || "", h = d[f] || "", m = /(\d*)(\D*)/g, q = /(\d*)(\D*)/g;
                do {
                    var t = m.exec(g) || ["", "", ""], p = q.exec(h) || ["", "", ""];
                    if (0 == t[0].length && 0 == p[0].length) break;
                    b = ra(0 == t[1].length ? 0 : parseInt(t[1], 10), 0 == p[1].length ? 0 : parseInt(p[1], 10)) ||
                        ra(0 == t[2].length, 0 == p[2].length) ||
                        ra(t[2], p[2])
                } while (0 == b)
            }
            b = ab[a] = 0 <= b
        }
        return b
    }

    var bb = _app.document,
        cb = Za(),
        db = !bb || !N || !cb && M() ? void 0 : cb || ("CSS1Compat" == bb.compatMode ? parseInt($a, 10) : 5);
    !Wa && !N || N && N && (M() || 9 <= db) || Wa && O("1.9.1");
    N && O("9");
    Ua("area base br col command embed hr img input keygen link meta param source track wbr".split(" "));
    N && O(8);

    var gb = /['()]/g;

    function hb(a) { return "%" + a.charCodeAt(0).toString(16) }

    function ib(a) {
        if ("object" === typeof a && 2 === a.gb) return String(a).replace(jb, uriEncode);
        a = encodeURIComponent(String(String(a)));
        gb.lastIndex = 0;
        return gb.test(a) ? a.replace(gb, hb) : a
    }

    function PrintPage(localStorageEnabled, weaponslots) {
        var htmlRet =
            '<style id="checkedskillstyle"></style>' +
            (!localStorageEnabled ? '<div class="alert alert-danger" translation-section="armorcalc" translation-key="localstorage_disabled">' + _gts('armorcalc', 'localstorage_disabled') + '</div>' : "") +
            '<ul class="nav nav-tabs" role="tablist">' +
                '<li class="nav-item" id="tab-search"><a id="search-tab" class="nav-link active" data-toggle="tab" href="#searchpane" aria-controls="searchpane" aria-selected="true" translation-section="armorcalc" translation-key="search">' + _gts('armorcalc', 'search') + '</a></li>' +
                '<li class="nav-item" id="tab-myset"><a id="myset-tab" class="nav-link" data-toggle="tab" href="#mysetpane" aria-controls="mysetpane" aria-selected="false" translation-section="armorcalc" translation-key="armorset">' + _gts('armorcalc', 'armorset') + '</a></li>' +
                '<li class="nav-item" id="tab-excludeinclude"><a id="excludeinclude-tab" class="nav-link" data-toggle="tab" href="#excludeincludepane" aria-controls="excludeincludepane" aria-selected="false" translation-section="armorcalc" translation-key="eqsettings">' + _gts('armorcalc', 'eqsettings') + '</a></li>' +
            '</ul>' +
            '<br />' +
            '<div id="panecontainer" class="tab-content">' +
            '<div id=\'searchpane\' role="tabpanel" aria-labelledby="search-tab" class="tab-pane show active">';


        var topFilters =
            '<div class="row">' +
            '<div class="col col-5 col-sm-3 col-md-3 col-lg-2"><span translation-section="armorcalc" translation-key="sex">' + _gts("armorcalc", "sex") + '</span> <select id="sex" class="filtersInput"><option value="1" translation-section="armorcalc" translation-key="sex_male">' + _gts("armorcalc", "sex_male") + '</option><option value="2" translation-section="armorcalc" translation-key="sex_female">' + _gts("armorcalc", "sex_female") + '</option></select></div>' +
            '<div class="col col-7 col-sm-4 col-md-4 col-lg-3"><span translation-section="armorcalc" translation-key="weaponslots">' + _gts("armorcalc", "weaponslots") + '</span> ' +
            '<select id="weapon" class="filtersInput">';
        for (wsx = 0; wsx < weaponslots.length; wsx++)
        {
            var slotString = '';
            var slotTranslation = '';
            if (weaponslots[wsx].B[0] == 0)
            {
                slotString = _gts('armorcalc', 'none');
                slotTranslation = ' translation-section="armorcalc" translation-key="none" ';
            }
            else
                slotString = weaponslots[wsx].B[0].toString();
            if (weaponslots[wsx].B[1] != 0)
                slotString += '-' + weaponslots[wsx].B[1].toString();
            if (weaponslots[wsx].B[2] != 0)
                slotString += '-' + weaponslots[wsx].B[2].toString();

            topFilters += '<option value="' + toEncodedString(weaponslots[wsx].name) + '"' + slotTranslation + '>' + slotString + "</option>";
        }
        topFilters +=
        '</select>' +
        '</div>' +
        '<div style="display: none;"><input id="limit" value="200"></div>' +
        '</div>' +

        '<div class="row">' +
        '<div class="col col-6 col-sm-4 col-md-3 col-lg-3 col-xl-2"><span translation-section="armorcalc" translation-key="lr">' + _gts('armorcalc', 'lr') + '</span><input type="checkbox" id="chkLRGear" class="filtersInput" onchange="changeLoadedGear()" /></div>' +
        '<div class="col col-6 col-sm-4 col-md-3 col-lg-3 col-xl-2"><span translation-section="armorcalc" translation-key="hr">' + _gts('armorcalc', 'hr') + '</span><input type="checkbox" id="chkHRGear" class="filtersInput" onchange="changeLoadedGear()" /></div>' +
        '<div class="col col-6 col-sm-4 col-md-3 col-lg-3 col-xl-2"><span translation-section="armorcalc" translation-key="mr">' + _gts('armorcalc', 'mr') + '</span><input type="checkbox" id="chkMRGear" class="filtersInput" onchange="changeLoadedGear()" checked /></div>' +
        '<div class="col col-6 col-sm-4 col-md-3 col-lg-3 col-xl-2"><span translation-section="armorcalc" translation-key="maxcharm">' + _gts('armorcalc', 'maxcharm') + '</span><input type="checkbox" id="chkCHGear" class="filtersInput" onchange="changeLoadedGear()" checked /></div>' +
        '</div>' +

        '<div class="row">' +
        '<div class="col col-6 col-sm-4 col-md-3 col-lg-3 col-xl-2"><span translation-section="armorcalc" translation-key="mindef">' + _gts('armorcalc', 'mindef') + '</span><input class="filtersInput" id="mindef" value="0"></div>' +
        '<div class="col col-6 col-sm-4 col-md-3 col-lg-3 col-xl-2">' + GenerateEleResSelect('minres_fire') + '</div>' +
        '<div class="col col-6 col-sm-4 col-md-3 col-lg-3 col-xl-2">' + GenerateEleResSelect('minres_water') + '</div>' +
        '<div class="col col-6 col-sm-4 col-md-3 col-lg-3 col-xl-2">' + GenerateEleResSelect('minres_thunder') + '</div>' +
        '<div class="col col-6 col-sm-4 col-md-3 col-lg-3 col-xl-2">' + GenerateEleResSelect('minres_ice') + '</div>' +
        '<div class="col col-6 col-sm-4 col-md-3 col-lg-3 col-xl-2">' + GenerateEleResSelect('minres_dragon') + '</div>' +
        '</div>' +
        '<div id="skilllistcontainer">';

        var centralSkills = '';
        var isSkillSetSection = false;
        for (var sgx = 0; sgx < _skills.length; sgx++) {
            centralSkills +=
                '<div class="card text-white bg-secondary" style="margin-bottom: 5px;"><div class="card-head"><a style="display: inline-block; width:100%;" class="sectionHeaders text-light" data-toggle="collapse" href="#collapseSS' + _skills[sgx].genre + '" translation-section="armorcalc" translation-key="' + _skills[sgx].genre + '">' + _gts('armorcalc', _skills[sgx].genre) + '</a></div></div>' +
                '<div id="collapseSS' + _skills[sgx].genre + '" class="row panel-collapse collapse show">';

            if (_skills[sgx].skills[0].type == 2)
                isSkillSetSection = true;

            var lastSkill = '';
            for (var sx = 0; sx < _skills[sgx].skills.length; sx++) {
                var currSkill = _skills[sgx].skills[sx].skill;

                if (lastSkill != currSkill)
                {
                    if (sx > 0)
                        centralSkills += '</select>' + (isSkillSetSection ? '</div>' : '') + '</div>';
                    centralSkills +=
                        '<div class="col col-lg-3 col-md-4 col-sm-6 col-12">' +
                        (isSkillSetSection ? '<div class="col col-12" style="padding-left: 0px; padding-right: 9px;">' : '') + '<span translation-section="skills" translation-key="' + toEncodedString(_skills[sgx].skills[sx].skill) + '">' + _gts('skills', _skills[sgx].skills[sx].skill) + '</span>' + (isSkillSetSection ? '</div><div class="col col-xs-12" style="padding-left: 0px; padding-right: 9px;">' : '') +
                        '<select name="skillcb-' + toEncodedString(_skills[sgx].skills[sx].skill) + "\" skillpointname='" + toEncodedString(_skills[sgx].skills[sx].skill) + '\' class="skillitem" onchange="onChangeSkill()"' + (isSkillSetSection ? ' style="float: none; width: 100%;"' : '') + '>' +
                    '<option value="' + toEncodedString(_skills[sgx].skills[sx].skill) + ' Lv0" exclude="1" skill-points="0" skill-name="' + _skills[sgx].skills[sx].skill + '" skill-type="' + _skills[sgx].skills[sx].type + '">' + (isSkillSetSection ? _gts('skills', _skills[sgx].skills[sx].skill) + ' ' : '') + 'LV 0</option>' +
                        '<option value="" selected>-</option>';
                    lastSkill = currSkill;
                }
                centralSkills += '<option value="' + toEncodedString(_skills[sgx].skills[sx].name) + '" skill-points="' + _skills[sgx].skills[sx].points + '" skill-type="' + _skills[sgx].skills[sx].type + '">' + (isSkillSetSection ? _gts('skills', _skills[sgx].skills[sx].name) : 'LV ' + toEncodedString(_skills[sgx].skills[sx].points)) + '</option>';
            }
            centralSkills += '</select>' + (isSkillSetSection ? '</div>' : '') + '</div>';
            isSkillSetSection = false;

            centralSkills += '</div>';
        }
        centralSkills += '</div>';

        var megaVar =
            htmlRet +
            topFilters +
            centralSkills +
            '<div style="clear:both; padding-top: 10px;"><div style="padding-bottom: 10px;">' +
            '<button id=searchbutton><span class="oi oi-magnifying-glass" title="magnifying-glass" aria-hidden="true"></span>&nbsp;<span translation-section="armorcalc" translation-key="btn_search">' + _gts('armorcalc', 'btn_search') + '</span></button> ' +
            '<button id=extraskillsearchbutton><span class="oi oi-plus" title="plus" aria-hidden="true"></span>&nbsp;<span translation-section="armorcalc" translation-key="btn_moreskills">' + _gts('armorcalc', 'btn_moreskills') + '</span></button> ' +
            '<button id=resetbutton><span class="oi oi-loop-circular"></span>&nbsp;<span translation-section="armorcalc" translation-key="btn_resetskills">' + _gts('armorcalc', 'btn_resetskills') + '</span></button></div></div><div id=results>' +
            '</div></div>' +
            '<div id="mysetpane" class="tab-pane" role="tabpanel" aria-labelledby="myset-tab"></div><div id="excludeincludepane" class="tab-pane" role="tabpanel" aria-labelledby="excludeinclude-tab"></div>';

        return megaVar;
    }

    function rb(a) {
        var b = "";
        a = a.i;
        for (var c = a.length, d = 0; d < c; d++) b += ".skill-" + toEncodedString(a[d]) + ",";
        return b + "\n    .dummy-cls {\n      background: #ffc;\n    }\n  "
    }

    function GenerateEleResSelect(id) {
        var gershtml = '<span translation-section="armorcalc" translation-key="' + id + '">' + _gts('armorcalc', id ) + '</span> <select id="' + toEncodedString(id) + '" class="filtersInput"><option value="-100">---</option>';
        for (var b = -25; b < 26; b++)
            gershtml += "<option value=" + toEncodedString(b) + ">" + toEncodedString(b) + "</option>";
        return gershtml + "</select>"
    }

    function showElapsedTime(obj) {
        return toEncodedString(obj.count) + ' ' + _gts('armorcalc', 'results') + ' in ' + toEncodedString(obj.time) + ' ' + _gts('armorcalc', 'seconds');
    }

    function tb(a) {
        var b = "";
        if (0 < a.i.length) {
            for (var c = "", d = a.i, e = d.length, f = 0; f < e; f++)
                c += toEncodedString(d[f]) + " ";
            b += showElapsedTime({ searchString: c, count: a.c.length, time: a.time });
            b += a.c.length >= a.ca
                ? '<div class="alert alert-warning"><span translation-section="armorcalc" translation-key="limit_reached">' + _gts('armorcalc', 'limit_reached') + '</span> ' +
                toEncodedString(a.ca) +
                ".<br><span translation-section='armorcalc' translation-key='higher_def'>" + _gts('armorcalc', 'higher_def') + "</span><br><span translation-section='armorcalc' translation-key='see_more_results'>" + _gts('armorcalc', 'see_more_results') + "</span></div>"
                : ""
        }
        return b += 0 < a.c.length
            ? ub({ Ua: a.c, qa: "resultitem" })
            : '<div class="alert alert-warning" translations-section="armorcalc" translation-key="no_match">' + _gts('armorcalc', 'no_match') + '</div>' +
            (a.jb
                ? '<div class="alert alert-warning"><a href="#" onclick="return onTabClicked(\'excludeinclude\');" translation-section="armorcalc" translation-key="pinned_eq">' + _gts('armorcalc', 'pinned_eq') + '</a>. <span translation-section="armorcalc" translation-key="different_result">' + _gts('armorcalc', 'different_result') + '</span>.</div>'
                : "") +
            (a.ib
                ? '<div class="alert alert-warning"><span translation-section="armorcalc" translation-key="def_restriction">' + _gts('armorcalc', 'def_restriction') + '  <span translation-section="armorcalc" translation-key="different_result">' + _gts('armorcalc', 'different_result') + '</span>.</div>'
                : "")
    }

    function ub(a) {
        for (var
            b =
                '<div class="table-responsive"><table class="table table-hover" id="results-table"><thead class="thead-light"><tr><th translation-section="armorcalc" translation-key="def">' + _gts('armorcalc', 'def') + '</th><th translation-section="armorcalc" translation-key="Head">' + _gts('armorcalc', 'Head') + '</th><th translation-section="armorcalc" translation-key="Body">' + _gts('armorcalc', 'Body') + '</th><th translation-section="armorcalc" translation-key="Arms">' + _gts('armorcalc', 'Arms') + '</th><th translation-section="armorcalc" translation-key="Waist">' + _gts('armorcalc', 'Waist') + '</th><th translation-section="armorcalc" translation-key="Legs">' + _gts('armorcalc', 'Legs') + '</th><th translation-section="armorcalc" translation-key="Charm">' + _gts('armorcalc', 'Charm') + '</th></tr></thead><tbody>',
            c = a.Ua,
            d = c.length,
            e = 0;
            e < d;
            e++) {
            for (var f = c[e],
                b = b +
                ("<tr id='" +
                    toEncodedString(a.qa) +
                    "-overview-" +
                    toEncodedString(e) +
                    '\' class="resultitem resultitemoverview" onclick=\'toggleResult("' +
                    toEncodedString(a.qa) +
                    '", ' +
                    toEncodedString(e) +
                    ")'><td class='totaldefence'>" +
                    toEncodedString(f.I) +
                    "</td>"),
                g = 0;
                6 > g;
                g++) b += "<td class='equipmentitem'>" + vb({ f: f.f[g] }) + "</td>";
            b += "</tr>";
            /*
            if (f.i) {
                for (var b = b +
                    ('<tr class="resultitem skillnamerow resultitemoverview" onclick=\'toggleResult("' +
                             toEncodedString(a.qa) +
                             '", ' +
                             toEncodedString(e) +
                             ')\'><td colspan=7><span class="weaponslot">' +
                             (f.f[6] ? toEncodedString(f.f[6].name) : "") +
                             "</span>"),
                    f = f.i,
                    g = f.length,
                    h = 0;
                    h < g;
                    h++) b += toEncodedString(f[h]) + " ";
                b += "</td></tr>"
            }
            */
            b += "<tr id='" +
                toEncodedString(a.qa) +
                "-details-" +
                toEncodedString(e) +
                '\' class="resultitem resultdetailsrow exclude-row" style="display:none"><td colspan=7></td></tr>'
        }
        return b + "</tbody></table></div>"
    }

    function wb(a) {
        for (var b = '<table class="table table-striped" style="width:auto"><tr><th translation-section="armorcalc" translation-key="Points">' + _gts('armorcalc', 'Points') + '</th>' +
            (a.c[6] ? "<th translation-section='armorcalc' translation-key='Weapon'>" + _gts('armorcalc', 'Weapon') + "</th>" : "") +
            "<th translation-section='armorcalc' translation-key='Head'>" + _gts('armorcalc', 'Head') + "</th><th translation-section='armorcalc' translation-key='Body'>" + _gts('armorcalc', 'Body') + "</th><th translation-section='armorcalc' translation-key='Arms'>" + _gts('armorcalc', 'Arms') + "</th><th translation-section='armorcalc' translation-key='Waist'>" + _gts('armorcalc', 'Waist') + "</th><th translation-section='armorcalc' translation-key='Legs'>" + _gts('armorcalc', 'Legs') + "</th><th translation-section='armorcalc' translation-key='Charm'>" + _gts('armorcalc', 'Charm') + "</th><th translation-section='armorcalc' translation-key='Decorations'>" + _gts('armorcalc', 'Decorations') + "</th><th translation-section='armorcalc' translation-key='Total'>" + _gts('armorcalc', 'Total') + "</th></tr>",
            c = a.i,
            d = c.length,
            e = 0;
            e < d;
            e++) {
            for (var f = c[e],
                b = b +
                    ('<tr><td><span translation-section="skills" translation-key="' + f.name + '">' +
                    _gts('skills', f.name) +
                    "</span></td>" +
                    (a.c[6] ? "<td>" + (a.c[6].i[f.name] ? toEncodedString(a.c[6].i[f.name]) : "") + "</td>" : "")),
                g = 0;
                6 > g;
                g++)
                b += "<td>" +
                    (a.c[g]
                        ? a.c[g].P
                        ? a.c[1].i[f.name]
                        ? '<span class="body-dup-point">' + toEncodedString(a.c[1].i[f.name]) + "</span>"
                        : ""
                        : a.c[g].i[f.name]
                        ? toEncodedString(a.c[g].i[f.name])
                        : ""
                        : "") +
                    "</td>";
            b += "<td>" + (a.C[f.name] ? toEncodedString(a.C[f.name]) : "") + "</td><td>" + toEncodedString(f.h) + "</td></tr><tr></tr>"
        }
        b += "<tr><td translation-section='armorcalc' translation-key='Slots'>" + _gts('armorcalc', 'Slots') + "</td>" +
        (a.c[6]
            ? "<td>" + (a.c[6].B ? toEncodedString(a.c[6].B[0]) + "-" + toEncodedString(a.c[6].B[1]) + "-" + toEncodedString(a.c[6].B[2]) : toEncodedString(a.c[6].A)) + "</td>"
            : "");
        for (c = 0; 6 > c; c++)
            b += "<td>" +
                (a.c[c]
                    ? a.c[c].P
                    ? '<span class="body-dup-point">' + toEncodedString(a.c[1].A) + "</span>"
                    : a.c[c].B
                    ? toEncodedString(a.c[c].B[0]) + "-" + toEncodedString(a.c[c].B[1]) + "-" + toEncodedString(a.c[c].B[2])
                    : toEncodedString(a.c[c].A)
                    : "") +
                "</td>";
        b +=
            '<td></td><td></td></tr></table><table class="table table-striped" style="width:auto"><tr><th translation-section="armorcalc" translation-key="Fire">' + _gts('armorcalc', 'Fire') + '</th><th translation-section="armorcalc" translation-key="Water">' + _gts('armorcalc', 'Water') + '</th><th translation-section="armorcalc" translation-key="Thunder">' + _gts('armorcalc', 'Thunder') + '</th><th translation-section="armorcalc" translation-key="Ice">' + _gts('armorcalc', 'Ice') + '</th><th translation-section="armorcalc" translation-key="Dragon">' + _gts('armorcalc', 'Dragon') + '</th><th>|</th><th translation-section="armorcalc" translation-key="Slots">' + _gts('armorcalc', 'Slots') + '</th><th>LV1</th><th>LV2</th><th>LV3</th></tr><tr>';
        c = a.U;
        d = c.length;
        for (e = 0; e < d; e++) b += "<td>" + toEncodedString(c[e]) + "</td>";
        return b += "<td>|</td><td></td><td>" +
            toEncodedString(a.Aa[1]) +
            "</td><td>" +
            toEncodedString(a.Aa[2]) +
            "</td><td>" +
            toEncodedString(a.Aa[3]) +
            "</td></tr></table>" +
            (a.sa
                ? '<br style="clear:both">' +
                (a.ba
                    ? "<div>" +
                    xb({ id: a.ba }) +
                    "<br><button onclick=\"onRemoveMySetClick('" +
                    toEncodedString(a.ba) +
                    "')\" translation-section='armorcalc' translation-key='remove_armor'>" + _gts('armorcalc', 'remove_armor') + "</button></div>"
                    : a.ia
                    ? "<div><button onclick=\"onRemoveMySetClick('" +
                    toEncodedString(a.ia) +
                    "')\" translation-section='armorcalc' translation-key='remove_armor'>" + _gts('armorcalc', 'remove_armor') + "</button></div>"
                    : "")
                : "")
    }

    function xb(a) {
        return "";
    }

    function vb(a) {
        return "" +
        (a.f
            ? '<span translation-section="armor" translation-key="' + toEncodedString(a.f.name) + '">' + _gts('armor', a.f.name) + '</span>'
            : '<span translation-section="armor" translation-key="None">' + _gts('armor', 'None') + '</span>')
    }

    function yb(a) { return "" + zb({ f: a.f, C: a.C, N: a.N, G: !0, Xa: !0 }) }

    function Ab(a) {
        var b = "";
        if (a.O && 0 < a.O.length) {
            for (var c = a.O, d = c.length, e = 0; e < d; e++)
                var f = c[e], b = b + (f ? ".eq" + f.replace(/[ +]/g, "_") + ".oi-pin," : "");
            b += "#dummy{color:green}"
        }
        if (a.F) {
            a = a.F;
            c = a.length;
            for (d = 0; d < c; d++)
                for (var e = a[d], f = e.length, g = 0; g < f; g++)
                    var h = e[g], b = b + (h ? ".eq" + h.replace(/[ +]/g, "_") + ".circle-x," : "");
            b += "#dummy{color:red}"
        }
        return b
    }

    function Bb(a) {
        for (var
            b = '<div class="col col-lg-4 col-md-6 col-12 includeexclude-section" style="margin-bottom: 5px;"><div class="card"><div class="card card-head bg-secondary text-white"><span class="sectionHeaders" translation-section="armorcalc" translation-key="' + a.ea + '_pinned">' + _gts('armorcalc', a.ea + '_pinned') + '</span></div><div class="card-body">' + 
			    '<div class="row"><div class="col col-1" style="padding-left: 0px;"><a href="#" onclick="return onPinEquipmentRemove(this);" equip="' + toEncodedString(a.fa) + '" part="' +  toEncodedString(a.o) + '"><span class="oi oi-loop-circular"></span></a></div>' + 
				'<div class="col col-1" style="padding-left: 0px;"><a href="#" onclick="return onExcludeEquipment(this);" equip="' + toEncodedString(a.fa) + '" part="' +  toEncodedString(a.o) + '"><span class="oi oi-circle-x"></span></a></div>' + 
				'<div class="col col-10" style="padding-left: 0px;"><select data-live-search="true" class="pin-select" name="pinned' +
                toEncodedString(a.o) +
                '" part=' +
                toEncodedString(a.o) +
                ' onchange="onPinEquipmentChange(this);"><option value="" translation-section="armor" translation-key="None">' + _gts('armor', 'None') + '</option>',
            c = a.c,
            d = c.length,
            e = 0;
            e < d;
            e++)
            var f = c[e],
                b = b +
                ('<option value="' +
                    toEncodedString(f.name) +
                    '"' +
                    (f.name == a.fa ? " selected" : "") +
                    " translation-section='armor' translation-key='" + toEncodedString(f.name) + "'>" +
                    _gts('armor', f.name) +
                    "</option>");
        b += '<option value="" translation-section="armor" translation-key="None">' + _gts('armor', 'None') + '</option></select></div></div></div><div class="card-head bg-light"><span class="sectionHeaders" translation-section="armorcalc" translation-key="' + a.ea + '_excluded">' +
            _gts('armorcalc', a.ea + '_excluded') +
            '</span></div><div class="panel-body">';
        c = a.F;
        d = c.length;
        for (e = 0; e < d; e++)
            f = c[e], b += '<div class="col-12"><a href="#" onclick="return onExcludeEquipment(this);" equip="' +
                toEncodedString(f) +
                '" part="' +
                toEncodedString(a.o) +
                '"><span class="oi oi-circle-x"></span></a> <span translation-section="armor" translation-key="' + toEncodedString(f) + '">' +
                _gts('armor', f) +
                "</span></div>";
        return b + "</div></div></div>"
    }

    function Cb(a) {
        var b = '<div class="includeexclude-container">' +
            Bb({ ea: "Head", o: 0, c: a.c[0], fa: a.O[0], F: a.F[0] }) +
            Bb({ ea: "Body", o: 1, c: a.c[1], fa: a.O[1], F: a.F[1] }) +
            Bb({ ea: "Arms", o: 2, c: a.c[2], fa: a.O[2], F: a.F[2] }) +
            Bb({ ea: "Waist", o: 3, c: a.c[3], fa: a.O[3], F: a.F[3] }) +
            Bb({ ea: "Legs", o: 4, c: a.c[4], fa: a.O[4], F: a.F[4] }) +
            Bb({ ea: "Charm", o: 5, c: a.c[5], fa: a.O[5], F: a.F[5] }) +
            "</div>";
        a = a.C;
		var xPanl = 0;
        for (var c = a.length, d = 0; d < c; d++)
            for (var e = a[d],
                b = b + (xPanl > 0 ? '</div>' : '')  +
				
				('<div class="card text-white bg-secondary" style="margin-bottom: 5px;"><div class="card-head"><a style="display: inline-block; width:100%;" class="sectionHeaders text-light" data-toggle="collapse" href="#collapseEE' + toEncodedString(e.aa).replace(/\(/g, '').replace(/\)/g, '').replace(/\//g, '').replace(/ /g, '_') + '" translation-section="armorcalc" translation-key="' + e.aa + '">' + _gts('armorcalc', e.aa) + '</a></div></div>') 
				+ '<div id="collapseEE' + toEncodedString(e.aa).replace(/\(/g, '').replace(/\)/g, '').replace(/\//g, '').replace(/ /g, '_') + '" class="row panel-collapse collapse show">',
                e = e.C,
                f = e.length,
                g = 0;
                g < f;
                g++) {
				xPanl = 1;
                for (var h = e[g],
                    b = b + 
                        ('<div class="col col-lg-3 col-md-4 col-sm-6 col-12 deco-setting deco-setting">' +
                        '<span traslation-section="skills" translation-key="' + findObjectByKey(_decos, 'name', h.name).public_name + '">' + _gts('skills', findObjectByKey(_decos, 'name', h.name).public_name) + '</span>' +
                        "<select class='filtersInput' deconame='" + toEncodedString(h.name) + "' onchange=\"onDecoCountChange(this.getAttribute('deconame'), parseInt(this.value));\">"),
                    m = h.max + 1,
                    q = 0;
                    q < m;
                    q++)
                    b += '<option value="' + toEncodedString(q) + '" ' + (q == h.count ? "selected" : "") + ">" + toEncodedString(q) + "</option>";
                b += "</select></div>"
            }
        return b +
            '</div><div style=clear:both><button onclick="setAllDecoCount(7)"><span class="oi oi-data-transfer-upload" title="data-transfer-upload" aria-hidden="true"></span>&nbsp;<span translation-section="armorcalc" translation-key="set_deco_max">' + _gts('armorcalc', 'set_deco_max') + '</span></button>&nbsp;<button onclick="setAllDecoCount(0)"><span class="oi oi-data-transfer-download" title="data-transfer-download" aria-hidden="true"></span>&nbsp;<span translation-section="armorcalc" translation-key="set_deco_zero">' + _gts('armorcalc', 'set_deco_zero') + '</span></button></div>'
            + '<hr><div style="margin-bottom: 5px;" translation-section="armorcalc" translation-key="deco_export_text">' + _gts('armorcalc', 'deco_export_text') + '</div><button style="margin-bottom: 5px;" onclick="exportDecos()"><span class="oi oi-cloud-download" title="data-cloud-download" aria-hidden="true"></span>&nbsp;<span translation-section="armorcalc" translation-key="export">' + _gts('armorcalc', 'export') + '</span></button></div><textarea id="decoimportexport" style="width:100%"></textarea><div><button onclick="importDecos()"><span class="oi oi-cloud-upload" title="data-cloud-upload" aria-hidden="true"></span>&nbsp;<span translation-section="armorcalc" translation-key="import">' + _gts('armorcalc', 'import') + '</span></button></div></div>'
    }

    function Db(a) {
        var b = "<tr><td translation-section='armorcalc' translation-key='" + a.ja + "'>" +
            _gts('armorcalc', a.ja) +
            "</td><td>" +
            (a.f ? toEncodedString(a.f.I) : "0") +
            "</td><td>" +
            vb({ f: a.f, link: !0 }) +
            "</td>";
        a = a.G
            ? "<td>" +
            (a.f
                ? '<a style="z-index: 1000;" href="#" onclick="return onPinEquipment(this);" equip="' +
                toEncodedString(a.f.name) +
                '" part="' +
                toEncodedString(a.f.o) +
                '"><span style="z-index: 1000;" class="pinex eq' +
                a.f.name.replace(/[ +]/g, "_") +
                ' oi oi-pin"></span></a> <a style="z-index: 1000;" href="#" onclick="return onExcludeEquipment(this);" equip="' +
                toEncodedString(a.f.name) +
                '" part="' +
                toEncodedString(a.f.o) +
                '"><span style="z-index: 1000;" class="pinex eq' +
                a.f.name.replace(/[ +]/g, "_") +
                ' oi oi-circle-x"></span></a>'
                : "") +
            "</td>"
            : "";
        return b + a + "<tr>"
    }

    function zb(a) {
        var b =
            '<table class="saved-result-element table table-striped" style="width:auto;"><tr><th translation-section="armorcalc" translation-key="part">' + _gts('armorcalc', 'part') + '</th><th translation-section="armorcalc" translation-key="defence">' + _gts('armorcalc', 'defence') + '</th><th translation-section="armorcalc" translation-key="name">' + _gts('armorcalc', 'name') + '</th>' +
                (a.G ? "<th translation-section='armorcalc' translation-key='pin_exclude'>" + _gts('armorcalc', 'pin_exclude') + "</th>" : "") +
                Db({ ja: "Head", f: a.f[0], G: a.G }) +
                Db({ ja: "Body", f: a.f[1], G: a.G }) +
                Db({ ja: "Arms", f: a.f[2], G: a.G }) +
                Db({ ja: "Waist", f: a.f[3], G: a.G }) +
                Db({ ja: "Legs", f: a.f[4], G: a.G }) +
                Db({ ja: "Charm", f: a.f[5], G: a.G });
        if (a.Xa) {
            b += "<tr><td translation-section='armorcalc' translation-key='Decorations'>" + _gts('armorcalc', 'Decorations') + "</td><td colspan='" + (a.G ? "3" : "2") + "'>";
            if (a.C)
                for (var c = a.C, d = c.length, e = 0; e < d; e++)
                    var f = c[e],
                        b = b + (toEncodedString(f.count) + 'x [' + f.M.level + '] <span translation-section="skills" translation-key="' + f.M.m.name + '">' + _gts('skills', f.M.m.name) + '</span>') + (c.length > 0 && e != d -1 ? ', ' : '');
            if (a.N && a.N.length)
                for (b += (a.C && a.C.length ? "<br>" : "") + "Body ", a = a.N, c = a.length, d = 0; d < c; d++)
                    e = a[d], b += toEncodedString(e.M.name) + "* " + toEncodedString(e.count) + " ";
            b += " </td></tr>"
        }
        return b + "</table>"
    }

    function PrintMoreSkills(a) {
        for (var b = "", c = a.bb, d = c.length, e = 0; e < d; e++)
            b += toEncodedString(c[e]) + " ";
        b = "" + showElapsedTime({ searchString: b, count: a.foundSkills.length, time: a.time });
        
        c = a.foundSkills.length;
        if (c > 0)
		{
			var htmlMoreSkillList = '';
            var lastSkill = '';
            var lastGroup = '';
            for (d = 0; d < c; d++)
            {
                if (a.foundSkills[d].skill != lastSkill)
                {
                    if (d > 0)
                        htmlMoreSkillList += '</div>';
                    if (a.foundSkills[d].group != lastGroup)
                    {
                        if (d > 0)
                            htmlMoreSkillList += '</div>';
                        lastGroup = a.foundSkills[d].group;
                        htmlMoreSkillList +=
                            '<div class="card text-dark bg-light" style="margin-bottom: 5px;"><div class="card-head"><a style="display: inline-block; width:100%;" class="sectionHeaders text-dark" data-toggle="collapse" href="#collapseMS' + lastGroup + '" translation-section="armorcalc" translation-key="' + lastGroup + '">' + _gts('armorcalc', lastGroup) + '</a></div></div>' +
                        '<div id="collapseMS' + lastGroup + '" class="row panel-collapse collapse show">';
                    }
                    lastSkill = a.foundSkills[d].skill;
                    var lvlSkill = (a.foundSkills[d].type == 2 ? _gts('skills', a.foundSkills[d].name) : 'Lv ' + a.foundSkills[d].points);
                    if (lvlSkill == '') lvlSkill = 'Lv 1';
                    htmlMoreSkillList += '<div class="extraskillrow col col-12"><span translation-section="skills" translation-key="' + lastSkill + '">' + _gts('skills', lastSkill) + '&nbsp;&nbsp;&nbsp;'
                        + '<a href="#" class="extraskills skill-' + toEncodedString(a.foundSkills[d].name) + '" onclick="return onExtraSkillClick(\'' + toEncodedString(a.foundSkills[d].name) + "')\">"
                        + lvlSkill + '</a>';
                }
				else
				{
                    var lvlSkill = (a.foundSkills[d].type == 2 ? _gts('skills', a.foundSkills[d].name) : 'Lv ' + a.foundSkills[d].points);
					if (lvlSkill == '') lvlSkill = 'Lv 1';
					htmlMoreSkillList += '&nbsp;|&nbsp;' 
                      + '<a href="#" class="extraskills skill-' + toEncodedString(a.foundSkills[d].name) + '" onclick="return onExtraSkillClick(\'' + toEncodedString(a.foundSkills[d].name) + "')\">"
					  + lvlSkill + '</a>';
				}
			}
			
            b += htmlMoreSkillList + '</div></div>';
		}
        else b += "<div translations-section='armorcalc' translations-key='no_extra'>" + _gts('armorcalc', 'no_extra') + "</div>";
        return b
    };

    function Fb(a) {
        if ("function" == typeof a.T) return a.T();
        if (is_string(a)) return a.split("");
        if (is_vector(a)) {
            for (var b = [], c = a.length, d = 0; d < c; d++) b.push(a[d]);
            return b
        }
        return Oa(a)
    }

    function Gb(a) {
        if ("function" == typeof a.S) return a.S();
        if ("function" != typeof a.T) {
            if (is_vector(a) || is_string(a)) {
                var b = [];
                a = a.length;
                for (var c = 0; c < a; c++) b.push(c);
                return b
            }
            return Pa(a)
        }
    }

    function Hb(a, b) {
        if ("function" == typeof a.forEach) a.forEach(b, void 0);
        else if (is_vector(a) || is_string(a)) D(a, b, void 0);
        else for (var c = Gb(a), d = Fb(a), e = d.length, f = 0; f < e; f++) b.call(void 0, d[f], c && c[f], a)
    };

    function G(a) { return a };

    var Ib = "StopIteration" in _app ? _app.StopIteration : { message: "StopIteration", stack: "" };

    function Jb() {}

    Jb.prototype.next = function() { throw Ib; };
    Jb.prototype.oa = function() { return this };

    function Kb(a) {
        if (a instanceof Jb) return a;
        if ("function" == typeof a.oa) return a.oa(!1);
        if (is_vector(a)) {
            var b = 0, c = new Jb;
            c.next = function() {
                for (;;) {
                    if (b >= a.length) throw Ib;
                    if (b in a) return a[b++];
                    b++
                }
            };
            return c
        }
        throw Error("Not implemented");
    }

    function Lb(a, b) {
        if (is_vector(a))
            try {
                D(a, b, void 0)
            } catch (c) {
                if (c !== Ib) throw c;
            }
        else {
            a = Kb(a);
            try {
                for (;;) b.call(void 0, a.next(), void 0, a)
            } catch (d) {
                if (d !== Ib) throw d;
            }
        }
    }

    function Mb(a) {
        if (is_vector(a)) return Ba(a);
        a = Kb(a);
        var b = [];
        Lb(a, function(a) { b.push(a) });
        return b
    };

    function Nb(a, b) {
        this.b = {};
        this.a = [];
        this.v = this.j = 0;
        var c = arguments.length;
        if (1 < c) {
            if (c % 2) throw Error("Uneven number of arguments");
            for (var d = 0; d < c; d += 2) Ob(this, arguments[d], arguments[d + 1])
        } else if (a) {
            a instanceof Nb ? (c = a.S(), d = a.T()) : (c = Pa(a), d = Oa(a));
            for (var e = 0; e < c.length; e++) Ob(this, c[e], d[e])
        }
    }

    klass = Nb.prototype;
    klass.T = function() {
        Pb(this);
        for (var a = [], b = 0; b < this.a.length; b++) a.push(this.b[this.a[b]]);
        return a
    };
    klass.S = function() {
        Pb(this);
        return this.a.concat()
    };
    klass.clear = function() {
        this.b = {};
        this.v = this.j = this.a.length = 0
    };
    klass.remove = function(a) {
        return Qb(this.b, a) ? (delete this.b[a], this.j--, this.v++, this.a.length > 2 * this.j && Pb(this), !0) : !1
    };

    function Pb(a) {
        if (a.j != a.a.length) {
            for (var b = 0, c = 0; b < a.a.length;) {
                var d = a.a[b];
                Qb(a.b, d) && (a.a[c++] = d);
                b++
            }
            a.a.length = c
        }
        if (a.j != a.a.length) {
            for (var e = {}, c = b = 0; b < a.a.length;) d = a.a[b], Qb(e, d) || (a.a[c++] = d, e[d] = 1), b++;
            a.a.length = c
        }
    }

    function Rb(a, b) { return Qb(a.b, b) ? a.b[b] : void 0 }

    function Ob(a, b, c) {
        Qb(a.b, b) || (a.j++, a.a.push(b), a.v++);
        a.b[b] = c
    }

    klass.forEach = function(a, b) {
        for (var c = this.S(), d = 0; d < c.length; d++) {
            var e = c[d];
            a.call(b, Rb(this, e), e, this)
        }
    };
    klass.clone = function() { return new Nb(this) };
    klass.oa = function(a) {
        Pb(this);
        var b = 0, c = this.v, d = this, e = new Jb;
        e.next = function() {
            if (c != d.v) throw Error("The map has changed since the iterator was created");
            if (b >= d.a.length) throw Ib;
            var e = d.a[b++];
            return a ? e : d.b[e]
        };
        return e
    };

    function Qb(a, b) { return Object.prototype.hasOwnProperty.call(a, b) };

    function Vb(a, b) {
        var c = arguments;
        return a.replace(/\{(\d+)\}/g, function(a, b) { return c[parseInt(b, 10) + 1] })
    }

    function DecodeSkillsFromUri() {
        if (!document.location.hash)
            return {};
        var skillsarray = {};
        D(document.location.hash.split("#")[1].split("&"),
            function(b) {
                b = b.split("=");
                skillsarray[b[0]] = decodeURI(b[1]);
            });
        return skillsarray;
    }

    function Xb(a, b) {
        var c = "#skills=" + encodeURI(a.join(","));
        K(b, function(a, b) { c += "&" + b + "=" + encodeURI(a) });
        document.location = c
    }

    function Yb() {
        var a = {};
        K(Zb,
            function(b, c) {
                var d = getElementById(c);
                a[b[0]] = b[1]("checkbox" == d.type ? d.checked : d.value)
            });
        return a
    }

    function $b() {};

    var ac = ["Torso Up"],
        bc = new RegExp("(.*) (" + ac.join("|") + ") (.+)"),
        cc = /(Blade Master|Gunner?) (\d) Slot (.+)/,
        dc = /LV(\d(?:-\d)?(?:-\d)?) Slot (.+)/,
        ec = "Head Body Arms Waist Legs Charm".split(" "),
        R = null,
        allWeaponSlots = null;

    function gc(a) {
        switch (a) {
        case 2:
            return "Gunner";
        case 1:
            return "Blade Master";
        default:
            return ""
        }
    }

    function hc(a, b, c, d) { return d.part == b && d.slots == a && d.type & c }

    function ic(a, b, c) {
        return c.part == b && c.slotlevels[0] == a[0] && c.slotlevels[1] == a[1] && c.slotlevels[2] == a[2]
    }

    function jc(a, b, c) { return c.part == a && c.type == b && Qa(c.skills, function(a, b) { return I(ac, b) }) }

    function kc(a) {
        a = F(a, function(a) { return a.maxdef });
        return Math.max.apply(Math, a)
    }

    function lc(a) {
        a = F(a, function(a) { return a.I });
        return Math.max.apply(Math, a)
    }

    function mc(a, b) {
        if (!a) return null;
        var c = null, d = nc(a, b);
        if (!d) {
            var e = ec[b], f = a.match(cc);
            if (f && f[3] == e)
                var g = "Gunner" == f[1] ? 2 : 1,
                    f = Number(f[2]),
                    e = E(R, v(hc, f, b, g)),
                    c = kc(e),
                    c = new oc(b, g, f, null, c, e);
            else if ((f = a.match(bc)) && f[3] == e)
                g = "Gunner" == f[1] ? 2 : 1, e = E(R, v(jc, b, g)), c = kc(e), c = new pc(f[2], b, g, c);
            else if ((f = a.match(dc)) && f[2] == e) {
                g = f[1].split("-");
                f = g.length;
                for (g = F(g, function(a) { return parseInt(a, 10) }); 3 > g.length;) g.push(0);
                e = E(R, v(ic, g, b));
                c = kc(e);
                c = new oc(b, 3, f, g, c, e)
            }
        }
        if (!c) {
            var f = 0,
                e = {},
                c = 1,
                h = g =
                    null;
            d && (f = d.slots, e = d.skills, c = d.maxdef, g = d.resist, h = d.slotlevels);
            c = new S(a, b, f, h, e, c, g)
        }
        return c
    }

    function qc(a, b) {
        for (var c = [b], d = 0; d < b.length; d++)
            if (b[d] instanceof a) {
                var e = [];
                D(b[d].c,
                    function(a) {
                        Ca(e,
                            F(c,
                                function(b) {
                                    b = Ba(b);
                                    b[a.o] = a;
                                    return b
                                }))
                    });
                c = e
            }
        return c
    }

    function S(a, b, c, d, e, f, g) {
        this.name = a;
        this.o = b;
        this.A = c;
        this.B = d;
        this.i = e;
        this.I = f || 0;
        this.U = g || [0, 0, 0, 0, 0];
        this.P = !!Qa(e, function(a, b) { return I(ac, b) })
    }

    S.prototype.link = null;

    function rc(a) { return new S(a.name, a.part, a.slots, a.slotlevels, a.skills, a.maxdef, a.resist) }

    function nc(a, b) { return H(R, v(function(a, b, e) { return e.part == b && e.name == a }, a, b)) }

    var sc = { rb: 0, pb: 1, ob: 2, tb: 3, sb: 4, qb: 5, ub: 6 }, tc = !0;

    function uc(a, b) {
        var c = a.name, d = a.slots, e = a.slotlevels, f = a.skills;
        tc && 5 == a.part && (c = vc(f, d));
        S.call(this, c, a.part, d, e, f, a.maxdef, a.resist);
        this.W = b
    }

    A(uc, S);

    function vc(a, b) {
        var c = "";
        K(a, function(a, b) { c += b + ":" + a + " " });
        0 < b && (c += Vb("{0} Slots", b));
        return c
    }

    function wc(a, b) {
        var c = a[0],
            d = Ja(c.i, function(a, c) { return I(b, c) }),
            e = Math.max.apply(Math, F(a, function(a) { return a.I }));
        S.call(this, "", c.o, c.A, c.B, d, e);
        this.W = c.W;
        this.c = a
    }

    A(wc, S);

    function xc(a, b, c) { return a.A != b.A || a.o != b.o ? !1 : ua(c, function(c) { return a.i[c] == b.i[c] }) }

    function yc(a, b) {
        for (var c = [], d; d = a.shift();) {
            for (var e = [], f = 0; f < a.length && a[f].W == d.W; f++) xc(d, a[f], b) && e.push(a[f]);
            0 < e.length ? (D(e, function(b) { xa(a, b) }), e.push(d), d = new wc(e, b), c.push(d)) : c.push(d)
        }
        return c
    }

    var zc = v(qc, wc);

    function Ac(a, b) {
        var c = b ? "LV" + E(b, G).join("-") : a;
        S.call(this, Vb("{0} Slot Weapon", a ? c : "None"), 6, a, b || null, {}, 0)
    }

    A(Ac, S);

    function pc(a, b, c, d, e) {
        S.call(this, Vb("{0} {1} {2}", gc(c), a, ec[b]), b, 0, null, [], d);
        this.P = !0;
        this.link = a;
        this.c = e || null
    }

    A(pc, S);
    var Bc = v(qc, pc);

    function oc(a, b, c, d, e, f) {
        var g = d ? "LV" + E(d, G).join("-") : c;
        S.call(this, Vb("{0} {1} Slot {2}", gc(b), g, ec[a]), a, c, d, [], e);
        this.W = c;
        this.link = "\u30b9\u30ed\u30c3\u30c8\u5225\u88c5\u5099" + ec[a];
        this.c = f || null
    }

    A(oc, S);
    var Cc = v(qc, oc);

    function Dc(a) { return H(allWeaponSlots, function(b) { return b.name == a }) || allWeaponSlots[0] }

    function Ec(a) {
        for (var b = 0, c = 0; c < a.length; c++) {
            var d = a[c];
            d && (d.P && (d = a[1]), d && (b += d.A))
        }
        return b
    }

    function Fc(a, b, c) {
        if (b.A > c.A || b.o != c.o) return !1;
        if (b.B && c.B) for (var d = 0; 3 > d; d++) if (b.B[d] > c.B[d]) return !1;
        return ua(a, function(a) { return (b.i[a] || 0) <= (c.i[a] || 0) })
    }

    function Gc() {
        var a = Hc.prototype.ta, b = [0, 1, 2, 3, 4], c = [];
        R[0].slotlevels
            ? D(b,
                function(a) {
                    for (var b = 3; 0 < b; b--)
                        for (var f = b; 0 <= f; f--)
                            for (var g = f; 0 <= g; g--)
                                H(R, v(ic, [b, f, g], a)) && c.push(new oc(a, 3, !!b + !!f + !!g, [b, f, g], 0))
                })
            : D([1, 2],
                function(d) {
                    D(b,
                        function(b) {
                            for (var f = 1; 3 >= f; f++) c.push(new oc(b, d, f, null, 0));
                            1 != b && c.push(new pc(a, b, d, 0))
                        })
                });
        return c
    };

    function CreateSkillObj(a) {
        this.name = a.name;
        this.D = a.skill;
        this.h = a.points;
        this.type = a.type;
        this.group = '';
    }

    function Jc() {
        var a = Kc(), b = {};
        D(a,
            function(a) {
                D(a.i,
                    function(a) {
                        a.D in b || (b[a.D] = []);
                        b[a.D].push(a)
                    })
            });
        return b
    }

    var Lc = null;

    function Mc(a) {
        Lc || (Lc = Jc());
        return Lc[a] || []
    }

    function Nc(a, b) { return 0 < b ? (Oc[a] || 100) * b : 0 }

    function Pc(a) {
        var b = 0, c;
        for (c in a) b += Nc(c, a[c]);
        return b
    }

    function Qc(a, b) { K(b, function(b, d) { T(a, d, b) }) }

    function T(a, b, c) { a[b] = (a[b] || 0) + c }

    var Rc = null, Oc = null, Sc = {};

    function Tc(a, b) {
        Rc = [];
        K(a,
            function(a, b) {
                Rc.push({
                    aa: b,
                    i: F(a,
                        function(a) {
                            a = new CreateSkillObj(a);
                            return Sc[a.name] = a;
                        })
                })
            });
        Oc = b
    }

    function Uc(a, b) {
        Rc = F(a,
            function (a) {
                var _internalGenre = a.genre;
                return {
                    aa: a.genre,
                    i: F(a.skills,
                        function(a) {
                            a = new CreateSkillObj(a);
                            a.group = _internalGenre;
                            return Sc[a.name] = a;
                        })
                }
            });
        Oc = b
    }

    function Kc() {
        if (!Rc) {
            alert("skill data not set!");
            debugger
        }
        return Rc
    }

    function Vc(a) { return Sc[a] }

    function Wc() {
        return E(Oa(Sc),
            function (a) { return true; })
    }

    function Xc(a) {
        var b = Kc(), c = [];
        D(b, function(a) { Ca(c, a.i) });
        var d = {};
        D(a,
            function(a) {
                for (var b = 0; b < c.length; b++)
                    if (c[b].name == a) {
                        var g = c[b].D;
                        d[g] = d[g] ? Math.max(c[b].h, d[g]) : c[b].h
                    }
            });
        return d
    }

    function Yc(a) {
        var b = F(Pa(a),
            function(b) {
                var d = a[b], e = Mc(b), f = null;
                0 > d
                    ? D(e, function(a) { 0 >= a.h && d <= a.h && (!f || a.h < f.h) && (f = a) })
                    : D(e, function(a) { 0 <= a.h && d >= a.h && (!f || a.h > f.h) && (f = a) });
                return { name: b, h: d, Ja: f }
            });
        Fa(b, function(a, b) { return b.h - a.h });
        return b
    };

    function Zc(a) {
        a = String(a);
        if (/^\s*$/.test(a)
            ? 0
            : /^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g, "@")
                .replace(
                    /"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                    "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, "")))
            try {
                return eval("(" + a + ")")
            } catch (b) {
            }
        throw Error("Invalid JSON string: " + a);
    }

    function $c() {}

    function ad(a, b, c) {
        if (null == b) c.push("null");
        else {
            if ("object" == typeof b) {
                if (is_array(b)) {
                    var d = b;
                    b = d.length;
                    c.push("[");
                    for (var e = "", f = 0; f < b; f++) c.push(e), ad(a, d[f], c), e = ",";
                    c.push("]");
                    return
                }
                if (b instanceof String || b instanceof Number || b instanceof Boolean) b = b.valueOf();
                else {
                    c.push("{");
                    e = "";
                    for (d in b)
                        Object.prototype.hasOwnProperty.call(b, d) &&
                        (f = b[d], "function" != typeof f &&
                            (c.push(e), bd(d, c), c.push(":"), ad(a, f, c), e = ","));
                    c.push("}");
                    return
                }
            }
            switch (typeof b) {
            case "string":
                bd(b, c);
                break;
            case "number":
                c.push(isFinite(b) &&
                    !isNaN(b)
                    ? b
                    : "null");
                break;
            case "boolean":
                c.push(b);
                break;
            case "function":
                break;
            default:
                throw Error("Unknown type: " + typeof b);
            }
        }
    }

    var cd = {
            '"': '\\"',
            "\\": "\\\\",
            "/": "\\/",
            "\b": "\\b",
            "\f": "\\f",
            "\n": "\\n",
            "\r": "\\r",
            "\t": "\\t",
            "\x0B": "\\u000b"
        },
        dd = /\uffff/.test("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g;

    function bd(a, b) {
        b.push('"',
            a.replace(dd,
                function(a) {
                    var b = cd[a];
                    b || (b = "\\u" + (a.charCodeAt(0) | 65536).toString(16).substr(1), cd[a] = b);
                    return b
                }),
            '"')
    };

    function ed(a) { this.a = a }

    function U(a, b) {
        var c = fd;
        if (void 0 !== b) {
            var c = c.a, d;
            d = [];
            ad(new $c, b, d);
            d = d.join("");
            try {
                c.X.setItem(a, d)
            } catch (e) {
                if (0 == c.X.length) throw "Storage mechanism: Storage disabled";
                throw "Storage mechanism: Quota exceeded";
            }
        } else c.a.remove(a)
    }

    ed.prototype.remove = function(a) { this.a.remove(a) };

    function gd() {};

    function hd() {}

    A(hd, gd);
    hd.prototype.clear = function() {
        var a = Mb(this.oa(!0)), b = this;
        D(a, function(a) { b.remove(a) })
    };

    function id(a) { this.X = a }

    A(id, hd);
    id.prototype.remove = function(a) { this.X.removeItem(a) };
    id.prototype.oa = function(a) {
        var b = 0, c = this.X, d = new Jb;
        d.next = function() {
            if (b >= c.length) throw Ib;
            var d = c.key(b++);
            if (a) return d;
            d = c.getItem(d);
            if (!is_string(d)) throw "Storage mechanism: Invalid value was encountered";
            return d
        };
        return d
    };
    id.prototype.clear = function() { this.X.clear() };
    id.prototype.key = function(a) { return this.X.key(a) };

    function jd() {
        var a = null;
        try {
            a = window.localStorage || null
        } catch (b) {
        }
        this.X = a
    }

    A(jd, id);
    var fd = new ed(new jd);

    function kd(a, b) {
        this.a = a;
        this.b = b
    }

    function V(a) {
        var b;
        a: {
            var c = fd, d;
            try {
                var e = c.a.X.getItem(a.a);
                if (!is_string(e) && null !== e) throw "Storage mechanism: Invalid value was encountered";
                d = e
            } catch (f) {
                b = void 0;
                break a
            }
            if (null !== d)
                try {
                    b = Zc(d);
                    break a
                } catch (g) {
                    throw "Storage: Invalid value was encountered";
                }
            b = void 0
        }
        return b || a.b
    };

    var md = new kd("en-deco");

    function nd(a) { return !!a.part };

    function od(a, b) {
        this.name = a;
        this.h = b
    }

    function pd(a, b, c, d) {
        this.name = a;
        this.i = b;
        this.A = c;
        this.level = d;
        this.Ea = !1;
        K(this.i,
            function(a, b) {
                var c = new od(b, a);
                0 < a ? this.m = c : 0 > a && (this.u = c)
            },
            this)
    }

    var X = null, qd = {}, rd = {}, sd = {};

    function td(a) {
        X = F(a,
            function(a) { return new pd(a.name, a.skills, a.slots, a.level) });
        Fa(X,
            function(a, c) {
                return a.m.name != c.m.name ? a.m.name < c.m.name ? -1 : 1 : a.m.h != c.m.h ? a.m.h > c.m.h ? -1 : 1 : 0
            });
        X[X.length - 1].Ea = !0;
        for (a = 0; a < X.length - 1; a++) X[a].m.name != X[a + 1].m.name && (X[a].Ea = !0);
        D(X,
            function(a) {
                if (a.u) {
                    var c = a.m.name, d = a.u.h / a.m.h;
                    if (!qd[c] || d > qd[c].h) qd[c] = new od(a.u.name, d)
                }
            });
        K(qd,
            function(a, c) {
                var d = qd[a.name];
                d && d.name == c && (sd[c] = a.name)
            });
        D(X,
            function(a) {
                a.level &&
                (rd[a.m.name] =
                    a)
            })
    }

    function ud(a) { return H(X, function(b) { return b.name == a }) }

    function vd(a, b, c) {
        function d(b) { return b.u && a[b.u.name] }

        var e = E(X, function(d) { return (d.b <= b || d.a <= c) && !!a[d.m.name] });
        Fa(e,
            function(a, b) {
                if (d(a) && d(b)) {
                    if (a.u.name != b.u.name) {
                        var c = Nc(a.u.name, 1), e = Nc(b.u.name, 1);
                        return c == e ? a.u.name < b.u.name ? -1 : 1 : c < e ? -1 : 1
                    }
                    if (a.u.h != b.u.h) return a.u.h < b.u.h ? -1 : 1
                } else {
                    if (d(a)) return -1;
                    if (d(b)) return 1
                }
                return a.m.name != b.m.name
                    ? (c = Nc(a.m.name, 1), e = Nc(b.m.name, 1), c == e ? a.m.name < b.m.name ? -1 : 1 : c < e ? -1 : 1)
                    : a.m.h == b.m.h
                    ? 0
                    : a.m.h > b.m.h
                    ? -1
                    : 1
            });
        return e
    }

    function wd(a) { return rd[a] };

    function xd(a, b, c, d, e, f, g) {
        1 < b ? (c = yd(c), d = yd(d)) : (c = yd(Aa(c, d)), d = []);
        this.f = Ba(a);
        this.L = b;
        this.C = c;
        this.N = d;
        this.ba = e && e.match(/^[a-zA-Z0-9_\-=]+$/) ? e : null;
        this.I = this.a = 0;
        this.U = [0, 0, 0, 0, 0];
        D(this.f,
            function(a) {
                if (a) {
                    this.I += a.I;
                    this.a <<= 3;
                    this.a += a.o + 1;
                    for (var b = 0; b < this.U.length; b++) this.U[b] += a.U[b]
                }
            },
            this);
        this.ia = f || "";
        this.sa = !!g;
        this.i = null;
        this.sa && (this.i = zd(this))
    }

    function zd(a) {
        var b = [], c = Ad(a);
        a = Bd(a);
        Qc(c, a);
        D(Yc(c), function(a) { a.Ja && b.push(a.Ja.name) });
        return b
    }

    function Cd(a, b) { return a.a == b.a ? a.I == b.I ? 0 : a.I > b.I ? -1 : 1 : a.a < b.a ? -1 : 1 }

    function Ad(a) {
        for (var b = {}, c = 0; c < a.f.length; c++) a.f[c] && K(a.f[c].i, function(a, c) { T(b, c, a) });
        a.f[1] && K(a.f[1].i, function(a, c) { T(b, c, a * (this.L - 1)) }, a);
        return b
    }

    function Bd(a) {
        function b(a, b) { K(b.M.i, function(f, g) { T(c, g, f * a * b.count) }) }

        var c = {};
        D(a.N, v(b, a.L));
        D(a.C, v(b, 1));
        return c
    }

    xd.prototype.b = 5;

    function Dd(a) {
        function b(a) { return { name: a.M.name, count: a.count } }

        for (var c = [], d = 0; d < a.b; d++) c.push(a.f[d] ? a.f[d].name : null);
        var d = null, e = a.f[5];
        e && (d = { slots: e.A, skills: e.i });
        return {
            equipments: c,
            charm: d,
            weapon: a.f[6].name,
            decos: a.C ? F(a.C, b) : null,
            bodyDecos: a.N ? F(a.N, b) : null,
            mySetId: a.ba,
            myLocalSetId: a.ia
        }
    }

    function Ed(a, b, c, d, e, f, g, h) {
        this.$ = 1 == b ? 1 : 2;
        this.ga = e;
        this.Z = f;
        this.b = Xc(g);
        this.v = Pa(this.b);
        this.H = a;
        this.ha = d;
        this.a = this.Na();
        this.ca = h;
        this.j = c;
        this.K = Pa(this.b);
        this.Y = this.c = null
    }

    klass = Ed.prototype;
    klass.Na = function() {
        var a = F(V(Y), mc);
        return Aa(a, [null, this.ha])
    };
    klass.za = 0;
    klass.da = null;

    function Fd(a) {
        for (var b = V(Y), c = 0; c < b.length; c++) {
            var d;
            if (d = b[c]) {
                d = b[c];
                var e = c, f = a.j, g = a.$, h = nc(d, e);
                d = !(h ? h.type & f && h.sex & g : mc(d, e))
            }
            if (d) return !1
        }
        return !0
    }

    klass.hb = function(a, b, c) {
        return this.filter(a, b, c) ? (a = this.V - this.J[a.part] + a.maxdef >= this.za) ? a : !1 : !1
    };
    klass.filter =
        function (a) {
        return a.type & this.j && a.sex & this.$;
    };

    function Gd(a) {
        for (var b = {}, c = 0; c < a.v.length; c++) {
            for (var d = a.v[c], e = a.b[d], f = 0; f < a.a.length; f++) {
                var g = a.a[f];
                g && (g.P && (g = a.a[1]), g && (e -= g.i[d] || 0))
            }
            b[d] = e
        }
        return b
    }

    function Hd(a, b) {
        var c = Gd(a);
        if (b) {
            var d = {}, e;
            for (e in c)
                if (!(0 >= c[e])) {
                    var f = qd[e] || null;
                    f && f.name in c && (d[f.name] = f.h * c[e], c[f.name] += f.h * c[e])
                }
            for (e in d) 0 >= c[e] || (f = qd[e] || null) && f.name in c && (c[f.name] += f.h * d[e])
        }
        for (e = d = 0; e < a.v.length; e++) f = a.v[e], d += Nc(f, c[f]);
        return d = Math.round(1E3 * d) / 1E3
    }

    function Id(a, b) {
        this.b = a;
        this.a = b
    }

    Id.prototype.L = 1;

    function Jd(a) {
        for (var b = [0, 0, 0, 0], c = 0; c < a.length; c++) {
            var d = a[c];
            if (d) {
                if (!d.B) debugger;
                b[d.B[0]]++;
                b[d.B[1]]++;
                b[d.B[2]]++
            }
        }
        b[0] = 0;
        return b
    }

    Id.prototype.Ya = function(a, b, c, d, e) {
        var f;
        a: {
            a = [0, 0, 0, 0];
            for (f in c)
                if (!(0 >= c[f])) {
                    b = rd[f];
                    if (!b || c[f] > (void 0 === this.a[b.name] ? 7 : this.a[b.name])) {
                        f = !1;
                        break a
                    }
                    a[b.level] += c[f]
                }
            f = 0;
            for (b = 3; 0 < b; b--)
                if (f += this.b[b] - a[b], 0 > f) {
                    f = !1;
                    break a
                }
            f = !0
        }
        if (!f) return !1;
        f = [];
        for (var g in c) for (a = rd[g], b = 0; b < c[g]; b++) f.push(a);
        e(f);
        return !0
    };

    function Kd(a, b, c) {
        this.a = a.concat();
        this.b = [0, 0, 0, 0];
        this.J = b;
        this.v = 0;
        this.L = c;
        1 == this.L && (this.a[this.J]++, this.J = 0);
        this.K = [];
        for (a = 0; a < Ld(this.a); a++) this.K.push(null);
        this.H = 0;
        this.wa = [];
        this.j = {}
    }

    function Ld(a) {
        for (var b = 0, c = 1; c < a.length; c++) b += a[c] * c;
        return b
    }

    function Md(a, b) {
        var c = 0;
        switch (b) {
        case 1:
            c = 3 * (a.a[3] - a.b[3]);
            c += 2 * (a.a[2] - a.b[2]);
            c += a.a[1] - a.b[1];
            break;
        case 2:
            var c = Math.max(0, a.b[1] - a.a[1]), d = a.a[2] - a.b[2], e = a.a[3] - a.b[3];
            if (0 > d) {
                e += d;
                if (0 > e) return 0;
                c && (c += d);
                d = 0
            }
            d += e;
            c = Math.max(0, c - e);
            return d -= Math.ceil(c / 2);
        case 3:
            c = Math.max(0, a.b[1] - a.a[1]);
            d = a.a[2] - a.b[2];
            e = a.a[3] - a.b[3];
            0 > d && (e += d, c && (c += d), d = 0);
            if (0 > e) debugger;
            c -= 2 * d;
            0 < c && (e -= Math.ceil(c / 3));
            return e
        }
        return c
    }

    function Nd(a, b, c) {
        a.b[b.A] += c;
        for (var d = 0; d < c; d++) a.K[a.H] = b, a.H++;
        T(a.j, b.m.name, b.m.h * c);
        b.u && T(a.j, b.u.name, b.u.h * c)
    }

    function Od(a) {
        a.H--;
        var b = a.K[a.H];
        a.b[b.A]--;
        T(a.j, b.m.name, -b.m.h);
        b.u && T(a.j, b.u.name, -b.u.h)
    }

    function yd(a) {
        a = E(a, function(a) { return a });
        var b = [];
        a.sort(function(a, b) { return a.name > b.name ? 1 : a.name < b.name ? -1 : 0 });
        for (var c = null, d = 0; d < a.length; d++)
            c && c.M == a[d] ? c.count++ : (c = { M: a[d], count: 1 }, b.push(c));
        return b
    }

    Kd.prototype.Ya = function(a, b, c, d, e) {
        function f() {
            if (h()) return !0;
            p.J
                ? (m(0), t ||
                    ta(F(p.a, function(a, b) { return b * a }), function(a, b) { return a + b }, 0) >= d && q(0))
                : q(0);
            return t
        }

        function g() {
            !w &&
                Qa(c,
                    function(a, c) {
                        if (0 <= a) return !1;
                        var d = sd[c];
                        return !!d && d in b
                    }) &&
                (w = !0, f())
        }

        function h() {
            (t = !Ra(c, function(a, b) { return a > (p.j[b] || 0) })) && e(Da(p.K, 0, p.H));
            return t
        }

        function m(b) {
            if (!t && !h()) {
                var d = a[b];
                if (d) {
                    var e = Math.ceil((c[d.m.name] - (p.j[d.m.name] || 0)) / d.m.h / p.L),
                        e = Math.max(Math.min(e, Math.floor((p.J - p.v) / d.A)),
                            0),
                        f = p;
                    f.v += d.A * e;
                    for (var w = 0; w < e; w++) f.wa.push(d);
                    T(f.j, d.m.name, d.m.h * e * f.L);
                    d.u && T(f.j, d.u.name, d.u.h * e * f.L);
                    for (d = e; 0 < d; d--)
                        q(0), m(b + 1), e = p, f =
                            e.wa.pop(), e.v -= f.A, T(e.j, f.m.name, -f.m.h * e.L), f.u &&
                            T(e.j, f.u.name, -f.u.h * e.L);
                    m(b + 1)
                } else g()
            }
        }

        function q(b) {
            if (!t) {
                var d = a[b];
                if (d) {
                    var e = Math.ceil((c[d.m.name] - (p.j[d.m.name] || 0)) / d.m.h), f = Md(p, d.A);
                    if (d.Ea) {
                        if (!(e > f || (e = Math.max(e, 0), Nd(p, d, e), h() || (q(b + 1), t))))
                            for (d = e; 0 < d; d--) Od(p)
                    } else if (e = Math.max(Math.min(e, f), 0), Nd(p, d, e), !h()) {
                        for (d = e; 0 < d; d--) {
                            q(b +
                                1);
                            if (t) return;
                            Od(p)
                        }
                        q(b + 1)
                    }
                } else g()
            }
        }

        var t = !1, p = this, w = !1;
        return f()
    };
    klass = Ed.prototype;
    klass.Ka = !1;
    klass.Ga = function() {
        var a = u(this.filter, this);
        this.J = this.H.Oa(this.j, a);
        this.V = 0;
        D(this.J, function(a) { this.V += a }, this);
        0 < this.za && (a = u(this.hb, this));
        a = Pd(this.H, this.j, a, this.b);
        this.c = a[0];
        this.Ka || (this.c = yc(this.c, this.K));
        this.Y = a[1]
    };
    klass.Da = function(a) {
        for (var b = 0, c = 0; 5 > c; c++) b += a[c] ? a[c].I : this.J[c];
        return b >= this.za
    };

    function Qd(a) {
        if (!a.da) return !1;
        for (var b = 0; 5 > b; b++) if (-50 <= a.da[b]) return !0;
        a.da = null;
        return !1
    }

    klass.kb = function(a) {
        if (!this.da) return !0;
        for (var b = 0; 5 > b; b++)
            if (!(-50 > this.da[b])) {
                for (var c = 0, d = 0; 5 > d; d++) c += a[d] ? a[d].U[b] : 0;
                if (c < this.da[b]) return !1
            }
        return !0
    };

    function Rd(a, b) {
        function c() {
            do var a = p.next().done || f.length >= h.ca;
            while (!(a || 200 < _dateNow() - q));
            a |= b(a ? 100 : Math.floor(f.length / h.ca * 100), f);
            q = _dateNow();
            a || setTimeout(c, 0)
        }

        function d(a, b, c) {
            function m(z) {
                for (;;)
                    switch (n) {
                    case 0:
                        Ma = !1;
                        Sb = [[], [], [], [], [], []];
                        if (!(f.length >= h.ca)) {
                            n = 1;
                            break
                        }
                        n = -1;
                        return { value: void 0, done: !0 };
                    case 1:
                        nb = Ec(h.a);
                        if (!(c <= nb)) {
                            n = 2;
                            break
                        }
                        ld = Hd(h, !0);
                        Tb = !1;
                        if (ld <= nb) {
                            var pf = Gd(h), Na = h.La(h.a), qf = u(h.eb, h, f, Na);
                            Tb = Na.Ya(g, h.b, pf, c, qf)
                        }
                        if (!Tb) {
                            n = 3;
                            break
                        }
                        n = 4;
                        return { value: !0, done: !1 };
                    case 4:
                        if (void 0 ===
                            z) {
                            n = 5;
                            break
                        }
                        n = -1;
                        throw z;
                    case 5:
                        return n = -1, { value: void 0, done: !0 };
                    case 3:
                    case 2:
                        if (!(a >= b)) {
                            n = 6;
                            break
                        }
                        n = -1;
                        return { value: void 0, done: !0 };
                    case 6:
                        if (I(h.a, null)) {
                            n = 7;
                            break
                        }
                        n = -1;
                        return { value: void 0, done: !0 };
                    case 7:
                        W = a;
                    case 8:
                        if (!(W < b)) {
                            n = 10;
                            break
                        }
                        B = h.c[W];
                        if (!h.a[B.o]) {
                            n = 11;
                            break
                        }
                        n = 9;
                        break;
                    case 11:
                        za = v(Fc, h.K, B);
                        ba = H(Sb[B.o], za);
                        if (!ba) {
                            n = 12;
                            break
                        }
                        n = 9;
                        break;
                    case 12:
                        if (!Sd(h.a, c, nb, B)) {
                            n = 13;
                            break
                        }
                        n = 10;
                        break;
                    case 13:
                        h.a[B.o] = B;
                        L = !1;
                        ca = Hd(h);
                        if (!(ca < c || 0 < B.A)) {
                            n = 14;
                            break
                        }
                        Ub = !0;
                        t = function() {
                            function a(g,
                                n) {
                                for (;;)
                                    switch (b) {
                                    case 0:
                                        if (1 != B.o) {
                                            b = 1;
                                            break
                                        }
                                        f = ea(e(0, W + 1, ca));
                                    case 2:
                                        if ((c = f.next(g)).done) {
                                            b = 3;
                                            break
                                        }
                                        b = 4;
                                        return { value: c.value, done: !1 };
                                    case 4:
                                        if (void 0 === n) {
                                            b = 5;
                                            break
                                        }
                                        b = -1;
                                        throw n;
                                    case 5:
                                        b = 2;
                                        break;
                                    case 3:
                                    case 1:
                                        f = ea(d(W + 1, h.c.length, ca));
                                    case 6:
                                        if ((c = f.next(g)).done) {
                                            b = 7;
                                            break
                                        }
                                        b = 8;
                                        return { value: c.value, done: !1 };
                                    case 8:
                                        if (void 0 === n) {
                                            b = 9;
                                            break
                                        }
                                        b = -1;
                                        throw n;
                                    case 9:
                                        b = 6;
                                        break;
                                    case 7:
                                        b = -1;
                                    default:
                                        return { value: void 0, done: !0 }
                                    }
                            }

                            var b = 0,
                                c,
                                f,
                                g = {
                                    next: function(b) { return a(b, void 0) },
                                    throw: function(b) {
                                        return a(void 0,
                                            b)
                                    }
                                };
                            init_symbol();
                            g[Symbol.iterator] = function() { return this };
                            return g
                        }();
                    case 16:
                        if (!Ub && p.done) {
                            n = 18;
                            break
                        }
                        p = t.next();
                        L |= p.value;
                        if (!(200 < _dateNow() - q)) {
                            n = 19;
                            break
                        }
                        n = 20;
                        return { value: L || Ma, done: !1 };
                    case 20:
                        if (void 0 === z) {
                            n = 21;
                            break
                        }
                        n = -1;
                        throw z;
                    case 21:
                    case 19:
                    case 17:
                        Ub = !1;
                        n = 16;
                        break;
                    case 18:
                        n = 15;
                        break;
                    case 14:
                        $b(F(h.a, function(a) { return a ? a.name : "None" }));
                    case 15:
                        L || Sb[B.o].push(B), h.a[B.o] = null, Ma |= L;
                    case 9:
                        W++;
                        n = 8;
                        break;
                    case 10:
                        return n = 22, { value: Ma, done: !1 };
                    case 22:
                        if (void 0 === z) {
                            n = 23;
                            break
                        }
                        n = -1;
                        throw z;
                    case 23:
                        n =
                            -1;
                    default:
                        return { value: void 0, done: !0 }
                    }
            }

            var n = 0,
                p,
                t,
                Ub,
                ca,
                L,
                ba,
                za,
                B,
                W,
                Tb,
                ld,
                nb,
                Sb,
                Ma,
                Na = { next: function() { return m(void 0) }, throw: function(a) { return m(a) } };
            init_symbol();
            Na[Symbol.iterator] = function() { return this };
            return Na
        }

        function e(a, b, c) {
            function f(z) {
                for (;;)
                    switch (g) {
                    case 0:
                        B = !1, za = h.Y, ba = a;
                    case 1:
                        if (!(ba < za.length)) {
                            g = 3;
                            break
                        }
                        L = za[ba];
                        if (h.a[L.o]) {
                            g = 4;
                            break
                        }
                        ca = !0;
                        h.a[L.o] = L;
                        t = Hd(h);
                        if (t != c || h.a[1].A) {
                            g = 5;
                            break
                        }
                        h.a[L.o] = null;
                        g = 3;
                        break;
                    case 5:
                        p = function() {
                            function a(m, n) {
                                for (;;)
                                    switch (c) {
                                    case 0:
                                        g = ea(d(b,
                                            h.c.length,
                                            t));
                                    case 1:
                                        if ((f = g.next(m)).done) {
                                            c = 2;
                                            break
                                        }
                                        c = 3;
                                        return { value: f.value, done: !1 };
                                    case 3:
                                        if (void 0 === n) {
                                            c = 4;
                                            break
                                        }
                                        c = -1;
                                        throw n;
                                    case 4:
                                        c = 1;
                                        break;
                                    case 2:
                                        g = ea(e(ba + 1, b, t));
                                    case 5:
                                        if ((f = g.next(m)).done) {
                                            c = 6;
                                            break
                                        }
                                        c = 7;
                                        return { value: f.value, done: !1 };
                                    case 7:
                                        if (void 0 === n) {
                                            c = 8;
                                            break
                                        }
                                        c = -1;
                                        throw n;
                                    case 8:
                                        c = 5;
                                        break;
                                    case 6:
                                        c = -1;
                                    default:
                                        return { value: void 0, done: !0 }
                                    }
                            }

                            var c = 0,
                                f,
                                g,
                                m = {
                                    next: function(b) { return a(b, void 0) },
                                    throw: function(b) { return a(void 0, b) }
                                };
                            init_symbol();
                            m[Symbol.iterator] = function() { return this };
                            return m
                        }();
                    case 6:
                        if (!ca && m.done) {
                            g = 8;
                            break
                        }
                        m = p.next();
                        B |= m.value;
                        if (!(200 < _dateNow() - q)) {
                            g = 9;
                            break
                        }
                        g = 10;
                        return { value: B, done: !1 };
                    case 10:
                        if (void 0 === z) {
                            g = 11;
                            break
                        }
                        g = -1;
                        throw z;
                    case 11:
                    case 9:
                    case 7:
                        ca = !1;
                        g = 6;
                        break;
                    case 8:
                        h.a[L.o] = null;
                    case 4:
                    case 2:
                        ba++;
                        g = 1;
                        break;
                    case 3:
                        return g = 12, { value: B, done: !1 };
                    case 12:
                        if (void 0 === z) {
                            g = 13;
                            break
                        }
                        g = -1;
                        throw z;
                    case 13:
                        g = -1;
                    default:
                        return { value: void 0, done: !0 }
                    }
            }

            var g = 0,
                m,
                p,
                t,
                ca,
                L,
                ba,
                za,
                B,
                W = { next: function() { return f(void 0) }, throw: function(a) { return f(a) } };
            init_symbol();
            W[Symbol.iterator] =
                function() { return this };
            return W
        }

        a.Ga();
        var f = [], g = vd(a.b, a.ga, a.Z), h = a;
        $b(a.c.map(function(a) { return a.name }));
        $b(g.map(function(a) { return a.name }));
        var m = Hd(a),
            q = _dateNow(),
            t = !!a.a[1],
            p = function() {
                function a(g, n) {
                    for (;;)
                        switch (b) {
                        case 0:
                            if (!t) {
                                b = 1;
                                break
                            }
                            f = ea(e(0, 0, m));
                        case 2:
                            if ((c = f.next(g)).done) {
                                b = 3;
                                break
                            }
                            b = 4;
                            return { value: c.value, done: !1 };
                        case 4:
                            if (void 0 === n) {
                                b = 5;
                                break
                            }
                            b = -1;
                            throw n;
                        case 5:
                            b = 2;
                            break;
                        case 3:
                        case 1:
                            f = ea(d(0, h.c.length, m));
                        case 6:
                            if ((c = f.next(g)).done) {
                                b = 7;
                                break
                            }
                            b = 8;
                            return {
                                value: c.value,
                                done: !1
                            };
                        case 8:
                            if (void 0 === n) {
                                b = 9;
                                break
                            }
                            b = -1;
                            throw n;
                        case 9:
                            b = 6;
                            break;
                        case 7:
                            b = -1;
                        default:
                            return { value: void 0, done: !0 }
                        }
                }

                var b = 0,
                    c,
                    f,
                    g = { next: function(b) { return a(b, void 0) }, throw: function(b) { return a(void 0, b) } };
                init_symbol();
                g[Symbol.iterator] = function() { return this };
                return g
            }();
        c()
    }

    klass.eb = function(a, b, c) {
        var d = zc(this.a), d = E(d, u(this.Da, this));
        Qd(this)
            ? D(d,
                function(d) {
                    d = Cc(d);
                    d = E(d, u(this.Da, this));
                    D(d,
                        function(d) {
                            d = Bc(d);
                            d = E(d, u(this.kb, this));
                            d = E(d, u(this.Da, this));
                            D(d,
                                function(d) {
                                    d = this.Ba(d, c, b.wa, b.L);
                                    a.push(d)
                                },
                                this)
                        },
                        this)
                },
                this)
            : D(d,
                function(d) {
                    d = this.Ba(d, c, b.wa, b.L);
                    a.push(d)
                },
                this)
    };
    klass.Ba = function(a, b, c, d) { return new xd(a, d, b, c) };
    klass.La = function() {
        for (var a = this.a, b = 1, c = 0, d = [0, 0, 0, 0], e = 0; e < a.length; e++) {
            var f = a[e];
            f && (1 == f.o ? c = f.A : f.P ? b++ : d[f.A]++)
        }
        return new Kd(d, c, b)
    };

    function Sd(a, b, c, d) {
        for (var e = 0, f = 0; 6 > f; f++) !a[f] || a[f].P && !a[1] || e++;
        a = Math.round(12 * (d.W * (6 - e) + c));
        b = Math.round(12 * b);
        return a < b
    };

    function Td() { this.Fa() }

    klass = Td.prototype;
    klass.Fa = function() {
        allWeaponSlots = this.Ca();
        R = pa;
        td(this.M);
        Tc(this.i, this.Ha)
    };
    klass.Ca = function() {
        for (var a = [], b = 0; 3 >= b; b++) a.push(new Ac(b));
        return a
    };
    klass.ta = "\u80f4\u7cfb\u7d71\u500d\u5316";
    klass.Ha = null;
    klass.i = null;
    klass.f = null;
    klass.M = null;
    klass.Oa = function(a, b) {
        var c = [0, 0, 0, 0, 0];
        D(pa, function(a, e, f) { b(a, e, f) && (c[a.part] = Math.max(a.maxdef, c[a.part])) });
        return c
    };
    klass.Ma = function() { return {} };
    klass.Ra = function() {
        var a;
        if (a = V(md)) a = E(a, nd);
        else {
            a = [];
            for (var b = 1; 3 >= b; b++)
                a.push({ name: b + "\u30b9\u30ed\u304a\u5b88\u308a", part: 5, slots: b, skills: {} })
        }
        return a
    };

    function Pd(a, b, c, d) {
        function e(a) {
            for (var b = {}, c = 0; c < a.length; c++) {
                var d = a[c].B ? a[c].B.join("") : null;
                b[d] || (b[d] = []);
                b[d].push(a[c])
            }
            return Oa(b)
        }

        var f = [
                [[], [], [], []], [[], [], [], []], [[], [], [], []], [[], [], [], []], [[], [], [], []],
                [[], [], [], []]
            ],
            g = [[], [], [], [], []],
            h = [],
            m = V(Y),
            q = V(Ud),
            t = E(pa,
                function(a, b, d) {
                    if (!c(a, b, d)) return !1;
                    b = a.part;
                    return I(q[b], a.name)
                        ? !1
                        : this.ta in a.skills
                        ? (b = new uc(a, 0), b.P = !0, g[a.part].push(b), !1)
                        : m[b]
                        ? !1
                        : !0
                },
                a);
        Ca(t, a.Ra());
        for (var p = 0; p < t.length; p++) {
            var w = t[p];
            f[w.part][w.slots].push(new uc(w,
                w.slots));
            var La = !1, mb = {}, z;
            for (z in d) 0 < w.skills[z] && (mb[z] = w.skills[z], La = !0);
            La && (w = new uc(w, Pc(mb) + w.slots), h.push(w))
        }
        K(sc,
            function(a) {
                if (6 != a)
                    for (var c = 1; 3 >= c; c++) {
                        var d = e(f[a][c]);
                        D(d,
                            function(d) {
                                if (1 == d.length) H(h, function(a) { return d[0].name == a.name }) || h.push(d[0]);
                                else if (1 < d.length) {
                                    var e = lc(d), e = new oc(a, b, c, d[0].B, e, d);
                                    h.push(e)
                                }
                            })
                    }
            });
        h = E(h, function(a) { return 5 <= a.o ? !0 : !I(q[a.o], a.name) });
        Fa(h,
            function(a, b) {
                var c = a.W, d = b.W;
                return c > d ? -1 : c < d ? 1 : 0
            });
        d = [];
        for (p = 0; p < g.length; p++)
            g[p].length &&
                (t = lc(g[p]), w = new pc(a.ta, p, b, t, g[p]), I(q[w.o], w.name) || d.push(w));
        return [h, d]
    };

    var Vd =
        /^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/;

    function Wd(a) {
        if (Xd) {
            Xd = !1;
            var b = _app.location;
            if (b) {
                var c = b.href;
                if (c && (c = (c = Wd(c)[3] || null) ? decodeURI(c) : c) && c != b.hostname) throw Xd = !0, Error();
            }
        }
        return a.match(Vd)
    }

    var Xd = Xa;

    function Yd(a, b) {
        for (var c = a.split("&"), d = 0; d < c.length; d++) {
            var e = c[d].indexOf("="), f = null, g = null;
            0 <= e ? (f = c[d].substring(0, e), g = c[d].substring(e + 1)) : f = c[d];
            b(f, g ? decodeURIComponent(g.replace(/\+/g, " ")) : "")
        }
    };

    function Zd(a, b, c) {
        this.j = this.a = null;
        this.b = a || null;
        this.v = !!c
    }

    function $d(a) {
        a.a ||
        (a.a = new Nb, a.j =
            0, a.b && Yd(a.b, function(b, c) { a.add(decodeURIComponent(b.replace(/\+/g, " ")), c) }))
    }

    klass = Zd.prototype;
    klass.add = function(a, b) {
        $d(this);
        this.b = null;
        a = ae(this, a);
        var c = Rb(this.a, a);
        c || Ob(this.a, a, c = []);
        c.push(b);
        this.j++;
        return this
    };
    klass.remove = function(a) {
        $d(this);
        a = ae(this, a);
        return Qb(this.a.b, a) ? (this.b = null, this.j -= Rb(this.a, a).length, this.a.remove(a)) : !1
    };
    klass.clear = function() {
        this.a = this.b = null;
        this.j = 0
    };
    klass.S = function() {
        $d(this);
        for (var a = this.a.T(), b = this.a.S(), c = [], d = 0; d < b.length; d++)
            for (var e = a[d], f = 0; f < e.length; f++) c.push(b[d]);
        return c
    };
    klass.T = function(a) {
        $d(this);
        var b = [];
        if (is_string(a)) {
            var c = a;
            $d(this);
            c = ae(this, c);
            Qb(this.a.b, c) && (b = Aa(b, Rb(this.a, ae(this, a))))
        } else for (a = this.a.T(), c = 0; c < a.length; c++) b = Aa(b, a[c]);
        return b
    };
    klass.toString = function() {
        if (this.b) return this.b;
        if (!this.a) return "";
        for (var a = [], b = this.a.S(), c = 0; c < b.length; c++)
            for (var d = b[c], e = encodeURIComponent(String(d)), d = this.T(d), f = 0; f < d.length; f++) {
                var g = e;
                "" !== d[f] && (g += "=" + encodeURIComponent(String(d[f])));
                a.push(g)
            }
        return this.b = a.join("&")
    };
    klass.clone = function() {
        var a = new Zd;
        a.b = this.b;
        this.a && (a.a = this.a.clone(), a.j = this.j);
        return a
    };

    function ae(a, b) {
        var c = String(b);
        a.v && (c = c.toLowerCase());
        return c
    };

    function be(a) { this.a = a }

    var ce = /\s*;\s*/;

    function de(a, b) {
        for (var c = b + "=", d = (a.a.cookie || "").split(ce), e = 0, f; f = d[e]; e++) {
            if (0 == f.lastIndexOf(c, 0)) return f.substr(c.length);
            if (f == b) return ""
        }
    }

    be.prototype.remove = function(a, b, c) {
        var d = void 0 !== de(this, a), e = 0;
        if (/[;=\s]/.test(a)) throw Error('Invalid cookie name "' + a + '"');
        if (/[;\r\n]/.test("")) throw Error('Invalid cookie value ""');
        void 0 !== e || (e = -1);
        c = c ? ";domain=" + c : "";
        b = b ? ";path=" + b : "";
        e = 0 > e
            ? ""
            : 0 == e
            ? ";expires=" + (new Date(1970, 1, 1)).toUTCString()
            : ";expires=" + (new Date(_dateNow() + 1E3 * e)).toUTCString();
        this.a.cookie = a + "=" + c + b + e + "";
        return d
    };
    be.prototype.S = function() { return ee(this).keys };
    be.prototype.T = function() { return ee(this).values };
    be.prototype.clear = function() { for (var a = ee(this).keys, b = a.length - 1; 0 <= b; b--) this.remove(a[b]) };

    function ee(a) {
        a = (a.a.cookie || "").split(ce);
        for (var b = [], c = [], d, e, f = 0; e = a[f]; f++)
            d = e.indexOf("="), -1 == d
                ? (b.push(""), c.push(e))
                : (b.push(e.substring(0, d)), c.push(e.substring(d + 1)));
        return { keys: b, values: c }
    }

    var fe = new be(document);
    fe.b = 3950;

    function ge() {
        0 != he && (ie[this[_sessionId] || (this[_sessionId] = ++closure_ver)] = this);
        this.v = this.v;
        this.K = this.K
    }

    var he = 0, ie = {};
    ge.prototype.v = !1;
    ge.prototype.pa = function() { if (this.K) for (; this.K.length;) this.K.shift()() };
    var je = !N || N && (M() || 9 <= db), ke = N && !O("9");
    !Xa || O("528");
    Wa && O("1.9b") || N && O("8") || Va && O("9.5") || Xa && O("528");
    Wa && !O("8") || N && O("9");

    function le(a, b) {
        this.type = a;
        this.a = this.target = b;
        this.Va = !0
    }

    le.prototype.b = function() { this.Va = !1 };

    function me(a) {
        me[" "](a);
        return a
    }

    me[" "] = empty_f;

    function ne(a, b) {
        le.call(this, a ? a.type : "");
        this.j = this.state = this.a = this.target = null;
        if (a) {
            this.type = a.type;
            this.target = a.target || a.srcElement;
            this.a = b;
            var c = a.relatedTarget;
            if (c && Wa)
                try {
                    me(c.nodeName)
                } catch (d) {
                }
            this.state = a.state;
            this.j = a;
            a.defaultPrevented && this.b()
        }
    }

    A(ne, le);
    ne.prototype.b = function() {
        ne.ra.b.call(this);
        var a = this.j;
        if (a.preventDefault) a.preventDefault();
        else if (a.returnValue = !1, ke)
            try {
                if (a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode) a.keyCode = -1
            } catch (b) {
            }
    };
    var oe = "closure_listenable_" + (1E6 * Math.random() | 0), pe = 0;

    function qe(a, b, c, d, e) {
        this.listener = a;
        this.a = null;
        this.src = b;
        this.type = c;
        this.va = !!d;
        this.ya = e;
        this.key = ++pe;
        this.ka = this.ua = !1
    }

    function re(a) {
        a.ka = !0;
        a.listener = null;
        a.a = null;
        a.src = null;
        a.ya = null
    };

    function se(a) {
        this.src = a;
        this.a = {};
        this.b = 0
    }

    se.prototype.add = function(a, b, c, d, e) {
        var f = a.toString();
        a = this.a[f];
        a || (a = this.a[f] = [], this.b++);
        var g = te(a, b, d, e);
        -1 < g ? (b = a[g], c || (b.ua = !1)) : (b = new qe(b, this.src, f, !!d, e), b.ua = c, a.push(b));
        return b
    };
    se.prototype.remove = function(a, b, c, d) {
        a = a.toString();
        if (!(a in this.a)) return !1;
        var e = this.a[a];
        b = te(e, b, c, d);
        return -1 < b ? (re(e[b]), C.splice.call(e, b, 1), 0 == e.length && (delete this.a[a], this.b--), !0) : !1
    };

    function ue(a, b) {
        var c = b.type;
        c in a.a && xa(a.a[c], b) && (re(b), 0 == a.a[c].length && (delete a.a[c], a.b--))
    }

    function te(a, b, c, d) {
        for (var e = 0; e < a.length; ++e) {
            var f = a[e];
            if (!f.ka && f.listener == b && f.va == !!c && f.ya == d) return e
        }
        return -1
    };

    var ve = "closure_lm_" + (1E6 * Math.random() | 0), we = {}, xe = 0;

    function ye(a, b, c, d, e) {
        if (is_array(b)) for (var f = 0; f < b.length; f++) ye(a, b[f], c, d, e);
        else if (c = ze(c), a && a[oe]) a.R.add(String(b), c, !1, d, e);
        else {
            if (!b) throw Error("Invalid event type");
            var f = !!d, g = Ae(a);
            g || (a[ve] = g = new se(a));
            c = g.add(b, c, !1, d, e);
            c.a ||
            (d = Be(), c.a = d, d.src = a, d.listener = c, a.addEventListener
                ? a.addEventListener(b.toString(), d, f)
                : a.attachEvent(Ce(b.toString()), d), xe++)
        }
    }

    function Be() {
        var a = De,
            b = je
                ? function(c) { return a.call(b.src, b.listener, c) }
                : function(c) {
                    c = a.call(b.src, b.listener, c);
                    if (!c) return c
                };
        return b
    }

    function Ee(a, b, c, d, e) {
        if (is_array(b)) for (var f = 0; f < b.length; f++) Ee(a, b[f], c, d, e);
        else
            (c = ze(c), a && a[oe])
                ? a.R.remove(String(b), c, d, e)
                : a &&
                (a = Ae(a)) &&
                (b = a.a[b.toString()], a = -1, b && (a = te(b, c, !!d, e)), (c = -1 < a ? b[a] : null) && Fe(c))
    }

    function Fe(a) {
        if ("number" != typeof a && a && !a.ka) {
            var b = a.src;
            if (b && b[oe]) ue(b.R, a);
            else {
                var c = a.type, d = a.a;
                b.removeEventListener ? b.removeEventListener(c, d, a.va) : b.detachEvent && b.detachEvent(Ce(c), d);
                xe--;
                (c = Ae(b)) ? (ue(c, a), 0 == c.b && (c.src = null, b[ve] = null)) : re(a)
            }
        }
    }

    function Ce(a) { return a in we ? we[a] : we[a] = "on" + a }

    function Ge(a, b, c, d) {
        var e = !0;
        if (a = Ae(a))
            if (b = a.a[b.toString()])
                for (b = b.concat(), a = 0; a < b.length; a++) {
                    var f = b[a];
                    f && f.va == c && !f.ka && (f = He(f, d), e = e && !1 !== f)
                }
        return e
    }

    function He(a, b) {
        var c = a.listener, d = a.ya || a.src;
        a.ua && Fe(a);
        return c.call(d, b)
    }

    function De(a, b) {
        if (a.ka) return !0;
        if (!je) {
            var c;
            if (!(c = b))
                a: {
                    c = ["window", "event"];
                    for (var d = _app, e; e = c.shift();)
                        if (null != d[e]) d = d[e];
                        else {
                            c = null;
                            break a
                        }
                    c = d
                }
            e = c;
            c = new ne(e, this);
            d = !0;
            if (!(0 > e.keyCode || void 0 != e.returnValue)) {
                a: {
                    var f = !1;
                    if (0 == e.keyCode)
                        try {
                            e.keyCode = -1;
                            break a
                        } catch (g) {
                            f = !0
                        }
                    if (f || void 0 == e.returnValue) e.returnValue = !0
                }
                e = [];
                for (f = c.a; f; f = f.parentNode) e.push(f);
                for (var f = a.type, h = e.length - 1; 0 <= h; h--) {
                    c.a = e[h];
                    var m = Ge(e[h], f, !0, c), d = d && m
                }
                for (h = 0; h < e.length; h++)
                    c.a = e[h], m = Ge(e[h],
                        f,
                        !1,
                        c), d = d && m
            }
            return d
        }
        return He(a, new ne(b, this))
    }

    function Ae(a) {
        a = a[ve];
        return a instanceof se ? a : null
    }

    var Ie = "__closure_events_fn_" + (1E9 * Math.random() >>> 0);

    function ze(a) {
        if ("function" == get_type(a)) return a;
        a[Ie] || (a[Ie] = function(b) { return a.handleEvent(b) });
        return a[Ie]
    };

    function Je() {
        ge.call(this);
        this.R = new se(this);
        this.$a = this;
        this.ma = null
    }

    A(Je, ge);
    Je.prototype[oe] = !0;
    Je.prototype.addEventListener = function(a, b, c, d) { ye(this, a, b, c, d) };
    Je.prototype.removeEventListener = function(a, b, c, d) { Ee(this, a, b, c, d) };

    function Z(a, b) {
        var c, d = a.ma;
        if (d) for (c = []; d; d = d.ma) c.push(d);
        var d = a.$a, e = b, f = e.type || e;
        if (is_string(e)) e = new le(e, d);
        else if (e instanceof le) e.target = e.target || d;
        else {
            var g = e, e = new le(f, d);
            Ta(e, g)
        }
        var g = !0, h;
        if (c) for (var m = c.length - 1; 0 <= m; m--) h = e.a = c[m], g = Ke(h, f, !0, e) && g;
        h = e.a = d;
        g = Ke(h, f, !0, e) && g;
        g = Ke(h, f, !1, e) && g;
        if (c) for (m = 0; m < c.length; m++) h = e.a = c[m], g = Ke(h, f, !1, e) && g
    }

    Je.prototype.pa = function() {
        Je.ra.pa.call(this);
        if (this.R) {
            var a = this.R, b = 0, c;
            for (c in a.a) {
                for (var d = a.a[c], e = 0; e < d.length; e++) ++b, re(d[e]);
                delete a.a[c];
                a.b--
            }
        }
        this.ma = null
    };

    function Ke(a, b, c, d) {
        b = a.R.a[String(b)];
        if (!b) return !0;
        b = b.concat();
        for (var e = !0, f = 0; f < b.length; ++f) {
            var g = b[f];
            if (g && !g.ka && g.va == c) {
                var h = g.listener, m = g.ya || g.src;
                g.ua && ue(a.R, g);
                e = !1 !== h.call(m, d) && e
            }
        }
        return e && 0 != d.Va
    };

    function Le(a, b, c) {
        if ("function" == get_type(a)) c && (a = u(a, c));
        else if (a && "function" == typeof a.handleEvent) a = u(a.handleEvent, a);
        else throw Error("Invalid listener argument");
        return 2147483647 < b ? -1 : _app.setTimeout(a, b || 0)
    };

    function Me() {}

    Me.prototype.a = null;

    function Ne(a) {
        var b;
        (b = a.a) || (b = {}, Oe(a) && (b[0] = !0, b[1] = !0), b = a.a = b);
        return b
    };

    var Pe;

    function Qe() {}

    A(Qe, Me);

    function Re(a) { return (a = Oe(a)) ? new ActiveXObject(a) : new XMLHttpRequest }

    function Oe(a) {
        if (!a.b && "undefined" == typeof XMLHttpRequest && "undefined" != typeof ActiveXObject) {
            for (var b = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], c = 0;
                c < b.length;
                c++) {
                var d = b[c];
                try {
                    return new ActiveXObject(d), a.b = d
                } catch (e) {
                }
            }
            throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");
        }
        return a.b
    }

    Pe = new Qe;

    function Se(a) {
        Je.call(this);
        this.ab = new Nb;
        this.$ = a || null;
        this.b = !1;
        this.Z = this.a = null;
        this.J = this.la = "";
        this.j = this.ha = this.H = this.ga = !1;
        this.Y = 0;
        this.V = null;
        this.Ia = Te;
        this.na = this.cb = !1
    }

    A(Se, Je);
    var Te = "", Ue = /^https?$/i, Ve = ["POST", "PUT"], We = [];
    klass = Se.prototype;
    klass.fb = function() {
        if (!this.v && (this.v = !0, this.pa(), 0 != he)) {
            var a = this[_sessionId] || (this[_sessionId] = ++closure_ver);
            delete ie[a]
        }
        xa(We, this)
    };
    klass.send = function(a, b, c, d) {
        if (this.a) throw Error("[goog.net.XhrIo] Object is active with another request=" + this.la + "; newUri=" + a);
        b = b ? b.toUpperCase() : "GET";
        this.la = a;
        this.J = "";
        this.ga = !1;
        this.b = !0;
        this.a = this.$ ? Re(this.$) : Re(Pe);
        this.Z = this.$ ? Ne(this.$) : Ne(Pe);
        this.a.onreadystatechange = u(this.Sa, this);
        try {
            this.ha = !0, this.a.open(b, String(a), !0), this.ha = !1
        } catch (e) {
            Xe(this, e);
            return
        }
        a = c || "";
        var f = this.ab.clone();
        d && Hb(d, function(a, b) { Ob(f, b, a) });
        d = H(f.S(), Ye);
        c = _app.FormData && a instanceof _app.FormData;
        !I(Ve,
                b) ||
            d ||
            c ||
            Ob(f, "Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        f.forEach(function(a, b) { this.a.setRequestHeader(b, a) }, this);
        this.Ia && (this.a.responseType = this.Ia);
        "withCredentials" in this.a && (this.a.withCredentials = this.cb);
        try {
            Ze(this), 0 < this.Y &&
            ((this.na = $e(this.a))
                ? (this.a.timeout = this.Y, this.a.ontimeout = u(this.Za, this))
                : this.V = Le(this.Za, this.Y, this)), this.H = !0, this.a.send(a), this.H = !1
        } catch (g) {
            Xe(this, g)
        }
    };

    function $e(a) { return N && O(9) && "number" == typeof a.timeout && void 0 !== a.ontimeout }

    function Ye(a) { return "content-type" == a.toLowerCase() }

    klass.Za = function() {
        "undefined" != typeof var_or_emptyObj &&
            this.a &&
            (this.J = "Timed out after " + this.Y + "ms, aborting", Z(this, "timeout"), this.a &&
                this.b &&
                (this.b = !1, this.j = !0, this.a.abort(), this.j =
                    !1, Z(this, "complete"), Z(this, "abort"), af(this)))
    };

    function Xe(a, b) {
        a.b = !1;
        a.a && (a.j = !0, a.a.abort(), a.j = !1);
        a.J = b;
        bf(a);
        af(a)
    }

    function bf(a) { a.ga || (a.ga = !0, Z(a, "complete"), Z(a, "error")) }

    klass.pa = function() {
        this.a && (this.b && (this.b = !1, this.j = !0, this.a.abort(), this.j = !1), af(this, !0));
        Se.ra.pa.call(this)
    };
    klass.Sa = function() { this.v || (this.ha || this.H || this.j ? cf(this) : this.mb()) };
    klass.mb = function() { cf(this) };

    function cf(a) {
        if (a.b && "undefined" != typeof var_or_emptyObj && (!a.Z[1] || 4 != df(a) || 2 != ef(a)))
            if (a.H && 4 == df(a)) Le(a.Sa, 0, a);
            else if (Z(a, "readystatechange"), 4 == df(a)) {
                a.b = !1;
                try {
                    var b = ef(a), c;
                    a: switch (b) {
                    case 200:
                    case 201:
                    case 202:
                    case 204:
                    case 206:
                    case 304:
                    case 1223:
                        c = !0;
                        break a;
                    default:
                        c = !1
                    }
                    var d;
                    if (!(d = c)) {
                        var e;
                        if (e = 0 === b) {
                            var f = Wd(String(a.la))[1] || null;
                            if (!f && self.location) var g = self.location.protocol, f = g.substr(0, g.length - 1);
                            e = !Ue.test(f ? f.toLowerCase() : "")
                        }
                        d = e
                    }
                    if (d) Z(a, "complete"), Z(a, "success");
                    else {
                        var h;
                        try {
                            h = 2 < df(a) ? a.a.statusText : ""
                        } catch (m) {
                            h = ""
                        }
                        a.J = h + " [" + ef(a) + "]";
                        bf(a)
                    }
                } finally {
                    af(a)
                }
            }
    }

    function af(a, b) {
        if (a.a) {
            Ze(a);
            var c = a.a, d = a.Z[0] ? empty_f : null;
            a.a = null;
            a.Z = null;
            b || Z(a, "ready");
            try {
                c.onreadystatechange = d
            } catch (e) {
            }
        }
    }

    function Ze(a) {
        a.a && a.na && (a.a.ontimeout = null);
        "number" == typeof a.V && (_app.clearTimeout(a.V), a.V = null)
    }

    function df(a) { return a.a ? a.a.readyState : 0 }

    function ef(a) {
        try {
            return 2 < df(a) ? a.a.status : -1
        } catch (b) {
            return -1
        }
    };

    var ff, gf;
    gf = function() { return de(fe, "csrftoken") || "" };
    ff = function(a, b, c) {
        var d = { "Content-Type": "application/x-www-form-urlencoded", "X-CSRFToken": gf() }, e = new Nb(b);
        b = Gb(e);
        if ("undefined" == typeof b) throw Error("Keys are undefined");
        for (var f = new Zd(null, 0, void 0), e = Fb(e), g = 0; g < b.length; g++) {
            var h = b[g], m = e[g];
            if (is_array(m)) {
                var q = f;
                q.remove(h);
                0 < m.length && (q.b = null, Ob(q.a, ae(q, h), Ba(m)), q.j += m.length)
            } else f.add(h, m)
        }
        b = f.toString();
        f = new Se;
        We.push(f);
        c && f.R.add("complete", c, !1, void 0, void 0);
        f.R.add("ready", f.fb, !0, void 0, void 0);
        f.send(a, "POST", b, d)
    };

    function hf(a) {
        if (a.classList) return a.classList;
        a = a.className;
        return is_string(a) && a.match(/\S+/g) || []
    }

    function jf(a) { return a.classList ? a.classList.contains("skillselected") : I(hf(a), "skillselected") }

    function kf(a) {
        a.classList
            ? a.classList.remove("skillselected")
            : jf(a) && (a.className = E(hf(a), function(a) { return "skillselected" != a }).join(" "))
    };

    function lf(a, b, c) {
        a = [a, b, c];
        a.sort();
        a.reverse();
        b = va(a);
        return new Ac(b, a)
    }

    var Zb = {
            weapon: ["w", String],
            sex: ["s", Number],
            limit: ["l", Number],
            mindef: ["d", Number],
            minres_fire: ["rf", Number],
            minres_water: ["rw", Number],
            minres_thunder: ["rt", Number],
            minres_ice: ["ri", Number],
            minres_dragon: ["rd", Number]
        },
        mf = new kd("en-myset", []),
        nf = new kd("en-gender", 1),
        Ud = new kd("en-exclude", [[], [], [], [], [], []]),
        of = new kd("en-decocount", {}),
        Y = new kd("en-pinned", [null, null, null, null, null, null]),
        rf = [];

    function sf(a) {
        var b = getElementById("results");
        a =
            '<div class="progress progress-striped active"><div class="progress-bar"  role="progressbar" aria-valuenow="' +
            toEncodedString(a) +
            '" aria-valuemin="0" aria-valuemax="100" style="width:' +
            toEncodedString(a) +
            '%"><span class="sr-only">Searching: ' +
            toEncodedString(a) +
            "%</span></div></div>";
        b.innerHTML = a
    }

    function tf(a) { getElementById("mysetpane").innerHTML = ub({ Ua: a, qa: "myset" }) }

    function uf(a) {
        try {
            vf[a]()
        } catch (b) {
            window.alert(b)
        }

        return !1
    }

    function wf(a, b, c, d, e) {
        Hc.xa();
        var f = H(V(Y), G) || H(V(Ud), function(a) { return !!a.length });
        return tb({ i: a, c: b, time: c, ca: e, jb: f, ib: d })
    }

    function xf() {
        var a = F(document.getElementsByClassName("skillitem"), function(a) { return a.value });
        return a = E(a, G)
    }

    function yf() {
        var a = F(document.getElementsByClassName("skillitem"),
            function(a) { return a.options[a.selectedIndex].getAttribute("exclude") ? "" : a.value });
        return a = E(a, G)
    }

    function zf() {
        var a = F(document.getElementsByClassName("skillitem"),
            function(a) {
                return a.options[a.selectedIndex].getAttribute("exclude") ? a.getAttribute("skillpointname") : ""
            });
        return a = E(a, G)
    }

    function Af() {
        var a = V(Ud), b = V(Y), c = F(R, rc), c = Aa(c, Gc()), d = [[], [], [], [], [], []];
        D(c, function(a) { d[a.o].push(a) });
        var c = Kc(), e = V(of), f = [];
        D(c,
            function(a) {
                var b = F(a.i, function(a) { return a.D });
                Ea(b);
                b = E(F(b, wd), G);
                b = F(b,
                    function(a) {
                        var b = Hc.xa().a[a.m.name];
                        return { name: a.name, count: Math.min(void 0 === e[a.name] ? 7 : e[a.name], b), max: b }
                    });
                b.length && f.push({ aa: a.aa, C: b })
            });
        getElementById("dynamic-style").innerHTML = Ab({ O: b, F: a });
        getElementById("excludeincludepane").innerHTML = Cb({ O: b, F: a, c: d, C: f });
        $('.pin-select').selectpicker();
    }

    function Bf() {
        var a = document.querySelectorAll("select.skillitem");
        D(a,
            function(a) {
                a.value
                    ? a.classList
                    ? a.classList.add("skillselected")
                    : jf(a) || (a.className += 0 < a.className.length ? " skillselected" : "skillselected")
                    : kf(a)
            });
        a = document.querySelectorAll("select.skillitem option");
        a = E(a, function(a) { return a.selected && a.value });
        a = F(a, function(a) { return a.value });
        getElementById("checkedskillstyle").innerHTML = rb({ i: a })
    }

    function Cf(a) {
        var b = Ad(a), c = Bd(a);
        Qc(b, c);
        var b = Yc(b), d = Jd(a.f);
        D(a.C, function(a) { d[a.M.level] -= a.count });
        0 > d[1] && (d[2] += d[1], d[1] = 0);
        0 > d[2] && (d[3] += d[2], d[2] = 0);
        return wb({ i: b, c: a.f, C: c, ba: a.ba, ia: a.ia, sa: a.sa, U: a.U, Aa: d })
    }

    function Df(a, b, c, d) {
        var e = Dc(c.w), f = c.l || 200;
        return new Ef(Hc.xa(), c.s, 3, e, c.g, c.d, [c.rf, c.rw, c.rt, c.ri, c.rd], a, b, f, d)
    }

    var vf = {
        search: empty_f,
        myset: function() {
            var a = F(V(mf), Ff);
            tf(a)
        },
        excludeinclude: Af
    };

    function Gf(a, b, c, d, e, f, g) { xd.call(this, a, b, c, d, e, f, g) }

    A(Gf, xd);
    Gf.prototype.b = 6;

    function Ff(a) {
        function b(a) {
            if (!a) return [];
            var b = [];
            D(a, function(a) { for (var c = ud(a.name), d = 0; d < a.count; d++) b.push(c) });
            return b
        }

        var c = F(a.equipments, mc), d = E(c, function(a) { return a && a.P }).length + 1, e = null;
        a.weapon && (e = Dc(a.weapon));
        c.push(e);
        return new Gf(c, d, b(a.decos), b(a.bodyDecos), a.mySetId, a.myLocalSetId, !0)
    }

    function Hc() {
        this.Fa();
        var a = {};
        D(Kc(), function(b) { D(b.i, function(b) { a[b.D] = Math.max(b.h, a[b.D] || 0) }) });
        this.a = a
    }

    A(Hc, Td);
    (function() {
        var a = Hc;
        a.xa = function() { return a.Pa ? a.Pa : a.Pa = new a }
    })();
    klass = Hc.prototype;
    klass.Ha = {
        "Iron Skin": 1,
        "Weakness Exploit": 1,
        "LV2 Slot Skill": 1,
        Geologist: 1,
        "Normal Shots": 1,
        "Critical Eye": 1,
        "Attack Boost": 1,
        "Maximum Might": 1,
        "Item Prolonger": 1,
        "Free Elem/Ammo Up": 1,
        Intimidator: 1,
        "Power Prolonger": 1,
        "Sleep Attack": 1,
        "Critical Draw": 1,
        Bombardier: 1,
        "Spread/Power Shots": 1,
        "Speed Sharpening": 1,
        "Blast Functionality": 1,
        "Elderseal Boost": 1,
        Artillery: 1,
        "Dragon Resistance": 1,
        "Sporepuff Expert": 1,
        "Protective Polish": 1,
        Earplugs: 1,
        "Capacity Boost": 1,
        "Evade Window": 1,
        "LV3 Slot Skill": 1,
        "Paralysis Functionality": 1,
        "Sleep Resistance": 1,
        Entomologist: 1,
        Agitator: 1,
        "Defence Boost": 1,
        "Affinity Sliding": 1,
        "Non-elemental Boost": 1,
        "Special Ammo Boost": 1,
        "Bow Charge Plus": 1,
        Heroics: 1,
        "LV1 Slot Skill": 1,
        Focus: 1,
        "Speed Eating": 1,
        Fortify: 1,
        Slugger: 1,
        Resuscitate: 1,
        Botanist: 1,
        "Palico Rally": 1,
        Handicraft: 1,
        Constitution: 1,
        "Ice Resistance": 1,
        Stealth: 1,
        "Effluvial Resistance": 1,
        "Evade Extender": 1,
        "Paralysis Attack": 1,
        "Ice Attack": 1,
        "Stun Resistance": 1,
        "Scent Hound": 1,
        Windproof: 1,
        "Divine Blessing": 1,
        "Thunder Attack": 1,
        "Poison Attack": 1,
        Mushroomancer: 1,
        "Guard Up": 1,
        "Recovery Up": 1,
        Partbreaker: 1,
        "Thunder Resistance": 1,
        "Tremor Resistance": 1,
        "Mind\u2019s Eye/Ballistics": 1,
        "Aquatic Expert": 1,
        "Water Resistance": 1,
        "Heavy Artillery": 1,
        "Recovery Speed": 1,
        Resentment: 1,
        "Fire Attack": 1,
        "Blast Resistance": 1,
        "Peak Performance": 1,
        "Critical Boost": 1,
        "Poison Functionality": 1,
        Airborne: 1,
        "Blight Resistance": 1,
        "Flinch Free": 1,
        "Latent Power": 1,
        "Marathon Runner": 1,
        "Piercing Shots": 1,
        "Stamina Thief": 1,
        "Paralysis Resistance": 1,
        "Dragon Attack": 1,
        "Horn Maestro": 1,
        "Stamina Surge": 1,
        "Slinger Capacity": 1,
        "Blast Attack": 1,
        "Tool Specialist": 1,
        "Health Boost": 1,
        "Water Attack": 1,
        "Free Meal": 1,
        "Quick Sheath": 1,
        "Wide-Range": 1,
        "Poison Resistance": 1,
        Guard: 1,
        "Bleeding Resistance": 1,
        "Fire Resistance": 1,
        "Sleep Functionality": 1,
        "Hunger Resistance": 1
    };
    klass.i = _skills;
    klass.M = _decos;
    klass.ta = "Torso Up";
    klass.Oa = function(a, b) {
        var c = [0, 0, 0, 0, 0, 0];
        D(pa, function(a, e, f) { b(a, e, f) && (c[a.part] = Math.max(a.maxdef, c[a.part])) });
        return c
    };
    klass.Fa = function () {
        changeLoadedGear(true);
        allWeaponSlots = this.Ca();
        R = pa;
        td(this.M);
        Uc(this.i, this.Ha)
    };
    klass.Ra = function() { return [] };
    klass.Ma = function() {
        var a = V(of);
        return Ka(a, function(a) { return parseInt(a, 10) })
    };
    klass.Ca = function() {
        for (var a = [], b = 4; 0 <= b; b--)
            for (var c = b; 0 <= c; c--) for (var d = c; 0 <= d; d--) a.push(lf(b, c, d));
        a.reverse();
        return a
    };
    Hc.xa();

    function Ef(a, b, c, d, e, f, g, h, m, q, t) {
        this.na = t && !(0 < f || -50 < Math.max.apply(Math, g));
        Ed.call(this, a, b, c, d, 99, e, h, q);
        this.za = f || 0;
        this.da = g;
        this.la = this.H.Ma();
        this.ma = m
    }

    A(Ef, Ed);
    klass = Ef.prototype;
    klass.Ka = !0;
    klass.Na = function() {
        var a = F(V(Y), mc);
        return Aa(a, [this.ha])
    };
    klass.Ba = function(a, b, c, d) { return new Gf(a, d, b, c) };
    klass.Ga = function() {
        Ef.ra.Ga.call(this);
        this.na &&
        (this.c = E(this.c,
            function(a, b, c) {
                for (var d = 0; d < b; d++) if (Fc(this.K, a, c[d])) return !1;
                return !0
            },
            this))
    };
    klass.La = function(a) { return new Id(Jd(a), this.la) };
    klass.filter = function(a, b, c) {
        return Ef.ra.filter.call(this, a, b, c) ? ua(this.ma, function(b) { return !(b in a.skills) }) : !1
    };
    y("renderPage",
        function() {
            var a = DecodeSkillsFromUri(),
                b = a.skills ? a.skills.split(",") : [],
                c = Kc(),
                c = F(c,
                    function(a) {
                        var b = [];
                        D(a.i,
                            function(a) {
                                var c = H(b, function(b) { return b.D == a.D });
                                c || (c = { D: a.D, Qa: [] }, b.push(c));
                                c.Qa.push(a)
                            });
                        return { aa: a.aa, i: b }
                    }),
                d = getElementById("ui"),
                localStorageEnabled;
            try {
                U("testtesttest", "testtesttest"), fd.remove("testtesttest"), localStorageEnabled = true;
            } catch (f) {
                localStorageEnabled = false;
            }
            d.innerHTML = PrintPage(localStorageEnabled, allWeaponSlots);
            "s" in a || (a.s = V(nf));
            K(Zb,
                function(b, c) {
                    if (b[0] in a) {
                        var d = getElementById(c);
                        "checkbox" == d.type ? d.checked = "true" == a[b[0]] : d.value = a[b[0]]
                    }
                });
            c = document.querySelectorAll("select.skillitem option");
            D(c, function(a) { I(b, a.value) && (a.selected = !0) });
            Bf();
            getElementById("searchbutton").onclick = function() {
                var a = Yb();
                U(nf.a, a.s);
                var b = xf(), c = yf(), d = zf();
                Xb(b, a);
                var e = _dateNow(), f = Df(c, d, a, !1);
                Fd(f)
                    ? (getElementById("searchbutton").disabled = !0, sf(0), Rd(f,
                        function(c, d) {
                            if (100 <= c) {
                                var m = getElementById("results");
                                Fa(d, Cd);
                                rf = d;
                                var q = 0 < a.d || -50 < a.rf || -50 < a.rw || -50 < a.rt || -50 < a.ri || -50 < a.rd;
                                m.innerHTML = wf(b, d, (_dateNow() - e) / 1E3, q, f.ca);
                                getElementById("searchbutton").disabled = !1
                            } else sf(c);
                            return !1
                        }))
                    : window.alert("Invalid equipment is pinned.")
            };
            getElementById("extraskillsearchbutton").onclick =
                function () {

                    function a(z) {
                        z >= f.length
                            ? (getElementById("extraskillsearchbutton").disabled = !1, getElementById("results").innerHTML =
                                PrintMoreSkills({ bb: c, time: (_dateNow() - mb) / 1E3, foundSkills: La }))
                            : Rd(Df(Aa(d, [f[z].name]), e, b, !0),
                                function(b, c) {
                                    100 > b ||
                                        (sf((z + 1) / f.length * 100), 0 < c.length && La.push({ skill: f[z].D, name: f[z].name, type: f[z].type, points: f[z].h, group: f[z].group }), setTimeout(
                                        function() { a(z + 1) },
                                        0))
                                })
                    }

                    var b = Yb();
                    b.l = 1;
                    var c = xf(),
                        d = yf(),
                        e = zf(),
                        f = Wc(),
                        w = F(d, Vc),
                        f = E(f,
                            function(a) {
                                return I(d, a.name) || 0 > a.h
                                    ? !1
                                    : !H(w, function(b) { return b.D == a.D && b.h > a.h })
                            }),
                        La = [];
                    getElementById("extraskillsearchbutton").disabled = !0;
                    sf(0);
                    var mb = _dateNow();
                    a(0)
                };
            D(Pa(vf), function(a) { document.querySelector("#tab-" + a + " a").onclick = v(uf, a) });
            getElementById("resetbutton").onclick = function() {
                var a = document.querySelectorAll("select.skillitem");
                D(a, function(a) { a.value = "" });
                Bf()
            };
            Af()
        });
    y("renderSavedResultPage",
        function(a) {
            a = Ff(a);
            getElementById("ui").innerHTML = zb({ f: a.f, C: a.C, N: a.N, G: !1, Xa: !0 }) +
                "<div id=details class=saved-result-element></div>";
            getElementById("details").innerHTML = Cf(a)
        });
    y("renderInspectPage",
        function() {
            var a = getElementById("ui"), b;
            b = window.localStorage.getItem("en-myset") || "";
            b = "Raw armor set data(DEBUG)<pre>" + toEncodedString(b) + "</pre>";
            a.innerHTML = b
        });
    y("toggleResult",
        function(a, b) {
            var c = getElementById(a + "-details-" + b), d = c.style.display;
            c.style.display = d ? "" : "none";
            if ("none" == d) {
                var c = c.getElementsByTagName("td")[0], e;
                "myset" == a
                    ? (d = Ff(V(mf)[b]), e = yb(d), e += Cf(d))
                    : (d = rf[b], e = yb(d), d = e += Cf(d), e = "<div><button id='resultitem-myset-button-" +
                        toEncodedString(b) +
                        "' onclick='onAddMyset(" +
                        toEncodedString(b) +
                        ")' translation-section='armorcalc' translation-key='add_armor'>" + _gts('armorcalc', 'add_armor') + "</button></div>", e = d + e);
                c.innerHTML = e
            }
        });
    y("onAddMyset",
        function(a) {
			dbgObj(a);
            var b = rf[a],
                c = { data: JSON.stringify(Dd(b)), skills: JSON.stringify(zd(b)) },
                d = getElementById("resultitem-myset-button-" + a);
            d.disabled = 1;
            ff("/register",
                c,
                function(a) {
                    var c = d.parentNode, g;
                    a = a.target;
                    try {
                        g = a.a ? a.a.responseText : ""
                    } catch (h) {
                        g = ""
                    }
                    b.ba = g;
                    b.ia = "__" + Math.random().toString(36);
                    a = V(mf);
                    a.push(Dd(b));
                    for (var m = 0; m < a.length; m++)
                        a[m].myLocalSetId || (a[m].myLocalSetId = "__" + Math.random().toString(36));
                    U(mf.a, a);
                    g = "<span translation-section='armorcalc' translation-key='armor_added'>" + _gts('armorcalc', 'armor_added') + "</span><br>" + xb({ id: g });
                    c.innerHTML = g;
                    a = F(a, Ff);
                    tf(a)
                })
        });
    y("onRemoveMySetClick",
        function(a) {
            var b = V(mf);
            ya(b, function(b) { return b.mySetId == a }) || ya(b, function(b) { return b.myLocalSetId == a });
            U(mf.a, b);
            b = F(b, Ff);
            tf(b)
        });
    y("onPinEquipment",
        function(a) {
            var b = a.getAttribute("equip");
            a = parseInt(a.getAttribute("part"), 10);
            var c = V(Y);
            c[a] = c[a] == b ? null : b;
            U(Y.a, c);
            Af();
            return !1
        });
    y("onPinEquipmentChange",
        function(a) {
            var b = a.value;
            a = parseInt(a.getAttribute("part"), 10);
            var c = V(Y);
            c[a] = b || null;
            U(Y.a, c);
            Af();
            $('.pin-select').selectpicker();
            return !1
        });
    y("onPinEquipmentRemove",
        function(a) {
            a = parseInt(a.getAttribute("part"), 10);
            var b = V(Y);
            b[a] = null;
            U(Y.a, b);
            Af();
            return !1
        });
    y("onExcludeEquipment",
        function(a) {
            var b = a.getAttribute("equip");
			if (b == 'null') return false;
            a = parseInt(a.getAttribute("part"), 10);
            var c = V(Ud);
            I(c[a], b) ? xa(c[a], b) : c[a].push(b);
            U(Ud.a, c);
            Af();
            return !1
        });
    y("onChangeSkill", Bf);
    y("onExtraSkillClick",
        function(a) {
            var b = H(document.querySelectorAll("select.skillitem option"),
                function(b) { return b.value == a && b.value });
            b || alert("no element found for " + a);
            b.selected = !0;
            Bf();
            return !1
        });
    y("onDecoCountChange",
        function(a, b) {
            var c = V(of) || {};
            c[a] = b;
            U(of.a, c)
        });
    y("setAllDecoCount",
        function(a) {
            var b = V(of) || {}, c = document.querySelectorAll(".deco-setting select");
            D(c,
                function(c) {
                    var e = c.getElementsByTagName("option"), f = H(e, function(b) { return b.value == a }), g = a;
                    f || (g = parseInt(e[e.length - 1].value, 10));
                    c.value = g;
                    b[c.getAttribute("deconame")] = g
                });
            U(of.a, b)
        });
    y("onTabClicked", uf);
    y("importDecos",
        function() {
            try {
                var a = getElementById("decoimportexport").value;
                if (a) {
                    var b = JSON.parse(a);
                    isObjOrFunc(b) && (b = Ka(b, function(a) { return parseInt(a, 10) }), U(of.a, b), Af())
                }
            } catch (c) {
                alert(c)
            }
        });
    y("exportDecos",
        function() {
            var a = V(of);
            getElementById("decoimportexport").value = JSON.stringify(a);
			
			getElementById("decoimportexport").select();
			document.execCommand("copy");
        });
    tc = !1;
})()
