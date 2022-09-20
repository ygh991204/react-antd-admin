import{a,_ as v}from"./lib-4d799710.js";import{_ as w,C as L,u as W,c as q}from"./index-f95accb3.js";import{t as H}from"./toArray-7d2716c5.js";import{u as J}from"./useFlexGapSupport-57a5fd6d.js";function K(e){var r=e.className,i=e.direction,t=e.index,n=e.marginDirection,s=e.children,c=e.split,f=e.wrap,o=a.exports.useContext($),m=o.horizontalSize,S=o.verticalSize,u=o.latestIndex,g=o.supportFlexGap,l={};return g||(i==="vertical"?t<u&&(l={marginBottom:m/(c?2:1)}):l=v(v({},t<u&&w({},n,m/(c?2:1))),f&&{paddingBottom:S})),s==null?null:a.exports.createElement(a.exports.Fragment,null,a.exports.createElement("div",{className:r,style:l},s),t<u&&c&&a.exports.createElement("span",{className:"".concat(r,"-split"),style:l},c))}var Q=globalThis&&globalThis.__rest||function(e,r){var i={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&r.indexOf(t)<0&&(i[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,t=Object.getOwnPropertySymbols(e);n<t.length;n++)r.indexOf(t[n])<0&&Object.prototype.propertyIsEnumerable.call(e,t[n])&&(i[t[n]]=e[t[n]]);return i},$=a.exports.createContext({latestIndex:0,horizontalSize:0,verticalSize:0,supportFlexGap:!1}),U={small:8,middle:16,large:24};function V(e){return typeof e=="string"?U[e]:e||0}var X=function(r){var i,t=a.exports.useContext(L),n=t.getPrefixCls,s=t.space,c=t.direction,f=r.size,o=f===void 0?(s==null?void 0:s.size)||"small":f,m=r.align,S=r.className,u=r.children,g=r.direction,l=g===void 0?"horizontal":g,F=r.prefixCls,I=r.split,A=r.style,_=r.wrap,b=_===void 0?!1:_,R=Q(r,["size","align","className","children","direction","prefixCls","split","style","wrap"]),y=J(),j=a.exports.useMemo(function(){return(Array.isArray(o)?o:[o,o]).map(function(p){return V(p)})},[o]),O=W(j,2),C=O[0],z=O[1],P=H(u,{keepEmpty:!0}),E=m===void 0&&l==="horizontal"?"center":m,d=n("space",F),k=q(d,"".concat(d,"-").concat(l),(i={},w(i,"".concat(d,"-rtl"),c==="rtl"),w(i,"".concat(d,"-align-").concat(E),E),i),S),G="".concat(d,"-item"),D=c==="rtl"?"marginLeft":"marginRight",h=0,M=P.map(function(p,N){p!=null&&(h=N);var T=p&&p.key||"".concat(G,"-").concat(N);return a.exports.createElement(K,{className:G,key:T,direction:l,index:N,marginDirection:D,split:I,wrap:b},p)}),B=a.exports.useMemo(function(){return{horizontalSize:C,verticalSize:z,latestIndex:h,supportFlexGap:y}},[C,z,h,y]);if(P.length===0)return null;var x={};return b&&(x.flexWrap="wrap",y||(x.marginBottom=-z)),y&&(x.columnGap=C,x.rowGap=z),a.exports.createElement("div",v({className:k,style:v(v({},x),A)},R),a.exports.createElement($.Provider,{value:B},M))},re=X;export{re as S};
