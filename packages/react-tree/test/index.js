!function(e){var t={};function n(r){if(t[r])return t[r].exports;var d=t[r]={i:r,l:!1,exports:{}};return e[r].call(d.exports,d,d.exports,n),d.l=!0,d.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var d in e)n.d(r,d,function(t){return e[t]}.bind(null,d));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="./test",n(n.s=7)}([function(e,t){e.exports=React},function(e,t,n){"use strict";var r=this&&this.__rest||function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var d=0;for(r=Object.getOwnPropertySymbols(e);d<r.length;d++)t.indexOf(r[d])<0&&Object.prototype.propertyIsEnumerable.call(e,r[d])&&(n[r[d]]=e[r[d]])}return n};Object.defineProperty(t,"__esModule",{value:!0}),t.getSelectedNodeIds=t.toSubList=t.toList=t.findTreeNodeById=t.toTreeNodes=t.toTreeNode=t.toFlatNodes=t.toFlatNode=void 0,t.toFlatNode=(e,t)=>{const{children:n}=e,d=r(e,["children"]);return Object.assign(Object.assign({},d),{parentId:t})},t.toFlatNodes=(e,n)=>{let r=[];return e.forEach(e=>{r.push(t.toFlatNode(e,n)),r=r.concat(t.toFlatNodes(e.children,e.id))}),r},t.toTreeNode=e=>Object.assign(Object.assign({},e),{children:[]}),t.toTreeNodes=e=>{const n=Object.create(null);e.forEach(e=>{n[e.id]=t.toTreeNode(e)});const r=[];return e.forEach(e=>{void 0!==e.parentId&&n[e.parentId]?n[e.parentId].children.push(n[e.id]):r.push(n[e.id])}),r},t.findTreeNodeById=(e,n,r=null)=>{for(const d of n){if(d.id===e)return{node:d,parent:r};const n=t.findTreeNodeById(e,d.children,d);if(n)return n}return null},t.toList=(e,n=[])=>(e.forEach(e=>{n.push(t.toFlatNode(e,e.parentId)),e.children.forEach(e=>{n.push(t.toFlatNode(e,e.parentId)),t.toList(e.children,n)})}),n),t.toSubList=(e,n)=>{const r=t.toList(e);let d=r.length,o=0;return n.forEach(e=>{const t=r.findIndex(t=>t.id===e);t>=o&&(o=t),t<=d&&(d=t)}),r.slice(d,o+1)},t.getSelectedNodeIds=(e,n)=>{const r=t.toSubList(e,n).filter(e=>n.includes(e.id));return t.toTreeNodes(r).map(e=>e.id)}},function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),d=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&r(t,e,n);return d(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.Tree=t.useTree=t.TreeContext=void 0;const i=o(n(0)),a=n(3),l=n(4),s=n(11),c=n(1),u=n(12),f=n(5);t.TreeContext=i.createContext(void 0),t.useTree=()=>i.useContext(t.TreeContext),t.Tree=e=>{const{nodes:n,renderElement:r,onChange:d,onPaste:o,onSelectionChange:p,sortFunction:g,disableDrag:h,schema:b,disableSelection:v,disableMultiSelection:m,disableCut:O,disableCopy:y,renderDragImage:j}=e,_=c.toTreeNodes(n),[E,S]=i.useState(),[T,w]=i.useState();g&&a.sortTree(_,g);const{selection:I,handleClick:D,handleSelectionChange:x}=s.useSelectionState(_,p,v,m),C=[...I.selected,E],F=e=>{d&&d([e],"expanded",!e.expanded)};u.useKeyboard(_,I,x,()=>{const e=I.selected[0];if(void 0!==e)if(I.cut.length){if(!d)return;const t=n.filter(e=>I.cut.includes(e.id));f.isMoveValid(n,t.map(e=>e.id),!0,e,b)&&d(t,"parentId",e)}else{if(!o)return;const t=n.filter(e=>I.copied.includes(e.id));if(f.isMoveValid(n,t.map(e=>e.id),!1,e,b)){const t=c.getSelectedNodeIds(_,I.copied).map(e=>{const t=c.findTreeNodeById(e,_);return null==t?void 0:t.node});o(t,e)}}},F,!!O,!!y);const M=i.useCallback((e,t=0)=>{const n=[];return e.forEach(e=>{const d=r(e,t);let o=[];(void 0===e.expanded||e.expanded)&&(o=M(e.children,t+1));const a={};e.id===T&&T!==e.parentId&&(a["data-rt-drop-valid"]=!0),n.push(i.default.createElement("div",Object.assign({"data-rt-element-wrapper":e.id},a),i.default.createElement(l.TreeElement,{node:e,depth:t},d),o))}),n},[T,r]),N=M(_),P={overId:T,handleDrag:S,handleOver:e=>{f.isMoveValid(n,C,!0,e,b)?w(e):w(void 0)},handleDrop:(e,t)=>{if(void 0!==t){const r=n.find(t=>String(t.id)===String(e));if(r&&String(r.parentId)!==String(t)&&d){const e=c.getSelectedNodeIds(_,[...I.selected,E]).map(e=>n.find(t=>t.id===e));d(e,"parentId",t)}}w(void 0),S(void 0)},handleToggleCollapse:F,disableDrag:!!h,selection:I,handleSelectionChange:x,handleClick:D,renderDragImage:j,dragId:E};return i.default.createElement(t.TreeContext.Provider,{value:P},i.default.createElement("div",{"data-rt-tree":!0},N))}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.sortTree=t.createAlphaNumericSort=void 0,t.createAlphaNumericSort=e=>(t,n)=>String(t[e]).localeCompare(String(n[e])),t.sortTree=(e,n)=>{e.sort(n),e.forEach(e=>t.sortTree(e.children,n))}},function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.TreeElement=void 0;const d=r(n(0)),o=n(10);t.TreeElement=e=>{const{node:t,children:n,dragDisabled:r}=e,{id:i}=t,a=o.useTreeElementState(e),l=!(t.dragDisabled||r);return d.default.createElement("div",Object.assign({key:i,draggable:l},a),n)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isMoveValid=void 0;const r=n(6),d=n(1);t.isMoveValid=(e,t,n=!0,o,i)=>{if(void 0===o)return!1;for(const a of t){if(a===o)return!1;const t=e.find(e=>e.id===a);if(t){if(t.dragDisabled)return!1;if(n&&t.parentId===o)return!1;const l=e.find(e=>e.id===o);if(l){const n=d.findTreeNodeById(a,d.toTreeNodes(e));if(n&&n.node){if(d.toFlatNodes(n.node.children).find(e=>e.id===o))return!1}if(!r.isDropAllowed(t,l,i))return!1}}}return!0}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isDropAllowed=void 0,t.isDropAllowed=(e,t,n)=>{if(!n)return!0;const r=n.rules?n.rules[t.type]:void 0;return(!r||0!==r.length)&&(!(r&&!r.includes(e.type))&&(!n.isDropAllowed||n.isDropAllowed(e,t)))}},function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),d=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&r(t,e,n);return d(t,e),t};Object.defineProperty(t,"__esModule",{value:!0});const i=o(n(0)),a=n(8),l=n(9);var s;!function(e){e[e.File=0]="File",e[e.Folder=1]="Folder"}(s||(s={}));const c={rules:{[s.Folder]:[s.Folder,s.File],[s.File]:[]}};let u=0;const f=[{id:u++,expanded:!0,type:s.Folder,name:"Folder one"},{id:u++,type:s.File,parentId:0,name:"File one"},{id:u++,type:s.File,parentId:0,name:"File two"},{id:u++,expanded:!0,parentId:0,type:s.Folder,name:"Folder two"}],p=e=>i.default.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24","data-arrow":!0},e),i.default.createElement("path",{d:"M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z",fill:"currentColor"})),g=()=>i.default.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24","data-folder":!0},i.default.createElement("path",{d:"M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z",fill:"currentColor"})),h=()=>i.default.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24","data-file":!0},i.default.createElement("path",{d:"M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z",fill:"currentColor"})),b=e=>{const{node:t,icon:n,depth:r}=e;let d=null;return t.type===s.Folder&&(d=i.default.createElement(l.CollapseToggle,{node:t},i.default.createElement(p,null))),i.default.createElement("div",{"data-tree-element":!0,"data-id":t.id,style:{paddingLeft:16*r}},d," ",n," ",i.default.createElement("span",{"data-element-name":!0},t.name))};a.render(i.default.createElement(()=>{const[e,t]=i.useState(f),[n,r]=i.useState({selected:[],cut:[],copied:[]});return i.default.createElement(i.Fragment,null,i.default.createElement(l.Tree,{nodes:e,schema:c,renderElement:(e,t)=>{switch(e.type){case s.Folder:return i.default.createElement(b,{node:e,depth:t,icon:i.default.createElement(g,null)});case s.File:return i.default.createElement(b,{node:e,depth:t,icon:i.default.createElement(h,null)})}throw Error("Node not handled: "+e.type)},sortFunction:l.createAlphaNumericSort("name"),onChange:(n,r,d)=>{const o=e.slice();n.forEach(e=>{const t=o.find(t=>t.id==e.id),n=Object.assign(Object.assign({},t),{[r]:d});o.splice(o.indexOf(t),1,n)}),t(o)},onPaste:(e,n)=>{const r=(e,t)=>{e.forEach(e=>{e.id=u++,e.parentId=t,r(e.children,e.id)})};r(e,n),t(t=>t.concat(l.toFlatNodes(e,n)))},onSelectionChange:r}),i.default.createElement("div",{id:"selected"},n.selected.length))},null),document.getElementById("app"))},function(e,t){e.exports=ReactDOM},function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),d=this&&this.__exportStar||function(e,t){for(var n in e)"default"===n||t.hasOwnProperty(n)||r(t,e,n)};Object.defineProperty(t,"__esModule",{value:!0}),d(n(3),t),d(n(1),t),d(n(2),t),d(n(5),t),d(n(4),t),d(n(6),t),d(n(13),t)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.useTreeElementState=void 0;const r=n(2);t.useTreeElementState=e=>{const{node:t,depth:n,dragDisabled:d}=e,{overId:o,dragId:i,handleDrag:a,handleOver:l,handleDrop:s,disableDrag:c,selection:u,handleClick:f,renderDragImage:p}=r.useTree(),g=u.selected.includes(t.id),h=u.cut.includes(t.id),b=u.copied.includes(t.id),v=u.selected.slice();void 0===i||u.selected.includes(i)||v.push(i);const m={"data-rt-element":t.id,"data-rt-type":t.type,"data-rt-depth":n,draggable:!d,onClick:e=>{f(e,t.id)}};return g&&(m["data-rt-selected"]=!0),h&&(m["data-rt-cut"]=!0),b&&(m["data-rt-copied"]=!0),c?{}:(d||t.dragDisabled||(m.onDragStart=e=>{e.dataTransfer.setData("text/rt-id",String(t.id)),e.dataTransfer.dropEffect="move",p&&e.dataTransfer.setDragImage(p(v),0,0),a(t.id)}),m.onDragOver=e=>{l(t.id),e.preventDefault(),e.dataTransfer.dropEffect="move"},m.onDragLeave=()=>{l(void 0)},m.onDrop=e=>{if(e.preventDefault(),void 0!==o&&o===t.id){const n=e.dataTransfer.getData("text/rt-id");s(n,t.id)}},m)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.useSelectionState=void 0;const r=n(0),d=n(1);t.useSelectionState=(e,t,n,o,i=[])=>{const[a,l]=r.useState({selected:i,cut:[],copied:[]}),s=e=>{let n=e;"function"==typeof e&&(n=e(a)),l(n),t&&t(n)},c=r.useCallback((t,r)=>{if(!n)if(o)s(e=>Object.assign(Object.assign({},e),{selected:[r]}));else if(t.shiftKey&&!a.selected.includes(r)){const t=[r,...a.selected],n=d.toSubList(e,t).map(e=>e.id);s(e=>Object.assign(Object.assign({},e),{selected:n}))}else if(t.metaKey)if(a.selected.includes(r)){const e=a.selected.filter(e=>e!==r);s(t=>Object.assign(Object.assign({},t),{selected:e}))}else{const e=[r,...a.selected];s(t=>Object.assign(Object.assign({},t),{selected:e}))}else s(e=>Object.assign(Object.assign({},e),{selected:[r]}))},[e,a,n,o]);return{selection:a,handleClick:c,handleSelectionChange:s}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.useKeyboard=void 0;const r=n(0),d=n(1);t.useKeyboard=(e,t,n,o,i,a,l)=>{const s=r.useRef(0),c=d.toList(e),u=(e,r)=>{const{selected:d}=t;if(d.length){const t=c.findIndex(e=>e.id===d[0]),o=c[t+r];o&&(e.shiftKey?(s.current>0&&-1===r||s.current<0&&1===r?n(e=>Object.assign(Object.assign({},e),{selected:d.slice(1)})):n(e=>Object.assign(Object.assign({},e),{selected:[o.id,...d]})),s.current+=r):(s.current=0,n(e=>Object.assign(Object.assign({},e),{selected:[o.id]}))))}},f=()=>{n(e=>Object.assign(Object.assign({},e),{copied:[],cut:[]}))},p=e=>{if(document.activeElement===document.body)switch(e.key){case"ArrowDown":u(e,1);break;case"ArrowUp":u(e,-1);break;case"x":(e=>{a||e.metaKey&&t.selected.length&&(e.preventDefault(),n(e=>Object.assign(Object.assign({},e),{copied:[],cut:t.selected.slice()})))})(e);break;case"c":(e=>{l||e.metaKey&&t.selected.length&&(e.preventDefault(),n(e=>Object.assign(Object.assign({},e),{cut:[],copied:t.selected.slice()})))})(e);break;case"v":(e=>{(e.metaKey&&t.cut.length||t.copied.length)&&(o(),f())})(e);break;case"Escape":f();break;case" ":(()=>{if(t.selected.length){const e=c.find(e=>e.id===t.selected[0]);e&&i(e)}})()}};r.useEffect(()=>(window.addEventListener("keydown",p),()=>{window.removeEventListener("keydown",p)}))}},function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.CollapseToggle=void 0;const d=r(n(0)),o=n(2);t.CollapseToggle=e=>{const{children:t,node:n}=e,r=!n.expanded,{handleToggleCollapse:i}=o.useTree();if(!i)throw Error("It looks like you're trying to use CollapseToggle outside of the <Tree/> scope");return d.default.createElement("div",{onClick:()=>i(n),"data-rt-collapse-toggle":!0,"aria-pressed":r,tabIndex:0,role:"button"},t)}}]);