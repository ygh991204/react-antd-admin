import{c as $,_ as C,C as q,u as G,e as O,B as H}from"./index-bc6b992f.js";import{t as J}from"./toArray-72c8c298.js";import{a as r,_ as p}from"./lib-4d799710.js";import{R as F,r as M}from"./responsiveObserve-c42fcffb.js";var K=function(e){var n=e.children;return n},Q=K;function L(t){return t!=null}var W=function(e){var n=e.itemPrefixCls,o=e.component,s=e.span,a=e.className,l=e.style,u=e.labelStyle,x=e.contentStyle,y=e.bordered,i=e.label,d=e.content,b=e.colon,v=o;if(y){var c;return r.exports.createElement(v,{className:$((c={},C(c,"".concat(n,"-item-label"),L(i)),C(c,"".concat(n,"-item-content"),L(d)),c),a),style:l,colSpan:s},L(i)&&r.exports.createElement("span",{style:u},i),L(d)&&r.exports.createElement("span",{style:x},d))}return r.exports.createElement(v,{className:$("".concat(n,"-item"),a),style:l,colSpan:s},r.exports.createElement("div",{className:"".concat(n,"-item-container")},(i||i===0)&&r.exports.createElement("span",{className:$("".concat(n,"-item-label"),C({},"".concat(n,"-item-no-colon"),!b)),style:u},i),(d||d===0)&&r.exports.createElement("span",{className:$("".concat(n,"-item-content")),style:x},d)))},I=W;function z(t,e,n){var o=e.colon,s=e.prefixCls,a=e.bordered,l=n.component,u=n.type,x=n.showLabel,y=n.showContent,i=n.labelStyle,d=n.contentStyle;return t.map(function(b,v){var c=b.props,f=c.label,E=c.children,S=c.prefixCls,h=S===void 0?s:S,N=c.className,m=c.style,P=c.labelStyle,w=c.contentStyle,R=c.span,k=R===void 0?1:R,g=b.key;return typeof l=="string"?r.exports.createElement(I,{key:"".concat(u,"-").concat(g||v),className:N,style:m,labelStyle:p(p({},i),P),contentStyle:p(p({},d),w),span:k,colon:o,component:l,itemPrefixCls:h,bordered:a,label:x?f:null,content:y?E:null}):[r.exports.createElement(I,{key:"label-".concat(g||v),className:N,style:p(p(p({},i),m),P),span:1,colon:o,component:l[0],itemPrefixCls:h,bordered:a,label:f}),r.exports.createElement(I,{key:"content-".concat(g||v),className:N,style:p(p(p({},d),m),w),span:k*2-1,component:l[1],itemPrefixCls:h,bordered:a,content:E})]})}var X=function(e){var n=r.exports.useContext(T),o=e.prefixCls,s=e.vertical,a=e.row,l=e.index,u=e.bordered;return s?r.exports.createElement(r.exports.Fragment,null,r.exports.createElement("tr",{key:"label-".concat(l),className:"".concat(o,"-row")},z(a,e,p({component:"th",type:"label",showLabel:!0},n))),r.exports.createElement("tr",{key:"content-".concat(l),className:"".concat(o,"-row")},z(a,e,p({component:"td",type:"content",showContent:!0},n)))):r.exports.createElement("tr",{key:l,className:"".concat(o,"-row")},z(a,e,p({component:u?["th","td"]:"td",type:"item",showLabel:!0,showContent:!0},n)))},Y=X,T=r.exports.createContext({}),U={xxl:3,xl:3,lg:3,md:3,sm:2,xs:1};function Z(t,e){if(typeof t=="number")return t;if(O(t)==="object")for(var n=0;n<M.length;n++){var o=M[n];if(e[o]&&t[o]!==void 0)return t[o]||U[o]}return 3}function j(t,e,n){var o=t;return(e===void 0||e>n)&&(o=H(t,{span:n})),o}function _(t,e){var n=J(t).filter(function(l){return l}),o=[],s=[],a=e;return n.forEach(function(l,u){var x,y=(x=l.props)===null||x===void 0?void 0:x.span,i=y||1;if(u===n.length-1){s.push(j(l,y,a)),o.push(s);return}i<a?(a-=i,s.push(l)):(s.push(j(l,i,a)),o.push(s),a=e,s=[])}),o}function ee(t){var e,n=t.prefixCls,o=t.title,s=t.extra,a=t.column,l=a===void 0?U:a,u=t.colon,x=u===void 0?!0:u,y=t.bordered,i=t.layout,d=t.children,b=t.className,v=t.style,c=t.size,f=t.labelStyle,E=t.contentStyle,S=r.exports.useContext(q),h=S.getPrefixCls,N=S.direction,m=h("descriptions",n),P=r.exports.useState({}),w=G(P,2),R=w[0],k=w[1],g=Z(l,R);r.exports.useEffect(function(){var A=F.subscribe(function(D){O(l)==="object"&&k(D)});return function(){F.unsubscribe(A)}},[]);var B=_(d,g),V=r.exports.useMemo(function(){return{labelStyle:f,contentStyle:E}},[f,E]);return r.exports.createElement(T.Provider,{value:V},r.exports.createElement("div",{className:$(m,(e={},C(e,"".concat(m,"-").concat(c),c&&c!=="default"),C(e,"".concat(m,"-bordered"),!!y),C(e,"".concat(m,"-rtl"),N==="rtl"),e),b),style:v},(o||s)&&r.exports.createElement("div",{className:"".concat(m,"-header")},o&&r.exports.createElement("div",{className:"".concat(m,"-title")},o),s&&r.exports.createElement("div",{className:"".concat(m,"-extra")},s)),r.exports.createElement("div",{className:"".concat(m,"-view")},r.exports.createElement("table",null,r.exports.createElement("tbody",null,B.map(function(A,D){return r.exports.createElement(Y,{key:D,index:D,colon:x,prefixCls:m,vertical:i==="vertical",bordered:y,row:A})}))))))}ee.Item=Q;export{ee as D};