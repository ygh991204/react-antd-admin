System.register(["./index-legacy-5416c353.js","./lib-legacy-76f34388.js"],(function(e){"use strict";var t,i;return{setters:[function(e){t=e._},function(e){i=e._}],execute:function(){e("r",["xxl","xl","lg","md","sm","xs"]);var n={xs:"(max-width: 575px)",sm:"(min-width: 576px)",md:"(min-width: 768px)",lg:"(min-width: 992px)",xl:"(min-width: 1200px)",xxl:"(min-width: 1600px)"},r=new Map,s=-1,c={};e("R",{matchHandlers:{},dispatch:function(e){return c=e,r.forEach((function(e){return e(c)})),r.size>=1},subscribe:function(e){return r.size||this.register(),s+=1,r.set(s,e),e(c),s},unsubscribe:function(e){r.delete(e),r.size||this.unregister()},unregister:function(){var e=this;Object.keys(n).forEach((function(t){var i=n[t],r=e.matchHandlers[i];null==r||r.mql.removeListener(null==r?void 0:r.listener)})),r.clear()},register:function(){var e=this;Object.keys(n).forEach((function(r){var s=n[r],a=function(n){var s=n.matches;e.dispatch(i(i({},c),t({},r,s)))},u=window.matchMedia(s);u.addListener(a),e.matchHandlers[s]={mql:u,listener:a},a(u)}))}})}}}));
