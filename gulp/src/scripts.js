const arrowRight = `<div class="default-arrow default-arrow--next"><svg width="8" height="13" viewBox="0 0 7 13" xmlns="http://www.w3.org/2000/svg">
<path d="M6.71152 7.33967L1.55171 12.4993C1.22349 12.8277 0.691324 12.8277 0.363258 12.4993C0.0351642 12.1712 0.0351642 11.6391 0.363258 11.311L4.92889 6.74552L0.36339 2.18018C0.0352969 1.85195 0.0352969 1.31987 0.36339 0.991775C0.691484 0.663549 1.22362 0.663549 1.55185 0.991775L6.71165 6.1515C6.8757 6.31563 6.95763 6.53051 6.95763 6.74549C6.95763 6.96058 6.87554 7.17562 6.71152 7.33967Z"/>
</svg></div>`;
const arrowLeft = `<div class="default-arrow default-arrow--prev"><svg width="8" height="13" viewBox="0 0 8 13" xmlns="http://www.w3.org/2000/svg">
<path d="M0.48379 6.15154L5.6436 0.991895C5.97183 0.663508 6.50399 0.663508 6.83205 0.991895C7.16015 1.31999 7.16015 1.85212 6.83205 2.18019L2.26642 6.74569L6.83192 11.311C7.16002 11.6393 7.16002 12.1713 6.83192 12.4994C6.50383 12.8277 5.97169 12.8277 5.64347 12.4994L0.483658 7.33971C0.319611 7.17558 0.23768 6.9607 0.23768 6.74572C0.23768 6.53063 0.31977 6.31559 0.48379 6.15154Z"/>
</svg></div>`;
isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};
function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

function getScrollbarWidth() {
    var outer = document.createElement("div");
    outer.style.visibility = "hidden";
    outer.style.width = "100px";
    outer.style.msOverflowStyle = "scrollbar";

    document.body.appendChild(outer);

    var widthNoScroll = outer.offsetWidth;
    // force scrollbars
    outer.style.overflow = "scroll";

    // add innerdiv
    var inner = document.createElement("div");
    inner.style.width = "100%";
    outer.appendChild(inner);

    var widthWithScroll = inner.offsetWidth;

    // remove divs
    outer.parentNode.removeChild(outer);
    return widthNoScroll - widthWithScroll;
}

// проверка на боковой скролл
function hasScrollbar() {
    return $(document).height() > $(window).height();
}

function number_format(number, decimals, dec_point, thousands_sep) {
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + (Math.round(n * k) / k)
                .toFixed(prec);
        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
        .split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '')
        .length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1)
            .join('0');
    }
    return s.join(dec);
}

var mac = navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i) ? true : false;

function modalOpenMac() {
    if ( mac ) {
        if ($(document).height() > $(window).height() && !$("html").hasClass("apple-fix")) {
            var scrollTop = ($('html').scrollTop()) ? $('html').scrollTop() : $('body').scrollTop(); // Works for Chrome, Firefox, IE...
            $('html').css('top',-scrollTop);
            document.documentElement.classList.add("apple-fix");
        }
    }
}

function modalCloseMac() {
    if (mac) {
        var scrollTop = parseInt($('html').css('top'));
        document.documentElement.classList.remove("apple-fix");
        $('html,body').scrollTop(-scrollTop);
    }
}