System.register(["./index-legacy-06339c3c.js","./index-legacy-23bbddc3.js","./index-legacy-51b3312f.js","./index-legacy-acc1c448.js","./index-legacy-0a3e2020.js","./index-legacy-d50bfcdc.js","./button-legacy-6f3e16b1.js","./lib-legacy-76f34388.js","./vendor-legacy-598c0b76.js","./toArray-legacy-6c575335.js","./responsiveObserve-legacy-289e67ea.js","./colors-legacy-611b420b.js"],(function(e){"use strict";var t,n,i,r,c,s,l;return{setters:[function(e){t=e.j,n=e.F,i=e.a},function(e){r=e.C},function(){},function(e){c=e.D},function(e){s=e.T},function(){},function(e){l=e.B},function(){},function(){},function(){},function(){},function(){}],execute:function(){e("default",(function(){return t(n,{children:[t(r,{bordered:!1,children:[i("h2",{children:o.name}),i("p",{children:o.description}),t(c,{title:"",bordered:!0,column:2,children:[i(c.Item,{label:"版本",children:o.version}),i(c.Item,{label:"开源协议",children:o.license}),i(c.Item,{label:"标签",children:o.keywords.map((function(e){return i(s,{children:e},e)}))}),i(c.Item,{label:"文档地址",children:i(l,{type:"link",href:o.homepage,target:"_blank",children:"文档地址"})})]})]}),i(r,{style:{marginTop:"20px"},bordered:!1,title:"生产依赖",children:i(c,{title:"",bordered:!0,children:Object.keys(o.dependencies).map((function(e){return i(c.Item,{label:e,children:o.dependencies[e]},e)}))})}),i(r,{style:{marginTop:"20px"},bordered:!1,title:"开发依赖",children:i(c,{title:"",bordered:!0,children:Object.keys(o.devDependencies).map((function(e){return i(c.Item,{label:e,children:o.devDependencies[e]},e)}))})})]})}));var o={name:"react-antd-admin",version:"0.0.1",description:"一个开箱即用的后台管理前端模板",keywords:["react","admin","antd","react-admin","react-antd","antd-admin"],repository:{type:"git",url:"git+https://github.com/ygh991204/react-antd-admin.git"},author:"Xiao Feng",license:"MIT",bugs:{url:"https://github.com/ygh991204/react-antd-admin/issues"},homepage:"http://xiaofengproject.gitee.io/raect-antd-admin-doc",scripts:{dev:"vite --mode development",build:"npm run type:lint && vite build --mode production","build:test":"npm run type:lint && vite build --mode test","type:lint":"tsc --noEmit",preview:"vite preview",prepare:"husky install","lint:staged":"lint-staged",visualizer:"cross-env visualizer=true npm run build","clear:cache":"rimraf node_modules/.cache && rimraf node_modules/.vite"},dependencies:{"@ant-design/charts":"^1.3.6","@loadable/component":"^5.15.2","@reduxjs/toolkit":"^1.8.1",antd:"^4.20.6",axios:"^0.26.1",cropperjs:"^1.5.12","crypto-js":"^4.1.1",dayjs:"^1.11.2",i18next:"^21.8.9","i18next-browser-languagedetector":"^6.1.4","js-cookie":"^3.0.1",less:"^4.1.2","lodash-es":"^4.17.21",mockjs:"^1.1.0","normalize.css":"^8.0.1",nprogress:"^0.2.0",qs:"^6.10.3",quill:"^1.3.7",react:"^18.0.0","react-color":"^2.19.3","react-copy-to-clipboard":"^5.1.0","react-dom":"^18.0.0","react-i18next":"^11.17.1","react-json-view":"^1.21.3","react-redux":"^8.0.1","react-router-dom":"^6.3.0",screenfull:"^6.0.1","styled-components":"^5.3.5",uuid:"^8.3.2"},devDependencies:{"@types/crypto-js":"^4.1.1","@types/loadable__component":"^5.13.4","@types/lodash-es":"^4.17.6","@types/nprogress":"^0.2.0","@types/qs":"^6.9.7","@types/quill":"^2.0.9","@types/react":"^18.0.0","@types/react-copy-to-clipboard":"^5.0.3","@types/react-dom":"^18.0.0","@types/styled-components":"^5.1.25","@types/uuid":"^8.3.4","@typescript-eslint/eslint-plugin":"^5.30.6","@typescript-eslint/parser":"^5.30.6","@vitejs/plugin-legacy":"^1.8.2","@vitejs/plugin-react":"^1.3.0","cross-env":"^7.0.3",eslint:"^8.16.0","eslint-plugin-react":"^7.30.0","eslint-plugin-react-hooks":"^4.5.0",husky:"^8.0.1","less-vars-to-js":"^1.3.0","lint-staged":"^13.0.3","rollup-plugin-visualizer":"^5.7.1",typescript:"^4.7.4",vite:"^2.9.5","vite-plugin-compression":"^0.5.1","vite-plugin-eslint":"^1.8.1","vite-plugin-html":"^3.2.0","vite-plugin-imp":"^2.1.8","vite-plugin-mock":"^2.9.6","vite-plugin-pwa":"^0.12.0","vite-plugin-style-import":"^2.0.0","vite-plugin-svg-icons":"^2.0.1"}}}}}));