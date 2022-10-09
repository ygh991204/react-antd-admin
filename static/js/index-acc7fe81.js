import{C as J,e as R,_ as c,c as K,E as Q,u as z}from"./index-cfe04051.js";import{a as l,_ as v}from"./lib-4d799710.js";import{u as Y}from"./useFlexGapSupport-641d93a2.js";import{R as q,r as D}from"./responsiveObserve-14c5602e.js";var Z=l.exports.createContext({}),U=Z,ee=globalThis&&globalThis.__rest||function(e,i){var r={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&i.indexOf(t)<0&&(r[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,t=Object.getOwnPropertySymbols(e);a<t.length;a++)i.indexOf(t[a])<0&&Object.prototype.propertyIsEnumerable.call(e,t[a])&&(r[t[a]]=e[t[a]]);return r};function te(e){return typeof e=="number"?"".concat(e," ").concat(e," auto"):/^\d+(\.\d+)?(px|em|rem|%)$/.test(e)?"0 0 ".concat(e):e}var re=["xs","sm","md","lg","xl","xxl"],ae=l.exports.forwardRef(function(e,i){var r,t=l.exports.useContext(J),a=t.getPrefixCls,j=t.direction,C=l.exports.useContext(U),p=C.gutter,F=C.wrap,P=C.supportFlexGap,g=e.prefixCls,b=e.span,S=e.order,w=e.offset,N=e.push,$=e.pull,B=e.className,G=e.children,E=e.flex,I=e.style,h=ee(e,["prefixCls","span","order","offset","push","pull","className","children","flex","style"]),s=a("col",g),_={};re.forEach(function(f){var u,n={},m=e[f];typeof m=="number"?n.span=m:R(m)==="object"&&(n=m||{}),delete h[f],_=v(v({},_),(u={},c(u,"".concat(s,"-").concat(f,"-").concat(n.span),n.span!==void 0),c(u,"".concat(s,"-").concat(f,"-order-").concat(n.order),n.order||n.order===0),c(u,"".concat(s,"-").concat(f,"-offset-").concat(n.offset),n.offset||n.offset===0),c(u,"".concat(s,"-").concat(f,"-push-").concat(n.push),n.push||n.push===0),c(u,"".concat(s,"-").concat(f,"-pull-").concat(n.pull),n.pull||n.pull===0),c(u,"".concat(s,"-rtl"),j==="rtl"),u))});var x=K(s,(r={},c(r,"".concat(s,"-").concat(b),b!==void 0),c(r,"".concat(s,"-order-").concat(S),S),c(r,"".concat(s,"-offset-").concat(w),w),c(r,"".concat(s,"-push-").concat(N),N),c(r,"".concat(s,"-pull-").concat($),$),r),B,_),o={};if(p&&p[0]>0){var A=p[0]/2;o.paddingLeft=A,o.paddingRight=A}if(p&&p[1]>0&&!P){var d=p[1]/2;o.paddingTop=d,o.paddingBottom=d}return E&&(o.flex=te(E),F===!1&&!o.minWidth&&(o.minWidth=0)),l.exports.createElement("div",v({},h,{style:v(v({},o),I),className:x,ref:i}),G)}),fe=ae,ne=globalThis&&globalThis.__rest||function(e,i){var r={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&i.indexOf(t)<0&&(r[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,t=Object.getOwnPropertySymbols(e);a<t.length;a++)i.indexOf(t[a])<0&&Object.prototype.propertyIsEnumerable.call(e,t[a])&&(r[t[a]]=e[t[a]]);return r};Q("top","middle","bottom","stretch");Q("start","end","center","space-around","space-between","space-evenly");var oe=l.exports.forwardRef(function(e,i){var r,t=e.prefixCls,a=e.justify,j=e.align,C=e.className,p=e.style,F=e.children,P=e.gutter,g=P===void 0?0:P,b=e.wrap,S=ne(e,["prefixCls","justify","align","className","style","children","gutter","wrap"]),w=l.exports.useContext(J),N=w.getPrefixCls,$=w.direction,B=l.exports.useState({xs:!0,sm:!0,md:!0,lg:!0,xl:!0,xxl:!0}),G=z(B,2),E=G[0],I=G[1],h=Y(),s=l.exports.useRef(g);l.exports.useEffect(function(){var V=q.subscribe(function(O){var y=s.current||0;(!Array.isArray(y)&&R(y)==="object"||Array.isArray(y)&&(R(y[0])==="object"||R(y[1])==="object"))&&I(O)});return function(){return q.unsubscribe(V)}},[]);var _=function(){var O=[void 0,void 0],y=Array.isArray(g)?g:[g,void 0];return y.forEach(function(T,k){if(R(T)==="object")for(var L=0;L<D.length;L++){var W=D[L];if(E[W]&&T[W]!==void 0){O[k]=T[W];break}}else O[k]=T}),O},x=N("row",t),o=_(),A=K(x,(r={},c(r,"".concat(x,"-no-wrap"),b===!1),c(r,"".concat(x,"-").concat(a),a),c(r,"".concat(x,"-").concat(j),j),c(r,"".concat(x,"-rtl"),$==="rtl"),r),C),d={},f=o[0]!=null&&o[0]>0?o[0]/-2:void 0,u=o[1]!=null&&o[1]>0?o[1]/-2:void 0;if(f&&(d.marginLeft=f,d.marginRight=f),h){var n=z(o,2);d.rowGap=n[1]}else u&&(d.marginTop=u,d.marginBottom=u);var m=z(o,2),H=m[0],M=m[1],X=l.exports.useMemo(function(){return{gutter:[H,M],wrap:b,supportFlexGap:h}},[H,M,b,h]);return l.exports.createElement(U.Provider,{value:X},l.exports.createElement("div",v({},S,{className:A,style:v(v({},d),p),ref:i}),F))}),ie=oe;export{fe as C,ie as R};