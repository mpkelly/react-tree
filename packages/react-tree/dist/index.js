!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t(require("react"));else if("function"==typeof define&&define.amd)define(["react"],t);else{var n="object"==typeof exports?t(require("react")):t(e.React);for(var r in n)("object"==typeof exports?exports:e)[r]=n[r]}}(window,(function(e){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="./dist",n(n.s=8)}([function(t,n){t.exports=e},function(e,t,n){"use strict";var r=this&&this.__rest||function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]])}return n};Object.defineProperty(t,"__esModule",{value:!0}),t.getSelectedNodeIds=t.toSubList=t.toList=t.findTreeNodeById=t.toTreeNodes=t.toTreeNode=t.toFlatNodes=t.toFlatNode=void 0,t.toFlatNode=(e,t)=>{const{children:n}=e,o=r(e,["children"]);return Object.assign(Object.assign({},o),{parentId:t})},t.toFlatNodes=(e,n)=>{let r=[];return e.forEach(e=>{r.push(t.toFlatNode(e,n)),r=r.concat(t.toFlatNodes(e.children,e.id))}),r},t.toTreeNode=e=>Object.assign(Object.assign({},e),{children:[]}),t.toTreeNodes=e=>{const n=Object.create(null);e.forEach(e=>{n[e.id]=t.toTreeNode(e)});const r=[];return e.forEach(e=>{void 0!==e.parentId&&n[e.parentId]?n[e.parentId].children.push(n[e.id]):r.push(n[e.id])}),r},t.findTreeNodeById=(e,n,r=null)=>{for(const o of n){if(o.id===e)return{node:o,parent:r};const n=t.findTreeNodeById(e,o.children,o);if(n)return n}return null},t.toList=(e,n=!0,r=[])=>(e.forEach(e=>{r.push(t.toFlatNode(e,e.parentId)),(n||void 0===e.expanded||e.expanded)&&t.toList(e.children,n,r)}),r),t.toSubList=(e,n)=>{const r=t.toList(e);let o=r.length,i=0;return n.forEach(e=>{const t=r.findIndex(t=>t.id===e);t>=i&&(i=t),t<=o&&(o=t)}),r.slice(o,i+1)},t.getSelectedNodeIds=(e,n)=>{const r=t.toSubList(e,n).filter(e=>n.includes(e.id));return t.toTreeNodes(r).map(e=>e.id)}},function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&r(t,e,n);return o(t,e),t},l=this&&this.__rest||function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]])}return n};Object.defineProperty(t,"__esModule",{value:!0}),t.Tree=t.useTree=t.TreeContext=void 0;const d=i(n(0)),s=n(3),c=n(4),a=n(11),u=n(1),f=n(12),p=n(5);t.TreeContext=d.createContext(void 0),t.useTree=()=>d.useContext(t.TreeContext);const h={padding:0},b={listStyle:"none"};t.Tree=d.forwardRef((e,n)=>{const{nodes:r,nameProperty:o,renderElement:i,onChange:l,onPaste:c,onSelectionChange:b,sortFunction:v,disableDrag:y,schema:m,disableSelection:O,disableMultiSelection:j,disableCut:w,disableCopy:S,renderDragImage:_,initialFocusedNodeId:T,labelledbyId:I}=e,x=u.toTreeNodes(r),[D,E]=d.useState(),[N,C]=d.useState();v?s.sortTree(x,v):s.sortTree(x,s.createAlphaNumericSort(o));const k=void 0!==T?[T]:[],{selection:M,handleClick:P,handleSelectionChange:L,handleBlur:B}=a.useSelectionState(x,b,O,j,k),V=[...M.selected,D],W=e=>{l&&l(e,"expanded",!e[0].expanded,M)};f.useKeyboard(x,M,o,L,()=>{const e=M.selected[0];if(void 0!==e)if(M.cut.length){if(!l)return;const t=r.filter(e=>M.cut.includes(e.id));p.isMoveValid(r,t.map(e=>e.id),!0,e,m)&&l(t,"parentId",e,M)}else{if(!c)return;const t=r.filter(e=>M.copied.includes(e.id));if(p.isMoveValid(r,t.map(e=>e.id),!1,e,m)){const t=u.getSelectedNodeIds(x,M.copied).map(e=>{const t=u.findTreeNodeById(e,x);return null==t?void 0:t.node});c(t,e)}}},W,!!w,!!S);const F=d.useCallback((e,t=0)=>{const n=[];return e.forEach((r,o)=>{const l=i(r,t);let s=[];const c=void 0===r.expanded||r.expanded;c&&(s=F(r.children,t+1));const a={};r.id===N&&N!==r.parentId&&(a["data-rt-drop-valid"]=!0),r.children.length&&(a["aria-expanded"]=c);const u=M.focused&&r.id===M.selected[0];n.push(d.default.createElement(g,Object.assign({node:r,index:o,depth:t,setsize:e.length,focused:u,nodeItem:l},a),s))}),n},[N,M,i]),A=F(x),H={overId:N,handleDrag:E,handleOver:e=>{p.isMoveValid(r,V,!0,e,m)?C(e):C(void 0)},handleDrop:(e,t)=>{if(void 0!==t){const n=r.find(t=>String(t.id)===String(e));if(n&&String(n.parentId)!==String(t)&&l){const e=u.getSelectedNodeIds(x,[...M.selected,D]).map(e=>r.find(t=>t.id===e));l(e,"parentId",t,M)}}C(void 0),E(void 0)},handleToggleCollapse:W,disableDrag:!!y,selection:M,handleSelectionChange:L,handleClick:P,renderDragImage:_,dragId:D};return d.default.createElement(t.TreeContext.Provider,{value:H},d.default.createElement("ul",{ref:n,"data-rt-tree":!0,role:"tree",style:h,onBlur:B,"aria-labelledby":I},A))});const g=d.memo(e=>{const{node:t,index:n,depth:r,setsize:o,focused:i,nodeItem:s,children:a}=e,u=l(e,["node","index","depth","setsize","focused","nodeItem","children"]);return d.default.createElement("li",Object.assign({"data-rt-element-wrapper":t.id,role:"treeitem","aria-level":r+1,"aria-setsize":o,"aria-posinset":n+1,tabIndex:i?0:-1},u,{style:b,key:t.id}),d.default.createElement(c.TreeElement,{node:t,depth:r},s),a&&d.default.createElement("ul",{role:"group",style:h},a))})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.sortTree=t.createAlphaNumericSort=void 0,t.createAlphaNumericSort=e=>(t,n)=>String(t[e]).localeCompare(String(n[e])),t.sortTree=(e,n)=>{e.sort(n),e.forEach(e=>t.sortTree(e.children,n))}},function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.TreeElement=void 0;const o=r(n(0)),i=n(10);t.TreeElement=e=>{const{node:t,children:n,dragDisabled:r}=e,{id:l}=t,d=i.useTreeElementState(e),s=!(t.dragDisabled||r);return o.default.createElement("div",Object.assign({key:l,draggable:s,role:"treeitem"},d),n)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isMoveValid=void 0;const r=n(6),o=n(1);t.isMoveValid=(e,t,n=!0,i,l)=>{if(void 0===i)return!1;for(const d of t){if(d===i)return!1;const t=e.find(e=>e.id===d);if(t){if(t.dragDisabled)return!1;if(n&&t.parentId===i)return!1;const s=e.find(e=>e.id===i);if(s){const n=o.findTreeNodeById(d,o.toTreeNodes(e));if(n&&n.node){if(o.toFlatNodes(n.node.children).find(e=>e.id===i))return!1}if(!r.isDropAllowed(t,s,l))return!1}}}return!0}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isDropAllowed=void 0,t.isDropAllowed=(e,t,n)=>{if(!n)return!0;const r=n.rules?n.rules[t.type]:void 0;return(!r||0!==r.length)&&(!(r&&!r.includes(e.type))&&(!n.isDropAllowed||n.isDropAllowed(e,t)))}},function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.ensureInView=t.disableScrollingUntilNextTick=t.scrollFocusedNodeIntoViewIfNecessary=t.DefaultScrollOptions=void 0;const o=r(n(14));t.DefaultScrollOptions={scrollMode:"if-needed",block:"nearest"},t.scrollFocusedNodeIntoViewIfNecessary=(e,n,r=t.DefaultScrollOptions)=>{const i=e.selected[0];if(e.focused&&void 0!==i){const e=document.querySelector(`[data-rt-element="${i}"]`);if(e){const t=document.querySelector(n);if(t){const{overflow:n}=t.style;t.style.overflow="hidden",setTimeout(()=>{t.style.overflow=n,e&&o.default(e,r)},1)}}}},t.disableScrollingUntilNextTick=e=>{const t=document.querySelector(e),{overflow:n}=t.style;t.style.overflow="hidden",setTimeout(()=>{t.style.overflow=n},1)},t.ensureInView=(e,n=t.DefaultScrollOptions)=>{const r=document.querySelector(`[data-rt-element="${e}"]`);r&&setTimeout(()=>{r&&o.default(r,n)},1)}},function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__exportStar||function(e,t){for(var n in e)"default"===n||t.hasOwnProperty(n)||r(t,e,n)};Object.defineProperty(t,"__esModule",{value:!0}),o(n(3),t),o(n(1),t),o(n(9),t),o(n(2),t),o(n(5),t),o(n(4),t),o(n(6),t),o(n(13),t),o(n(7),t)},function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&r(t,e,n);return o(t,e),t},l=this&&this.__rest||function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]])}return n};Object.defineProperty(t,"__esModule",{value:!0}),t.ScrollableTree=void 0;const d=i(n(0)),s=n(2),c=n(7);let a=1;t.ScrollableTree=e=>{const{id:t,style:n,scrollOptions:r,onChange:o,onSelectionChange:i}=e,u=l(e,["id","style","scrollOptions","onChange","onSelectionChange"]),{current:f}=d.useRef(t||"reacttree"+a++),p=Object.assign(Object.assign({},n||{}),{overflow:"auto"});return d.default.createElement("div",{id:f,style:p},d.default.createElement(s.Tree,Object.assign({onChange:(e,t,n,r)=>{o&&o(e,t,n,r),c.disableScrollingUntilNextTick("#"+f);const i=r.selected[0];c.ensureInView(i)},onSelectionChange:e=>{i&&i(e),c.scrollFocusedNodeIntoViewIfNecessary(e,"#"+f,r)}},u)))}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.useTreeElementState=void 0;const r=n(2);t.useTreeElementState=e=>{const{node:t,depth:n,dragDisabled:o}=e,{overId:i,dragId:l,handleDrag:d,handleOver:s,handleDrop:c,disableDrag:a,selection:u,handleClick:f,renderDragImage:p}=r.useTree(),h=u.selected.includes(t.id),b=u.cut.includes(t.id),g=u.copied.includes(t.id),v=u.selected.slice();void 0===l||u.selected.includes(l)||v.push(l);const y={"data-rt-element":t.id,"data-rt-type":t.type,"data-rt-depth":n,draggable:!o,onClick:e=>{f(e,t.id)}};return h&&(y["data-rt-selected"]=!0),b&&(y["data-rt-cut"]=!0),g&&(y["data-rt-copied"]=!0),a?{}:(o||t.dragDisabled||(y.onDragStart=e=>{e.dataTransfer.setData("text/rt-id",String(t.id)),e.dataTransfer.dropEffect="move",p&&e.dataTransfer.setDragImage(p(v),0,0),d(t.id)}),y.onDragOver=e=>{s(t.id),e.preventDefault(),e.dataTransfer.dropEffect="move"},y.onDragLeave=()=>{s(void 0)},y.onDrop=e=>{if(e.preventDefault(),void 0!==i&&i===t.id){const n=e.dataTransfer.getData("text/rt-id");c(n,t.id)}},y)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.useSelectionState=void 0;const r=n(0),o=n(1);t.useSelectionState=(e,t,n,i,l=[])=>{const[d,s]=r.useState({focused:!!l.length,selected:l,cut:[],copied:[]}),c=r.useCallback(e=>{let n=e;"function"==typeof e&&(n=e(d)),n.focused=!0,s(n),t&&t(n)},[d,s,t]),a=r.useCallback((t,r)=>{if(!n)if(i)c(e=>Object.assign(Object.assign({},e),{selected:[r]}));else if(t.shiftKey&&!d.selected.includes(r)){const t=[r,...d.selected],n=o.toSubList(e,t).map(e=>e.id);c(e=>Object.assign(Object.assign({},e),{selected:n}))}else if(t.metaKey)if(d.selected.includes(r)){const e=d.selected.filter(e=>e!==r);c(t=>Object.assign(Object.assign({},t),{selected:e}))}else{const e=[r,...d.selected];c(t=>Object.assign(Object.assign({},t),{selected:e}))}else c(e=>Object.assign(Object.assign({},e),{selected:[r]}))},[e,d,n,i,c]);return{selection:d,handleClick:a,handleSelectionChange:c,handleBlur:()=>{const e=Object.assign(Object.assign({},d),{focused:!1});s(e),t&&t(e)}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.useKeyboard=void 0;const r=n(0),o=n(1);t.useKeyboard=(e,t,n,i,l,d,s,c)=>{const a=r.useRef(0),u=o.toList(e,!1),f=e=>{a.current=0,i(t=>Object.assign(Object.assign({},t),{selected:[e]}))},p=(e,n)=>{const{selected:r}=t;if(r.length){const t=u.findIndex(e=>e.id===r[0]),o=u[t+n];o&&(e.shiftKey?(a.current>0&&-1===n||a.current<0&&1===n?i(e=>Object.assign(Object.assign({},e),{selected:r.slice(1)})):i(e=>Object.assign(Object.assign({},e),{selected:[o.id,...r]})),a.current+=n):f(o.id))}},h=(n,r)=>{const{selected:i}=t;if(i.length){const t=o.findTreeNodeById(i[0],e),l=null==t?void 0:t.node;l&&(-1===r?l.children.length&&l.expanded?d([l]):p(n,-1):l.children.length&&!l.expanded?d([l]):p(n,1))}},b=()=>{i(e=>Object.assign(Object.assign({},e),{copied:[],cut:[]}))},g=e=>{const r=u.findIndex(e=>e.id===t.selected[0])+1,o=e.toLowerCase();let l=u.slice(r).find(e=>String(e[n]).toLowerCase().startsWith(o));l||(l=u.slice(0,r).find(e=>String(e[n]).toLowerCase().startsWith(o))),l&&i(e=>Object.assign(Object.assign({},e),{selected:[l.id]}))},v=n=>{if(t.focused)switch(n.key){case"ArrowDown":p(n,1);break;case"ArrowUp":p(n,-1);break;case"ArrowLeft":h(n,-1);break;case"ArrowRight":h(n,1);break;case"Home":f(u[0].id);break;case"End":f(u[u.length-1].id);break;case"Escape":b();break;case" ":(()=>{if(t.selected.length){const e=u.find(e=>e.id===t.selected[0]);e&&d([e])}})();break;case"*":(()=>{const n=o.findTreeNodeById(t.selected[0],e);if(n){const{node:e,parent:t}=n;if(t){const e=t.children.filter(e=>e.children.length&&!e.expanded);e.length&&d(e)}else e&&!(null==e?void 0:e.expanded)&&d([e])}})();break;default:if(n.metaKey)switch(n.key){case"x":(e=>{s||t.selected.length&&(e.preventDefault(),i(e=>Object.assign(Object.assign({},e),{copied:[],cut:t.selected.slice()})))})(n);break;case"c":(e=>{c||t.selected.length&&(e.preventDefault(),i(e=>Object.assign(Object.assign({},e),{cut:[],copied:t.selected.slice()})))})(n);break;case"v":(e=>{(t.cut.length||t.copied.length)&&(e.preventDefault(),l(),b())})(n);break;default:g(n.key)}else g(n.key)}};r.useEffect(()=>(window.addEventListener("keydown",v),()=>{window.removeEventListener("keydown",v)}))}},function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.CollapseToggle=void 0;const o=r(n(0)),i=n(2);t.CollapseToggle=e=>{const{children:t,node:n}=e,r=!n.expanded,{handleToggleCollapse:l}=i.useTree();return o.default.createElement("div",{onClick:()=>l([n]),"data-rt-collapse-toggle":!0,"aria-pressed":r,tabIndex:0,role:"button"},t)}},function(e,t,n){"use strict";function r(e){return null!=e&&"object"==typeof e&&1===e.nodeType}function o(e,t){return(!t||"hidden"!==e)&&("visible"!==e&&"clip"!==e)}function i(e,t){if(e.clientHeight<e.scrollHeight||e.clientWidth<e.scrollWidth){var n=getComputedStyle(e,null);return o(n.overflowY,t)||o(n.overflowX,t)||function(e){var t=function(e){if(!e.ownerDocument||!e.ownerDocument.defaultView)return null;try{return e.ownerDocument.defaultView.frameElement}catch(e){return null}}(e);return!!t&&(t.clientHeight<e.scrollHeight||t.clientWidth<e.scrollWidth)}(e)}return!1}function l(e,t,n,r,o,i,l,d){return i<e&&l>t||i>e&&l<t?0:i<=e&&d<=n||l>=t&&d>=n?i-e-r:l>t&&d<n||i<e&&d>n?l-t+o:0}n.r(t);var d=function(e,t){var n=t.scrollMode,o=t.block,d=t.inline,s=t.boundary,c=t.skipOverflowHiddenElements,a="function"==typeof s?s:function(e){return e!==s};if(!r(e))throw new TypeError("Invalid target");for(var u=document.scrollingElement||document.documentElement,f=[],p=e;r(p)&&a(p);){if((p=p.parentNode)===u){f.push(p);break}p===document.body&&i(p)&&!i(document.documentElement)||i(p,c)&&f.push(p)}for(var h=window.visualViewport?visualViewport.width:innerWidth,b=window.visualViewport?visualViewport.height:innerHeight,g=window.scrollX||pageXOffset,v=window.scrollY||pageYOffset,y=e.getBoundingClientRect(),m=y.height,O=y.width,j=y.top,w=y.right,S=y.bottom,_=y.left,T="start"===o||"nearest"===o?j:"end"===o?S:j+m/2,I="center"===d?_+O/2:"end"===d?w:_,x=[],D=0;D<f.length;D++){var E=f[D],N=E.getBoundingClientRect(),C=N.height,k=N.width,M=N.top,P=N.right,L=N.bottom,B=N.left;if("if-needed"===n&&j>=0&&_>=0&&S<=b&&w<=h&&j>=M&&S<=L&&_>=B&&w<=P)return x;var V=getComputedStyle(E),W=parseInt(V.borderLeftWidth,10),F=parseInt(V.borderTopWidth,10),A=parseInt(V.borderRightWidth,10),H=parseInt(V.borderBottomWidth,10),R=0,K=0,q="offsetWidth"in E?E.offsetWidth-E.clientWidth-W-A:0,z="offsetHeight"in E?E.offsetHeight-E.clientHeight-F-H:0;if(u===E)R="start"===o?T:"end"===o?T-b:"nearest"===o?l(v,v+b,b,F,H,v+T,v+T+m,m):T-b/2,K="start"===d?I:"center"===d?I-h/2:"end"===d?I-h:l(g,g+h,h,W,A,g+I,g+I+O,O),R=Math.max(0,R+v),K=Math.max(0,K+g);else{R="start"===o?T-M-F:"end"===o?T-L+H+z:"nearest"===o?l(M,L,C,F,H+z,T,T+m,m):T-(M+C/2)+z/2,K="start"===d?I-B-W:"center"===d?I-(B+k/2)+q/2:"end"===d?I-P+A+q:l(B,P,k,W,A+q,I,I+O,O);var U=E.scrollLeft,X=E.scrollTop;T+=X-(R=Math.max(0,Math.min(X+R,E.scrollHeight-C+z))),I+=U-(K=Math.max(0,Math.min(U+K,E.scrollWidth-k+q)))}x.push({el:E,top:R,left:K})}return x};function s(e){return e===Object(e)&&0!==Object.keys(e).length}t.default=function(e,t){var n=!e.ownerDocument.documentElement.contains(e);if(s(t)&&"function"==typeof t.behavior)return t.behavior(n?[]:d(e,t));if(!n){var r=function(e){return!1===e?{block:"end",inline:"nearest"}:s(e)?e:{block:"start",inline:"nearest"}}(t);return function(e,t){void 0===t&&(t="auto");var n="scrollBehavior"in document.body.style;e.forEach((function(e){var r=e.el,o=e.top,i=e.left;r.scroll&&n?r.scroll({top:o,left:i,behavior:t}):(r.scrollTop=o,r.scrollLeft=i)}))}(d(e,r),r.behavior)}}}])}));