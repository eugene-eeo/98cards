function range(n){for(var arr=[],i=2;i<=n;i++)arr.push(i);return arr}function shuffle(xs){for(var i=0;i<xs.length;i++){var j=Math.floor(xs.length*Math.random()),tmp=xs[i];xs[i]=xs[j],xs[j]=tmp}return xs}function lessThan(a,b){return a<b||a-b==10}function Game(handlers){this.score=0,this.t=0,this.a1=null,this.a2=null,this.d1=null,this.d2=null,this.hand=0,this.deck=shuffle(range(99)),this.handlers=handlers;for(var i=0;i<4;i++)this.draw2();this.undoStack=[]}nut=function(s,ctx){return ctx=nut.el(ctx),[].slice.call(/^\.[\w\-]+$/.test(s)?ctx.getElementsByClassName(s.slice(1)):ctx.querySelectorAll(s))},nut.el=function(s,ctx){return"string"!=typeof s?s||document:(ctx=nut.el(ctx),/^#[\w\-]+$/.test(s)&&ctx.getElementById?ctx.getElementById(s.slice(1)):ctx.querySelector(s))},function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).dragula=e()}}(function(){return function e(n,t,r){function o(u,c){if(!t[u]){if(!n[u]){var a="function"==typeof require&&require;if(!c&&a)return a(u,!0);if(i)return i(u,!0);var f=new Error("Cannot find module '"+u+"'");throw f.code="MODULE_NOT_FOUND",f}var l=t[u]={exports:{}};n[u][0].call(l.exports,function(e){var t=n[u][1][e];return o(t||e)},l,l.exports,e,n,t,r)}return t[u].exports}for(var i="function"==typeof require&&require,u=0;u<r.length;u++)o(r[u]);return o}({1:[function(e,n,t){"use strict";function r(e){var n=u[e];return n?n.lastIndex=0:u[e]=n=new RegExp(c+e+a,"g"),n}var u={},c="(?:^|\\s)",a="(?:\\s|$)";n.exports={add:function(e,n){var t=e.className;t.length?r(n).test(t)||(e.className+=" "+n):e.className=n},rm:function(e,n){e.className=e.className.replace(r(n)," ").trim()}}},{}],2:[function(e,n,t){(function(t){"use strict";function o(e,n,r,o){t.navigator.pointerEnabled?w[n](e,{mouseup:"pointerup",mousedown:"pointerdown",mousemove:"pointermove"}[r],o):t.navigator.msPointerEnabled?w[n](e,{mouseup:"MSPointerUp",mousedown:"MSPointerDown",mousemove:"MSPointerMove"}[r],o):(w[n](e,{mouseup:"touchend",mousedown:"touchstart",mousemove:"touchmove"}[r],o),w[n](e,r,o))}function i(e){if(void 0!==e.touches)return e.touches.length;if(void 0!==e.which&&0!==e.which)return e.which;if(void 0!==e.buttons)return e.buttons;var n=e.button;return void 0!==n?1&n?1:2&n?3:4&n?2:0:void 0}function u(e){var n=e.getBoundingClientRect();return{left:n.left+c("scrollLeft","pageXOffset"),top:n.top+c("scrollTop","pageYOffset")}}function c(e,n){return void 0!==t[n]?t[n]:S.clientHeight?S[e]:x.body[e]}function a(e,n,t){var r,o=e||{},i=o.className;return o.className+=" gu-hide",r=x.elementFromPoint(n,t),o.className=i,r}function f(){return!1}function l(){return!0}function d(e){return e.width||e.right-e.left}function s(e){return e.height||e.bottom-e.top}function v(e){return e.parentNode===x?null:e.parentNode}function p(e){return"INPUT"===e.tagName||"TEXTAREA"===e.tagName||"SELECT"===e.tagName||function m(e){return!!e&&("false"!==e.contentEditable&&("true"===e.contentEditable||m(v(e))))}(e)}function g(e){return e.nextElementSibling||function(){for(var n=e;(n=n.nextSibling)&&1!==n.nodeType;);return n}()}function y(e,n){var t=function(e){return e.targetTouches&&e.targetTouches.length?e.targetTouches[0]:e.changedTouches&&e.changedTouches.length?e.changedTouches[0]:e}(n),r={pageX:"clientX",pageY:"clientY"};return e in r&&!(e in t)&&r[e]in t&&(e=r[e]),t[e]}var b=e("contra/emitter"),w=e("crossvent"),E=e("./classes"),x=document,S=x.documentElement;n.exports=function(e,n){function t(e){return-1!==le.containers.indexOf(e)||fe.isContainer(e)}function r(e){var n=e?"remove":"add";o(S,n,"mousedown",O),o(S,n,"mouseup",L)}function c(e){o(S,e?"remove":"add","mousemove",N)}function m(e){var n=e?"remove":"add";w[n](S,"selectstart",C),w[n](S,"click",C)}function C(e){ce&&e.preventDefault()}function O(e){if(ne=e.clientX,te=e.clientY,1===i(e)&&!e.metaKey&&!e.ctrlKey){var t=e.target,r=T(t);r&&(ce=r,c(),"mousedown"===e.type&&(p(t)?t.focus():e.preventDefault()))}}function N(e){if(ce){if(0===i(e))return void L({});if(void 0===e.clientX||e.clientX!==ne||void 0===e.clientY||e.clientY!==te){if(fe.ignoreInputTextSelection){var n=y("clientX",e),t=y("clientY",e);if(p(x.elementFromPoint(n,t)))return}var o=ce;c(!0),m(),D(),B(o);var a=u(W);Z=y("pageX",e)-a.left,ee=y("pageY",e)-a.top,E.add(ie||W,"gu-transit"),K(),U(e)}}}function T(e){if(!(le.dragging&&J||t(e))){for(var n=e;v(e)&&!1===t(v(e));){if(fe.invalid(e,n))return;if(!(e=v(e)))return}var r=v(e);if(r&&!fe.invalid(e,n)&&fe.moves(e,r,n,g(e)))return{item:e,source:r}}}function B(e){(function(e,n){return"boolean"==typeof fe.copy?fe.copy:fe.copy(e,n)})(e.item,e.source)&&(ie=e.item.cloneNode(!0),le.emit("cloned",ie,e.item,"copy")),Q=e.source,W=e.item,re=oe=g(e.item),le.dragging=!0,le.emit("drag",W,Q)}function D(){if(le.dragging){var e=ie||W;M(e,v(e))}}function I(){c(!(ce=!1)),m(!0)}function L(e){if(I(),le.dragging){var n=ie||W,t=y("clientX",e),r=y("clientY",e),i=q(a(J,t,r),t,r);i&&(ie&&fe.copySortSource||!ie||i!==Q)?M(n,i):fe.removeOnSpill?R():A()}}function M(e,n){var t=v(e);ie&&fe.copySortSource&&n===Q&&t.removeChild(W),k(n)?le.emit("cancel",e,Q,Q):le.emit("drop",e,n,Q,oe),j()}function R(){if(le.dragging){var e=ie||W,n=v(e);n&&n.removeChild(e),le.emit(ie?"cancel":"remove",e,n,Q),j()}}function A(e){if(le.dragging){var n=0<arguments.length?e:fe.revertOnSpill,t=ie||W,r=v(t),o=k(r);!1===o&&n&&(ie?r&&r.removeChild(ie):Q.insertBefore(t,re)),o||n?le.emit("cancel",t,Q,Q):le.emit("drop",t,r,Q,oe),j()}}function j(){var e=ie||W;I(),J&&(E.rm(fe.mirrorContainer,"gu-unselectable"),o(S,"remove","mousemove",U),v(J).removeChild(J),J=null),e&&E.rm(e,"gu-transit"),ue&&clearTimeout(ue),le.dragging=!1,ae&&le.emit("out",e,ae,Q),le.emit("dragend",e),Q=W=ie=re=oe=ue=ae=null}function k(e,n){var t;return t=void 0!==n?n:J?oe:g(ie||W),e===Q&&t===re}function q(e,n,r){function o(){if(!1===t(i))return!1;var u=H(i,e),c=V(i,u,n,r);return!!k(i,c)||fe.accepts(W,i,Q,c)}for(var i=e;i&&!o();)i=v(i);return i}function U(e){function n(e){le.emit(e,f,ae,Q)}if(J){e.preventDefault();var o=y("clientX",e),i=y("clientY",e),u=o-Z,c=i-ee;J.style.left=u+"px",J.style.top=c+"px";var f=ie||W,l=a(J,o,i),d=q(l,o,i),s=null!==d&&d!==ae;(s||null===d)&&(ae&&n("out"),ae=d,s&&n("over"));var p=v(f);if(d===Q&&ie&&!fe.copySortSource)return void(p&&p.removeChild(f));var m,h=H(d,l);if(null!==h)m=V(d,h,o,i);else{if(!0!==fe.revertOnSpill||ie)return void(ie&&p&&p.removeChild(f));m=re,d=Q}(null===m&&s||m!==f&&m!==g(f))&&(oe=m,d.insertBefore(f,m),le.emit("shadow",f,d,Q))}}function K(){if(!J){var e=W.getBoundingClientRect();(J=W.cloneNode(!0)).style.width=d(e)+"px",J.style.height=s(e)+"px",E.rm(J,"gu-transit"),E.add(J,"gu-mirror"),fe.mirrorContainer.appendChild(J),o(S,"add","mousemove",U),E.add(fe.mirrorContainer,"gu-unselectable"),le.emit("cloned",J,W,"mirror")}}function H(e,n){for(var t=n;t!==e&&v(t)!==e;)t=v(t);return t===S?null:t}function V(e,n,t,r){var c="horizontal"===fe.direction;return n!==e?function(){var e=n.getBoundingClientRect();return function(e){return e?g(n):n}(c?t>e.left+d(e)/2:r>e.top+s(e)/2)}():function(){var n,o,i,u=e.children.length;for(n=0;n<u;n++){if(i=(o=e.children[n]).getBoundingClientRect(),c&&i.left+i.width/2>t)return o;if(!c&&i.top+i.height/2>r)return o}return null}()}1===arguments.length&&!1===Array.isArray(e)&&(n=e,e=[]);var J,Q,W,Z,ee,ne,te,re,oe,ie,ue,ce,ae=null,fe=n||{};void 0===fe.moves&&(fe.moves=l),void 0===fe.accepts&&(fe.accepts=l),void 0===fe.invalid&&(fe.invalid=function(){return!1}),void 0===fe.containers&&(fe.containers=e||[]),void 0===fe.isContainer&&(fe.isContainer=f),void 0===fe.copy&&(fe.copy=!1),void 0===fe.copySortSource&&(fe.copySortSource=!1),void 0===fe.revertOnSpill&&(fe.revertOnSpill=!1),void 0===fe.removeOnSpill&&(fe.removeOnSpill=!1),void 0===fe.direction&&(fe.direction="vertical"),void 0===fe.ignoreInputTextSelection&&(fe.ignoreInputTextSelection=!0),void 0===fe.mirrorContainer&&(fe.mirrorContainer=x.body);var le=b({containers:fe.containers,start:function(e){var n=T(e);n&&B(n)},end:D,cancel:A,remove:R,destroy:function(){r(!0),L({})},canMove:function(e){return!!T(e)},dragging:!1});return!0===fe.removeOnSpill&&le.on("over",function(e){E.rm(e,"gu-hide")}).on("out",function(e){le.dragging&&E.add(e,"gu-hide")}),r(),le}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./classes":1,"contra/emitter":5,crossvent:6}],3:[function(e,n,t){n.exports=function(e,n){return Array.prototype.slice.call(e,n)}},{}],4:[function(e,n,t){"use strict";var r=e("ticky");n.exports=function(e,n,t){e&&r(function(){e.apply(t||null,n||[])})}},{ticky:9}],5:[function(e,n,t){"use strict";var r=e("atoa"),o=e("./debounce");n.exports=function(e,n){var t=n||{},i={};return void 0===e&&(e={}),e.on=function(n,t){return i[n]?i[n].push(t):i[n]=[t],e},e.once=function(n,t){return t._once=!0,e.on(n,t),e},e.off=function(n,t){var r=arguments.length;if(1===r)delete i[n];else if(0===r)i={};else{var o=i[n];if(!o)return e;o.splice(o.indexOf(t),1)}return e},e.emit=function(){var n=r(arguments);return e.emitterSnapshot(n.shift()).apply(this,n)},e.emitterSnapshot=function(n){var u=(i[n]||[]).slice(0);return function(){var i=r(arguments),c=this||e;if("error"===n&&!1!==t.throws&&!u.length)throw 1===i.length?i[0]:i;return u.forEach(function(r){t.async?o(r,i,c):r.apply(c,i),r._once&&e.off(n,r)}),e}},e}},{"./debounce":4,atoa:3}],6:[function(e,n,t){(function(t){"use strict";function a(e,n,r){return function(n){var o=n||t.event;o.target=o.target||o.srcElement,o.preventDefault=o.preventDefault||function(){o.returnValue=!1},o.stopPropagation=o.stopPropagation||function(){o.cancelBubble=!0},o.which=o.which||o.keyCode,r.call(e,o)}}function l(e,n,t){var r=function(e,n,t){var r,o;for(r=0;r<h.length;r++)if((o=h[r]).element===e&&o.type===n&&o.fn===t)return r}(e,n,t);if(r){var o=h[r].wrapper;return h.splice(r,1),o}}var s=e("custom-event"),v=e("./eventmap"),p=t.document,m=function(e,n,t,r){return e.addEventListener(n,t,r)},g=function(e,n,t,r){return e.removeEventListener(n,t,r)},h=[];t.addEventListener||(m=function(e,n,t){return e.attachEvent("on"+n,function(e,n,t){var r=l(e,n,t)||a(e,0,t);return h.push({wrapper:r,element:e,type:n,fn:t}),r}(e,n,t))},g=function(e,n,t){var r=l(e,n,t);return r?e.detachEvent("on"+n,r):void 0}),n.exports={add:m,remove:g,fabricate:function(e,n,t){var i=-1===v.indexOf(n)?new s(n,{detail:t}):function(){var e;return p.createEvent?(e=p.createEvent("Event")).initEvent(n,!0,!0):p.createEventObject&&(e=p.createEventObject()),e}();e.dispatchEvent?e.dispatchEvent(i):e.fireEvent("on"+n,i)}}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./eventmap":7,"custom-event":8}],7:[function(e,n,t){(function(e){"use strict";var t=[],r="",o=/^on/;for(r in e)o.test(r)&&t.push(r.slice(2));n.exports=t}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],8:[function(e,n,t){(function(e){var r=e.CustomEvent;n.exports=function(){try{var e=new r("cat",{detail:{foo:"bar"}});return"cat"===e.type&&"bar"===e.detail.foo}catch(n){}return!1}()?r:"function"==typeof document.createEvent?function(e,n){var t=document.createEvent("CustomEvent");return n?t.initCustomEvent(e,n.bubbles,n.cancelable,n.detail):t.initCustomEvent(e,!1,!1,void 0),t}:function(e,n){var t=document.createEventObject();return t.type=e,n?(t.bubbles=Boolean(n.bubbles),t.cancelable=Boolean(n.cancelable),t.detail=n.detail):(t.bubbles=!1,t.cancelable=!1,t.detail=void 0),t}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],9:[function(e,n,t){var r;r="function"==typeof setImmediate?function(e){setImmediate(e)}:function(e){setTimeout(e,0)},n.exports=r},{}]},{},[2])(2)}),function(){"use strict";function t(t,n,e){var i=document.createElement(t);for(var u in function r(t){return t.reduce(function(t,n){return t.concat(Array.isArray(n)?r(n):n.nodeType?[n]:[document.createTextNode(n)])},[])}(e).forEach(i.appendChild.bind(i)),n)i.setAttribute(u,n[u]);return i}window.kr=function(r,n,e){return n&&"[object Object]"!=={}.toString.call(n)&&(e=n,n={}),t(r,n,e?Array.isArray(e)?e:[e]:[])},kr.addTag=function(r){kr[r]=function(t,n){return kr(r,t,n)}}}(),["h1","h2","h3","h4","div","span","p","style","article","aside","figure","figcaption","a","ul","ol","li","table","tr","th","td","b","i","u","hr","br","sub","sup","input","button"].forEach(kr.addTag),Game.prototype={draw2:function(){var a=this.deck.pop(),b=this.deck.pop();this.handlers.newCards(a,b),this.hand+=2},remaining:function(){return this.deck.length+this.hand},accepts:function(id,card){var top=this[id];return null===top||("a1"===id||"a2"===id?lessThan(top,card):lessThan(card,top))},scoreOf:function(diff){return Math.abs(diff)},move:function(id,card){if(this.accepts(id,card)){var top=this[id];this.undoStack.push({score:this.score,id:id,top:top,card:card}),this.t++,this.hand--,this.score+=this.scoreOf(card-(top||0)),this[id]=card,this.t%2==0&&0<this.deck.length&&(this.undoStack=[],this.draw2())}},canUndo:function(){return 0<this.undoStack.length},undo:function(){if(this.canUndo()){var s=this.undoStack.pop();this.t--,this.hand++,this.score=s.score,this[s.id]=s.top,this.handlers.undo(s.card,s.score,s.id,s.top)}}},$=nut;var hand=$.el("#hand"),drake=dragula([hand,$.el("#a1"),$.el("#a2"),$.el("#d1"),$.el("#d2")],{moves:function(_,target){return target===hand},accepts:function(card,pile){return pile===hand||game.accepts(pile.id,+card.textContent)}});drake.on("drop",function(top,target){target!==hand&&(target.innerHTML="",target.appendChild(top),top.classList.add("top"),game.move(target.id,+top.textContent),updateNumbers())}),drake.on("over",function(card,pile){var top=$.el(".top",pile);top&&(top.style.display="none")}),drake.on("out",function(card,pile){var top=$.el(".top",pile);top&&(top.style.display="inline-block")});var BLUE="#4682b4",YELLOW="#fde396",RED="#c23b22",palette=shuffle([[YELLOW,RED],[YELLOW,BLUE]])[0],lo=palette[0],hi=palette[1];function lerpColor(a,b,amount){var ah=parseInt(a.replace(/#/g,""),16),ar=ah>>16,ag=ah>>8&255,ab=255&ah,bh=parseInt(b.replace(/#/g,""),16);return"#"+((1<<24)+(ar+amount*((bh>>16)-ar)<<16)+(ag+amount*((bh>>8&255)-ag)<<8)+(ab+amount*((255&bh)-ab))|0).toString(16).slice(1)}function drawCard(value){return kr.div({class:"card",style:"background-color: "+lerpColor(lo,hi,(value-2)/96)},value)}function updateNumbers(){$.el("#score").textContent=game.score,$.el("#remaining").textContent=game.remaining(),$.el("#undocount").textContent=game.undoStack.length}var game=new Game({newCards:function(a,b){hand.appendChild(drawCard(a)),hand.appendChild(drawCard(b))},undo:function(prevTop,score,id,newTop){var pile=$.el("#"+id);if(pile.innerHTML="",null!==newTop){var top=drawCard(newTop);top.classList.add("top"),pile.appendChild(top)}hand.appendChild(drawCard(prevTop)),updateNumbers()}});updateNumbers(),$.el("#undo").addEventListener("click",function(){game.undo()});
