System.register(["./lib-legacy-76f34388.js","./index-legacy-8a60b8b8.js","./index-legacy-14573353.js"],(function(e){"use strict";var t,n,r,o,a,i,c,s,l,u,d,f,p,m,v,g,x,h,y,b,E,w,C,N;return{setters:[function(e){t=e.a,n=e._,r=e.R},function(e){o=e.g,a=e.h,i=e.i,c=e.y,s=e.D,l=e.B,u=e.k,d=e.f,f=e.C,p=e.c,m=e._,v=e.L,g=e.l,x=e.E,h=e.S,y=e.G,b=e.u,E=e.o,w=e.e},function(e){C=e.s,N=e.c}],execute:function(){e({c:function(e){return"danger"===e?{danger:!0}:{type:e}},w:P});var k=function(e){return+setTimeout(e,16)},T=function(e){return clearTimeout(e)};"undefined"!=typeof window&&"requestAnimationFrame"in window&&(k=function(e){return window.requestAnimationFrame(e)},T=function(e){return window.cancelAnimationFrame(e)});var S=0,O=new Map;function A(e){O.delete(e)}function P(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=S+=1;function r(t){if(0===t)A(n),e();else{var o=k((function(){r(t-1)}));O.set(n,o)}}return r(t),n}P.cancel=function(e){var t=O.get(e);return A(t),T(t)};var j,I=0,L={};function R(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=I++,r=t;function o(){(r-=1)<=0?(e(),delete L[n]):L[n]=P(o)}return L[n]=P(o),n}function _(e){return!e||null===e.offsetParent||e.hidden}function W(e){var t=(e||"").match(/rgba?\((\d*), (\d*), (\d*)(, [\d.]*)?\)/);return!(t&&t[1]&&t[2]&&t[3]&&t[1]===t[2]&&t[2]===t[3])}R.cancel=function(e){void 0!==e&&(P.cancel(L[e]),delete L[e])},R.ids=L;var D=function(e){o(r,e);var n=a(r);function r(){var e;return i(this,r),(e=n.apply(this,arguments)).containerRef=t.exports.createRef(),e.animationStart=!1,e.destroyed=!1,e.onClick=function(t,n){var r,o,a=e.props,i=a.insertExtraNode;if(!(a.disabled||!t||_(t)||t.className.indexOf("-leave")>=0)){e.extraNode=document.createElement("div");var l=c(e).extraNode,u=e.context.getPrefixCls;l.className="".concat(u(""),"-click-animating-node");var d=e.getAttributeName();if(t.setAttribute(d,"true"),n&&"#ffffff"!==n&&"rgb(255, 255, 255)"!==n&&W(n)&&!/rgba\((?:\d*, ){3}0\)/.test(n)&&"transparent"!==n){l.style.borderColor=n;var f=(null===(r=t.getRootNode)||void 0===r?void 0:r.call(t))||t.ownerDocument,p=f instanceof Document?f.body:null!==(o=f.firstChild)&&void 0!==o?o:f;j=s("\n      [".concat(u(""),"-click-animating-without-extra-node='true']::after, .").concat(u(""),"-click-animating-node {\n        --antd-wave-shadow-color: ").concat(n,";\n      }"),"antd-wave",{csp:e.csp,attachTo:p})}i&&t.appendChild(l),["transition","animation"].forEach((function(n){t.addEventListener("".concat(n,"start"),e.onTransitionStart),t.addEventListener("".concat(n,"end"),e.onTransitionEnd)}))}},e.onTransitionStart=function(t){if(!e.destroyed){var n=e.containerRef.current;t&&t.target===n&&!e.animationStart&&e.resetEffect(n)}},e.onTransitionEnd=function(t){t&&"fadeEffect"===t.animationName&&e.resetEffect(t.target)},e.bindAnimationEvent=function(t){if(t&&t.getAttribute&&!t.getAttribute("disabled")&&!(t.className.indexOf("disabled")>=0)){var n=function(n){if("INPUT"!==n.target.tagName&&!_(n.target)){e.resetEffect(t);var r=getComputedStyle(t).getPropertyValue("border-top-color")||getComputedStyle(t).getPropertyValue("border-color")||getComputedStyle(t).getPropertyValue("background-color");e.clickWaveTimeoutId=window.setTimeout((function(){return e.onClick(t,r)}),0),R.cancel(e.animationStartId),e.animationStart=!0,e.animationStartId=R((function(){e.animationStart=!1}),10)}};return t.addEventListener("click",n,!0),{cancel:function(){t.removeEventListener("click",n,!0)}}}},e.renderWave=function(n){var r=n.csp,o=e.props.children;if(e.csp=r,!t.exports.isValidElement(o))return o;var a=e.containerRef;return C(o)&&(a=N(o.ref,e.containerRef)),l(o,{ref:a})},e}return u(r,[{key:"componentDidMount",value:function(){this.destroyed=!1;var e=this.containerRef.current;e&&1===e.nodeType&&(this.instance=this.bindAnimationEvent(e))}},{key:"componentWillUnmount",value:function(){this.instance&&this.instance.cancel(),this.clickWaveTimeoutId&&clearTimeout(this.clickWaveTimeoutId),this.destroyed=!0}},{key:"getAttributeName",value:function(){var e=this.context.getPrefixCls,t=this.props.insertExtraNode;return"".concat(e(""),t?"-click-animating":"-click-animating-without-extra-node")}},{key:"resetEffect",value:function(e){var t=this;if(e&&e!==this.extraNode&&e instanceof Element){var n=this.props.insertExtraNode,r=this.getAttributeName();e.setAttribute(r,"false"),j&&(j.innerHTML=""),n&&this.extraNode&&e.contains(this.extraNode)&&e.removeChild(this.extraNode),["transition","animation"].forEach((function(n){e.removeEventListener("".concat(n,"start"),t.onTransitionStart),e.removeEventListener("".concat(n,"end"),t.onTransitionEnd)}))}}},{key:"render",value:function(){return t.exports.createElement(d,null,this.renderWave)}}]),r}(t.exports.Component);D.contextType=f;var V=e("W",t.exports.forwardRef((function(e,r){return t.exports.createElement(D,n({ref:r},e))}))),z=globalThis&&globalThis.__rest||function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]])}return n},B=t.exports.createContext(void 0),F=function(e){var r,o=t.exports.useContext(f),a=o.getPrefixCls,i=o.direction,c=e.prefixCls,s=e.size,l=e.className,u=z(e,["prefixCls","size","className"]),d=a("btn-group",c),v="";switch(s){case"large":v="lg";break;case"small":v="sm"}var g=p(d,(m(r={},"".concat(d,"-").concat(v),v),m(r,"".concat(d,"-rtl"),"rtl"===i),r),l);return t.exports.createElement(B.Provider,{value:s},t.exports.createElement("div",n({},u,{className:g})))},M=function(){return{width:0,opacity:0,transform:"scale(0)"}},U=function(e){return{width:e.scrollWidth,opacity:1,transform:"scale(1)"}},q=function(e){var t=e.prefixCls,n=!!e.loading;return e.existIcon?r.createElement("span",{className:"".concat(t,"-loading-icon")},r.createElement(v,null)):r.createElement(g,{visible:n,motionName:"".concat(t,"-loading-icon-motion"),removeOnLeave:!0,onAppearStart:M,onAppearActive:U,onEnterStart:M,onEnterActive:U,onLeaveStart:U,onLeaveActive:M},(function(e,n){var o=e.className,a=e.style;return r.createElement("span",{className:"".concat(t,"-loading-icon"),style:a,ref:n},r.createElement(v,{className:o}))}))},G=globalThis&&globalThis.__rest||function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]])}return n},H=/^[\u4e00-\u9fa5]{2}$/,$=H.test.bind(H);function J(e){return"text"===e||"link"===e}function K(e,n){if(null!=e){var r,o=n?" ":"";return"string"!=typeof e&&"number"!=typeof e&&"string"==typeof e.type&&$(e.props.children)?l(e,{children:e.props.children.split("").join(o)}):"string"==typeof e?$(e)?t.exports.createElement("span",null,e.split("").join(o)):t.exports.createElement("span",null,e):(r=e,t.exports.isValidElement(r)&&r.type===t.exports.Fragment?t.exports.createElement("span",null,e):e)}}x("default","primary","ghost","dashed","link","text"),x("default","circle","round"),x("submit","button","reset");var Q=function(e,r){var o,a=e.loading,i=void 0!==a&&a,c=e.prefixCls,s=e.type,l=void 0===s?"default":s,u=e.danger,d=e.shape,v=void 0===d?"default":d,g=e.size,x=e.disabled,C=e.className,N=e.children,k=e.icon,T=e.ghost,S=void 0!==T&&T,O=e.block,A=void 0!==O&&O,P=e.htmlType,j=void 0===P?"button":P,I=G(e,["loading","prefixCls","type","danger","shape","size","disabled","className","children","icon","ghost","block","htmlType"]),L=t.exports.useContext(h),R=t.exports.useContext(y),_=x||R,W=t.exports.useContext(B),D=t.exports.useState(!!i),z=b(D,2),F=z[0],M=z[1],U=t.exports.useState(!1),H=b(U,2),Q=H[0],X=H[1],Y=t.exports.useContext(f),Z=Y.getPrefixCls,ee=Y.autoInsertSpaceInButton,te=Y.direction,ne=r||t.exports.createRef(),re=function(){return 1===t.exports.Children.count(N)&&!k&&!J(l)},oe="boolean"==typeof i?i:(null==i?void 0:i.delay)||!0;t.exports.useEffect((function(){var e=null;return"number"==typeof oe?e=window.setTimeout((function(){e=null,M(oe)}),oe):M(oe),function(){e&&(window.clearTimeout(e),e=null)}}),[oe]),t.exports.useEffect((function(){if(ne&&ne.current&&!1!==ee){var e=ne.current.textContent;re()&&$(e)?Q||X(!0):Q&&X(!1)}}),[ne]);var ae=function(t){var n=e.onClick;F||_?t.preventDefault():null==n||n(t)},ie=Z("btn",c),ce=!1!==ee,se=W||g||L,le=se&&{large:"lg",small:"sm",middle:void 0}[se]||"",ue=F?"loading":k,de=E(I,["navigate"]),fe=p(ie,(m(o={},"".concat(ie,"-").concat(v),"default"!==v&&v),m(o,"".concat(ie,"-").concat(l),l),m(o,"".concat(ie,"-").concat(le),le),m(o,"".concat(ie,"-icon-only"),!N&&0!==N&&!!ue),m(o,"".concat(ie,"-background-ghost"),S&&!J(l)),m(o,"".concat(ie,"-loading"),F),m(o,"".concat(ie,"-two-chinese-chars"),Q&&ce&&!F),m(o,"".concat(ie,"-block"),A),m(o,"".concat(ie,"-dangerous"),!!u),m(o,"".concat(ie,"-rtl"),"rtl"===te),m(o,"".concat(ie,"-disabled"),void 0!==de.href&&_),o),C),pe=k&&!F?k:t.exports.createElement(q,{existIcon:!!k,prefixCls:ie,loading:!!F}),me=N||0===N?function(e,n){var r=!1,o=[];return t.exports.Children.forEach(e,(function(e){var t=w(e),n="string"===t||"number"===t;if(r&&n){var a=o.length-1,i=o[a];o[a]="".concat(i).concat(e)}else o.push(e);r=n})),t.exports.Children.map(o,(function(e){return K(e,n)}))}(N,re()&&ce):null;if(void 0!==de.href)return t.exports.createElement("a",n({},de,{className:fe,onClick:ae,ref:ne}),pe,me);var ve=t.exports.createElement("button",n({},I,{type:j,className:fe,onClick:ae,disabled:_,ref:ne}),pe,me);return J(l)?ve:t.exports.createElement(V,{disabled:!!F},ve)},X=t.exports.forwardRef(Q);X.Group=F,X.__ANT_BUTTON=!0,e("B",X)}}}));