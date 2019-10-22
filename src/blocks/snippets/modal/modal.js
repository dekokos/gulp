$(function() {

    $(document).on('click', '[data-modal]',function(e) {
        e.preventDefault();
        var newModal = $(this).data("modal");
        if ( $(".default-modal.is-active").length ) {
            callbackClose();
            setTimeout(function() {
                showModal(newModal);
            }, 300);
        }else{
            showModal(newModal);
        }
    });
    $(document).on('click', '.default-modal__close, [data-modal-close]', function() {
        callbackClose();
    });
    $("html").on('click', function(e) {
        if (!$(e.target).closest(".default-modal__content").length && $(".default-modal").hasClass("is-active")) {
            callbackClose();
        }
    });
    document.addEventListener('keydown', function (e) {
        if(e.key==="Escape"||e.key==='Esc'||e.keyCode===27) {
            callbackClose();
        }
    });

});
function showModal(e) {
    $("body").addClass("modal-open");
    var modal = $("." + e + "");
    $('html').addClass('no-scroll');
    ///////////////////
    modalOpenMac();
    ///////////////////
    if (hasScrollbar()) {
        var scrollWidth = getScrollbarWidth();
        $("html").css({
            "margin-right": scrollWidth
        });
        modal.addClass("is-active");
    } else {
        modal.addClass("is-active");
    }

    var isIE = /*@cc_on!@*/false || !!document.documentMode;
    if (isIE === true) {
        if ( modal.find(".default-modal__content").outerHeight() > $(window).height() ) {
            modal.css("display", "block");
        }else {
            modal.removeAttr("style");
        }
    }

}
function callbackClose() {
    if ($("body").hasClass("modal-open") && !$("body").hasClass("mob-nav-open")) {
        $("body").removeClass("modal-open");
        $(".default-modal").removeClass("is-active");
        setTimeout(function () {
            $('html').removeClass('no-scroll');
            $('html').css('margin-right', '');
            /////////////////////
            modalCloseMac();
            /////////////////////
        }, 300);
    }else if ( $("body").hasClass("mob-nav-open") ){
        $("body").removeClass("modal-open");
        $(".default-modal").removeClass("is-active");
    }
}