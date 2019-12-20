$(function () {

});

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

class NoScroll {
    constructor(fixedElements) {
        this.html = $('html');
        this.body = $('body');
        this.scrollTop = 0;
        this.scrollWidth = this.getScrollWidth();
        this.fixedElements = fixedElements;

        this.createCss();
    }
    createCss() {
        this.css = `
            .noScroll {
                position: fixed;
                overflow: hidden;
            }
        `;
        this.head = document.head || document.getElementsByTagName('head')[0];
        this.style = document.createElement('style');
        this.body.prepend(this.style);
        this.style.appendChild(document.createTextNode(this.css));
    }
    getScrollWidth() {
        let outer = document.createElement("div");
        outer.style.visibility = "hidden";
        outer.style.width = "100px";
        outer.style.msOverflowStyle = "scrollbar";

        this.body[0].appendChild(outer);

        let widthNoScroll = outer.offsetWidth;
        outer.style.overflow = "scroll";

        let inner = document.createElement("div");
        inner.style.width = "100%";
        outer.appendChild(inner);

        let widthWithScroll = inner.offsetWidth;

        outer.parentNode.removeChild(outer);
        return widthNoScroll - widthWithScroll;
    }
    disableScroll() {
        this.scrollTop = this.html.scrollTop() ? this.html.scrollTop() : this.body.scrollTop();
        this.scrollWidth = this.getScrollWidth();

        this.html.addClass('noScroll').css({
            'top': -this.scrollTop,
            'margin-right': this.scrollWidth,
            'width': `calc(100% - ${this.scrollWidth}px`,
        });
        if ($(this.fixedElements).length) {
            $(this.fixedElements).each((i, el)=> {
                let elJQ = $(el);
                let elWidth = elJQ.outerWidth();
                let pos = elJQ.css('position');
                if (pos === 'fixed') {
                    $(el).css({
                        'width': elWidth + this.scrollWidth >= window.innerWidth ? elWidth - this.scrollWidth : '',
                        'margin-right': this.scrollWidth,
                    });
                }

            });
        }
    }
    enableScroll() {
        this.html.removeClass('noScroll').css({
            'top': '',
            'margin-right': '',
            'width': '',
        });
        if ($(this.fixedElements).length) {
            $(this.fixedElements).css({
                'width': '',
                'margin-right': '',
            });
        }
        $(this.html, this.body).scrollTop(this.scrollTop);
        this.scrollTop = 0;
    }
}
const noScroll = new NoScroll();