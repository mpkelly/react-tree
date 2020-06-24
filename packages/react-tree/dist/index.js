!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t(require("react"));else if("function"==typeof define&&define.amd)define(["react"],t);else{var n="object"==typeof exports?t(require("react")):t(e.React);for(var r in n)("object"==typeof exports?exports:e)[r]=n[r]}}(window,(function(e){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="./dist",n(n.s=7)}([function(e,t,n){"use strict";var r=this&&this.__rest||function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]])}return n};Object.defineProperty(t,"__esModule",{value:!0}),t.getSelectedNodeIds=t.toSubList=t.toList=t.findTreeNodeById=t.toTreeNodes=t.toTreeNode=t.toFlatNodes=t.toFlatNode=void 0,t.toFlatNode=(e,t)=>{const{children:n}=e,o=r(e,["children"]);return Object.assign(Object.assign({},o),{parentId:t})},t.toFlatNodes=(e,n)=>{let r=[];return e.forEach(e=>{r.push(t.toFlatNode(e,n)),r=r.concat(t.toFlatNodes(e.children,e.id))}),r},t.toTreeNode=e=>Object.assign(Object.assign({},e),{children:[]}),t.toTreeNodes=e=>{const n=Object.create(null);e.forEach(e=>{n[e.id]=t.toTreeNode(e)});const r=[];return e.forEach(e=>{void 0!==e.parentId&&n[e.parentId]?n[e.parentId].children.push(n[e.id]):r.push(n[e.id])}),r},t.findTreeNodeById=(e,n,r=null)=>{for(const o of n){if(o.id===e)return{node:o,parent:r};const n=t.findTreeNodeById(e,o.children,o);if(n)return n}return null},t.toList=(e,n=[])=>(e.forEach(e=>{n.push(t.toFlatNode(e,e.parentId)),e.children.forEach(e=>{n.push(t.toFlatNode(e,e.parentId)),t.toList(e.children,n)})}),n),t.toSubList=(e,n)=>{const r=t.toList(e);let o=r.length,i=0;return n.forEach(e=>{const t=r.findIndex(t=>t.id===e);t>=i&&(i=t),t<=o&&(o=t)}),r.slice(o,i+1)},t.getSelectedNodeIds=(e,n)=>{const r=t.toSubList(e,n).filter(e=>n.includes(e.id));return t.toTreeNodes(r).map(e=>e.id)}},function(t,n){t.exports=e},function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&r(t,e,n);return o(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.Tree=t.useTree=t.TreeContext=void 0;const d=i(n(1)),s=n(3),a=n(4),c=n(9),l=n(0),u=n(10),f=n(5);t.TreeContext=d.createContext(void 0),t.useTree=()=>d.useContext(t.TreeContext),t.Tree=e=>{const{nodes:n,renderElement:r,onChange:o,onPaste:i,onSelectionChange:p,sortFunction:g,disableDrag:b,schema:v,disableSelection:h,disableMultiSelection:y,disableCut:O,disableCopy:j,renderDragImage:m}=e,_=l.toTreeNodes(n),[T,S]=d.useState(),[D,I]=d.useState();g&&s.sortTree(_,g);const{selection:x,handleClick:E,handleSelectionChange:N}=c.useSelectionState(_,p,h,y),C=[...x.selected,T],P=e=>{o&&o([e],"expanded",!e.expanded)};u.useKeyboard(_,x,N,()=>{const e=x.selected[0];if(void 0!==e)if(x.cut.length){if(!o)return;const t=n.filter(e=>x.cut.includes(e.id));f.isMoveValid(n,t.map(e=>e.id),!0,e,v)&&o(t,"parentId",e)}else{if(!i)return;const t=n.filter(e=>x.copied.includes(e.id));if(f.isMoveValid(n,t.map(e=>e.id),!1,e,v)){const t=l.getSelectedNodeIds(_,x.copied).map(e=>{const t=l.findTreeNodeById(e,_);return null==t?void 0:t.node});i(t,e)}}},P,!!O,!!j);const w=d.useCallback((e,t=0)=>{const n=[];return e.forEach(e=>{const o=r(e,t);let i=[];(void 0===e.expanded||e.expanded)&&(i=w(e.children,t+1));const s={};e.id===D&&D!==e.parentId&&(s["data-rt-drop-valid"]=!0),n.push(d.default.createElement("div",Object.assign({"data-rt-element-wrapper":e.id},s),d.default.createElement(a.TreeElement,{node:e,depth:t},o),i))}),n},[D,r]),M=w(_),k={overId:D,handleDrag:S,handleOver:e=>{f.isMoveValid(n,C,!0,e,v)?I(e):I(void 0)},handleDrop:(e,t)=>{if(void 0!==t){const r=n.find(t=>String(t.id)===String(e));if(r&&String(r.parentId)!==String(t)&&o){const e=l.getSelectedNodeIds(_,[...x.selected,T]).map(e=>n.find(t=>t.id===e));o(e,"parentId",t)}}I(void 0),S(void 0)},handleToggleCollapse:P,disableDrag:!!b,selection:x,handleSelectionChange:N,handleClick:E,renderDragImage:m,dragId:T};return d.default.createElement(t.TreeContext.Provider,{value:k},d.default.createElement("div",{"data-rt-tree":!0},M))}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.sortTree=t.createAlphaNumericSort=void 0,t.createAlphaNumericSort=e=>(t,n)=>String(t[e]).localeCompare(String(n[e])),t.sortTree=(e,n)=>{e.sort(n),e.forEach(e=>t.sortTree(e.children,n))}},function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.TreeElement=void 0;const o=r(n(1)),i=n(8);t.TreeElement=e=>{const{node:t,children:n,dragDisabled:r}=e,{id:d}=t,s=i.useTreeElementState(e),a=!(t.dragDisabled||r);return o.default.createElement("div",Object.assign({key:d,draggable:a},s),n)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isMoveValid=void 0;const r=n(6),o=n(0);t.isMoveValid=(e,t,n=!0,i,d)=>{if(void 0===i)return!1;for(const s of t){if(s===i)return!1;const t=e.find(e=>e.id===s);if(t){if(t.dragDisabled)return!1;if(n&&t.parentId===i)return!1;const a=e.find(e=>e.id===i);if(a){const n=o.findTreeNodeById(s,o.toTreeNodes(e));if(n&&n.node){if(o.toFlatNodes(n.node.children).find(e=>e.id===i))return!1}if(!r.isDropAllowed(t,a,d))return!1}}}return!0}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isDropAllowed=void 0,t.isDropAllowed=(e,t,n)=>{if(!n)return!0;const r=n.rules?n.rules[t.type]:void 0;return(!r||0!==r.length)&&(!(r&&!r.includes(e.type))&&(!n.isDropAllowed||n.isDropAllowed(e,t)))}},function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__exportStar||function(e,t){for(var n in e)"default"===n||t.hasOwnProperty(n)||r(t,e,n)};Object.defineProperty(t,"__esModule",{value:!0}),o(n(3),t),o(n(0),t),o(n(2),t),o(n(5),t),o(n(4),t),o(n(6),t),o(n(11),t)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.useTreeElementState=void 0;const r=n(2);t.useTreeElementState=e=>{const{node:t,depth:n,dragDisabled:o}=e,{overId:i,dragId:d,handleDrag:s,handleOver:a,handleDrop:c,disableDrag:l,selection:u,handleClick:f,renderDragImage:p}=r.useTree(),g=u.selected.includes(t.id),b=u.cut.includes(t.id),v=u.copied.includes(t.id),h=u.selected.slice();void 0===d||u.selected.includes(d)||h.push(d);const y={"data-rt-element":t.id,"data-rt-type":t.type,"data-rt-depth":n,draggable:!o,onClick:e=>{f(e,t.id)}};return g&&(y["data-rt-selected"]=!0),b&&(y["data-rt-cut"]=!0),v&&(y["data-rt-copied"]=!0),l?{}:(o||t.dragDisabled||(y.onDragStart=e=>{e.dataTransfer.setData("text/rt-id",String(t.id)),e.dataTransfer.dropEffect="move",p&&e.dataTransfer.setDragImage(p(h),0,0),s(t.id)}),y.onDragOver=e=>{a(t.id),e.preventDefault(),e.dataTransfer.dropEffect="move"},y.onDragLeave=()=>{a(void 0)},y.onDrop=e=>{if(e.preventDefault(),void 0!==i&&i===t.id){const n=e.dataTransfer.getData("text/rt-id");c(n,t.id)}},y)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.useSelectionState=void 0;const r=n(1),o=n(0);t.useSelectionState=(e,t,n,i,d=[])=>{const[s,a]=r.useState({selected:d,cut:[],copied:[]}),c=e=>{let n=e;"function"==typeof e&&(n=e(s)),a(n),t&&t(n)},l=r.useCallback((t,r)=>{if(!n)if(i)c(e=>Object.assign(Object.assign({},e),{selected:[r]}));else if(t.shiftKey&&!s.selected.includes(r)){const t=[r,...s.selected],n=o.toSubList(e,t).map(e=>e.id);c(e=>Object.assign(Object.assign({},e),{selected:n}))}else if(t.metaKey)if(s.selected.includes(r)){const e=s.selected.filter(e=>e!==r);c(t=>Object.assign(Object.assign({},t),{selected:e}))}else{const e=[r,...s.selected];c(t=>Object.assign(Object.assign({},t),{selected:e}))}else c(e=>Object.assign(Object.assign({},e),{selected:[r]}))},[e,s,n,i]);return{selection:s,handleClick:l,handleSelectionChange:c}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.useKeyboard=void 0;const r=n(1),o=n(0);t.useKeyboard=(e,t,n,i,d,s,a)=>{const c=r.useRef(0),l=o.toList(e),u=(e,r)=>{const{selected:o}=t;if(o.length){const t=l.findIndex(e=>e.id===o[0]),i=l[t+r];i&&(e.shiftKey?(c.current>0&&-1===r||c.current<0&&1===r?n(e=>Object.assign(Object.assign({},e),{selected:o.slice(1)})):n(e=>Object.assign(Object.assign({},e),{selected:[i.id,...o]})),c.current+=r):(c.current=0,n(e=>Object.assign(Object.assign({},e),{selected:[i.id]}))))}},f=()=>{n(e=>Object.assign(Object.assign({},e),{copied:[],cut:[]}))},p=e=>{if(document.activeElement===document.body)switch(e.key){case"ArrowDown":u(e,1);break;case"ArrowUp":u(e,-1);break;case"x":(e=>{s||e.metaKey&&t.selected.length&&(e.preventDefault(),n(e=>Object.assign(Object.assign({},e),{copied:[],cut:t.selected.slice()})))})(e);break;case"c":(e=>{a||e.metaKey&&t.selected.length&&(e.preventDefault(),n(e=>Object.assign(Object.assign({},e),{cut:[],copied:t.selected.slice()})))})(e);break;case"v":(e=>{(e.metaKey&&t.cut.length||t.copied.length)&&(i(),f())})(e);break;case"Escape":f();break;case" ":(()=>{if(t.selected.length){const e=l.find(e=>e.id===t.selected[0]);e&&d(e)}})()}};r.useEffect(()=>(window.addEventListener("keydown",p),()=>{window.removeEventListener("keydown",p)}))}},function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.CollapseToggle=void 0;const o=r(n(1)),i=n(2);t.CollapseToggle=e=>{const{children:t,node:n}=e,r=!n.expanded,{handleToggleCollapse:d}=i.useTree();if(!d)throw Error("It looks like you're trying to use CollapseToggle outside of the <Tree/> scope");return o.default.createElement("div",{onClick:()=>d(n),"data-rt-collapse-toggle":!0,"aria-pressed":r,tabIndex:0,role:"button"},t)}}])}));