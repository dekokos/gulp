// import Inputmask from "inputmask";
document.addEventListener("DOMContentLoaded", function() {

    if (window.innerWidth <= 660) {
        $('[data-mob-placeholder]').each(function() {
            $(this).attr('placeholder',$(this).data('mob-placeholder'));
        });
    }

    let eyeList = document.querySelectorAll('.input-group__eye');
    eyeList && eyeList.forEach(function(el) {
        el.addEventListener('click', function() {
            let elInput = this.closest('.input-group').querySelector('input');
            if (this.classList.contains('is-active')) {
                elInput.setAttribute('type', 'password');
            }else{
                elInput.setAttribute('type', 'text');
            }
            this.classList.toggle('is-active');
        });
    });

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
    // data-inputmask='"mask": "+7(999) 999-99-99"' data-num-min='11' data-msg-checkMin='Введите весь номер' placeholder='+7(___) ___-__-__'
    let inputTelList = document.querySelectorAll('input[type=tel]');
    inputTelList && inputTelList.forEach(function(el) {
        // let inputTel = new Inputmask({
        Inputmask({
            showMaskOnHover: false,
            showMaskOnFocus: true,
        }).mask(el);
    });

    let photoBlockInputList = document.querySelectorAll('.photo-block__input');
    photoBlockInputList && photoBlockInputList.forEach(function(el) {
        el.addEventListener('change', function() {
            let photoImgWrap = this.closest('.photo-block').querySelector('.photo-block__img-wrap');
            if(typeof this.files[0] !== 'undefined'){
                let maxSize = +$(this).attr('data-max-size'),
                    size = this.files[0].size;
                if (maxSize < size) {
                    return false;
                }
                let reader = new FileReader();
                if (photoImgWrap.querySelector('img')) {
                    reader.onload = function (e) {
                        photoImgWrap.querySelector('img').src = e.target.result;
                    }
                    reader.readAsDataURL(this.files[0])
                }else{
                    let $img = document.createElement('img');
                    reader.onload = function (e) {
                        $img.src = e.target.result;
                    }
                    reader.readAsDataURL(this.files[0])
                    photoImgWrap.appendChild($img);
                }
            }
        });
    });

});