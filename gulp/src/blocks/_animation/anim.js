//npm i split-html-to-chars
//(data-splitting data-ost-name='rain' data-ost-stagger='.03').ost  --  title
//(data-ost-delay=(i / 10) data-ost-name='mask').ost  --  text

//GLOBAL
// let animations = [];
// let ar = document.querySelectorAll('.ost');
// let getNumAnim = (node)=>[...ar].indexOf(node);
// const threshold = 0.2; // trigger
// const options = {
//     root: null,
//     rootMargin: '0px',
//     threshold: threshold
// };
// const observer = new IntersectionObserver(animHandler, options);
// for(let i = 0; i<ar.length; i++) {
//     let delayAnim = ar[i].getAttribute('data-ost-delay');
//     animations[i] = gsap.timeline({paused: true, delay: delayAnim ? delayAnim:0});
//     observer.observe(ar[i]);
// }
// function animHandler(targets, obs) {
//     for (let i=0; i<targets.length; i++) {
//         if (targets[i].isIntersecting) {
//             let block = targets[i].target;
//             animations[getNumAnim(block)].play();
//             obs.unobserve(block);
//         }
//     }
// }



// class Ost {
//     constructor(selector) {
//         this.animations = [];
//         this.ar = document.querySelectorAll('.ost');
//         this.threshold = 0.2; // trigger
//         this.options = {
//             root: null,
//             rootMargin: '0px',
//             threshold: this.threshold
//         };
//         this.observer = new IntersectionObserver((targets, obs)=> {
//             for (let i=0; i<targets.length; i++) {
//                 if (targets[i].isIntersecting) {
//                     let block = targets[i].target;
//                     this.animations[this.getNumAnim(block)].play();
//                     obs.unobserve(block);
//                 }
//             }
//         }, this.options);
//
//
//         this.gsapOpt = {
//             paused: true
//         };
//         for(let i = 0; i<this.ar.length; i++) {
//             let el = this.ar[i];
//             let delayAttr = parseFloat(el.getAttribute('data-ost-delay'));
//             let opt = this.gsapOpt;
//             opt.delay = isNaN(delayAttr) ? 0 : delayAttr;
//             this.animations[i] = gsap.timeline(opt);
//
//             let animName = el.getAttribute('data-ost-name');
//             switch (animName) {
//                 case('rain'):
//                     this.animRain(el);
//                     break;
//                 case('maskRadial'):
//                     this.animMaskRadial(el);
//                     break;
//                 case('mask'):
//                     this.animMask(el);
//                     break;
//                 case('zoom'):
//                     this.animZoom(el);
//                     break;
//             }
//
//             this.observer.observe(this.ar[i]);
//         }
//
//     }
//     getNumAnim(node) {
//         return [...this.ar].indexOf(node);
//     }
//
//     animZoom(element) {
//         let durationAttr = parseFloat(element.getAttribute('data-ost-duration'));
//         let duration = isNaN(durationAttr) ? 1.2 : durationAttr;
//         let scaleAttr = parseFloat(element.getAttribute('data-ost-scale'));
//         let scale = isNaN(durationAttr) ? 0 : scaleAttr;
//         this.animations[this.getNumAnim(element)]
//             .from(element, {duration: duration, scale: scale, opacity: 0, ease: 'back'})
//     }
//     animRain(element) {
//         let staggerAttr = parseFloat(element.getAttribute('data-ost-stagger'));
//         let durationAttr = parseFloat(element.getAttribute('data-ost-duration'));
//         let stagger = isNaN(staggerAttr) ? .05 : staggerAttr;
//         let duration = isNaN(durationAttr) ? 1.3 : durationAttr;
//         let char = element.querySelectorAll('.char');
//         this.animations[this.getNumAnim(element)]
//             .from(char, {stagger: {
//                     amount:stagger,
//                     from:"center",
//                     grid:"auto",
//                 }, duration: duration, x:'random(-40,40, 1)', y:'random(-80,-20,5)', opacity: 0, ease:'back', onComplete: function () {
//                     char.forEach(function (t,i) {
//                         t.style.transform = '';
//                         t.style.opacity = '';
//                     });
//                 }});
//     }
//     animMaskRadial(element) {
//         let gradientStop = {
//             valA: 0,
//             valB: 0
//         };
//         let durationAttr = parseFloat(element.getAttribute('data-ost-duration'));
//         let duration = isNaN(durationAttr) ? 1.5 : durationAttr;
//         this.animations[this.getNumAnim(element)]
//             .from(element, {duration: duration, alpha: 0,ease: Linear.easeNone}, 0)
//             .to(gradientStop, {duration: duration, valB: 100, ease: Linear.easeNone, onUpdate: function() {
//                 element.style.cssText = `
//                     -webkit-mask-size: cover;
//                     -webkit-mask-image: radial-gradient(rgb(0, 0, 0) ${gradientStop.valA}%, rgba(255, 255, 255, 0) ${gradientStop.valB}%);
//                 `;
//             }}, 0)
//             .to(gradientStop, {duration: duration/2, valA: 100,ease: Linear.easeNone, onComplete: function () {
//                     element.style.opacity = '';
//                     element.style.webkitMaskSize = '';
//                     element.style.webkitMaskImage = '';
//                 }}, duration/2)
//             ;
//     }
//     animMask(element) {
//         let gradientStop = {
//             valA: 0,
//             valB: 0
//         };
//         let durationAttr = parseFloat(element.getAttribute('data-ost-duration'));
//         let duration = isNaN(durationAttr) ? 1.2 : durationAttr;
//         this.animations[this.getNumAnim(element)]
//             .from(element, {duration: duration, alpha: 0, ease: 'none'})
//             .to(gradientStop, { duration: duration, valB: 100, ease: 'none', onUpdate: function() {
//                     element.style.cssText = `
//                         -webkit-mask-size: cover;
//                         -webkit-mask-image: linear-gradient(160deg, rgb(0, 0, 0) ${gradientStop.valA}%, rgba(255, 255, 255, 0) ${gradientStop.valB}%);
//                     `;
//                 }}, 0)
//             .to(gradientStop, {duration: duration/2, valA: 100, ease: 'none', onComplete: function () {
//                     element.style.opacity = '';
//                     element.style.webkitMaskSize = '';
//                     element.style.webkitMaskImage = '';
//                 }}, duration/2)
//         ;
//     }
// }



// CustomEase.create('MyCubic', '.3,.86,.36,.95');
// class SA {
//     constructor() {
//         this.animations = [];
//         this.ar = document.querySelectorAll('.sa');
//         this.threshold = 0.2; // trigger
//         this.options = {
//             root: null,
//             rootMargin: '0px',
//             threshold: this.threshold
//         };
//         this.observer = new IntersectionObserver((targets, obs)=> {
//             for (let i=0; i<targets.length; i++) {
//                 if (targets[i].isIntersecting) {
//                     let block = targets[i].target;
//                     this.animations[this.getNumAnim(block)].play();
//                     obs.unobserve(block);
//                 }
//             }
//         }, this.options);
//
//
//         this.gsapOpt = {
//             paused: true
//         };
//         for(let i = 0; i<this.ar.length; i++) {
//             let el = this.ar[i];
//             let delayAttr = parseFloat(el.getAttribute('data-sa-delay'));
//             let opt = this.gsapOpt;
//             opt.delay = isNaN(delayAttr) ? 0 : delayAttr;
//             this.animations[i] = gsap.timeline(opt);
//
//             let animName = el.getAttribute('data-sa-name');
//             this.startAnim(el, animName);
//
//             this.observer.observe(this.ar[i]);
//         }
//
//     }
//     getNumAnim(node) {
//         return [...this.ar].indexOf(node);
//     }
//     startAnim(block, animName) {
//         switch (animName) {
//             case('fadeInUp'):
//                 this.fadeInUp(block);
//                 break;
//             case('zoom'):
//                 this.animZoom(block);
//                 break;
//         }
//     }
//     fadeInUp(element) {
//         let durationAttr = parseFloat(element.getAttribute('data-sa-duration'));
//         let duration = isNaN(durationAttr) ? 1.4 : durationAttr;
//         let delayAttr = parseFloat(element.getAttribute('data-sa-delay'));
//         let delay = isNaN(delayAttr) ? 0 : delayAttr;
//         let yAttr = parseFloat(element.getAttribute('data-sa-y'));
//         let y = isNaN(yAttr) ? 60 : yAttr;
//         let staggerEl = element.getAttribute('data-sa-stagger') === 'true' ? element.querySelectorAll('[data-sa-stagger-el]'): null;
//         staggerEl ?
//             this.animations[this.getNumAnim(element)]
//                 .from(element, {duration: duration, delay: delay, y: y, opacity: 0, ease: 'MyCubic'})
//                 .from(staggerEl, {duration: .5, stagger: .16, opacity:0}, delay+.2) :
//             this.animations[this.getNumAnim(element)]
//                 .from(element, {duration: duration, delay: delay, y: y, opacity: 0, ease: 'MyCubic'})
//     }
//     animZoom(element) {
//         let durationAttr = parseFloat(element.getAttribute('data-sa-duration'));
//         let duration = isNaN(durationAttr) ? 1.2 : durationAttr;
//         let delayAttr = parseFloat(element.getAttribute('data-sa-delay'));
//         let delay = isNaN(delayAttr) ? 0 : delayAttr;
//         let scaleAttr = parseFloat(element.getAttribute('data-sa-scale'));
//         let scale = isNaN(scaleAttr) ? 0 : scaleAttr;
//         this.animations[this.getNumAnim(element)]
//             .from(element, {duration: duration, delay: delay, scale: scale, opacity: 0, ease: 'MyCubic'})
//     }
// }
// $(function () {
//     // if (window.innerWidth > 575) {
//     new SA();
//     // }
// });

// $(function () {
//     // Splitting();//npm i splitting
//     let t1 = performance.now();
//     new Ost();
//     let t2 = performance.now();
//     // console.log('after = ',(t2-t1)/1000,'sec');
//     console.log('ObsAnim = ',(t2-t1),'ms');
// });