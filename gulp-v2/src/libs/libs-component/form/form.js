document.addEventListener("DOMContentLoaded", function() {

    $('.input-group input, .input-group textarea').on('focus', function () {
        $(this).closest('.input-group').addClass('input-group--focus');
    });
    $('.input-group input, .input-group textarea').on('blur', function () {
        $(this).closest('.input-group').removeClass('input-group--focus');
        if ( $(this).val().length ) {
            $(this).closest('.input-group').addClass('input-group--notempty');
        } else {
            $(this).closest('.input-group').removeClass('input-group--notempty');
        }
    });
    // $('input[type=tel]').inputmask({
    //     showMaskOnHover: false,
    //     showMaskOnFocus: true
    // });
    // data-inputmask='"mask": "+7(999) 999-99-99"' data-num-min='11' data-msg-checkMin='Введите весь номер' placeholder='+7(___) ___-__-__'

});