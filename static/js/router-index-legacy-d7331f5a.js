System.register(["./index-legacy-5416c353.js","./index-legacy-98eb9c60.js","./index-legacy-52d7fe89.js","./index-legacy-947c543b.js","./index-legacy-f4081958.js","./index-legacy-c53ffb21.js","./button-legacy-b1e2a5e1.js","./lib-legacy-76f34388.js","./vendor-legacy-598c0b76.js","./getDataOrAriaProps-legacy-1dff2fb8.js","./toArray-legacy-3e0bbb22.js","./useFlexGapSupport-legacy-ef77faf5.js"],(function(e){"use strict";var n,t,i,c,r,a,o,l;return{setters:[function(e){n=e.a9,t=e.j,i=e.F,c=e.a},function(e){r=e.A},function(){},function(e){a=e.C},function(){},function(e){o=e.S},function(e){l=e.B},function(){},function(){},function(){},function(){},function(){}],execute:function(){e("default",(function(){var e=n();return t(i,{children:[c(r,{message:"src/router/useRouter hook提供路由跳转能力（类似 vue-router 中的 this.$router，基于 react-router-dom 中的 useNavigate）",type:"info"}),c(a,{style:{marginTop:"20px"},bordered:!1,title:"push",children:t(o,{direction:"vertical",children:[c(l,{type:"link",onClick:function(){e.push({path:"/"})},children:"首页"}),c(l,{type:"link",onClick:function(){e.push({path:"/navigate/test",query:{id:"ygh91204"}})},children:"路由测试页（带 query）"}),c(l,{type:"link",onClick:function(){e.push({path:"/navigate/test",params:{name:"antd"}})},children:"路由测试页（带 params）"})]})}),c(a,{style:{marginTop:"20px"},bordered:!1,title:"replace",children:c(l,{type:"link",onClick:function(){e.replace({path:"/detail/basis"})},children:"基础详情页"})}),c(a,{style:{marginTop:"20px"},bordered:!1,title:"back",children:c(l,{type:"link",onClick:function(){e.back()},children:"返回"})})]})}))}}}));