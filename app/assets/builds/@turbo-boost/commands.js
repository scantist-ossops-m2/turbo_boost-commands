var mt=Object.defineProperty,lt=Object.defineProperties;var ft=Object.getOwnPropertyDescriptors;var X=Object.getOwnPropertySymbols;var pt=Object.prototype.hasOwnProperty,bt=Object.prototype.propertyIsEnumerable;var G=(t,e,r)=>e in t?mt(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,a=(t,e)=>{for(var r in e||(e={}))pt.call(e,r)&&G(t,r,e[r]);if(X)for(var r of X(e))bt.call(e,r)&&G(t,r,e[r]);return t},p=(t,e)=>lt(t,ft(e));var gt="TurboBoost-Command",y={boost:"text/vnd.turbo-boost.html",stream:"text/vnd.turbo-stream.html",html:"text/html",xhtml:"application/xhtml+xml",json:"application/json"},ht=(t={})=>{t=a({},t);let e=(t.Accept||"").split(",").map(r=>r.trim()).filter(r=>r.length);return e.unshift(y.boost,y.stream,y.html,y.xhtml),t.Accept=[...new Set(e)].join(", "),t["Content-Type"]=y.json,t["X-Requested-With"]="XMLHttpRequest",t},vt=t=>{if(t){let[e,r,o]=t.split(", ");return{name:e,status:r,strategy:o}}return{}},f={prepare:ht,tokenize:vt,RESPONSE_HEADER:gt};var yt=t=>{document.body.insertAdjacentHTML("beforeend",t)},Et=t=>{var h,C,v,k;let r=new DOMParser().parseFromString(t,"text/html"),o=document.querySelector("head"),n=document.querySelector("body"),i=r.querySelector("head"),u=r.querySelector("body");o&&i&&((C=(h=TurboBoost==null?void 0:TurboBoost.Streams)==null?void 0:h.morph)==null||C.method(o,i)),n&&u&&((k=(v=TurboBoost==null?void 0:TurboBoost.Streams)==null?void 0:v.morph)==null||k.method(n,u))},w=(t,e)=>{if(t&&e){if(t.match(/^Append$/i))return yt(e);if(t.match(/^Replace$/i))return Et(e)}};var B={};addEventListener("turbo:before-fetch-response",t=>{let e=t.target.closest("turbo-frame");e!=null&&e.id&&(e!=null&&e.src)&&(B[e.id]=e.src);let{fetchResponse:r}=t.detail,o=r.header(f.RESPONSE_HEADER);if(!o)return;t.preventDefault();let{strategy:n}=f.tokenize(o);r.responseHTML.then(i=>w(n,i))});addEventListener("turbo:frame-load",t=>{let e=t.target.closest("turbo-frame");e.dataset.src=B[e.id]||e.src||e.dataset.src,delete B[e.id]});var At={frameAttribute:"data-turbo-frame",methodAttribute:"data-turbo-method",commandAttribute:"data-turbo-command",confirmAttribute:"data-turbo-confirm",stateAttributesAttribute:"data-turbo-boost-state-attributes"},d=a({},At);var s={start:"turbo-boost:command:start",success:"turbo-boost:command:success",finish:"turbo-boost:command:finish",abort:"turbo-boost:command:abort",clientError:"turbo-boost:command:client-error",serverError:"turbo-boost:command:server-error"},E={stateChange:"turbo-boost:state:change",stateInitialize:"turbo-boost:state:initialize"};function c(t,e,r={}){return new Promise(o=>{r=r||{},r.detail=r.detail||{},e=e||document;let n=new CustomEvent(t,p(a({},r),{bubbles:!0}));e.dispatchEvent(n),o(n)})}var L={};function St(t){L[t.id]=t}function xt(t){delete L[t]}var O={add:St,remove:xt,get commands(){return[...Object.values(L)]},get length(){return Object.keys(L).length}};var K={method:t=>Promise.resolve(confirm(t))},Ct=t=>t.detail.driver==="method",kt=t=>{if(t.detail.driver!=="form")return!1;let e=t.target,r=e.closest("turbo-frame"),o=e.closest(`[${d.frameAttribute}]`);return!!(r||o)},wt=t=>Ct(t)||kt(t);document.addEventListener(s.start,async t=>{let e=t.target.getAttribute(d.confirmAttribute);if(!e||(t.detail.confirmation=!0,wt(t)))return;await K.method(e)||t.preventDefault()});var Q=K;var l=[],I;function Lt(t,e){let r=l.find(o=>o.name===t);return r&&l.splice(l.indexOf(r),1),l=[{name:t,selectors:e},...l],document.removeEventListener(t,I,!0),document.addEventListener(t,I,!0),a({},l.find(o=>o.name===t))}function Ot(t){return l.find(e=>e.selectors.find(r=>Array.from(document.querySelectorAll(r)).find(o=>o===t)))}function Tt(t,e){let r=Ot(e);return r&&r.name===t}var m={register:Lt,isRegisteredForElement:Tt,get events(){return[...l]},set handler(t){I=t}};function Rt(t){return t.closest(`[${d.commandAttribute}]`)}function Pt(t){return t.closest("turbo-frame[src]")||t.closest("turbo-frame[data-turbo-frame-src]")||t.closest("turbo-frame")}function $t(t,e={}){if(t.tagName.toLowerCase()!=="select")return e.value=t.value||null;if(!t.multiple)return e.value=t.options[t.selectedIndex].value;e.values=Array.from(t.options).reduce((r,o)=>(o.selected&&r.push(o.value),r),[])}function _t(t){let e=Array.from(t.attributes).reduce((r,o)=>{let n=o.value;return r[o.name]=n,r},{});return e.tag=t.tagName,e.checked=!!t.checked,e.disabled=!!t.disabled,$t(t,e),delete e.class,delete e.action,delete e.href,delete e[d.commandAttribute],delete e[d.frameAttribute],e}var A={buildAttributePayload:_t,findClosestCommand:Rt,findClosestFrameWithSource:Pt};var Dt=(t,e={})=>{let r=t.querySelector('input[name="turbo_boost_command"]')||document.createElement("input");r.type="hidden",r.name="turbo_boost_command",r.value=JSON.stringify(e),t.contains(r)||t.appendChild(r)},Y={invokeCommand:Dt};function Nt(t){setTimeout(()=>c(s.finish,t.target,{detail:t.detail}))}var Bt=[s.abort,s.serverError,s.success];Bt.forEach(t=>addEventListener(t,Nt));addEventListener(s.finish,t=>O.remove(t.detail.id),!0);var Z={events:s};var It=t=>{let e=document.createElement("a");return e.href=t,new URL(e)},tt={get commandInvocationURL(){return It("/turbo-boost-command-invocation")}};var et=t=>{let e=`Unexpected error performing a TurboBoost Command! ${t.message}`;c(Z.events.clientError,document,{detail:{message:e,error:t}},!0)},qt=t=>{let{strategy:e}=f.tokenize(t.headers.get(f.RESPONSE_HEADER));t.text().then(r=>w(e,r))},T=(t={})=>{try{fetch(tt.commandInvocationURL.href,{method:"POST",headers:f.prepare({}),body:JSON.stringify(t)}).then(qt).catch(et)}catch(e){et(e)}};var jt=(t,e)=>T(e),q={invokeCommand:jt};var S,j,zt=()=>{S=null,j=null},Ft=(t,e={})=>{S=t,j=e},Mt=t=>{try{if(!S||t.getAttribute("method")!==S.dataset.turboMethod||t.getAttribute("action")!==S.href)return;let e=t.querySelector('input[name="turbo_boost_command"]')||document.createElement("input");e.type="hidden",e.name="turbo_boost_command",e.value=JSON.stringify(j),t.contains(e)||t.appendChild(e)}finally{zt()}};document.addEventListener("submit",t=>Mt(t.target),!0);var rt={invokeCommand:Ft};var Ht=(t,e={})=>T(e),ot={invokeCommand:Ht};function z(t,e){return e=e||{dataset:{}},t.href||e.src||e.dataset.src||location.href}function Jt(t){let e=A.findClosestFrameWithSource(t),{turboFrame:r,turboMethod:o}=t.dataset;return t.tagName.toLowerCase()==="form"?{name:"form",reason:"Element is a form.",frame:e,src:t.action,invokeCommand:Y.invokeCommand}:o&&o.length>0?{name:"method",reason:"Element defines data-turbo-method.",frame:e,src:t.href,invokeCommand:rt.invokeCommand}:r&&r!=="_self"?(e=document.getElementById(r),{name:"frame",reason:"element targets a frame that is not _self",frame:e,src:z(t,e),invokeCommand:q.invokeCommand}):(!r||r==="_self")&&e?{name:"frame",reason:"element does NOT target a frame or targets _self and is contained by a frame",frame:e,src:z(t,e),invokeCommand:q.invokeCommand}:{name:"window",reason:"element matches one or more of the following conditions (targets _top, does NOT target a frame, is NOT contained by a frame)",frame:null,src:z(t),invokeCommand:ot.invokeCommand}}var F={find:Jt};var P="unknown",nt=!1,R=[],b={debug:Object.values(s),info:Object.values(s),warn:[s.abort,s.clientError,s.serverError],error:[s.clientError,s.serverError],unknown:[]},Ut=t=>{if(!b[P].includes(t.type)||typeof console[P]!="function")return!1;let{detail:e}=t;if(!e.id)return!0;let r=`${t.type}-${e.id}`;return R.includes(r)?!1:(R.length>16&&R.shift(),R.push(r),!0)},Vt=t=>b.error.includes(t.type)?"error":b.warn.includes(t.type)?"warn":b.info.includes(t.type)?"info":b.debug.includes(t.type)?"debug":"log",Wt=t=>{if(Ut(t)){let{target:e,type:r,detail:o}=t,n=o.id||"",i=o.name||"",u="";o.startedAt&&(u=`${Date.now()-o.startedAt}ms `);let h=r.split(":"),C=h.pop(),v=`%c${h.join(":")}:%c${C}`,k=[`%c${i}`,`%c${u}`,v];console[Vt(t)](k.join(" ").replace(/\s{2,}/g," "),"color:deepskyblue","color:lime","color:darkgray",v.match(/abort|error/i)?"color:red":"color:deepskyblue",{id:n,detail:o,target:e})}};nt||(nt=!0,Object.values(s).forEach(t=>addEventListener(t,e=>Wt(e))));var at={get level(){return P},set level(t){return Object.keys(b).includes(t)||(t="unknown"),P=t}};var M;function $(t,e=null){if(!t||typeof t!="object")return t;let r=new Proxy(t,{deleteProperty(o,n){return delete o[n],c(E.stateChange,document,{detail:{state:M}}),!0},set(o,n,i,u){return o[n]=$(i,this),c(E.stateChange,document,{detail:{state:M}}),!0}});if(Array.isArray(t))t.forEach((o,n)=>t[n]=$(o,r));else if(typeof t=="object")for(let[o,n]of Object.entries(t))t[o]=$(n,r);return e||(M=r),r}var H=$;var st=(t,e,r,o=1)=>{if(o>20)return;let n=document.getElementById(t);if(n!=null&&n.isConnected)return n.setAttribute(e,r);setTimeout(()=>st(t,e,r,o+1),o*5)},Xt=()=>Array.from(document.querySelectorAll(`[id][${d.stateAttributesAttribute}]`)).reduce((e,r)=>{let o=JSON.parse(r.getAttribute(d.stateAttributesAttribute));return r.id&&(e[r.id]=o.reduce((n,i)=>(r.hasAttribute(i)&&(n[i]=r.getAttribute(i)||i),n),{})),e},{}),Gt=(t={})=>{for(let[e,r]of Object.entries(t))for(let[o,n]of Object.entries(r))st(e,o,n)},_={buildState:Xt,restoreState:Gt};function Kt(t,e){return typeof e!="object"&&(e={}),localStorage.setItem(String(t),JSON.stringify(e))}function Qt(t){let e=localStorage.getItem(String(t));return e?JSON.parse(e):{}}var D={save:Kt,find:Qt};var J="TurboBoost::State",U={pages:{},signed:null,unsigned:{}},N=null,x={},V=()=>{let t=a(a({},U),D.find(J));N=t.signed,x=H(t.unsigned),t.pages[location.pathname]=t.pages[location.pathname]||{},_.restoreState(t.pages[location.pathname])},W=()=>{let t=a(a({},U),D.find(J)),e={signed:N||t.signed,unsigned:a(a({},t.unsigned),x),pages:a({},t.pages)};e.pages[location.pathname]=a(a({},e.pages[location.pathname]),_.buildState()),D.save(J,e)},Yt=t=>{let e=a(a({},U),JSON.parse(t));N=e.signed,x=H(e.unsigned),W(),c(E.stateInitialize,document,{detail:x})};addEventListener("DOMContentLoaded",V);addEventListener("turbo:morph",V);addEventListener("turbo:render",V);addEventListener("turbo:before-fetch-request",W);addEventListener("beforeunload",W);var g={initialize:Yt,buildPageState:_.buildState,get signed(){return N},get unsigned(){return x}};function Zt(){return("10000000-1000-4000-8000"+-1e11).replace(/[018]/g,t=>(t^crypto.getRandomValues(new Uint8Array(1))[0]&15>>t/4).toString(16))}var it={v4:Zt};var dt="0.2.2";var te=self.TurboBoost||{},ut={VERSION:dt,active:!1,confirmation:Q,logger:at,schema:d,events:s,registerEventDelegate:m.register,get eventDelegates(){return m.events}};function ct(t,e){return{id:t,name:e.getAttribute(d.commandAttribute),elementId:e.id.length>0?e.id:null,elementAttributes:A.buildAttributePayload(e),startedAt:Date.now(),state:{page:g.buildPageState(),signed:g.signed,unsigned:g.unsigned}}}async function ee(t){let e,r={};try{if(e=A.findClosestCommand(t.target),!e||!m.isRegisteredForElement(t.type,e))return;let o=it.v4(),n=F.find(e),i=p(a({},ct(o,e)),{driver:n.name,frameId:n.frame?n.frame.id:null,src:n.src}),u=await c(s.start,e,{cancelable:!0,detail:i});if(u.defaultPrevented||u.detail.confirmation&&t.defaultPrevented)return c(s.abort,e,{detail:{message:`An event handler for '${s.start}' prevented default behavior and blocked command invocation!`,source:u}});switch(n=F.find(e),i=p(a({},ct(o,e)),{driver:n.name,frameId:n.frame?n.frame.id:null,src:n.src}),O.add(i),["frame","window"].includes(n.name)&&t.preventDefault(),n.name){case"method":return n.invokeCommand(e,i);case"form":return n.invokeCommand(e,i,t);case"frame":return n.invokeCommand(n.frame,i);case"window":return n.invokeCommand(self,i)}}catch(o){c(s.clientError,e,{detail:p(a({},r),{error:o})})}}self.TurboBoost=a({},te);self.TurboBoost.Commands||(m.handler=ee,m.register("click",[`[${d.commandAttribute}]`]),m.register("submit",[`form[${d.commandAttribute}]`]),m.register("toggle",[`details[${d.commandAttribute}]`]),m.register("change",[`input[${d.commandAttribute}]`,`select[${d.commandAttribute}]`,`textarea[${d.commandAttribute}]`]),self.TurboBoost.Commands=ut,self.TurboBoost.State={initialize:g.initialize,get current(){return g.unsigned}});var gr=ut;export{gr as default};
//# sourceMappingURL=commands.js.map
