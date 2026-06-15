var Ec={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eh=function(r){const e=[];let t=0;for(let n=0;n<r.length;n++){let i=r.charCodeAt(n);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&n+1<r.length&&(r.charCodeAt(n+1)&64512)===56320?(i=65536+((i&1023)<<10)+(r.charCodeAt(++n)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},Nm=function(r){const e=[];let t=0,n=0;for(;t<r.length;){const i=r[t++];if(i<128)e[n++]=String.fromCharCode(i);else if(i>191&&i<224){const s=r[t++];e[n++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=r[t++],o=r[t++],u=r[t++],c=((i&7)<<18|(s&63)<<12|(o&63)<<6|u&63)-65536;e[n++]=String.fromCharCode(55296+(c>>10)),e[n++]=String.fromCharCode(56320+(c&1023))}else{const s=r[t++],o=r[t++];e[n++]=String.fromCharCode((i&15)<<12|(s&63)<<6|o&63)}}return e.join("")},th={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(r,e){if(!Array.isArray(r))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,n=[];for(let i=0;i<r.length;i+=3){const s=r[i],o=i+1<r.length,u=o?r[i+1]:0,c=i+2<r.length,h=c?r[i+2]:0,f=s>>2,p=(s&3)<<4|u>>4;let _=(u&15)<<2|h>>6,R=h&63;c||(R=64,o||(_=64)),n.push(t[f],t[p],t[_],t[R])}return n.join("")},encodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(r):this.encodeByteArray(eh(r),e)},decodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(r):Nm(this.decodeStringToByteArray(r,e))},decodeStringToByteArray(r,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,n=[];for(let i=0;i<r.length;){const s=t[r.charAt(i++)],u=i<r.length?t[r.charAt(i)]:0;++i;const h=i<r.length?t[r.charAt(i)]:64;++i;const p=i<r.length?t[r.charAt(i)]:64;if(++i,s==null||u==null||h==null||p==null)throw new Om;const _=s<<2|u>>4;if(n.push(_),h!==64){const R=u<<4&240|h>>2;if(n.push(R),p!==64){const V=h<<6&192|p;n.push(V)}}}return n},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let r=0;r<this.ENCODED_VALS.length;r++)this.byteToCharMap_[r]=this.ENCODED_VALS.charAt(r),this.charToByteMap_[this.byteToCharMap_[r]]=r,this.byteToCharMapWebSafe_[r]=this.ENCODED_VALS_WEBSAFE.charAt(r),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[r]]=r,r>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(r)]=r,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(r)]=r)}}};class Om extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Mm=function(r){const e=eh(r);return th.encodeByteArray(e,!0)},ds=function(r){return Mm(r).replace(/\./g,"")},nh=function(r){try{return th.decodeString(r,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lm(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fm=()=>Lm().__FIREBASE_DEFAULTS__,Um=()=>{if(typeof process>"u"||typeof Ec>"u")return;const r=Ec.__FIREBASE_DEFAULTS__;if(r)return JSON.parse(r)},Bm=()=>{if(typeof document>"u")return;let r;try{r=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=r&&nh(r[1]);return e&&JSON.parse(e)},Ds=()=>{try{return Fm()||Um()||Bm()}catch(r){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${r}`);return}},qm=r=>{var e,t;return(t=(e=Ds())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[r]},jm=r=>{const e=qm(r);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const n=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),n]:[e.substring(0,t),n]},rh=()=>{var r;return(r=Ds())===null||r===void 0?void 0:r.config},zm=r=>{var e;return(e=Ds())===null||e===void 0?void 0:e[`_${r}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gm{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,n))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $m(r,e){if(r.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},n=e||"demo-project",i=r.iat||0,s=r.sub||r.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${n}`,aud:n,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}}},r);return[ds(JSON.stringify(t)),ds(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qe(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Km(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(qe())}function Qm(){var r;const e=(r=Ds())===null||r===void 0?void 0:r.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Wm(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Hm(){const r=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof r=="object"&&r.id!==void 0}function Jm(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function ih(){return!Qm()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function sh(){try{return typeof indexedDB=="object"}catch{return!1}}function Ym(){return new Promise((r,e)=>{try{let t=!0;const n="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(n);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(n),r(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var s;e(((s=i.error)===null||s===void 0?void 0:s.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xm="FirebaseError";class at extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name=Xm,Object.setPrototypeOf(this,at.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,di.prototype.create)}}class di{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){const n=t[0]||{},i=`${this.service}/${e}`,s=this.errors[e],o=s?Zm(s,n):"Error",u=`${this.serviceName}: ${o} (${i}).`;return new at(i,u,n)}}function Zm(r,e){return r.replace(ep,(t,n)=>{const i=e[n];return i!=null?String(i):`<${n}?>`})}const ep=/\{\$([^}]+)}/g;function ln(r,e){if(r===e)return!0;const t=Object.keys(r),n=Object.keys(e);for(const i of t){if(!n.includes(i))return!1;const s=r[i],o=e[i];if(wc(s)&&wc(o)){if(!ln(s,o))return!1}else if(s!==o)return!1}for(const i of n)if(!t.includes(i))return!1;return!0}function wc(r){return r!==null&&typeof r=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function da(r){const e=[];for(const[t,n]of Object.entries(r))Array.isArray(n)?n.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(n));return e.length?"&"+e.join("&"):""}function tp(r,e){const t=new np(r,e);return t.subscribe.bind(t)}class np{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(n=>{this.error(n)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,n){let i;if(e===void 0&&t===void 0&&n===void 0)throw new Error("Missing Observer.");rp(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:n},i.next===void 0&&(i.next=So),i.error===void 0&&(i.error=So),i.complete===void 0&&(i.complete=So);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(n){typeof console<"u"&&console.error&&console.error(n)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function rp(r,e){if(typeof r!="object"||r===null)return!1;for(const t of e)if(t in r&&typeof r[t]=="function")return!0;return!1}function So(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function de(r){return r&&r._delegate?r._delegate:r}class hn{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zt="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ip{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const n=new Gm;if(this.instancesDeferred.set(t,n),this.isInitialized(t)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:t});i&&n.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const n=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(op(e))try{this.getOrInitializeService({instanceIdentifier:Zt})}catch{}for(const[t,n]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(t);try{const s=this.getOrInitializeService({instanceIdentifier:i});n.resolve(s)}catch{}}}}clearInstance(e=Zt){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Zt){return this.instances.has(e)}getOptions(e=Zt){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:n,options:t});for(const[s,o]of this.instancesDeferred.entries()){const u=this.normalizeInstanceIdentifier(s);n===u&&o.resolve(i)}return i}onInit(e,t){var n;const i=this.normalizeInstanceIdentifier(t),s=(n=this.onInitCallbacks.get(i))!==null&&n!==void 0?n:new Set;s.add(e),this.onInitCallbacks.set(i,s);const o=this.instances.get(i);return o&&e(o,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const n=this.onInitCallbacks.get(t);if(n)for(const i of n)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:sp(e),options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch{}return n||null}normalizeInstanceIdentifier(e=Zt){return this.component?this.component.multipleInstances?e:Zt:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function sp(r){return r===Zt?void 0:r}function op(r){return r.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ap{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new ip(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var H;(function(r){r[r.DEBUG=0]="DEBUG",r[r.VERBOSE=1]="VERBOSE",r[r.INFO=2]="INFO",r[r.WARN=3]="WARN",r[r.ERROR=4]="ERROR",r[r.SILENT=5]="SILENT"})(H||(H={}));const up={debug:H.DEBUG,verbose:H.VERBOSE,info:H.INFO,warn:H.WARN,error:H.ERROR,silent:H.SILENT},cp=H.INFO,lp={[H.DEBUG]:"log",[H.VERBOSE]:"log",[H.INFO]:"info",[H.WARN]:"warn",[H.ERROR]:"error"},hp=(r,e,...t)=>{if(e<r.logLevel)return;const n=new Date().toISOString(),i=lp[e];if(i)console[i](`[${n}]  ${r.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class fa{constructor(e){this.name=e,this._logLevel=cp,this._logHandler=hp,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in H))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?up[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,H.DEBUG,...e),this._logHandler(this,H.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,H.VERBOSE,...e),this._logHandler(this,H.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,H.INFO,...e),this._logHandler(this,H.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,H.WARN,...e),this._logHandler(this,H.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,H.ERROR,...e),this._logHandler(this,H.ERROR,...e)}}const dp=(r,e)=>e.some(t=>r instanceof t);let Ac,Rc;function fp(){return Ac||(Ac=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function mp(){return Rc||(Rc=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const oh=new WeakMap,Bo=new WeakMap,ah=new WeakMap,Po=new WeakMap,ma=new WeakMap;function pp(r){const e=new Promise((t,n)=>{const i=()=>{r.removeEventListener("success",s),r.removeEventListener("error",o)},s=()=>{t(Ct(r.result)),i()},o=()=>{n(r.error),i()};r.addEventListener("success",s),r.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&oh.set(t,r)}).catch(()=>{}),ma.set(e,r),e}function gp(r){if(Bo.has(r))return;const e=new Promise((t,n)=>{const i=()=>{r.removeEventListener("complete",s),r.removeEventListener("error",o),r.removeEventListener("abort",o)},s=()=>{t(),i()},o=()=>{n(r.error||new DOMException("AbortError","AbortError")),i()};r.addEventListener("complete",s),r.addEventListener("error",o),r.addEventListener("abort",o)});Bo.set(r,e)}let qo={get(r,e,t){if(r instanceof IDBTransaction){if(e==="done")return Bo.get(r);if(e==="objectStoreNames")return r.objectStoreNames||ah.get(r);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Ct(r[e])},set(r,e,t){return r[e]=t,!0},has(r,e){return r instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in r}};function _p(r){qo=r(qo)}function yp(r){return r===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const n=r.call(Co(this),e,...t);return ah.set(n,e.sort?e.sort():[e]),Ct(n)}:mp().includes(r)?function(...e){return r.apply(Co(this),e),Ct(oh.get(this))}:function(...e){return Ct(r.apply(Co(this),e))}}function Ip(r){return typeof r=="function"?yp(r):(r instanceof IDBTransaction&&gp(r),dp(r,fp())?new Proxy(r,qo):r)}function Ct(r){if(r instanceof IDBRequest)return pp(r);if(Po.has(r))return Po.get(r);const e=Ip(r);return e!==r&&(Po.set(r,e),ma.set(e,r)),e}const Co=r=>ma.get(r);function Tp(r,e,{blocked:t,upgrade:n,blocking:i,terminated:s}={}){const o=indexedDB.open(r,e),u=Ct(o);return n&&o.addEventListener("upgradeneeded",c=>{n(Ct(o.result),c.oldVersion,c.newVersion,Ct(o.transaction),c)}),t&&o.addEventListener("blocked",c=>t(c.oldVersion,c.newVersion,c)),u.then(c=>{s&&c.addEventListener("close",()=>s()),i&&c.addEventListener("versionchange",h=>i(h.oldVersion,h.newVersion,h))}).catch(()=>{}),u}const vp=["get","getKey","getAll","getAllKeys","count"],Ep=["put","add","delete","clear"],Vo=new Map;function bc(r,e){if(!(r instanceof IDBDatabase&&!(e in r)&&typeof e=="string"))return;if(Vo.get(e))return Vo.get(e);const t=e.replace(/FromIndex$/,""),n=e!==t,i=Ep.includes(t);if(!(t in(n?IDBIndex:IDBObjectStore).prototype)||!(i||vp.includes(t)))return;const s=async function(o,...u){const c=this.transaction(o,i?"readwrite":"readonly");let h=c.store;return n&&(h=h.index(u.shift())),(await Promise.all([h[t](...u),i&&c.done]))[0]};return Vo.set(e,s),s}_p(r=>({...r,get:(e,t,n)=>bc(e,t)||r.get(e,t,n),has:(e,t)=>!!bc(e,t)||r.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wp{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Ap(t)){const n=t.getImmediate();return`${n.library}/${n.version}`}else return null}).filter(t=>t).join(" ")}}function Ap(r){const e=r.getComponent();return(e==null?void 0:e.type)==="VERSION"}const jo="@firebase/app",Sc="0.10.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const it=new fa("@firebase/app"),Rp="@firebase/app-compat",bp="@firebase/analytics-compat",Sp="@firebase/analytics",Pp="@firebase/app-check-compat",Cp="@firebase/app-check",Vp="@firebase/auth",Dp="@firebase/auth-compat",kp="@firebase/database",xp="@firebase/data-connect",Np="@firebase/database-compat",Op="@firebase/functions",Mp="@firebase/functions-compat",Lp="@firebase/installations",Fp="@firebase/installations-compat",Up="@firebase/messaging",Bp="@firebase/messaging-compat",qp="@firebase/performance",jp="@firebase/performance-compat",zp="@firebase/remote-config",Gp="@firebase/remote-config-compat",$p="@firebase/storage",Kp="@firebase/storage-compat",Qp="@firebase/firestore",Wp="@firebase/vertexai-preview",Hp="@firebase/firestore-compat",Jp="firebase",Yp="10.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fs="[DEFAULT]",Xp={[jo]:"fire-core",[Rp]:"fire-core-compat",[Sp]:"fire-analytics",[bp]:"fire-analytics-compat",[Cp]:"fire-app-check",[Pp]:"fire-app-check-compat",[Vp]:"fire-auth",[Dp]:"fire-auth-compat",[kp]:"fire-rtdb",[xp]:"fire-data-connect",[Np]:"fire-rtdb-compat",[Op]:"fire-fn",[Mp]:"fire-fn-compat",[Lp]:"fire-iid",[Fp]:"fire-iid-compat",[Up]:"fire-fcm",[Bp]:"fire-fcm-compat",[qp]:"fire-perf",[jp]:"fire-perf-compat",[zp]:"fire-rc",[Gp]:"fire-rc-compat",[$p]:"fire-gcs",[Kp]:"fire-gcs-compat",[Qp]:"fire-fst",[Hp]:"fire-fst-compat",[Wp]:"fire-vertex","fire-js":"fire-js",[Jp]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ms=new Map,Zp=new Map,zo=new Map;function Pc(r,e){try{r.container.addComponent(e)}catch(t){it.debug(`Component ${e.name} failed to register with FirebaseApp ${r.name}`,t)}}function Kn(r){const e=r.name;if(zo.has(e))return it.debug(`There were multiple attempts to register component ${e}.`),!1;zo.set(e,r);for(const t of ms.values())Pc(t,r);for(const t of Zp.values())Pc(t,r);return!0}function pa(r,e){const t=r.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),r.container.getProvider(e)}function eg(r,e,t=fs){pa(r,e).clearInstance(t)}function bt(r){return r.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tg={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Vt=new di("app","Firebase",tg);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ng{constructor(e,t,n){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new hn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Vt.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ks=Yp;function rg(r,e={}){let t=r;typeof e!="object"&&(e={name:e});const n=Object.assign({name:fs,automaticDataCollectionEnabled:!1},e),i=n.name;if(typeof i!="string"||!i)throw Vt.create("bad-app-name",{appName:String(i)});if(t||(t=rh()),!t)throw Vt.create("no-options");const s=ms.get(i);if(s){if(ln(t,s.options)&&ln(n,s.config))return s;throw Vt.create("duplicate-app",{appName:i})}const o=new ap(i);for(const c of zo.values())o.addComponent(c);const u=new ng(t,n,o);return ms.set(i,u),u}function ig(r=fs){const e=ms.get(r);if(!e&&r===fs&&rh())return rg();if(!e)throw Vt.create("no-app",{appName:r});return e}function Dt(r,e,t){var n;let i=(n=Xp[r])!==null&&n!==void 0?n:r;t&&(i+=`-${t}`);const s=i.match(/\s|\//),o=e.match(/\s|\//);if(s||o){const u=[`Unable to register library "${i}" with version "${e}":`];s&&u.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&o&&u.push("and"),o&&u.push(`version name "${e}" contains illegal characters (whitespace or "/")`),it.warn(u.join(" "));return}Kn(new hn(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sg="firebase-heartbeat-database",og=1,ei="firebase-heartbeat-store";let Do=null;function uh(){return Do||(Do=Tp(sg,og,{upgrade:(r,e)=>{switch(e){case 0:try{r.createObjectStore(ei)}catch(t){console.warn(t)}}}}).catch(r=>{throw Vt.create("idb-open",{originalErrorMessage:r.message})})),Do}async function ag(r){try{const t=(await uh()).transaction(ei),n=await t.objectStore(ei).get(ch(r));return await t.done,n}catch(e){if(e instanceof at)it.warn(e.message);else{const t=Vt.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});it.warn(t.message)}}}async function Cc(r,e){try{const n=(await uh()).transaction(ei,"readwrite");await n.objectStore(ei).put(e,ch(r)),await n.done}catch(t){if(t instanceof at)it.warn(t.message);else{const n=Vt.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});it.warn(n.message)}}}function ch(r){return`${r.name}!${r.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ug=1024,cg=30*24*60*60*1e3;class lg{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new dg(t),this._heartbeatsCachePromise=this._storage.read().then(n=>(this._heartbeatsCache=n,n))}async triggerHeartbeat(){var e,t;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=Vc();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(o=>o.date===s)?void 0:(this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const u=new Date(o.date).valueOf();return Date.now()-u<=cg}),this._storage.overwrite(this._heartbeatsCache))}catch(n){it.warn(n)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Vc(),{heartbeatsToSend:n,unsentEntries:i}=hg(this._heartbeatsCache.heartbeats),s=ds(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(t){return it.warn(t),""}}}function Vc(){return new Date().toISOString().substring(0,10)}function hg(r,e=ug){const t=[];let n=r.slice();for(const i of r){const s=t.find(o=>o.agent===i.agent);if(s){if(s.dates.push(i.date),Dc(t)>e){s.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),Dc(t)>e){t.pop();break}n=n.slice(1)}return{heartbeatsToSend:t,unsentEntries:n}}class dg{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return sh()?Ym().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await ag(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return Cc(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return Cc(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function Dc(r){return ds(JSON.stringify({version:2,heartbeats:r})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fg(r){Kn(new hn("platform-logger",e=>new wp(e),"PRIVATE")),Kn(new hn("heartbeat",e=>new lg(e),"PRIVATE")),Dt(jo,Sc,r),Dt(jo,Sc,"esm2017"),Dt("fire-js","")}fg("");function ga(r,e){var t={};for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&e.indexOf(n)<0&&(t[n]=r[n]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,n=Object.getOwnPropertySymbols(r);i<n.length;i++)e.indexOf(n[i])<0&&Object.prototype.propertyIsEnumerable.call(r,n[i])&&(t[n[i]]=r[n[i]]);return t}function lh(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const mg=lh,hh=new di("auth","Firebase",lh());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ps=new fa("@firebase/auth");function pg(r,...e){ps.logLevel<=H.WARN&&ps.warn(`Auth (${ks}): ${r}`,...e)}function rs(r,...e){ps.logLevel<=H.ERROR&&ps.error(`Auth (${ks}): ${r}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dn(r,...e){throw ya(r,...e)}function Un(r,...e){return ya(r,...e)}function _a(r,e,t){const n=Object.assign(Object.assign({},mg()),{[e]:t});return new di("auth","Firebase",n).create(e,{appName:r.name})}function Bn(r){return _a(r,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function gg(r,e,t){const n=t;if(!(e instanceof n))throw n.name!==e.constructor.name&&dn(r,"argument-error"),_a(r,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function ya(r,...e){if(typeof r!="string"){const t=e[0],n=[...e.slice(1)];return n[0]&&(n[0].appName=r.name),r._errorFactory.create(t,...n)}return hh.create(r,...e)}function Q(r,e,...t){if(!r)throw ya(e,...t)}function tt(r){const e="INTERNAL ASSERTION FAILED: "+r;throw rs(e),new Error(e)}function fn(r,e){r||tt(e)}function _g(){return kc()==="http:"||kc()==="https:"}function kc(){var r;return typeof self<"u"&&((r=self.location)===null||r===void 0?void 0:r.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yg(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(_g()||Hm()||"connection"in navigator)?navigator.onLine:!0}function Ig(){if(typeof navigator>"u")return null;const r=navigator;return r.languages&&r.languages[0]||r.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fi{constructor(e,t){this.shortDelay=e,this.longDelay=t,fn(t>e,"Short delay should be less than long delay!"),this.isMobile=Km()||Jm()}get(){return yg()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tg(r,e){fn(r.emulator,"Emulator should always be set here");const{url:t}=r.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dh{static initialize(e,t,n){this.fetchImpl=e,t&&(this.headersImpl=t),n&&(this.responseImpl=n)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;tt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;tt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;tt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vg={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Eg=new fi(3e4,6e4);function Ia(r,e){return r.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:r.tenantId}):e}async function mi(r,e,t,n,i={}){return fh(r,i,async()=>{let s={},o={};n&&(e==="GET"?o=n:s={body:JSON.stringify(n)});const u=da(Object.assign({key:r.config.apiKey},o)).slice(1),c=await r._getAdditionalHeaders();c["Content-Type"]="application/json",r.languageCode&&(c["X-Firebase-Locale"]=r.languageCode);const h=Object.assign({method:e,headers:c},s);return Wm()||(h.referrerPolicy="no-referrer"),dh.fetch()(mh(r,r.config.apiHost,t,u),h)})}async function fh(r,e,t){r._canInitEmulator=!1;const n=Object.assign(Object.assign({},vg),e);try{const i=new Ag(r),s=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();const o=await s.json();if("needConfirmation"in o)throw Hi(r,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{const u=s.ok?o.errorMessage:o.error.message,[c,h]=u.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw Hi(r,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw Hi(r,"email-already-in-use",o);if(c==="USER_DISABLED")throw Hi(r,"user-disabled",o);const f=n[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw _a(r,f,h);dn(r,f)}}catch(i){if(i instanceof at)throw i;dn(r,"network-request-failed",{message:String(i)})}}async function wg(r,e,t,n,i={}){const s=await mi(r,e,t,n,i);return"mfaPendingCredential"in s&&dn(r,"multi-factor-auth-required",{_serverResponse:s}),s}function mh(r,e,t,n){const i=`${e}${t}?${n}`;return r.config.emulator?Tg(r.config,i):`${r.config.apiScheme}://${i}`}class Ag{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,n)=>{this.timer=setTimeout(()=>n(Un(this.auth,"network-request-failed")),Eg.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function Hi(r,e,t){const n={appName:r.name};t.email&&(n.email=t.email),t.phoneNumber&&(n.phoneNumber=t.phoneNumber);const i=Un(r,e,n);return i.customData._tokenResponse=t,i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Rg(r,e){return mi(r,"POST","/v1/accounts:delete",e)}async function ph(r,e){return mi(r,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qr(r){if(r)try{const e=new Date(Number(r));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function bg(r,e=!1){const t=de(r),n=await t.getIdToken(e),i=Ta(n);Q(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,o=s==null?void 0:s.sign_in_provider;return{claims:i,token:n,authTime:Qr(ko(i.auth_time)),issuedAtTime:Qr(ko(i.iat)),expirationTime:Qr(ko(i.exp)),signInProvider:o||null,signInSecondFactor:(s==null?void 0:s.sign_in_second_factor)||null}}function ko(r){return Number(r)*1e3}function Ta(r){const[e,t,n]=r.split(".");if(e===void 0||t===void 0||n===void 0)return rs("JWT malformed, contained fewer than 3 sections"),null;try{const i=nh(t);return i?JSON.parse(i):(rs("Failed to decode base64 JWT payload"),null)}catch(i){return rs("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function xc(r){const e=Ta(r);return Q(e,"internal-error"),Q(typeof e.exp<"u","internal-error"),Q(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ti(r,e,t=!1){if(t)return e;try{return await e}catch(n){throw n instanceof at&&Sg(n)&&r.auth.currentUser===r&&await r.auth.signOut(),n}}function Sg({code:r}){return r==="auth/user-disabled"||r==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pg{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const n=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),n}else{this.errorBackoff=3e4;const i=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Go{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Qr(this.lastLoginAt),this.creationTime=Qr(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function gs(r){var e;const t=r.auth,n=await r.getIdToken(),i=await ti(r,ph(t,{idToken:n}));Q(i==null?void 0:i.users.length,t,"internal-error");const s=i.users[0];r._notifyReloadListener(s);const o=!((e=s.providerUserInfo)===null||e===void 0)&&e.length?gh(s.providerUserInfo):[],u=Vg(r.providerData,o),c=r.isAnonymous,h=!(r.email&&s.passwordHash)&&!(u!=null&&u.length),f=c?h:!1,p={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:u,metadata:new Go(s.createdAt,s.lastLoginAt),isAnonymous:f};Object.assign(r,p)}async function Cg(r){const e=de(r);await gs(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Vg(r,e){return[...r.filter(n=>!e.some(i=>i.providerId===n.providerId)),...e]}function gh(r){return r.map(e=>{var{providerId:t}=e,n=ga(e,["providerId"]);return{providerId:t,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Dg(r,e){const t=await fh(r,{},async()=>{const n=da({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=r.config,o=mh(r,i,"/v1/token",`key=${s}`),u=await r._getAdditionalHeaders();return u["Content-Type"]="application/x-www-form-urlencoded",dh.fetch()(o,{method:"POST",headers:u,body:n})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function kg(r,e){return mi(r,"POST","/v2/accounts:revokeToken",Ia(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){Q(e.idToken,"internal-error"),Q(typeof e.idToken<"u","internal-error"),Q(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):xc(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){Q(e.length!==0,"internal-error");const t=xc(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(Q(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:n,refreshToken:i,expiresIn:s}=await Dg(e,t);this.updateTokensAndExpiration(n,i,Number(s))}updateTokensAndExpiration(e,t,n){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+n*1e3}static fromJSON(e,t){const{refreshToken:n,accessToken:i,expirationTime:s}=t,o=new qn;return n&&(Q(typeof n=="string","internal-error",{appName:e}),o.refreshToken=n),i&&(Q(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),s&&(Q(typeof s=="number","internal-error",{appName:e}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new qn,this.toJSON())}_performRefresh(){return tt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gt(r,e){Q(typeof r=="string"||typeof r>"u","internal-error",{appName:e})}class nt{constructor(e){var{uid:t,auth:n,stsTokenManager:i}=e,s=ga(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new Pg(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=n,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Go(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await ti(this,this.stsTokenManager.getToken(this.auth,e));return Q(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return bg(this,e)}reload(){return Cg(this)}_assign(e){this!==e&&(Q(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new nt(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){Q(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let n=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),n=!0),t&&await gs(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(bt(this.auth.app))return Promise.reject(Bn(this.auth));const e=await this.getIdToken();return await ti(this,Rg(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var n,i,s,o,u,c,h,f;const p=(n=t.displayName)!==null&&n!==void 0?n:void 0,_=(i=t.email)!==null&&i!==void 0?i:void 0,R=(s=t.phoneNumber)!==null&&s!==void 0?s:void 0,V=(o=t.photoURL)!==null&&o!==void 0?o:void 0,x=(u=t.tenantId)!==null&&u!==void 0?u:void 0,C=(c=t._redirectEventId)!==null&&c!==void 0?c:void 0,B=(h=t.createdAt)!==null&&h!==void 0?h:void 0,j=(f=t.lastLoginAt)!==null&&f!==void 0?f:void 0,{uid:F,emailVerified:K,isAnonymous:Z,providerData:G,stsTokenManager:T}=t;Q(F&&T,e,"internal-error");const g=qn.fromJSON(this.name,T);Q(typeof F=="string",e,"internal-error"),gt(p,e.name),gt(_,e.name),Q(typeof K=="boolean",e,"internal-error"),Q(typeof Z=="boolean",e,"internal-error"),gt(R,e.name),gt(V,e.name),gt(x,e.name),gt(C,e.name),gt(B,e.name),gt(j,e.name);const I=new nt({uid:F,auth:e,email:_,emailVerified:K,displayName:p,isAnonymous:Z,photoURL:V,phoneNumber:R,tenantId:x,stsTokenManager:g,createdAt:B,lastLoginAt:j});return G&&Array.isArray(G)&&(I.providerData=G.map(v=>Object.assign({},v))),C&&(I._redirectEventId=C),I}static async _fromIdTokenResponse(e,t,n=!1){const i=new qn;i.updateFromServerResponse(t);const s=new nt({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:n});return await gs(s),s}static async _fromGetAccountInfoResponse(e,t,n){const i=t.users[0];Q(i.localId!==void 0,"internal-error");const s=i.providerUserInfo!==void 0?gh(i.providerUserInfo):[],o=!(i.email&&i.passwordHash)&&!(s!=null&&s.length),u=new qn;u.updateFromIdToken(n);const c=new nt({uid:i.localId,auth:e,stsTokenManager:u,isAnonymous:o}),h={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new Go(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(s!=null&&s.length)};return Object.assign(c,h),c}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nc=new Map;function on(r){fn(r instanceof Function,"Expected a class definition");let e=Nc.get(r);return e?(fn(e instanceof r,"Instance stored in cache mismatched with class"),e):(e=new r,Nc.set(r,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _h{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}_h.type="NONE";const Oc=_h;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xo(r,e,t){return`firebase:${r}:${e}:${t}`}class jn{constructor(e,t,n){this.persistence=e,this.auth=t,this.userKey=n;const{config:i,name:s}=this.auth;this.fullUserKey=xo(this.userKey,i.apiKey,s),this.fullPersistenceKey=xo("persistence",i.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?nt._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,n="authUser"){if(!t.length)return new jn(on(Oc),e,n);const i=(await Promise.all(t.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let s=i[0]||on(Oc);const o=xo(n,e.config.apiKey,e.name);let u=null;for(const h of t)try{const f=await h._get(o);if(f){const p=nt._fromJSON(e,f);h!==s&&(u=p),s=h;break}}catch{}const c=i.filter(h=>h._shouldAllowMigration);return!s._shouldAllowMigration||!c.length?new jn(s,e,n):(s=c[0],u&&await s._set(o,u.toJSON()),await Promise.all(t.map(async h=>{if(h!==s)try{await h._remove(o)}catch{}})),new jn(s,e,n))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mc(r){const e=r.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Mg(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(xg(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Fg(e))return"Blackberry";if(Ug(e))return"Webos";if(Ng(e))return"Safari";if((e.includes("chrome/")||Og(e))&&!e.includes("edge/"))return"Chrome";if(Lg(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,n=r.match(t);if((n==null?void 0:n.length)===2)return n[1]}return"Other"}function xg(r=qe()){return/firefox\//i.test(r)}function Ng(r=qe()){const e=r.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Og(r=qe()){return/crios\//i.test(r)}function Mg(r=qe()){return/iemobile/i.test(r)}function Lg(r=qe()){return/android/i.test(r)}function Fg(r=qe()){return/blackberry/i.test(r)}function Ug(r=qe()){return/webos/i.test(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yh(r,e=[]){let t;switch(r){case"Browser":t=Mc(qe());break;case"Worker":t=`${Mc(qe())}-${r}`;break;default:t=r}const n=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${ks}/${n}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bg{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const n=s=>new Promise((o,u)=>{try{const c=e(s);o(c)}catch(c){u(c)}});n.onAbort=t,this.queue.push(n);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const n of this.queue)await n(e),n.onAbort&&t.push(n.onAbort)}catch(n){t.reverse();for(const i of t)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:n==null?void 0:n.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qg(r,e={}){return mi(r,"GET","/v2/passwordPolicy",Ia(r,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jg=6;class zg{constructor(e){var t,n,i,s;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=o.minPasswordLength)!==null&&t!==void 0?t:jg,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(n=e.allowedNonAlphanumericCharacters)===null||n===void 0?void 0:n.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(s=e.forceUpgradeOnSignin)!==null&&s!==void 0?s:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,n,i,s,o,u;const c={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,c),this.validatePasswordCharacterOptions(e,c),c.isValid&&(c.isValid=(t=c.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),c.isValid&&(c.isValid=(n=c.meetsMaxPasswordLength)!==null&&n!==void 0?n:!0),c.isValid&&(c.isValid=(i=c.containsLowercaseLetter)!==null&&i!==void 0?i:!0),c.isValid&&(c.isValid=(s=c.containsUppercaseLetter)!==null&&s!==void 0?s:!0),c.isValid&&(c.isValid=(o=c.containsNumericCharacter)!==null&&o!==void 0?o:!0),c.isValid&&(c.isValid=(u=c.containsNonAlphanumericCharacter)!==null&&u!==void 0?u:!0),c}validatePasswordLengthOptions(e,t){const n=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;n&&(t.meetsMinPasswordLength=e.length>=n),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let n;for(let i=0;i<e.length;i++)n=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,n>="a"&&n<="z",n>="A"&&n<="Z",n>="0"&&n<="9",this.allowedNonAlphanumericCharacters.includes(n))}updatePasswordCharacterOptionsStatuses(e,t,n,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=n)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gg{constructor(e,t,n,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=n,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Lc(this),this.idTokenSubscription=new Lc(this),this.beforeStateQueue=new Bg(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=hh,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=on(t)),this._initializationPromise=this.queue(async()=>{var n,i;if(!this._deleted&&(this.persistenceManager=await jn.create(this,e),!this._deleted)){if(!((n=this._popupRedirectResolver)===null||n===void 0)&&n._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await ph(this,{idToken:e}),n=await nt._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(n)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(bt(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(u=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(u,u))}):this.directlySetCurrentUser(null)}const n=await this.assertedPersistence.getCurrentUser();let i=n,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,u=i==null?void 0:i._redirectEventId,c=await this.tryRedirectSignIn(e);(!o||o===u)&&(c!=null&&c.user)&&(i=c.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(o){i=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return Q(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await gs(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Ig()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(bt(this.app))return Promise.reject(Bn(this));const t=e?de(e):null;return t&&Q(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&Q(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return bt(this.app)?Promise.reject(Bn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return bt(this.app)?Promise.reject(Bn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(on(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await qg(this),t=new zg(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new di("auth","Firebase",e())}onAuthStateChanged(e,t,n){return this.registerStateListener(this.authStateSubscription,e,t,n)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,n){return this.registerStateListener(this.idTokenSubscription,e,t,n)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const n=this.onAuthStateChanged(()=>{n(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),n={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(n.tenantId=this.tenantId),await kg(this,n)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const n=await this.getOrInitRedirectPersistenceManager(t);return e===null?n.removeCurrentUser():n.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&on(e)||this._popupRedirectResolver;Q(t,this,"argument-error"),this.redirectPersistenceManager=await jn.create(this,[on(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,n;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const n=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==n&&(this.lastNotifiedUid=n,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,n,i){if(this._deleted)return()=>{};const s=typeof t=="function"?t:t.next.bind(t);let o=!1;const u=this._isInitialized?Promise.resolve():this._initializationPromise;if(Q(u,this,"internal-error"),u.then(()=>{o||s(this.currentUser)}),typeof t=="function"){const c=e.addObserver(t,n,i);return()=>{o=!0,c()}}else{const c=e.addObserver(t);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return Q(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=yh(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const n=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());n&&(t["X-Firebase-Client"]=n);const i=await this._getAppCheckToken();return i&&(t["X-Firebase-AppCheck"]=i),t}async _getAppCheckToken(){var e;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&pg(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function Ih(r){return de(r)}class Lc{constructor(e){this.auth=e,this.observer=null,this.addObserver=tp(t=>this.observer=t)}get next(){return Q(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}function $g(r,e){const t=(e==null?void 0:e.persistence)||[],n=(Array.isArray(t)?t:[t]).map(on);e!=null&&e.errorMap&&r._updateErrorMap(e.errorMap),r._initializeWithPersistence(n,e==null?void 0:e.popupRedirectResolver)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Th{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return tt("not implemented")}_getIdTokenResponse(e){return tt("not implemented")}_linkToIdToken(e,t){return tt("not implemented")}_getReauthenticationResolver(e){return tt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function zn(r,e){return wg(r,"POST","/v1/accounts:signInWithIdp",Ia(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kg="http://localhost";class mn extends Th{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new mn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):dn("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:n,signInMethod:i}=t,s=ga(t,["providerId","signInMethod"]);if(!n||!i)return null;const o=new mn(n,i);return o.idToken=s.idToken||void 0,o.accessToken=s.accessToken||void 0,o.secret=s.secret,o.nonce=s.nonce,o.pendingToken=s.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return zn(e,t)}_linkToIdToken(e,t){const n=this.buildRequest();return n.idToken=t,zn(e,n)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,zn(e,t)}buildRequest(){const e={requestUri:Kg,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=da(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vh{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xs extends vh{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class It extends xs{constructor(){super("facebook.com")}static credential(e){return mn._fromParams({providerId:It.PROVIDER_ID,signInMethod:It.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return It.credentialFromTaggedObject(e)}static credentialFromError(e){return It.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return It.credential(e.oauthAccessToken)}catch{return null}}}It.FACEBOOK_SIGN_IN_METHOD="facebook.com";It.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tt extends xs{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return mn._fromParams({providerId:Tt.PROVIDER_ID,signInMethod:Tt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Tt.credentialFromTaggedObject(e)}static credentialFromError(e){return Tt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:n}=e;if(!t&&!n)return null;try{return Tt.credential(t,n)}catch{return null}}}Tt.GOOGLE_SIGN_IN_METHOD="google.com";Tt.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vt extends xs{constructor(){super("github.com")}static credential(e){return mn._fromParams({providerId:vt.PROVIDER_ID,signInMethod:vt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return vt.credentialFromTaggedObject(e)}static credentialFromError(e){return vt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return vt.credential(e.oauthAccessToken)}catch{return null}}}vt.GITHUB_SIGN_IN_METHOD="github.com";vt.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Et extends xs{constructor(){super("twitter.com")}static credential(e,t){return mn._fromParams({providerId:Et.PROVIDER_ID,signInMethod:Et.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Et.credentialFromTaggedObject(e)}static credentialFromError(e){return Et.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:n}=e;if(!t||!n)return null;try{return Et.credential(t,n)}catch{return null}}}Et.TWITTER_SIGN_IN_METHOD="twitter.com";Et.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,n,i=!1){const s=await nt._fromIdTokenResponse(e,n,i),o=Fc(n);return new Qn({user:s,providerId:o,_tokenResponse:n,operationType:t})}static async _forOperation(e,t,n){await e._updateTokensIfNecessary(n,!0);const i=Fc(n);return new Qn({user:e,providerId:i,_tokenResponse:n,operationType:t})}}function Fc(r){return r.providerId?r.providerId:"phoneNumber"in r?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _s extends at{constructor(e,t,n,i){var s;super(t.code,t.message),this.operationType=n,this.user=i,Object.setPrototypeOf(this,_s.prototype),this.customData={appName:e.name,tenantId:(s=e.tenantId)!==null&&s!==void 0?s:void 0,_serverResponse:t.customData._serverResponse,operationType:n}}static _fromErrorAndOperation(e,t,n,i){return new _s(e,t,n,i)}}function Eh(r,e,t,n){return(e==="reauthenticate"?t._getReauthenticationResolver(r):t._getIdTokenResponse(r)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?_s._fromErrorAndOperation(r,s,e,n):s})}async function Qg(r,e,t=!1){const n=await ti(r,e._linkToIdToken(r.auth,await r.getIdToken()),t);return Qn._forOperation(r,"link",n)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Wg(r,e,t=!1){const{auth:n}=r;if(bt(n.app))return Promise.reject(Bn(n));const i="reauthenticate";try{const s=await ti(r,Eh(n,i,e,r),t);Q(s.idToken,n,"internal-error");const o=Ta(s.idToken);Q(o,n,"internal-error");const{sub:u}=o;return Q(r.uid===u,n,"user-mismatch"),Qn._forOperation(r,i,s)}catch(s){throw(s==null?void 0:s.code)==="auth/user-not-found"&&dn(n,"user-mismatch"),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Hg(r,e,t=!1){if(bt(r.app))return Promise.reject(Bn(r));const n="signIn",i=await Eh(r,n,e),s=await Qn._fromIdTokenResponse(r,n,i);return t||await r._updateCurrentUser(s.user),s}function $v(r,e,t,n){return de(r).onAuthStateChanged(e,t,n)}function Kv(r){return de(r).signOut()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jg(r="",e=10){let t="";for(let n=0;n<e;n++)t+=Math.floor(Math.random()*10);return r+t}new fi(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yg(r,e){return Q(r._popupRedirectResolver,r,"argument-error"),r._popupRedirectResolver}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class va extends Th{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return zn(e,this._buildIdpRequest())}_linkToIdToken(e,t){return zn(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return zn(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function Xg(r){return Hg(r.auth,new va(r),r.bypassAuthState)}function Zg(r){const{auth:e,user:t}=r;return Q(t,e,"internal-error"),Wg(t,new va(r),r.bypassAuthState)}async function e_(r){const{auth:e,user:t}=r;return Q(t,e,"internal-error"),Qg(t,new va(r),r.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class t_{constructor(e,t,n,i,s=!1){this.auth=e,this.resolver=n,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(n){this.reject(n)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:n,postBody:i,tenantId:s,error:o,type:u}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:t,sessionId:n,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(u)(c))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Xg;case"linkViaPopup":case"linkViaRedirect":return e_;case"reauthViaPopup":case"reauthViaRedirect":return Zg;default:dn(this.auth,"internal-error")}}resolve(e){fn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){fn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const n_=new fi(2e3,1e4);async function Qv(r,e,t){if(bt(r.app))return Promise.reject(Un(r,"operation-not-supported-in-this-environment"));const n=Ih(r);gg(r,e,vh);const i=Yg(n);return new an(n,"signInViaPopup",e,i).executeNotNull()}class an extends t_{constructor(e,t,n,i,s){super(e,t,i,s),this.provider=n,this.authWindow=null,this.pollId=null,an.currentPopupAction&&an.currentPopupAction.cancel(),an.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return Q(e,this.auth,"internal-error"),e}async onExecution(){fn(this.filter.length===1,"Popup operations only handle one event");const e=Jg();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Un(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Un(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,an.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,n;if(!((n=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||n===void 0)&&n.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Un(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,n_.get())};e()}}an.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */new fi(3e4,6e4);/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */new fi(5e3,15e3);var Uc="@firebase/auth",Bc="1.7.9";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class r_{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(n=>{e((n==null?void 0:n.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){Q(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function i_(r){switch(r){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function s_(r){Kn(new hn("auth",(e,{options:t})=>{const n=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:o,authDomain:u}=n.options;Q(o&&!o.includes(":"),"invalid-api-key",{appName:n.name});const c={apiKey:o,authDomain:u,clientPlatform:r,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:yh(r)},h=new Gg(n,i,s,c);return $g(h,t),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,n)=>{e.getProvider("auth-internal").initialize()})),Kn(new hn("auth-internal",e=>{const t=Ih(e.getProvider("auth").getImmediate());return(n=>new r_(n))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Dt(Uc,Bc,i_(r)),Dt(Uc,Bc,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const o_=5*60;zm("authIdTokenMaxAge");s_("Browser");var qc=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var un,wh;(function(){var r;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(T,g){function I(){}I.prototype=g.prototype,T.D=g.prototype,T.prototype=new I,T.prototype.constructor=T,T.C=function(v,E,b){for(var y=Array(arguments.length-2),Xe=2;Xe<arguments.length;Xe++)y[Xe-2]=arguments[Xe];return g.prototype[E].apply(v,y)}}function t(){this.blockSize=-1}function n(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(n,t),n.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(T,g,I){I||(I=0);var v=Array(16);if(typeof g=="string")for(var E=0;16>E;++E)v[E]=g.charCodeAt(I++)|g.charCodeAt(I++)<<8|g.charCodeAt(I++)<<16|g.charCodeAt(I++)<<24;else for(E=0;16>E;++E)v[E]=g[I++]|g[I++]<<8|g[I++]<<16|g[I++]<<24;g=T.g[0],I=T.g[1],E=T.g[2];var b=T.g[3],y=g+(b^I&(E^b))+v[0]+3614090360&4294967295;g=I+(y<<7&4294967295|y>>>25),y=b+(E^g&(I^E))+v[1]+3905402710&4294967295,b=g+(y<<12&4294967295|y>>>20),y=E+(I^b&(g^I))+v[2]+606105819&4294967295,E=b+(y<<17&4294967295|y>>>15),y=I+(g^E&(b^g))+v[3]+3250441966&4294967295,I=E+(y<<22&4294967295|y>>>10),y=g+(b^I&(E^b))+v[4]+4118548399&4294967295,g=I+(y<<7&4294967295|y>>>25),y=b+(E^g&(I^E))+v[5]+1200080426&4294967295,b=g+(y<<12&4294967295|y>>>20),y=E+(I^b&(g^I))+v[6]+2821735955&4294967295,E=b+(y<<17&4294967295|y>>>15),y=I+(g^E&(b^g))+v[7]+4249261313&4294967295,I=E+(y<<22&4294967295|y>>>10),y=g+(b^I&(E^b))+v[8]+1770035416&4294967295,g=I+(y<<7&4294967295|y>>>25),y=b+(E^g&(I^E))+v[9]+2336552879&4294967295,b=g+(y<<12&4294967295|y>>>20),y=E+(I^b&(g^I))+v[10]+4294925233&4294967295,E=b+(y<<17&4294967295|y>>>15),y=I+(g^E&(b^g))+v[11]+2304563134&4294967295,I=E+(y<<22&4294967295|y>>>10),y=g+(b^I&(E^b))+v[12]+1804603682&4294967295,g=I+(y<<7&4294967295|y>>>25),y=b+(E^g&(I^E))+v[13]+4254626195&4294967295,b=g+(y<<12&4294967295|y>>>20),y=E+(I^b&(g^I))+v[14]+2792965006&4294967295,E=b+(y<<17&4294967295|y>>>15),y=I+(g^E&(b^g))+v[15]+1236535329&4294967295,I=E+(y<<22&4294967295|y>>>10),y=g+(E^b&(I^E))+v[1]+4129170786&4294967295,g=I+(y<<5&4294967295|y>>>27),y=b+(I^E&(g^I))+v[6]+3225465664&4294967295,b=g+(y<<9&4294967295|y>>>23),y=E+(g^I&(b^g))+v[11]+643717713&4294967295,E=b+(y<<14&4294967295|y>>>18),y=I+(b^g&(E^b))+v[0]+3921069994&4294967295,I=E+(y<<20&4294967295|y>>>12),y=g+(E^b&(I^E))+v[5]+3593408605&4294967295,g=I+(y<<5&4294967295|y>>>27),y=b+(I^E&(g^I))+v[10]+38016083&4294967295,b=g+(y<<9&4294967295|y>>>23),y=E+(g^I&(b^g))+v[15]+3634488961&4294967295,E=b+(y<<14&4294967295|y>>>18),y=I+(b^g&(E^b))+v[4]+3889429448&4294967295,I=E+(y<<20&4294967295|y>>>12),y=g+(E^b&(I^E))+v[9]+568446438&4294967295,g=I+(y<<5&4294967295|y>>>27),y=b+(I^E&(g^I))+v[14]+3275163606&4294967295,b=g+(y<<9&4294967295|y>>>23),y=E+(g^I&(b^g))+v[3]+4107603335&4294967295,E=b+(y<<14&4294967295|y>>>18),y=I+(b^g&(E^b))+v[8]+1163531501&4294967295,I=E+(y<<20&4294967295|y>>>12),y=g+(E^b&(I^E))+v[13]+2850285829&4294967295,g=I+(y<<5&4294967295|y>>>27),y=b+(I^E&(g^I))+v[2]+4243563512&4294967295,b=g+(y<<9&4294967295|y>>>23),y=E+(g^I&(b^g))+v[7]+1735328473&4294967295,E=b+(y<<14&4294967295|y>>>18),y=I+(b^g&(E^b))+v[12]+2368359562&4294967295,I=E+(y<<20&4294967295|y>>>12),y=g+(I^E^b)+v[5]+4294588738&4294967295,g=I+(y<<4&4294967295|y>>>28),y=b+(g^I^E)+v[8]+2272392833&4294967295,b=g+(y<<11&4294967295|y>>>21),y=E+(b^g^I)+v[11]+1839030562&4294967295,E=b+(y<<16&4294967295|y>>>16),y=I+(E^b^g)+v[14]+4259657740&4294967295,I=E+(y<<23&4294967295|y>>>9),y=g+(I^E^b)+v[1]+2763975236&4294967295,g=I+(y<<4&4294967295|y>>>28),y=b+(g^I^E)+v[4]+1272893353&4294967295,b=g+(y<<11&4294967295|y>>>21),y=E+(b^g^I)+v[7]+4139469664&4294967295,E=b+(y<<16&4294967295|y>>>16),y=I+(E^b^g)+v[10]+3200236656&4294967295,I=E+(y<<23&4294967295|y>>>9),y=g+(I^E^b)+v[13]+681279174&4294967295,g=I+(y<<4&4294967295|y>>>28),y=b+(g^I^E)+v[0]+3936430074&4294967295,b=g+(y<<11&4294967295|y>>>21),y=E+(b^g^I)+v[3]+3572445317&4294967295,E=b+(y<<16&4294967295|y>>>16),y=I+(E^b^g)+v[6]+76029189&4294967295,I=E+(y<<23&4294967295|y>>>9),y=g+(I^E^b)+v[9]+3654602809&4294967295,g=I+(y<<4&4294967295|y>>>28),y=b+(g^I^E)+v[12]+3873151461&4294967295,b=g+(y<<11&4294967295|y>>>21),y=E+(b^g^I)+v[15]+530742520&4294967295,E=b+(y<<16&4294967295|y>>>16),y=I+(E^b^g)+v[2]+3299628645&4294967295,I=E+(y<<23&4294967295|y>>>9),y=g+(E^(I|~b))+v[0]+4096336452&4294967295,g=I+(y<<6&4294967295|y>>>26),y=b+(I^(g|~E))+v[7]+1126891415&4294967295,b=g+(y<<10&4294967295|y>>>22),y=E+(g^(b|~I))+v[14]+2878612391&4294967295,E=b+(y<<15&4294967295|y>>>17),y=I+(b^(E|~g))+v[5]+4237533241&4294967295,I=E+(y<<21&4294967295|y>>>11),y=g+(E^(I|~b))+v[12]+1700485571&4294967295,g=I+(y<<6&4294967295|y>>>26),y=b+(I^(g|~E))+v[3]+2399980690&4294967295,b=g+(y<<10&4294967295|y>>>22),y=E+(g^(b|~I))+v[10]+4293915773&4294967295,E=b+(y<<15&4294967295|y>>>17),y=I+(b^(E|~g))+v[1]+2240044497&4294967295,I=E+(y<<21&4294967295|y>>>11),y=g+(E^(I|~b))+v[8]+1873313359&4294967295,g=I+(y<<6&4294967295|y>>>26),y=b+(I^(g|~E))+v[15]+4264355552&4294967295,b=g+(y<<10&4294967295|y>>>22),y=E+(g^(b|~I))+v[6]+2734768916&4294967295,E=b+(y<<15&4294967295|y>>>17),y=I+(b^(E|~g))+v[13]+1309151649&4294967295,I=E+(y<<21&4294967295|y>>>11),y=g+(E^(I|~b))+v[4]+4149444226&4294967295,g=I+(y<<6&4294967295|y>>>26),y=b+(I^(g|~E))+v[11]+3174756917&4294967295,b=g+(y<<10&4294967295|y>>>22),y=E+(g^(b|~I))+v[2]+718787259&4294967295,E=b+(y<<15&4294967295|y>>>17),y=I+(b^(E|~g))+v[9]+3951481745&4294967295,T.g[0]=T.g[0]+g&4294967295,T.g[1]=T.g[1]+(E+(y<<21&4294967295|y>>>11))&4294967295,T.g[2]=T.g[2]+E&4294967295,T.g[3]=T.g[3]+b&4294967295}n.prototype.u=function(T,g){g===void 0&&(g=T.length);for(var I=g-this.blockSize,v=this.B,E=this.h,b=0;b<g;){if(E==0)for(;b<=I;)i(this,T,b),b+=this.blockSize;if(typeof T=="string"){for(;b<g;)if(v[E++]=T.charCodeAt(b++),E==this.blockSize){i(this,v),E=0;break}}else for(;b<g;)if(v[E++]=T[b++],E==this.blockSize){i(this,v),E=0;break}}this.h=E,this.o+=g},n.prototype.v=function(){var T=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);T[0]=128;for(var g=1;g<T.length-8;++g)T[g]=0;var I=8*this.o;for(g=T.length-8;g<T.length;++g)T[g]=I&255,I/=256;for(this.u(T),T=Array(16),g=I=0;4>g;++g)for(var v=0;32>v;v+=8)T[I++]=this.g[g]>>>v&255;return T};function s(T,g){var I=u;return Object.prototype.hasOwnProperty.call(I,T)?I[T]:I[T]=g(T)}function o(T,g){this.h=g;for(var I=[],v=!0,E=T.length-1;0<=E;E--){var b=T[E]|0;v&&b==g||(I[E]=b,v=!1)}this.g=I}var u={};function c(T){return-128<=T&&128>T?s(T,function(g){return new o([g|0],0>g?-1:0)}):new o([T|0],0>T?-1:0)}function h(T){if(isNaN(T)||!isFinite(T))return p;if(0>T)return C(h(-T));for(var g=[],I=1,v=0;T>=I;v++)g[v]=T/I|0,I*=4294967296;return new o(g,0)}function f(T,g){if(T.length==0)throw Error("number format error: empty string");if(g=g||10,2>g||36<g)throw Error("radix out of range: "+g);if(T.charAt(0)=="-")return C(f(T.substring(1),g));if(0<=T.indexOf("-"))throw Error('number format error: interior "-" character');for(var I=h(Math.pow(g,8)),v=p,E=0;E<T.length;E+=8){var b=Math.min(8,T.length-E),y=parseInt(T.substring(E,E+b),g);8>b?(b=h(Math.pow(g,b)),v=v.j(b).add(h(y))):(v=v.j(I),v=v.add(h(y)))}return v}var p=c(0),_=c(1),R=c(16777216);r=o.prototype,r.m=function(){if(x(this))return-C(this).m();for(var T=0,g=1,I=0;I<this.g.length;I++){var v=this.i(I);T+=(0<=v?v:4294967296+v)*g,g*=4294967296}return T},r.toString=function(T){if(T=T||10,2>T||36<T)throw Error("radix out of range: "+T);if(V(this))return"0";if(x(this))return"-"+C(this).toString(T);for(var g=h(Math.pow(T,6)),I=this,v="";;){var E=K(I,g).g;I=B(I,E.j(g));var b=((0<I.g.length?I.g[0]:I.h)>>>0).toString(T);if(I=E,V(I))return b+v;for(;6>b.length;)b="0"+b;v=b+v}},r.i=function(T){return 0>T?0:T<this.g.length?this.g[T]:this.h};function V(T){if(T.h!=0)return!1;for(var g=0;g<T.g.length;g++)if(T.g[g]!=0)return!1;return!0}function x(T){return T.h==-1}r.l=function(T){return T=B(this,T),x(T)?-1:V(T)?0:1};function C(T){for(var g=T.g.length,I=[],v=0;v<g;v++)I[v]=~T.g[v];return new o(I,~T.h).add(_)}r.abs=function(){return x(this)?C(this):this},r.add=function(T){for(var g=Math.max(this.g.length,T.g.length),I=[],v=0,E=0;E<=g;E++){var b=v+(this.i(E)&65535)+(T.i(E)&65535),y=(b>>>16)+(this.i(E)>>>16)+(T.i(E)>>>16);v=y>>>16,b&=65535,y&=65535,I[E]=y<<16|b}return new o(I,I[I.length-1]&-2147483648?-1:0)};function B(T,g){return T.add(C(g))}r.j=function(T){if(V(this)||V(T))return p;if(x(this))return x(T)?C(this).j(C(T)):C(C(this).j(T));if(x(T))return C(this.j(C(T)));if(0>this.l(R)&&0>T.l(R))return h(this.m()*T.m());for(var g=this.g.length+T.g.length,I=[],v=0;v<2*g;v++)I[v]=0;for(v=0;v<this.g.length;v++)for(var E=0;E<T.g.length;E++){var b=this.i(v)>>>16,y=this.i(v)&65535,Xe=T.i(E)>>>16,vr=T.i(E)&65535;I[2*v+2*E]+=y*vr,j(I,2*v+2*E),I[2*v+2*E+1]+=b*vr,j(I,2*v+2*E+1),I[2*v+2*E+1]+=y*Xe,j(I,2*v+2*E+1),I[2*v+2*E+2]+=b*Xe,j(I,2*v+2*E+2)}for(v=0;v<g;v++)I[v]=I[2*v+1]<<16|I[2*v];for(v=g;v<2*g;v++)I[v]=0;return new o(I,0)};function j(T,g){for(;(T[g]&65535)!=T[g];)T[g+1]+=T[g]>>>16,T[g]&=65535,g++}function F(T,g){this.g=T,this.h=g}function K(T,g){if(V(g))throw Error("division by zero");if(V(T))return new F(p,p);if(x(T))return g=K(C(T),g),new F(C(g.g),C(g.h));if(x(g))return g=K(T,C(g)),new F(C(g.g),g.h);if(30<T.g.length){if(x(T)||x(g))throw Error("slowDivide_ only works with positive integers.");for(var I=_,v=g;0>=v.l(T);)I=Z(I),v=Z(v);var E=G(I,1),b=G(v,1);for(v=G(v,2),I=G(I,2);!V(v);){var y=b.add(v);0>=y.l(T)&&(E=E.add(I),b=y),v=G(v,1),I=G(I,1)}return g=B(T,E.j(g)),new F(E,g)}for(E=p;0<=T.l(g);){for(I=Math.max(1,Math.floor(T.m()/g.m())),v=Math.ceil(Math.log(I)/Math.LN2),v=48>=v?1:Math.pow(2,v-48),b=h(I),y=b.j(g);x(y)||0<y.l(T);)I-=v,b=h(I),y=b.j(g);V(b)&&(b=_),E=E.add(b),T=B(T,y)}return new F(E,T)}r.A=function(T){return K(this,T).h},r.and=function(T){for(var g=Math.max(this.g.length,T.g.length),I=[],v=0;v<g;v++)I[v]=this.i(v)&T.i(v);return new o(I,this.h&T.h)},r.or=function(T){for(var g=Math.max(this.g.length,T.g.length),I=[],v=0;v<g;v++)I[v]=this.i(v)|T.i(v);return new o(I,this.h|T.h)},r.xor=function(T){for(var g=Math.max(this.g.length,T.g.length),I=[],v=0;v<g;v++)I[v]=this.i(v)^T.i(v);return new o(I,this.h^T.h)};function Z(T){for(var g=T.g.length+1,I=[],v=0;v<g;v++)I[v]=T.i(v)<<1|T.i(v-1)>>>31;return new o(I,T.h)}function G(T,g){var I=g>>5;g%=32;for(var v=T.g.length-I,E=[],b=0;b<v;b++)E[b]=0<g?T.i(b+I)>>>g|T.i(b+I+1)<<32-g:T.i(b+I);return new o(E,T.h)}n.prototype.digest=n.prototype.v,n.prototype.reset=n.prototype.s,n.prototype.update=n.prototype.u,wh=n,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=h,o.fromString=f,un=o}).apply(typeof qc<"u"?qc:typeof self<"u"?self:typeof window<"u"?window:{});var Ji=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Ah,zr,Rh,is,$o,bh,Sh,Ph;(function(){var r,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,l,d){return a==Array.prototype||a==Object.prototype||(a[l]=d.value),a};function t(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof Ji=="object"&&Ji];for(var l=0;l<a.length;++l){var d=a[l];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var n=t(this);function i(a,l){if(l)e:{var d=n;a=a.split(".");for(var m=0;m<a.length-1;m++){var A=a[m];if(!(A in d))break e;d=d[A]}a=a[a.length-1],m=d[a],l=l(m),l!=m&&l!=null&&e(d,a,{configurable:!0,writable:!0,value:l})}}function s(a,l){a instanceof String&&(a+="");var d=0,m=!1,A={next:function(){if(!m&&d<a.length){var P=d++;return{value:l(P,a[P]),done:!1}}return m=!0,{done:!0,value:void 0}}};return A[Symbol.iterator]=function(){return A},A}i("Array.prototype.values",function(a){return a||function(){return s(this,function(l,d){return d})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},u=this||self;function c(a){var l=typeof a;return l=l!="object"?l:a?Array.isArray(a)?"array":l:"null",l=="array"||l=="object"&&typeof a.length=="number"}function h(a){var l=typeof a;return l=="object"&&a!=null||l=="function"}function f(a,l,d){return a.call.apply(a.bind,arguments)}function p(a,l,d){if(!a)throw Error();if(2<arguments.length){var m=Array.prototype.slice.call(arguments,2);return function(){var A=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(A,m),a.apply(l,A)}}return function(){return a.apply(l,arguments)}}function _(a,l,d){return _=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?f:p,_.apply(null,arguments)}function R(a,l){var d=Array.prototype.slice.call(arguments,1);return function(){var m=d.slice();return m.push.apply(m,arguments),a.apply(this,m)}}function V(a,l){function d(){}d.prototype=l.prototype,a.aa=l.prototype,a.prototype=new d,a.prototype.constructor=a,a.Qb=function(m,A,P){for(var O=Array(arguments.length-2),ie=2;ie<arguments.length;ie++)O[ie-2]=arguments[ie];return l.prototype[A].apply(m,O)}}function x(a){const l=a.length;if(0<l){const d=Array(l);for(let m=0;m<l;m++)d[m]=a[m];return d}return[]}function C(a,l){for(let d=1;d<arguments.length;d++){const m=arguments[d];if(c(m)){const A=a.length||0,P=m.length||0;a.length=A+P;for(let O=0;O<P;O++)a[A+O]=m[O]}else a.push(m)}}class B{constructor(l,d){this.i=l,this.j=d,this.h=0,this.g=null}get(){let l;return 0<this.h?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function j(a){return/^[\s\xa0]*$/.test(a)}function F(){var a=u.navigator;return a&&(a=a.userAgent)?a:""}function K(a){return K[" "](a),a}K[" "]=function(){};var Z=F().indexOf("Gecko")!=-1&&!(F().toLowerCase().indexOf("webkit")!=-1&&F().indexOf("Edge")==-1)&&!(F().indexOf("Trident")!=-1||F().indexOf("MSIE")!=-1)&&F().indexOf("Edge")==-1;function G(a,l,d){for(const m in a)l.call(d,a[m],m,a)}function T(a,l){for(const d in a)l.call(void 0,a[d],d,a)}function g(a){const l={};for(const d in a)l[d]=a[d];return l}const I="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function v(a,l){let d,m;for(let A=1;A<arguments.length;A++){m=arguments[A];for(d in m)a[d]=m[d];for(let P=0;P<I.length;P++)d=I[P],Object.prototype.hasOwnProperty.call(m,d)&&(a[d]=m[d])}}function E(a){var l=1;a=a.split(":");const d=[];for(;0<l&&a.length;)d.push(a.shift()),l--;return a.length&&d.push(a.join(":")),d}function b(a){u.setTimeout(()=>{throw a},0)}function y(){var a=no;let l=null;return a.g&&(l=a.g,a.g=a.g.next,a.g||(a.h=null),l.next=null),l}class Xe{constructor(){this.h=this.g=null}add(l,d){const m=vr.get();m.set(l,d),this.h?this.h.next=m:this.g=m,this.h=m}}var vr=new B(()=>new Zf,a=>a.reset());class Zf{constructor(){this.next=this.g=this.h=null}set(l,d){this.h=l,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let Er,wr=!1,no=new Xe,Eu=()=>{const a=u.Promise.resolve(void 0);Er=()=>{a.then(em)}};var em=()=>{for(var a;a=y();){try{a.h.call(a.g)}catch(d){b(d)}var l=vr;l.j(a),100>l.h&&(l.h++,a.next=l.g,l.g=a)}wr=!1};function dt(){this.s=this.s,this.C=this.C}dt.prototype.s=!1,dt.prototype.ma=function(){this.s||(this.s=!0,this.N())},dt.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function Pe(a,l){this.type=a,this.g=this.target=l,this.defaultPrevented=!1}Pe.prototype.h=function(){this.defaultPrevented=!0};var tm=function(){if(!u.addEventListener||!Object.defineProperty)return!1;var a=!1,l=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const d=()=>{};u.addEventListener("test",d,l),u.removeEventListener("test",d,l)}catch{}return a}();function Ar(a,l){if(Pe.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a){var d=this.type=a.type,m=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;if(this.target=a.target||a.srcElement,this.g=l,l=a.relatedTarget){if(Z){e:{try{K(l.nodeName);var A=!0;break e}catch{}A=!1}A||(l=null)}}else d=="mouseover"?l=a.fromElement:d=="mouseout"&&(l=a.toElement);this.relatedTarget=l,m?(this.clientX=m.clientX!==void 0?m.clientX:m.pageX,this.clientY=m.clientY!==void 0?m.clientY:m.pageY,this.screenX=m.screenX||0,this.screenY=m.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=typeof a.pointerType=="string"?a.pointerType:nm[a.pointerType]||"",this.state=a.state,this.i=a,a.defaultPrevented&&Ar.aa.h.call(this)}}V(Ar,Pe);var nm={2:"touch",3:"pen",4:"mouse"};Ar.prototype.h=function(){Ar.aa.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var Vi="closure_listenable_"+(1e6*Math.random()|0),rm=0;function im(a,l,d,m,A){this.listener=a,this.proxy=null,this.src=l,this.type=d,this.capture=!!m,this.ha=A,this.key=++rm,this.da=this.fa=!1}function Di(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function ki(a){this.src=a,this.g={},this.h=0}ki.prototype.add=function(a,l,d,m,A){var P=a.toString();a=this.g[P],a||(a=this.g[P]=[],this.h++);var O=io(a,l,m,A);return-1<O?(l=a[O],d||(l.fa=!1)):(l=new im(l,this.src,P,!!m,A),l.fa=d,a.push(l)),l};function ro(a,l){var d=l.type;if(d in a.g){var m=a.g[d],A=Array.prototype.indexOf.call(m,l,void 0),P;(P=0<=A)&&Array.prototype.splice.call(m,A,1),P&&(Di(l),a.g[d].length==0&&(delete a.g[d],a.h--))}}function io(a,l,d,m){for(var A=0;A<a.length;++A){var P=a[A];if(!P.da&&P.listener==l&&P.capture==!!d&&P.ha==m)return A}return-1}var so="closure_lm_"+(1e6*Math.random()|0),oo={};function wu(a,l,d,m,A){if(Array.isArray(l)){for(var P=0;P<l.length;P++)wu(a,l[P],d,m,A);return null}return d=bu(d),a&&a[Vi]?a.K(l,d,h(m)?!!m.capture:!1,A):sm(a,l,d,!1,m,A)}function sm(a,l,d,m,A,P){if(!l)throw Error("Invalid event type");var O=h(A)?!!A.capture:!!A,ie=uo(a);if(ie||(a[so]=ie=new ki(a)),d=ie.add(l,d,m,O,P),d.proxy)return d;if(m=om(),d.proxy=m,m.src=a,m.listener=d,a.addEventListener)tm||(A=O),A===void 0&&(A=!1),a.addEventListener(l.toString(),m,A);else if(a.attachEvent)a.attachEvent(Ru(l.toString()),m);else if(a.addListener&&a.removeListener)a.addListener(m);else throw Error("addEventListener and attachEvent are unavailable.");return d}function om(){function a(d){return l.call(a.src,a.listener,d)}const l=am;return a}function Au(a,l,d,m,A){if(Array.isArray(l))for(var P=0;P<l.length;P++)Au(a,l[P],d,m,A);else m=h(m)?!!m.capture:!!m,d=bu(d),a&&a[Vi]?(a=a.i,l=String(l).toString(),l in a.g&&(P=a.g[l],d=io(P,d,m,A),-1<d&&(Di(P[d]),Array.prototype.splice.call(P,d,1),P.length==0&&(delete a.g[l],a.h--)))):a&&(a=uo(a))&&(l=a.g[l.toString()],a=-1,l&&(a=io(l,d,m,A)),(d=-1<a?l[a]:null)&&ao(d))}function ao(a){if(typeof a!="number"&&a&&!a.da){var l=a.src;if(l&&l[Vi])ro(l.i,a);else{var d=a.type,m=a.proxy;l.removeEventListener?l.removeEventListener(d,m,a.capture):l.detachEvent?l.detachEvent(Ru(d),m):l.addListener&&l.removeListener&&l.removeListener(m),(d=uo(l))?(ro(d,a),d.h==0&&(d.src=null,l[so]=null)):Di(a)}}}function Ru(a){return a in oo?oo[a]:oo[a]="on"+a}function am(a,l){if(a.da)a=!0;else{l=new Ar(l,this);var d=a.listener,m=a.ha||a.src;a.fa&&ao(a),a=d.call(m,l)}return a}function uo(a){return a=a[so],a instanceof ki?a:null}var co="__closure_events_fn_"+(1e9*Math.random()>>>0);function bu(a){return typeof a=="function"?a:(a[co]||(a[co]=function(l){return a.handleEvent(l)}),a[co])}function Ce(){dt.call(this),this.i=new ki(this),this.M=this,this.F=null}V(Ce,dt),Ce.prototype[Vi]=!0,Ce.prototype.removeEventListener=function(a,l,d,m){Au(this,a,l,d,m)};function Me(a,l){var d,m=a.F;if(m)for(d=[];m;m=m.F)d.push(m);if(a=a.M,m=l.type||l,typeof l=="string")l=new Pe(l,a);else if(l instanceof Pe)l.target=l.target||a;else{var A=l;l=new Pe(m,a),v(l,A)}if(A=!0,d)for(var P=d.length-1;0<=P;P--){var O=l.g=d[P];A=xi(O,m,!0,l)&&A}if(O=l.g=a,A=xi(O,m,!0,l)&&A,A=xi(O,m,!1,l)&&A,d)for(P=0;P<d.length;P++)O=l.g=d[P],A=xi(O,m,!1,l)&&A}Ce.prototype.N=function(){if(Ce.aa.N.call(this),this.i){var a=this.i,l;for(l in a.g){for(var d=a.g[l],m=0;m<d.length;m++)Di(d[m]);delete a.g[l],a.h--}}this.F=null},Ce.prototype.K=function(a,l,d,m){return this.i.add(String(a),l,!1,d,m)},Ce.prototype.L=function(a,l,d,m){return this.i.add(String(a),l,!0,d,m)};function xi(a,l,d,m){if(l=a.i.g[String(l)],!l)return!0;l=l.concat();for(var A=!0,P=0;P<l.length;++P){var O=l[P];if(O&&!O.da&&O.capture==d){var ie=O.listener,Re=O.ha||O.src;O.fa&&ro(a.i,O),A=ie.call(Re,m)!==!1&&A}}return A&&!m.defaultPrevented}function Su(a,l,d){if(typeof a=="function")d&&(a=_(a,d));else if(a&&typeof a.handleEvent=="function")a=_(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(l)?-1:u.setTimeout(a,l||0)}function Pu(a){a.g=Su(()=>{a.g=null,a.i&&(a.i=!1,Pu(a))},a.l);const l=a.h;a.h=null,a.m.apply(null,l)}class um extends dt{constructor(l,d){super(),this.m=l,this.l=d,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:Pu(this)}N(){super.N(),this.g&&(u.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Rr(a){dt.call(this),this.h=a,this.g={}}V(Rr,dt);var Cu=[];function Vu(a){G(a.g,function(l,d){this.g.hasOwnProperty(d)&&ao(l)},a),a.g={}}Rr.prototype.N=function(){Rr.aa.N.call(this),Vu(this)},Rr.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var lo=u.JSON.stringify,cm=u.JSON.parse,lm=class{stringify(a){return u.JSON.stringify(a,void 0)}parse(a){return u.JSON.parse(a,void 0)}};function ho(){}ho.prototype.h=null;function Du(a){return a.h||(a.h=a.i())}function ku(){}var br={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function fo(){Pe.call(this,"d")}V(fo,Pe);function mo(){Pe.call(this,"c")}V(mo,Pe);var Wt={},xu=null;function Ni(){return xu=xu||new Ce}Wt.La="serverreachability";function Nu(a){Pe.call(this,Wt.La,a)}V(Nu,Pe);function Sr(a){const l=Ni();Me(l,new Nu(l))}Wt.STAT_EVENT="statevent";function Ou(a,l){Pe.call(this,Wt.STAT_EVENT,a),this.stat=l}V(Ou,Pe);function Le(a){const l=Ni();Me(l,new Ou(l,a))}Wt.Ma="timingevent";function Mu(a,l){Pe.call(this,Wt.Ma,a),this.size=l}V(Mu,Pe);function Pr(a,l){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return u.setTimeout(function(){a()},l)}function Cr(){this.g=!0}Cr.prototype.xa=function(){this.g=!1};function hm(a,l,d,m,A,P){a.info(function(){if(a.g)if(P)for(var O="",ie=P.split("&"),Re=0;Re<ie.length;Re++){var ee=ie[Re].split("=");if(1<ee.length){var Ve=ee[0];ee=ee[1];var De=Ve.split("_");O=2<=De.length&&De[1]=="type"?O+(Ve+"="+ee+"&"):O+(Ve+"=redacted&")}}else O=null;else O=P;return"XMLHTTP REQ ("+m+") [attempt "+A+"]: "+l+`
`+d+`
`+O})}function dm(a,l,d,m,A,P,O){a.info(function(){return"XMLHTTP RESP ("+m+") [ attempt "+A+"]: "+l+`
`+d+`
`+P+" "+O})}function Sn(a,l,d,m){a.info(function(){return"XMLHTTP TEXT ("+l+"): "+mm(a,d)+(m?" "+m:"")})}function fm(a,l){a.info(function(){return"TIMEOUT: "+l})}Cr.prototype.info=function(){};function mm(a,l){if(!a.g)return l;if(!l)return null;try{var d=JSON.parse(l);if(d){for(a=0;a<d.length;a++)if(Array.isArray(d[a])){var m=d[a];if(!(2>m.length)){var A=m[1];if(Array.isArray(A)&&!(1>A.length)){var P=A[0];if(P!="noop"&&P!="stop"&&P!="close")for(var O=1;O<A.length;O++)A[O]=""}}}}return lo(d)}catch{return l}}var Oi={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Lu={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},po;function Mi(){}V(Mi,ho),Mi.prototype.g=function(){return new XMLHttpRequest},Mi.prototype.i=function(){return{}},po=new Mi;function ft(a,l,d,m){this.j=a,this.i=l,this.l=d,this.R=m||1,this.U=new Rr(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Fu}function Fu(){this.i=null,this.g="",this.h=!1}var Uu={},go={};function _o(a,l,d){a.L=1,a.v=Bi(Ze(l)),a.m=d,a.P=!0,Bu(a,null)}function Bu(a,l){a.F=Date.now(),Li(a),a.A=Ze(a.v);var d=a.A,m=a.R;Array.isArray(m)||(m=[String(m)]),ec(d.i,"t",m),a.C=0,d=a.j.J,a.h=new Fu,a.g=yc(a.j,d?l:null,!a.m),0<a.O&&(a.M=new um(_(a.Y,a,a.g),a.O)),l=a.U,d=a.g,m=a.ca;var A="readystatechange";Array.isArray(A)||(A&&(Cu[0]=A.toString()),A=Cu);for(var P=0;P<A.length;P++){var O=wu(d,A[P],m||l.handleEvent,!1,l.h||l);if(!O)break;l.g[O.key]=O}l=a.H?g(a.H):{},a.m?(a.u||(a.u="POST"),l["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.m,l)):(a.u="GET",a.g.ea(a.A,a.u,null,l)),Sr(),hm(a.i,a.u,a.A,a.l,a.R,a.m)}ft.prototype.ca=function(a){a=a.target;const l=this.M;l&&et(a)==3?l.j():this.Y(a)},ft.prototype.Y=function(a){try{if(a==this.g)e:{const De=et(this.g);var l=this.g.Ba();const Vn=this.g.Z();if(!(3>De)&&(De!=3||this.g&&(this.h.h||this.g.oa()||ac(this.g)))){this.J||De!=4||l==7||(l==8||0>=Vn?Sr(3):Sr(2)),yo(this);var d=this.g.Z();this.X=d;t:if(qu(this)){var m=ac(this.g);a="";var A=m.length,P=et(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Ht(this),Vr(this);var O="";break t}this.h.i=new u.TextDecoder}for(l=0;l<A;l++)this.h.h=!0,a+=this.h.i.decode(m[l],{stream:!(P&&l==A-1)});m.length=0,this.h.g+=a,this.C=0,O=this.h.g}else O=this.g.oa();if(this.o=d==200,dm(this.i,this.u,this.A,this.l,this.R,De,d),this.o){if(this.T&&!this.K){t:{if(this.g){var ie,Re=this.g;if((ie=Re.g?Re.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!j(ie)){var ee=ie;break t}}ee=null}if(d=ee)Sn(this.i,this.l,d,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Io(this,d);else{this.o=!1,this.s=3,Le(12),Ht(this),Vr(this);break e}}if(this.P){d=!0;let $e;for(;!this.J&&this.C<O.length;)if($e=pm(this,O),$e==go){De==4&&(this.s=4,Le(14),d=!1),Sn(this.i,this.l,null,"[Incomplete Response]");break}else if($e==Uu){this.s=4,Le(15),Sn(this.i,this.l,O,"[Invalid Chunk]"),d=!1;break}else Sn(this.i,this.l,$e,null),Io(this,$e);if(qu(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),De!=4||O.length!=0||this.h.h||(this.s=1,Le(16),d=!1),this.o=this.o&&d,!d)Sn(this.i,this.l,O,"[Invalid Chunked Response]"),Ht(this),Vr(this);else if(0<O.length&&!this.W){this.W=!0;var Ve=this.j;Ve.g==this&&Ve.ba&&!Ve.M&&(Ve.j.info("Great, no buffering proxy detected. Bytes received: "+O.length),Ro(Ve),Ve.M=!0,Le(11))}}else Sn(this.i,this.l,O,null),Io(this,O);De==4&&Ht(this),this.o&&!this.J&&(De==4?mc(this.j,this):(this.o=!1,Li(this)))}else km(this.g),d==400&&0<O.indexOf("Unknown SID")?(this.s=3,Le(12)):(this.s=0,Le(13)),Ht(this),Vr(this)}}}catch{}finally{}};function qu(a){return a.g?a.u=="GET"&&a.L!=2&&a.j.Ca:!1}function pm(a,l){var d=a.C,m=l.indexOf(`
`,d);return m==-1?go:(d=Number(l.substring(d,m)),isNaN(d)?Uu:(m+=1,m+d>l.length?go:(l=l.slice(m,m+d),a.C=m+d,l)))}ft.prototype.cancel=function(){this.J=!0,Ht(this)};function Li(a){a.S=Date.now()+a.I,ju(a,a.I)}function ju(a,l){if(a.B!=null)throw Error("WatchDog timer not null");a.B=Pr(_(a.ba,a),l)}function yo(a){a.B&&(u.clearTimeout(a.B),a.B=null)}ft.prototype.ba=function(){this.B=null;const a=Date.now();0<=a-this.S?(fm(this.i,this.A),this.L!=2&&(Sr(),Le(17)),Ht(this),this.s=2,Vr(this)):ju(this,this.S-a)};function Vr(a){a.j.G==0||a.J||mc(a.j,a)}function Ht(a){yo(a);var l=a.M;l&&typeof l.ma=="function"&&l.ma(),a.M=null,Vu(a.U),a.g&&(l=a.g,a.g=null,l.abort(),l.ma())}function Io(a,l){try{var d=a.j;if(d.G!=0&&(d.g==a||To(d.h,a))){if(!a.K&&To(d.h,a)&&d.G==3){try{var m=d.Da.g.parse(l)}catch{m=null}if(Array.isArray(m)&&m.length==3){var A=m;if(A[0]==0){e:if(!d.u){if(d.g)if(d.g.F+3e3<a.F)Ki(d),Gi(d);else break e;Ao(d),Le(18)}}else d.za=A[1],0<d.za-d.T&&37500>A[2]&&d.F&&d.v==0&&!d.C&&(d.C=Pr(_(d.Za,d),6e3));if(1>=$u(d.h)&&d.ca){try{d.ca()}catch{}d.ca=void 0}}else Yt(d,11)}else if((a.K||d.g==a)&&Ki(d),!j(l))for(A=d.Da.g.parse(l),l=0;l<A.length;l++){let ee=A[l];if(d.T=ee[0],ee=ee[1],d.G==2)if(ee[0]=="c"){d.K=ee[1],d.ia=ee[2];const Ve=ee[3];Ve!=null&&(d.la=Ve,d.j.info("VER="+d.la));const De=ee[4];De!=null&&(d.Aa=De,d.j.info("SVER="+d.Aa));const Vn=ee[5];Vn!=null&&typeof Vn=="number"&&0<Vn&&(m=1.5*Vn,d.L=m,d.j.info("backChannelRequestTimeoutMs_="+m)),m=d;const $e=a.g;if($e){const Wi=$e.g?$e.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Wi){var P=m.h;P.g||Wi.indexOf("spdy")==-1&&Wi.indexOf("quic")==-1&&Wi.indexOf("h2")==-1||(P.j=P.l,P.g=new Set,P.h&&(vo(P,P.h),P.h=null))}if(m.D){const bo=$e.g?$e.g.getResponseHeader("X-HTTP-Session-Id"):null;bo&&(m.ya=bo,oe(m.I,m.D,bo))}}d.G=3,d.l&&d.l.ua(),d.ba&&(d.R=Date.now()-a.F,d.j.info("Handshake RTT: "+d.R+"ms")),m=d;var O=a;if(m.qa=_c(m,m.J?m.ia:null,m.W),O.K){Ku(m.h,O);var ie=O,Re=m.L;Re&&(ie.I=Re),ie.B&&(yo(ie),Li(ie)),m.g=O}else dc(m);0<d.i.length&&$i(d)}else ee[0]!="stop"&&ee[0]!="close"||Yt(d,7);else d.G==3&&(ee[0]=="stop"||ee[0]=="close"?ee[0]=="stop"?Yt(d,7):wo(d):ee[0]!="noop"&&d.l&&d.l.ta(ee),d.v=0)}}Sr(4)}catch{}}var gm=class{constructor(a,l){this.g=a,this.map=l}};function zu(a){this.l=a||10,u.PerformanceNavigationTiming?(a=u.performance.getEntriesByType("navigation"),a=0<a.length&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(u.chrome&&u.chrome.loadTimes&&u.chrome.loadTimes()&&u.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Gu(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function $u(a){return a.h?1:a.g?a.g.size:0}function To(a,l){return a.h?a.h==l:a.g?a.g.has(l):!1}function vo(a,l){a.g?a.g.add(l):a.h=l}function Ku(a,l){a.h&&a.h==l?a.h=null:a.g&&a.g.has(l)&&a.g.delete(l)}zu.prototype.cancel=function(){if(this.i=Qu(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function Qu(a){if(a.h!=null)return a.i.concat(a.h.D);if(a.g!=null&&a.g.size!==0){let l=a.i;for(const d of a.g.values())l=l.concat(d.D);return l}return x(a.i)}function _m(a){if(a.V&&typeof a.V=="function")return a.V();if(typeof Map<"u"&&a instanceof Map||typeof Set<"u"&&a instanceof Set)return Array.from(a.values());if(typeof a=="string")return a.split("");if(c(a)){for(var l=[],d=a.length,m=0;m<d;m++)l.push(a[m]);return l}l=[],d=0;for(m in a)l[d++]=a[m];return l}function ym(a){if(a.na&&typeof a.na=="function")return a.na();if(!a.V||typeof a.V!="function"){if(typeof Map<"u"&&a instanceof Map)return Array.from(a.keys());if(!(typeof Set<"u"&&a instanceof Set)){if(c(a)||typeof a=="string"){var l=[];a=a.length;for(var d=0;d<a;d++)l.push(d);return l}l=[],d=0;for(const m in a)l[d++]=m;return l}}}function Wu(a,l){if(a.forEach&&typeof a.forEach=="function")a.forEach(l,void 0);else if(c(a)||typeof a=="string")Array.prototype.forEach.call(a,l,void 0);else for(var d=ym(a),m=_m(a),A=m.length,P=0;P<A;P++)l.call(void 0,m[P],d&&d[P],a)}var Hu=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Im(a,l){if(a){a=a.split("&");for(var d=0;d<a.length;d++){var m=a[d].indexOf("="),A=null;if(0<=m){var P=a[d].substring(0,m);A=a[d].substring(m+1)}else P=a[d];l(P,A?decodeURIComponent(A.replace(/\+/g," ")):"")}}}function Jt(a){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,a instanceof Jt){this.h=a.h,Fi(this,a.j),this.o=a.o,this.g=a.g,Ui(this,a.s),this.l=a.l;var l=a.i,d=new xr;d.i=l.i,l.g&&(d.g=new Map(l.g),d.h=l.h),Ju(this,d),this.m=a.m}else a&&(l=String(a).match(Hu))?(this.h=!1,Fi(this,l[1]||"",!0),this.o=Dr(l[2]||""),this.g=Dr(l[3]||"",!0),Ui(this,l[4]),this.l=Dr(l[5]||"",!0),Ju(this,l[6]||"",!0),this.m=Dr(l[7]||"")):(this.h=!1,this.i=new xr(null,this.h))}Jt.prototype.toString=function(){var a=[],l=this.j;l&&a.push(kr(l,Yu,!0),":");var d=this.g;return(d||l=="file")&&(a.push("//"),(l=this.o)&&a.push(kr(l,Yu,!0),"@"),a.push(encodeURIComponent(String(d)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.s,d!=null&&a.push(":",String(d))),(d=this.l)&&(this.g&&d.charAt(0)!="/"&&a.push("/"),a.push(kr(d,d.charAt(0)=="/"?Em:vm,!0))),(d=this.i.toString())&&a.push("?",d),(d=this.m)&&a.push("#",kr(d,Am)),a.join("")};function Ze(a){return new Jt(a)}function Fi(a,l,d){a.j=d?Dr(l,!0):l,a.j&&(a.j=a.j.replace(/:$/,""))}function Ui(a,l){if(l){if(l=Number(l),isNaN(l)||0>l)throw Error("Bad port number "+l);a.s=l}else a.s=null}function Ju(a,l,d){l instanceof xr?(a.i=l,Rm(a.i,a.h)):(d||(l=kr(l,wm)),a.i=new xr(l,a.h))}function oe(a,l,d){a.i.set(l,d)}function Bi(a){return oe(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),a}function Dr(a,l){return a?l?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function kr(a,l,d){return typeof a=="string"?(a=encodeURI(a).replace(l,Tm),d&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function Tm(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var Yu=/[#\/\?@]/g,vm=/[#\?:]/g,Em=/[#\?]/g,wm=/[#\?@]/g,Am=/#/g;function xr(a,l){this.h=this.g=null,this.i=a||null,this.j=!!l}function mt(a){a.g||(a.g=new Map,a.h=0,a.i&&Im(a.i,function(l,d){a.add(decodeURIComponent(l.replace(/\+/g," ")),d)}))}r=xr.prototype,r.add=function(a,l){mt(this),this.i=null,a=Pn(this,a);var d=this.g.get(a);return d||this.g.set(a,d=[]),d.push(l),this.h+=1,this};function Xu(a,l){mt(a),l=Pn(a,l),a.g.has(l)&&(a.i=null,a.h-=a.g.get(l).length,a.g.delete(l))}function Zu(a,l){return mt(a),l=Pn(a,l),a.g.has(l)}r.forEach=function(a,l){mt(this),this.g.forEach(function(d,m){d.forEach(function(A){a.call(l,A,m,this)},this)},this)},r.na=function(){mt(this);const a=Array.from(this.g.values()),l=Array.from(this.g.keys()),d=[];for(let m=0;m<l.length;m++){const A=a[m];for(let P=0;P<A.length;P++)d.push(l[m])}return d},r.V=function(a){mt(this);let l=[];if(typeof a=="string")Zu(this,a)&&(l=l.concat(this.g.get(Pn(this,a))));else{a=Array.from(this.g.values());for(let d=0;d<a.length;d++)l=l.concat(a[d])}return l},r.set=function(a,l){return mt(this),this.i=null,a=Pn(this,a),Zu(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[l]),this.h+=1,this},r.get=function(a,l){return a?(a=this.V(a),0<a.length?String(a[0]):l):l};function ec(a,l,d){Xu(a,l),0<d.length&&(a.i=null,a.g.set(Pn(a,l),x(d)),a.h+=d.length)}r.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],l=Array.from(this.g.keys());for(var d=0;d<l.length;d++){var m=l[d];const P=encodeURIComponent(String(m)),O=this.V(m);for(m=0;m<O.length;m++){var A=P;O[m]!==""&&(A+="="+encodeURIComponent(String(O[m]))),a.push(A)}}return this.i=a.join("&")};function Pn(a,l){return l=String(l),a.j&&(l=l.toLowerCase()),l}function Rm(a,l){l&&!a.j&&(mt(a),a.i=null,a.g.forEach(function(d,m){var A=m.toLowerCase();m!=A&&(Xu(this,m),ec(this,A,d))},a)),a.j=l}function bm(a,l){const d=new Cr;if(u.Image){const m=new Image;m.onload=R(pt,d,"TestLoadImage: loaded",!0,l,m),m.onerror=R(pt,d,"TestLoadImage: error",!1,l,m),m.onabort=R(pt,d,"TestLoadImage: abort",!1,l,m),m.ontimeout=R(pt,d,"TestLoadImage: timeout",!1,l,m),u.setTimeout(function(){m.ontimeout&&m.ontimeout()},1e4),m.src=a}else l(!1)}function Sm(a,l){const d=new Cr,m=new AbortController,A=setTimeout(()=>{m.abort(),pt(d,"TestPingServer: timeout",!1,l)},1e4);fetch(a,{signal:m.signal}).then(P=>{clearTimeout(A),P.ok?pt(d,"TestPingServer: ok",!0,l):pt(d,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(A),pt(d,"TestPingServer: error",!1,l)})}function pt(a,l,d,m,A){try{A&&(A.onload=null,A.onerror=null,A.onabort=null,A.ontimeout=null),m(d)}catch{}}function Pm(){this.g=new lm}function Cm(a,l,d){const m=d||"";try{Wu(a,function(A,P){let O=A;h(A)&&(O=lo(A)),l.push(m+P+"="+encodeURIComponent(O))})}catch(A){throw l.push(m+"type="+encodeURIComponent("_badmap")),A}}function qi(a){this.l=a.Ub||null,this.j=a.eb||!1}V(qi,ho),qi.prototype.g=function(){return new ji(this.l,this.j)},qi.prototype.i=function(a){return function(){return a}}({});function ji(a,l){Ce.call(this),this.D=a,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}V(ji,Ce),r=ji.prototype,r.open=function(a,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=a,this.A=l,this.readyState=1,Or(this)},r.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const l={headers:this.u,method:this.B,credentials:this.m,cache:void 0};a&&(l.body=a),(this.D||u).fetch(new Request(this.A,l)).then(this.Sa.bind(this),this.ga.bind(this))},r.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Nr(this)),this.readyState=0},r.Sa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,Or(this)),this.g&&(this.readyState=3,Or(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof u.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;tc(this)}else a.text().then(this.Ra.bind(this),this.ga.bind(this))};function tc(a){a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a))}r.Pa=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var l=a.value?a.value:new Uint8Array(0);(l=this.v.decode(l,{stream:!a.done}))&&(this.response=this.responseText+=l)}a.done?Nr(this):Or(this),this.readyState==3&&tc(this)}},r.Ra=function(a){this.g&&(this.response=this.responseText=a,Nr(this))},r.Qa=function(a){this.g&&(this.response=a,Nr(this))},r.ga=function(){this.g&&Nr(this)};function Nr(a){a.readyState=4,a.l=null,a.j=null,a.v=null,Or(a)}r.setRequestHeader=function(a,l){this.u.append(a,l)},r.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},r.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],l=this.h.entries();for(var d=l.next();!d.done;)d=d.value,a.push(d[0]+": "+d[1]),d=l.next();return a.join(`\r
`)};function Or(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(ji.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function nc(a){let l="";return G(a,function(d,m){l+=m,l+=":",l+=d,l+=`\r
`}),l}function Eo(a,l,d){e:{for(m in d){var m=!1;break e}m=!0}m||(d=nc(d),typeof a=="string"?d!=null&&encodeURIComponent(String(d)):oe(a,l,d))}function pe(a){Ce.call(this),this.headers=new Map,this.o=a||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}V(pe,Ce);var Vm=/^https?$/i,Dm=["POST","PUT"];r=pe.prototype,r.Ha=function(a){this.J=a},r.ea=function(a,l,d,m){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);l=l?l.toUpperCase():"GET",this.D=a,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():po.g(),this.v=this.o?Du(this.o):Du(po),this.g.onreadystatechange=_(this.Ea,this);try{this.B=!0,this.g.open(l,String(a),!0),this.B=!1}catch(P){rc(this,P);return}if(a=d||"",d=new Map(this.headers),m)if(Object.getPrototypeOf(m)===Object.prototype)for(var A in m)d.set(A,m[A]);else if(typeof m.keys=="function"&&typeof m.get=="function")for(const P of m.keys())d.set(P,m.get(P));else throw Error("Unknown input type for opt_headers: "+String(m));m=Array.from(d.keys()).find(P=>P.toLowerCase()=="content-type"),A=u.FormData&&a instanceof u.FormData,!(0<=Array.prototype.indexOf.call(Dm,l,void 0))||m||A||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[P,O]of d)this.g.setRequestHeader(P,O);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{oc(this),this.u=!0,this.g.send(a),this.u=!1}catch(P){rc(this,P)}};function rc(a,l){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=l,a.m=5,ic(a),zi(a)}function ic(a){a.A||(a.A=!0,Me(a,"complete"),Me(a,"error"))}r.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=a||7,Me(this,"complete"),Me(this,"abort"),zi(this))},r.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),zi(this,!0)),pe.aa.N.call(this)},r.Ea=function(){this.s||(this.B||this.u||this.j?sc(this):this.bb())},r.bb=function(){sc(this)};function sc(a){if(a.h&&typeof o<"u"&&(!a.v[1]||et(a)!=4||a.Z()!=2)){if(a.u&&et(a)==4)Su(a.Ea,0,a);else if(Me(a,"readystatechange"),et(a)==4){a.h=!1;try{const O=a.Z();e:switch(O){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break e;default:l=!1}var d;if(!(d=l)){var m;if(m=O===0){var A=String(a.D).match(Hu)[1]||null;!A&&u.self&&u.self.location&&(A=u.self.location.protocol.slice(0,-1)),m=!Vm.test(A?A.toLowerCase():"")}d=m}if(d)Me(a,"complete"),Me(a,"success");else{a.m=6;try{var P=2<et(a)?a.g.statusText:""}catch{P=""}a.l=P+" ["+a.Z()+"]",ic(a)}}finally{zi(a)}}}}function zi(a,l){if(a.g){oc(a);const d=a.g,m=a.v[0]?()=>{}:null;a.g=null,a.v=null,l||Me(a,"ready");try{d.onreadystatechange=m}catch{}}}function oc(a){a.I&&(u.clearTimeout(a.I),a.I=null)}r.isActive=function(){return!!this.g};function et(a){return a.g?a.g.readyState:0}r.Z=function(){try{return 2<et(this)?this.g.status:-1}catch{return-1}},r.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},r.Oa=function(a){if(this.g){var l=this.g.responseText;return a&&l.indexOf(a)==0&&(l=l.substring(a.length)),cm(l)}};function ac(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.H){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function km(a){const l={};a=(a.g&&2<=et(a)&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let m=0;m<a.length;m++){if(j(a[m]))continue;var d=E(a[m]);const A=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const P=l[A]||[];l[A]=P,P.push(d)}T(l,function(m){return m.join(", ")})}r.Ba=function(){return this.m},r.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Mr(a,l,d){return d&&d.internalChannelParams&&d.internalChannelParams[a]||l}function uc(a){this.Aa=0,this.i=[],this.j=new Cr,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Mr("failFast",!1,a),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Mr("baseRetryDelayMs",5e3,a),this.cb=Mr("retryDelaySeedMs",1e4,a),this.Wa=Mr("forwardChannelMaxRetries",2,a),this.wa=Mr("forwardChannelRequestTimeoutMs",2e4,a),this.pa=a&&a.xmlHttpFactory||void 0,this.Xa=a&&a.Tb||void 0,this.Ca=a&&a.useFetchStreams||!1,this.L=void 0,this.J=a&&a.supportsCrossDomainXhr||!1,this.K="",this.h=new zu(a&&a.concurrentRequestLimit),this.Da=new Pm,this.P=a&&a.fastHandshake||!1,this.O=a&&a.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=a&&a.Rb||!1,a&&a.xa&&this.j.xa(),a&&a.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&a&&a.detectBufferingProxy||!1,this.ja=void 0,a&&a.longPollingTimeout&&0<a.longPollingTimeout&&(this.ja=a.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}r=uc.prototype,r.la=8,r.G=1,r.connect=function(a,l,d,m){Le(0),this.W=a,this.H=l||{},d&&m!==void 0&&(this.H.OSID=d,this.H.OAID=m),this.F=this.X,this.I=_c(this,null,this.W),$i(this)};function wo(a){if(cc(a),a.G==3){var l=a.U++,d=Ze(a.I);if(oe(d,"SID",a.K),oe(d,"RID",l),oe(d,"TYPE","terminate"),Lr(a,d),l=new ft(a,a.j,l),l.L=2,l.v=Bi(Ze(d)),d=!1,u.navigator&&u.navigator.sendBeacon)try{d=u.navigator.sendBeacon(l.v.toString(),"")}catch{}!d&&u.Image&&(new Image().src=l.v,d=!0),d||(l.g=yc(l.j,null),l.g.ea(l.v)),l.F=Date.now(),Li(l)}gc(a)}function Gi(a){a.g&&(Ro(a),a.g.cancel(),a.g=null)}function cc(a){Gi(a),a.u&&(u.clearTimeout(a.u),a.u=null),Ki(a),a.h.cancel(),a.s&&(typeof a.s=="number"&&u.clearTimeout(a.s),a.s=null)}function $i(a){if(!Gu(a.h)&&!a.s){a.s=!0;var l=a.Ga;Er||Eu(),wr||(Er(),wr=!0),no.add(l,a),a.B=0}}function xm(a,l){return $u(a.h)>=a.h.j-(a.s?1:0)?!1:a.s?(a.i=l.D.concat(a.i),!0):a.G==1||a.G==2||a.B>=(a.Va?0:a.Wa)?!1:(a.s=Pr(_(a.Ga,a,l),pc(a,a.B)),a.B++,!0)}r.Ga=function(a){if(this.s)if(this.s=null,this.G==1){if(!a){this.U=Math.floor(1e5*Math.random()),a=this.U++;const A=new ft(this,this.j,a);let P=this.o;if(this.S&&(P?(P=g(P),v(P,this.S)):P=this.S),this.m!==null||this.O||(A.H=P,P=null),this.P)e:{for(var l=0,d=0;d<this.i.length;d++){t:{var m=this.i[d];if("__data__"in m.map&&(m=m.map.__data__,typeof m=="string")){m=m.length;break t}m=void 0}if(m===void 0)break;if(l+=m,4096<l){l=d;break e}if(l===4096||d===this.i.length-1){l=d+1;break e}}l=1e3}else l=1e3;l=hc(this,A,l),d=Ze(this.I),oe(d,"RID",a),oe(d,"CVER",22),this.D&&oe(d,"X-HTTP-Session-Id",this.D),Lr(this,d),P&&(this.O?l="headers="+encodeURIComponent(String(nc(P)))+"&"+l:this.m&&Eo(d,this.m,P)),vo(this.h,A),this.Ua&&oe(d,"TYPE","init"),this.P?(oe(d,"$req",l),oe(d,"SID","null"),A.T=!0,_o(A,d,null)):_o(A,d,l),this.G=2}}else this.G==3&&(a?lc(this,a):this.i.length==0||Gu(this.h)||lc(this))};function lc(a,l){var d;l?d=l.l:d=a.U++;const m=Ze(a.I);oe(m,"SID",a.K),oe(m,"RID",d),oe(m,"AID",a.T),Lr(a,m),a.m&&a.o&&Eo(m,a.m,a.o),d=new ft(a,a.j,d,a.B+1),a.m===null&&(d.H=a.o),l&&(a.i=l.D.concat(a.i)),l=hc(a,d,1e3),d.I=Math.round(.5*a.wa)+Math.round(.5*a.wa*Math.random()),vo(a.h,d),_o(d,m,l)}function Lr(a,l){a.H&&G(a.H,function(d,m){oe(l,m,d)}),a.l&&Wu({},function(d,m){oe(l,m,d)})}function hc(a,l,d){d=Math.min(a.i.length,d);var m=a.l?_(a.l.Na,a.l,a):null;e:{var A=a.i;let P=-1;for(;;){const O=["count="+d];P==-1?0<d?(P=A[0].g,O.push("ofs="+P)):P=0:O.push("ofs="+P);let ie=!0;for(let Re=0;Re<d;Re++){let ee=A[Re].g;const Ve=A[Re].map;if(ee-=P,0>ee)P=Math.max(0,A[Re].g-100),ie=!1;else try{Cm(Ve,O,"req"+ee+"_")}catch{m&&m(Ve)}}if(ie){m=O.join("&");break e}}}return a=a.i.splice(0,d),l.D=a,m}function dc(a){if(!a.g&&!a.u){a.Y=1;var l=a.Fa;Er||Eu(),wr||(Er(),wr=!0),no.add(l,a),a.v=0}}function Ao(a){return a.g||a.u||3<=a.v?!1:(a.Y++,a.u=Pr(_(a.Fa,a),pc(a,a.v)),a.v++,!0)}r.Fa=function(){if(this.u=null,fc(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var a=2*this.R;this.j.info("BP detection timer enabled: "+a),this.A=Pr(_(this.ab,this),a)}},r.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Le(10),Gi(this),fc(this))};function Ro(a){a.A!=null&&(u.clearTimeout(a.A),a.A=null)}function fc(a){a.g=new ft(a,a.j,"rpc",a.Y),a.m===null&&(a.g.H=a.o),a.g.O=0;var l=Ze(a.qa);oe(l,"RID","rpc"),oe(l,"SID",a.K),oe(l,"AID",a.T),oe(l,"CI",a.F?"0":"1"),!a.F&&a.ja&&oe(l,"TO",a.ja),oe(l,"TYPE","xmlhttp"),Lr(a,l),a.m&&a.o&&Eo(l,a.m,a.o),a.L&&(a.g.I=a.L);var d=a.g;a=a.ia,d.L=1,d.v=Bi(Ze(l)),d.m=null,d.P=!0,Bu(d,a)}r.Za=function(){this.C!=null&&(this.C=null,Gi(this),Ao(this),Le(19))};function Ki(a){a.C!=null&&(u.clearTimeout(a.C),a.C=null)}function mc(a,l){var d=null;if(a.g==l){Ki(a),Ro(a),a.g=null;var m=2}else if(To(a.h,l))d=l.D,Ku(a.h,l),m=1;else return;if(a.G!=0){if(l.o)if(m==1){d=l.m?l.m.length:0,l=Date.now()-l.F;var A=a.B;m=Ni(),Me(m,new Mu(m,d)),$i(a)}else dc(a);else if(A=l.s,A==3||A==0&&0<l.X||!(m==1&&xm(a,l)||m==2&&Ao(a)))switch(d&&0<d.length&&(l=a.h,l.i=l.i.concat(d)),A){case 1:Yt(a,5);break;case 4:Yt(a,10);break;case 3:Yt(a,6);break;default:Yt(a,2)}}}function pc(a,l){let d=a.Ta+Math.floor(Math.random()*a.cb);return a.isActive()||(d*=2),d*l}function Yt(a,l){if(a.j.info("Error code "+l),l==2){var d=_(a.fb,a),m=a.Xa;const A=!m;m=new Jt(m||"//www.google.com/images/cleardot.gif"),u.location&&u.location.protocol=="http"||Fi(m,"https"),Bi(m),A?bm(m.toString(),d):Sm(m.toString(),d)}else Le(2);a.G=0,a.l&&a.l.sa(l),gc(a),cc(a)}r.fb=function(a){a?(this.j.info("Successfully pinged google.com"),Le(2)):(this.j.info("Failed to ping google.com"),Le(1))};function gc(a){if(a.G=0,a.ka=[],a.l){const l=Qu(a.h);(l.length!=0||a.i.length!=0)&&(C(a.ka,l),C(a.ka,a.i),a.h.i.length=0,x(a.i),a.i.length=0),a.l.ra()}}function _c(a,l,d){var m=d instanceof Jt?Ze(d):new Jt(d);if(m.g!="")l&&(m.g=l+"."+m.g),Ui(m,m.s);else{var A=u.location;m=A.protocol,l=l?l+"."+A.hostname:A.hostname,A=+A.port;var P=new Jt(null);m&&Fi(P,m),l&&(P.g=l),A&&Ui(P,A),d&&(P.l=d),m=P}return d=a.D,l=a.ya,d&&l&&oe(m,d,l),oe(m,"VER",a.la),Lr(a,m),m}function yc(a,l,d){if(l&&!a.J)throw Error("Can't create secondary domain capable XhrIo object.");return l=a.Ca&&!a.pa?new pe(new qi({eb:d})):new pe(a.pa),l.Ha(a.J),l}r.isActive=function(){return!!this.l&&this.l.isActive(this)};function Ic(){}r=Ic.prototype,r.ua=function(){},r.ta=function(){},r.sa=function(){},r.ra=function(){},r.isActive=function(){return!0},r.Na=function(){};function Qi(){}Qi.prototype.g=function(a,l){return new je(a,l)};function je(a,l){Ce.call(this),this.g=new uc(l),this.l=a,this.h=l&&l.messageUrlParams||null,a=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(a?a["X-WebChannel-Content-Type"]=l.messageContentType:a={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.va&&(a?a["X-WebChannel-Client-Profile"]=l.va:a={"X-WebChannel-Client-Profile":l.va}),this.g.S=a,(a=l&&l.Sb)&&!j(a)&&(this.g.m=a),this.v=l&&l.supportsCrossDomainXhr||!1,this.u=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!j(l)&&(this.g.D=l,a=this.h,a!==null&&l in a&&(a=this.h,l in a&&delete a[l])),this.j=new Cn(this)}V(je,Ce),je.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},je.prototype.close=function(){wo(this.g)},je.prototype.o=function(a){var l=this.g;if(typeof a=="string"){var d={};d.__data__=a,a=d}else this.u&&(d={},d.__data__=lo(a),a=d);l.i.push(new gm(l.Ya++,a)),l.G==3&&$i(l)},je.prototype.N=function(){this.g.l=null,delete this.j,wo(this.g),delete this.g,je.aa.N.call(this)};function Tc(a){fo.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var l=a.__sm__;if(l){e:{for(const d in l){a=d;break e}a=void 0}(this.i=a)&&(a=this.i,l=l!==null&&a in l?l[a]:void 0),this.data=l}else this.data=a}V(Tc,fo);function vc(){mo.call(this),this.status=1}V(vc,mo);function Cn(a){this.g=a}V(Cn,Ic),Cn.prototype.ua=function(){Me(this.g,"a")},Cn.prototype.ta=function(a){Me(this.g,new Tc(a))},Cn.prototype.sa=function(a){Me(this.g,new vc)},Cn.prototype.ra=function(){Me(this.g,"b")},Qi.prototype.createWebChannel=Qi.prototype.g,je.prototype.send=je.prototype.o,je.prototype.open=je.prototype.m,je.prototype.close=je.prototype.close,Ph=function(){return new Qi},Sh=function(){return Ni()},bh=Wt,$o={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Oi.NO_ERROR=0,Oi.TIMEOUT=8,Oi.HTTP_ERROR=6,is=Oi,Lu.COMPLETE="complete",Rh=Lu,ku.EventType=br,br.OPEN="a",br.CLOSE="b",br.ERROR="c",br.MESSAGE="d",Ce.prototype.listen=Ce.prototype.K,zr=ku,pe.prototype.listenOnce=pe.prototype.L,pe.prototype.getLastError=pe.prototype.Ka,pe.prototype.getLastErrorCode=pe.prototype.Ba,pe.prototype.getStatus=pe.prototype.Z,pe.prototype.getResponseJson=pe.prototype.Oa,pe.prototype.getResponseText=pe.prototype.oa,pe.prototype.send=pe.prototype.ea,pe.prototype.setWithCredentials=pe.prototype.Ha,Ah=pe}).apply(typeof Ji<"u"?Ji:typeof self<"u"?self:typeof window<"u"?window:{});const jc="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ee{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Ee.UNAUTHENTICATED=new Ee(null),Ee.GOOGLE_CREDENTIALS=new Ee("google-credentials-uid"),Ee.FIRST_PARTY=new Ee("first-party-uid"),Ee.MOCK_USER=new Ee("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let cr="10.14.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kt=new fa("@firebase/firestore");function On(){return kt.logLevel}function a_(r){kt.setLogLevel(r)}function k(r,...e){if(kt.logLevel<=H.DEBUG){const t=e.map(Ea);kt.debug(`Firestore (${cr}): ${r}`,...t)}}function _e(r,...e){if(kt.logLevel<=H.ERROR){const t=e.map(Ea);kt.error(`Firestore (${cr}): ${r}`,...t)}}function ze(r,...e){if(kt.logLevel<=H.WARN){const t=e.map(Ea);kt.warn(`Firestore (${cr}): ${r}`,...t)}}function Ea(r){if(typeof r=="string")return r;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(t){return JSON.stringify(t)}(r)}catch{return r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function L(r="Unexpected state"){const e=`FIRESTORE (${cr}) INTERNAL ASSERTION FAILED: `+r;throw _e(e),new Error(e)}function U(r,e){r||L()}function u_(r,e){r||L()}function N(r,e){return r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const S={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class D extends at{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class we{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ch{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class Vh{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(Ee.UNAUTHENTICATED))}shutdown(){}}class c_{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class l_{constructor(e){this.t=e,this.currentUser=Ee.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){U(this.o===void 0);let n=this.i;const i=c=>this.i!==n?(n=this.i,t(c)):Promise.resolve();let s=new we;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new we,e.enqueueRetryable(()=>i(this.currentUser))};const o=()=>{const c=s;e.enqueueRetryable(async()=>{await c.promise,await i(this.currentUser)})},u=c=>{k("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(c=>u(c)),setTimeout(()=>{if(!this.auth){const c=this.t.getImmediate({optional:!0});c?u(c):(k("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new we)}},0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(n=>this.i!==e?(k("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):n?(U(typeof n.accessToken=="string"),new Ch(n.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return U(e===null||typeof e=="string"),new Ee(e)}}class h_{constructor(e,t,n){this.l=e,this.h=t,this.P=n,this.type="FirstParty",this.user=Ee.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class d_{constructor(e,t,n){this.l=e,this.h=t,this.P=n}getToken(){return Promise.resolve(new h_(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable(()=>t(Ee.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Dh{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class f_{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,t){U(this.o===void 0);const n=s=>{s.error!=null&&k("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);const o=s.token!==this.R;return this.R=s.token,k("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable(()=>n(s))};const i=s=>{k("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(s=>i(s)),setTimeout(()=>{if(!this.appCheck){const s=this.A.getImmediate({optional:!0});s?i(s):k("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(U(typeof t.token=="string"),this.R=t.token,new Dh(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}class m_{getToken(){return Promise.resolve(new Dh(""))}invalidateToken(){}start(e,t){}shutdown(){}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function p_(r){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(r);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let n=0;n<r;n++)t[n]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wa{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length;let n="";for(;n.length<20;){const i=p_(40);for(let s=0;s<i.length;++s)n.length<20&&i[s]<t&&(n+=e.charAt(i[s]%e.length))}return n}}function z(r,e){return r<e?-1:r>e?1:0}function Wn(r,e,t){return r.length===e.length&&r.every((n,i)=>t(n,e[i]))}function kh(r){return r+"\0"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class he{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new D(S.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new D(S.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new D(S.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new D(S.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return he.fromMillis(Date.now())}static fromDate(e){return he.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),n=Math.floor(1e6*(e-1e3*t));return new he(t,n)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?z(this.nanoseconds,e.nanoseconds):z(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class q{constructor(e){this.timestamp=e}static fromTimestamp(e){return new q(e)}static min(){return new q(new he(0,0))}static max(){return new q(new he(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ni{constructor(e,t,n){t===void 0?t=0:t>e.length&&L(),n===void 0?n=e.length-t:n>e.length-t&&L(),this.segments=e,this.offset=t,this.len=n}get length(){return this.len}isEqual(e){return ni.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof ni?e.forEach(n=>{t.push(n)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,n=this.limit();t<n;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const n=Math.min(e.length,t.length);for(let i=0;i<n;i++){const s=e.get(i),o=t.get(i);if(s<o)return-1;if(s>o)return 1}return e.length<t.length?-1:e.length>t.length?1:0}}class J extends ni{construct(e,t,n){return new J(e,t,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const n of e){if(n.indexOf("//")>=0)throw new D(S.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);t.push(...n.split("/").filter(i=>i.length>0))}return new J(t)}static emptyPath(){return new J([])}}const g_=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ue extends ni{construct(e,t,n){return new ue(e,t,n)}static isValidIdentifier(e){return g_.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ue.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new ue(["__name__"])}static fromServerFormat(e){const t=[];let n="",i=0;const s=()=>{if(n.length===0)throw new D(S.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(n),n=""};let o=!1;for(;i<e.length;){const u=e[i];if(u==="\\"){if(i+1===e.length)throw new D(S.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const c=e[i+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new D(S.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);n+=c,i+=2}else u==="`"?(o=!o,i++):u!=="."||o?(n+=u,i++):(s(),i++)}if(s(),o)throw new D(S.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new ue(t)}static emptyPath(){return new ue([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M{constructor(e){this.path=e}static fromPath(e){return new M(J.fromString(e))}static fromName(e){return new M(J.fromString(e).popFirst(5))}static empty(){return new M(J.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&J.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return J.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new M(new J(e.slice()))}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hn{constructor(e,t,n,i){this.indexId=e,this.collectionGroup=t,this.fields=n,this.indexState=i}}function Ko(r){return r.fields.find(e=>e.kind===2)}function en(r){return r.fields.filter(e=>e.kind!==2)}function __(r,e){let t=z(r.collectionGroup,e.collectionGroup);if(t!==0)return t;for(let n=0;n<Math.min(r.fields.length,e.fields.length);++n)if(t=y_(r.fields[n],e.fields[n]),t!==0)return t;return z(r.fields.length,e.fields.length)}Hn.UNKNOWN_ID=-1;class cn{constructor(e,t){this.fieldPath=e,this.kind=t}}function y_(r,e){const t=ue.comparator(r.fieldPath,e.fieldPath);return t!==0?t:z(r.kind,e.kind)}class Jn{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new Jn(0,Ge.min())}}function xh(r,e){const t=r.toTimestamp().seconds,n=r.toTimestamp().nanoseconds+1,i=q.fromTimestamp(n===1e9?new he(t+1,0):new he(t,n));return new Ge(i,M.empty(),e)}function Nh(r){return new Ge(r.readTime,r.key,-1)}class Ge{constructor(e,t,n){this.readTime=e,this.documentKey=t,this.largestBatchId=n}static min(){return new Ge(q.min(),M.empty(),-1)}static max(){return new Ge(q.max(),M.empty(),-1)}}function Aa(r,e){let t=r.readTime.compareTo(e.readTime);return t!==0?t:(t=M.comparator(r.documentKey,e.documentKey),t!==0?t:z(r.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oh="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Mh{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qt(r){if(r.code!==S.FAILED_PRECONDITION||r.message!==Oh)throw r;k("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class w{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&L(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new w((n,i)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(n,i)},this.catchCallback=s=>{this.wrapFailure(t,s).next(n,i)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof w?t:w.resolve(t)}catch(t){return w.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):w.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):w.reject(t)}static resolve(e){return new w((t,n)=>{t(e)})}static reject(e){return new w((t,n)=>{n(e)})}static waitFor(e){return new w((t,n)=>{let i=0,s=0,o=!1;e.forEach(u=>{++i,u.next(()=>{++s,o&&s===i&&t()},c=>n(c))}),o=!0,s===i&&t()})}static or(e){let t=w.resolve(!1);for(const n of e)t=t.next(i=>i?w.resolve(i):n());return t}static forEach(e,t){const n=[];return e.forEach((i,s)=>{n.push(t.call(this,i,s))}),this.waitFor(n)}static mapArray(e,t){return new w((n,i)=>{const s=e.length,o=new Array(s);let u=0;for(let c=0;c<s;c++){const h=c;t(e[h]).next(f=>{o[h]=f,++u,u===s&&n(o)},f=>i(f))}})}static doWhile(e,t){return new w((n,i)=>{const s=()=>{e()===!0?t().next(()=>{s()},i):n()};s()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ns{constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.V=new we,this.transaction.oncomplete=()=>{this.V.resolve()},this.transaction.onabort=()=>{t.error?this.V.reject(new Wr(e,t.error)):this.V.resolve()},this.transaction.onerror=n=>{const i=Ra(n.target.error);this.V.reject(new Wr(e,i))}}static open(e,t,n,i){try{return new Ns(t,e.transaction(i,n))}catch(s){throw new Wr(t,s)}}get m(){return this.V.promise}abort(e){e&&this.V.reject(e),this.aborted||(k("SimpleDb","Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}g(){const e=this.transaction;this.aborted||typeof e.commit!="function"||e.commit()}store(e){const t=this.transaction.objectStore(e);return new T_(t)}}class He{constructor(e,t,n){this.name=e,this.version=t,this.p=n,He.S(qe())===12.2&&_e("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}static delete(e){return k("SimpleDb","Removing database:",e),tn(window.indexedDB.deleteDatabase(e)).toPromise()}static D(){if(!sh())return!1;if(He.v())return!0;const e=qe(),t=He.S(e),n=0<t&&t<10,i=Lh(e),s=0<i&&i<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||n||s)}static v(){var e;return typeof process<"u"&&((e=process.__PRIVATE_env)===null||e===void 0?void 0:e.C)==="YES"}static F(e,t){return e.store(t)}static S(e){const t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),n=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(n)}async M(e){return this.db||(k("SimpleDb","Opening database:",this.name),this.db=await new Promise((t,n)=>{const i=indexedDB.open(this.name,this.version);i.onsuccess=s=>{const o=s.target.result;t(o)},i.onblocked=()=>{n(new Wr(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},i.onerror=s=>{const o=s.target.error;o.name==="VersionError"?n(new D(S.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):o.name==="InvalidStateError"?n(new D(S.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+o)):n(new Wr(e,o))},i.onupgradeneeded=s=>{k("SimpleDb",'Database "'+this.name+'" requires upgrade from version:',s.oldVersion);const o=s.target.result;this.p.O(o,i.transaction,s.oldVersion,this.version).next(()=>{k("SimpleDb","Database upgrade to version "+this.version+" complete")})}})),this.N&&(this.db.onversionchange=t=>this.N(t)),this.db}L(e){this.N=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,n,i){const s=t==="readonly";let o=0;for(;;){++o;try{this.db=await this.M(e);const u=Ns.open(this.db,e,s?"readonly":"readwrite",n),c=i(u).next(h=>(u.g(),h)).catch(h=>(u.abort(h),w.reject(h))).toPromise();return c.catch(()=>{}),await u.m,c}catch(u){const c=u,h=c.name!=="FirebaseError"&&o<3;if(k("SimpleDb","Transaction failed with error:",c.message,"Retrying:",h),this.close(),!h)return Promise.reject(c)}}}close(){this.db&&this.db.close(),this.db=void 0}}function Lh(r){const e=r.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}class I_{constructor(e){this.B=e,this.k=!1,this.q=null}get isDone(){return this.k}get K(){return this.q}set cursor(e){this.B=e}done(){this.k=!0}$(e){this.q=e}delete(){return tn(this.B.delete())}}class Wr extends D{constructor(e,t){super(S.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function jt(r){return r.name==="IndexedDbTransactionError"}class T_{constructor(e){this.store=e}put(e,t){let n;return t!==void 0?(k("SimpleDb","PUT",this.store.name,e,t),n=this.store.put(t,e)):(k("SimpleDb","PUT",this.store.name,"<auto-key>",e),n=this.store.put(e)),tn(n)}add(e){return k("SimpleDb","ADD",this.store.name,e,e),tn(this.store.add(e))}get(e){return tn(this.store.get(e)).next(t=>(t===void 0&&(t=null),k("SimpleDb","GET",this.store.name,e,t),t))}delete(e){return k("SimpleDb","DELETE",this.store.name,e),tn(this.store.delete(e))}count(){return k("SimpleDb","COUNT",this.store.name),tn(this.store.count())}U(e,t){const n=this.options(e,t),i=n.index?this.store.index(n.index):this.store;if(typeof i.getAll=="function"){const s=i.getAll(n.range);return new w((o,u)=>{s.onerror=c=>{u(c.target.error)},s.onsuccess=c=>{o(c.target.result)}})}{const s=this.cursor(n),o=[];return this.W(s,(u,c)=>{o.push(c)}).next(()=>o)}}G(e,t){const n=this.store.getAll(e,t===null?void 0:t);return new w((i,s)=>{n.onerror=o=>{s(o.target.error)},n.onsuccess=o=>{i(o.target.result)}})}j(e,t){k("SimpleDb","DELETE ALL",this.store.name);const n=this.options(e,t);n.H=!1;const i=this.cursor(n);return this.W(i,(s,o,u)=>u.delete())}J(e,t){let n;t?n=e:(n={},t=e);const i=this.cursor(n);return this.W(i,t)}Y(e){const t=this.cursor({});return new w((n,i)=>{t.onerror=s=>{const o=Ra(s.target.error);i(o)},t.onsuccess=s=>{const o=s.target.result;o?e(o.primaryKey,o.value).next(u=>{u?o.continue():n()}):n()}})}W(e,t){const n=[];return new w((i,s)=>{e.onerror=o=>{s(o.target.error)},e.onsuccess=o=>{const u=o.target.result;if(!u)return void i();const c=new I_(u),h=t(u.primaryKey,u.value,c);if(h instanceof w){const f=h.catch(p=>(c.done(),w.reject(p)));n.push(f)}c.isDone?i():c.K===null?u.continue():u.continue(c.K)}}).next(()=>w.waitFor(n))}options(e,t){let n;return e!==void 0&&(typeof e=="string"?n=e:t=e),{index:n,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){const n=this.store.index(e.index);return e.H?n.openKeyCursor(e.range,t):n.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function tn(r){return new w((e,t)=>{r.onsuccess=n=>{const i=n.target.result;e(i)},r.onerror=n=>{const i=Ra(n.target.error);t(i)}})}let zc=!1;function Ra(r){const e=He.S(qe());if(e>=12.2&&e<13){const t="An internal error was encountered in the Indexed Database server";if(r.message.indexOf(t)>=0){const n=new D("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return zc||(zc=!0,setTimeout(()=>{throw n},0)),n}}return r}class v_{constructor(e,t){this.asyncQueue=e,this.Z=t,this.task=null}start(){this.X(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}X(e){k("IndexBackfiller",`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,async()=>{this.task=null;try{k("IndexBackfiller",`Documents written: ${await this.Z.ee()}`)}catch(t){jt(t)?k("IndexBackfiller","Ignoring IndexedDB error during index backfill: ",t):await qt(t)}await this.X(6e4)})}}class E_{constructor(e,t){this.localStore=e,this.persistence=t}async ee(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",t=>this.te(t,e))}te(e,t){const n=new Set;let i=t,s=!0;return w.doWhile(()=>s===!0&&i>0,()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next(o=>{if(o!==null&&!n.has(o))return k("IndexBackfiller",`Processing collection: ${o}`),this.ne(e,o,i).next(u=>{i-=u,n.add(o)});s=!1})).next(()=>t-i)}ne(e,t,n){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next(i=>this.localStore.localDocuments.getNextDocuments(e,t,i,n).next(s=>{const o=s.changes;return this.localStore.indexManager.updateIndexEntries(e,o).next(()=>this.re(i,s)).next(u=>(k("IndexBackfiller",`Updating offset: ${u}`),this.localStore.indexManager.updateCollectionGroup(e,t,u))).next(()=>o.size)}))}re(e,t){let n=e;return t.changes.forEach((i,s)=>{const o=Nh(s);Aa(o,n)>0&&(n=o)}),new Ge(n.readTime,n.documentKey,Math.max(t.batchId,e.largestBatchId))}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fe{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=n=>this.ie(n),this.se=n=>t.writeSequenceNumber(n))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}Fe.oe=-1;function pi(r){return r==null}function ri(r){return r===0&&1/r==-1/0}function Fh(r){return typeof r=="number"&&Number.isInteger(r)&&!ri(r)&&r<=Number.MAX_SAFE_INTEGER&&r>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ne(r){let e="";for(let t=0;t<r.length;t++)e.length>0&&(e=Gc(e)),e=w_(r.get(t),e);return Gc(e)}function w_(r,e){let t=e;const n=r.length;for(let i=0;i<n;i++){const s=r.charAt(i);switch(s){case"\0":t+="";break;case"":t+="";break;default:t+=s}}return t}function Gc(r){return r+""}function Qe(r){const e=r.length;if(U(e>=2),e===2)return U(r.charAt(0)===""&&r.charAt(1)===""),J.emptyPath();const t=e-2,n=[];let i="";for(let s=0;s<e;){const o=r.indexOf("",s);switch((o<0||o>t)&&L(),r.charAt(o+1)){case"":const u=r.substring(s,o);let c;i.length===0?c=u:(i+=u,c=i,i=""),n.push(c);break;case"":i+=r.substring(s,o),i+="\0";break;case"":i+=r.substring(s,o+1);break;default:L()}s=o+2}return new J(n)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $c=["userId","batchId"];/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ss(r,e){return[r,Ne(e)]}function Uh(r,e,t){return[r,Ne(e),t]}const A_={},R_=["prefixPath","collectionGroup","readTime","documentId"],b_=["prefixPath","collectionGroup","documentId"],S_=["collectionGroup","readTime","prefixPath","documentId"],P_=["canonicalId","targetId"],C_=["targetId","path"],V_=["path","targetId"],D_=["collectionId","parent"],k_=["indexId","uid"],x_=["uid","sequenceNumber"],N_=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],O_=["indexId","uid","orderedDocumentKey"],M_=["userId","collectionPath","documentId"],L_=["userId","collectionPath","largestBatchId"],F_=["userId","collectionGroup","largestBatchId"],Bh=["mutationQueues","mutations","documentMutations","remoteDocuments","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries"],U_=[...Bh,"documentOverlays"],qh=["mutationQueues","mutations","documentMutations","remoteDocumentsV14","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries","documentOverlays"],jh=qh,ba=[...jh,"indexConfiguration","indexState","indexEntries"],B_=ba,q_=[...ba,"globals"];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qo extends Mh{constructor(e,t){super(),this._e=e,this.currentSequenceNumber=t}}function Te(r,e){const t=N(r);return He.F(t._e,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kc(r){let e=0;for(const t in r)Object.prototype.hasOwnProperty.call(r,t)&&e++;return e}function zt(r,e){for(const t in r)Object.prototype.hasOwnProperty.call(r,t)&&e(t,r[t])}function zh(r,e){const t=[];for(const n in r)Object.prototype.hasOwnProperty.call(r,n)&&t.push(e(r[n],n,r));return t}function Gh(r){for(const e in r)if(Object.prototype.hasOwnProperty.call(r,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class se{constructor(e,t){this.comparator=e,this.root=t||be.EMPTY}insert(e,t){return new se(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,be.BLACK,null,null))}remove(e){return new se(this.comparator,this.root.remove(e,this.comparator).copy(null,null,be.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const n=this.comparator(e,t.key);if(n===0)return t.value;n<0?t=t.left:n>0&&(t=t.right)}return null}indexOf(e){let t=0,n=this.root;for(;!n.isEmpty();){const i=this.comparator(e,n.key);if(i===0)return t+n.left.size;i<0?n=n.left:(t+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,n)=>(e(t,n),!1))}toString(){const e=[];return this.inorderTraversal((t,n)=>(e.push(`${t}:${n}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Yi(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Yi(this.root,e,this.comparator,!1)}getReverseIterator(){return new Yi(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Yi(this.root,e,this.comparator,!0)}}class Yi{constructor(e,t,n,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?n(e.key,t):1,t&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class be{constructor(e,t,n,i,s){this.key=e,this.value=t,this.color=n??be.RED,this.left=i??be.EMPTY,this.right=s??be.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,n,i,s){return new be(e??this.key,t??this.value,n??this.color,i??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let i=this;const s=n(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,t,n),null):s===0?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,n)),i.fixUp()}removeMin(){if(this.left.isEmpty())return be.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let n,i=this;if(t(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),t(e,i.key)===0){if(i.right.isEmpty())return be.EMPTY;n=i.right.min(),i=i.copy(n.key,n.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,be.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,be.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw L();const e=this.left.check();if(e!==this.right.check())throw L();return e+(this.isRed()?0:1)}}be.EMPTY=null,be.RED=!0,be.BLACK=!1;be.EMPTY=new class{constructor(){this.size=0}get key(){throw L()}get value(){throw L()}get color(){throw L()}get left(){throw L()}get right(){throw L()}copy(e,t,n,i,s){return this}insert(e,t,n){return new be(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ne{constructor(e){this.comparator=e,this.data=new se(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,n)=>(e(t),!1))}forEachInRange(e,t){const n=this.data.getIteratorFrom(e[0]);for(;n.hasNext();){const i=n.getNext();if(this.comparator(i.key,e[1])>=0)return;t(i.key)}}forEachWhile(e,t){let n;for(n=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();n.hasNext();)if(!e(n.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Qc(this.data.getIterator())}getIteratorFrom(e){return new Qc(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(n=>{t=t.add(n)}),t}isEqual(e){if(!(e instanceof ne)||this.size!==e.size)return!1;const t=this.data.getIterator(),n=e.data.getIterator();for(;t.hasNext();){const i=t.getNext().key,s=n.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new ne(this.comparator);return t.data=e,t}}class Qc{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function Dn(r){return r.hasNext()?r.getNext():void 0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ue{constructor(e){this.fields=e,e.sort(ue.comparator)}static empty(){return new Ue([])}unionWith(e){let t=new ne(ue.comparator);for(const n of this.fields)t=t.add(n);for(const n of e)t=t.add(n);return new Ue(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Wn(this.fields,e.fields,(t,n)=>t.isEqual(n))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $h extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function j_(){return typeof atob<"u"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class me{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(i){try{return atob(i)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new $h("Invalid base64 string: "+s):s}}(e);return new me(t)}static fromUint8Array(e){const t=function(i){let s="";for(let o=0;o<i.length;++o)s+=String.fromCharCode(i[o]);return s}(e);return new me(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const n=new Uint8Array(t.length);for(let i=0;i<t.length;i++)n[i]=t.charCodeAt(i);return n}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return z(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}me.EMPTY_BYTE_STRING=new me("");const z_=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function st(r){if(U(!!r),typeof r=="string"){let e=0;const t=z_.exec(r);if(U(!!t),t[1]){let i=t[1];i=(i+"000000000").substr(0,9),e=Number(i)}const n=new Date(r);return{seconds:Math.floor(n.getTime()/1e3),nanos:e}}return{seconds:ce(r.seconds),nanos:ce(r.nanos)}}function ce(r){return typeof r=="number"?r:typeof r=="string"?Number(r):0}function ot(r){return typeof r=="string"?me.fromBase64String(r):me.fromUint8Array(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Os(r){var e,t;return((t=(((e=r==null?void 0:r.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="server_timestamp"}function Ms(r){const e=r.mapValue.fields.__previous_value__;return Os(e)?Ms(e):e}function ii(r){const e=st(r.mapValue.fields.__local_write_time__.timestampValue);return new he(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class G_{constructor(e,t,n,i,s,o,u,c,h){this.databaseId=e,this.appId=t,this.persistenceKey=n,this.host=i,this.ssl=s,this.forceLongPolling=o,this.autoDetectLongPolling=u,this.longPollingOptions=c,this.useFetchStreams=h}}class xt{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new xt("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof xt&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const St={mapValue:{fields:{__type__:{stringValue:"__max__"}}}},os={nullValue:"NULL_VALUE"};function Nt(r){return"nullValue"in r?0:"booleanValue"in r?1:"integerValue"in r||"doubleValue"in r?2:"timestampValue"in r?3:"stringValue"in r?5:"bytesValue"in r?6:"referenceValue"in r?7:"geoPointValue"in r?8:"arrayValue"in r?9:"mapValue"in r?Os(r)?4:Kh(r)?9007199254740991:Ls(r)?10:11:L()}function Ye(r,e){if(r===e)return!0;const t=Nt(r);if(t!==Nt(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return r.booleanValue===e.booleanValue;case 4:return ii(r).isEqual(ii(e));case 3:return function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;const o=st(i.timestampValue),u=st(s.timestampValue);return o.seconds===u.seconds&&o.nanos===u.nanos}(r,e);case 5:return r.stringValue===e.stringValue;case 6:return function(i,s){return ot(i.bytesValue).isEqual(ot(s.bytesValue))}(r,e);case 7:return r.referenceValue===e.referenceValue;case 8:return function(i,s){return ce(i.geoPointValue.latitude)===ce(s.geoPointValue.latitude)&&ce(i.geoPointValue.longitude)===ce(s.geoPointValue.longitude)}(r,e);case 2:return function(i,s){if("integerValue"in i&&"integerValue"in s)return ce(i.integerValue)===ce(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){const o=ce(i.doubleValue),u=ce(s.doubleValue);return o===u?ri(o)===ri(u):isNaN(o)&&isNaN(u)}return!1}(r,e);case 9:return Wn(r.arrayValue.values||[],e.arrayValue.values||[],Ye);case 10:case 11:return function(i,s){const o=i.mapValue.fields||{},u=s.mapValue.fields||{};if(Kc(o)!==Kc(u))return!1;for(const c in o)if(o.hasOwnProperty(c)&&(u[c]===void 0||!Ye(o[c],u[c])))return!1;return!0}(r,e);default:return L()}}function si(r,e){return(r.values||[]).find(t=>Ye(t,e))!==void 0}function Ot(r,e){if(r===e)return 0;const t=Nt(r),n=Nt(e);if(t!==n)return z(t,n);switch(t){case 0:case 9007199254740991:return 0;case 1:return z(r.booleanValue,e.booleanValue);case 2:return function(s,o){const u=ce(s.integerValue||s.doubleValue),c=ce(o.integerValue||o.doubleValue);return u<c?-1:u>c?1:u===c?0:isNaN(u)?isNaN(c)?0:-1:1}(r,e);case 3:return Wc(r.timestampValue,e.timestampValue);case 4:return Wc(ii(r),ii(e));case 5:return z(r.stringValue,e.stringValue);case 6:return function(s,o){const u=ot(s),c=ot(o);return u.compareTo(c)}(r.bytesValue,e.bytesValue);case 7:return function(s,o){const u=s.split("/"),c=o.split("/");for(let h=0;h<u.length&&h<c.length;h++){const f=z(u[h],c[h]);if(f!==0)return f}return z(u.length,c.length)}(r.referenceValue,e.referenceValue);case 8:return function(s,o){const u=z(ce(s.latitude),ce(o.latitude));return u!==0?u:z(ce(s.longitude),ce(o.longitude))}(r.geoPointValue,e.geoPointValue);case 9:return Hc(r.arrayValue,e.arrayValue);case 10:return function(s,o){var u,c,h,f;const p=s.fields||{},_=o.fields||{},R=(u=p.value)===null||u===void 0?void 0:u.arrayValue,V=(c=_.value)===null||c===void 0?void 0:c.arrayValue,x=z(((h=R==null?void 0:R.values)===null||h===void 0?void 0:h.length)||0,((f=V==null?void 0:V.values)===null||f===void 0?void 0:f.length)||0);return x!==0?x:Hc(R,V)}(r.mapValue,e.mapValue);case 11:return function(s,o){if(s===St.mapValue&&o===St.mapValue)return 0;if(s===St.mapValue)return 1;if(o===St.mapValue)return-1;const u=s.fields||{},c=Object.keys(u),h=o.fields||{},f=Object.keys(h);c.sort(),f.sort();for(let p=0;p<c.length&&p<f.length;++p){const _=z(c[p],f[p]);if(_!==0)return _;const R=Ot(u[c[p]],h[f[p]]);if(R!==0)return R}return z(c.length,f.length)}(r.mapValue,e.mapValue);default:throw L()}}function Wc(r,e){if(typeof r=="string"&&typeof e=="string"&&r.length===e.length)return z(r,e);const t=st(r),n=st(e),i=z(t.seconds,n.seconds);return i!==0?i:z(t.nanos,n.nanos)}function Hc(r,e){const t=r.values||[],n=e.values||[];for(let i=0;i<t.length&&i<n.length;++i){const s=Ot(t[i],n[i]);if(s)return s}return z(t.length,n.length)}function Yn(r){return Wo(r)}function Wo(r){return"nullValue"in r?"null":"booleanValue"in r?""+r.booleanValue:"integerValue"in r?""+r.integerValue:"doubleValue"in r?""+r.doubleValue:"timestampValue"in r?function(t){const n=st(t);return`time(${n.seconds},${n.nanos})`}(r.timestampValue):"stringValue"in r?r.stringValue:"bytesValue"in r?function(t){return ot(t).toBase64()}(r.bytesValue):"referenceValue"in r?function(t){return M.fromName(t).toString()}(r.referenceValue):"geoPointValue"in r?function(t){return`geo(${t.latitude},${t.longitude})`}(r.geoPointValue):"arrayValue"in r?function(t){let n="[",i=!0;for(const s of t.values||[])i?i=!1:n+=",",n+=Wo(s);return n+"]"}(r.arrayValue):"mapValue"in r?function(t){const n=Object.keys(t.fields||{}).sort();let i="{",s=!0;for(const o of n)s?s=!1:i+=",",i+=`${o}:${Wo(t.fields[o])}`;return i+"}"}(r.mapValue):L()}function as(r){switch(Nt(r)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=Ms(r);return e?16+as(e):16;case 5:return 2*r.stringValue.length;case 6:return ot(r.bytesValue).approximateByteSize();case 7:return r.referenceValue.length;case 9:return function(n){return(n.values||[]).reduce((i,s)=>i+as(s),0)}(r.arrayValue);case 10:case 11:return function(n){let i=0;return zt(n.fields,(s,o)=>{i+=s.length+as(o)}),i}(r.mapValue);default:throw L()}}function pn(r,e){return{referenceValue:`projects/${r.projectId}/databases/${r.database}/documents/${e.path.canonicalString()}`}}function Ho(r){return!!r&&"integerValue"in r}function oi(r){return!!r&&"arrayValue"in r}function Jc(r){return!!r&&"nullValue"in r}function Yc(r){return!!r&&"doubleValue"in r&&isNaN(Number(r.doubleValue))}function us(r){return!!r&&"mapValue"in r}function Ls(r){var e,t;return((t=(((e=r==null?void 0:r.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="__vector__"}function Hr(r){if(r.geoPointValue)return{geoPointValue:Object.assign({},r.geoPointValue)};if(r.timestampValue&&typeof r.timestampValue=="object")return{timestampValue:Object.assign({},r.timestampValue)};if(r.mapValue){const e={mapValue:{fields:{}}};return zt(r.mapValue.fields,(t,n)=>e.mapValue.fields[t]=Hr(n)),e}if(r.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(r.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Hr(r.arrayValue.values[t]);return e}return Object.assign({},r)}function Kh(r){return(((r.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}const Qh={mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{}}}}};function $_(r){return"nullValue"in r?os:"booleanValue"in r?{booleanValue:!1}:"integerValue"in r||"doubleValue"in r?{doubleValue:NaN}:"timestampValue"in r?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in r?{stringValue:""}:"bytesValue"in r?{bytesValue:""}:"referenceValue"in r?pn(xt.empty(),M.empty()):"geoPointValue"in r?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in r?{arrayValue:{}}:"mapValue"in r?Ls(r)?Qh:{mapValue:{}}:L()}function K_(r){return"nullValue"in r?{booleanValue:!1}:"booleanValue"in r?{doubleValue:NaN}:"integerValue"in r||"doubleValue"in r?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in r?{stringValue:""}:"stringValue"in r?{bytesValue:""}:"bytesValue"in r?pn(xt.empty(),M.empty()):"referenceValue"in r?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in r?{arrayValue:{}}:"arrayValue"in r?Qh:"mapValue"in r?Ls(r)?{mapValue:{}}:St:L()}function Xc(r,e){const t=Ot(r.value,e.value);return t!==0?t:r.inclusive&&!e.inclusive?-1:!r.inclusive&&e.inclusive?1:0}function Zc(r,e){const t=Ot(r.value,e.value);return t!==0?t:r.inclusive&&!e.inclusive?1:!r.inclusive&&e.inclusive?-1:0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Se{constructor(e){this.value=e}static empty(){return new Se({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let n=0;n<e.length-1;++n)if(t=(t.mapValue.fields||{})[e.get(n)],!us(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Hr(t)}setAll(e){let t=ue.emptyPath(),n={},i=[];e.forEach((o,u)=>{if(!t.isImmediateParentOf(u)){const c=this.getFieldsMap(t);this.applyChanges(c,n,i),n={},i=[],t=u.popLast()}o?n[u.lastSegment()]=Hr(o):i.push(u.lastSegment())});const s=this.getFieldsMap(t);this.applyChanges(s,n,i)}delete(e){const t=this.field(e.popLast());us(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Ye(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let n=0;n<e.length;++n){let i=t.mapValue.fields[e.get(n)];us(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},t.mapValue.fields[e.get(n)]=i),t=i}return t.mapValue.fields}applyChanges(e,t,n){zt(t,(i,s)=>e[i]=s);for(const i of n)delete e[i]}clone(){return new Se(Hr(this.value))}}function Wh(r){const e=[];return zt(r.fields,(t,n)=>{const i=new ue([t]);if(us(n)){const s=Wh(n.mapValue).fields;if(s.length===0)e.push(i);else for(const o of s)e.push(i.child(o))}else e.push(i)}),new Ue(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ae{constructor(e,t,n,i,s,o,u){this.key=e,this.documentType=t,this.version=n,this.readTime=i,this.createTime=s,this.data=o,this.documentState=u}static newInvalidDocument(e){return new ae(e,0,q.min(),q.min(),q.min(),Se.empty(),0)}static newFoundDocument(e,t,n,i){return new ae(e,1,t,q.min(),n,i,0)}static newNoDocument(e,t){return new ae(e,2,t,q.min(),q.min(),Se.empty(),0)}static newUnknownDocument(e,t){return new ae(e,3,t,q.min(),q.min(),Se.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(q.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Se.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Se.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=q.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof ae&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new ae(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mt{constructor(e,t){this.position=e,this.inclusive=t}}function el(r,e,t){let n=0;for(let i=0;i<r.position.length;i++){const s=e[i],o=r.position[i];if(s.field.isKeyField()?n=M.comparator(M.fromName(o.referenceValue),t.key):n=Ot(o,t.data.field(s.field)),s.dir==="desc"&&(n*=-1),n!==0)break}return n}function tl(r,e){if(r===null)return e===null;if(e===null||r.inclusive!==e.inclusive||r.position.length!==e.position.length)return!1;for(let t=0;t<r.position.length;t++)if(!Ye(r.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ai{constructor(e,t="asc"){this.field=e,this.dir=t}}function Q_(r,e){return r.dir===e.dir&&r.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hh{}class Y extends Hh{constructor(e,t,n){super(),this.field=e,this.op=t,this.value=n}static create(e,t,n){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,n):new W_(e,t,n):t==="array-contains"?new Y_(e,n):t==="in"?new td(e,n):t==="not-in"?new X_(e,n):t==="array-contains-any"?new Z_(e,n):new Y(e,t,n)}static createKeyFieldInFilter(e,t,n){return t==="in"?new H_(e,n):new J_(e,n)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(Ot(t,this.value)):t!==null&&Nt(this.value)===Nt(t)&&this.matchesComparison(Ot(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return L()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class te extends Hh{constructor(e,t){super(),this.filters=e,this.op=t,this.ae=null}static create(e,t){return new te(e,t)}matches(e){return Xn(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function Xn(r){return r.op==="and"}function Jo(r){return r.op==="or"}function Sa(r){return Jh(r)&&Xn(r)}function Jh(r){for(const e of r.filters)if(e instanceof te)return!1;return!0}function Yo(r){if(r instanceof Y)return r.field.canonicalString()+r.op.toString()+Yn(r.value);if(Sa(r))return r.filters.map(e=>Yo(e)).join(",");{const e=r.filters.map(t=>Yo(t)).join(",");return`${r.op}(${e})`}}function Yh(r,e){return r instanceof Y?function(n,i){return i instanceof Y&&n.op===i.op&&n.field.isEqual(i.field)&&Ye(n.value,i.value)}(r,e):r instanceof te?function(n,i){return i instanceof te&&n.op===i.op&&n.filters.length===i.filters.length?n.filters.reduce((s,o,u)=>s&&Yh(o,i.filters[u]),!0):!1}(r,e):void L()}function Xh(r,e){const t=r.filters.concat(e);return te.create(t,r.op)}function Zh(r){return r instanceof Y?function(t){return`${t.field.canonicalString()} ${t.op} ${Yn(t.value)}`}(r):r instanceof te?function(t){return t.op.toString()+" {"+t.getFilters().map(Zh).join(" ,")+"}"}(r):"Filter"}class W_ extends Y{constructor(e,t,n){super(e,t,n),this.key=M.fromName(n.referenceValue)}matches(e){const t=M.comparator(e.key,this.key);return this.matchesComparison(t)}}class H_ extends Y{constructor(e,t){super(e,"in",t),this.keys=ed("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class J_ extends Y{constructor(e,t){super(e,"not-in",t),this.keys=ed("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function ed(r,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(n=>M.fromName(n.referenceValue))}class Y_ extends Y{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return oi(t)&&si(t.arrayValue,this.value)}}class td extends Y{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&si(this.value.arrayValue,t)}}class X_ extends Y{constructor(e,t){super(e,"not-in",t)}matches(e){if(si(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&!si(this.value.arrayValue,t)}}class Z_ extends Y{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!oi(t)||!t.arrayValue.values)&&t.arrayValue.values.some(n=>si(this.value.arrayValue,n))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ey{constructor(e,t=null,n=[],i=[],s=null,o=null,u=null){this.path=e,this.collectionGroup=t,this.orderBy=n,this.filters=i,this.limit=s,this.startAt=o,this.endAt=u,this.ue=null}}function Xo(r,e=null,t=[],n=[],i=null,s=null,o=null){return new ey(r,e,t,n,i,s,o)}function gn(r){const e=N(r);if(e.ue===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(n=>Yo(n)).join(","),t+="|ob:",t+=e.orderBy.map(n=>function(s){return s.field.canonicalString()+s.dir}(n)).join(","),pi(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(n=>Yn(n)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(n=>Yn(n)).join(",")),e.ue=t}return e.ue}function gi(r,e){if(r.limit!==e.limit||r.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<r.orderBy.length;t++)if(!Q_(r.orderBy[t],e.orderBy[t]))return!1;if(r.filters.length!==e.filters.length)return!1;for(let t=0;t<r.filters.length;t++)if(!Yh(r.filters[t],e.filters[t]))return!1;return r.collectionGroup===e.collectionGroup&&!!r.path.isEqual(e.path)&&!!tl(r.startAt,e.startAt)&&tl(r.endAt,e.endAt)}function ys(r){return M.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}function Is(r,e){return r.filters.filter(t=>t instanceof Y&&t.field.isEqual(e))}function nl(r,e,t){let n=os,i=!0;for(const s of Is(r,e)){let o=os,u=!0;switch(s.op){case"<":case"<=":o=$_(s.value);break;case"==":case"in":case">=":o=s.value;break;case">":o=s.value,u=!1;break;case"!=":case"not-in":o=os}Xc({value:n,inclusive:i},{value:o,inclusive:u})<0&&(n=o,i=u)}if(t!==null){for(let s=0;s<r.orderBy.length;++s)if(r.orderBy[s].field.isEqual(e)){const o=t.position[s];Xc({value:n,inclusive:i},{value:o,inclusive:t.inclusive})<0&&(n=o,i=t.inclusive);break}}return{value:n,inclusive:i}}function rl(r,e,t){let n=St,i=!0;for(const s of Is(r,e)){let o=St,u=!0;switch(s.op){case">=":case">":o=K_(s.value),u=!1;break;case"==":case"in":case"<=":o=s.value;break;case"<":o=s.value,u=!1;break;case"!=":case"not-in":o=St}Zc({value:n,inclusive:i},{value:o,inclusive:u})>0&&(n=o,i=u)}if(t!==null){for(let s=0;s<r.orderBy.length;++s)if(r.orderBy[s].field.isEqual(e)){const o=t.position[s];Zc({value:n,inclusive:i},{value:o,inclusive:t.inclusive})>0&&(n=o,i=t.inclusive);break}}return{value:n,inclusive:i}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ut{constructor(e,t=null,n=[],i=[],s=null,o="F",u=null,c=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=n,this.filters=i,this.limit=s,this.limitType=o,this.startAt=u,this.endAt=c,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function nd(r,e,t,n,i,s,o,u){return new ut(r,e,t,n,i,s,o,u)}function lr(r){return new ut(r)}function il(r){return r.filters.length===0&&r.limit===null&&r.startAt==null&&r.endAt==null&&(r.explicitOrderBy.length===0||r.explicitOrderBy.length===1&&r.explicitOrderBy[0].field.isKeyField())}function Pa(r){return r.collectionGroup!==null}function Gn(r){const e=N(r);if(e.ce===null){e.ce=[];const t=new Set;for(const s of e.explicitOrderBy)e.ce.push(s),t.add(s.field.canonicalString());const n=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let u=new ne(ue.comparator);return o.filters.forEach(c=>{c.getFlattenedFilters().forEach(h=>{h.isInequality()&&(u=u.add(h.field))})}),u})(e).forEach(s=>{t.has(s.canonicalString())||s.isKeyField()||e.ce.push(new ai(s,n))}),t.has(ue.keyField().canonicalString())||e.ce.push(new ai(ue.keyField(),n))}return e.ce}function Oe(r){const e=N(r);return e.le||(e.le=id(e,Gn(r))),e.le}function rd(r){const e=N(r);return e.he||(e.he=id(e,r.explicitOrderBy)),e.he}function id(r,e){if(r.limitType==="F")return Xo(r.path,r.collectionGroup,e,r.filters,r.limit,r.startAt,r.endAt);{e=e.map(i=>{const s=i.dir==="desc"?"asc":"desc";return new ai(i.field,s)});const t=r.endAt?new Mt(r.endAt.position,r.endAt.inclusive):null,n=r.startAt?new Mt(r.startAt.position,r.startAt.inclusive):null;return Xo(r.path,r.collectionGroup,e,r.filters,r.limit,t,n)}}function Zo(r,e){const t=r.filters.concat([e]);return new ut(r.path,r.collectionGroup,r.explicitOrderBy.slice(),t,r.limit,r.limitType,r.startAt,r.endAt)}function Ts(r,e,t){return new ut(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),e,t,r.startAt,r.endAt)}function _i(r,e){return gi(Oe(r),Oe(e))&&r.limitType===e.limitType}function sd(r){return`${gn(Oe(r))}|lt:${r.limitType}`}function Mn(r){return`Query(target=${function(t){let n=t.path.canonicalString();return t.collectionGroup!==null&&(n+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(n+=`, filters: [${t.filters.map(i=>Zh(i)).join(", ")}]`),pi(t.limit)||(n+=", limit: "+t.limit),t.orderBy.length>0&&(n+=`, orderBy: [${t.orderBy.map(i=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(i)).join(", ")}]`),t.startAt&&(n+=", startAt: ",n+=t.startAt.inclusive?"b:":"a:",n+=t.startAt.position.map(i=>Yn(i)).join(",")),t.endAt&&(n+=", endAt: ",n+=t.endAt.inclusive?"a:":"b:",n+=t.endAt.position.map(i=>Yn(i)).join(",")),`Target(${n})`}(Oe(r))}; limitType=${r.limitType})`}function yi(r,e){return e.isFoundDocument()&&function(n,i){const s=i.key.path;return n.collectionGroup!==null?i.key.hasCollectionId(n.collectionGroup)&&n.path.isPrefixOf(s):M.isDocumentKey(n.path)?n.path.isEqual(s):n.path.isImmediateParentOf(s)}(r,e)&&function(n,i){for(const s of Gn(n))if(!s.field.isKeyField()&&i.data.field(s.field)===null)return!1;return!0}(r,e)&&function(n,i){for(const s of n.filters)if(!s.matches(i))return!1;return!0}(r,e)&&function(n,i){return!(n.startAt&&!function(o,u,c){const h=el(o,u,c);return o.inclusive?h<=0:h<0}(n.startAt,Gn(n),i)||n.endAt&&!function(o,u,c){const h=el(o,u,c);return o.inclusive?h>=0:h>0}(n.endAt,Gn(n),i))}(r,e)}function od(r){return r.collectionGroup||(r.path.length%2==1?r.path.lastSegment():r.path.get(r.path.length-2))}function ad(r){return(e,t)=>{let n=!1;for(const i of Gn(r)){const s=ty(i,e,t);if(s!==0)return s;n=n||i.field.isKeyField()}return 0}}function ty(r,e,t){const n=r.field.isKeyField()?M.comparator(e.key,t.key):function(s,o,u){const c=o.data.field(s),h=u.data.field(s);return c!==null&&h!==null?Ot(c,h):L()}(r.field,e,t);switch(r.dir){case"asc":return n;case"desc":return-1*n;default:return L()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ct{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),n=this.inner[t];if(n!==void 0){for(const[i,s]of n)if(this.equalsFn(i,e))return s}}has(e){return this.get(e)!==void 0}set(e,t){const n=this.mapKeyFn(e),i=this.inner[n];if(i===void 0)return this.inner[n]=[[e,t]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return void(i[s]=[e,t]);i.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),n=this.inner[t];if(n===void 0)return!1;for(let i=0;i<n.length;i++)if(this.equalsFn(n[i][0],e))return n.length===1?delete this.inner[t]:n.splice(i,1),this.innerSize--,!0;return!1}forEach(e){zt(this.inner,(t,n)=>{for(const[i,s]of n)e(i,s)})}isEmpty(){return Gh(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ny=new se(M.comparator);function Be(){return ny}const ud=new se(M.comparator);function Gr(...r){let e=ud;for(const t of r)e=e.insert(t.key,t);return e}function cd(r){let e=ud;return r.forEach((t,n)=>e=e.insert(t,n.overlayedDocument)),e}function We(){return Jr()}function ld(){return Jr()}function Jr(){return new ct(r=>r.toString(),(r,e)=>r.isEqual(e))}const ry=new se(M.comparator),iy=new ne(M.comparator);function $(...r){let e=iy;for(const t of r)e=e.add(t);return e}const sy=new ne(z);function Ca(){return sy}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Va(r,e){if(r.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:ri(e)?"-0":e}}function hd(r){return{integerValue:""+r}}function dd(r,e){return Fh(e)?hd(e):Va(r,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fs{constructor(){this._=void 0}}function oy(r,e,t){return r instanceof Zn?function(i,s){const o={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return s&&Os(s)&&(s=Ms(s)),s&&(o.fields.__previous_value__=s),{mapValue:o}}(t,e):r instanceof _n?md(r,e):r instanceof yn?pd(r,e):function(i,s){const o=fd(i,s),u=sl(o)+sl(i.Pe);return Ho(o)&&Ho(i.Pe)?hd(u):Va(i.serializer,u)}(r,e)}function ay(r,e,t){return r instanceof _n?md(r,e):r instanceof yn?pd(r,e):t}function fd(r,e){return r instanceof er?function(n){return Ho(n)||function(s){return!!s&&"doubleValue"in s}(n)}(e)?e:{integerValue:0}:null}class Zn extends Fs{}class _n extends Fs{constructor(e){super(),this.elements=e}}function md(r,e){const t=gd(e);for(const n of r.elements)t.some(i=>Ye(i,n))||t.push(n);return{arrayValue:{values:t}}}class yn extends Fs{constructor(e){super(),this.elements=e}}function pd(r,e){let t=gd(e);for(const n of r.elements)t=t.filter(i=>!Ye(i,n));return{arrayValue:{values:t}}}class er extends Fs{constructor(e,t){super(),this.serializer=e,this.Pe=t}}function sl(r){return ce(r.integerValue||r.doubleValue)}function gd(r){return oi(r)&&r.arrayValue.values?r.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ii{constructor(e,t){this.field=e,this.transform=t}}function uy(r,e){return r.field.isEqual(e.field)&&function(n,i){return n instanceof _n&&i instanceof _n||n instanceof yn&&i instanceof yn?Wn(n.elements,i.elements,Ye):n instanceof er&&i instanceof er?Ye(n.Pe,i.Pe):n instanceof Zn&&i instanceof Zn}(r.transform,e.transform)}class cy{constructor(e,t){this.version=e,this.transformResults=t}}class le{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new le}static exists(e){return new le(void 0,e)}static updateTime(e){return new le(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function cs(r,e){return r.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(r.updateTime):r.exists===void 0||r.exists===e.isFoundDocument()}class Us{}function _d(r,e){if(!r.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return r.isNoDocument()?new dr(r.key,le.none()):new hr(r.key,r.data,le.none());{const t=r.data,n=Se.empty();let i=new ne(ue.comparator);for(let s of e.fields)if(!i.has(s)){let o=t.field(s);o===null&&s.length>1&&(s=s.popLast(),o=t.field(s)),o===null?n.delete(s):n.set(s,o),i=i.add(s)}return new lt(r.key,n,new Ue(i.toArray()),le.none())}}function ly(r,e,t){r instanceof hr?function(i,s,o){const u=i.value.clone(),c=al(i.fieldTransforms,s,o.transformResults);u.setAll(c),s.convertToFoundDocument(o.version,u).setHasCommittedMutations()}(r,e,t):r instanceof lt?function(i,s,o){if(!cs(i.precondition,s))return void s.convertToUnknownDocument(o.version);const u=al(i.fieldTransforms,s,o.transformResults),c=s.data;c.setAll(yd(i)),c.setAll(u),s.convertToFoundDocument(o.version,c).setHasCommittedMutations()}(r,e,t):function(i,s,o){s.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,t)}function Yr(r,e,t,n){return r instanceof hr?function(s,o,u,c){if(!cs(s.precondition,o))return u;const h=s.value.clone(),f=ul(s.fieldTransforms,c,o);return h.setAll(f),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),null}(r,e,t,n):r instanceof lt?function(s,o,u,c){if(!cs(s.precondition,o))return u;const h=ul(s.fieldTransforms,c,o),f=o.data;return f.setAll(yd(s)),f.setAll(h),o.convertToFoundDocument(o.version,f).setHasLocalMutations(),u===null?null:u.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map(p=>p.field))}(r,e,t,n):function(s,o,u){return cs(s.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):u}(r,e,t)}function hy(r,e){let t=null;for(const n of r.fieldTransforms){const i=e.data.field(n.field),s=fd(n.transform,i||null);s!=null&&(t===null&&(t=Se.empty()),t.set(n.field,s))}return t||null}function ol(r,e){return r.type===e.type&&!!r.key.isEqual(e.key)&&!!r.precondition.isEqual(e.precondition)&&!!function(n,i){return n===void 0&&i===void 0||!(!n||!i)&&Wn(n,i,(s,o)=>uy(s,o))}(r.fieldTransforms,e.fieldTransforms)&&(r.type===0?r.value.isEqual(e.value):r.type!==1||r.data.isEqual(e.data)&&r.fieldMask.isEqual(e.fieldMask))}class hr extends Us{constructor(e,t,n,i=[]){super(),this.key=e,this.value=t,this.precondition=n,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class lt extends Us{constructor(e,t,n,i,s=[]){super(),this.key=e,this.data=t,this.fieldMask=n,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function yd(r){const e=new Map;return r.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const n=r.data.field(t);e.set(t,n)}}),e}function al(r,e,t){const n=new Map;U(r.length===t.length);for(let i=0;i<t.length;i++){const s=r[i],o=s.transform,u=e.data.field(s.field);n.set(s.field,ay(o,u,t[i]))}return n}function ul(r,e,t){const n=new Map;for(const i of r){const s=i.transform,o=t.data.field(i.field);n.set(i.field,oy(s,o,e))}return n}class dr extends Us{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Da extends Us{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ka{constructor(e,t,n,i){this.batchId=e,this.localWriteTime=t,this.baseMutations=n,this.mutations=i}applyToRemoteDocument(e,t){const n=t.mutationResults;for(let i=0;i<this.mutations.length;i++){const s=this.mutations[i];s.key.isEqual(e.key)&&ly(s,e,n[i])}}applyToLocalView(e,t){for(const n of this.baseMutations)n.key.isEqual(e.key)&&(t=Yr(n,e,t,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(e.key)&&(t=Yr(n,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const n=ld();return this.mutations.forEach(i=>{const s=e.get(i.key),o=s.overlayedDocument;let u=this.applyToLocalView(o,s.mutatedFields);u=t.has(i.key)?null:u;const c=_d(o,u);c!==null&&n.set(i.key,c),o.isValidDocument()||o.convertToNoDocument(q.min())}),n}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),$())}isEqual(e){return this.batchId===e.batchId&&Wn(this.mutations,e.mutations,(t,n)=>ol(t,n))&&Wn(this.baseMutations,e.baseMutations,(t,n)=>ol(t,n))}}class xa{constructor(e,t,n,i){this.batch=e,this.commitVersion=t,this.mutationResults=n,this.docVersions=i}static from(e,t,n){U(e.mutations.length===n.length);let i=function(){return ry}();const s=e.mutations;for(let o=0;o<s.length;o++)i=i.insert(s[o].key,n[o].version);return new xa(e,t,n,i)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Na{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Id{constructor(e,t,n){this.alias=e,this.aggregateType=t,this.fieldPath=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dy{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ie,X;function Td(r){switch(r){default:return L();case S.CANCELLED:case S.UNKNOWN:case S.DEADLINE_EXCEEDED:case S.RESOURCE_EXHAUSTED:case S.INTERNAL:case S.UNAVAILABLE:case S.UNAUTHENTICATED:return!1;case S.INVALID_ARGUMENT:case S.NOT_FOUND:case S.ALREADY_EXISTS:case S.PERMISSION_DENIED:case S.FAILED_PRECONDITION:case S.ABORTED:case S.OUT_OF_RANGE:case S.UNIMPLEMENTED:case S.DATA_LOSS:return!0}}function vd(r){if(r===void 0)return _e("GRPC error has no .code"),S.UNKNOWN;switch(r){case Ie.OK:return S.OK;case Ie.CANCELLED:return S.CANCELLED;case Ie.UNKNOWN:return S.UNKNOWN;case Ie.DEADLINE_EXCEEDED:return S.DEADLINE_EXCEEDED;case Ie.RESOURCE_EXHAUSTED:return S.RESOURCE_EXHAUSTED;case Ie.INTERNAL:return S.INTERNAL;case Ie.UNAVAILABLE:return S.UNAVAILABLE;case Ie.UNAUTHENTICATED:return S.UNAUTHENTICATED;case Ie.INVALID_ARGUMENT:return S.INVALID_ARGUMENT;case Ie.NOT_FOUND:return S.NOT_FOUND;case Ie.ALREADY_EXISTS:return S.ALREADY_EXISTS;case Ie.PERMISSION_DENIED:return S.PERMISSION_DENIED;case Ie.FAILED_PRECONDITION:return S.FAILED_PRECONDITION;case Ie.ABORTED:return S.ABORTED;case Ie.OUT_OF_RANGE:return S.OUT_OF_RANGE;case Ie.UNIMPLEMENTED:return S.UNIMPLEMENTED;case Ie.DATA_LOSS:return S.DATA_LOSS;default:return L()}}(X=Ie||(Ie={}))[X.OK=0]="OK",X[X.CANCELLED=1]="CANCELLED",X[X.UNKNOWN=2]="UNKNOWN",X[X.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",X[X.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",X[X.NOT_FOUND=5]="NOT_FOUND",X[X.ALREADY_EXISTS=6]="ALREADY_EXISTS",X[X.PERMISSION_DENIED=7]="PERMISSION_DENIED",X[X.UNAUTHENTICATED=16]="UNAUTHENTICATED",X[X.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",X[X.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",X[X.ABORTED=10]="ABORTED",X[X.OUT_OF_RANGE=11]="OUT_OF_RANGE",X[X.UNIMPLEMENTED=12]="UNIMPLEMENTED",X[X.INTERNAL=13]="INTERNAL",X[X.UNAVAILABLE=14]="UNAVAILABLE",X[X.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let vs=null;/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ed(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fy=new un([4294967295,4294967295],0);function cl(r){const e=Ed().encode(r),t=new wh;return t.update(e),new Uint8Array(t.digest())}function ll(r){const e=new DataView(r.buffer),t=e.getUint32(0,!0),n=e.getUint32(4,!0),i=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new un([t,n],0),new un([i,s],0)]}class Oa{constructor(e,t,n){if(this.bitmap=e,this.padding=t,this.hashCount=n,t<0||t>=8)throw new $r(`Invalid padding: ${t}`);if(n<0)throw new $r(`Invalid hash count: ${n}`);if(e.length>0&&this.hashCount===0)throw new $r(`Invalid hash count: ${n}`);if(e.length===0&&t!==0)throw new $r(`Invalid padding when bitmap length is 0: ${t}`);this.Ie=8*e.length-t,this.Te=un.fromNumber(this.Ie)}Ee(e,t,n){let i=e.add(t.multiply(un.fromNumber(n)));return i.compare(fy)===1&&(i=new un([i.getBits(0),i.getBits(1)],0)),i.modulo(this.Te).toNumber()}de(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Ie===0)return!1;const t=cl(e),[n,i]=ll(t);for(let s=0;s<this.hashCount;s++){const o=this.Ee(n,i,s);if(!this.de(o))return!1}return!0}static create(e,t,n){const i=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),o=new Oa(s,i,t);return n.forEach(u=>o.insert(u)),o}insert(e){if(this.Ie===0)return;const t=cl(e),[n,i]=ll(t);for(let s=0;s<this.hashCount;s++){const o=this.Ee(n,i,s);this.Ae(o)}}Ae(e){const t=Math.floor(e/8),n=e%8;this.bitmap[t]|=1<<n}}class $r extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ti{constructor(e,t,n,i,s){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=n,this.documentUpdates=i,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,t,n){const i=new Map;return i.set(e,vi.createSynthesizedTargetChangeForCurrentChange(e,t,n)),new Ti(q.min(),i,new se(z),Be(),$())}}class vi{constructor(e,t,n,i,s){this.resumeToken=e,this.current=t,this.addedDocuments=n,this.modifiedDocuments=i,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,t,n){return new vi(n,t,$(),$(),$())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ls{constructor(e,t,n,i){this.Re=e,this.removedTargetIds=t,this.key=n,this.Ve=i}}class wd{constructor(e,t){this.targetId=e,this.me=t}}class Ad{constructor(e,t,n=me.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=t,this.resumeToken=n,this.cause=i}}class hl{constructor(){this.fe=0,this.ge=fl(),this.pe=me.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}ve(){let e=$(),t=$(),n=$();return this.ge.forEach((i,s)=>{switch(s){case 0:e=e.add(i);break;case 2:t=t.add(i);break;case 1:n=n.add(i);break;default:L()}}),new vi(this.pe,this.ye,e,t,n)}Ce(){this.we=!1,this.ge=fl()}Fe(e,t){this.we=!0,this.ge=this.ge.insert(e,t)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,U(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class my{constructor(e){this.Le=e,this.Be=new Map,this.ke=Be(),this.qe=dl(),this.Qe=new se(z)}Ke(e){for(const t of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.$e(t,e.Ve):this.Ue(t,e.key,e.Ve);for(const t of e.removedTargetIds)this.Ue(t,e.key,e.Ve)}We(e){this.forEachTarget(e,t=>{const n=this.Ge(t);switch(e.state){case 0:this.ze(t)&&n.De(e.resumeToken);break;case 1:n.Oe(),n.Se||n.Ce(),n.De(e.resumeToken);break;case 2:n.Oe(),n.Se||this.removeTarget(t);break;case 3:this.ze(t)&&(n.Ne(),n.De(e.resumeToken));break;case 4:this.ze(t)&&(this.je(t),n.De(e.resumeToken));break;default:L()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Be.forEach((n,i)=>{this.ze(i)&&t(i)})}He(e){const t=e.targetId,n=e.me.count,i=this.Je(t);if(i){const s=i.target;if(ys(s))if(n===0){const o=new M(s.path);this.Ue(t,o,ae.newNoDocument(o,q.min()))}else U(n===1);else{const o=this.Ye(t);if(o!==n){const u=this.Ze(e),c=u?this.Xe(u,e,o):1;if(c!==0){this.je(t);const h=c===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(t,h)}vs==null||vs.et(function(f,p,_,R,V){var x,C,B,j,F,K;const Z={localCacheCount:f,existenceFilterCount:p.count,databaseId:_.database,projectId:_.projectId},G=p.unchangedNames;return G&&(Z.bloomFilter={applied:V===0,hashCount:(x=G==null?void 0:G.hashCount)!==null&&x!==void 0?x:0,bitmapLength:(j=(B=(C=G==null?void 0:G.bits)===null||C===void 0?void 0:C.bitmap)===null||B===void 0?void 0:B.length)!==null&&j!==void 0?j:0,padding:(K=(F=G==null?void 0:G.bits)===null||F===void 0?void 0:F.padding)!==null&&K!==void 0?K:0,mightContain:T=>{var g;return(g=R==null?void 0:R.mightContain(T))!==null&&g!==void 0&&g}}),Z}(o,e.me,this.Le.tt(),u,c))}}}}Ze(e){const t=e.me.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:n="",padding:i=0},hashCount:s=0}=t;let o,u;try{o=ot(n).toUint8Array()}catch(c){if(c instanceof $h)return ze("Decoding the base64 bloom filter in existence filter failed ("+c.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw c}try{u=new Oa(o,i,s)}catch(c){return ze(c instanceof $r?"BloomFilter error: ":"Applying bloom filter failed: ",c),null}return u.Ie===0?null:u}Xe(e,t,n){return t.me.count===n-this.nt(e,t.targetId)?0:2}nt(e,t){const n=this.Le.getRemoteKeysForTarget(t);let i=0;return n.forEach(s=>{const o=this.Le.tt(),u=`projects/${o.projectId}/databases/${o.database}/documents/${s.path.canonicalString()}`;e.mightContain(u)||(this.Ue(t,s,null),i++)}),i}rt(e){const t=new Map;this.Be.forEach((s,o)=>{const u=this.Je(o);if(u){if(s.current&&ys(u.target)){const c=new M(u.target.path);this.ke.get(c)!==null||this.it(o,c)||this.Ue(o,c,ae.newNoDocument(c,e))}s.be&&(t.set(o,s.ve()),s.Ce())}});let n=$();this.qe.forEach((s,o)=>{let u=!0;o.forEachWhile(c=>{const h=this.Je(c);return!h||h.purpose==="TargetPurposeLimboResolution"||(u=!1,!1)}),u&&(n=n.add(s))}),this.ke.forEach((s,o)=>o.setReadTime(e));const i=new Ti(e,t,this.Qe,this.ke,n);return this.ke=Be(),this.qe=dl(),this.Qe=new se(z),i}$e(e,t){if(!this.ze(e))return;const n=this.it(e,t.key)?2:0;this.Ge(e).Fe(t.key,n),this.ke=this.ke.insert(t.key,t),this.qe=this.qe.insert(t.key,this.st(t.key).add(e))}Ue(e,t,n){if(!this.ze(e))return;const i=this.Ge(e);this.it(e,t)?i.Fe(t,1):i.Me(t),this.qe=this.qe.insert(t,this.st(t).delete(e)),n&&(this.ke=this.ke.insert(t,n))}removeTarget(e){this.Be.delete(e)}Ye(e){const t=this.Ge(e).ve();return this.Le.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}xe(e){this.Ge(e).xe()}Ge(e){let t=this.Be.get(e);return t||(t=new hl,this.Be.set(e,t)),t}st(e){let t=this.qe.get(e);return t||(t=new ne(z),this.qe=this.qe.insert(e,t)),t}ze(e){const t=this.Je(e)!==null;return t||k("WatchChangeAggregator","Detected inactive target",e),t}Je(e){const t=this.Be.get(e);return t&&t.Se?null:this.Le.ot(e)}je(e){this.Be.set(e,new hl),this.Le.getRemoteKeysForTarget(e).forEach(t=>{this.Ue(e,t,null)})}it(e,t){return this.Le.getRemoteKeysForTarget(e).has(t)}}function dl(){return new se(M.comparator)}function fl(){return new se(M.comparator)}const py={asc:"ASCENDING",desc:"DESCENDING"},gy={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},_y={and:"AND",or:"OR"};class yy{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function ea(r,e){return r.useProto3Json||pi(e)?e:{value:e}}function tr(r,e){return r.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Rd(r,e){return r.useProto3Json?e.toBase64():e.toUint8Array()}function Iy(r,e){return tr(r,e.toTimestamp())}function ye(r){return U(!!r),q.fromTimestamp(function(t){const n=st(t);return new he(n.seconds,n.nanos)}(r))}function Ma(r,e){return ta(r,e).canonicalString()}function ta(r,e){const t=function(i){return new J(["projects",i.projectId,"databases",i.database])}(r).child("documents");return e===void 0?t:t.child(e)}function bd(r){const e=J.fromString(r);return U(Md(e)),e}function ui(r,e){return Ma(r.databaseId,e.path)}function Je(r,e){const t=bd(e);if(t.get(1)!==r.databaseId.projectId)throw new D(S.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+r.databaseId.projectId);if(t.get(3)!==r.databaseId.database)throw new D(S.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+r.databaseId.database);return new M(Cd(t))}function Sd(r,e){return Ma(r.databaseId,e)}function Pd(r){const e=bd(r);return e.length===4?J.emptyPath():Cd(e)}function na(r){return new J(["projects",r.databaseId.projectId,"databases",r.databaseId.database]).canonicalString()}function Cd(r){return U(r.length>4&&r.get(4)==="documents"),r.popFirst(5)}function ml(r,e,t){return{name:ui(r,e),fields:t.value.mapValue.fields}}function Vd(r,e,t){const n=Je(r,e.name),i=ye(e.updateTime),s=e.createTime?ye(e.createTime):q.min(),o=new Se({mapValue:{fields:e.fields}}),u=ae.newFoundDocument(n,i,s,o);return t&&u.setHasCommittedMutations(),t?u.setHasCommittedMutations():u}function Ty(r,e){return"found"in e?function(n,i){U(!!i.found),i.found.name,i.found.updateTime;const s=Je(n,i.found.name),o=ye(i.found.updateTime),u=i.found.createTime?ye(i.found.createTime):q.min(),c=new Se({mapValue:{fields:i.found.fields}});return ae.newFoundDocument(s,o,u,c)}(r,e):"missing"in e?function(n,i){U(!!i.missing),U(!!i.readTime);const s=Je(n,i.missing),o=ye(i.readTime);return ae.newNoDocument(s,o)}(r,e):L()}function vy(r,e){let t;if("targetChange"in e){e.targetChange;const n=function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:L()}(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],s=function(h,f){return h.useProto3Json?(U(f===void 0||typeof f=="string"),me.fromBase64String(f||"")):(U(f===void 0||f instanceof Buffer||f instanceof Uint8Array),me.fromUint8Array(f||new Uint8Array))}(r,e.targetChange.resumeToken),o=e.targetChange.cause,u=o&&function(h){const f=h.code===void 0?S.UNKNOWN:vd(h.code);return new D(f,h.message||"")}(o);t=new Ad(n,i,s,u||null)}else if("documentChange"in e){e.documentChange;const n=e.documentChange;n.document,n.document.name,n.document.updateTime;const i=Je(r,n.document.name),s=ye(n.document.updateTime),o=n.document.createTime?ye(n.document.createTime):q.min(),u=new Se({mapValue:{fields:n.document.fields}}),c=ae.newFoundDocument(i,s,o,u),h=n.targetIds||[],f=n.removedTargetIds||[];t=new ls(h,f,c.key,c)}else if("documentDelete"in e){e.documentDelete;const n=e.documentDelete;n.document;const i=Je(r,n.document),s=n.readTime?ye(n.readTime):q.min(),o=ae.newNoDocument(i,s),u=n.removedTargetIds||[];t=new ls([],u,o.key,o)}else if("documentRemove"in e){e.documentRemove;const n=e.documentRemove;n.document;const i=Je(r,n.document),s=n.removedTargetIds||[];t=new ls([],s,i,null)}else{if(!("filter"in e))return L();{e.filter;const n=e.filter;n.targetId;const{count:i=0,unchangedNames:s}=n,o=new dy(i,s),u=n.targetId;t=new wd(u,o)}}return t}function ci(r,e){let t;if(e instanceof hr)t={update:ml(r,e.key,e.value)};else if(e instanceof dr)t={delete:ui(r,e.key)};else if(e instanceof lt)t={update:ml(r,e.key,e.data),updateMask:Sy(e.fieldMask)};else{if(!(e instanceof Da))return L();t={verify:ui(r,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(n=>function(s,o){const u=o.transform;if(u instanceof Zn)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(u instanceof _n)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:u.elements}};if(u instanceof yn)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:u.elements}};if(u instanceof er)return{fieldPath:o.field.canonicalString(),increment:u.Pe};throw L()}(0,n))),e.precondition.isNone||(t.currentDocument=function(i,s){return s.updateTime!==void 0?{updateTime:Iy(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:L()}(r,e.precondition)),t}function ra(r,e){const t=e.currentDocument?function(s){return s.updateTime!==void 0?le.updateTime(ye(s.updateTime)):s.exists!==void 0?le.exists(s.exists):le.none()}(e.currentDocument):le.none(),n=e.updateTransforms?e.updateTransforms.map(i=>function(o,u){let c=null;if("setToServerValue"in u)U(u.setToServerValue==="REQUEST_TIME"),c=new Zn;else if("appendMissingElements"in u){const f=u.appendMissingElements.values||[];c=new _n(f)}else if("removeAllFromArray"in u){const f=u.removeAllFromArray.values||[];c=new yn(f)}else"increment"in u?c=new er(o,u.increment):L();const h=ue.fromServerFormat(u.fieldPath);return new Ii(h,c)}(r,i)):[];if(e.update){e.update.name;const i=Je(r,e.update.name),s=new Se({mapValue:{fields:e.update.fields}});if(e.updateMask){const o=function(c){const h=c.fieldPaths||[];return new Ue(h.map(f=>ue.fromServerFormat(f)))}(e.updateMask);return new lt(i,s,o,t,n)}return new hr(i,s,t,n)}if(e.delete){const i=Je(r,e.delete);return new dr(i,t)}if(e.verify){const i=Je(r,e.verify);return new Da(i,t)}return L()}function Ey(r,e){return r&&r.length>0?(U(e!==void 0),r.map(t=>function(i,s){let o=i.updateTime?ye(i.updateTime):ye(s);return o.isEqual(q.min())&&(o=ye(s)),new cy(o,i.transformResults||[])}(t,e))):[]}function Dd(r,e){return{documents:[Sd(r,e.path)]}}function Bs(r,e){const t={structuredQuery:{}},n=e.path;let i;e.collectionGroup!==null?(i=n,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=n.popLast(),t.structuredQuery.from=[{collectionId:n.lastSegment()}]),t.parent=Sd(r,i);const s=function(h){if(h.length!==0)return Od(te.create(h,"and"))}(e.filters);s&&(t.structuredQuery.where=s);const o=function(h){if(h.length!==0)return h.map(f=>function(_){return{field:wt(_.field),direction:Ay(_.dir)}}(f))}(e.orderBy);o&&(t.structuredQuery.orderBy=o);const u=ea(r,e.limit);return u!==null&&(t.structuredQuery.limit=u),e.startAt&&(t.structuredQuery.startAt=function(h){return{before:h.inclusive,values:h.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(h){return{before:!h.inclusive,values:h.position}}(e.endAt)),{_t:t,parent:i}}function kd(r,e,t,n){const{_t:i,parent:s}=Bs(r,e),o={},u=[];let c=0;return t.forEach(h=>{const f=n?h.alias:"aggregate_"+c++;o[f]=h.alias,h.aggregateType==="count"?u.push({alias:f,count:{}}):h.aggregateType==="avg"?u.push({alias:f,avg:{field:wt(h.fieldPath)}}):h.aggregateType==="sum"&&u.push({alias:f,sum:{field:wt(h.fieldPath)}})}),{request:{structuredAggregationQuery:{aggregations:u,structuredQuery:i.structuredQuery},parent:i.parent},ut:o,parent:s}}function xd(r){let e=Pd(r.parent);const t=r.structuredQuery,n=t.from?t.from.length:0;let i=null;if(n>0){U(n===1);const f=t.from[0];f.allDescendants?i=f.collectionId:e=e.child(f.collectionId)}let s=[];t.where&&(s=function(p){const _=Nd(p);return _ instanceof te&&Sa(_)?_.getFilters():[_]}(t.where));let o=[];t.orderBy&&(o=function(p){return p.map(_=>function(V){return new ai(Ln(V.field),function(C){switch(C){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(V.direction))}(_))}(t.orderBy));let u=null;t.limit&&(u=function(p){let _;return _=typeof p=="object"?p.value:p,pi(_)?null:_}(t.limit));let c=null;t.startAt&&(c=function(p){const _=!!p.before,R=p.values||[];return new Mt(R,_)}(t.startAt));let h=null;return t.endAt&&(h=function(p){const _=!p.before,R=p.values||[];return new Mt(R,_)}(t.endAt)),nd(e,i,o,s,u,"F",c,h)}function wy(r,e){const t=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return L()}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function Nd(r){return r.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const n=Ln(t.unaryFilter.field);return Y.create(n,"==",{doubleValue:NaN});case"IS_NULL":const i=Ln(t.unaryFilter.field);return Y.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=Ln(t.unaryFilter.field);return Y.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=Ln(t.unaryFilter.field);return Y.create(o,"!=",{nullValue:"NULL_VALUE"});default:return L()}}(r):r.fieldFilter!==void 0?function(t){return Y.create(Ln(t.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return L()}}(t.fieldFilter.op),t.fieldFilter.value)}(r):r.compositeFilter!==void 0?function(t){return te.create(t.compositeFilter.filters.map(n=>Nd(n)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return L()}}(t.compositeFilter.op))}(r):L()}function Ay(r){return py[r]}function Ry(r){return gy[r]}function by(r){return _y[r]}function wt(r){return{fieldPath:r.canonicalString()}}function Ln(r){return ue.fromServerFormat(r.fieldPath)}function Od(r){return r instanceof Y?function(t){if(t.op==="=="){if(Yc(t.value))return{unaryFilter:{field:wt(t.field),op:"IS_NAN"}};if(Jc(t.value))return{unaryFilter:{field:wt(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Yc(t.value))return{unaryFilter:{field:wt(t.field),op:"IS_NOT_NAN"}};if(Jc(t.value))return{unaryFilter:{field:wt(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:wt(t.field),op:Ry(t.op),value:t.value}}}(r):r instanceof te?function(t){const n=t.getFilters().map(i=>Od(i));return n.length===1?n[0]:{compositeFilter:{op:by(t.op),filters:n}}}(r):L()}function Sy(r){const e=[];return r.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function Md(r){return r.length>=4&&r.get(0)==="projects"&&r.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rt{constructor(e,t,n,i,s=q.min(),o=q.min(),u=me.EMPTY_BYTE_STRING,c=null){this.target=e,this.targetId=t,this.purpose=n,this.sequenceNumber=i,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=u,this.expectedCount=c}withSequenceNumber(e){return new rt(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new rt(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new rt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new rt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ld{constructor(e){this.ct=e}}function Py(r,e){let t;if(e.document)t=Vd(r.ct,e.document,!!e.hasCommittedMutations);else if(e.noDocument){const n=M.fromSegments(e.noDocument.path),i=Tn(e.noDocument.readTime);t=ae.newNoDocument(n,i),e.hasCommittedMutations&&t.setHasCommittedMutations()}else{if(!e.unknownDocument)return L();{const n=M.fromSegments(e.unknownDocument.path),i=Tn(e.unknownDocument.version);t=ae.newUnknownDocument(n,i)}}return e.readTime&&t.setReadTime(function(i){const s=new he(i[0],i[1]);return q.fromTimestamp(s)}(e.readTime)),t}function pl(r,e){const t=e.key,n={prefixPath:t.getCollectionPath().popLast().toArray(),collectionGroup:t.collectionGroup,documentId:t.path.lastSegment(),readTime:Es(e.readTime),hasCommittedMutations:e.hasCommittedMutations};if(e.isFoundDocument())n.document=function(s,o){return{name:ui(s,o.key),fields:o.data.value.mapValue.fields,updateTime:tr(s,o.version.toTimestamp()),createTime:tr(s,o.createTime.toTimestamp())}}(r.ct,e);else if(e.isNoDocument())n.noDocument={path:t.path.toArray(),readTime:In(e.version)};else{if(!e.isUnknownDocument())return L();n.unknownDocument={path:t.path.toArray(),version:In(e.version)}}return n}function Es(r){const e=r.toTimestamp();return[e.seconds,e.nanoseconds]}function In(r){const e=r.toTimestamp();return{seconds:e.seconds,nanoseconds:e.nanoseconds}}function Tn(r){const e=new he(r.seconds,r.nanoseconds);return q.fromTimestamp(e)}function nn(r,e){const t=(e.baseMutations||[]).map(s=>ra(r.ct,s));for(let s=0;s<e.mutations.length-1;++s){const o=e.mutations[s];if(s+1<e.mutations.length&&e.mutations[s+1].transform!==void 0){const u=e.mutations[s+1];o.updateTransforms=u.transform.fieldTransforms,e.mutations.splice(s+1,1),++s}}const n=e.mutations.map(s=>ra(r.ct,s)),i=he.fromMillis(e.localWriteTimeMs);return new ka(e.batchId,i,t,n)}function Kr(r){const e=Tn(r.readTime),t=r.lastLimboFreeSnapshotVersion!==void 0?Tn(r.lastLimboFreeSnapshotVersion):q.min();let n;return n=function(s){return s.documents!==void 0}(r.query)?function(s){return U(s.documents.length===1),Oe(lr(Pd(s.documents[0])))}(r.query):function(s){return Oe(xd(s))}(r.query),new rt(n,r.targetId,"TargetPurposeListen",r.lastListenSequenceNumber,e,t,me.fromBase64String(r.resumeToken))}function Fd(r,e){const t=In(e.snapshotVersion),n=In(e.lastLimboFreeSnapshotVersion);let i;i=ys(e.target)?Dd(r.ct,e.target):Bs(r.ct,e.target)._t;const s=e.resumeToken.toBase64();return{targetId:e.targetId,canonicalId:gn(e.target),readTime:t,resumeToken:s,lastListenSequenceNumber:e.sequenceNumber,lastLimboFreeSnapshotVersion:n,query:i}}function La(r){const e=xd({parent:r.parent,structuredQuery:r.structuredQuery});return r.limitType==="LAST"?Ts(e,e.limit,"L"):e}function No(r,e){return new Na(e.largestBatchId,ra(r.ct,e.overlayMutation))}function gl(r,e){const t=e.path.lastSegment();return[r,Ne(e.path.popLast()),t]}function _l(r,e,t,n){return{indexId:r,uid:e,sequenceNumber:t,readTime:In(n.readTime),documentKey:Ne(n.documentKey.path),largestBatchId:n.largestBatchId}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cy{getBundleMetadata(e,t){return yl(e).get(t).next(n=>{if(n)return function(s){return{id:s.bundleId,createTime:Tn(s.createTime),version:s.version}}(n)})}saveBundleMetadata(e,t){return yl(e).put(function(i){return{bundleId:i.id,createTime:In(ye(i.createTime)),version:i.version}}(t))}getNamedQuery(e,t){return Il(e).get(t).next(n=>{if(n)return function(s){return{name:s.name,query:La(s.bundledQuery),readTime:Tn(s.readTime)}}(n)})}saveNamedQuery(e,t){return Il(e).put(function(i){return{name:i.name,readTime:In(ye(i.readTime)),bundledQuery:i.bundledQuery}}(t))}}function yl(r){return Te(r,"bundles")}function Il(r){return Te(r,"namedQueries")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qs{constructor(e,t){this.serializer=e,this.userId=t}static lt(e,t){const n=t.uid||"";return new qs(e,n)}getOverlay(e,t){return Fr(e).get(gl(this.userId,t)).next(n=>n?No(this.serializer,n):null)}getOverlays(e,t){const n=We();return w.forEach(t,i=>this.getOverlay(e,i).next(s=>{s!==null&&n.set(i,s)})).next(()=>n)}saveOverlays(e,t,n){const i=[];return n.forEach((s,o)=>{const u=new Na(t,o);i.push(this.ht(e,u))}),w.waitFor(i)}removeOverlaysForBatchId(e,t,n){const i=new Set;t.forEach(o=>i.add(Ne(o.getCollectionPath())));const s=[];return i.forEach(o=>{const u=IDBKeyRange.bound([this.userId,o,n],[this.userId,o,n+1],!1,!0);s.push(Fr(e).j("collectionPathOverlayIndex",u))}),w.waitFor(s)}getOverlaysForCollection(e,t,n){const i=We(),s=Ne(t),o=IDBKeyRange.bound([this.userId,s,n],[this.userId,s,Number.POSITIVE_INFINITY],!0);return Fr(e).U("collectionPathOverlayIndex",o).next(u=>{for(const c of u){const h=No(this.serializer,c);i.set(h.getKey(),h)}return i})}getOverlaysForCollectionGroup(e,t,n,i){const s=We();let o;const u=IDBKeyRange.bound([this.userId,t,n],[this.userId,t,Number.POSITIVE_INFINITY],!0);return Fr(e).J({index:"collectionGroupOverlayIndex",range:u},(c,h,f)=>{const p=No(this.serializer,h);s.size()<i||p.largestBatchId===o?(s.set(p.getKey(),p),o=p.largestBatchId):f.done()}).next(()=>s)}ht(e,t){return Fr(e).put(function(i,s,o){const[u,c,h]=gl(s,o.mutation.key);return{userId:s,collectionPath:c,documentId:h,collectionGroup:o.mutation.key.getCollectionGroup(),largestBatchId:o.largestBatchId,overlayMutation:ci(i.ct,o.mutation)}}(this.serializer,this.userId,t))}}function Fr(r){return Te(r,"documentOverlays")}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vy{Pt(e){return Te(e,"globals")}getSessionToken(e){return this.Pt(e).get("sessionToken").next(t=>{const n=t==null?void 0:t.value;return n?me.fromUint8Array(n):me.EMPTY_BYTE_STRING})}setSessionToken(e,t){return this.Pt(e).put({name:"sessionToken",value:t.toUint8Array()})}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rn{constructor(){}It(e,t){this.Tt(e,t),t.Et()}Tt(e,t){if("nullValue"in e)this.dt(t,5);else if("booleanValue"in e)this.dt(t,10),t.At(e.booleanValue?1:0);else if("integerValue"in e)this.dt(t,15),t.At(ce(e.integerValue));else if("doubleValue"in e){const n=ce(e.doubleValue);isNaN(n)?this.dt(t,13):(this.dt(t,15),ri(n)?t.At(0):t.At(n))}else if("timestampValue"in e){let n=e.timestampValue;this.dt(t,20),typeof n=="string"&&(n=st(n)),t.Rt(`${n.seconds||""}`),t.At(n.nanos||0)}else if("stringValue"in e)this.Vt(e.stringValue,t),this.ft(t);else if("bytesValue"in e)this.dt(t,30),t.gt(ot(e.bytesValue)),this.ft(t);else if("referenceValue"in e)this.yt(e.referenceValue,t);else if("geoPointValue"in e){const n=e.geoPointValue;this.dt(t,45),t.At(n.latitude||0),t.At(n.longitude||0)}else"mapValue"in e?Kh(e)?this.dt(t,Number.MAX_SAFE_INTEGER):Ls(e)?this.wt(e.mapValue,t):(this.St(e.mapValue,t),this.ft(t)):"arrayValue"in e?(this.bt(e.arrayValue,t),this.ft(t)):L()}Vt(e,t){this.dt(t,25),this.Dt(e,t)}Dt(e,t){t.Rt(e)}St(e,t){const n=e.fields||{};this.dt(t,55);for(const i of Object.keys(n))this.Vt(i,t),this.Tt(n[i],t)}wt(e,t){var n,i;const s=e.fields||{};this.dt(t,53);const o="value",u=((i=(n=s[o].arrayValue)===null||n===void 0?void 0:n.values)===null||i===void 0?void 0:i.length)||0;this.dt(t,15),t.At(ce(u)),this.Vt(o,t),this.Tt(s[o],t)}bt(e,t){const n=e.values||[];this.dt(t,50);for(const i of n)this.Tt(i,t)}yt(e,t){this.dt(t,37),M.fromName(e).path.forEach(n=>{this.dt(t,60),this.Dt(n,t)})}dt(e,t){e.At(t)}ft(e){e.At(2)}}rn.vt=new rn;function Dy(r){if(r===0)return 8;let e=0;return!(r>>4)&&(e+=4,r<<=4),!(r>>6)&&(e+=2,r<<=2),!(r>>7)&&(e+=1),e}function Tl(r){const e=64-function(n){let i=0;for(let s=0;s<8;++s){const o=Dy(255&n[s]);if(i+=o,o!==8)break}return i}(r);return Math.ceil(e/8)}class ky{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Ct(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.Ft(n.value),n=t.next();this.Mt()}xt(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.Ot(n.value),n=t.next();this.Nt()}Lt(e){for(const t of e){const n=t.charCodeAt(0);if(n<128)this.Ft(n);else if(n<2048)this.Ft(960|n>>>6),this.Ft(128|63&n);else if(t<"\uD800"||"\uDBFF"<t)this.Ft(480|n>>>12),this.Ft(128|63&n>>>6),this.Ft(128|63&n);else{const i=t.codePointAt(0);this.Ft(240|i>>>18),this.Ft(128|63&i>>>12),this.Ft(128|63&i>>>6),this.Ft(128|63&i)}}this.Mt()}Bt(e){for(const t of e){const n=t.charCodeAt(0);if(n<128)this.Ot(n);else if(n<2048)this.Ot(960|n>>>6),this.Ot(128|63&n);else if(t<"\uD800"||"\uDBFF"<t)this.Ot(480|n>>>12),this.Ot(128|63&n>>>6),this.Ot(128|63&n);else{const i=t.codePointAt(0);this.Ot(240|i>>>18),this.Ot(128|63&i>>>12),this.Ot(128|63&i>>>6),this.Ot(128|63&i)}}this.Nt()}kt(e){const t=this.qt(e),n=Tl(t);this.Qt(1+n),this.buffer[this.position++]=255&n;for(let i=t.length-n;i<t.length;++i)this.buffer[this.position++]=255&t[i]}Kt(e){const t=this.qt(e),n=Tl(t);this.Qt(1+n),this.buffer[this.position++]=~(255&n);for(let i=t.length-n;i<t.length;++i)this.buffer[this.position++]=~(255&t[i])}$t(){this.Ut(255),this.Ut(255)}Wt(){this.Gt(255),this.Gt(255)}reset(){this.position=0}seed(e){this.Qt(e.length),this.buffer.set(e,this.position),this.position+=e.length}zt(){return this.buffer.slice(0,this.position)}qt(e){const t=function(s){const o=new DataView(new ArrayBuffer(8));return o.setFloat64(0,s,!1),new Uint8Array(o.buffer)}(e),n=(128&t[0])!=0;t[0]^=n?255:128;for(let i=1;i<t.length;++i)t[i]^=n?255:0;return t}Ft(e){const t=255&e;t===0?(this.Ut(0),this.Ut(255)):t===255?(this.Ut(255),this.Ut(0)):this.Ut(t)}Ot(e){const t=255&e;t===0?(this.Gt(0),this.Gt(255)):t===255?(this.Gt(255),this.Gt(0)):this.Gt(e)}Mt(){this.Ut(0),this.Ut(1)}Nt(){this.Gt(0),this.Gt(1)}Ut(e){this.Qt(1),this.buffer[this.position++]=e}Gt(e){this.Qt(1),this.buffer[this.position++]=~e}Qt(e){const t=e+this.position;if(t<=this.buffer.length)return;let n=2*this.buffer.length;n<t&&(n=t);const i=new Uint8Array(n);i.set(this.buffer),this.buffer=i}}class xy{constructor(e){this.jt=e}gt(e){this.jt.Ct(e)}Rt(e){this.jt.Lt(e)}At(e){this.jt.kt(e)}Et(){this.jt.$t()}}class Ny{constructor(e){this.jt=e}gt(e){this.jt.xt(e)}Rt(e){this.jt.Bt(e)}At(e){this.jt.Kt(e)}Et(){this.jt.Wt()}}class Ur{constructor(){this.jt=new ky,this.Ht=new xy(this.jt),this.Jt=new Ny(this.jt)}seed(e){this.jt.seed(e)}Yt(e){return e===0?this.Ht:this.Jt}zt(){return this.jt.zt()}reset(){this.jt.reset()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sn{constructor(e,t,n,i){this.indexId=e,this.documentKey=t,this.arrayValue=n,this.directionalValue=i}Zt(){const e=this.directionalValue.length,t=e===0||this.directionalValue[e-1]===255?e+1:e,n=new Uint8Array(t);return n.set(this.directionalValue,0),t!==e?n.set([0],this.directionalValue.length):++n[n.length-1],new sn(this.indexId,this.documentKey,this.arrayValue,n)}}function _t(r,e){let t=r.indexId-e.indexId;return t!==0?t:(t=vl(r.arrayValue,e.arrayValue),t!==0?t:(t=vl(r.directionalValue,e.directionalValue),t!==0?t:M.comparator(r.documentKey,e.documentKey)))}function vl(r,e){for(let t=0;t<r.length&&t<e.length;++t){const n=r[t]-e[t];if(n!==0)return n}return r.length-e.length}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class El{constructor(e){this.Xt=new ne((t,n)=>ue.comparator(t.field,n.field)),this.collectionId=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment(),this.en=e.orderBy,this.tn=[];for(const t of e.filters){const n=t;n.isInequality()?this.Xt=this.Xt.add(n):this.tn.push(n)}}get nn(){return this.Xt.size>1}rn(e){if(U(e.collectionGroup===this.collectionId),this.nn)return!1;const t=Ko(e);if(t!==void 0&&!this.sn(t))return!1;const n=en(e);let i=new Set,s=0,o=0;for(;s<n.length&&this.sn(n[s]);++s)i=i.add(n[s].fieldPath.canonicalString());if(s===n.length)return!0;if(this.Xt.size>0){const u=this.Xt.getIterator().getNext();if(!i.has(u.field.canonicalString())){const c=n[s];if(!this.on(u,c)||!this._n(this.en[o++],c))return!1}++s}for(;s<n.length;++s){const u=n[s];if(o>=this.en.length||!this._n(this.en[o++],u))return!1}return!0}an(){if(this.nn)return null;let e=new ne(ue.comparator);const t=[];for(const n of this.tn)if(!n.field.isKeyField())if(n.op==="array-contains"||n.op==="array-contains-any")t.push(new cn(n.field,2));else{if(e.has(n.field))continue;e=e.add(n.field),t.push(new cn(n.field,0))}for(const n of this.en)n.field.isKeyField()||e.has(n.field)||(e=e.add(n.field),t.push(new cn(n.field,n.dir==="asc"?0:1)));return new Hn(Hn.UNKNOWN_ID,this.collectionId,t,Jn.empty())}sn(e){for(const t of this.tn)if(this.on(t,e))return!0;return!1}on(e,t){if(e===void 0||!e.field.isEqual(t.fieldPath))return!1;const n=e.op==="array-contains"||e.op==="array-contains-any";return t.kind===2===n}_n(e,t){return!!e.field.isEqual(t.fieldPath)&&(t.kind===0&&e.dir==="asc"||t.kind===1&&e.dir==="desc")}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ud(r){var e,t;if(U(r instanceof Y||r instanceof te),r instanceof Y){if(r instanceof td){const i=((t=(e=r.value.arrayValue)===null||e===void 0?void 0:e.values)===null||t===void 0?void 0:t.map(s=>Y.create(r.field,"==",s)))||[];return te.create(i,"or")}return r}const n=r.filters.map(i=>Ud(i));return te.create(n,r.op)}function Oy(r){if(r.getFilters().length===0)return[];const e=oa(Ud(r));return U(Bd(e)),ia(e)||sa(e)?[e]:e.getFilters()}function ia(r){return r instanceof Y}function sa(r){return r instanceof te&&Sa(r)}function Bd(r){return ia(r)||sa(r)||function(t){if(t instanceof te&&Jo(t)){for(const n of t.getFilters())if(!ia(n)&&!sa(n))return!1;return!0}return!1}(r)}function oa(r){if(U(r instanceof Y||r instanceof te),r instanceof Y)return r;if(r.filters.length===1)return oa(r.filters[0]);const e=r.filters.map(n=>oa(n));let t=te.create(e,r.op);return t=ws(t),Bd(t)?t:(U(t instanceof te),U(Xn(t)),U(t.filters.length>1),t.filters.reduce((n,i)=>Fa(n,i)))}function Fa(r,e){let t;return U(r instanceof Y||r instanceof te),U(e instanceof Y||e instanceof te),t=r instanceof Y?e instanceof Y?function(i,s){return te.create([i,s],"and")}(r,e):wl(r,e):e instanceof Y?wl(e,r):function(i,s){if(U(i.filters.length>0&&s.filters.length>0),Xn(i)&&Xn(s))return Xh(i,s.getFilters());const o=Jo(i)?i:s,u=Jo(i)?s:i,c=o.filters.map(h=>Fa(h,u));return te.create(c,"or")}(r,e),ws(t)}function wl(r,e){if(Xn(e))return Xh(e,r.getFilters());{const t=e.filters.map(n=>Fa(r,n));return te.create(t,"or")}}function ws(r){if(U(r instanceof Y||r instanceof te),r instanceof Y)return r;const e=r.getFilters();if(e.length===1)return ws(e[0]);if(Jh(r))return r;const t=e.map(i=>ws(i)),n=[];return t.forEach(i=>{i instanceof Y?n.push(i):i instanceof te&&(i.op===r.op?n.push(...i.filters):n.push(i))}),n.length===1?n[0]:te.create(n,r.op)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class My{constructor(){this.un=new Ua}addToCollectionParentIndex(e,t){return this.un.add(t),w.resolve()}getCollectionParents(e,t){return w.resolve(this.un.getEntries(t))}addFieldIndex(e,t){return w.resolve()}deleteFieldIndex(e,t){return w.resolve()}deleteAllFieldIndexes(e){return w.resolve()}createTargetIndexes(e,t){return w.resolve()}getDocumentsMatchingTarget(e,t){return w.resolve(null)}getIndexType(e,t){return w.resolve(0)}getFieldIndexes(e,t){return w.resolve([])}getNextCollectionGroupToUpdate(e){return w.resolve(null)}getMinOffset(e,t){return w.resolve(Ge.min())}getMinOffsetFromCollectionGroup(e,t){return w.resolve(Ge.min())}updateCollectionGroup(e,t,n){return w.resolve()}updateIndexEntries(e,t){return w.resolve()}}class Ua{constructor(){this.index={}}add(e){const t=e.lastSegment(),n=e.popLast(),i=this.index[t]||new ne(J.comparator),s=!i.has(n);return this.index[t]=i.add(n),s}has(e){const t=e.lastSegment(),n=e.popLast(),i=this.index[t];return i&&i.has(n)}getEntries(e){return(this.index[e]||new ne(J.comparator)).toArray()}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xi=new Uint8Array(0);class Ly{constructor(e,t){this.databaseId=t,this.cn=new Ua,this.ln=new ct(n=>gn(n),(n,i)=>gi(n,i)),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.cn.has(t)){const n=t.lastSegment(),i=t.popLast();e.addOnCommittedListener(()=>{this.cn.add(t)});const s={collectionId:n,parent:Ne(i)};return Al(e).put(s)}return w.resolve()}getCollectionParents(e,t){const n=[],i=IDBKeyRange.bound([t,""],[kh(t),""],!1,!0);return Al(e).U(i).next(s=>{for(const o of s){if(o.collectionId!==t)break;n.push(Qe(o.parent))}return n})}addFieldIndex(e,t){const n=Br(e),i=function(u){return{indexId:u.indexId,collectionGroup:u.collectionGroup,fields:u.fields.map(c=>[c.fieldPath.canonicalString(),c.kind])}}(t);delete i.indexId;const s=n.add(i);if(t.indexState){const o=xn(e);return s.next(u=>{o.put(_l(u,this.uid,t.indexState.sequenceNumber,t.indexState.offset))})}return s.next()}deleteFieldIndex(e,t){const n=Br(e),i=xn(e),s=kn(e);return n.delete(t.indexId).next(()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))).next(()=>s.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))}deleteAllFieldIndexes(e){const t=Br(e),n=kn(e),i=xn(e);return t.j().next(()=>n.j()).next(()=>i.j())}createTargetIndexes(e,t){return w.forEach(this.hn(t),n=>this.getIndexType(e,n).next(i=>{if(i===0||i===1){const s=new El(n).an();if(s!=null)return this.addFieldIndex(e,s)}}))}getDocumentsMatchingTarget(e,t){const n=kn(e);let i=!0;const s=new Map;return w.forEach(this.hn(t),o=>this.Pn(e,o).next(u=>{i&&(i=!!u),s.set(o,u)})).next(()=>{if(i){let o=$();const u=[];return w.forEach(s,(c,h)=>{k("IndexedDbIndexManager",`Using index ${function(F){return`id=${F.indexId}|cg=${F.collectionGroup}|f=${F.fields.map(K=>`${K.fieldPath}:${K.kind}`).join(",")}`}(c)} to execute ${gn(t)}`);const f=function(F,K){const Z=Ko(K);if(Z===void 0)return null;for(const G of Is(F,Z.fieldPath))switch(G.op){case"array-contains-any":return G.value.arrayValue.values||[];case"array-contains":return[G.value]}return null}(h,c),p=function(F,K){const Z=new Map;for(const G of en(K))for(const T of Is(F,G.fieldPath))switch(T.op){case"==":case"in":Z.set(G.fieldPath.canonicalString(),T.value);break;case"not-in":case"!=":return Z.set(G.fieldPath.canonicalString(),T.value),Array.from(Z.values())}return null}(h,c),_=function(F,K){const Z=[];let G=!0;for(const T of en(K)){const g=T.kind===0?nl(F,T.fieldPath,F.startAt):rl(F,T.fieldPath,F.startAt);Z.push(g.value),G&&(G=g.inclusive)}return new Mt(Z,G)}(h,c),R=function(F,K){const Z=[];let G=!0;for(const T of en(K)){const g=T.kind===0?rl(F,T.fieldPath,F.endAt):nl(F,T.fieldPath,F.endAt);Z.push(g.value),G&&(G=g.inclusive)}return new Mt(Z,G)}(h,c),V=this.In(c,h,_),x=this.In(c,h,R),C=this.Tn(c,h,p),B=this.En(c.indexId,f,V,_.inclusive,x,R.inclusive,C);return w.forEach(B,j=>n.G(j,t.limit).next(F=>{F.forEach(K=>{const Z=M.fromSegments(K.documentKey);o.has(Z)||(o=o.add(Z),u.push(Z))})}))}).next(()=>u)}return w.resolve(null)})}hn(e){let t=this.ln.get(e);return t||(e.filters.length===0?t=[e]:t=Oy(te.create(e.filters,"and")).map(n=>Xo(e.path,e.collectionGroup,e.orderBy,n.getFilters(),e.limit,e.startAt,e.endAt)),this.ln.set(e,t),t)}En(e,t,n,i,s,o,u){const c=(t!=null?t.length:1)*Math.max(n.length,s.length),h=c/(t!=null?t.length:1),f=[];for(let p=0;p<c;++p){const _=t?this.dn(t[p/h]):Xi,R=this.An(e,_,n[p%h],i),V=this.Rn(e,_,s[p%h],o),x=u.map(C=>this.An(e,_,C,!0));f.push(...this.createRange(R,V,x))}return f}An(e,t,n,i){const s=new sn(e,M.empty(),t,n);return i?s:s.Zt()}Rn(e,t,n,i){const s=new sn(e,M.empty(),t,n);return i?s.Zt():s}Pn(e,t){const n=new El(t),i=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,i).next(s=>{let o=null;for(const u of s)n.rn(u)&&(!o||u.fields.length>o.fields.length)&&(o=u);return o})}getIndexType(e,t){let n=2;const i=this.hn(t);return w.forEach(i,s=>this.Pn(e,s).next(o=>{o?n!==0&&o.fields.length<function(c){let h=new ne(ue.comparator),f=!1;for(const p of c.filters)for(const _ of p.getFlattenedFilters())_.field.isKeyField()||(_.op==="array-contains"||_.op==="array-contains-any"?f=!0:h=h.add(_.field));for(const p of c.orderBy)p.field.isKeyField()||(h=h.add(p.field));return h.size+(f?1:0)}(s)&&(n=1):n=0})).next(()=>function(o){return o.limit!==null}(t)&&i.length>1&&n===2?1:n)}Vn(e,t){const n=new Ur;for(const i of en(e)){const s=t.data.field(i.fieldPath);if(s==null)return null;const o=n.Yt(i.kind);rn.vt.It(s,o)}return n.zt()}dn(e){const t=new Ur;return rn.vt.It(e,t.Yt(0)),t.zt()}mn(e,t){const n=new Ur;return rn.vt.It(pn(this.databaseId,t),n.Yt(function(s){const o=en(s);return o.length===0?0:o[o.length-1].kind}(e))),n.zt()}Tn(e,t,n){if(n===null)return[];let i=[];i.push(new Ur);let s=0;for(const o of en(e)){const u=n[s++];for(const c of i)if(this.fn(t,o.fieldPath)&&oi(u))i=this.gn(i,o,u);else{const h=c.Yt(o.kind);rn.vt.It(u,h)}}return this.pn(i)}In(e,t,n){return this.Tn(e,t,n.position)}pn(e){const t=[];for(let n=0;n<e.length;++n)t[n]=e[n].zt();return t}gn(e,t,n){const i=[...e],s=[];for(const o of n.arrayValue.values||[])for(const u of i){const c=new Ur;c.seed(u.zt()),rn.vt.It(o,c.Yt(t.kind)),s.push(c)}return s}fn(e,t){return!!e.filters.find(n=>n instanceof Y&&n.field.isEqual(t)&&(n.op==="in"||n.op==="not-in"))}getFieldIndexes(e,t){const n=Br(e),i=xn(e);return(t?n.U("collectionGroupIndex",IDBKeyRange.bound(t,t)):n.U()).next(s=>{const o=[];return w.forEach(s,u=>i.get([u.indexId,this.uid]).next(c=>{o.push(function(f,p){const _=p?new Jn(p.sequenceNumber,new Ge(Tn(p.readTime),new M(Qe(p.documentKey)),p.largestBatchId)):Jn.empty(),R=f.fields.map(([V,x])=>new cn(ue.fromServerFormat(V),x));return new Hn(f.indexId,f.collectionGroup,R,_)}(u,c))})).next(()=>o)})}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next(t=>t.length===0?null:(t.sort((n,i)=>{const s=n.indexState.sequenceNumber-i.indexState.sequenceNumber;return s!==0?s:z(n.collectionGroup,i.collectionGroup)}),t[0].collectionGroup))}updateCollectionGroup(e,t,n){const i=Br(e),s=xn(e);return this.yn(e).next(o=>i.U("collectionGroupIndex",IDBKeyRange.bound(t,t)).next(u=>w.forEach(u,c=>s.put(_l(c.indexId,this.uid,o,n)))))}updateIndexEntries(e,t){const n=new Map;return w.forEach(t,(i,s)=>{const o=n.get(i.collectionGroup);return(o?w.resolve(o):this.getFieldIndexes(e,i.collectionGroup)).next(u=>(n.set(i.collectionGroup,u),w.forEach(u,c=>this.wn(e,i,c).next(h=>{const f=this.Sn(s,c);return h.isEqual(f)?w.resolve():this.bn(e,s,c,h,f)}))))})}Dn(e,t,n,i){return kn(e).put({indexId:i.indexId,uid:this.uid,arrayValue:i.arrayValue,directionalValue:i.directionalValue,orderedDocumentKey:this.mn(n,t.key),documentKey:t.key.path.toArray()})}vn(e,t,n,i){return kn(e).delete([i.indexId,this.uid,i.arrayValue,i.directionalValue,this.mn(n,t.key),t.key.path.toArray()])}wn(e,t,n){const i=kn(e);let s=new ne(_t);return i.J({index:"documentKeyIndex",range:IDBKeyRange.only([n.indexId,this.uid,this.mn(n,t)])},(o,u)=>{s=s.add(new sn(n.indexId,t,u.arrayValue,u.directionalValue))}).next(()=>s)}Sn(e,t){let n=new ne(_t);const i=this.Vn(t,e);if(i==null)return n;const s=Ko(t);if(s!=null){const o=e.data.field(s.fieldPath);if(oi(o))for(const u of o.arrayValue.values||[])n=n.add(new sn(t.indexId,e.key,this.dn(u),i))}else n=n.add(new sn(t.indexId,e.key,Xi,i));return n}bn(e,t,n,i,s){k("IndexedDbIndexManager","Updating index entries for document '%s'",t.key);const o=[];return function(c,h,f,p,_){const R=c.getIterator(),V=h.getIterator();let x=Dn(R),C=Dn(V);for(;x||C;){let B=!1,j=!1;if(x&&C){const F=f(x,C);F<0?j=!0:F>0&&(B=!0)}else x!=null?j=!0:B=!0;B?(p(C),C=Dn(V)):j?(_(x),x=Dn(R)):(x=Dn(R),C=Dn(V))}}(i,s,_t,u=>{o.push(this.Dn(e,t,n,u))},u=>{o.push(this.vn(e,t,n,u))}),w.waitFor(o)}yn(e){let t=1;return xn(e).J({index:"sequenceNumberIndex",reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},(n,i,s)=>{s.done(),t=i.sequenceNumber+1}).next(()=>t)}createRange(e,t,n){n=n.sort((o,u)=>_t(o,u)).filter((o,u,c)=>!u||_t(o,c[u-1])!==0);const i=[];i.push(e);for(const o of n){const u=_t(o,e),c=_t(o,t);if(u===0)i[0]=e.Zt();else if(u>0&&c<0)i.push(o),i.push(o.Zt());else if(c>0)break}i.push(t);const s=[];for(let o=0;o<i.length;o+=2){if(this.Cn(i[o],i[o+1]))return[];const u=[i[o].indexId,this.uid,i[o].arrayValue,i[o].directionalValue,Xi,[]],c=[i[o+1].indexId,this.uid,i[o+1].arrayValue,i[o+1].directionalValue,Xi,[]];s.push(IDBKeyRange.bound(u,c))}return s}Cn(e,t){return _t(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(Rl)}getMinOffset(e,t){return w.mapArray(this.hn(t),n=>this.Pn(e,n).next(i=>i||L())).next(Rl)}}function Al(r){return Te(r,"collectionParents")}function kn(r){return Te(r,"indexEntries")}function Br(r){return Te(r,"indexConfiguration")}function xn(r){return Te(r,"indexState")}function Rl(r){U(r.length!==0);let e=r[0].indexState.offset,t=e.largestBatchId;for(let n=1;n<r.length;n++){const i=r[n].indexState.offset;Aa(i,e)<0&&(e=i),t<i.largestBatchId&&(t=i.largestBatchId)}return new Ge(e.readTime,e.documentKey,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bl={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0};class xe{constructor(e,t,n){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=n}static withCacheSize(e){return new xe(e,xe.DEFAULT_COLLECTION_PERCENTILE,xe.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qd(r,e,t){const n=r.store("mutations"),i=r.store("documentMutations"),s=[],o=IDBKeyRange.only(t.batchId);let u=0;const c=n.J({range:o},(f,p,_)=>(u++,_.delete()));s.push(c.next(()=>{U(u===1)}));const h=[];for(const f of t.mutations){const p=Uh(e,f.key.path,t.batchId);s.push(i.delete(p)),h.push(f.key)}return w.waitFor(s).next(()=>h)}function As(r){if(!r)return 0;let e;if(r.document)e=r.document;else if(r.unknownDocument)e=r.unknownDocument;else{if(!r.noDocument)throw L();e=r.noDocument}return JSON.stringify(e).length}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */xe.DEFAULT_COLLECTION_PERCENTILE=10,xe.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,xe.DEFAULT=new xe(41943040,xe.DEFAULT_COLLECTION_PERCENTILE,xe.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),xe.DISABLED=new xe(-1,0,0);class js{constructor(e,t,n,i){this.userId=e,this.serializer=t,this.indexManager=n,this.referenceDelegate=i,this.Fn={}}static lt(e,t,n,i){U(e.uid!=="");const s=e.isAuthenticated()?e.uid:"";return new js(s,t,n,i)}checkEmpty(e){let t=!0;const n=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return yt(e).J({index:"userMutationsIndex",range:n},(i,s,o)=>{t=!1,o.done()}).next(()=>t)}addMutationBatch(e,t,n,i){const s=Fn(e),o=yt(e);return o.add({}).next(u=>{U(typeof u=="number");const c=new ka(u,t,n,i),h=function(R,V,x){const C=x.baseMutations.map(j=>ci(R.ct,j)),B=x.mutations.map(j=>ci(R.ct,j));return{userId:V,batchId:x.batchId,localWriteTimeMs:x.localWriteTime.toMillis(),baseMutations:C,mutations:B}}(this.serializer,this.userId,c),f=[];let p=new ne((_,R)=>z(_.canonicalString(),R.canonicalString()));for(const _ of i){const R=Uh(this.userId,_.key.path,u);p=p.add(_.key.path.popLast()),f.push(o.put(h)),f.push(s.put(R,A_))}return p.forEach(_=>{f.push(this.indexManager.addToCollectionParentIndex(e,_))}),e.addOnCommittedListener(()=>{this.Fn[u]=c.keys()}),w.waitFor(f).next(()=>c)})}lookupMutationBatch(e,t){return yt(e).get(t).next(n=>n?(U(n.userId===this.userId),nn(this.serializer,n)):null)}Mn(e,t){return this.Fn[t]?w.resolve(this.Fn[t]):this.lookupMutationBatch(e,t).next(n=>{if(n){const i=n.keys();return this.Fn[t]=i,i}return null})}getNextMutationBatchAfterBatchId(e,t){const n=t+1,i=IDBKeyRange.lowerBound([this.userId,n]);let s=null;return yt(e).J({index:"userMutationsIndex",range:i},(o,u,c)=>{u.userId===this.userId&&(U(u.batchId>=n),s=nn(this.serializer,u)),c.done()}).next(()=>s)}getHighestUnacknowledgedBatchId(e){const t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let n=-1;return yt(e).J({index:"userMutationsIndex",range:t,reverse:!0},(i,s,o)=>{n=s.batchId,o.done()}).next(()=>n)}getAllMutationBatches(e){const t=IDBKeyRange.bound([this.userId,-1],[this.userId,Number.POSITIVE_INFINITY]);return yt(e).U("userMutationsIndex",t).next(n=>n.map(i=>nn(this.serializer,i)))}getAllMutationBatchesAffectingDocumentKey(e,t){const n=ss(this.userId,t.path),i=IDBKeyRange.lowerBound(n),s=[];return Fn(e).J({range:i},(o,u,c)=>{const[h,f,p]=o,_=Qe(f);if(h===this.userId&&t.path.isEqual(_))return yt(e).get(p).next(R=>{if(!R)throw L();U(R.userId===this.userId),s.push(nn(this.serializer,R))});c.done()}).next(()=>s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new ne(z);const i=[];return t.forEach(s=>{const o=ss(this.userId,s.path),u=IDBKeyRange.lowerBound(o),c=Fn(e).J({range:u},(h,f,p)=>{const[_,R,V]=h,x=Qe(R);_===this.userId&&s.path.isEqual(x)?n=n.add(V):p.done()});i.push(c)}),w.waitFor(i).next(()=>this.xn(e,n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,i=n.length+1,s=ss(this.userId,n),o=IDBKeyRange.lowerBound(s);let u=new ne(z);return Fn(e).J({range:o},(c,h,f)=>{const[p,_,R]=c,V=Qe(_);p===this.userId&&n.isPrefixOf(V)?V.length===i&&(u=u.add(R)):f.done()}).next(()=>this.xn(e,u))}xn(e,t){const n=[],i=[];return t.forEach(s=>{i.push(yt(e).get(s).next(o=>{if(o===null)throw L();U(o.userId===this.userId),n.push(nn(this.serializer,o))}))}),w.waitFor(i).next(()=>n)}removeMutationBatch(e,t){return qd(e._e,this.userId,t).next(n=>(e.addOnCommittedListener(()=>{this.On(t.batchId)}),w.forEach(n,i=>this.referenceDelegate.markPotentiallyOrphaned(e,i))))}On(e){delete this.Fn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next(t=>{if(!t)return w.resolve();const n=IDBKeyRange.lowerBound(function(o){return[o]}(this.userId)),i=[];return Fn(e).J({range:n},(s,o,u)=>{if(s[0]===this.userId){const c=Qe(s[1]);i.push(c)}else u.done()}).next(()=>{U(i.length===0)})})}containsKey(e,t){return jd(e,this.userId,t)}Nn(e){return zd(e).get(this.userId).next(t=>t||{userId:this.userId,lastAcknowledgedBatchId:-1,lastStreamToken:""})}}function jd(r,e,t){const n=ss(e,t.path),i=n[1],s=IDBKeyRange.lowerBound(n);let o=!1;return Fn(r).J({range:s,H:!0},(u,c,h)=>{const[f,p,_]=u;f===e&&p===i&&(o=!0),h.done()}).next(()=>o)}function yt(r){return Te(r,"mutations")}function Fn(r){return Te(r,"documentMutations")}function zd(r){return Te(r,"mutationQueues")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vn{constructor(e){this.Ln=e}next(){return this.Ln+=2,this.Ln}static Bn(){return new vn(0)}static kn(){return new vn(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fy{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.qn(e).next(t=>{const n=new vn(t.highestTargetId);return t.highestTargetId=n.next(),this.Qn(e,t).next(()=>t.highestTargetId)})}getLastRemoteSnapshotVersion(e){return this.qn(e).next(t=>q.fromTimestamp(new he(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds)))}getHighestSequenceNumber(e){return this.qn(e).next(t=>t.highestListenSequenceNumber)}setTargetsMetadata(e,t,n){return this.qn(e).next(i=>(i.highestListenSequenceNumber=t,n&&(i.lastRemoteSnapshotVersion=n.toTimestamp()),t>i.highestListenSequenceNumber&&(i.highestListenSequenceNumber=t),this.Qn(e,i)))}addTargetData(e,t){return this.Kn(e,t).next(()=>this.qn(e).next(n=>(n.targetCount+=1,this.$n(t,n),this.Qn(e,n))))}updateTargetData(e,t){return this.Kn(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next(()=>Nn(e).delete(t.targetId)).next(()=>this.qn(e)).next(n=>(U(n.targetCount>0),n.targetCount-=1,this.Qn(e,n)))}removeTargets(e,t,n){let i=0;const s=[];return Nn(e).J((o,u)=>{const c=Kr(u);c.sequenceNumber<=t&&n.get(c.targetId)===null&&(i++,s.push(this.removeTargetData(e,c)))}).next(()=>w.waitFor(s)).next(()=>i)}forEachTarget(e,t){return Nn(e).J((n,i)=>{const s=Kr(i);t(s)})}qn(e){return Sl(e).get("targetGlobalKey").next(t=>(U(t!==null),t))}Qn(e,t){return Sl(e).put("targetGlobalKey",t)}Kn(e,t){return Nn(e).put(Fd(this.serializer,t))}$n(e,t){let n=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,n=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,n=!0),n}getTargetCount(e){return this.qn(e).next(t=>t.targetCount)}getTargetData(e,t){const n=gn(t),i=IDBKeyRange.bound([n,Number.NEGATIVE_INFINITY],[n,Number.POSITIVE_INFINITY]);let s=null;return Nn(e).J({range:i,index:"queryTargetsIndex"},(o,u,c)=>{const h=Kr(u);gi(t,h.target)&&(s=h,c.done())}).next(()=>s)}addMatchingKeys(e,t,n){const i=[],s=At(e);return t.forEach(o=>{const u=Ne(o.path);i.push(s.put({targetId:n,path:u})),i.push(this.referenceDelegate.addReference(e,n,o))}),w.waitFor(i)}removeMatchingKeys(e,t,n){const i=At(e);return w.forEach(t,s=>{const o=Ne(s.path);return w.waitFor([i.delete([n,o]),this.referenceDelegate.removeReference(e,n,s)])})}removeMatchingKeysForTargetId(e,t){const n=At(e),i=IDBKeyRange.bound([t],[t+1],!1,!0);return n.delete(i)}getMatchingKeysForTargetId(e,t){const n=IDBKeyRange.bound([t],[t+1],!1,!0),i=At(e);let s=$();return i.J({range:n,H:!0},(o,u,c)=>{const h=Qe(o[1]),f=new M(h);s=s.add(f)}).next(()=>s)}containsKey(e,t){const n=Ne(t.path),i=IDBKeyRange.bound([n],[kh(n)],!1,!0);let s=0;return At(e).J({index:"documentTargetsIndex",H:!0,range:i},([o,u],c,h)=>{o!==0&&(s++,h.done())}).next(()=>s>0)}ot(e,t){return Nn(e).get(t).next(n=>n?Kr(n):null)}}function Nn(r){return Te(r,"targets")}function Sl(r){return Te(r,"targetGlobal")}function At(r){return Te(r,"targetDocuments")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pl([r,e],[t,n]){const i=z(r,t);return i===0?z(e,n):i}class Uy{constructor(e){this.Un=e,this.buffer=new ne(Pl),this.Wn=0}Gn(){return++this.Wn}zn(e){const t=[e,this.Gn()];if(this.buffer.size<this.Un)this.buffer=this.buffer.add(t);else{const n=this.buffer.last();Pl(t,n)<0&&(this.buffer=this.buffer.delete(n).add(t))}}get maxValue(){return this.buffer.last()[0]}}class Gd{constructor(e,t,n){this.garbageCollector=e,this.asyncQueue=t,this.localStore=n,this.jn=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Hn(6e4)}stop(){this.jn&&(this.jn.cancel(),this.jn=null)}get started(){return this.jn!==null}Hn(e){k("LruGarbageCollector",`Garbage collection scheduled in ${e}ms`),this.jn=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.jn=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){jt(t)?k("LruGarbageCollector","Ignoring IndexedDB error during garbage collection: ",t):await qt(t)}await this.Hn(3e5)})}}class By{constructor(e,t){this.Jn=e,this.params=t}calculateTargetCount(e,t){return this.Jn.Yn(e).next(n=>Math.floor(t/100*n))}nthSequenceNumber(e,t){if(t===0)return w.resolve(Fe.oe);const n=new Uy(t);return this.Jn.forEachTarget(e,i=>n.zn(i.sequenceNumber)).next(()=>this.Jn.Zn(e,i=>n.zn(i))).next(()=>n.maxValue)}removeTargets(e,t,n){return this.Jn.removeTargets(e,t,n)}removeOrphanedDocuments(e,t){return this.Jn.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(k("LruGarbageCollector","Garbage collection skipped; disabled"),w.resolve(bl)):this.getCacheSize(e).next(n=>n<this.params.cacheSizeCollectionThreshold?(k("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),bl):this.Xn(e,t))}getCacheSize(e){return this.Jn.getCacheSize(e)}Xn(e,t){let n,i,s,o,u,c,h;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(p=>(p>this.params.maximumSequenceNumbersToCollect?(k("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),i=this.params.maximumSequenceNumbersToCollect):i=p,o=Date.now(),this.nthSequenceNumber(e,i))).next(p=>(n=p,u=Date.now(),this.removeTargets(e,n,t))).next(p=>(s=p,c=Date.now(),this.removeOrphanedDocuments(e,n))).next(p=>(h=Date.now(),On()<=H.DEBUG&&k("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-f}ms
	Determined least recently used ${i} in `+(u-o)+`ms
	Removed ${s} targets in `+(c-u)+`ms
	Removed ${p} documents in `+(h-c)+`ms
Total Duration: ${h-f}ms`),w.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:s,documentsRemoved:p})))}}function $d(r,e){return new By(r,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qy{constructor(e,t){this.db=e,this.garbageCollector=$d(this,t)}Yn(e){const t=this.er(e);return this.db.getTargetCache().getTargetCount(e).next(n=>t.next(i=>n+i))}er(e){let t=0;return this.Zn(e,n=>{t++}).next(()=>t)}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}Zn(e,t){return this.tr(e,(n,i)=>t(i))}addReference(e,t,n){return Zi(e,n)}removeReference(e,t,n){return Zi(e,n)}removeTargets(e,t,n){return this.db.getTargetCache().removeTargets(e,t,n)}markPotentiallyOrphaned(e,t){return Zi(e,t)}nr(e,t){return function(i,s){let o=!1;return zd(i).Y(u=>jd(i,u,s).next(c=>(c&&(o=!0),w.resolve(!c)))).next(()=>o)}(e,t)}removeOrphanedDocuments(e,t){const n=this.db.getRemoteDocumentCache().newChangeBuffer(),i=[];let s=0;return this.tr(e,(o,u)=>{if(u<=t){const c=this.nr(e,o).next(h=>{if(!h)return s++,n.getEntry(e,o).next(()=>(n.removeEntry(o,q.min()),At(e).delete(function(p){return[0,Ne(p.path)]}(o))))});i.push(c)}}).next(()=>w.waitFor(i)).next(()=>n.apply(e)).next(()=>s)}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,n)}updateLimboDocument(e,t){return Zi(e,t)}tr(e,t){const n=At(e);let i,s=Fe.oe;return n.J({index:"documentTargetsIndex"},([o,u],{path:c,sequenceNumber:h})=>{o===0?(s!==Fe.oe&&t(new M(Qe(i)),s),s=h,i=c):s=Fe.oe}).next(()=>{s!==Fe.oe&&t(new M(Qe(i)),s)})}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function Zi(r,e){return At(r).put(function(n,i){return{targetId:0,path:Ne(n.path),sequenceNumber:i}}(e,r.currentSequenceNumber))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kd{constructor(){this.changes=new ct(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,ae.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const n=this.changes.get(t);return n!==void 0?w.resolve(n):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jy{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,n){return Xt(e).put(n)}removeEntry(e,t,n){return Xt(e).delete(function(s,o){const u=s.path.toArray();return[u.slice(0,u.length-2),u[u.length-2],Es(o),u[u.length-1]]}(t,n))}updateMetadata(e,t){return this.getMetadata(e).next(n=>(n.byteSize+=t,this.rr(e,n)))}getEntry(e,t){let n=ae.newInvalidDocument(t);return Xt(e).J({index:"documentKeyIndex",range:IDBKeyRange.only(qr(t))},(i,s)=>{n=this.ir(t,s)}).next(()=>n)}sr(e,t){let n={size:0,document:ae.newInvalidDocument(t)};return Xt(e).J({index:"documentKeyIndex",range:IDBKeyRange.only(qr(t))},(i,s)=>{n={document:this.ir(t,s),size:As(s)}}).next(()=>n)}getEntries(e,t){let n=Be();return this._r(e,t,(i,s)=>{const o=this.ir(i,s);n=n.insert(i,o)}).next(()=>n)}ar(e,t){let n=Be(),i=new se(M.comparator);return this._r(e,t,(s,o)=>{const u=this.ir(s,o);n=n.insert(s,u),i=i.insert(s,As(o))}).next(()=>({documents:n,ur:i}))}_r(e,t,n){if(t.isEmpty())return w.resolve();let i=new ne(Dl);t.forEach(c=>i=i.add(c));const s=IDBKeyRange.bound(qr(i.first()),qr(i.last())),o=i.getIterator();let u=o.getNext();return Xt(e).J({index:"documentKeyIndex",range:s},(c,h,f)=>{const p=M.fromSegments([...h.prefixPath,h.collectionGroup,h.documentId]);for(;u&&Dl(u,p)<0;)n(u,null),u=o.getNext();u&&u.isEqual(p)&&(n(u,h),u=o.hasNext()?o.getNext():null),u?f.$(qr(u)):f.done()}).next(()=>{for(;u;)n(u,null),u=o.hasNext()?o.getNext():null})}getDocumentsMatchingQuery(e,t,n,i,s){const o=t.path,u=[o.popLast().toArray(),o.lastSegment(),Es(n.readTime),n.documentKey.path.isEmpty()?"":n.documentKey.path.lastSegment()],c=[o.popLast().toArray(),o.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return Xt(e).U(IDBKeyRange.bound(u,c,!0)).next(h=>{s==null||s.incrementDocumentReadCount(h.length);let f=Be();for(const p of h){const _=this.ir(M.fromSegments(p.prefixPath.concat(p.collectionGroup,p.documentId)),p);_.isFoundDocument()&&(yi(t,_)||i.has(_.key))&&(f=f.insert(_.key,_))}return f})}getAllFromCollectionGroup(e,t,n,i){let s=Be();const o=Vl(t,n),u=Vl(t,Ge.max());return Xt(e).J({index:"collectionGroupIndex",range:IDBKeyRange.bound(o,u,!0)},(c,h,f)=>{const p=this.ir(M.fromSegments(h.prefixPath.concat(h.collectionGroup,h.documentId)),h);s=s.insert(p.key,p),s.size===i&&f.done()}).next(()=>s)}newChangeBuffer(e){return new zy(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next(t=>t.byteSize)}getMetadata(e){return Cl(e).get("remoteDocumentGlobalKey").next(t=>(U(!!t),t))}rr(e,t){return Cl(e).put("remoteDocumentGlobalKey",t)}ir(e,t){if(t){const n=Py(this.serializer,t);if(!(n.isNoDocument()&&n.version.isEqual(q.min())))return n}return ae.newInvalidDocument(e)}}function Qd(r){return new jy(r)}class zy extends Kd{constructor(e,t){super(),this.cr=e,this.trackRemovals=t,this.lr=new ct(n=>n.toString(),(n,i)=>n.isEqual(i))}applyChanges(e){const t=[];let n=0,i=new ne((s,o)=>z(s.canonicalString(),o.canonicalString()));return this.changes.forEach((s,o)=>{const u=this.lr.get(s);if(t.push(this.cr.removeEntry(e,s,u.readTime)),o.isValidDocument()){const c=pl(this.cr.serializer,o);i=i.add(s.path.popLast());const h=As(c);n+=h-u.size,t.push(this.cr.addEntry(e,s,c))}else if(n-=u.size,this.trackRemovals){const c=pl(this.cr.serializer,o.convertToNoDocument(q.min()));t.push(this.cr.addEntry(e,s,c))}}),i.forEach(s=>{t.push(this.cr.indexManager.addToCollectionParentIndex(e,s))}),t.push(this.cr.updateMetadata(e,n)),w.waitFor(t)}getFromCache(e,t){return this.cr.sr(e,t).next(n=>(this.lr.set(t,{size:n.size,readTime:n.document.readTime}),n.document))}getAllFromCache(e,t){return this.cr.ar(e,t).next(({documents:n,ur:i})=>(i.forEach((s,o)=>{this.lr.set(s,{size:o,readTime:n.get(s).readTime})}),n))}}function Cl(r){return Te(r,"remoteDocumentGlobal")}function Xt(r){return Te(r,"remoteDocumentsV14")}function qr(r){const e=r.path.toArray();return[e.slice(0,e.length-2),e[e.length-2],e[e.length-1]]}function Vl(r,e){const t=e.documentKey.path.toArray();return[r,Es(e.readTime),t.slice(0,t.length-2),t.length>0?t[t.length-1]:""]}function Dl(r,e){const t=r.path.toArray(),n=e.path.toArray();let i=0;for(let s=0;s<t.length-2&&s<n.length-2;++s)if(i=z(t[s],n[s]),i)return i;return i=z(t.length,n.length),i||(i=z(t[t.length-2],n[n.length-2]),i||z(t[t.length-1],n[n.length-1]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gy{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wd{constructor(e,t,n,i){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=n,this.indexManager=i}getDocument(e,t){let n=null;return this.documentOverlayCache.getOverlay(e,t).next(i=>(n=i,this.remoteDocumentCache.getEntry(e,t))).next(i=>(n!==null&&Yr(n.mutation,i,Ue.empty(),he.now()),i))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(n=>this.getLocalViewOfDocuments(e,n,$()).next(()=>n))}getLocalViewOfDocuments(e,t,n=$()){const i=We();return this.populateOverlays(e,i,t).next(()=>this.computeViews(e,t,i,n).next(s=>{let o=Gr();return s.forEach((u,c)=>{o=o.insert(u,c.overlayedDocument)}),o}))}getOverlayedDocuments(e,t){const n=We();return this.populateOverlays(e,n,t).next(()=>this.computeViews(e,t,n,$()))}populateOverlays(e,t,n){const i=[];return n.forEach(s=>{t.has(s)||i.push(s)}),this.documentOverlayCache.getOverlays(e,i).next(s=>{s.forEach((o,u)=>{t.set(o,u)})})}computeViews(e,t,n,i){let s=Be();const o=Jr(),u=function(){return Jr()}();return t.forEach((c,h)=>{const f=n.get(h.key);i.has(h.key)&&(f===void 0||f.mutation instanceof lt)?s=s.insert(h.key,h):f!==void 0?(o.set(h.key,f.mutation.getFieldMask()),Yr(f.mutation,h,f.mutation.getFieldMask(),he.now())):o.set(h.key,Ue.empty())}),this.recalculateAndSaveOverlays(e,s).next(c=>(c.forEach((h,f)=>o.set(h,f)),t.forEach((h,f)=>{var p;return u.set(h,new Gy(f,(p=o.get(h))!==null&&p!==void 0?p:null))}),u))}recalculateAndSaveOverlays(e,t){const n=Jr();let i=new se((o,u)=>o-u),s=$();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(o=>{for(const u of o)u.keys().forEach(c=>{const h=t.get(c);if(h===null)return;let f=n.get(c)||Ue.empty();f=u.applyToLocalView(h,f),n.set(c,f);const p=(i.get(u.batchId)||$()).add(c);i=i.insert(u.batchId,p)})}).next(()=>{const o=[],u=i.getReverseIterator();for(;u.hasNext();){const c=u.getNext(),h=c.key,f=c.value,p=ld();f.forEach(_=>{if(!s.has(_)){const R=_d(t.get(_),n.get(_));R!==null&&p.set(_,R),s=s.add(_)}}),o.push(this.documentOverlayCache.saveOverlays(e,h,p))}return w.waitFor(o)}).next(()=>n)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(n=>this.recalculateAndSaveOverlays(e,n))}getDocumentsMatchingQuery(e,t,n,i){return function(o){return M.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Pa(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,n,i):this.getDocumentsMatchingCollectionQuery(e,t,n,i)}getNextDocuments(e,t,n,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,n,i).next(s=>{const o=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,n.largestBatchId,i-s.size):w.resolve(We());let u=-1,c=s;return o.next(h=>w.forEach(h,(f,p)=>(u<p.largestBatchId&&(u=p.largestBatchId),s.get(f)?w.resolve():this.remoteDocumentCache.getEntry(e,f).next(_=>{c=c.insert(f,_)}))).next(()=>this.populateOverlays(e,h,s)).next(()=>this.computeViews(e,c,h,$())).next(f=>({batchId:u,changes:cd(f)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new M(t)).next(n=>{let i=Gr();return n.isFoundDocument()&&(i=i.insert(n.key,n)),i})}getDocumentsMatchingCollectionGroupQuery(e,t,n,i){const s=t.collectionGroup;let o=Gr();return this.indexManager.getCollectionParents(e,s).next(u=>w.forEach(u,c=>{const h=function(p,_){return new ut(_,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)}(t,c.child(s));return this.getDocumentsMatchingCollectionQuery(e,h,n,i).next(f=>{f.forEach((p,_)=>{o=o.insert(p,_)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,t,n,i){let s;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,n.largestBatchId).next(o=>(s=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,n,s,i))).next(o=>{s.forEach((c,h)=>{const f=h.getKey();o.get(f)===null&&(o=o.insert(f,ae.newInvalidDocument(f)))});let u=Gr();return o.forEach((c,h)=>{const f=s.get(c);f!==void 0&&Yr(f.mutation,h,Ue.empty(),he.now()),yi(t,h)&&(u=u.insert(c,h))}),u})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $y{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,t){return w.resolve(this.hr.get(t))}saveBundleMetadata(e,t){return this.hr.set(t.id,function(i){return{id:i.id,version:i.version,createTime:ye(i.createTime)}}(t)),w.resolve()}getNamedQuery(e,t){return w.resolve(this.Pr.get(t))}saveNamedQuery(e,t){return this.Pr.set(t.name,function(i){return{name:i.name,query:La(i.bundledQuery),readTime:ye(i.readTime)}}(t)),w.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ky{constructor(){this.overlays=new se(M.comparator),this.Ir=new Map}getOverlay(e,t){return w.resolve(this.overlays.get(t))}getOverlays(e,t){const n=We();return w.forEach(t,i=>this.getOverlay(e,i).next(s=>{s!==null&&n.set(i,s)})).next(()=>n)}saveOverlays(e,t,n){return n.forEach((i,s)=>{this.ht(e,t,s)}),w.resolve()}removeOverlaysForBatchId(e,t,n){const i=this.Ir.get(n);return i!==void 0&&(i.forEach(s=>this.overlays=this.overlays.remove(s)),this.Ir.delete(n)),w.resolve()}getOverlaysForCollection(e,t,n){const i=We(),s=t.length+1,o=new M(t.child("")),u=this.overlays.getIteratorFrom(o);for(;u.hasNext();){const c=u.getNext().value,h=c.getKey();if(!t.isPrefixOf(h.path))break;h.path.length===s&&c.largestBatchId>n&&i.set(c.getKey(),c)}return w.resolve(i)}getOverlaysForCollectionGroup(e,t,n,i){let s=new se((h,f)=>h-f);const o=this.overlays.getIterator();for(;o.hasNext();){const h=o.getNext().value;if(h.getKey().getCollectionGroup()===t&&h.largestBatchId>n){let f=s.get(h.largestBatchId);f===null&&(f=We(),s=s.insert(h.largestBatchId,f)),f.set(h.getKey(),h)}}const u=We(),c=s.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach((h,f)=>u.set(h,f)),!(u.size()>=i)););return w.resolve(u)}ht(e,t,n){const i=this.overlays.get(n.key);if(i!==null){const o=this.Ir.get(i.largestBatchId).delete(n.key);this.Ir.set(i.largestBatchId,o)}this.overlays=this.overlays.insert(n.key,new Na(t,n));let s=this.Ir.get(t);s===void 0&&(s=$(),this.Ir.set(t,s)),this.Ir.set(t,s.add(n.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qy{constructor(){this.sessionToken=me.EMPTY_BYTE_STRING}getSessionToken(e){return w.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,w.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ba{constructor(){this.Tr=new ne(ve.Er),this.dr=new ne(ve.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,t){const n=new ve(e,t);this.Tr=this.Tr.add(n),this.dr=this.dr.add(n)}Rr(e,t){e.forEach(n=>this.addReference(n,t))}removeReference(e,t){this.Vr(new ve(e,t))}mr(e,t){e.forEach(n=>this.removeReference(n,t))}gr(e){const t=new M(new J([])),n=new ve(t,e),i=new ve(t,e+1),s=[];return this.dr.forEachInRange([n,i],o=>{this.Vr(o),s.push(o.key)}),s}pr(){this.Tr.forEach(e=>this.Vr(e))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){const t=new M(new J([])),n=new ve(t,e),i=new ve(t,e+1);let s=$();return this.dr.forEachInRange([n,i],o=>{s=s.add(o.key)}),s}containsKey(e){const t=new ve(e,0),n=this.Tr.firstAfterOrEqual(t);return n!==null&&e.isEqual(n.key)}}class ve{constructor(e,t){this.key=e,this.wr=t}static Er(e,t){return M.comparator(e.key,t.key)||z(e.wr,t.wr)}static Ar(e,t){return z(e.wr,t.wr)||M.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wy{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Sr=1,this.br=new ne(ve.Er)}checkEmpty(e){return w.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,n,i){const s=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new ka(s,t,n,i);this.mutationQueue.push(o);for(const u of i)this.br=this.br.add(new ve(u.key,s)),this.indexManager.addToCollectionParentIndex(e,u.key.path.popLast());return w.resolve(o)}lookupMutationBatch(e,t){return w.resolve(this.Dr(t))}getNextMutationBatchAfterBatchId(e,t){const n=t+1,i=this.vr(n),s=i<0?0:i;return w.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return w.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(e){return w.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const n=new ve(t,0),i=new ve(t,Number.POSITIVE_INFINITY),s=[];return this.br.forEachInRange([n,i],o=>{const u=this.Dr(o.wr);s.push(u)}),w.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new ne(z);return t.forEach(i=>{const s=new ve(i,0),o=new ve(i,Number.POSITIVE_INFINITY);this.br.forEachInRange([s,o],u=>{n=n.add(u.wr)})}),w.resolve(this.Cr(n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,i=n.length+1;let s=n;M.isDocumentKey(s)||(s=s.child(""));const o=new ve(new M(s),0);let u=new ne(z);return this.br.forEachWhile(c=>{const h=c.key.path;return!!n.isPrefixOf(h)&&(h.length===i&&(u=u.add(c.wr)),!0)},o),w.resolve(this.Cr(u))}Cr(e){const t=[];return e.forEach(n=>{const i=this.Dr(n);i!==null&&t.push(i)}),t}removeMutationBatch(e,t){U(this.Fr(t.batchId,"removed")===0),this.mutationQueue.shift();let n=this.br;return w.forEach(t.mutations,i=>{const s=new ve(i.key,t.batchId);return n=n.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)}).next(()=>{this.br=n})}On(e){}containsKey(e,t){const n=new ve(t,0),i=this.br.firstAfterOrEqual(n);return w.resolve(t.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,w.resolve()}Fr(e,t){return this.vr(e)}vr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Dr(e){const t=this.vr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hy{constructor(e){this.Mr=e,this.docs=function(){return new se(M.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const n=t.key,i=this.docs.get(n),s=i?i.size:0,o=this.Mr(t);return this.docs=this.docs.insert(n,{document:t.mutableCopy(),size:o}),this.size+=o-s,this.indexManager.addToCollectionParentIndex(e,n.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const n=this.docs.get(t);return w.resolve(n?n.document.mutableCopy():ae.newInvalidDocument(t))}getEntries(e,t){let n=Be();return t.forEach(i=>{const s=this.docs.get(i);n=n.insert(i,s?s.document.mutableCopy():ae.newInvalidDocument(i))}),w.resolve(n)}getDocumentsMatchingQuery(e,t,n,i){let s=Be();const o=t.path,u=new M(o.child("")),c=this.docs.getIteratorFrom(u);for(;c.hasNext();){const{key:h,value:{document:f}}=c.getNext();if(!o.isPrefixOf(h.path))break;h.path.length>o.length+1||Aa(Nh(f),n)<=0||(i.has(f.key)||yi(t,f))&&(s=s.insert(f.key,f.mutableCopy()))}return w.resolve(s)}getAllFromCollectionGroup(e,t,n,i){L()}Or(e,t){return w.forEach(this.docs,n=>t(n))}newChangeBuffer(e){return new Jy(this)}getSize(e){return w.resolve(this.size)}}class Jy extends Kd{constructor(e){super(),this.cr=e}applyChanges(e){const t=[];return this.changes.forEach((n,i)=>{i.isValidDocument()?t.push(this.cr.addEntry(e,i)):this.cr.removeEntry(n)}),w.waitFor(t)}getFromCache(e,t){return this.cr.getEntry(e,t)}getAllFromCache(e,t){return this.cr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yy{constructor(e){this.persistence=e,this.Nr=new ct(t=>gn(t),gi),this.lastRemoteSnapshotVersion=q.min(),this.highestTargetId=0,this.Lr=0,this.Br=new Ba,this.targetCount=0,this.kr=vn.Bn()}forEachTarget(e,t){return this.Nr.forEach((n,i)=>t(i)),w.resolve()}getLastRemoteSnapshotVersion(e){return w.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return w.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),w.resolve(this.highestTargetId)}setTargetsMetadata(e,t,n){return n&&(this.lastRemoteSnapshotVersion=n),t>this.Lr&&(this.Lr=t),w.resolve()}Kn(e){this.Nr.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.kr=new vn(t),this.highestTargetId=t),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,t){return this.Kn(t),this.targetCount+=1,w.resolve()}updateTargetData(e,t){return this.Kn(t),w.resolve()}removeTargetData(e,t){return this.Nr.delete(t.target),this.Br.gr(t.targetId),this.targetCount-=1,w.resolve()}removeTargets(e,t,n){let i=0;const s=[];return this.Nr.forEach((o,u)=>{u.sequenceNumber<=t&&n.get(u.targetId)===null&&(this.Nr.delete(o),s.push(this.removeMatchingKeysForTargetId(e,u.targetId)),i++)}),w.waitFor(s).next(()=>i)}getTargetCount(e){return w.resolve(this.targetCount)}getTargetData(e,t){const n=this.Nr.get(t)||null;return w.resolve(n)}addMatchingKeys(e,t,n){return this.Br.Rr(t,n),w.resolve()}removeMatchingKeys(e,t,n){this.Br.mr(t,n);const i=this.persistence.referenceDelegate,s=[];return i&&t.forEach(o=>{s.push(i.markPotentiallyOrphaned(e,o))}),w.waitFor(s)}removeMatchingKeysForTargetId(e,t){return this.Br.gr(t),w.resolve()}getMatchingKeysForTargetId(e,t){const n=this.Br.yr(t);return w.resolve(n)}containsKey(e,t){return w.resolve(this.Br.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qa{constructor(e,t){this.qr={},this.overlays={},this.Qr=new Fe(0),this.Kr=!1,this.Kr=!0,this.$r=new Qy,this.referenceDelegate=e(this),this.Ur=new Yy(this),this.indexManager=new My,this.remoteDocumentCache=function(i){return new Hy(i)}(n=>this.referenceDelegate.Wr(n)),this.serializer=new Ld(t),this.Gr=new $y(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new Ky,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let n=this.qr[e.toKey()];return n||(n=new Wy(t,this.referenceDelegate),this.qr[e.toKey()]=n),n}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,t,n){k("MemoryPersistence","Starting transaction:",e);const i=new Xy(this.Qr.next());return this.referenceDelegate.zr(),n(i).next(s=>this.referenceDelegate.jr(i).next(()=>s)).toPromise().then(s=>(i.raiseOnCommittedEvent(),s))}Hr(e,t){return w.or(Object.values(this.qr).map(n=>()=>n.containsKey(e,t)))}}class Xy extends Mh{constructor(e){super(),this.currentSequenceNumber=e}}class zs{constructor(e){this.persistence=e,this.Jr=new Ba,this.Yr=null}static Zr(e){return new zs(e)}get Xr(){if(this.Yr)return this.Yr;throw L()}addReference(e,t,n){return this.Jr.addReference(n,t),this.Xr.delete(n.toString()),w.resolve()}removeReference(e,t,n){return this.Jr.removeReference(n,t),this.Xr.add(n.toString()),w.resolve()}markPotentiallyOrphaned(e,t){return this.Xr.add(t.toString()),w.resolve()}removeTarget(e,t){this.Jr.gr(t.targetId).forEach(i=>this.Xr.add(i.toString()));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(e,t.targetId).next(i=>{i.forEach(s=>this.Xr.add(s.toString()))}).next(()=>n.removeTargetData(e,t))}zr(){this.Yr=new Set}jr(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return w.forEach(this.Xr,n=>{const i=M.fromPath(n);return this.ei(e,i).next(s=>{s||t.removeEntry(i,q.min())})}).next(()=>(this.Yr=null,t.apply(e)))}updateLimboDocument(e,t){return this.ei(e,t).next(n=>{n?this.Xr.delete(t.toString()):this.Xr.add(t.toString())})}Wr(e){return 0}ei(e,t){return w.or([()=>w.resolve(this.Jr.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Hr(e,t)])}}class Rs{constructor(e,t){this.persistence=e,this.ti=new ct(n=>Ne(n.path),(n,i)=>n.isEqual(i)),this.garbageCollector=$d(this,t)}static Zr(e,t){return new Rs(e,t)}zr(){}jr(e){return w.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}Yn(e){const t=this.er(e);return this.persistence.getTargetCache().getTargetCount(e).next(n=>t.next(i=>n+i))}er(e){let t=0;return this.Zn(e,n=>{t++}).next(()=>t)}Zn(e,t){return w.forEach(this.ti,(n,i)=>this.nr(e,n,i).next(s=>s?w.resolve():t(i)))}removeTargets(e,t,n){return this.persistence.getTargetCache().removeTargets(e,t,n)}removeOrphanedDocuments(e,t){let n=0;const i=this.persistence.getRemoteDocumentCache(),s=i.newChangeBuffer();return i.Or(e,o=>this.nr(e,o,t).next(u=>{u||(n++,s.removeEntry(o,q.min()))})).next(()=>s.apply(e)).next(()=>n)}markPotentiallyOrphaned(e,t){return this.ti.set(t,e.currentSequenceNumber),w.resolve()}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,n)}addReference(e,t,n){return this.ti.set(n,e.currentSequenceNumber),w.resolve()}removeReference(e,t,n){return this.ti.set(n,e.currentSequenceNumber),w.resolve()}updateLimboDocument(e,t){return this.ti.set(t,e.currentSequenceNumber),w.resolve()}Wr(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=as(e.data.value)),t}nr(e,t,n){return w.or([()=>this.persistence.Hr(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const i=this.ti.get(t);return w.resolve(i!==void 0&&i>n)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zy{constructor(e){this.serializer=e}O(e,t,n,i){const s=new Ns("createOrUpgrade",t);n<1&&i>=1&&(function(c){c.createObjectStore("owner")}(e),function(c){c.createObjectStore("mutationQueues",{keyPath:"userId"}),c.createObjectStore("mutations",{keyPath:"batchId",autoIncrement:!0}).createIndex("userMutationsIndex",$c,{unique:!0}),c.createObjectStore("documentMutations")}(e),kl(e),function(c){c.createObjectStore("remoteDocuments")}(e));let o=w.resolve();return n<3&&i>=3&&(n!==0&&(function(c){c.deleteObjectStore("targetDocuments"),c.deleteObjectStore("targets"),c.deleteObjectStore("targetGlobal")}(e),kl(e)),o=o.next(()=>function(c){const h=c.store("targetGlobal"),f={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:q.min().toTimestamp(),targetCount:0};return h.put("targetGlobalKey",f)}(s))),n<4&&i>=4&&(n!==0&&(o=o.next(()=>function(c,h){return h.store("mutations").U().next(f=>{c.deleteObjectStore("mutations"),c.createObjectStore("mutations",{keyPath:"batchId",autoIncrement:!0}).createIndex("userMutationsIndex",$c,{unique:!0});const p=h.store("mutations"),_=f.map(R=>p.put(R));return w.waitFor(_)})}(e,s))),o=o.next(()=>{(function(c){c.createObjectStore("clientMetadata",{keyPath:"clientId"})})(e)})),n<5&&i>=5&&(o=o.next(()=>this.ni(s))),n<6&&i>=6&&(o=o.next(()=>(function(c){c.createObjectStore("remoteDocumentGlobal")}(e),this.ri(s)))),n<7&&i>=7&&(o=o.next(()=>this.ii(s))),n<8&&i>=8&&(o=o.next(()=>this.si(e,s))),n<9&&i>=9&&(o=o.next(()=>{(function(c){c.objectStoreNames.contains("remoteDocumentChanges")&&c.deleteObjectStore("remoteDocumentChanges")})(e)})),n<10&&i>=10&&(o=o.next(()=>this.oi(s))),n<11&&i>=11&&(o=o.next(()=>{(function(c){c.createObjectStore("bundles",{keyPath:"bundleId"})})(e),function(c){c.createObjectStore("namedQueries",{keyPath:"name"})}(e)})),n<12&&i>=12&&(o=o.next(()=>{(function(c){const h=c.createObjectStore("documentOverlays",{keyPath:M_});h.createIndex("collectionPathOverlayIndex",L_,{unique:!1}),h.createIndex("collectionGroupOverlayIndex",F_,{unique:!1})})(e)})),n<13&&i>=13&&(o=o.next(()=>function(c){const h=c.createObjectStore("remoteDocumentsV14",{keyPath:R_});h.createIndex("documentKeyIndex",b_),h.createIndex("collectionGroupIndex",S_)}(e)).next(()=>this._i(e,s)).next(()=>e.deleteObjectStore("remoteDocuments"))),n<14&&i>=14&&(o=o.next(()=>this.ai(e,s))),n<15&&i>=15&&(o=o.next(()=>function(c){c.createObjectStore("indexConfiguration",{keyPath:"indexId",autoIncrement:!0}).createIndex("collectionGroupIndex","collectionGroup",{unique:!1}),c.createObjectStore("indexState",{keyPath:k_}).createIndex("sequenceNumberIndex",x_,{unique:!1}),c.createObjectStore("indexEntries",{keyPath:N_}).createIndex("documentKeyIndex",O_,{unique:!1})}(e))),n<16&&i>=16&&(o=o.next(()=>{t.objectStore("indexState").clear()}).next(()=>{t.objectStore("indexEntries").clear()})),n<17&&i>=17&&(o=o.next(()=>{(function(c){c.createObjectStore("globals",{keyPath:"name"})})(e)})),o}ri(e){let t=0;return e.store("remoteDocuments").J((n,i)=>{t+=As(i)}).next(()=>{const n={byteSize:t};return e.store("remoteDocumentGlobal").put("remoteDocumentGlobalKey",n)})}ni(e){const t=e.store("mutationQueues"),n=e.store("mutations");return t.U().next(i=>w.forEach(i,s=>{const o=IDBKeyRange.bound([s.userId,-1],[s.userId,s.lastAcknowledgedBatchId]);return n.U("userMutationsIndex",o).next(u=>w.forEach(u,c=>{U(c.userId===s.userId);const h=nn(this.serializer,c);return qd(e,s.userId,h).next(()=>{})}))}))}ii(e){const t=e.store("targetDocuments"),n=e.store("remoteDocuments");return e.store("targetGlobal").get("targetGlobalKey").next(i=>{const s=[];return n.J((o,u)=>{const c=new J(o),h=function(p){return[0,Ne(p)]}(c);s.push(t.get(h).next(f=>f?w.resolve():(p=>t.put({targetId:0,path:Ne(p),sequenceNumber:i.highestListenSequenceNumber}))(c)))}).next(()=>w.waitFor(s))})}si(e,t){e.createObjectStore("collectionParents",{keyPath:D_});const n=t.store("collectionParents"),i=new Ua,s=o=>{if(i.add(o)){const u=o.lastSegment(),c=o.popLast();return n.put({collectionId:u,parent:Ne(c)})}};return t.store("remoteDocuments").J({H:!0},(o,u)=>{const c=new J(o);return s(c.popLast())}).next(()=>t.store("documentMutations").J({H:!0},([o,u,c],h)=>{const f=Qe(u);return s(f.popLast())}))}oi(e){const t=e.store("targets");return t.J((n,i)=>{const s=Kr(i),o=Fd(this.serializer,s);return t.put(o)})}_i(e,t){const n=t.store("remoteDocuments"),i=[];return n.J((s,o)=>{const u=t.store("remoteDocumentsV14"),c=function(p){return p.document?new M(J.fromString(p.document.name).popFirst(5)):p.noDocument?M.fromSegments(p.noDocument.path):p.unknownDocument?M.fromSegments(p.unknownDocument.path):L()}(o).path.toArray(),h={prefixPath:c.slice(0,c.length-2),collectionGroup:c[c.length-2],documentId:c[c.length-1],readTime:o.readTime||[0,0],unknownDocument:o.unknownDocument,noDocument:o.noDocument,document:o.document,hasCommittedMutations:!!o.hasCommittedMutations};i.push(u.put(h))}).next(()=>w.waitFor(i))}ai(e,t){const n=t.store("mutations"),i=Qd(this.serializer),s=new qa(zs.Zr,this.serializer.ct);return n.U().next(o=>{const u=new Map;return o.forEach(c=>{var h;let f=(h=u.get(c.userId))!==null&&h!==void 0?h:$();nn(this.serializer,c).keys().forEach(p=>f=f.add(p)),u.set(c.userId,f)}),w.forEach(u,(c,h)=>{const f=new Ee(h),p=qs.lt(this.serializer,f),_=s.getIndexManager(f),R=js.lt(f,this.serializer,_,s.referenceDelegate);return new Wd(i,R,p,_).recalculateAndSaveOverlaysForDocumentKeys(new Qo(t,Fe.oe),c).next()})})}}function kl(r){r.createObjectStore("targetDocuments",{keyPath:C_}).createIndex("documentTargetsIndex",V_,{unique:!0}),r.createObjectStore("targets",{keyPath:"targetId"}).createIndex("queryTargetsIndex",P_,{unique:!0}),r.createObjectStore("targetGlobal")}const Oo="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.";class ja{constructor(e,t,n,i,s,o,u,c,h,f,p=17){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=n,this.ui=s,this.window=o,this.document=u,this.ci=h,this.li=f,this.hi=p,this.Qr=null,this.Kr=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Pi=null,this.inForeground=!1,this.Ii=null,this.Ti=null,this.Ei=Number.NEGATIVE_INFINITY,this.di=_=>Promise.resolve(),!ja.D())throw new D(S.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new qy(this,i),this.Ai=t+"main",this.serializer=new Ld(c),this.Ri=new He(this.Ai,this.hi,new Zy(this.serializer)),this.$r=new Vy,this.Ur=new Fy(this.referenceDelegate,this.serializer),this.remoteDocumentCache=Qd(this.serializer),this.Gr=new Cy,this.window&&this.window.localStorage?this.Vi=this.window.localStorage:(this.Vi=null,f===!1&&_e("IndexedDbPersistence","LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.mi().then(()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new D(S.FAILED_PRECONDITION,Oo);return this.fi(),this.gi(),this.pi(),this.runTransaction("getHighestListenSequenceNumber","readonly",e=>this.Ur.getHighestSequenceNumber(e))}).then(e=>{this.Qr=new Fe(e,this.ci)}).then(()=>{this.Kr=!0}).catch(e=>(this.Ri&&this.Ri.close(),Promise.reject(e)))}yi(e){return this.di=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.Ri.L(async t=>{t.newVersion===null&&await e()})}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.ui.enqueueAndForget(async()=>{this.started&&await this.mi()}))}mi(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",e=>es(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next(()=>{if(this.isPrimary)return this.wi(e).next(t=>{t||(this.isPrimary=!1,this.ui.enqueueRetryable(()=>this.di(!1)))})}).next(()=>this.Si(e)).next(t=>this.isPrimary&&!t?this.bi(e).next(()=>!1):!!t&&this.Di(e).next(()=>!0))).catch(e=>{if(jt(e))return k("IndexedDbPersistence","Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return k("IndexedDbPersistence","Releasing owner lease after error during lease refresh",e),!1}).then(e=>{this.isPrimary!==e&&this.ui.enqueueRetryable(()=>this.di(e)),this.isPrimary=e})}wi(e){return jr(e).get("owner").next(t=>w.resolve(this.vi(t)))}Ci(e){return es(e).delete(this.clientId)}async Fi(){if(this.isPrimary&&!this.Mi(this.Ei,18e5)){this.Ei=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",t=>{const n=Te(t,"clientMetadata");return n.U().next(i=>{const s=this.xi(i,18e5),o=i.filter(u=>s.indexOf(u)===-1);return w.forEach(o,u=>n.delete(u.clientId)).next(()=>o)})}).catch(()=>[]);if(this.Vi)for(const t of e)this.Vi.removeItem(this.Oi(t.clientId))}}pi(){this.Ti=this.ui.enqueueAfterDelay("client_metadata_refresh",4e3,()=>this.mi().then(()=>this.Fi()).then(()=>this.pi()))}vi(e){return!!e&&e.ownerId===this.clientId}Si(e){return this.li?w.resolve(!0):jr(e).get("owner").next(t=>{if(t!==null&&this.Mi(t.leaseTimestampMs,5e3)&&!this.Ni(t.ownerId)){if(this.vi(t)&&this.networkEnabled)return!0;if(!this.vi(t)){if(!t.allowTabSynchronization)throw new D(S.FAILED_PRECONDITION,Oo);return!1}}return!(!this.networkEnabled||!this.inForeground)||es(e).U().next(n=>this.xi(n,5e3).find(i=>{if(this.clientId!==i.clientId){const s=!this.networkEnabled&&i.networkEnabled,o=!this.inForeground&&i.inForeground,u=this.networkEnabled===i.networkEnabled;if(s||o&&u)return!0}return!1})===void 0)}).next(t=>(this.isPrimary!==t&&k("IndexedDbPersistence",`Client ${t?"is":"is not"} eligible for a primary lease.`),t))}async shutdown(){this.Kr=!1,this.Li(),this.Ti&&(this.Ti.cancel(),this.Ti=null),this.Bi(),this.ki(),await this.Ri.runTransaction("shutdown","readwrite",["owner","clientMetadata"],e=>{const t=new Qo(e,Fe.oe);return this.bi(t).next(()=>this.Ci(t))}),this.Ri.close(),this.qi()}xi(e,t){return e.filter(n=>this.Mi(n.updateTimeMs,t)&&!this.Ni(n.clientId))}Qi(){return this.runTransaction("getActiveClients","readonly",e=>es(e).U().next(t=>this.xi(t,18e5).map(n=>n.clientId)))}get started(){return this.Kr}getGlobalsCache(){return this.$r}getMutationQueue(e,t){return js.lt(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new Ly(e,this.serializer.ct.databaseId)}getDocumentOverlayCache(e){return qs.lt(this.serializer,e)}getBundleCache(){return this.Gr}runTransaction(e,t,n){k("IndexedDbPersistence","Starting transaction:",e);const i=t==="readonly"?"readonly":"readwrite",s=function(c){return c===17?q_:c===16?B_:c===15?ba:c===14?jh:c===13?qh:c===12?U_:c===11?Bh:void L()}(this.hi);let o;return this.Ri.runTransaction(e,i,s,u=>(o=new Qo(u,this.Qr?this.Qr.next():Fe.oe),t==="readwrite-primary"?this.wi(o).next(c=>!!c||this.Si(o)).next(c=>{if(!c)throw _e(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.ui.enqueueRetryable(()=>this.di(!1)),new D(S.FAILED_PRECONDITION,Oh);return n(o)}).next(c=>this.Di(o).next(()=>c)):this.Ki(o).next(()=>n(o)))).then(u=>(o.raiseOnCommittedEvent(),u))}Ki(e){return jr(e).get("owner").next(t=>{if(t!==null&&this.Mi(t.leaseTimestampMs,5e3)&&!this.Ni(t.ownerId)&&!this.vi(t)&&!(this.li||this.allowTabSynchronization&&t.allowTabSynchronization))throw new D(S.FAILED_PRECONDITION,Oo)})}Di(e){const t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return jr(e).put("owner",t)}static D(){return He.D()}bi(e){const t=jr(e);return t.get("owner").next(n=>this.vi(n)?(k("IndexedDbPersistence","Releasing primary lease."),t.delete("owner")):w.resolve())}Mi(e,t){const n=Date.now();return!(e<n-t)&&(!(e>n)||(_e(`Detected an update time that is in the future: ${e} > ${n}`),!1))}fi(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Ii=()=>{this.ui.enqueueAndForget(()=>(this.inForeground=this.document.visibilityState==="visible",this.mi()))},this.document.addEventListener("visibilitychange",this.Ii),this.inForeground=this.document.visibilityState==="visible")}Bi(){this.Ii&&(this.document.removeEventListener("visibilitychange",this.Ii),this.Ii=null)}gi(){var e;typeof((e=this.window)===null||e===void 0?void 0:e.addEventListener)=="function"&&(this.Pi=()=>{this.Li();const t=/(?:Version|Mobile)\/1[456]/;ih()&&(navigator.appVersion.match(t)||navigator.userAgent.match(t))&&this.ui.enterRestrictedMode(!0),this.ui.enqueueAndForget(()=>this.shutdown())},this.window.addEventListener("pagehide",this.Pi))}ki(){this.Pi&&(this.window.removeEventListener("pagehide",this.Pi),this.Pi=null)}Ni(e){var t;try{const n=((t=this.Vi)===null||t===void 0?void 0:t.getItem(this.Oi(e)))!==null;return k("IndexedDbPersistence",`Client '${e}' ${n?"is":"is not"} zombied in LocalStorage`),n}catch(n){return _e("IndexedDbPersistence","Failed to get zombied client id.",n),!1}}Li(){if(this.Vi)try{this.Vi.setItem(this.Oi(this.clientId),String(Date.now()))}catch(e){_e("Failed to set zombie client id.",e)}}qi(){if(this.Vi)try{this.Vi.removeItem(this.Oi(this.clientId))}catch{}}Oi(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function jr(r){return Te(r,"owner")}function es(r){return Te(r,"clientMetadata")}function za(r,e){let t=r.projectId;return r.isDefaultDatabase||(t+="."+r.database),"firestore/"+e+"/"+t+"/"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ga{constructor(e,t,n,i){this.targetId=e,this.fromCache=t,this.$i=n,this.Ui=i}static Wi(e,t){let n=$(),i=$();for(const s of t.docChanges)switch(s.type){case 0:n=n.add(s.doc.key);break;case 1:i=i.add(s.doc.key)}return new Ga(e,t.fromCache,n,i)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eI{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hd{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=function(){return ih()?8:Lh(qe())>0?6:4}()}initialize(e,t){this.Ji=e,this.indexManager=t,this.Gi=!0}getDocumentsMatchingQuery(e,t,n,i){const s={result:null};return this.Yi(e,t).next(o=>{s.result=o}).next(()=>{if(!s.result)return this.Zi(e,t,i,n).next(o=>{s.result=o})}).next(()=>{if(s.result)return;const o=new eI;return this.Xi(e,t,o).next(u=>{if(s.result=u,this.zi)return this.es(e,t,o,u.size)})}).next(()=>s.result)}es(e,t,n,i){return n.documentReadCount<this.ji?(On()<=H.DEBUG&&k("QueryEngine","SDK will not create cache indexes for query:",Mn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),w.resolve()):(On()<=H.DEBUG&&k("QueryEngine","Query:",Mn(t),"scans",n.documentReadCount,"local documents and returns",i,"documents as results."),n.documentReadCount>this.Hi*i?(On()<=H.DEBUG&&k("QueryEngine","The SDK decides to create cache indexes for query:",Mn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Oe(t))):w.resolve())}Yi(e,t){if(il(t))return w.resolve(null);let n=Oe(t);return this.indexManager.getIndexType(e,n).next(i=>i===0?null:(t.limit!==null&&i===1&&(t=Ts(t,null,"F"),n=Oe(t)),this.indexManager.getDocumentsMatchingTarget(e,n).next(s=>{const o=$(...s);return this.Ji.getDocuments(e,o).next(u=>this.indexManager.getMinOffset(e,n).next(c=>{const h=this.ts(t,u);return this.ns(t,h,o,c.readTime)?this.Yi(e,Ts(t,null,"F")):this.rs(e,h,t,c)}))})))}Zi(e,t,n,i){return il(t)||i.isEqual(q.min())?w.resolve(null):this.Ji.getDocuments(e,n).next(s=>{const o=this.ts(t,s);return this.ns(t,o,n,i)?w.resolve(null):(On()<=H.DEBUG&&k("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),Mn(t)),this.rs(e,o,t,xh(i,-1)).next(u=>u))})}ts(e,t){let n=new ne(ad(e));return t.forEach((i,s)=>{yi(e,s)&&(n=n.add(s))}),n}ns(e,t,n,i){if(e.limit===null)return!1;if(n.size!==t.size)return!0;const s=e.limitType==="F"?t.last():t.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}Xi(e,t,n){return On()<=H.DEBUG&&k("QueryEngine","Using full collection scan to execute query:",Mn(t)),this.Ji.getDocumentsMatchingQuery(e,t,Ge.min(),n)}rs(e,t,n,i){return this.Ji.getDocumentsMatchingQuery(e,n,i).next(s=>(t.forEach(o=>{s=s.insert(o.key,o)}),s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tI{constructor(e,t,n,i){this.persistence=e,this.ss=t,this.serializer=i,this.os=new se(z),this._s=new ct(s=>gn(s),gi),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(n)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Wd(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.os))}}function Jd(r,e,t,n){return new tI(r,e,t,n)}async function Yd(r,e){const t=N(r);return await t.persistence.runTransaction("Handle user change","readonly",n=>{let i;return t.mutationQueue.getAllMutationBatches(n).next(s=>(i=s,t.ls(e),t.mutationQueue.getAllMutationBatches(n))).next(s=>{const o=[],u=[];let c=$();for(const h of i){o.push(h.batchId);for(const f of h.mutations)c=c.add(f.key)}for(const h of s){u.push(h.batchId);for(const f of h.mutations)c=c.add(f.key)}return t.localDocuments.getDocuments(n,c).next(h=>({hs:h,removedBatchIds:o,addedBatchIds:u}))})})}function nI(r,e){const t=N(r);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",n=>{const i=e.batch.keys(),s=t.cs.newChangeBuffer({trackRemovals:!0});return function(u,c,h,f){const p=h.batch,_=p.keys();let R=w.resolve();return _.forEach(V=>{R=R.next(()=>f.getEntry(c,V)).next(x=>{const C=h.docVersions.get(V);U(C!==null),x.version.compareTo(C)<0&&(p.applyToRemoteDocument(x,h),x.isValidDocument()&&(x.setReadTime(h.commitVersion),f.addEntry(x)))})}),R.next(()=>u.mutationQueue.removeMutationBatch(c,p))}(t,n,e,s).next(()=>s.apply(n)).next(()=>t.mutationQueue.performConsistencyCheck(n)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(n,i,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(n,function(u){let c=$();for(let h=0;h<u.mutationResults.length;++h)u.mutationResults[h].transformResults.length>0&&(c=c.add(u.batch.mutations[h].key));return c}(e))).next(()=>t.localDocuments.getDocuments(n,i))})}function Xd(r){const e=N(r);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Ur.getLastRemoteSnapshotVersion(t))}function rI(r,e){const t=N(r),n=e.snapshotVersion;let i=t.os;return t.persistence.runTransaction("Apply remote event","readwrite-primary",s=>{const o=t.cs.newChangeBuffer({trackRemovals:!0});i=t.os;const u=[];e.targetChanges.forEach((f,p)=>{const _=i.get(p);if(!_)return;u.push(t.Ur.removeMatchingKeys(s,f.removedDocuments,p).next(()=>t.Ur.addMatchingKeys(s,f.addedDocuments,p)));let R=_.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(p)!==null?R=R.withResumeToken(me.EMPTY_BYTE_STRING,q.min()).withLastLimboFreeSnapshotVersion(q.min()):f.resumeToken.approximateByteSize()>0&&(R=R.withResumeToken(f.resumeToken,n)),i=i.insert(p,R),function(x,C,B){return x.resumeToken.approximateByteSize()===0||C.snapshotVersion.toMicroseconds()-x.snapshotVersion.toMicroseconds()>=3e8?!0:B.addedDocuments.size+B.modifiedDocuments.size+B.removedDocuments.size>0}(_,R,f)&&u.push(t.Ur.updateTargetData(s,R))});let c=Be(),h=$();if(e.documentUpdates.forEach(f=>{e.resolvedLimboDocuments.has(f)&&u.push(t.persistence.referenceDelegate.updateLimboDocument(s,f))}),u.push(Zd(s,o,e.documentUpdates).next(f=>{c=f.Ps,h=f.Is})),!n.isEqual(q.min())){const f=t.Ur.getLastRemoteSnapshotVersion(s).next(p=>t.Ur.setTargetsMetadata(s,s.currentSequenceNumber,n));u.push(f)}return w.waitFor(u).next(()=>o.apply(s)).next(()=>t.localDocuments.getLocalViewOfDocuments(s,c,h)).next(()=>c)}).then(s=>(t.os=i,s))}function Zd(r,e,t){let n=$(),i=$();return t.forEach(s=>n=n.add(s)),e.getEntries(r,n).next(s=>{let o=Be();return t.forEach((u,c)=>{const h=s.get(u);c.isFoundDocument()!==h.isFoundDocument()&&(i=i.add(u)),c.isNoDocument()&&c.version.isEqual(q.min())?(e.removeEntry(u,c.readTime),o=o.insert(u,c)):!h.isValidDocument()||c.version.compareTo(h.version)>0||c.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(c),o=o.insert(u,c)):k("LocalStore","Ignoring outdated watch update for ",u,". Current version:",h.version," Watch version:",c.version)}),{Ps:o,Is:i}})}function iI(r,e){const t=N(r);return t.persistence.runTransaction("Get next mutation batch","readonly",n=>(e===void 0&&(e=-1),t.mutationQueue.getNextMutationBatchAfterBatchId(n,e)))}function nr(r,e){const t=N(r);return t.persistence.runTransaction("Allocate target","readwrite",n=>{let i;return t.Ur.getTargetData(n,e).next(s=>s?(i=s,w.resolve(i)):t.Ur.allocateTargetId(n).next(o=>(i=new rt(e,o,"TargetPurposeListen",n.currentSequenceNumber),t.Ur.addTargetData(n,i).next(()=>i))))}).then(n=>{const i=t.os.get(n.targetId);return(i===null||n.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(t.os=t.os.insert(n.targetId,n),t._s.set(e,n.targetId)),n})}async function rr(r,e,t){const n=N(r),i=n.os.get(e),s=t?"readwrite":"readwrite-primary";try{t||await n.persistence.runTransaction("Release target",s,o=>n.persistence.referenceDelegate.removeTarget(o,i))}catch(o){if(!jt(o))throw o;k("LocalStore",`Failed to update sequence numbers for target ${e}: ${o}`)}n.os=n.os.remove(e),n._s.delete(i.target)}function bs(r,e,t){const n=N(r);let i=q.min(),s=$();return n.persistence.runTransaction("Execute query","readwrite",o=>function(c,h,f){const p=N(c),_=p._s.get(f);return _!==void 0?w.resolve(p.os.get(_)):p.Ur.getTargetData(h,f)}(n,o,Oe(e)).next(u=>{if(u)return i=u.lastLimboFreeSnapshotVersion,n.Ur.getMatchingKeysForTargetId(o,u.targetId).next(c=>{s=c})}).next(()=>n.ss.getDocumentsMatchingQuery(o,e,t?i:q.min(),t?s:$())).next(u=>(nf(n,od(e),u),{documents:u,Ts:s})))}function ef(r,e){const t=N(r),n=N(t.Ur),i=t.os.get(e);return i?Promise.resolve(i.target):t.persistence.runTransaction("Get target data","readonly",s=>n.ot(s,e).next(o=>o?o.target:null))}function tf(r,e){const t=N(r),n=t.us.get(e)||q.min();return t.persistence.runTransaction("Get new document changes","readonly",i=>t.cs.getAllFromCollectionGroup(i,e,xh(n,-1),Number.MAX_SAFE_INTEGER)).then(i=>(nf(t,e,i),i))}function nf(r,e,t){let n=r.us.get(e)||q.min();t.forEach((i,s)=>{s.readTime.compareTo(n)>0&&(n=s.readTime)}),r.us.set(e,n)}async function sI(r,e,t,n){const i=N(r);let s=$(),o=Be();for(const h of t){const f=e.Es(h.metadata.name);h.document&&(s=s.add(f));const p=e.ds(h);p.setReadTime(e.As(h.metadata.readTime)),o=o.insert(f,p)}const u=i.cs.newChangeBuffer({trackRemovals:!0}),c=await nr(i,function(f){return Oe(lr(J.fromString(`__bundle__/docs/${f}`)))}(n));return i.persistence.runTransaction("Apply bundle documents","readwrite",h=>Zd(h,u,o).next(f=>(u.apply(h),f)).next(f=>i.Ur.removeMatchingKeysForTargetId(h,c.targetId).next(()=>i.Ur.addMatchingKeys(h,s,c.targetId)).next(()=>i.localDocuments.getLocalViewOfDocuments(h,f.Ps,f.Is)).next(()=>f.Ps)))}async function oI(r,e,t=$()){const n=await nr(r,Oe(La(e.bundledQuery))),i=N(r);return i.persistence.runTransaction("Save named query","readwrite",s=>{const o=ye(e.readTime);if(n.snapshotVersion.compareTo(o)>=0)return i.Gr.saveNamedQuery(s,e);const u=n.withResumeToken(me.EMPTY_BYTE_STRING,o);return i.os=i.os.insert(u.targetId,u),i.Ur.updateTargetData(s,u).next(()=>i.Ur.removeMatchingKeysForTargetId(s,n.targetId)).next(()=>i.Ur.addMatchingKeys(s,t,n.targetId)).next(()=>i.Gr.saveNamedQuery(s,e))})}function xl(r,e){return`firestore_clients_${r}_${e}`}function Nl(r,e,t){let n=`firestore_mutations_${r}_${t}`;return e.isAuthenticated()&&(n+=`_${e.uid}`),n}function Mo(r,e){return`firestore_targets_${r}_${e}`}class Ss{constructor(e,t,n,i){this.user=e,this.batchId=t,this.state=n,this.error=i}static Rs(e,t,n){const i=JSON.parse(n);let s,o=typeof i=="object"&&["pending","acknowledged","rejected"].indexOf(i.state)!==-1&&(i.error===void 0||typeof i.error=="object");return o&&i.error&&(o=typeof i.error.message=="string"&&typeof i.error.code=="string",o&&(s=new D(i.error.code,i.error.message))),o?new Ss(e,t,i.state,s):(_e("SharedClientState",`Failed to parse mutation state for ID '${t}': ${n}`),null)}Vs(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class Xr{constructor(e,t,n){this.targetId=e,this.state=t,this.error=n}static Rs(e,t){const n=JSON.parse(t);let i,s=typeof n=="object"&&["not-current","current","rejected"].indexOf(n.state)!==-1&&(n.error===void 0||typeof n.error=="object");return s&&n.error&&(s=typeof n.error.message=="string"&&typeof n.error.code=="string",s&&(i=new D(n.error.code,n.error.message))),s?new Xr(e,n.state,i):(_e("SharedClientState",`Failed to parse target state for ID '${e}': ${t}`),null)}Vs(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class Ps{constructor(e,t){this.clientId=e,this.activeTargetIds=t}static Rs(e,t){const n=JSON.parse(t);let i=typeof n=="object"&&n.activeTargetIds instanceof Array,s=Ca();for(let o=0;i&&o<n.activeTargetIds.length;++o)i=Fh(n.activeTargetIds[o]),s=s.add(n.activeTargetIds[o]);return i?new Ps(e,s):(_e("SharedClientState",`Failed to parse client data for instance '${e}': ${t}`),null)}}class $a{constructor(e,t){this.clientId=e,this.onlineState=t}static Rs(e){const t=JSON.parse(e);return typeof t=="object"&&["Unknown","Online","Offline"].indexOf(t.onlineState)!==-1&&typeof t.clientId=="string"?new $a(t.clientId,t.onlineState):(_e("SharedClientState",`Failed to parse online state: ${e}`),null)}}class aa{constructor(){this.activeTargetIds=Ca()}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Lo{constructor(e,t,n,i,s){this.window=e,this.ui=t,this.persistenceKey=n,this.ps=i,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this.ys=this.ws.bind(this),this.Ss=new se(z),this.started=!1,this.bs=[];const o=n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=s,this.Ds=xl(this.persistenceKey,this.ps),this.vs=function(c){return`firestore_sequence_number_${c}`}(this.persistenceKey),this.Ss=this.Ss.insert(this.ps,new aa),this.Cs=new RegExp(`^firestore_clients_${o}_([^_]*)$`),this.Fs=new RegExp(`^firestore_mutations_${o}_(\\d+)(?:_(.*))?$`),this.Ms=new RegExp(`^firestore_targets_${o}_(\\d+)$`),this.xs=function(c){return`firestore_online_state_${c}`}(this.persistenceKey),this.Os=function(c){return`firestore_bundle_loaded_v2_${c}`}(this.persistenceKey),this.window.addEventListener("storage",this.ys)}static D(e){return!(!e||!e.localStorage)}async start(){const e=await this.syncEngine.Qi();for(const n of e){if(n===this.ps)continue;const i=this.getItem(xl(this.persistenceKey,n));if(i){const s=Ps.Rs(n,i);s&&(this.Ss=this.Ss.insert(s.clientId,s))}}this.Ns();const t=this.storage.getItem(this.xs);if(t){const n=this.Ls(t);n&&this.Bs(n)}for(const n of this.bs)this.ws(n);this.bs=[],this.window.addEventListener("pagehide",()=>this.shutdown()),this.started=!0}writeSequenceNumber(e){this.setItem(this.vs,JSON.stringify(e))}getAllActiveQueryTargets(){return this.ks(this.Ss)}isActiveQueryTarget(e){let t=!1;return this.Ss.forEach((n,i)=>{i.activeTargetIds.has(e)&&(t=!0)}),t}addPendingMutation(e){this.qs(e,"pending")}updateMutationState(e,t,n){this.qs(e,t,n),this.Qs(e)}addLocalQueryTarget(e,t=!0){let n="not-current";if(this.isActiveQueryTarget(e)){const i=this.storage.getItem(Mo(this.persistenceKey,e));if(i){const s=Xr.Rs(e,i);s&&(n=s.state)}}return t&&this.Ks.fs(e),this.Ns(),n}removeLocalQueryTarget(e){this.Ks.gs(e),this.Ns()}isLocalQueryTarget(e){return this.Ks.activeTargetIds.has(e)}clearQueryState(e){this.removeItem(Mo(this.persistenceKey,e))}updateQueryState(e,t,n){this.$s(e,t,n)}handleUserChange(e,t,n){t.forEach(i=>{this.Qs(i)}),this.currentUser=e,n.forEach(i=>{this.addPendingMutation(i)})}setOnlineState(e){this.Us(e)}notifyBundleLoaded(e){this.Ws(e)}shutdown(){this.started&&(this.window.removeEventListener("storage",this.ys),this.removeItem(this.Ds),this.started=!1)}getItem(e){const t=this.storage.getItem(e);return k("SharedClientState","READ",e,t),t}setItem(e,t){k("SharedClientState","SET",e,t),this.storage.setItem(e,t)}removeItem(e){k("SharedClientState","REMOVE",e),this.storage.removeItem(e)}ws(e){const t=e;if(t.storageArea===this.storage){if(k("SharedClientState","EVENT",t.key,t.newValue),t.key===this.Ds)return void _e("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.ui.enqueueRetryable(async()=>{if(this.started){if(t.key!==null){if(this.Cs.test(t.key)){if(t.newValue==null){const n=this.Gs(t.key);return this.zs(n,null)}{const n=this.js(t.key,t.newValue);if(n)return this.zs(n.clientId,n)}}else if(this.Fs.test(t.key)){if(t.newValue!==null){const n=this.Hs(t.key,t.newValue);if(n)return this.Js(n)}}else if(this.Ms.test(t.key)){if(t.newValue!==null){const n=this.Ys(t.key,t.newValue);if(n)return this.Zs(n)}}else if(t.key===this.xs){if(t.newValue!==null){const n=this.Ls(t.newValue);if(n)return this.Bs(n)}}else if(t.key===this.vs){const n=function(s){let o=Fe.oe;if(s!=null)try{const u=JSON.parse(s);U(typeof u=="number"),o=u}catch(u){_e("SharedClientState","Failed to read sequence number from WebStorage",u)}return o}(t.newValue);n!==Fe.oe&&this.sequenceNumberHandler(n)}else if(t.key===this.Os){const n=this.Xs(t.newValue);await Promise.all(n.map(i=>this.syncEngine.eo(i)))}}}else this.bs.push(t)})}}get Ks(){return this.Ss.get(this.ps)}Ns(){this.setItem(this.Ds,this.Ks.Vs())}qs(e,t,n){const i=new Ss(this.currentUser,e,t,n),s=Nl(this.persistenceKey,this.currentUser,e);this.setItem(s,i.Vs())}Qs(e){const t=Nl(this.persistenceKey,this.currentUser,e);this.removeItem(t)}Us(e){const t={clientId:this.ps,onlineState:e};this.storage.setItem(this.xs,JSON.stringify(t))}$s(e,t,n){const i=Mo(this.persistenceKey,e),s=new Xr(e,t,n);this.setItem(i,s.Vs())}Ws(e){const t=JSON.stringify(Array.from(e));this.setItem(this.Os,t)}Gs(e){const t=this.Cs.exec(e);return t?t[1]:null}js(e,t){const n=this.Gs(e);return Ps.Rs(n,t)}Hs(e,t){const n=this.Fs.exec(e),i=Number(n[1]),s=n[2]!==void 0?n[2]:null;return Ss.Rs(new Ee(s),i,t)}Ys(e,t){const n=this.Ms.exec(e),i=Number(n[1]);return Xr.Rs(i,t)}Ls(e){return $a.Rs(e)}Xs(e){return JSON.parse(e)}async Js(e){if(e.user.uid===this.currentUser.uid)return this.syncEngine.no(e.batchId,e.state,e.error);k("SharedClientState",`Ignoring mutation for non-active user ${e.user.uid}`)}Zs(e){return this.syncEngine.ro(e.targetId,e.state,e.error)}zs(e,t){const n=t?this.Ss.insert(e,t):this.Ss.remove(e),i=this.ks(this.Ss),s=this.ks(n),o=[],u=[];return s.forEach(c=>{i.has(c)||o.push(c)}),i.forEach(c=>{s.has(c)||u.push(c)}),this.syncEngine.io(o,u).then(()=>{this.Ss=n})}Bs(e){this.Ss.get(e.clientId)&&this.onlineStateHandler(e.onlineState)}ks(e){let t=Ca();return e.forEach((n,i)=>{t=t.unionWith(i.activeTargetIds)}),t}}class rf{constructor(){this.so=new aa,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,n){}addLocalQueryTarget(e,t=!0){return t&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,t,n){this.oo[e]=t}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new aa,Promise.resolve()}handleUserChange(e,t,n){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aI{_o(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ol{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){k("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.ho)e(0)}lo(){k("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.ho)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ts=null;function Fo(){return ts===null?ts=function(){return 268435456+Math.round(2147483648*Math.random())}():ts++,"0x"+ts.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uI={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cI{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ke="WebChannelConnection";class lI extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const n=t.ssl?"https":"http",i=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Do=n+"://"+t.host,this.vo=`projects/${i}/databases/${s}`,this.Co=this.databaseId.database==="(default)"?`project_id=${i}`:`project_id=${i}&database_id=${s}`}get Fo(){return!1}Mo(t,n,i,s,o){const u=Fo(),c=this.xo(t,n.toUriEncodedString());k("RestConnection",`Sending RPC '${t}' ${u}:`,c,i);const h={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(h,s,o),this.No(t,c,h,i).then(f=>(k("RestConnection",`Received RPC '${t}' ${u}: `,f),f),f=>{throw ze("RestConnection",`RPC '${t}' ${u} failed with error: `,f,"url: ",c,"request:",i),f})}Lo(t,n,i,s,o,u){return this.Mo(t,n,i,s,o)}Oo(t,n,i){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+cr}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),n&&n.headers.forEach((s,o)=>t[o]=s),i&&i.headers.forEach((s,o)=>t[o]=s)}xo(t,n){const i=uI[t];return`${this.Do}/v1/${n}:${i}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,t,n,i){const s=Fo();return new Promise((o,u)=>{const c=new Ah;c.setWithCredentials(!0),c.listenOnce(Rh.COMPLETE,()=>{try{switch(c.getLastErrorCode()){case is.NO_ERROR:const f=c.getResponseJson();k(ke,`XHR for RPC '${e}' ${s} received:`,JSON.stringify(f)),o(f);break;case is.TIMEOUT:k(ke,`RPC '${e}' ${s} timed out`),u(new D(S.DEADLINE_EXCEEDED,"Request time out"));break;case is.HTTP_ERROR:const p=c.getStatus();if(k(ke,`RPC '${e}' ${s} failed with status:`,p,"response text:",c.getResponseText()),p>0){let _=c.getResponseJson();Array.isArray(_)&&(_=_[0]);const R=_==null?void 0:_.error;if(R&&R.status&&R.message){const V=function(C){const B=C.toLowerCase().replace(/_/g,"-");return Object.values(S).indexOf(B)>=0?B:S.UNKNOWN}(R.status);u(new D(V,R.message))}else u(new D(S.UNKNOWN,"Server responded with status "+c.getStatus()))}else u(new D(S.UNAVAILABLE,"Connection failed."));break;default:L()}}finally{k(ke,`RPC '${e}' ${s} completed.`)}});const h=JSON.stringify(i);k(ke,`RPC '${e}' ${s} sending request:`,i),c.send(t,"POST",h,n,15)})}Bo(e,t,n){const i=Fo(),s=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=Ph(),u=Sh(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(c.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(c.useFetchStreams=!0),this.Oo(c.initMessageHeaders,t,n),c.encodeInitMessageHeaders=!0;const f=s.join("");k(ke,`Creating RPC '${e}' stream ${i}: ${f}`,c);const p=o.createWebChannel(f,c);let _=!1,R=!1;const V=new cI({Io:C=>{R?k(ke,`Not sending because RPC '${e}' stream ${i} is closed:`,C):(_||(k(ke,`Opening RPC '${e}' stream ${i} transport.`),p.open(),_=!0),k(ke,`RPC '${e}' stream ${i} sending:`,C),p.send(C))},To:()=>p.close()}),x=(C,B,j)=>{C.listen(B,F=>{try{j(F)}catch(K){setTimeout(()=>{throw K},0)}})};return x(p,zr.EventType.OPEN,()=>{R||(k(ke,`RPC '${e}' stream ${i} transport opened.`),V.yo())}),x(p,zr.EventType.CLOSE,()=>{R||(R=!0,k(ke,`RPC '${e}' stream ${i} transport closed`),V.So())}),x(p,zr.EventType.ERROR,C=>{R||(R=!0,ze(ke,`RPC '${e}' stream ${i} transport errored:`,C),V.So(new D(S.UNAVAILABLE,"The operation could not be completed")))}),x(p,zr.EventType.MESSAGE,C=>{var B;if(!R){const j=C.data[0];U(!!j);const F=j,K=F.error||((B=F[0])===null||B===void 0?void 0:B.error);if(K){k(ke,`RPC '${e}' stream ${i} received error:`,K);const Z=K.status;let G=function(I){const v=Ie[I];if(v!==void 0)return vd(v)}(Z),T=K.message;G===void 0&&(G=S.INTERNAL,T="Unknown error status: "+Z+" with message "+K.message),R=!0,V.So(new D(G,T)),p.close()}else k(ke,`RPC '${e}' stream ${i} received:`,j),V.bo(j)}}),x(u,bh.STAT_EVENT,C=>{C.stat===$o.PROXY?k(ke,`RPC '${e}' stream ${i} detected buffering proxy`):C.stat===$o.NOPROXY&&k(ke,`RPC '${e}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{V.wo()},0),V}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sf(){return typeof window<"u"?window:null}function hs(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ei(r){return new yy(r,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ka{constructor(e,t,n=1e3,i=1.5,s=6e4){this.ui=e,this.timerId=t,this.ko=n,this.qo=i,this.Qo=s,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const t=Math.floor(this.Ko+this.zo()),n=Math.max(0,Date.now()-this.Uo),i=Math.max(0,t-n);i>0&&k("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.Ko} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,i,()=>(this.Uo=Date.now(),e())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class of{constructor(e,t,n,i,s,o,u,c){this.ui=e,this.Ho=n,this.Jo=i,this.connection=s,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=u,this.listener=c,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new Ka(e,t)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,()=>this.__()))}a_(e){this.u_(),this.stream.send(e)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(e,t){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,e!==4?this.t_.reset():t&&t.code===S.RESOURCE_EXHAUSTED?(_e(t.toString()),_e("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):t&&t.code===S.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.mo(t)}l_(){}auth(){this.state=1;const e=this.h_(this.Yo),t=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([n,i])=>{this.Yo===t&&this.P_(n,i)},n=>{e(()=>{const i=new D(S.UNKNOWN,"Fetching auth token failed: "+n.message);return this.I_(i)})})}P_(e,t){const n=this.h_(this.Yo);this.stream=this.T_(e,t),this.stream.Eo(()=>{n(()=>this.listener.Eo())}),this.stream.Ro(()=>{n(()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,()=>(this.r_()&&(this.state=3),Promise.resolve())),this.listener.Ro()))}),this.stream.mo(i=>{n(()=>this.I_(i))}),this.stream.onMessage(i=>{n(()=>++this.e_==1?this.E_(i):this.onNext(i))})}i_(){this.state=5,this.t_.Go(async()=>{this.state=0,this.start()})}I_(e){return k("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}h_(e){return t=>{this.ui.enqueueAndForget(()=>this.Yo===e?t():(k("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class hI extends of{constructor(e,t,n,i,s,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,n,i,o),this.serializer=s}T_(e,t){return this.connection.Bo("Listen",e,t)}E_(e){return this.onNext(e)}onNext(e){this.t_.reset();const t=vy(this.serializer,e),n=function(s){if(!("targetChange"in s))return q.min();const o=s.targetChange;return o.targetIds&&o.targetIds.length?q.min():o.readTime?ye(o.readTime):q.min()}(e);return this.listener.d_(t,n)}A_(e){const t={};t.database=na(this.serializer),t.addTarget=function(s,o){let u;const c=o.target;if(u=ys(c)?{documents:Dd(s,c)}:{query:Bs(s,c)._t},u.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){u.resumeToken=Rd(s,o.resumeToken);const h=ea(s,o.expectedCount);h!==null&&(u.expectedCount=h)}else if(o.snapshotVersion.compareTo(q.min())>0){u.readTime=tr(s,o.snapshotVersion.toTimestamp());const h=ea(s,o.expectedCount);h!==null&&(u.expectedCount=h)}return u}(this.serializer,e);const n=wy(this.serializer,e);n&&(t.labels=n),this.a_(t)}R_(e){const t={};t.database=na(this.serializer),t.removeTarget=e,this.a_(t)}}class dI extends of{constructor(e,t,n,i,s,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,n,i,o),this.serializer=s}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(e,t){return this.connection.Bo("Write",e,t)}E_(e){return U(!!e.streamToken),this.lastStreamToken=e.streamToken,U(!e.writeResults||e.writeResults.length===0),this.listener.f_()}onNext(e){U(!!e.streamToken),this.lastStreamToken=e.streamToken,this.t_.reset();const t=Ey(e.writeResults,e.commitTime),n=ye(e.commitTime);return this.listener.g_(n,t)}p_(){const e={};e.database=na(this.serializer),this.a_(e)}m_(e){const t={streamToken:this.lastStreamToken,writes:e.map(n=>ci(this.serializer,n))};this.a_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fI extends class{}{constructor(e,t,n,i){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=n,this.serializer=i,this.y_=!1}w_(){if(this.y_)throw new D(S.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,t,n,i){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,o])=>this.connection.Mo(e,ta(t,n),i,s,o)).catch(s=>{throw s.name==="FirebaseError"?(s.code===S.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new D(S.UNKNOWN,s.toString())})}Lo(e,t,n,i,s){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,u])=>this.connection.Lo(e,ta(t,n),i,o,u,s)).catch(o=>{throw o.name==="FirebaseError"?(o.code===S.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new D(S.UNKNOWN,o.toString())})}terminate(){this.y_=!0,this.connection.terminate()}}class mI{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(e){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,e==="Online"&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(_e(t),this.D_=!1):k("OnlineStateTracker",t)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pI{constructor(e,t,n,i,s){this.localStore=e,this.datastore=t,this.asyncQueue=n,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=s,this.k_._o(o=>{n.enqueueAndForget(async()=>{Gt(this)&&(k("RemoteStore","Restarting streams for network reachability change."),await async function(c){const h=N(c);h.L_.add(4),await fr(h),h.q_.set("Unknown"),h.L_.delete(4),await wi(h)}(this))})}),this.q_=new mI(n,i)}}async function wi(r){if(Gt(r))for(const e of r.B_)await e(!0)}async function fr(r){for(const e of r.B_)await e(!1)}function Gs(r,e){const t=N(r);t.N_.has(e.targetId)||(t.N_.set(e.targetId,e),Ha(t)?Wa(t):pr(t).r_()&&Qa(t,e))}function ir(r,e){const t=N(r),n=pr(t);t.N_.delete(e),n.r_()&&af(t,e),t.N_.size===0&&(n.r_()?n.o_():Gt(t)&&t.q_.set("Unknown"))}function Qa(r,e){if(r.Q_.xe(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(q.min())>0){const t=r.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}pr(r).A_(e)}function af(r,e){r.Q_.xe(e),pr(r).R_(e)}function Wa(r){r.Q_=new my({getRemoteKeysForTarget:e=>r.remoteSyncer.getRemoteKeysForTarget(e),ot:e=>r.N_.get(e)||null,tt:()=>r.datastore.serializer.databaseId}),pr(r).start(),r.q_.v_()}function Ha(r){return Gt(r)&&!pr(r).n_()&&r.N_.size>0}function Gt(r){return N(r).L_.size===0}function uf(r){r.Q_=void 0}async function gI(r){r.q_.set("Online")}async function _I(r){r.N_.forEach((e,t)=>{Qa(r,e)})}async function yI(r,e){uf(r),Ha(r)?(r.q_.M_(e),Wa(r)):r.q_.set("Unknown")}async function II(r,e,t){if(r.q_.set("Online"),e instanceof Ad&&e.state===2&&e.cause)try{await async function(i,s){const o=s.cause;for(const u of s.targetIds)i.N_.has(u)&&(await i.remoteSyncer.rejectListen(u,o),i.N_.delete(u),i.Q_.removeTarget(u))}(r,e)}catch(n){k("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),n),await Cs(r,n)}else if(e instanceof ls?r.Q_.Ke(e):e instanceof wd?r.Q_.He(e):r.Q_.We(e),!t.isEqual(q.min()))try{const n=await Xd(r.localStore);t.compareTo(n)>=0&&await function(s,o){const u=s.Q_.rt(o);return u.targetChanges.forEach((c,h)=>{if(c.resumeToken.approximateByteSize()>0){const f=s.N_.get(h);f&&s.N_.set(h,f.withResumeToken(c.resumeToken,o))}}),u.targetMismatches.forEach((c,h)=>{const f=s.N_.get(c);if(!f)return;s.N_.set(c,f.withResumeToken(me.EMPTY_BYTE_STRING,f.snapshotVersion)),af(s,c);const p=new rt(f.target,c,h,f.sequenceNumber);Qa(s,p)}),s.remoteSyncer.applyRemoteEvent(u)}(r,t)}catch(n){k("RemoteStore","Failed to raise snapshot:",n),await Cs(r,n)}}async function Cs(r,e,t){if(!jt(e))throw e;r.L_.add(1),await fr(r),r.q_.set("Offline"),t||(t=()=>Xd(r.localStore)),r.asyncQueue.enqueueRetryable(async()=>{k("RemoteStore","Retrying IndexedDB access"),await t(),r.L_.delete(1),await wi(r)})}function cf(r,e){return e().catch(t=>Cs(r,t,e))}async function mr(r){const e=N(r),t=Lt(e);let n=e.O_.length>0?e.O_[e.O_.length-1].batchId:-1;for(;TI(e);)try{const i=await iI(e.localStore,n);if(i===null){e.O_.length===0&&t.o_();break}n=i.batchId,vI(e,i)}catch(i){await Cs(e,i)}lf(e)&&hf(e)}function TI(r){return Gt(r)&&r.O_.length<10}function vI(r,e){r.O_.push(e);const t=Lt(r);t.r_()&&t.V_&&t.m_(e.mutations)}function lf(r){return Gt(r)&&!Lt(r).n_()&&r.O_.length>0}function hf(r){Lt(r).start()}async function EI(r){Lt(r).p_()}async function wI(r){const e=Lt(r);for(const t of r.O_)e.m_(t.mutations)}async function AI(r,e,t){const n=r.O_.shift(),i=xa.from(n,e,t);await cf(r,()=>r.remoteSyncer.applySuccessfulWrite(i)),await mr(r)}async function RI(r,e){e&&Lt(r).V_&&await async function(n,i){if(function(o){return Td(o)&&o!==S.ABORTED}(i.code)){const s=n.O_.shift();Lt(n).s_(),await cf(n,()=>n.remoteSyncer.rejectFailedWrite(s.batchId,i)),await mr(n)}}(r,e),lf(r)&&hf(r)}async function Ml(r,e){const t=N(r);t.asyncQueue.verifyOperationInProgress(),k("RemoteStore","RemoteStore received new credentials");const n=Gt(t);t.L_.add(3),await fr(t),n&&t.q_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.L_.delete(3),await wi(t)}async function ua(r,e){const t=N(r);e?(t.L_.delete(2),await wi(t)):e||(t.L_.add(2),await fr(t),t.q_.set("Unknown"))}function pr(r){return r.K_||(r.K_=function(t,n,i){const s=N(t);return s.w_(),new hI(n,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(r.datastore,r.asyncQueue,{Eo:gI.bind(null,r),Ro:_I.bind(null,r),mo:yI.bind(null,r),d_:II.bind(null,r)}),r.B_.push(async e=>{e?(r.K_.s_(),Ha(r)?Wa(r):r.q_.set("Unknown")):(await r.K_.stop(),uf(r))})),r.K_}function Lt(r){return r.U_||(r.U_=function(t,n,i){const s=N(t);return s.w_(),new dI(n,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(r.datastore,r.asyncQueue,{Eo:()=>Promise.resolve(),Ro:EI.bind(null,r),mo:RI.bind(null,r),f_:wI.bind(null,r),g_:AI.bind(null,r)}),r.B_.push(async e=>{e?(r.U_.s_(),await mr(r)):(await r.U_.stop(),r.O_.length>0&&(k("RemoteStore",`Stopping write stream with ${r.O_.length} pending writes`),r.O_=[]))})),r.U_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ja{constructor(e,t,n,i,s){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=n,this.op=i,this.removalCallback=s,this.deferred=new we,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,n,i,s){const o=Date.now()+n,u=new Ja(e,t,o,i,s);return u.start(n),u}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new D(S.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function gr(r,e){if(_e("AsyncQueue",`${e}: ${r}`),jt(r))return new D(S.UNAVAILABLE,`${e}: ${r}`);throw r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $n{constructor(e){this.comparator=e?(t,n)=>e(t,n)||M.comparator(t.key,n.key):(t,n)=>M.comparator(t.key,n.key),this.keyedMap=Gr(),this.sortedSet=new se(this.comparator)}static emptySet(e){return new $n(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,n)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof $n)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),n=e.sortedSet.getIterator();for(;t.hasNext();){const i=t.getNext().key,s=n.getNext().key;if(!i.isEqual(s))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const n=new $n;return n.comparator=this.comparator,n.keyedMap=e,n.sortedSet=t,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ll{constructor(){this.W_=new se(M.comparator)}track(e){const t=e.doc.key,n=this.W_.get(t);n?e.type!==0&&n.type===3?this.W_=this.W_.insert(t,e):e.type===3&&n.type!==1?this.W_=this.W_.insert(t,{type:n.type,doc:e.doc}):e.type===2&&n.type===2?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):e.type===2&&n.type===0?this.W_=this.W_.insert(t,{type:0,doc:e.doc}):e.type===1&&n.type===0?this.W_=this.W_.remove(t):e.type===1&&n.type===2?this.W_=this.W_.insert(t,{type:1,doc:n.doc}):e.type===0&&n.type===1?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):L():this.W_=this.W_.insert(t,e)}G_(){const e=[];return this.W_.inorderTraversal((t,n)=>{e.push(n)}),e}}class sr{constructor(e,t,n,i,s,o,u,c,h){this.query=e,this.docs=t,this.oldDocs=n,this.docChanges=i,this.mutatedKeys=s,this.fromCache=o,this.syncStateChanged=u,this.excludesMetadataChanges=c,this.hasCachedResults=h}static fromInitialDocuments(e,t,n,i,s){const o=[];return t.forEach(u=>{o.push({type:0,doc:u})}),new sr(e,t,$n.emptySet(t),o,n,i,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&_i(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,n=e.docChanges;if(t.length!==n.length)return!1;for(let i=0;i<t.length;i++)if(t[i].type!==n[i].type||!t[i].doc.isEqual(n[i].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bI{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some(e=>e.J_())}}class SI{constructor(){this.queries=Fl(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(t,n){const i=N(t),s=i.queries;i.queries=Fl(),s.forEach((o,u)=>{for(const c of u.j_)c.onError(n)})})(this,new D(S.ABORTED,"Firestore shutting down"))}}function Fl(){return new ct(r=>sd(r),_i)}async function Ya(r,e){const t=N(r);let n=3;const i=e.query;let s=t.queries.get(i);s?!s.H_()&&e.J_()&&(n=2):(s=new bI,n=e.J_()?0:1);try{switch(n){case 0:s.z_=await t.onListen(i,!0);break;case 1:s.z_=await t.onListen(i,!1);break;case 2:await t.onFirstRemoteStoreListen(i)}}catch(o){const u=gr(o,`Initialization of query '${Mn(e.query)}' failed`);return void e.onError(u)}t.queries.set(i,s),s.j_.push(e),e.Z_(t.onlineState),s.z_&&e.X_(s.z_)&&Za(t)}async function Xa(r,e){const t=N(r),n=e.query;let i=3;const s=t.queries.get(n);if(s){const o=s.j_.indexOf(e);o>=0&&(s.j_.splice(o,1),s.j_.length===0?i=e.J_()?0:1:!s.H_()&&e.J_()&&(i=2))}switch(i){case 0:return t.queries.delete(n),t.onUnlisten(n,!0);case 1:return t.queries.delete(n),t.onUnlisten(n,!1);case 2:return t.onLastRemoteStoreUnlisten(n);default:return}}function PI(r,e){const t=N(r);let n=!1;for(const i of e){const s=i.query,o=t.queries.get(s);if(o){for(const u of o.j_)u.X_(i)&&(n=!0);o.z_=i}}n&&Za(t)}function CI(r,e,t){const n=N(r),i=n.queries.get(e);if(i)for(const s of i.j_)s.onError(t);n.queries.delete(e)}function Za(r){r.Y_.forEach(e=>{e.next()})}var ca,Ul;(Ul=ca||(ca={})).ea="default",Ul.Cache="cache";class eu{constructor(e,t,n){this.query=e,this.ta=t,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=n||{}}X_(e){if(!this.options.includeMetadataChanges){const n=[];for(const i of e.docChanges)i.type!==3&&n.push(i);e=new sr(e.query,e.docs,e.oldDocs,n,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.na?this.ia(e)&&(this.ta.next(e),t=!0):this.sa(e,this.onlineState)&&(this.oa(e),t=!0),this.ra=e,t}onError(e){this.ta.error(e)}Z_(e){this.onlineState=e;let t=!1;return this.ra&&!this.na&&this.sa(this.ra,e)&&(this.oa(this.ra),t=!0),t}sa(e,t){if(!e.fromCache||!this.J_())return!0;const n=t!=="Offline";return(!this.options._a||!n)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}ia(e){if(e.docChanges.length>0)return!0;const t=this.ra&&this.ra.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}oa(e){e=sr.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.na=!0,this.ta.next(e)}J_(){return this.options.source!==ca.Cache}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class VI{constructor(e,t){this.aa=e,this.byteLength=t}ua(){return"metadata"in this.aa}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bl{constructor(e){this.serializer=e}Es(e){return Je(this.serializer,e)}ds(e){return e.metadata.exists?Vd(this.serializer,e.document,!1):ae.newNoDocument(this.Es(e.metadata.name),this.As(e.metadata.readTime))}As(e){return ye(e)}}class DI{constructor(e,t,n){this.ca=e,this.localStore=t,this.serializer=n,this.queries=[],this.documents=[],this.collectionGroups=new Set,this.progress=df(e)}la(e){this.progress.bytesLoaded+=e.byteLength;let t=this.progress.documentsLoaded;if(e.aa.namedQuery)this.queries.push(e.aa.namedQuery);else if(e.aa.documentMetadata){this.documents.push({metadata:e.aa.documentMetadata}),e.aa.documentMetadata.exists||++t;const n=J.fromString(e.aa.documentMetadata.name);this.collectionGroups.add(n.get(n.length-2))}else e.aa.document&&(this.documents[this.documents.length-1].document=e.aa.document,++t);return t!==this.progress.documentsLoaded?(this.progress.documentsLoaded=t,Object.assign({},this.progress)):null}ha(e){const t=new Map,n=new Bl(this.serializer);for(const i of e)if(i.metadata.queries){const s=n.Es(i.metadata.name);for(const o of i.metadata.queries){const u=(t.get(o)||$()).add(s);t.set(o,u)}}return t}async complete(){const e=await sI(this.localStore,new Bl(this.serializer),this.documents,this.ca.id),t=this.ha(this.documents);for(const n of this.queries)await oI(this.localStore,n,t.get(n.name));return this.progress.taskState="Success",{progress:this.progress,Pa:this.collectionGroups,Ia:e}}}function df(r){return{taskState:"Running",documentsLoaded:0,bytesLoaded:0,totalDocuments:r.totalDocuments,totalBytes:r.totalBytes}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ff{constructor(e){this.key=e}}class mf{constructor(e){this.key=e}}class pf{constructor(e,t){this.query=e,this.Ta=t,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=$(),this.mutatedKeys=$(),this.Aa=ad(e),this.Ra=new $n(this.Aa)}get Va(){return this.Ta}ma(e,t){const n=t?t.fa:new Ll,i=t?t.Ra:this.Ra;let s=t?t.mutatedKeys:this.mutatedKeys,o=i,u=!1;const c=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,h=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal((f,p)=>{const _=i.get(f),R=yi(this.query,p)?p:null,V=!!_&&this.mutatedKeys.has(_.key),x=!!R&&(R.hasLocalMutations||this.mutatedKeys.has(R.key)&&R.hasCommittedMutations);let C=!1;_&&R?_.data.isEqual(R.data)?V!==x&&(n.track({type:3,doc:R}),C=!0):this.ga(_,R)||(n.track({type:2,doc:R}),C=!0,(c&&this.Aa(R,c)>0||h&&this.Aa(R,h)<0)&&(u=!0)):!_&&R?(n.track({type:0,doc:R}),C=!0):_&&!R&&(n.track({type:1,doc:_}),C=!0,(c||h)&&(u=!0)),C&&(R?(o=o.add(R),s=x?s.add(f):s.delete(f)):(o=o.delete(f),s=s.delete(f)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const f=this.query.limitType==="F"?o.last():o.first();o=o.delete(f.key),s=s.delete(f.key),n.track({type:1,doc:f})}return{Ra:o,fa:n,ns:u,mutatedKeys:s}}ga(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,n,i){const s=this.Ra;this.Ra=e.Ra,this.mutatedKeys=e.mutatedKeys;const o=e.fa.G_();o.sort((f,p)=>function(R,V){const x=C=>{switch(C){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return L()}};return x(R)-x(V)}(f.type,p.type)||this.Aa(f.doc,p.doc)),this.pa(n),i=i!=null&&i;const u=t&&!i?this.ya():[],c=this.da.size===0&&this.current&&!i?1:0,h=c!==this.Ea;return this.Ea=c,o.length!==0||h?{snapshot:new sr(this.query,e.Ra,s,o,e.mutatedKeys,c===0,h,!1,!!n&&n.resumeToken.approximateByteSize()>0),wa:u}:{wa:u}}Z_(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new Ll,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(e){return!this.Ta.has(e)&&!!this.Ra.has(e)&&!this.Ra.get(e).hasLocalMutations}pa(e){e&&(e.addedDocuments.forEach(t=>this.Ta=this.Ta.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Ta=this.Ta.delete(t)),this.current=e.current)}ya(){if(!this.current)return[];const e=this.da;this.da=$(),this.Ra.forEach(n=>{this.Sa(n.key)&&(this.da=this.da.add(n.key))});const t=[];return e.forEach(n=>{this.da.has(n)||t.push(new mf(n))}),this.da.forEach(n=>{e.has(n)||t.push(new ff(n))}),t}ba(e){this.Ta=e.Ts,this.da=$();const t=this.ma(e.documents);return this.applyChanges(t,!0)}Da(){return sr.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,this.Ea===0,this.hasCachedResults)}}class kI{constructor(e,t,n){this.query=e,this.targetId=t,this.view=n}}class xI{constructor(e){this.key=e,this.va=!1}}class NI{constructor(e,t,n,i,s,o){this.localStore=e,this.remoteStore=t,this.eventManager=n,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=o,this.Ca={},this.Fa=new ct(u=>sd(u),_i),this.Ma=new Map,this.xa=new Set,this.Oa=new se(M.comparator),this.Na=new Map,this.La=new Ba,this.Ba={},this.ka=new Map,this.qa=vn.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function OI(r,e,t=!0){const n=$s(r);let i;const s=n.Fa.get(e);return s?(n.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.Da()):i=await gf(n,e,t,!0),i}async function MI(r,e){const t=$s(r);await gf(t,e,!0,!1)}async function gf(r,e,t,n){const i=await nr(r.localStore,Oe(e)),s=i.targetId,o=r.sharedClientState.addLocalQueryTarget(s,t);let u;return n&&(u=await tu(r,e,s,o==="current",i.resumeToken)),r.isPrimaryClient&&t&&Gs(r.remoteStore,i),u}async function tu(r,e,t,n,i){r.Ka=(p,_,R)=>async function(x,C,B,j){let F=C.view.ma(B);F.ns&&(F=await bs(x.localStore,C.query,!1).then(({documents:T})=>C.view.ma(T,F)));const K=j&&j.targetChanges.get(C.targetId),Z=j&&j.targetMismatches.get(C.targetId)!=null,G=C.view.applyChanges(F,x.isPrimaryClient,K,Z);return la(x,C.targetId,G.wa),G.snapshot}(r,p,_,R);const s=await bs(r.localStore,e,!0),o=new pf(e,s.Ts),u=o.ma(s.documents),c=vi.createSynthesizedTargetChangeForCurrentChange(t,n&&r.onlineState!=="Offline",i),h=o.applyChanges(u,r.isPrimaryClient,c);la(r,t,h.wa);const f=new kI(e,t,o);return r.Fa.set(e,f),r.Ma.has(t)?r.Ma.get(t).push(e):r.Ma.set(t,[e]),h.snapshot}async function LI(r,e,t){const n=N(r),i=n.Fa.get(e),s=n.Ma.get(i.targetId);if(s.length>1)return n.Ma.set(i.targetId,s.filter(o=>!_i(o,e))),void n.Fa.delete(e);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(i.targetId),n.sharedClientState.isActiveQueryTarget(i.targetId)||await rr(n.localStore,i.targetId,!1).then(()=>{n.sharedClientState.clearQueryState(i.targetId),t&&ir(n.remoteStore,i.targetId),or(n,i.targetId)}).catch(qt)):(or(n,i.targetId),await rr(n.localStore,i.targetId,!0))}async function FI(r,e){const t=N(r),n=t.Fa.get(e),i=t.Ma.get(n.targetId);t.isPrimaryClient&&i.length===1&&(t.sharedClientState.removeLocalQueryTarget(n.targetId),ir(t.remoteStore,n.targetId))}async function UI(r,e,t){const n=su(r);try{const i=await function(o,u){const c=N(o),h=he.now(),f=u.reduce((R,V)=>R.add(V.key),$());let p,_;return c.persistence.runTransaction("Locally write mutations","readwrite",R=>{let V=Be(),x=$();return c.cs.getEntries(R,f).next(C=>{V=C,V.forEach((B,j)=>{j.isValidDocument()||(x=x.add(B))})}).next(()=>c.localDocuments.getOverlayedDocuments(R,V)).next(C=>{p=C;const B=[];for(const j of u){const F=hy(j,p.get(j.key).overlayedDocument);F!=null&&B.push(new lt(j.key,F,Wh(F.value.mapValue),le.exists(!0)))}return c.mutationQueue.addMutationBatch(R,h,B,u)}).next(C=>{_=C;const B=C.applyToLocalDocumentSet(p,x);return c.documentOverlayCache.saveOverlays(R,C.batchId,B)})}).then(()=>({batchId:_.batchId,changes:cd(p)}))}(n.localStore,e);n.sharedClientState.addPendingMutation(i.batchId),function(o,u,c){let h=o.Ba[o.currentUser.toKey()];h||(h=new se(z)),h=h.insert(u,c),o.Ba[o.currentUser.toKey()]=h}(n,i.batchId,t),await ht(n,i.changes),await mr(n.remoteStore)}catch(i){const s=gr(i,"Failed to persist write");t.reject(s)}}async function _f(r,e){const t=N(r);try{const n=await rI(t.localStore,e);e.targetChanges.forEach((i,s)=>{const o=t.Na.get(s);o&&(U(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1),i.addedDocuments.size>0?o.va=!0:i.modifiedDocuments.size>0?U(o.va):i.removedDocuments.size>0&&(U(o.va),o.va=!1))}),await ht(t,n,e)}catch(n){await qt(n)}}function ql(r,e,t){const n=N(r);if(n.isPrimaryClient&&t===0||!n.isPrimaryClient&&t===1){const i=[];n.Fa.forEach((s,o)=>{const u=o.view.Z_(e);u.snapshot&&i.push(u.snapshot)}),function(o,u){const c=N(o);c.onlineState=u;let h=!1;c.queries.forEach((f,p)=>{for(const _ of p.j_)_.Z_(u)&&(h=!0)}),h&&Za(c)}(n.eventManager,e),i.length&&n.Ca.d_(i),n.onlineState=e,n.isPrimaryClient&&n.sharedClientState.setOnlineState(e)}}async function BI(r,e,t){const n=N(r);n.sharedClientState.updateQueryState(e,"rejected",t);const i=n.Na.get(e),s=i&&i.key;if(s){let o=new se(M.comparator);o=o.insert(s,ae.newNoDocument(s,q.min()));const u=$().add(s),c=new Ti(q.min(),new Map,new se(z),o,u);await _f(n,c),n.Oa=n.Oa.remove(s),n.Na.delete(e),iu(n)}else await rr(n.localStore,e,!1).then(()=>or(n,e,t)).catch(qt)}async function qI(r,e){const t=N(r),n=e.batch.batchId;try{const i=await nI(t.localStore,e);ru(t,n,null),nu(t,n),t.sharedClientState.updateMutationState(n,"acknowledged"),await ht(t,i)}catch(i){await qt(i)}}async function jI(r,e,t){const n=N(r);try{const i=await function(o,u){const c=N(o);return c.persistence.runTransaction("Reject batch","readwrite-primary",h=>{let f;return c.mutationQueue.lookupMutationBatch(h,u).next(p=>(U(p!==null),f=p.keys(),c.mutationQueue.removeMutationBatch(h,p))).next(()=>c.mutationQueue.performConsistencyCheck(h)).next(()=>c.documentOverlayCache.removeOverlaysForBatchId(h,f,u)).next(()=>c.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,f)).next(()=>c.localDocuments.getDocuments(h,f))})}(n.localStore,e);ru(n,e,t),nu(n,e),n.sharedClientState.updateMutationState(e,"rejected",t),await ht(n,i)}catch(i){await qt(i)}}async function zI(r,e){const t=N(r);Gt(t.remoteStore)||k("SyncEngine","The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled.");try{const n=await function(o){const u=N(o);return u.persistence.runTransaction("Get highest unacknowledged batch id","readonly",c=>u.mutationQueue.getHighestUnacknowledgedBatchId(c))}(t.localStore);if(n===-1)return void e.resolve();const i=t.ka.get(n)||[];i.push(e),t.ka.set(n,i)}catch(n){const i=gr(n,"Initialization of waitForPendingWrites() operation failed");e.reject(i)}}function nu(r,e){(r.ka.get(e)||[]).forEach(t=>{t.resolve()}),r.ka.delete(e)}function ru(r,e,t){const n=N(r);let i=n.Ba[n.currentUser.toKey()];if(i){const s=i.get(e);s&&(t?s.reject(t):s.resolve(),i=i.remove(e)),n.Ba[n.currentUser.toKey()]=i}}function or(r,e,t=null){r.sharedClientState.removeLocalQueryTarget(e);for(const n of r.Ma.get(e))r.Fa.delete(n),t&&r.Ca.$a(n,t);r.Ma.delete(e),r.isPrimaryClient&&r.La.gr(e).forEach(n=>{r.La.containsKey(n)||yf(r,n)})}function yf(r,e){r.xa.delete(e.path.canonicalString());const t=r.Oa.get(e);t!==null&&(ir(r.remoteStore,t),r.Oa=r.Oa.remove(e),r.Na.delete(t),iu(r))}function la(r,e,t){for(const n of t)n instanceof ff?(r.La.addReference(n.key,e),GI(r,n)):n instanceof mf?(k("SyncEngine","Document no longer in limbo: "+n.key),r.La.removeReference(n.key,e),r.La.containsKey(n.key)||yf(r,n.key)):L()}function GI(r,e){const t=e.key,n=t.path.canonicalString();r.Oa.get(t)||r.xa.has(n)||(k("SyncEngine","New document in limbo: "+t),r.xa.add(n),iu(r))}function iu(r){for(;r.xa.size>0&&r.Oa.size<r.maxConcurrentLimboResolutions;){const e=r.xa.values().next().value;r.xa.delete(e);const t=new M(J.fromString(e)),n=r.qa.next();r.Na.set(n,new xI(t)),r.Oa=r.Oa.insert(t,n),Gs(r.remoteStore,new rt(Oe(lr(t.path)),n,"TargetPurposeLimboResolution",Fe.oe))}}async function ht(r,e,t){const n=N(r),i=[],s=[],o=[];n.Fa.isEmpty()||(n.Fa.forEach((u,c)=>{o.push(n.Ka(c,e,t).then(h=>{var f;if((h||t)&&n.isPrimaryClient){const p=h?!h.fromCache:(f=t==null?void 0:t.targetChanges.get(c.targetId))===null||f===void 0?void 0:f.current;n.sharedClientState.updateQueryState(c.targetId,p?"current":"not-current")}if(h){i.push(h);const p=Ga.Wi(c.targetId,h);s.push(p)}}))}),await Promise.all(o),n.Ca.d_(i),await async function(c,h){const f=N(c);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",p=>w.forEach(h,_=>w.forEach(_.$i,R=>f.persistence.referenceDelegate.addReference(p,_.targetId,R)).next(()=>w.forEach(_.Ui,R=>f.persistence.referenceDelegate.removeReference(p,_.targetId,R)))))}catch(p){if(!jt(p))throw p;k("LocalStore","Failed to update sequence numbers: "+p)}for(const p of h){const _=p.targetId;if(!p.fromCache){const R=f.os.get(_),V=R.snapshotVersion,x=R.withLastLimboFreeSnapshotVersion(V);f.os=f.os.insert(_,x)}}}(n.localStore,s))}async function $I(r,e){const t=N(r);if(!t.currentUser.isEqual(e)){k("SyncEngine","User change. New user:",e.toKey());const n=await Yd(t.localStore,e);t.currentUser=e,function(s,o){s.ka.forEach(u=>{u.forEach(c=>{c.reject(new D(S.CANCELLED,o))})}),s.ka.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,n.removedBatchIds,n.addedBatchIds),await ht(t,n.hs)}}function KI(r,e){const t=N(r),n=t.Na.get(e);if(n&&n.va)return $().add(n.key);{let i=$();const s=t.Ma.get(e);if(!s)return i;for(const o of s){const u=t.Fa.get(o);i=i.unionWith(u.view.Va)}return i}}async function QI(r,e){const t=N(r),n=await bs(t.localStore,e.query,!0),i=e.view.ba(n);return t.isPrimaryClient&&la(t,e.targetId,i.wa),i}async function WI(r,e){const t=N(r);return tf(t.localStore,e).then(n=>ht(t,n))}async function HI(r,e,t,n){const i=N(r),s=await function(u,c){const h=N(u),f=N(h.mutationQueue);return h.persistence.runTransaction("Lookup mutation documents","readonly",p=>f.Mn(p,c).next(_=>_?h.localDocuments.getDocuments(p,_):w.resolve(null)))}(i.localStore,e);s!==null?(t==="pending"?await mr(i.remoteStore):t==="acknowledged"||t==="rejected"?(ru(i,e,n||null),nu(i,e),function(u,c){N(N(u).mutationQueue).On(c)}(i.localStore,e)):L(),await ht(i,s)):k("SyncEngine","Cannot apply mutation batch with id: "+e)}async function JI(r,e){const t=N(r);if($s(t),su(t),e===!0&&t.Qa!==!0){const n=t.sharedClientState.getAllActiveQueryTargets(),i=await jl(t,n.toArray());t.Qa=!0,await ua(t.remoteStore,!0);for(const s of i)Gs(t.remoteStore,s)}else if(e===!1&&t.Qa!==!1){const n=[];let i=Promise.resolve();t.Ma.forEach((s,o)=>{t.sharedClientState.isLocalQueryTarget(o)?n.push(o):i=i.then(()=>(or(t,o),rr(t.localStore,o,!0))),ir(t.remoteStore,o)}),await i,await jl(t,n),function(o){const u=N(o);u.Na.forEach((c,h)=>{ir(u.remoteStore,h)}),u.La.pr(),u.Na=new Map,u.Oa=new se(M.comparator)}(t),t.Qa=!1,await ua(t.remoteStore,!1)}}async function jl(r,e,t){const n=N(r),i=[],s=[];for(const o of e){let u;const c=n.Ma.get(o);if(c&&c.length!==0){u=await nr(n.localStore,Oe(c[0]));for(const h of c){const f=n.Fa.get(h),p=await QI(n,f);p.snapshot&&s.push(p.snapshot)}}else{const h=await ef(n.localStore,o);u=await nr(n.localStore,h),await tu(n,If(h),o,!1,u.resumeToken)}i.push(u)}return n.Ca.d_(s),i}function If(r){return nd(r.path,r.collectionGroup,r.orderBy,r.filters,r.limit,"F",r.startAt,r.endAt)}function YI(r){return function(t){return N(N(t).persistence).Qi()}(N(r).localStore)}async function XI(r,e,t,n){const i=N(r);if(i.Qa)return void k("SyncEngine","Ignoring unexpected query state notification.");const s=i.Ma.get(e);if(s&&s.length>0)switch(t){case"current":case"not-current":{const o=await tf(i.localStore,od(s[0])),u=Ti.createSynthesizedRemoteEventForCurrentChange(e,t==="current",me.EMPTY_BYTE_STRING);await ht(i,o,u);break}case"rejected":await rr(i.localStore,e,!0),or(i,e,n);break;default:L()}}async function ZI(r,e,t){const n=$s(r);if(n.Qa){for(const i of e){if(n.Ma.has(i)&&n.sharedClientState.isActiveQueryTarget(i)){k("SyncEngine","Adding an already active target "+i);continue}const s=await ef(n.localStore,i),o=await nr(n.localStore,s);await tu(n,If(s),o.targetId,!1,o.resumeToken),Gs(n.remoteStore,o)}for(const i of t)n.Ma.has(i)&&await rr(n.localStore,i,!1).then(()=>{ir(n.remoteStore,i),or(n,i)}).catch(qt)}}function $s(r){const e=N(r);return e.remoteStore.remoteSyncer.applyRemoteEvent=_f.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=KI.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=BI.bind(null,e),e.Ca.d_=PI.bind(null,e.eventManager),e.Ca.$a=CI.bind(null,e.eventManager),e}function su(r){const e=N(r);return e.remoteStore.remoteSyncer.applySuccessfulWrite=qI.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=jI.bind(null,e),e}function eT(r,e,t){const n=N(r);(async function(s,o,u){try{const c=await o.getMetadata();if(await function(R,V){const x=N(R),C=ye(V.createTime);return x.persistence.runTransaction("hasNewerBundle","readonly",B=>x.Gr.getBundleMetadata(B,V.id)).then(B=>!!B&&B.createTime.compareTo(C)>=0)}(s.localStore,c))return await o.close(),u._completeWith(function(R){return{taskState:"Success",documentsLoaded:R.totalDocuments,bytesLoaded:R.totalBytes,totalDocuments:R.totalDocuments,totalBytes:R.totalBytes}}(c)),Promise.resolve(new Set);u._updateProgress(df(c));const h=new DI(c,s.localStore,o.serializer);let f=await o.Ua();for(;f;){const _=await h.la(f);_&&u._updateProgress(_),f=await o.Ua()}const p=await h.complete();return await ht(s,p.Ia,void 0),await function(R,V){const x=N(R);return x.persistence.runTransaction("Save bundle","readwrite",C=>x.Gr.saveBundleMetadata(C,V))}(s.localStore,c),u._completeWith(p.progress),Promise.resolve(p.Pa)}catch(c){return ze("SyncEngine",`Loading bundle failed with ${c}`),u._failWith(c),Promise.resolve(new Set)}})(n,e,t).then(i=>{n.sharedClientState.notifyBundleLoaded(i)})}class Ft{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Ei(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,t){return null}Ha(e,t){return null}za(e){return Jd(this.persistence,new Hd,e.initialUser,this.serializer)}Ga(e){return new qa(zs.Zr,this.serializer)}Wa(e){return new rf}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Ft.provider={build:()=>new Ft};class tT extends Ft{constructor(e){super(),this.cacheSizeBytes=e}ja(e,t){U(this.persistence.referenceDelegate instanceof Rs);const n=this.persistence.referenceDelegate.garbageCollector;return new Gd(n,e.asyncQueue,t)}Ga(e){const t=this.cacheSizeBytes!==void 0?xe.withCacheSize(this.cacheSizeBytes):xe.DEFAULT;return new qa(n=>Rs.Zr(n,t),this.serializer)}}class ou extends Ft{constructor(e,t,n){super(),this.Ja=e,this.cacheSizeBytes=t,this.forceOwnership=n,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.Ja.initialize(this,e),await su(this.Ja.syncEngine),await mr(this.Ja.remoteStore),await this.persistence.yi(()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve()))}za(e){return Jd(this.persistence,new Hd,e.initialUser,this.serializer)}ja(e,t){const n=this.persistence.referenceDelegate.garbageCollector;return new Gd(n,e.asyncQueue,t)}Ha(e,t){const n=new E_(t,this.persistence);return new v_(e.asyncQueue,n)}Ga(e){const t=za(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),n=this.cacheSizeBytes!==void 0?xe.withCacheSize(this.cacheSizeBytes):xe.DEFAULT;return new ja(this.synchronizeTabs,t,e.clientId,n,e.asyncQueue,sf(),hs(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Wa(e){return new rf}}class Tf extends ou{constructor(e,t){super(e,t,!1),this.Ja=e,this.cacheSizeBytes=t,this.synchronizeTabs=!0}async initialize(e){await super.initialize(e);const t=this.Ja.syncEngine;this.sharedClientState instanceof Lo&&(this.sharedClientState.syncEngine={no:HI.bind(null,t),ro:XI.bind(null,t),io:ZI.bind(null,t),Qi:YI.bind(null,t),eo:WI.bind(null,t)},await this.sharedClientState.start()),await this.persistence.yi(async n=>{await JI(this.Ja.syncEngine,n),this.gcScheduler&&(n&&!this.gcScheduler.started?this.gcScheduler.start():n||this.gcScheduler.stop()),this.indexBackfillerScheduler&&(n&&!this.indexBackfillerScheduler.started?this.indexBackfillerScheduler.start():n||this.indexBackfillerScheduler.stop())})}Wa(e){const t=sf();if(!Lo.D(t))throw new D(S.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");const n=za(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey);return new Lo(t,e.asyncQueue,n,e.clientId,e.initialUser)}}class Ut{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=n=>ql(this.syncEngine,n,1),this.remoteStore.remoteSyncer.handleCredentialChange=$I.bind(null,this.syncEngine),await ua(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new SI}()}createDatastore(e){const t=Ei(e.databaseInfo.databaseId),n=function(s){return new lI(s)}(e.databaseInfo);return function(s,o,u,c){return new fI(s,o,u,c)}(e.authCredentials,e.appCheckCredentials,n,t)}createRemoteStore(e){return function(n,i,s,o,u){return new pI(n,i,s,o,u)}(this.localStore,this.datastore,e.asyncQueue,t=>ql(this.syncEngine,t,0),function(){return Ol.D()?new Ol:new aI}())}createSyncEngine(e,t){return function(i,s,o,u,c,h,f){const p=new NI(i,s,o,u,c,h);return f&&(p.Qa=!0),p}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(i){const s=N(i);k("RemoteStore","RemoteStore shutting down."),s.L_.add(5),await fr(s),s.k_.shutdown(),s.q_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}Ut.provider={build:()=>new Ut};function zl(r,e=10240){let t=0;return{async read(){if(t<r.byteLength){const n={value:r.slice(t,t+e),done:!1};return t+=e,n}return{done:!0}},async cancel(){},releaseLock(){},closed:Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ks{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ya(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ya(this.observer.error,e):_e("Uncaught Error in snapshot listener:",e.toString()))}Za(){this.muted=!0}Ya(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nT{constructor(e,t){this.Xa=e,this.serializer=t,this.metadata=new we,this.buffer=new Uint8Array,this.eu=function(){return new TextDecoder("utf-8")}(),this.tu().then(n=>{n&&n.ua()?this.metadata.resolve(n.aa.metadata):this.metadata.reject(new Error(`The first element of the bundle is not a metadata, it is
             ${JSON.stringify(n==null?void 0:n.aa)}`))},n=>this.metadata.reject(n))}close(){return this.Xa.cancel()}async getMetadata(){return this.metadata.promise}async Ua(){return await this.getMetadata(),this.tu()}async tu(){const e=await this.nu();if(e===null)return null;const t=this.eu.decode(e),n=Number(t);isNaN(n)&&this.ru(`length string (${t}) is not valid number`);const i=await this.iu(n);return new VI(JSON.parse(i),e.length+n)}su(){return this.buffer.findIndex(e=>e===123)}async nu(){for(;this.su()<0&&!await this.ou(););if(this.buffer.length===0)return null;const e=this.su();e<0&&this.ru("Reached the end of bundle when a length string is expected.");const t=this.buffer.slice(0,e);return this.buffer=this.buffer.slice(e),t}async iu(e){for(;this.buffer.length<e;)await this.ou()&&this.ru("Reached the end of bundle when more is expected.");const t=this.eu.decode(this.buffer.slice(0,e));return this.buffer=this.buffer.slice(e),t}ru(e){throw this.Xa.cancel(),new Error(`Invalid bundle format: ${e}`)}async ou(){const e=await this.Xa.read();if(!e.done){const t=new Uint8Array(this.buffer.length+e.value.length);t.set(this.buffer),t.set(e.value,this.buffer.length),this.buffer=t}return e.done}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rT{constructor(e){this.datastore=e,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(e){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new D(S.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;const t=await async function(i,s){const o=N(i),u={documents:s.map(p=>ui(o.serializer,p))},c=await o.Lo("BatchGetDocuments",o.serializer.databaseId,J.emptyPath(),u,s.length),h=new Map;c.forEach(p=>{const _=Ty(o.serializer,p);h.set(_.key.toString(),_)});const f=[];return s.forEach(p=>{const _=h.get(p.toString());U(!!_),f.push(_)}),f}(this.datastore,e);return t.forEach(n=>this.recordVersion(n)),t}set(e,t){this.write(t.toMutation(e,this.precondition(e))),this.writtenDocs.add(e.toString())}update(e,t){try{this.write(t.toMutation(e,this.preconditionForUpdate(e)))}catch(n){this.lastTransactionError=n}this.writtenDocs.add(e.toString())}delete(e){this.write(new dr(e,this.precondition(e))),this.writtenDocs.add(e.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;const e=this.readVersions;this.mutations.forEach(t=>{e.delete(t.key.toString())}),e.forEach((t,n)=>{const i=M.fromPath(n);this.mutations.push(new Da(i,this.precondition(i)))}),await async function(n,i){const s=N(n),o={writes:i.map(u=>ci(s.serializer,u))};await s.Mo("Commit",s.serializer.databaseId,J.emptyPath(),o)}(this.datastore,this.mutations),this.committed=!0}recordVersion(e){let t;if(e.isFoundDocument())t=e.version;else{if(!e.isNoDocument())throw L();t=q.min()}const n=this.readVersions.get(e.key.toString());if(n){if(!t.isEqual(n))throw new D(S.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(e.key.toString(),t)}precondition(e){const t=this.readVersions.get(e.toString());return!this.writtenDocs.has(e.toString())&&t?t.isEqual(q.min())?le.exists(!1):le.updateTime(t):le.none()}preconditionForUpdate(e){const t=this.readVersions.get(e.toString());if(!this.writtenDocs.has(e.toString())&&t){if(t.isEqual(q.min()))throw new D(S.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return le.updateTime(t)}return le.exists(!0)}write(e){this.ensureCommitNotCalled(),this.mutations.push(e)}ensureCommitNotCalled(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iT{constructor(e,t,n,i,s){this.asyncQueue=e,this.datastore=t,this.options=n,this.updateFunction=i,this.deferred=s,this._u=n.maxAttempts,this.t_=new Ka(this.asyncQueue,"transaction_retry")}au(){this._u-=1,this.uu()}uu(){this.t_.Go(async()=>{const e=new rT(this.datastore),t=this.cu(e);t&&t.then(n=>{this.asyncQueue.enqueueAndForget(()=>e.commit().then(()=>{this.deferred.resolve(n)}).catch(i=>{this.lu(i)}))}).catch(n=>{this.lu(n)})})}cu(e){try{const t=this.updateFunction(e);return!pi(t)&&t.catch&&t.then?t:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(t){return this.deferred.reject(t),null}}lu(e){this._u>0&&this.hu(e)?(this._u-=1,this.asyncQueue.enqueueAndForget(()=>(this.uu(),Promise.resolve()))):this.deferred.reject(e)}hu(e){if(e.name==="FirebaseError"){const t=e.code;return t==="aborted"||t==="failed-precondition"||t==="already-exists"||!Td(t)}return!1}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sT{constructor(e,t,n,i,s){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=n,this.databaseInfo=i,this.user=Ee.UNAUTHENTICATED,this.clientId=wa.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(n,async o=>{k("FirestoreClient","Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(n,o=>(k("FirestoreClient","Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new we;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const n=gr(t,"Failed to shutdown persistence");e.reject(n)}}),e.promise}}async function Uo(r,e){r.asyncQueue.verifyOperationInProgress(),k("FirestoreClient","Initializing OfflineComponentProvider");const t=r.configuration;await e.initialize(t);let n=t.initialUser;r.setCredentialChangeListener(async i=>{n.isEqual(i)||(await Yd(e.localStore,i),n=i)}),e.persistence.setDatabaseDeletedListener(()=>r.terminate()),r._offlineComponents=e}async function Gl(r,e){r.asyncQueue.verifyOperationInProgress();const t=await au(r);k("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(t,r.configuration),r.setCredentialChangeListener(n=>Ml(e.remoteStore,n)),r.setAppCheckTokenChangeListener((n,i)=>Ml(e.remoteStore,i)),r._onlineComponents=e}async function au(r){if(!r._offlineComponents)if(r._uninitializedComponentsProvider){k("FirestoreClient","Using user provided OfflineComponentProvider");try{await Uo(r,r._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(i){return i.name==="FirebaseError"?i.code===S.FAILED_PRECONDITION||i.code===S.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11}(t))throw t;ze("Error using user provided cache. Falling back to memory cache: "+t),await Uo(r,new Ft)}}else k("FirestoreClient","Using default OfflineComponentProvider"),await Uo(r,new Ft);return r._offlineComponents}async function Qs(r){return r._onlineComponents||(r._uninitializedComponentsProvider?(k("FirestoreClient","Using user provided OnlineComponentProvider"),await Gl(r,r._uninitializedComponentsProvider._online)):(k("FirestoreClient","Using default OnlineComponentProvider"),await Gl(r,new Ut))),r._onlineComponents}function vf(r){return au(r).then(e=>e.persistence)}function _r(r){return au(r).then(e=>e.localStore)}function Ef(r){return Qs(r).then(e=>e.remoteStore)}function uu(r){return Qs(r).then(e=>e.syncEngine)}function wf(r){return Qs(r).then(e=>e.datastore)}async function ar(r){const e=await Qs(r),t=e.eventManager;return t.onListen=OI.bind(null,e.syncEngine),t.onUnlisten=LI.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=MI.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=FI.bind(null,e.syncEngine),t}function oT(r){return r.asyncQueue.enqueue(async()=>{const e=await vf(r),t=await Ef(r);return e.setNetworkEnabled(!0),function(i){const s=N(i);return s.L_.delete(0),wi(s)}(t)})}function aT(r){return r.asyncQueue.enqueue(async()=>{const e=await vf(r),t=await Ef(r);return e.setNetworkEnabled(!1),async function(i){const s=N(i);s.L_.add(0),await fr(s),s.q_.set("Offline")}(t)})}function uT(r,e){const t=new we;return r.asyncQueue.enqueueAndForget(async()=>async function(i,s,o){try{const u=await function(h,f){const p=N(h);return p.persistence.runTransaction("read document","readonly",_=>p.localDocuments.getDocument(_,f))}(i,s);u.isFoundDocument()?o.resolve(u):u.isNoDocument()?o.resolve(null):o.reject(new D(S.UNAVAILABLE,"Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)"))}catch(u){const c=gr(u,`Failed to get document '${s} from cache`);o.reject(c)}}(await _r(r),e,t)),t.promise}function Af(r,e,t={}){const n=new we;return r.asyncQueue.enqueueAndForget(async()=>function(s,o,u,c,h){const f=new Ks({next:_=>{f.Za(),o.enqueueAndForget(()=>Xa(s,p));const R=_.docs.has(u);!R&&_.fromCache?h.reject(new D(S.UNAVAILABLE,"Failed to get document because the client is offline.")):R&&_.fromCache&&c&&c.source==="server"?h.reject(new D(S.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):h.resolve(_)},error:_=>h.reject(_)}),p=new eu(lr(u.path),f,{includeMetadataChanges:!0,_a:!0});return Ya(s,p)}(await ar(r),r.asyncQueue,e,t,n)),n.promise}function cT(r,e){const t=new we;return r.asyncQueue.enqueueAndForget(async()=>async function(i,s,o){try{const u=await bs(i,s,!0),c=new pf(s,u.Ts),h=c.ma(u.documents),f=c.applyChanges(h,!1);o.resolve(f.snapshot)}catch(u){const c=gr(u,`Failed to execute query '${s} against cache`);o.reject(c)}}(await _r(r),e,t)),t.promise}function Rf(r,e,t={}){const n=new we;return r.asyncQueue.enqueueAndForget(async()=>function(s,o,u,c,h){const f=new Ks({next:_=>{f.Za(),o.enqueueAndForget(()=>Xa(s,p)),_.fromCache&&c.source==="server"?h.reject(new D(S.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):h.resolve(_)},error:_=>h.reject(_)}),p=new eu(u,f,{includeMetadataChanges:!0,_a:!0});return Ya(s,p)}(await ar(r),r.asyncQueue,e,t,n)),n.promise}function lT(r,e,t){const n=new we;return r.asyncQueue.enqueueAndForget(async()=>{try{const i=await wf(r);n.resolve(async function(o,u,c){var h;const f=N(o),{request:p,ut:_,parent:R}=kd(f.serializer,rd(u),c);f.connection.Fo||delete p.parent;const V=(await f.Lo("RunAggregationQuery",f.serializer.databaseId,R,p,1)).filter(C=>!!C.result);U(V.length===1);const x=(h=V[0].result)===null||h===void 0?void 0:h.aggregateFields;return Object.keys(x).reduce((C,B)=>(C[_[B]]=x[B],C),{})}(i,e,t))}catch(i){n.reject(i)}}),n.promise}function hT(r,e){const t=new Ks(e);return r.asyncQueue.enqueueAndForget(async()=>function(i,s){N(i).Y_.add(s),s.next()}(await ar(r),t)),()=>{t.Za(),r.asyncQueue.enqueueAndForget(async()=>function(i,s){N(i).Y_.delete(s)}(await ar(r),t))}}function dT(r,e,t,n){const i=function(o,u){let c;return c=typeof o=="string"?Ed().encode(o):o,function(f,p){return new nT(f,p)}(function(f,p){if(f instanceof Uint8Array)return zl(f,p);if(f instanceof ArrayBuffer)return zl(new Uint8Array(f),p);if(f instanceof ReadableStream)return f.getReader();throw new Error("Source of `toByteStreamReader` has to be a ArrayBuffer or ReadableStream")}(c),u)}(t,Ei(e));r.asyncQueue.enqueueAndForget(async()=>{eT(await uu(r),i,n)})}function fT(r,e){return r.asyncQueue.enqueue(async()=>function(n,i){const s=N(n);return s.persistence.runTransaction("Get named query","readonly",o=>s.Gr.getNamedQuery(o,i))}(await _r(r),e))}function mT(r,e){return r.asyncQueue.enqueue(async()=>async function(n,i){const s=N(n),o=s.indexManager,u=[];return s.persistence.runTransaction("Configure indexes","readwrite",c=>o.getFieldIndexes(c).next(h=>function(p,_,R,V,x){p=[...p],_=[..._],p.sort(R),_.sort(R);const C=p.length,B=_.length;let j=0,F=0;for(;j<B&&F<C;){const K=R(p[F],_[j]);K<0?x(p[F++]):K>0?V(_[j++]):(j++,F++)}for(;j<B;)V(_[j++]);for(;F<C;)x(p[F++])}(h,i,__,f=>{u.push(o.addFieldIndex(c,f))},f=>{u.push(o.deleteFieldIndex(c,f))})).next(()=>w.waitFor(u)))}(await _r(r),e))}function pT(r,e){return r.asyncQueue.enqueue(async()=>function(n,i){N(n).ss.zi=i}(await _r(r),e))}function gT(r){return r.asyncQueue.enqueue(async()=>function(t){const n=N(t),i=n.indexManager;return n.persistence.runTransaction("Delete All Indexes","readwrite",s=>i.deleteAllFieldIndexes(s))}(await _r(r)))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bf(r){const e={};return r.timeoutSeconds!==void 0&&(e.timeoutSeconds=r.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $l=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cu(r,e,t){if(!t)throw new D(S.INVALID_ARGUMENT,`Function ${r}() cannot be called with an empty ${e}.`)}function Sf(r,e,t,n){if(e===!0&&n===!0)throw new D(S.INVALID_ARGUMENT,`${r} and ${t} cannot be used together.`)}function Kl(r){if(!M.isDocumentKey(r))throw new D(S.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${r} has ${r.length}.`)}function Ql(r){if(M.isDocumentKey(r))throw new D(S.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${r} has ${r.length}.`)}function Ws(r){if(r===void 0)return"undefined";if(r===null)return"null";if(typeof r=="string")return r.length>20&&(r=`${r.substring(0,20)}...`),JSON.stringify(r);if(typeof r=="number"||typeof r=="boolean")return""+r;if(typeof r=="object"){if(r instanceof Array)return"an array";{const e=function(n){return n.constructor?n.constructor.name:null}(r);return e?`a custom ${e} object`:"an object"}}return typeof r=="function"?"a function":L()}function W(r,e){if("_delegate"in r&&(r=r._delegate),!(r instanceof e)){if(e.name===r.constructor.name)throw new D(S.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=Ws(r);throw new D(S.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return r}function Pf(r,e){if(e<=0)throw new D(S.INVALID_ARGUMENT,`Function ${r}() requires a positive number, but it was: ${e}.`)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wl{constructor(e){var t,n;if(e.host===void 0){if(e.ssl!==void 0)throw new D(S.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(t=e.ssl)===null||t===void 0||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new D(S.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}Sf("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=bf((n=e.experimentalLongPollingOptions)!==null&&n!==void 0?n:{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new D(S.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new D(S.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new D(S.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(n,i){return n.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Ai{constructor(e,t,n,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=n,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Wl({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new D(S.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new D(S.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Wl(e),e.credentials!==void 0&&(this._authCredentials=function(n){if(!n)return new Vh;switch(n.type){case"firstParty":return new d_(n.sessionIndex||"0",n.iamToken||null,n.authTokenFactory||null);case"provider":return n.client;default:throw new D(S.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const n=$l.get(t);n&&(k("ComponentProvider","Removing Datastore"),$l.delete(t),n.terminate())}(this),Promise.resolve()}}function Cf(r,e,t,n={}){var i;const s=(r=W(r,Ai))._getSettings(),o=`${e}:${t}`;if(s.host!=="firestore.googleapis.com"&&s.host!==o&&ze("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),r._setSettings(Object.assign(Object.assign({},s),{host:o,ssl:!1})),n.mockUserToken){let u,c;if(typeof n.mockUserToken=="string")u=n.mockUserToken,c=Ee.MOCK_USER;else{u=$m(n.mockUserToken,(i=r._app)===null||i===void 0?void 0:i.options.projectId);const h=n.mockUserToken.sub||n.mockUserToken.user_id;if(!h)throw new D(S.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");c=new Ee(h)}r._authCredentials=new c_(new Ch(u,c))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ae{constructor(e,t,n){this.converter=t,this._query=n,this.type="query",this.firestore=e}withConverter(e){return new Ae(this.firestore,e,this._query)}}class ge{constructor(e,t,n){this.converter=t,this._key=n,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Ke(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new ge(this.firestore,e,this._key)}}class Ke extends Ae{constructor(e,t,n){super(e,t,lr(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new ge(this.firestore,null,new M(e))}withConverter(e){return new Ke(this.firestore,e,this._path)}}function _T(r,e,...t){if(r=de(r),cu("collection","path",e),r instanceof Ai){const n=J.fromString(e,...t);return Ql(n),new Ke(r,null,n)}{if(!(r instanceof ge||r instanceof Ke))throw new D(S.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(J.fromString(e,...t));return Ql(n),new Ke(r.firestore,null,n)}}function yT(r,e){if(r=W(r,Ai),cu("collectionGroup","collection id",e),e.indexOf("/")>=0)throw new D(S.INVALID_ARGUMENT,`Invalid collection ID '${e}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);return new Ae(r,null,function(n){return new ut(J.emptyPath(),n)}(e))}function Vf(r,e,...t){if(r=de(r),arguments.length===1&&(e=wa.newId()),cu("doc","path",e),r instanceof Ai){const n=J.fromString(e,...t);return Kl(n),new ge(r,null,new M(n))}{if(!(r instanceof ge||r instanceof Ke))throw new D(S.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(J.fromString(e,...t));return Kl(n),new ge(r.firestore,r instanceof Ke?r.converter:null,new M(n))}}function IT(r,e){return r=de(r),e=de(e),(r instanceof ge||r instanceof Ke)&&(e instanceof ge||e instanceof Ke)&&r.firestore===e.firestore&&r.path===e.path&&r.converter===e.converter}function lu(r,e){return r=de(r),e=de(e),r instanceof Ae&&e instanceof Ae&&r.firestore===e.firestore&&_i(r._query,e._query)&&r.converter===e.converter}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hl{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new Ka(this,"async_queue_retry"),this.Vu=()=>{const n=hs();n&&k("AsyncQueue","Visibility state changed to "+n.visibilityState),this.t_.jo()},this.mu=e;const t=hs();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const t=hs();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise(()=>{});const t=new we;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Pu.push(e),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!jt(e))throw e;k("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(e){const t=this.mu.then(()=>(this.du=!0,e().catch(n=>{this.Eu=n,this.du=!1;const i=function(o){let u=o.message||"";return o.stack&&(u=o.stack.includes(o.message)?o.stack:o.message+`
`+o.stack),u}(n);throw _e("INTERNAL UNHANDLED ERROR: ",i),n}).then(n=>(this.du=!1,n))));return this.mu=t,t}enqueueAfterDelay(e,t,n){this.fu(),this.Ru.indexOf(e)>-1&&(t=0);const i=Ja.createAndSchedule(this,e,t,n,s=>this.yu(s));return this.Tu.push(i),i}fu(){this.Eu&&L()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const t of this.Tu)if(t.timerId===e)return!0;return!1}bu(e){return this.wu().then(()=>{this.Tu.sort((t,n)=>t.targetTimeMs-n.targetTimeMs);for(const t of this.Tu)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.wu()})}Du(e){this.Ru.push(e)}yu(e){const t=this.Tu.indexOf(e);this.Tu.splice(t,1)}}function ha(r){return function(t,n){if(typeof t!="object"||t===null)return!1;const i=t;for(const s of n)if(s in i&&typeof i[s]=="function")return!0;return!1}(r,["next","error","complete"])}class Df{constructor(){this._progressObserver={},this._taskCompletionResolver=new we,this._lastProgress={taskState:"Running",totalBytes:0,totalDocuments:0,bytesLoaded:0,documentsLoaded:0}}onProgress(e,t,n){this._progressObserver={next:e,error:t,complete:n}}catch(e){return this._taskCompletionResolver.promise.catch(e)}then(e,t){return this._taskCompletionResolver.promise.then(e,t)}_completeWith(e){this._updateProgress(e),this._progressObserver.complete&&this._progressObserver.complete(),this._taskCompletionResolver.resolve(e)}_failWith(e){this._lastProgress.taskState="Error",this._progressObserver.next&&this._progressObserver.next(this._lastProgress),this._progressObserver.error&&this._progressObserver.error(e),this._taskCompletionResolver.reject(e)}_updateProgress(e){this._lastProgress=e,this._progressObserver.next&&this._progressObserver.next(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const TT=-1;class re extends Ai{constructor(e,t,n,i){super(e,t,n,i),this.type="firestore",this._queue=new Hl,this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Hl(e),this._firestoreClient=void 0,await e}}}function vT(r,e,t){t||(t="(default)");const n=pa(r,"firestore");if(n.isInitialized(t)){const i=n.getImmediate({identifier:t}),s=n.getOptions(t);if(ln(s,e))return i;throw new D(S.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(e.cacheSizeBytes!==void 0&&e.localCache!==void 0)throw new D(S.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(e.cacheSizeBytes!==void 0&&e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new D(S.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return n.initialize({options:e,instanceIdentifier:t})}function ET(r,e){const t=typeof r=="object"?r:ig(),n=typeof r=="string"?r:e||"(default)",i=pa(t,"firestore").getImmediate({identifier:n});if(!i._initialized){const s=jm("firestore");s&&Cf(i,...s)}return i}function fe(r){if(r._terminated)throw new D(S.FAILED_PRECONDITION,"The client has already been terminated.");return r._firestoreClient||kf(r),r._firestoreClient}function kf(r){var e,t,n;const i=r._freezeSettings(),s=function(u,c,h,f){return new G_(u,c,h,f.host,f.ssl,f.experimentalForceLongPolling,f.experimentalAutoDetectLongPolling,bf(f.experimentalLongPollingOptions),f.useFetchStreams)}(r._databaseId,((e=r._app)===null||e===void 0?void 0:e.options.appId)||"",r._persistenceKey,i);r._componentsProvider||!((t=i.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((n=i.localCache)===null||n===void 0)&&n._onlineComponentProvider)&&(r._componentsProvider={_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider}),r._firestoreClient=new sT(r._authCredentials,r._appCheckCredentials,r._queue,s,r._componentsProvider&&function(u){const c=u==null?void 0:u._online.build();return{_offline:u==null?void 0:u._offline.build(c),_online:c}}(r._componentsProvider))}function wT(r,e){ze("enableIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const t=r._freezeSettings();return xf(r,Ut.provider,{build:n=>new ou(n,t.cacheSizeBytes,e==null?void 0:e.forceOwnership)}),Promise.resolve()}async function AT(r){ze("enableMultiTabIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const e=r._freezeSettings();xf(r,Ut.provider,{build:t=>new Tf(t,e.cacheSizeBytes)})}function xf(r,e,t){if((r=W(r,re))._firestoreClient||r._terminated)throw new D(S.FAILED_PRECONDITION,"Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.");if(r._componentsProvider||r._getSettings().localCache)throw new D(S.FAILED_PRECONDITION,"SDK cache is already specified.");r._componentsProvider={_online:e,_offline:t},kf(r)}function RT(r){if(r._initialized&&!r._terminated)throw new D(S.FAILED_PRECONDITION,"Persistence can only be cleared before a Firestore instance is initialized or after it is terminated.");const e=new we;return r._queue.enqueueAndForgetEvenWhileRestricted(async()=>{try{await async function(n){if(!He.D())return Promise.resolve();const i=n+"main";await He.delete(i)}(za(r._databaseId,r._persistenceKey)),e.resolve()}catch(t){e.reject(t)}}),e.promise}function bT(r){return function(t){const n=new we;return t.asyncQueue.enqueueAndForget(async()=>zI(await uu(t),n)),n.promise}(fe(r=W(r,re)))}function ST(r){return oT(fe(r=W(r,re)))}function PT(r){return aT(fe(r=W(r,re)))}function CT(r){return eg(r.app,"firestore",r._databaseId.database),r._delete()}function VT(r,e){const t=fe(r=W(r,re)),n=new Df;return dT(t,r._databaseId,e,n),n}function DT(r,e){return fT(fe(r=W(r,re)),e).then(t=>t?new Ae(r,null,t.query):null)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ur{constructor(e="count",t){this._internalFieldPath=t,this.type="AggregateField",this.aggregateType=e}}class Nf{constructor(e,t,n){this._userDataWriter=t,this._data=n,this.type="AggregateQuerySnapshot",this.query=e}data(){return this._userDataWriter.convertObjectMap(this._data)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bt{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Bt(me.fromBase64String(e))}catch(t){throw new D(S.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Bt(me.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $t{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new D(S.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ue(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}function kT(){return new $t("__name__")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kt{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hs{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new D(S.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new D(S.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return z(this._lat,e._lat)||z(this._long,e._long)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ri{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(n,i){if(n.length!==i.length)return!1;for(let s=0;s<n.length;++s)if(n[s]!==i[s])return!1;return!0}(this._values,e._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xT=/^__.*__$/;class NT{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return this.fieldMask!==null?new lt(e,this.data,this.fieldMask,t,this.fieldTransforms):new hr(e,this.data,t,this.fieldTransforms)}}class Of{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return new lt(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function Mf(r){switch(r){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw L()}}class Js{constructor(e,t,n,i,s,o){this.settings=e,this.databaseId=t,this.serializer=n,this.ignoreUndefinedProperties=i,s===void 0&&this.vu(),this.fieldTransforms=s||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(e){return new Js(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(e){var t;const n=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.Fu({path:n,xu:!1});return i.Ou(e),i}Nu(e){var t;const n=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.Fu({path:n,xu:!1});return i.vu(),i}Lu(e){return this.Fu({path:void 0,xu:!0})}Bu(e){return Vs(e,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}vu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Ou(this.path.get(e))}Ou(e){if(e.length===0)throw this.Bu("Document fields must not be empty");if(Mf(this.Cu)&&xT.test(e))throw this.Bu('Document fields cannot begin and end with "__"')}}class OT{constructor(e,t,n){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=n||Ei(e)}Qu(e,t,n,i=!1){return new Js({Cu:e,methodName:t,qu:n,path:ue.emptyPath(),xu:!1,ku:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function An(r){const e=r._freezeSettings(),t=Ei(r._databaseId);return new OT(r._databaseId,!!e.ignoreUndefinedProperties,t)}function Ys(r,e,t,n,i,s={}){const o=r.Qu(s.merge||s.mergeFields?2:0,e,t,i);_u("Data must be an object, but it was:",o,n);const u=Uf(n,o);let c,h;if(s.merge)c=new Ue(o.fieldMask),h=o.fieldTransforms;else if(s.mergeFields){const f=[];for(const p of s.mergeFields){const _=li(e,p,t);if(!o.contains(_))throw new D(S.INVALID_ARGUMENT,`Field '${_}' is specified in your field mask but missing from your input data.`);qf(f,_)||f.push(_)}c=new Ue(f),h=o.fieldTransforms.filter(p=>c.covers(p.field))}else c=null,h=o.fieldTransforms;return new NT(new Se(u),c,h)}class bi extends Kt{_toFieldTransform(e){if(e.Cu!==2)throw e.Cu===1?e.Bu(`${this._methodName}() can only appear at the top level of your update data`):e.Bu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof bi}}function Lf(r,e,t){return new Js({Cu:3,qu:e.settings.qu,methodName:r._methodName,xu:t},e.databaseId,e.serializer,e.ignoreUndefinedProperties)}class hu extends Kt{_toFieldTransform(e){return new Ii(e.path,new Zn)}isEqual(e){return e instanceof hu}}class du extends Kt{constructor(e,t){super(e),this.Ku=t}_toFieldTransform(e){const t=Lf(this,e,!0),n=this.Ku.map(s=>Rn(s,t)),i=new _n(n);return new Ii(e.path,i)}isEqual(e){return e instanceof du&&ln(this.Ku,e.Ku)}}class fu extends Kt{constructor(e,t){super(e),this.Ku=t}_toFieldTransform(e){const t=Lf(this,e,!0),n=this.Ku.map(s=>Rn(s,t)),i=new yn(n);return new Ii(e.path,i)}isEqual(e){return e instanceof fu&&ln(this.Ku,e.Ku)}}class mu extends Kt{constructor(e,t){super(e),this.$u=t}_toFieldTransform(e){const t=new er(e.serializer,dd(e.serializer,this.$u));return new Ii(e.path,t)}isEqual(e){return e instanceof mu&&this.$u===e.$u}}function pu(r,e,t,n){const i=r.Qu(1,e,t);_u("Data must be an object, but it was:",i,n);const s=[],o=Se.empty();zt(n,(c,h)=>{const f=Xs(e,c,t);h=de(h);const p=i.Nu(f);if(h instanceof bi)s.push(f);else{const _=Rn(h,p);_!=null&&(s.push(f),o.set(f,_))}});const u=new Ue(s);return new Of(o,u,i.fieldTransforms)}function gu(r,e,t,n,i,s){const o=r.Qu(1,e,t),u=[li(e,n,t)],c=[i];if(s.length%2!=0)throw new D(S.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let _=0;_<s.length;_+=2)u.push(li(e,s[_])),c.push(s[_+1]);const h=[],f=Se.empty();for(let _=u.length-1;_>=0;--_)if(!qf(h,u[_])){const R=u[_];let V=c[_];V=de(V);const x=o.Nu(R);if(V instanceof bi)h.push(R);else{const C=Rn(V,x);C!=null&&(h.push(R),f.set(R,C))}}const p=new Ue(h);return new Of(f,p,o.fieldTransforms)}function Ff(r,e,t,n=!1){return Rn(t,r.Qu(n?4:3,e))}function Rn(r,e){if(Bf(r=de(r)))return _u("Unsupported field value:",e,r),Uf(r,e);if(r instanceof Kt)return function(n,i){if(!Mf(i.Cu))throw i.Bu(`${n._methodName}() can only be used with update() and set()`);if(!i.path)throw i.Bu(`${n._methodName}() is not currently supported inside arrays`);const s=n._toFieldTransform(i);s&&i.fieldTransforms.push(s)}(r,e),null;if(r===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),r instanceof Array){if(e.settings.xu&&e.Cu!==4)throw e.Bu("Nested arrays are not supported");return function(n,i){const s=[];let o=0;for(const u of n){let c=Rn(u,i.Lu(o));c==null&&(c={nullValue:"NULL_VALUE"}),s.push(c),o++}return{arrayValue:{values:s}}}(r,e)}return function(n,i){if((n=de(n))===null)return{nullValue:"NULL_VALUE"};if(typeof n=="number")return dd(i.serializer,n);if(typeof n=="boolean")return{booleanValue:n};if(typeof n=="string")return{stringValue:n};if(n instanceof Date){const s=he.fromDate(n);return{timestampValue:tr(i.serializer,s)}}if(n instanceof he){const s=new he(n.seconds,1e3*Math.floor(n.nanoseconds/1e3));return{timestampValue:tr(i.serializer,s)}}if(n instanceof Hs)return{geoPointValue:{latitude:n.latitude,longitude:n.longitude}};if(n instanceof Bt)return{bytesValue:Rd(i.serializer,n._byteString)};if(n instanceof ge){const s=i.databaseId,o=n.firestore._databaseId;if(!o.isEqual(s))throw i.Bu(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:Ma(n.firestore._databaseId||i.databaseId,n._key.path)}}if(n instanceof Ri)return function(o,u){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:o.toArray().map(c=>{if(typeof c!="number")throw u.Bu("VectorValues must only contain numeric values.");return Va(u.serializer,c)})}}}}}}(n,i);throw i.Bu(`Unsupported field value: ${Ws(n)}`)}(r,e)}function Uf(r,e){const t={};return Gh(r)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):zt(r,(n,i)=>{const s=Rn(i,e.Mu(n));s!=null&&(t[n]=s)}),{mapValue:{fields:t}}}function Bf(r){return!(typeof r!="object"||r===null||r instanceof Array||r instanceof Date||r instanceof he||r instanceof Hs||r instanceof Bt||r instanceof ge||r instanceof Kt||r instanceof Ri)}function _u(r,e,t){if(!Bf(t)||!function(i){return typeof i=="object"&&i!==null&&(Object.getPrototypeOf(i)===Object.prototype||Object.getPrototypeOf(i)===null)}(t)){const n=Ws(t);throw n==="an object"?e.Bu(r+" a custom object"):e.Bu(r+" "+n)}}function li(r,e,t){if((e=de(e))instanceof $t)return e._internalPath;if(typeof e=="string")return Xs(r,e);throw Vs("Field path arguments must be of type string or ",r,!1,void 0,t)}const MT=new RegExp("[~\\*/\\[\\]]");function Xs(r,e,t){if(e.search(MT)>=0)throw Vs(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,r,!1,void 0,t);try{return new $t(...e.split("."))._internalPath}catch{throw Vs(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,r,!1,void 0,t)}}function Vs(r,e,t,n,i){const s=n&&!n.isEmpty(),o=i!==void 0;let u=`Function ${e}() called with invalid data`;t&&(u+=" (via `toFirestore()`)"),u+=". ";let c="";return(s||o)&&(c+=" (found",s&&(c+=` in field ${n}`),o&&(c+=` in document ${i}`),c+=")"),new D(S.INVALID_ARGUMENT,u+r+c)}function qf(r,e){return r.some(t=>t.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hi{constructor(e,t,n,i,s){this._firestore=e,this._userDataWriter=t,this._key=n,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new ge(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new LT(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(Zs("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class LT extends hi{data(){return super.data()}}function Zs(r,e){return typeof e=="string"?Xs(r,e):e instanceof $t?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jf(r){if(r.limitType==="L"&&r.explicitOrderBy.length===0)throw new D(S.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class yu{}class yr extends yu{}function FT(r,e,...t){let n=[];e instanceof yu&&n.push(e),n=n.concat(t),function(s){const o=s.filter(c=>c instanceof bn).length,u=s.filter(c=>c instanceof Ir).length;if(o>1||o>0&&u>0)throw new D(S.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(n);for(const i of n)r=i._apply(r);return r}class Ir extends yr{constructor(e,t,n){super(),this._field=e,this._op=t,this._value=n,this.type="where"}static _create(e,t,n){return new Ir(e,t,n)}_apply(e){const t=this._parse(e);return Gf(e._query,t),new Ae(e.firestore,e.converter,Zo(e._query,t))}_parse(e){const t=An(e.firestore);return function(s,o,u,c,h,f,p){let _;if(h.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new D(S.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){Yl(p,f);const R=[];for(const V of p)R.push(Jl(c,s,V));_={arrayValue:{values:R}}}else _=Jl(c,s,p)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||Yl(p,f),_=Ff(u,o,p,f==="in"||f==="not-in");return Y.create(h,f,_)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function UT(r,e,t){const n=e,i=Zs("where",r);return Ir._create(i,n,t)}class bn extends yu{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new bn(e,t)}_parse(e){const t=this._queryConstraints.map(n=>n._parse(e)).filter(n=>n.getFilters().length>0);return t.length===1?t[0]:te.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(i,s){let o=i;const u=s.getFlattenedFilters();for(const c of u)Gf(o,c),o=Zo(o,c)}(e._query,t),new Ae(e.firestore,e.converter,Zo(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}function BT(...r){return r.forEach(e=>$f("or",e)),bn._create("or",r)}function qT(...r){return r.forEach(e=>$f("and",e)),bn._create("and",r)}class eo extends yr{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new eo(e,t)}_apply(e){const t=function(i,s,o){if(i.startAt!==null)throw new D(S.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(i.endAt!==null)throw new D(S.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new ai(s,o)}(e._query,this._field,this._direction);return new Ae(e.firestore,e.converter,function(i,s){const o=i.explicitOrderBy.concat([s]);return new ut(i.path,i.collectionGroup,o,i.filters.slice(),i.limit,i.limitType,i.startAt,i.endAt)}(e._query,t))}}function jT(r,e="asc"){const t=e,n=Zs("orderBy",r);return eo._create(n,t)}class Si extends yr{constructor(e,t,n){super(),this.type=e,this._limit=t,this._limitType=n}static _create(e,t,n){return new Si(e,t,n)}_apply(e){return new Ae(e.firestore,e.converter,Ts(e._query,this._limit,this._limitType))}}function zT(r){return Pf("limit",r),Si._create("limit",r,"F")}function GT(r){return Pf("limitToLast",r),Si._create("limitToLast",r,"L")}class Pi extends yr{constructor(e,t,n){super(),this.type=e,this._docOrFields=t,this._inclusive=n}static _create(e,t,n){return new Pi(e,t,n)}_apply(e){const t=zf(e,this.type,this._docOrFields,this._inclusive);return new Ae(e.firestore,e.converter,function(i,s){return new ut(i.path,i.collectionGroup,i.explicitOrderBy.slice(),i.filters.slice(),i.limit,i.limitType,s,i.endAt)}(e._query,t))}}function $T(...r){return Pi._create("startAt",r,!0)}function KT(...r){return Pi._create("startAfter",r,!1)}class Ci extends yr{constructor(e,t,n){super(),this.type=e,this._docOrFields=t,this._inclusive=n}static _create(e,t,n){return new Ci(e,t,n)}_apply(e){const t=zf(e,this.type,this._docOrFields,this._inclusive);return new Ae(e.firestore,e.converter,function(i,s){return new ut(i.path,i.collectionGroup,i.explicitOrderBy.slice(),i.filters.slice(),i.limit,i.limitType,i.startAt,s)}(e._query,t))}}function QT(...r){return Ci._create("endBefore",r,!1)}function WT(...r){return Ci._create("endAt",r,!0)}function zf(r,e,t,n){if(t[0]=de(t[0]),t[0]instanceof hi)return function(s,o,u,c,h){if(!c)throw new D(S.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${u}().`);const f=[];for(const p of Gn(s))if(p.field.isKeyField())f.push(pn(o,c.key));else{const _=c.data.field(p.field);if(Os(_))throw new D(S.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+p.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(_===null){const R=p.field.canonicalString();throw new D(S.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${R}' (used as the orderBy) does not exist.`)}f.push(_)}return new Mt(f,h)}(r._query,r.firestore._databaseId,e,t[0]._document,n);{const i=An(r.firestore);return function(o,u,c,h,f,p){const _=o.explicitOrderBy;if(f.length>_.length)throw new D(S.INVALID_ARGUMENT,`Too many arguments provided to ${h}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);const R=[];for(let V=0;V<f.length;V++){const x=f[V];if(_[V].field.isKeyField()){if(typeof x!="string")throw new D(S.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${h}(), but got a ${typeof x}`);if(!Pa(o)&&x.indexOf("/")!==-1)throw new D(S.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by documentId(), the value passed to ${h}() must be a plain document ID, but '${x}' contains a slash.`);const C=o.path.child(J.fromString(x));if(!M.isDocumentKey(C))throw new D(S.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${h}() must result in a valid document path, but '${C}' is not because it contains an odd number of segments.`);const B=new M(C);R.push(pn(u,B))}else{const C=Ff(c,h,x);R.push(C)}}return new Mt(R,p)}(r._query,r.firestore._databaseId,i,e,t,n)}}function Jl(r,e,t){if(typeof(t=de(t))=="string"){if(t==="")throw new D(S.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Pa(e)&&t.indexOf("/")!==-1)throw new D(S.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const n=e.path.child(J.fromString(t));if(!M.isDocumentKey(n))throw new D(S.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${n}' is not because it has an odd number of segments (${n.length}).`);return pn(r,new M(n))}if(t instanceof ge)return pn(r,t._key);throw new D(S.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Ws(t)}.`)}function Yl(r,e){if(!Array.isArray(r)||r.length===0)throw new D(S.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Gf(r,e){const t=function(i,s){for(const o of i)for(const u of o.getFlattenedFilters())if(s.indexOf(u.op)>=0)return u.op;return null}(r.filters,function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new D(S.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new D(S.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}function $f(r,e){if(!(e instanceof Ir||e instanceof bn))throw new D(S.INVALID_ARGUMENT,`Function ${r}() requires AppliableConstraints created with a call to 'where(...)', 'or(...)', or 'and(...)'.`)}class Iu{convertValue(e,t="none"){switch(Nt(e)){case 0:return null;case 1:return e.booleanValue;case 2:return ce(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(ot(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw L()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const n={};return zt(e,(i,s)=>{n[i]=this.convertValue(s,t)}),n}convertVectorValue(e){var t,n,i;const s=(i=(n=(t=e.fields)===null||t===void 0?void 0:t.value.arrayValue)===null||n===void 0?void 0:n.values)===null||i===void 0?void 0:i.map(o=>ce(o.doubleValue));return new Ri(s)}convertGeoPoint(e){return new Hs(ce(e.latitude),ce(e.longitude))}convertArray(e,t){return(e.values||[]).map(n=>this.convertValue(n,t))}convertServerTimestamp(e,t){switch(t){case"previous":const n=Ms(e);return n==null?null:this.convertValue(n,t);case"estimate":return this.convertTimestamp(ii(e));default:return null}}convertTimestamp(e){const t=st(e);return new he(t.seconds,t.nanos)}convertDocumentKey(e,t){const n=J.fromString(e);U(Md(n));const i=new xt(n.get(1),n.get(3)),s=new M(n.popFirst(5));return i.isEqual(t)||_e(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function to(r,e,t){let n;return n=r?t&&(t.merge||t.mergeFields)?r.toFirestore(e,t):r.toFirestore(e):e,n}class HT extends Iu{constructor(e){super(),this.firestore=e}convertBytes(e){return new Bt(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new ge(this.firestore,null,t)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function JT(r){return new ur("sum",li("sum",r))}function YT(r){return new ur("avg",li("average",r))}function Kf(){return new ur("count")}function XT(r,e){var t,n;return r instanceof ur&&e instanceof ur&&r.aggregateType===e.aggregateType&&((t=r._internalFieldPath)===null||t===void 0?void 0:t.canonicalString())===((n=e._internalFieldPath)===null||n===void 0?void 0:n.canonicalString())}function ZT(r,e){return lu(r.query,e.query)&&ln(r.data(),e.data())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pt{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class En extends hi{constructor(e,t,n,i,s,o){super(e,t,n,i,o),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Zr(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const n=this._document.data.field(Zs("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n,t.serverTimestamps)}}}class Zr extends En{data(e={}){return super.data(e)}}class wn{constructor(e,t,n,i){this._firestore=e,this._userDataWriter=t,this._snapshot=i,this.metadata=new Pt(i.hasPendingWrites,i.fromCache),this.query=n}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(n=>{e.call(t,new Zr(this._firestore,this._userDataWriter,n.key,n,new Pt(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new D(S.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(i,s){if(i._snapshot.oldDocs.isEmpty()){let o=0;return i._snapshot.docChanges.map(u=>{const c=new Zr(i._firestore,i._userDataWriter,u.doc.key,u.doc,new Pt(i._snapshot.mutatedKeys.has(u.doc.key),i._snapshot.fromCache),i.query.converter);return u.doc,{type:"added",doc:c,oldIndex:-1,newIndex:o++}})}{let o=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(u=>s||u.type!==3).map(u=>{const c=new Zr(i._firestore,i._userDataWriter,u.doc.key,u.doc,new Pt(i._snapshot.mutatedKeys.has(u.doc.key),i._snapshot.fromCache),i.query.converter);let h=-1,f=-1;return u.type!==0&&(h=o.indexOf(u.doc.key),o=o.delete(u.doc.key)),u.type!==1&&(o=o.add(u.doc),f=o.indexOf(u.doc.key)),{type:ev(u.type),doc:c,oldIndex:h,newIndex:f}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}}function ev(r){switch(r){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return L()}}function tv(r,e){return r instanceof En&&e instanceof En?r._firestore===e._firestore&&r._key.isEqual(e._key)&&(r._document===null?e._document===null:r._document.isEqual(e._document))&&r._converter===e._converter:r instanceof wn&&e instanceof wn&&r._firestore===e._firestore&&lu(r.query,e.query)&&r.metadata.isEqual(e.metadata)&&r._snapshot.isEqual(e._snapshot)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nv(r){r=W(r,ge);const e=W(r.firestore,re);return Af(fe(e),r._key).then(t=>Tu(e,r,t))}class Qt extends Iu{constructor(e){super(),this.firestore=e}convertBytes(e){return new Bt(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new ge(this.firestore,null,t)}}function rv(r){r=W(r,ge);const e=W(r.firestore,re),t=fe(e),n=new Qt(e);return uT(t,r._key).then(i=>new En(e,n,r._key,i,new Pt(i!==null&&i.hasLocalMutations,!0),r.converter))}function iv(r){r=W(r,ge);const e=W(r.firestore,re);return Af(fe(e),r._key,{source:"server"}).then(t=>Tu(e,r,t))}function sv(r){r=W(r,Ae);const e=W(r.firestore,re),t=fe(e),n=new Qt(e);return jf(r._query),Rf(t,r._query).then(i=>new wn(e,n,r,i))}function ov(r){r=W(r,Ae);const e=W(r.firestore,re),t=fe(e),n=new Qt(e);return cT(t,r._query).then(i=>new wn(e,n,r,i))}function av(r){r=W(r,Ae);const e=W(r.firestore,re),t=fe(e),n=new Qt(e);return Rf(t,r._query,{source:"server"}).then(i=>new wn(e,n,r,i))}function uv(r,e,t){r=W(r,ge);const n=W(r.firestore,re),i=to(r.converter,e,t);return Tr(n,[Ys(An(n),"setDoc",r._key,i,r.converter!==null,t).toMutation(r._key,le.none())])}function cv(r,e,t,...n){r=W(r,ge);const i=W(r.firestore,re),s=An(i);let o;return o=typeof(e=de(e))=="string"||e instanceof $t?gu(s,"updateDoc",r._key,e,t,n):pu(s,"updateDoc",r._key,e),Tr(i,[o.toMutation(r._key,le.exists(!0))])}function lv(r){return Tr(W(r.firestore,re),[new dr(r._key,le.none())])}function hv(r,e){const t=W(r.firestore,re),n=Vf(r),i=to(r.converter,e);return Tr(t,[Ys(An(r.firestore),"addDoc",n._key,i,r.converter!==null,{}).toMutation(n._key,le.exists(!1))]).then(()=>n)}function dv(r,...e){var t,n,i;r=de(r);let s={includeMetadataChanges:!1,source:"default"},o=0;typeof e[o]!="object"||ha(e[o])||(s=e[o],o++);const u={includeMetadataChanges:s.includeMetadataChanges,source:s.source};if(ha(e[o])){const p=e[o];e[o]=(t=p.next)===null||t===void 0?void 0:t.bind(p),e[o+1]=(n=p.error)===null||n===void 0?void 0:n.bind(p),e[o+2]=(i=p.complete)===null||i===void 0?void 0:i.bind(p)}let c,h,f;if(r instanceof ge)h=W(r.firestore,re),f=lr(r._key.path),c={next:p=>{e[o]&&e[o](Tu(h,r,p))},error:e[o+1],complete:e[o+2]};else{const p=W(r,Ae);h=W(p.firestore,re),f=p._query;const _=new Qt(h);c={next:R=>{e[o]&&e[o](new wn(h,_,p,R))},error:e[o+1],complete:e[o+2]},jf(r._query)}return function(_,R,V,x){const C=new Ks(x),B=new eu(R,C,V);return _.asyncQueue.enqueueAndForget(async()=>Ya(await ar(_),B)),()=>{C.Za(),_.asyncQueue.enqueueAndForget(async()=>Xa(await ar(_),B))}}(fe(h),f,u,c)}function fv(r,e){return hT(fe(r=W(r,re)),ha(e)?e:{next:e})}function Tr(r,e){return function(n,i){const s=new we;return n.asyncQueue.enqueueAndForget(async()=>UI(await uu(n),i,s)),s.promise}(fe(r),e)}function Tu(r,e,t){const n=t.docs.get(e._key),i=new Qt(r);return new En(r,i,e._key,n,new Pt(t.hasPendingWrites,t.fromCache),e.converter)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mv(r){return Qf(r,{count:Kf()})}function Qf(r,e){const t=W(r.firestore,re),n=fe(t),i=zh(e,(s,o)=>new Id(o,s.aggregateType,s._internalFieldPath));return lT(n,r._query,i).then(s=>function(u,c,h){const f=new Qt(u);return new Nf(c,f,h)}(t,r,s))}class pv{constructor(e){this.kind="memory",this._onlineComponentProvider=Ut.provider,e!=null&&e.garbageCollector?this._offlineComponentProvider=e.garbageCollector._offlineComponentProvider:this._offlineComponentProvider=Ft.provider}toJSON(){return{kind:this.kind}}}class gv{constructor(e){let t;this.kind="persistent",e!=null&&e.tabManager?(e.tabManager._initialize(e),t=e.tabManager):(t=Wf(void 0),t._initialize(e)),this._onlineComponentProvider=t._onlineComponentProvider,this._offlineComponentProvider=t._offlineComponentProvider}toJSON(){return{kind:this.kind}}}class _v{constructor(){this.kind="memoryEager",this._offlineComponentProvider=Ft.provider}toJSON(){return{kind:this.kind}}}class yv{constructor(e){this.kind="memoryLru",this._offlineComponentProvider={build:()=>new tT(e)}}toJSON(){return{kind:this.kind}}}function Iv(){return new _v}function Tv(r){return new yv(r==null?void 0:r.cacheSizeBytes)}function vv(r){return new pv(r)}function Ev(r){return new gv(r)}class wv{constructor(e){this.forceOwnership=e,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=Ut.provider,this._offlineComponentProvider={build:t=>new ou(t,e==null?void 0:e.cacheSizeBytes,this.forceOwnership)}}}class Av{constructor(){this.kind="PersistentMultipleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=Ut.provider,this._offlineComponentProvider={build:t=>new Tf(t,e==null?void 0:e.cacheSizeBytes)}}}function Wf(r){return new wv(r==null?void 0:r.forceOwnership)}function Rv(){return new Av}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bv={maxAttempts:5};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hf{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=An(e)}set(e,t,n){this._verifyNotCommitted();const i=Rt(e,this._firestore),s=to(i.converter,t,n),o=Ys(this._dataReader,"WriteBatch.set",i._key,s,i.converter!==null,n);return this._mutations.push(o.toMutation(i._key,le.none())),this}update(e,t,n,...i){this._verifyNotCommitted();const s=Rt(e,this._firestore);let o;return o=typeof(t=de(t))=="string"||t instanceof $t?gu(this._dataReader,"WriteBatch.update",s._key,t,n,i):pu(this._dataReader,"WriteBatch.update",s._key,t),this._mutations.push(o.toMutation(s._key,le.exists(!0))),this}delete(e){this._verifyNotCommitted();const t=Rt(e,this._firestore);return this._mutations=this._mutations.concat(new dr(t._key,le.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new D(S.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function Rt(r,e){if((r=de(r)).firestore!==e)throw new D(S.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jf extends class{constructor(t,n){this._firestore=t,this._transaction=n,this._dataReader=An(t)}get(t){const n=Rt(t,this._firestore),i=new HT(this._firestore);return this._transaction.lookup([n._key]).then(s=>{if(!s||s.length!==1)return L();const o=s[0];if(o.isFoundDocument())return new hi(this._firestore,i,o.key,o,n.converter);if(o.isNoDocument())return new hi(this._firestore,i,n._key,null,n.converter);throw L()})}set(t,n,i){const s=Rt(t,this._firestore),o=to(s.converter,n,i),u=Ys(this._dataReader,"Transaction.set",s._key,o,s.converter!==null,i);return this._transaction.set(s._key,u),this}update(t,n,i,...s){const o=Rt(t,this._firestore);let u;return u=typeof(n=de(n))=="string"||n instanceof $t?gu(this._dataReader,"Transaction.update",o._key,n,i,s):pu(this._dataReader,"Transaction.update",o._key,n),this._transaction.update(o._key,u),this}delete(t){const n=Rt(t,this._firestore);return this._transaction.delete(n._key),this}}{constructor(e,t){super(e,t),this._firestore=e}get(e){const t=Rt(e,this._firestore),n=new Qt(this._firestore);return super.get(e).then(i=>new En(this._firestore,n,t._key,i._document,new Pt(!1,!1),t.converter))}}function Sv(r,e,t){r=W(r,re);const n=Object.assign(Object.assign({},bv),t);return function(s){if(s.maxAttempts<1)throw new D(S.INVALID_ARGUMENT,"Max attempts must be at least 1")}(n),function(s,o,u){const c=new we;return s.asyncQueue.enqueueAndForget(async()=>{const h=await wf(s);new iT(s.asyncQueue,h,u,o,c).au()}),c.promise}(fe(r),i=>e(new Jf(r,i)),n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pv(){return new bi("deleteField")}function Cv(){return new hu("serverTimestamp")}function Vv(...r){return new du("arrayUnion",r)}function Dv(...r){return new fu("arrayRemove",r)}function kv(r){return new mu("increment",r)}function xv(r){return new Ri(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nv(r){return fe(r=W(r,re)),new Hf(r,e=>Tr(r,e))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ov(r,e){const t=fe(r=W(r,re));if(!t._uninitializedComponentsProvider||t._uninitializedComponentsProvider._offline.kind==="memory")return ze("Cannot enable indexes when persistence is disabled"),Promise.resolve();const n=function(s){const o=typeof s=="string"?function(h){try{return JSON.parse(h)}catch(f){throw new D(S.INVALID_ARGUMENT,"Failed to parse JSON: "+(f==null?void 0:f.message))}}(s):s,u=[];if(Array.isArray(o.indexes))for(const c of o.indexes){const h=Xl(c,"collectionGroup"),f=[];if(Array.isArray(c.fields))for(const p of c.fields){const _=Xs("setIndexConfiguration",Xl(p,"fieldPath"));p.arrayConfig==="CONTAINS"?f.push(new cn(_,2)):p.order==="ASCENDING"?f.push(new cn(_,0)):p.order==="DESCENDING"&&f.push(new cn(_,1))}u.push(new Hn(Hn.UNKNOWN_ID,h,f,Jn.empty()))}return u}(e);return mT(t,n)}function Xl(r,e){if(typeof r[e]!="string")throw new D(S.INVALID_ARGUMENT,"Missing string value for: "+e);return r[e]}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yf{constructor(e){this._firestore=e,this.type="PersistentCacheIndexManager"}}function Mv(r){var e;r=W(r,re);const t=Zl.get(r);if(t)return t;if(((e=fe(r)._uninitializedComponentsProvider)===null||e===void 0?void 0:e._offline.kind)!=="persistent")return null;const n=new Yf(r);return Zl.set(r,n),n}function Lv(r){Xf(r,!0)}function Fv(r){Xf(r,!1)}function Uv(r){gT(fe(r._firestore)).then(e=>k("deleting all persistent cache indexes succeeded")).catch(e=>ze("deleting all persistent cache indexes failed",e))}function Xf(r,e){pT(fe(r._firestore),e).then(t=>k(`setting persistent cache index auto creation isEnabled=${e} succeeded`)).catch(t=>ze(`setting persistent cache index auto creation isEnabled=${e} failed`,t))}const Zl=new WeakMap;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bv(r){var e;const t=(e=fe(W(r.firestore,re))._onlineComponents)===null||e===void 0?void 0:e.datastore.serializer;return t===void 0?null:Bs(t,Oe(r._query))._t}function qv(r,e){var t;const n=zh(e,(s,o)=>new Id(o,s.aggregateType,s._internalFieldPath)),i=(t=fe(W(r.firestore,re))._onlineComponents)===null||t===void 0?void 0:t.datastore.serializer;return i===void 0?null:kd(i,rd(r._query),n,!0).request}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jv{constructor(){throw new Error("instances of this class should not be created")}static onExistenceFilterMismatch(e){return vu.instance.onExistenceFilterMismatch(e)}}class vu{constructor(){this.Uu=new Map}static get instance(){return ns||(ns=new vu,function(t){if(vs)throw new Error("a TestingHooksSpi instance is already set");vs=t}(ns)),ns}et(e){this.Uu.forEach(t=>t(e))}onExistenceFilterMismatch(e){const t=Symbol(),n=this.Uu;return n.set(t,e),()=>n.delete(t)}}let ns=null;(function(e,t=!0){(function(i){cr=i})(ks),Kn(new hn("firestore",(n,{instanceIdentifier:i,options:s})=>{const o=n.getProvider("app").getImmediate(),u=new re(new l_(n.getProvider("auth-internal")),new f_(n.getProvider("app-check-internal")),function(h,f){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new D(S.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new xt(h.options.projectId,f)}(o,i),o);return s=Object.assign({useFetchStreams:t},s),u._setSettings(s),u},"PUBLIC").setMultipleInstances(!0)),Dt(jc,"4.7.3",e),Dt(jc,"4.7.3","esm2017")})();const Xv=Object.freeze(Object.defineProperty({__proto__:null,AbstractUserDataWriter:Iu,AggregateField:ur,AggregateQuerySnapshot:Nf,Bytes:Bt,CACHE_SIZE_UNLIMITED:TT,CollectionReference:Ke,DocumentReference:ge,DocumentSnapshot:En,FieldPath:$t,FieldValue:Kt,Firestore:re,FirestoreError:D,GeoPoint:Hs,LoadBundleTask:Df,PersistentCacheIndexManager:Yf,Query:Ae,QueryCompositeFilterConstraint:bn,QueryConstraint:yr,QueryDocumentSnapshot:Zr,QueryEndAtConstraint:Ci,QueryFieldFilterConstraint:Ir,QueryLimitConstraint:Si,QueryOrderByConstraint:eo,QuerySnapshot:wn,QueryStartAtConstraint:Pi,SnapshotMetadata:Pt,Timestamp:he,Transaction:Jf,VectorValue:Ri,WriteBatch:Hf,_AutoId:wa,_ByteString:me,_DatabaseId:xt,_DocumentKey:M,_EmptyAppCheckTokenProvider:m_,_EmptyAuthCredentialsProvider:Vh,_FieldPath:ue,_TestingHooks:jv,_cast:W,_debugAssert:u_,_internalAggregationQueryToProtoRunAggregationQueryRequest:qv,_internalQueryToProtoQueryTarget:Bv,_isBase64Available:j_,_logWarn:ze,_validateIsNotUsedTogether:Sf,addDoc:hv,aggregateFieldEqual:XT,aggregateQuerySnapshotEqual:ZT,and:qT,arrayRemove:Dv,arrayUnion:Vv,average:YT,clearIndexedDbPersistence:RT,collection:_T,collectionGroup:yT,connectFirestoreEmulator:Cf,count:Kf,deleteAllPersistentCacheIndexes:Uv,deleteDoc:lv,deleteField:Pv,disableNetwork:PT,disablePersistentCacheIndexAutoCreation:Fv,doc:Vf,documentId:kT,enableIndexedDbPersistence:wT,enableMultiTabIndexedDbPersistence:AT,enableNetwork:ST,enablePersistentCacheIndexAutoCreation:Lv,endAt:WT,endBefore:QT,ensureFirestoreConfigured:fe,executeWrite:Tr,getAggregateFromServer:Qf,getCountFromServer:mv,getDoc:nv,getDocFromCache:rv,getDocFromServer:iv,getDocs:sv,getDocsFromCache:ov,getDocsFromServer:av,getFirestore:ET,getPersistentCacheIndexManager:Mv,increment:kv,initializeFirestore:vT,limit:zT,limitToLast:GT,loadBundle:VT,memoryEagerGarbageCollector:Iv,memoryLocalCache:vv,memoryLruGarbageCollector:Tv,namedQuery:DT,onSnapshot:dv,onSnapshotsInSync:fv,or:BT,orderBy:jT,persistentLocalCache:Ev,persistentMultipleTabManager:Rv,persistentSingleTabManager:Wf,query:FT,queryEqual:lu,refEqual:IT,runTransaction:Sv,serverTimestamp:Cv,setDoc:uv,setIndexConfiguration:Ov,setLogLevel:a_,snapshotEqual:tv,startAfter:KT,startAt:$T,sum:JT,terminate:CT,updateDoc:cv,vector:xv,waitForPendingWrites:bT,where:UT,writeBatch:Nv},Symbol.toStringTag,{value:"Module"}));var zv="firebase",Gv="10.14.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Dt(zv,Gv,"app");export{Tt as G,he as T,Qv as a,uv as b,sv as c,Vf as d,_T as e,Cv as f,nv as g,hv as h,kv as i,Nv as j,KT as k,zT as l,lv as m,$v as n,jT as o,Xv as p,FT as q,Kv as s,cv as u,UT as w};
