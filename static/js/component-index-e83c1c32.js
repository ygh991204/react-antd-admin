import{P as o,aP as m,a as r,F as a,j as p}from"./index-f95accb3.js";import{C as F}from"./index-f6268eb1.js";import"./index-b1bf35e0.js";import"./index-a9aae97d.js";import{S as c}from"./index-1ef33c36.js";import{a as d}from"./lib-4d799710.js";import{B as n}from"./button-5c515fee.js";import"./vendor-8c87efda.js";import"./toArray-7d2716c5.js";import"./useFlexGapSupport-57a5fd6d.js";function h(e){const u=o(s=>s.user.permissions);return d.exports.useMemo(()=>m(e,u),[e,u])}function i({permissions:e,render:u,children:t}){const s=h(e);return r(a,{children:s&&(u||t)||null})}function B(){return r(F,{bordered:!1,children:p(c,{children:[r(i,{render:r(n,{type:"primary",children:"\u7F16\u8F91\uFF08amin\uFF0Cuser \u90FD\u53EF\u89C1\uFF09"}),permissions:["admin","user"]}),r(i,{render:r(n,{type:"primary",danger:!0,children:"\u5220\u9664\uFF08amin \u53EF\u89C1\uFF09"}),permissions:["admin"]})]})})}export{B as default};
