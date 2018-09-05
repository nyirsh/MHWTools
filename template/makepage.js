$(function () {
    LoadHome();
    $("#navContainer").load("/MHWTools/template/menu.html", function () { finalizePage(); });
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
        $(this).html(_gts($(this).attr("translation-section"), $(this).attr("translation-key")));
    });
}

function applyLanguage(lang) {
    curr_lang = lang;
    translatePage();
}

function ResetPage() {
    //$('#ui').html('Loading');
    $('#uihome').css('display', 'none');
    $('#uiarmorcalc').css('display', 'none');
    $('#uidamagetest').css('display', 'none');
}

function LoadHome() {
    ResetPage();
    if ($('#uihome').html() == 'Loading')
        $("#uihome").load("/MHWTools/home.html", function () { translatePage(); });
    $('#uihome').css('display', 'block');
}

function LoadArmorCalculator() {
    ResetPage();
    if ($('#uiarmorcalc').html() == 'Loading')
        $("#uiarmorcalc").load("/MHWTools/armorcalc/app.html", function () { renderPage(""); });
    $('#uiarmorcalc').css('display', 'block');
}

function LoadDamageCalculator() {
    ResetPage();
    if ($('#uidamagetest').html() == 'Loading')
        $("#uidamagetest").load("/MHWTools/damagecalc/app.html", function () { });
    $('#uidamagetest').css('display', 'block');
}
