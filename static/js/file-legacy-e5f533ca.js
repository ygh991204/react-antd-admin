System.register(["./index-legacy-06339c3c.js"],(function(e){"use strict";var n,i,t;return{setters:[function(e){n=e.ae,i=e.aL,t=e.aM}],execute:function(){e({a:function(e){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return f({file:e,type:"image",notificationError:n})},b:function(e){for(var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",t=(n||i())+".png",r=e.split(","),a=r[0].match(/:(.*?);/),o=atob(r[1]),f=o.length,g=new Uint8Array(f);f--;)g[f]=o.charCodeAt(f);return new File([g],t,{type:a?a[1]:""})},f:function(e){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return a({file:e,type:"image",notificationError:n})}});var r=e("F",function(e){return e.image=".bmp,.jpg,.png,.tif,.gif,.svg,.psd,.webp,.jpeg",e.video=".avi,.mp4,.3gp,.mkv,.mpg,.mpeg,.rmvb,.wmv,.flv,.mov",e}(r||{}));function a(e){var i=e.file,a=e.type,o=void 0===a?"image":a,f=e.notificationError,g=void 0!==f&&f,u=r[o].split(","),c=0===t(i).filter((function(e){return-1===u.indexOf((i="",(n=e).name&&(i=n.name.substring(n.name.lastIndexOf("."))),i||n.type&&(i="."+n.type.substring(n.type.lastIndexOf("/")+1)),i));var n,i})).length;return g&&!c&&n.warning({message:o+"文件格式有误",description:"正确格式："+r[o]}),c}var o=function(e){return e[e.image=2]="image",e}(o||{});function f(e){var i=e.file,r=e.notificationError,a=void 0!==r&&r,f=e.type,g=void 0===f?"image":f,u=t(i),c=o[g],s=0===u.filter((function(e){return!!e.size&&e.size/1024/1024>c})).length;return a&&!s&&n.warning({message:g+"文件大小超出限制",description:"大小不应超过 "+o[g]+" 兆"}),s}}}}));