!function(){var o=document.createElement("style");o.innerHTML='.ant-popover{box-sizing:border-box;margin:0;padding:0;color:#000000d9;font-size:14px;font-variant:tabular-nums;line-height:1.5715;list-style:none;font-feature-settings:tnum;position:absolute;top:0;left:0;z-index:1030;font-weight:400;white-space:normal;text-align:left;cursor:auto;user-select:text}.ant-popover-content{position:relative}.ant-popover:after{position:absolute;background:rgba(255,255,255,.01);content:""}.ant-popover-hidden{display:none}.ant-popover-placement-top,.ant-popover-placement-topLeft,.ant-popover-placement-topRight{padding-bottom:15.3137085px}.ant-popover-placement-right,.ant-popover-placement-rightTop,.ant-popover-placement-rightBottom{padding-left:15.3137085px}.ant-popover-placement-bottom,.ant-popover-placement-bottomLeft,.ant-popover-placement-bottomRight{padding-top:15.3137085px}.ant-popover-placement-left,.ant-popover-placement-leftTop,.ant-popover-placement-leftBottom{padding-right:15.3137085px}.ant-popover-inner{background-color:#fff;background-clip:padding-box;border-radius:4px;box-shadow:0 3px 6px -4px #0000001f,0 6px 16px #00000014,0 9px 28px 8px #0000000d}@media screen and (-ms-high-contrast: active),(-ms-high-contrast: none){.ant-popover-inner{box-shadow:0 3px 6px -4px #0000001f,0 6px 16px #00000014,0 9px 28px 8px #0000000d}}.ant-popover-title{min-width:177px;min-height:32px;margin:0;padding:5px 16px 4px;color:#000000d9;font-weight:500;border-bottom:1px solid #f0f0f0}.ant-popover-inner-content{padding:12px 16px;color:#000000d9}.ant-popover-message{position:relative;padding:4px 0 12px;color:#000000d9;font-size:14px}.ant-popover-message>.anticon{position:absolute;top:8.0005px;color:#ed7b2f;font-size:14px}.ant-popover-message-title{padding-left:22px}.ant-popover-buttons{margin-bottom:4px;text-align:right}.ant-popover-buttons button{margin-left:8px}.ant-popover-arrow{position:absolute;display:block;width:22px;height:22px;overflow:hidden;background:transparent;pointer-events:none}.ant-popover-arrow-content{--antd-arrow-background-color: #fff;position:absolute;top:0;right:0;bottom:0;left:0;display:block;width:11.3137085px;height:11.3137085px;margin:auto;content:"";pointer-events:auto;border-radius:0 0 4px;pointer-events:none}.ant-popover-arrow-content:before{position:absolute;top:-11.3137085px;left:-11.3137085px;width:33.9411255px;height:33.9411255px;background:var(--antd-arrow-background-color);background-repeat:no-repeat;background-position:-10px -10px;content:"";clip-path:inset(33% 33%);clip-path:path("M 9.849242404917499 24.091883092036785 A 5 5 0 0 1 13.384776310850237 22.627416997969522 L 18.627416997969522 22.627416997969522 A 4 4 0 0 0 22.627416997969522 18.627416997969522 L 22.627416997969522 13.384776310850237 A 5 5 0 0 1 24.091883092036785 9.849242404917499 L 23.091883092036785 9.849242404917499 L 9.849242404917499 23.091883092036785 Z")}.ant-popover-placement-top .ant-popover-arrow,.ant-popover-placement-topLeft .ant-popover-arrow,.ant-popover-placement-topRight .ant-popover-arrow{bottom:0;transform:translateY(100%)}.ant-popover-placement-top .ant-popover-arrow-content,.ant-popover-placement-topLeft .ant-popover-arrow-content,.ant-popover-placement-topRight .ant-popover-arrow-content{box-shadow:3px 3px 7px #00000012;transform:translateY(-11px) rotate(45deg)}.ant-popover-placement-top .ant-popover-arrow{left:50%;transform:translateY(100%) translate(-50%)}.ant-popover-placement-topLeft .ant-popover-arrow{left:16px}.ant-popover-placement-topRight .ant-popover-arrow{right:16px}.ant-popover-placement-right .ant-popover-arrow,.ant-popover-placement-rightTop .ant-popover-arrow,.ant-popover-placement-rightBottom .ant-popover-arrow{left:0;transform:translate(-100%)}.ant-popover-placement-right .ant-popover-arrow-content,.ant-popover-placement-rightTop .ant-popover-arrow-content,.ant-popover-placement-rightBottom .ant-popover-arrow-content{box-shadow:3px 3px 7px #00000012;transform:translate(11px) rotate(135deg)}.ant-popover-placement-right .ant-popover-arrow{top:50%;transform:translate(-100%) translateY(-50%)}.ant-popover-placement-rightTop .ant-popover-arrow{top:12px}.ant-popover-placement-rightBottom .ant-popover-arrow{bottom:12px}.ant-popover-placement-bottom .ant-popover-arrow,.ant-popover-placement-bottomLeft .ant-popover-arrow,.ant-popover-placement-bottomRight .ant-popover-arrow{top:0;transform:translateY(-100%)}.ant-popover-placement-bottom .ant-popover-arrow-content,.ant-popover-placement-bottomLeft .ant-popover-arrow-content,.ant-popover-placement-bottomRight .ant-popover-arrow-content{box-shadow:2px 2px 5px #0000000f;transform:translateY(11px) rotate(-135deg)}.ant-popover-placement-bottom .ant-popover-arrow{left:50%;transform:translateY(-100%) translate(-50%)}.ant-popover-placement-bottomLeft .ant-popover-arrow{left:16px}.ant-popover-placement-bottomRight .ant-popover-arrow{right:16px}.ant-popover-placement-left .ant-popover-arrow,.ant-popover-placement-leftTop .ant-popover-arrow,.ant-popover-placement-leftBottom .ant-popover-arrow{right:0;transform:translate(100%)}.ant-popover-placement-left .ant-popover-arrow-content,.ant-popover-placement-leftTop .ant-popover-arrow-content,.ant-popover-placement-leftBottom .ant-popover-arrow-content{box-shadow:3px 3px 7px #00000012;transform:translate(-11px) rotate(-45deg)}.ant-popover-placement-left .ant-popover-arrow{top:50%;transform:translate(100%) translateY(-50%)}.ant-popover-placement-leftTop .ant-popover-arrow{top:12px}.ant-popover-placement-leftBottom .ant-popover-arrow{bottom:12px}.ant-popover-pink .ant-popover-inner,.ant-popover-pink .ant-popover-arrow-content,.ant-popover-magenta .ant-popover-inner,.ant-popover-magenta .ant-popover-arrow-content{background-color:#eb2f96}.ant-popover-red .ant-popover-inner,.ant-popover-red .ant-popover-arrow-content{background-color:#e34d59}.ant-popover-volcano .ant-popover-inner,.ant-popover-volcano .ant-popover-arrow-content{background-color:#fa541c}.ant-popover-orange .ant-popover-inner,.ant-popover-orange .ant-popover-arrow-content{background-color:#d35a21}.ant-popover-yellow .ant-popover-inner,.ant-popover-yellow .ant-popover-arrow-content{background-color:#d29c00}.ant-popover-gold .ant-popover-inner,.ant-popover-gold .ant-popover-arrow-content{background-color:#f2995f}.ant-popover-cyan .ant-popover-inner,.ant-popover-cyan .ant-popover-arrow-content{background-color:#13c2c2}.ant-popover-lime .ant-popover-inner,.ant-popover-lime .ant-popover-arrow-content{background-color:#a0d911}.ant-popover-green .ant-popover-inner,.ant-popover-green .ant-popover-arrow-content{background-color:#00a870}.ant-popover-blue .ant-popover-inner,.ant-popover-blue .ant-popover-arrow-content{background-color:#0052d9}.ant-popover-geekblue .ant-popover-inner,.ant-popover-geekblue .ant-popover-arrow-content{background-color:#31adfb}.ant-popover-purple .ant-popover-inner,.ant-popover-purple .ant-popover-arrow-content{background-color:#ae78f0}.ant-popover-rtl{direction:rtl;text-align:right}.ant-popover-rtl .ant-popover-message-title{padding-right:22px;padding-left:16px}.ant-popover-rtl .ant-popover-buttons{text-align:left}.ant-popover-rtl .ant-popover-buttons button{margin-right:8px;margin-left:0}\n',document.head.appendChild(o),System.register(["./lib-legacy-76f34388.js","./index-legacy-5416c353.js","./index-legacy-c3961326.js"],(function(o){"use strict";var t,e,p,n,r;return{setters:[function(o){t=o.a,e=o._},function(o){p=o.C},function(o){n=o.T,r=o.c}],execute:function(){var a=o("g",(function(o){return o?"function"==typeof o?o():o:null})),l=globalThis&&globalThis.__rest||function(o,t){var e={};for(var p in o)Object.prototype.hasOwnProperty.call(o,p)&&t.indexOf(p)<0&&(e[p]=o[p]);if(null!=o&&"function"==typeof Object.getOwnPropertySymbols){var n=0;for(p=Object.getOwnPropertySymbols(o);n<p.length;n++)t.indexOf(p[n])<0&&Object.prototype.propertyIsEnumerable.call(o,p[n])&&(e[p[n]]=o[p[n]])}return e},c=t.exports.forwardRef((function(o,c){var v=o.prefixCls,i=o.title,m=o.content,s=o._overlay,g=l(o,["prefixCls","title","content","_overlay"]),d=t.exports.useContext(p).getPrefixCls,x=d("popover",v),f=d();return t.exports.createElement(n,e({},g,{prefixCls:x,ref:c,overlay:s||function(o){if(i||m)return t.exports.createElement(t.exports.Fragment,null,i&&t.exports.createElement("div",{className:"".concat(o,"-title")},a(i)),t.exports.createElement("div",{className:"".concat(o,"-inner-content")},a(m)))}(x),transitionName:r(f,"zoom-big",g.transitionName)}))}));c.defaultProps={placement:"top",trigger:"hover",mouseEnterDelay:.1,mouseLeaveDelay:.1,overlayStyle:{}};o("P",c)}}}))}();
