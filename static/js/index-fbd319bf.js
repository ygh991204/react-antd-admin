import{a as r,_ as E}from"./lib-4d799710.js";import{g as q,h as G,i as J,k as K,u as Q,C as U,c as b,_ as f,l as V,Z as X,z as Y,$ as ee,a0 as te,W as oe,a1 as ne,a2 as re,a3 as ae,a4 as se,a5 as ce}from"./index-bc6b992f.js";import{g as le}from"./getDataOrAriaProps-140767b0.js";var ie=function(s){q(n,s);var e=G(n);function n(){var t;return J(this,n),t=e.apply(this,arguments),t.state={error:void 0,info:{componentStack:""}},t}return K(n,[{key:"componentDidCatch",value:function(o,c){this.setState({error:o,info:c})}},{key:"render",value:function(){var o=this.props,c=o.message,l=o.description,C=o.children,v=this.state,x=v.error,p=v.info,y=p&&p.componentStack?p.componentStack:null,h=typeof c=="undefined"?(x||"").toString():c,g=typeof l=="undefined"?y:l;return x?r.exports.createElement(Ce,{type:"error",message:h,description:r.exports.createElement("pre",null,g)}):C}}]),n}(r.exports.Component),pe=globalThis&&globalThis.__rest||function(s,e){var n={};for(var t in s)Object.prototype.hasOwnProperty.call(s,t)&&e.indexOf(t)<0&&(n[t]=s[t]);if(s!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,t=Object.getOwnPropertySymbols(s);o<t.length;o++)e.indexOf(t[o])<0&&Object.prototype.propertyIsEnumerable.call(s,t[o])&&(n[t[o]]=s[t[o]]);return n},ue={success:ee,info:te,error:oe,warning:ne},de={success:re,info:ae,error:se,warning:ce},me=function(e){var n=e.description,t=e.icon,o=e.prefixCls,c=e.type,l=(n?de:ue)[c]||null;return t?X(t,r.exports.createElement("span",{className:"".concat(o,"-icon")},t),function(){return{className:b("".concat(o,"-icon"),f({},t.props.className,t.props.className))}}):r.exports.createElement(l,{className:"".concat(o,"-icon")})},fe=function(e){var n=e.isClosable,t=e.closeText,o=e.prefixCls,c=e.closeIcon,l=e.handleClose;return n?r.exports.createElement("button",{type:"button",onClick:l,className:"".concat(o,"-close-icon"),tabIndex:0},t?r.exports.createElement("span",{className:"".concat(o,"-close-text")},t):c):null},$=function(e){var n,t=e.description,o=e.prefixCls,c=e.message,l=e.banner,C=e.className,v=C===void 0?"":C,x=e.style,p=e.onMouseEnter,y=e.onMouseLeave,h=e.onClick,g=e.afterClose,N=e.showIcon,A=e.closable,I=e.closeText,S=e.closeIcon,_=S===void 0?r.exports.createElement(Y,null):S,O=e.action,u=pe(e,["description","prefixCls","message","banner","className","style","onMouseEnter","onMouseLeave","onClick","afterClose","showIcon","closable","closeText","closeIcon","action"]),L=r.exports.useState(!1),k=Q(L,2),w=k[0],F=k[1],j=r.exports.useRef(),M=r.exports.useContext(U),D=M.getPrefixCls,R=M.direction,a=D("alert",o),B=function(i){var m;F(!0),(m=u.onClose)===null||m===void 0||m.call(u,i)},z=function(){var i=u.type;return i!==void 0?i:l?"warning":"info"},H=I?!0:A,T=z(),P=l&&N===void 0?!0:N,W=b(a,"".concat(a,"-").concat(T),(n={},f(n,"".concat(a,"-with-description"),!!t),f(n,"".concat(a,"-no-icon"),!P),f(n,"".concat(a,"-banner"),!!l),f(n,"".concat(a,"-rtl"),R==="rtl"),n),v),Z=le(u);return r.exports.createElement(V,{visible:!w,motionName:"".concat(a,"-motion"),motionAppear:!1,motionEnter:!1,onLeaveStart:function(i){return{maxHeight:i.offsetHeight}},onLeaveEnd:g},function(d){var i=d.className,m=d.style;return r.exports.createElement("div",E({ref:j,"data-show":!w,className:b(W,i),style:E(E({},x),m),onMouseEnter:p,onMouseLeave:y,onClick:h,role:"alert"},Z),P?r.exports.createElement(me,{description:t,icon:u.icon,prefixCls:a,type:T}):null,r.exports.createElement("div",{className:"".concat(a,"-content")},c?r.exports.createElement("div",{className:"".concat(a,"-message")},c):null,t?r.exports.createElement("div",{className:"".concat(a,"-description")},t):null),O?r.exports.createElement("div",{className:"".concat(a,"-action")},O):null,r.exports.createElement(fe,{isClosable:!!H,closeText:I,prefixCls:a,closeIcon:_,handleClose:B}))})};$.ErrorBoundary=ie;var Ce=$;export{Ce as A};