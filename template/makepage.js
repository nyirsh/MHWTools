$(function () {
    LoadHome();
    $("#navContainer").load("/template/menu.html", function () { finalizePage(); });
});

function finalizePage() {
    $(".nav.nav-link").on("click", function () {
        $(".nav.nav-link.active").removeClass("active");
        $(this).addClass("active");
    });

    translatePage();
}

function translatePage() {
    $("[translation-section]").each(function () {
        $(this).text(_gts($(this).attr("translation-section"), $(this).attr("translation-key")));
    });
}

function applyLanguage(lang) {
    curr_lang = lang;
    translatePage();
}

function ResetPage() {
    $('#ui').html('Loading');
}

function LoadHome() {
    ResetPage();
    $("#ui").load("/home.html", function () { translatePage(); });
}

function LoadArmorCalculator() {
    ResetPage();
    $("#ui").load("/armorcalc/app.html", function () { renderPage(""); });
}

function LoadDamageCalculator() {
    ResetPage();
    $("#ui").load("/damagecalc/app.html", function () { });
}