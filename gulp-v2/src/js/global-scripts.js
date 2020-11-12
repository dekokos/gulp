export const mac = navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i) ? true : false;
export const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
isSafari && document.documentElement.classList.add('is-safari');

//pureJS polyfills IE
(function() {

    if (!Element.prototype.closest) {// проверяем поддержку closest
        Element.prototype.closest = function(css) {
            var node = this;

            while (node) {
                if (node.matches(css)) return node;
                else node = node.parentElement;
            }
            return null;
        };
    }

    if (!Element.prototype.matches) {// проверяем поддержку matches
        Element.prototype.matches = Element.prototype.matchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector;

    }

})();

export const isMobile = {
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
export function debounce(func, wait, immediate) {
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

export function getScrollbarWidth() {
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
export function hasScrollbar() {
    return $(document).height() > $(window).height();
}

export function number_format(number, decimals, dec_point, thousands_sep) {
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

export function modalOpenMac() {
    if ( mac ) {
        if ($(document).height() > $(window).height() && !$("html").hasClass("apple-fix")) {
            var scrollTop = ($('html').scrollTop()) ? $('html').scrollTop() : $('body').scrollTop(); // Works for Chrome, Firefox, IE...
            $('html').css('top',-scrollTop);
            document.documentElement.classList.add("apple-fix");
        }
    }
}

export function modalCloseMac() {
    if (mac) {
        var scrollTop = parseInt($('html').css('top'));
        document.documentElement.classList.remove("apple-fix");
        $('html,body').scrollTop(-scrollTop);
    }
}

class NoScroll {
    constructor(fixedElements) {
        this.fixForIOS12 = true;
        this.gsapScrollTrigger = typeof ScrollTrigger !== undefined;

        this.html = document.querySelector('html');
        this.body = document.body;
        this.scrollTop = 0;
        this.scrollWidth = this.getScrollWidth();
        this.fixedElements = document.querySelectorAll(fixedElements);


        this.createCss();
    }
    createCss() {
        if (this.fixForIOS12) {
            //position: fixed; для запрета скрола при открытии модалок в ios 12 и ниже
            this.css = `
                .noScroll {
                    position: fixed;
                    overflow: hidden;
                }
            `;
        } else {
            this.css = `
            .noScroll {
                overflow: hidden;
            }
        `;
        }

        this.head = document.head || document.getElementsByTagName('head')[0];
        this.style = document.createElement('style');
        this.body.insertBefore(this.style, this.body.childNodes[0]);
        this.style.appendChild(document.createTextNode(this.css));
    }
    getScrollWidth() {
        let outer = document.createElement("div");
        outer.style.visibility = "hidden";
        outer.style.width = "100px";
        outer.style.msOverflowStyle = "scrollbar";

        this.body.appendChild(outer);

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

        if (this.fixForIOS12 && this.gsapScrollTrigger) {
            ScrollTrigger.getAll().forEach(st => st.disable());
        }

        this.scrollTop = this.html.scrollTop ? this.html.scrollTop : this.body.scrollTop;
        this.scrollWidth = this.getScrollWidth();

        this.html.classList.add('noScroll');
        this.html.style.top = -this.scrollTop+'px';
        this.html.style.marginRight = this.scrollWidth+'px';
        this.html.style.width = 'calc(100% - '+this.scrollWidth+'px';


        if (this.fixedElements[0]) {
            [].forEach.call(this.fixedElements, (el, i)=> {
                let elWidth = el.clientWidth;
                let pos = getComputedStyle(el).position;
                let cssWidth = elWidth + this.scrollWidth >= window.innerWidth ? elWidth - this.scrollWidth + 'px' : '';
                if (pos === 'fixed') {
                    el.style.width = cssWidth;
                    el.style.marginRight = this.scrollWidth+'px';
                }
            });
        }
    }
    enableScroll() {
        this.html.classList.remove('noScroll');
        this.html.style.top = '';
        this.html.style.marginRight = '';
        this.html.style.width = '';


        if (this.fixedElements[0]) {
            [].forEach.call(this.fixedElements, (el, i)=> {
                el.style.width = '';
                el.style.marginRight = '';
            });
        }
        this.html.scrollTop = this.scrollTop;
        this.body.scrollTop = this.scrollTop;//fix for ios 12
        this.scrollTop = 0;

        if (this.fixForIOS12 && this.gsapScrollTrigger) {
            ScrollTrigger.getAll().forEach(st => st.enable());
        }
    }
}
export const noScroll = new NoScroll();


function setCSSVarVH() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}
setCSSVarVH();
window.addEventListener('resize', debounce(setCSSVarVH, 160));