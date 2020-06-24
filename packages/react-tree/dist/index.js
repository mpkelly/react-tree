!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t(require("react"));else if("function"==typeof define&&define.amd)define(["react"],t);else{var r="object"==typeof exports?t(require("react")):t(e.React);for(var n in r)("object"==typeof exports?exports:e)[n]=r[n]}}(window,(function(e){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="./dist",r(r.s=7)}([function(e,t,r){"use strict";var n=this&&this.__rest||function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(n=Object.getOwnPropertySymbols(e);o<n.length;o++)t.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(e,n[o])&&(r[n[o]]=e[n[o]])}return r};Object.defineProperty(t,"__esModule",{value:!0}),t.getSelectedNodeIds=t.toSubList=t.toList=t.findTreeNodeById=t.toTreeNodes=t.toTreeNode=t.toFlatNodes=t.toFlatNode=void 0,t.toFlatNode=(e,t)=>{const{children:r}=e,o=n(e,["children"]);return Object.assign(Object.assign({},o),{parentId:t})},t.toFlatNodes=(e,r)=>{let n=[];return e.forEach(e=>{n.push(t.toFlatNode(e,r)),n=n.concat(t.toFlatNodes(e.children,e.id))}),n},t.toTreeNode=e=>Object.assign(Object.assign({},e),{children:[]}),t.toTreeNodes=e=>{const r=Object.create(null);e.forEach(e=>{r[e.id]=t.toTreeNode(e)});const n=[];return e.forEach(e=>{void 0!==e.parentId&&r[e.parentId]?r[e.parentId].children.push(r[e.id]):n.push(r[e.id])}),n},t.findTreeNodeById=(e,r,n=null)=>{for(const o of r){if(o.id===e)return{node:o,parent:n};const r=t.findTreeNodeById(e,o.children,o);if(r)return r}return null},t.toList=(e,r=[])=>(e.forEach(e=>{r.push(t.toFlatNode(e,e.parentId)),e.children.forEach(e=>{r.push(t.toFlatNode(e,e.parentId)),t.toList(e.children,r)})}),r),t.toSubList=(e,r)=>{const n=t.toList(e);let o=n.length,i=0;return r.forEach(e=>{const t=n.findIndex(t=>t.id===e);t>=i&&(i=t),t<=o&&(o=t)}),n.slice(o,i+1)},t.getSelectedNodeIds=(e,r)=>{const n=t.toSubList(e,r).filter(e=>r.includes(e.id));return t.toTreeNodes(n).map(e=>e.id)}},function(t,r){t.exports=e},function(e,t,r){"use strict";var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&n(t,e,r);return o(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.Tree=t.useTree=t.TreeContext=void 0;const d=i(r(1)),s=r(3),c=r(4),a=r(9),l=r(0),u=r(10),f=r(5);t.TreeContext=d.createContext(void 0),t.useTree=()=>d.useContext(t.TreeContext),t.Tree=e=>{const{nodes:r,renderElement:n,onChange:o,onPaste:i,sortFunction:p,disableDrag:b,schema:g,disableSelection:v,disableMultiSelection:h,disableCut:O,disableCopy:y,renderDragImage:j}=e,m=l.toTreeNodes(r),[_,T]=d.useState(),[S,D]=d.useState();p&&s.sortTree(m,p);const{selection:x,handleClick:I,setSelection:E}=a.useSelectionState(m,v,h),N=[...x.selected,_],P=e=>{o&&o([e],"expanded",!e.expanded)};u.useKeyboard(m,x,E,()=>{const e=x.selected[0];if(void 0!==e)if(x.cut.length){if(!o)return;const t=r.filter(e=>x.cut.includes(e.id));f.isMoveValid(r,t.map(e=>e.id),e,g)&&o(t,"parentId",e)}else{if(!i)return;const t=r.filter(e=>x.copied.includes(e.id));f.isMoveValid(r,t.map(e=>e.id),e,g)&&i(t,e)}},P,!!O,!!y);const w=d.useCallback((e,t=0)=>{const r=[];return e.forEach(e=>{const o=n(e,t);let i=[];(void 0===e.expanded||e.expanded)&&(i=w(e.children,t+1));const s={};e.id===S&&S!==e.parentId&&(s["data-rt-drop-valid"]=!0),r.push(d.default.createElement("div",Object.assign({"data-rt-element-wrapper":e.id},s),d.default.createElement(c.TreeElement,{node:e,depth:t},o),i))}),r},[S,n]),M=w(m),C={overId:S,handleDrag:T,handleOver:e=>{f.isMoveValid(r,N,e,g)?D(e):D(void 0)},handleDrop:(e,t)=>{if(void 0!==t){const n=r.find(t=>String(t.id)===String(e));if(n&&String(n.parentId)!==String(t)&&o){const e=l.getSelectedNodeIds(m,[...x.selected,_]).map(e=>r.find(t=>t.id===e));o(e,"parentId",t)}}D(void 0),T(void 0)},handleToggleCollapse:P,disableDrag:!!b,selection:x,setSelection:E,handleClick:I,renderDragImage:j,dragId:_};return d.default.createElement(t.TreeContext.Provider,{value:C},d.default.createElement("div",{"data-rt-tree":!0},M))}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.sortTree=t.createAlphaNumericSort=void 0,t.createAlphaNumericSort=e=>(t,r)=>String(t[e]).localeCompare(String(r[e])),t.sortTree=(e,r)=>{e.sort(r),e.forEach(e=>t.sortTree(e.children,r))}},function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.TreeElement=void 0;const o=n(r(1)),i=r(8);t.TreeElement=e=>{const{node:t,children:r,dragDisabled:n}=e,{id:d}=t,s=i.useTreeElementState(e),c=!(t.dragDisabled||n);return o.default.createElement("div",Object.assign({key:d,draggable:c},s),r)}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isMoveValid=void 0;const n=r(6),o=r(0);t.isMoveValid=(e,t,r,i)=>{if(void 0===r)return!1;for(const d of t){if(d===r)return!1;const t=e.find(e=>e.id===d);if(t){if(t.dragDisabled)return!1;if(t.parentId===r)return!1;const s=e.find(e=>e.id===r);if(s){const c=o.findTreeNodeById(d,o.toTreeNodes(e));if(c&&c.node){if(o.toFlatNodes(c.node.children).find(e=>e.id===r))return!1}if(!n.isDropAllowed(t,s,i))return!1}}}return!0}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isDropAllowed=void 0,t.isDropAllowed=(e,t,r)=>{if(!r)return!0;const n=r.rules?r.rules[t.type]:void 0;return(!n||0!==n.length)&&(!(n&&!n.includes(e.type))&&(!r.isDropAllowed||r.isDropAllowed(e,t)))}},function(e,t,r){"use strict";var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),o=this&&this.__exportStar||function(e,t){for(var r in e)"default"===r||t.hasOwnProperty(r)||n(t,e,r)};Object.defineProperty(t,"__esModule",{value:!0}),o(r(3),t),o(r(0),t),o(r(2),t),o(r(5),t),o(r(4),t),o(r(6),t),o(r(11),t)},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.useTreeElementState=void 0;const n=r(2);t.useTreeElementState=e=>{const{node:t,depth:r,dragDisabled:o}=e,{overId:i,dragId:d,handleDrag:s,handleOver:c,handleDrop:a,disableDrag:l,selection:u,handleClick:f,renderDragImage:p}=n.useTree(),b=u.selected.includes(t.id),g=u.cut.includes(t.id),v=u.copied.includes(t.id),h=u.selected.slice();void 0===d||u.selected.includes(d)||h.push(d);const O={"data-rt-element":t.id,"data-rt-type":t.type,"data-rt-depth":r,draggable:!o,onClick:e=>{f(e,t.id)}};return b&&(O["data-rt-selected"]=!0),g&&(O["data-rt-cut"]=!0),v&&(O["data-rt-copied"]=!0),l?{}:(o||t.dragDisabled||(O.onDragStart=e=>{e.dataTransfer.setData("text/rt-id",String(t.id)),e.dataTransfer.dropEffect="move",p&&e.dataTransfer.setDragImage(p(h),0,0),s(t.id)}),O.onDragOver=e=>{c(t.id),e.preventDefault(),e.dataTransfer.dropEffect="move"},O.onDragLeave=()=>{c(void 0)},O.onDrop=e=>{if(e.preventDefault(),void 0!==i&&i===t.id){const r=e.dataTransfer.getData("text/rt-id");a(r,t.id)}},O)}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.useSelectionState=void 0;const n=r(1),o=r(0);t.useSelectionState=(e,t,r,i=[])=>{const[d,s]=n.useState({selected:i,cut:[],copied:[]}),c=n.useCallback((n,i)=>{if(!t)if(r)s(e=>Object.assign(Object.assign({},e),{selected:[i]}));else if(n.shiftKey&&!d.selected.includes(i)){const t=[i,...d.selected],r=o.toSubList(e,t).map(e=>e.id);s(e=>Object.assign(Object.assign({},e),{selected:r}))}else if(n.metaKey)if(d.selected.includes(i)){const e=d.selected.filter(e=>e!==i);s(t=>Object.assign(Object.assign({},t),{selected:e}))}else{const e=[i,...d.selected];s(t=>Object.assign(Object.assign({},t),{selected:e}))}else s(e=>Object.assign(Object.assign({},e),{selected:[i]}))},[e,d,t,r]);return{selection:d,handleClick:c,setSelection:s}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.useKeyboard=void 0;const n=r(1),o=r(0);t.useKeyboard=(e,t,r,i,d,s,c)=>{const a=n.useRef(0),l=o.toList(e),u=(e,n)=>{const{selected:o}=t;if(o.length){const t=l.findIndex(e=>e.id===o[0]),i=l[t+n];i&&(e.shiftKey?(a.current>0&&-1===n||a.current<0&&1===n?r(e=>Object.assign(Object.assign({},e),{selected:o.slice(1)})):r(e=>Object.assign(Object.assign({},e),{selected:[i.id,...o]})),a.current+=n):(a.current=0,r(e=>Object.assign(Object.assign({},e),{selected:[i.id]}))))}},f=()=>{r(e=>Object.assign(Object.assign({},e),{copied:[],cut:[]}))},p=e=>{if(document.activeElement===document.body)switch(e.key){case"ArrowDown":u(e,1);break;case"ArrowUp":u(e,-1);break;case"x":(e=>{s||e.metaKey&&t.selected.length&&(e.preventDefault(),r(e=>Object.assign(Object.assign({},e),{copied:[],cut:t.selected.slice()})))})(e);break;case"c":(e=>{c||e.metaKey&&t.selected.length&&(e.preventDefault(),r(e=>Object.assign(Object.assign({},e),{cut:[],copied:t.selected.slice()})))})(e);break;case"v":(e=>{(e.metaKey&&t.cut.length||t.copied.length)&&(i(),f())})(e);break;case"Escape":f();break;case" ":(()=>{if(t.selected.length){const e=l.find(e=>e.id===t.selected[0]);e&&d(e)}})()}};n.useEffect(()=>(window.addEventListener("keydown",p),()=>{window.removeEventListener("keydown",p)}))}},function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.CollapseToggle=void 0;const o=n(r(1)),i=r(2);t.CollapseToggle=e=>{const{children:t,node:r}=e,n=!r.expanded,{handleToggleCollapse:d}=i.useTree();if(!d)throw Error("It looks like you're trying to use CollapseToggle outside of the <Tree/> scope");return o.default.createElement("div",{"data-rt-collapse-toggle":!0,"data-rt-collapsed":n,onClick:()=>d(r),tabIndex:0,role:"button"},t)}}])}));