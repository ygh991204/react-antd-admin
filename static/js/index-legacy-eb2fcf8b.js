!function(){var e=document.createElement("style");e.innerHTML=".ant-space{display:inline-flex}.ant-space-vertical{flex-direction:column}.ant-space-align-center{align-items:center}.ant-space-align-start{align-items:flex-start}.ant-space-align-end{align-items:flex-end}.ant-space-align-baseline{align-items:baseline}.ant-space-item:empty{display:none}.ant-space-rtl{direction:rtl}\n",document.head.appendChild(e),System.register(["./lib-legacy-76f34388.js","./index-legacy-06339c3c.js","./toArray-legacy-6c575335.js","./useFlexGapSupport-legacy-ae620b20.js"],(function(e){"use strict";var t,n,a,r,i,l,o,c;return{setters:[function(e){t=e.a,n=e._},function(e){a=e._,r=e.C,i=e.u,l=e.c},function(e){o=e.t},function(e){c=e.u}],execute:function(){function s(e){var r=e.className,i=e.direction,l=e.index,o=e.marginDirection,c=e.children,s=e.split,p=e.wrap,m=t.exports.useContext(u),d=m.horizontalSize,x=m.verticalSize,f=m.latestIndex,g={};return m.supportFlexGap||("vertical"===i?l<f&&(g={marginBottom:d/(s?2:1)}):g=n(n({},l<f&&a({},o,d/(s?2:1))),p&&{paddingBottom:x})),null==c?null:t.exports.createElement(t.exports.Fragment,null,t.exports.createElement("div",{className:r,style:g},c),l<f&&s&&t.exports.createElement("span",{className:"".concat(r,"-split"),style:g},s))}var p=globalThis&&globalThis.__rest||function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(a=Object.getOwnPropertySymbols(e);r<a.length;r++)t.indexOf(a[r])<0&&Object.prototype.propertyIsEnumerable.call(e,a[r])&&(n[a[r]]=e[a[r]])}return n},u=t.exports.createContext({latestIndex:0,horizontalSize:0,verticalSize:0,supportFlexGap:!1}),m={small:8,middle:16,large:24};e("S",(function(e){var d,x=t.exports.useContext(r),f=x.getPrefixCls,g=x.space,y=x.direction,v=e.size,h=void 0===v?(null==g?void 0:g.size)||"small":v,z=e.align,b=e.className,S=e.children,w=e.direction,E=void 0===w?"horizontal":w,O=e.prefixCls,j=e.split,C=e.style,N=e.wrap,G=void 0!==N&&N,F=p(e,["size","align","className","children","direction","prefixCls","split","style","wrap"]),P=c(),I=t.exports.useMemo((function(){return(Array.isArray(h)?h:[h,h]).map((function(e){return function(e){return"string"==typeof e?m[e]:e||0}(e)}))}),[h]),_=i(I,2),k=_[0],A=_[1],B=o(S,{keepEmpty:!0}),M=void 0===z&&"horizontal"===E?"center":z,T=f("space",O),D=l(T,"".concat(T,"-").concat(E),(a(d={},"".concat(T,"-rtl"),"rtl"===y),a(d,"".concat(T,"-align-").concat(M),M),d),b),L="".concat(T,"-item"),H="rtl"===y?"marginLeft":"marginRight",R=0,W=B.map((function(e,n){null!=e&&(R=n);var a=e&&e.key||"".concat(L,"-").concat(n);return t.exports.createElement(s,{className:L,key:a,direction:E,index:n,marginDirection:H,split:j,wrap:G},e)})),q=t.exports.useMemo((function(){return{horizontalSize:k,verticalSize:A,latestIndex:R,supportFlexGap:P}}),[k,A,R,P]);if(0===B.length)return null;var J={};return G&&(J.flexWrap="wrap",P||(J.marginBottom=-A)),P&&(J.columnGap=k,J.rowGap=A),t.exports.createElement("div",n({className:D,style:n(n({},J),C)},F),t.exports.createElement(u.Provider,{value:q},W))}))}}}))}();