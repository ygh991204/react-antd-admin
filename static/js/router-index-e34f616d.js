import{a9 as a,j as i,F as o,a as e}from"./index-cfe04051.js";import{A as p}from"./index-fe82236b.js";import"./index-4204792a.js";import{C as t}from"./index-7fd9bfe8.js";import"./index-d2be0613.js";import{S as s}from"./index-6b36a862.js";import{B as r}from"./button-a84f60f8.js";import"./lib-4d799710.js";import"./vendor-8c87efda.js";import"./getDataOrAriaProps-140767b0.js";import"./toArray-94a3643f.js";import"./useFlexGapSupport-641d93a2.js";function E(){const u=a();return i(o,{children:[e(p,{message:"src/router/useRouter hook\u63D0\u4F9B\u8DEF\u7531\u8DF3\u8F6C\u80FD\u529B\uFF08\u7C7B\u4F3C vue-router \u4E2D\u7684 this.$router\uFF0C\u57FA\u4E8E react-router-dom \u4E2D\u7684 useNavigate\uFF09",type:"info"}),e(t,{style:{marginTop:"20px"},bordered:!1,title:"push",children:i(s,{direction:"vertical",children:[e(r,{type:"link",onClick:()=>{u.push({path:"/"})},children:"\u9996\u9875"}),e(r,{type:"link",onClick:()=>{u.push({path:"/navigate/test",query:{id:"ygh91204"}})},children:"\u8DEF\u7531\u6D4B\u8BD5\u9875\uFF08\u5E26 query\uFF09"}),e(r,{type:"link",onClick:()=>{u.push({path:"/navigate/test",params:{name:"antd"}})},children:"\u8DEF\u7531\u6D4B\u8BD5\u9875\uFF08\u5E26 params\uFF09"})]})}),e(t,{style:{marginTop:"20px"},bordered:!1,title:"replace",children:e(r,{type:"link",onClick:()=>{u.replace({path:"/detail/basis"})},children:"\u57FA\u7840\u8BE6\u60C5\u9875"})}),e(t,{style:{marginTop:"20px"},bordered:!1,title:"back",children:e(r,{type:"link",onClick:()=>{u.back()},children:"\u8FD4\u56DE"})})]})}export{E as default};