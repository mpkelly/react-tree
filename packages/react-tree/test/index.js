!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="./test",n(n.s=8)}([function(e,t){e.exports=React},function(e,t,n){"use strict";var r=this&&this.__rest||function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]])}return n};Object.defineProperty(t,"__esModule",{value:!0}),t.getSelectedNodeIds=t.toSubList=t.toList=t.findTreeNodeById=t.toTreeNodes=t.toTreeNode=t.toFlatNodes=t.toFlatNode=void 0,t.toFlatNode=(e,t)=>{const{children:n}=e,o=r(e,["children"]);return Object.assign(Object.assign({},o),{parentId:t})},t.toFlatNodes=(e,n)=>{let r=[];return e.forEach(e=>{r.push(t.toFlatNode(e,n)),r=r.concat(t.toFlatNodes(e.children,e.id))}),r},t.toTreeNode=e=>Object.assign(Object.assign({},e),{children:[]}),t.toTreeNodes=e=>{const n=Object.create(null);e.forEach(e=>{n[e.id]=t.toTreeNode(e)});const r=[];return e.forEach(e=>{void 0!==e.parentId&&n[e.parentId]?n[e.parentId].children.push(n[e.id]):r.push(n[e.id])}),r},t.findTreeNodeById=(e,n,r=null)=>{for(const o of n){if(o.id===e)return{node:o,parent:r};const n=t.findTreeNodeById(e,o.children,o);if(n)return n}return null},t.toList=(e,n=!0,r=[])=>(e.forEach(e=>{r.push(t.toFlatNode(e,e.parentId)),(n||void 0===e.expanded||e.expanded)&&t.toList(e.children,n,r)}),r),t.toSubList=(e,n)=>{const r=t.toList(e);let o=r.length,i=0;return n.forEach(e=>{const t=r.findIndex(t=>t.id===e);t>=i&&(i=t),t<=o&&(o=t)}),r.slice(o,i+1)},t.getSelectedNodeIds=(e,n)=>{const r=t.toSubList(e,n).filter(e=>n.includes(e.id));return t.toTreeNodes(r).map(e=>e.id)}},function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&r(t,e,n);return o(t,e),t},l=this&&this.__rest||function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]])}return n};Object.defineProperty(t,"__esModule",{value:!0}),t.Tree=t.useTree=t.TreeContext=void 0;const d=i(n(0)),a=n(3),s=n(4),c=n(13),u=n(1),f=n(14),p=n(5);t.TreeContext=d.createContext(void 0),t.useTree=()=>d.useContext(t.TreeContext);const h={padding:0},g={listStyle:"none"};t.Tree=d.forwardRef((e,n)=>{const{nodes:r,nameProperty:o,renderElement:i,onChange:l,onPaste:s,onSelectionChange:g,sortFunction:v,disableDrag:m,schema:y,disableSelection:O,disableMultiSelection:w,disableCut:j,disableCopy:_,renderDragImage:S,initialFocusedNodeId:E,labelledbyId:T}=e,I=u.toTreeNodes(r),[x,D]=d.useState(),[C,M]=d.useState();v?a.sortTree(I,v):a.sortTree(I,a.createAlphaNumericSort(o));const N=void 0!==E?[E]:[],{selection:P,handleClick:k,handleSelectionChange:F,handleBlur:L}=c.useSelectionState(I,g,O,w,N),B=[...P.selected,x],V=e=>{l&&l(e,"expanded",!e[0].expanded,P)};f.useKeyboard(I,P,o,F,()=>{const e=P.selected[0];if(void 0!==e)if(P.cut.length){if(!l)return;const t=r.filter(e=>P.cut.includes(e.id));p.isMoveValid(r,t.map(e=>e.id),!0,e,y)&&l(t,"parentId",e,P)}else{if(!s)return;const t=r.filter(e=>P.copied.includes(e.id));if(p.isMoveValid(r,t.map(e=>e.id),!1,e,y)){const t=u.getSelectedNodeIds(I,P.copied).map(e=>{const t=u.findTreeNodeById(e,I);return null==t?void 0:t.node});s(t,e)}}},V,!!j,!!_);const H=d.useCallback((e,t=0)=>{const n=[];return e.forEach((r,o)=>{const l=i(r,t);let a=[];const s=void 0===r.expanded||r.expanded;s&&(a=H(r.children,t+1));const c={};r.id===C&&C!==r.parentId&&(c["data-rt-drop-valid"]=!0),r.children.length&&(c["aria-expanded"]=s);const u=P.focused&&r.id===P.selected[0];n.push(d.default.createElement(b,Object.assign({node:r,index:o,depth:t,setsize:e.length,focused:u,nodeItem:l,key:r.id},c),a))}),n},[C,P,i]),W=H(I),A={overId:C,handleDrag:D,handleOver:e=>{p.isMoveValid(r,B,!0,e,y)?M(e):M(void 0)},handleDrop:(e,t)=>{if(void 0!==t){const n=r.find(t=>String(t.id)===String(e));if(n&&String(n.parentId)!==String(t)&&l){const e=u.getSelectedNodeIds(I,[...P.selected,x]).map(e=>r.find(t=>t.id===e));l(e,"parentId",t,P)}}M(void 0),D(void 0)},handleToggleCollapse:V,disableDrag:!!m,selection:P,handleSelectionChange:F,handleClick:k,renderDragImage:S,dragId:x};return d.default.createElement(t.TreeContext.Provider,{value:A},d.default.createElement("ul",{ref:n,"data-rt-tree":!0,role:"tree",style:h,onBlur:L,"aria-labelledby":T},W))});const b=d.memo(e=>{const{node:t,index:n,depth:r,setsize:o,focused:i,nodeItem:a,children:c}=e,u=l(e,["node","index","depth","setsize","focused","nodeItem","children"]);return d.default.createElement("li",Object.assign({"data-rt-element-wrapper":t.id,role:"treeitem","aria-level":r+1,"aria-setsize":o,"aria-posinset":n+1,tabIndex:i?0:-1},u,{style:g,key:t.id}),d.default.createElement(s.TreeElement,{node:t,depth:r},a),c&&d.default.createElement("ul",{role:"group",style:h},c))})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.sortTree=t.createAlphaNumericSort=void 0,t.createAlphaNumericSort=e=>(t,n)=>String(t[e]).localeCompare(String(n[e])),t.sortTree=(e,n)=>{e.sort(n),e.forEach(e=>t.sortTree(e.children,n))}},function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.TreeElement=void 0;const o=r(n(0)),i=n(12);t.TreeElement=e=>{const{node:t,children:n,dragDisabled:r}=e,{id:l}=t,d=i.useTreeElementState(e),a=!(t.dragDisabled||r);return o.default.createElement("div",Object.assign({key:l,draggable:a,role:"treeitem"},d),n)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isMoveValid=void 0;const r=n(6),o=n(1);t.isMoveValid=(e,t,n=!0,i,l)=>{if(void 0===i)return!1;for(const d of t){if(d===i)return!1;const t=e.find(e=>e.id===d);if(t){if(t.dragDisabled)return!1;if(n&&t.parentId===i)return!1;const a=e.find(e=>e.id===i);if(a){const n=o.findTreeNodeById(d,o.toTreeNodes(e));if(n&&n.node){if(o.toFlatNodes(n.node.children).find(e=>e.id===i))return!1}if(!r.isDropAllowed(t,a,l))return!1}}}return!0}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isDropAllowed=void 0,t.isDropAllowed=(e,t,n)=>{if(!n)return!0;const r=n.rules?n.rules[t.type]:void 0;return(!r||0!==r.length)&&(!(r&&!r.includes(e.type))&&(!n.isDropAllowed||n.isDropAllowed(e,t)))}},function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.ensureInView=t.disableScrollingUntilNextTick=t.scrollFocusedNodeIntoViewIfNecessary=t.DefaultScrollOptions=void 0;const o=r(n(16));t.DefaultScrollOptions={scrollMode:"if-needed",block:"nearest"},t.scrollFocusedNodeIntoViewIfNecessary=(e,n,r=t.DefaultScrollOptions)=>{const i=e.selected[0];if(e.focused&&void 0!==i){const e=document.querySelector(`[data-rt-element="${i}"]`);if(e){const t=document.querySelector(n);if(t){const{overflow:n}=t.style;t.style.overflow="hidden",setTimeout(()=>{t.style.overflow=n,e&&o.default(e,r)},1)}}}},t.disableScrollingUntilNextTick=e=>{const t=document.querySelector(e),{overflow:n}=t.style;t.style.overflow="hidden",setTimeout(()=>{t.style.overflow=n},1)},t.ensureInView=(e,n=t.DefaultScrollOptions)=>{const r=document.querySelector(`[data-rt-element="${e}"]`);r&&setTimeout(()=>{r&&o.default(r,n)},1)}},function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&r(t,e,n);return o(t,e),t};Object.defineProperty(t,"__esModule",{value:!0});const l=i(n(0)),d=n(9),a=n(10);var s;!function(e){e[e.File=0]="File",e[e.Folder=1]="Folder"}(s||(s={}));const c={rules:{[s.Folder]:[s.Folder,s.File],[s.File]:[]}};let u=0;const f=[{id:u++,expanded:!0,type:s.Folder,name:"Folder one"},{id:u++,type:s.File,parentId:0,name:"File one"},{id:u++,type:s.File,parentId:0,name:"File two"},{id:u++,expanded:!0,parentId:0,type:s.Folder,name:"Folder two"}],p=e=>l.default.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24","data-arrow":!0},e),l.default.createElement("path",{d:"M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z",fill:"currentColor"})),h=()=>l.default.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24","data-folder":!0},l.default.createElement("path",{d:"M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z",fill:"currentColor"})),g=()=>l.default.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24","data-file":!0},l.default.createElement("path",{d:"M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z",fill:"currentColor"})),b=e=>{const{node:t,icon:n,depth:r}=e;let o=null;return t.type===s.Folder&&(o=l.default.createElement(a.CollapseToggle,{node:t},l.default.createElement(p,null))),l.default.createElement("div",{"data-tree-element":!0,"data-id":t.id,style:{paddingLeft:16*r}},o," ",n," ",l.default.createElement("span",{"data-element-name":!0},t.name))};d.render(l.default.createElement(()=>{const[e,t]=l.useState(f),[n,r]=l.useState({focused:!1,selected:[],cut:[],copied:[]});return l.default.createElement(l.Fragment,null,l.default.createElement(a.ScrollableTree,{nodes:e,schema:c,renderElement:(e,t)=>{switch(e.type){case s.Folder:return l.default.createElement(b,{node:e,depth:t,icon:l.default.createElement(h,null)});case s.File:return l.default.createElement(b,{node:e,depth:t,icon:l.default.createElement(g,null)})}throw Error("Node not handled: "+e.type)},sortFunction:a.createAlphaNumericSort("name"),onChange:(n,r,o)=>{const i=e.slice();n.forEach(e=>{const t=i.find(t=>t.id==e.id),n=Object.assign(Object.assign({},t),{[r]:o});i.splice(i.indexOf(t),1,n)}),t(i)},onPaste:(e,n)=>{const r=(e,t)=>{e.forEach(e=>{e.id=u++,e.parentId=t,r(e.children,e.id)})};r(e,n),t(t=>t.concat(a.toFlatNodes(e,n)))},onSelectionChange:r,nameProperty:"name"}),l.default.createElement("div",{id:"selected"},n.selected.length))},null),document.getElementById("app"))},function(e,t){e.exports=ReactDOM},function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__exportStar||function(e,t){for(var n in e)"default"===n||t.hasOwnProperty(n)||r(t,e,n)};Object.defineProperty(t,"__esModule",{value:!0}),o(n(3),t),o(n(1),t),o(n(11),t),o(n(2),t),o(n(5),t),o(n(4),t),o(n(6),t),o(n(15),t),o(n(7),t)},function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&r(t,e,n);return o(t,e),t},l=this&&this.__rest||function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]])}return n};Object.defineProperty(t,"__esModule",{value:!0}),t.ScrollableTree=void 0;const d=i(n(0)),a=n(2),s=n(7);let c=1;t.ScrollableTree=e=>{const{id:t,style:n,scrollOptions:r,onChange:o,onSelectionChange:i}=e,u=l(e,["id","style","scrollOptions","onChange","onSelectionChange"]),{current:f}=d.useRef(t||"reacttree"+c++),p=Object.assign(Object.assign({},n||{}),{overflow:"auto"});return d.default.createElement("div",{id:f,style:p},d.default.createElement(a.Tree,Object.assign({onChange:(e,t,n,r)=>{o&&o(e,t,n,r),s.disableScrollingUntilNextTick("#"+f);const i=r.selected[0];s.ensureInView(i)},onSelectionChange:e=>{i&&i(e),s.scrollFocusedNodeIntoViewIfNecessary(e,"#"+f,r)}},u)))}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.useTreeElementState=void 0;const r=n(2);t.useTreeElementState=e=>{const{node:t,depth:n,dragDisabled:o}=e,{overId:i,dragId:l,handleDrag:d,handleOver:a,handleDrop:s,disableDrag:c,selection:u,handleClick:f,renderDragImage:p}=r.useTree(),h=u.selected.includes(t.id),g=u.cut.includes(t.id),b=u.copied.includes(t.id),v=u.selected.slice();void 0===l||u.selected.includes(l)||v.push(l);const m={"data-rt-element":t.id,"data-rt-type":t.type,"data-rt-depth":n,draggable:!o,onClick:e=>{f(e,t.id)}};return h&&(m["data-rt-selected"]=!0),g&&(m["data-rt-cut"]=!0),b&&(m["data-rt-copied"]=!0),c?{}:(o||t.dragDisabled||(m.onDragStart=e=>{e.dataTransfer.setData("text/rt-id",String(t.id)),e.dataTransfer.dropEffect="move",p&&e.dataTransfer.setDragImage(p(v),0,0),d(t.id)}),m.onDragOver=e=>{a(t.id),e.preventDefault(),e.dataTransfer.dropEffect="move"},m.onDragLeave=()=>{a(void 0)},m.onDrop=e=>{if(e.preventDefault(),void 0!==i&&i===t.id){const n=e.dataTransfer.getData("text/rt-id");s(n,t.id)}},m)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.useSelectionState=void 0;const r=n(0),o=n(1);t.useSelectionState=(e,t,n,i,l=[])=>{const[d,a]=r.useState({focused:!!l.length,selected:l,cut:[],copied:[]}),s=r.useCallback(e=>{let n=e;"function"==typeof e&&(n=e(d)),n.focused=!0,a(n),t&&t(n)},[d,a,t]),c=r.useCallback((t,r)=>{if(!n)if(i)s(e=>Object.assign(Object.assign({},e),{selected:[r]}));else if(t.shiftKey&&!d.selected.includes(r)){const t=[r,...d.selected],n=o.toSubList(e,t).map(e=>e.id);s(e=>Object.assign(Object.assign({},e),{selected:n}))}else if(t.metaKey)if(d.selected.includes(r)){const e=d.selected.filter(e=>e!==r);s(t=>Object.assign(Object.assign({},t),{selected:e}))}else{const e=[r,...d.selected];s(t=>Object.assign(Object.assign({},t),{selected:e}))}else s(e=>Object.assign(Object.assign({},e),{selected:[r]}))},[e,d,n,i,s]);return{selection:d,handleClick:c,handleSelectionChange:s,handleBlur:()=>{const e=Object.assign(Object.assign({},d),{focused:!1});a(e),t&&t(e)}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.useKeyboard=void 0;const r=n(0),o=n(1);t.useKeyboard=(e,t,n,i,l,d,a,s)=>{const c=r.useRef(0),u=o.toList(e,!1),f=e=>{c.current=0,i(t=>Object.assign(Object.assign({},t),{selected:[e]}))},p=(e,n)=>{const{selected:r}=t;if(r.length){const t=u.findIndex(e=>e.id===r[0]),o=u[t+n];o&&(e.shiftKey?(c.current>0&&-1===n||c.current<0&&1===n?i(e=>Object.assign(Object.assign({},e),{selected:r.slice(1)})):i(e=>Object.assign(Object.assign({},e),{selected:[o.id,...r]})),c.current+=n):f(o.id))}},h=(n,r)=>{const{selected:i}=t;if(i.length){const t=o.findTreeNodeById(i[0],e),l=null==t?void 0:t.node;l&&(-1===r?l.children.length&&l.expanded?d([l]):p(n,-1):l.children.length&&!l.expanded?d([l]):p(n,1))}},g=()=>{i(e=>Object.assign(Object.assign({},e),{copied:[],cut:[]}))},b=e=>{const r=u.findIndex(e=>e.id===t.selected[0])+1,o=e.toLowerCase();let l=u.slice(r).find(e=>String(e[n]).toLowerCase().startsWith(o));l||(l=u.slice(0,r).find(e=>String(e[n]).toLowerCase().startsWith(o))),l&&i(e=>Object.assign(Object.assign({},e),{selected:[l.id]}))},v=n=>{if(t.focused)switch(n.key){case"ArrowDown":p(n,1);break;case"ArrowUp":p(n,-1);break;case"ArrowLeft":h(n,-1);break;case"ArrowRight":h(n,1);break;case"Home":f(u[0].id);break;case"End":f(u[u.length-1].id);break;case"Escape":g();break;case" ":(()=>{if(t.selected.length){const e=u.find(e=>e.id===t.selected[0]);e&&d([e])}})();break;case"*":(()=>{const n=o.findTreeNodeById(t.selected[0],e);if(n){const{node:e,parent:t}=n;if(t){const e=t.children.filter(e=>e.children.length&&!e.expanded);e.length&&d(e)}else e&&!(null==e?void 0:e.expanded)&&d([e])}})();break;default:if(n.metaKey)switch(n.key){case"x":(e=>{a||t.selected.length&&(e.preventDefault(),i(e=>Object.assign(Object.assign({},e),{copied:[],cut:t.selected.slice()})))})(n);break;case"c":(e=>{s||t.selected.length&&(e.preventDefault(),i(e=>Object.assign(Object.assign({},e),{cut:[],copied:t.selected.slice()})))})(n);break;case"v":(e=>{(t.cut.length||t.copied.length)&&(e.preventDefault(),l(),g())})(n);break;default:b(n.key)}else b(n.key)}};r.useEffect(()=>(window.addEventListener("keydown",v),()=>{window.removeEventListener("keydown",v)}))}},function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.CollapseToggle=void 0;const o=r(n(0)),i=n(2);t.CollapseToggle=e=>{const{children:t,node:n}=e,r=!n.expanded,{handleToggleCollapse:l}=i.useTree();return o.default.createElement("div",{onClick:()=>l([n]),"data-rt-collapse-toggle":!0,"aria-pressed":r,tabIndex:0,role:"button"},t)}},function(e,t,n){"use strict";function r(e){return null!=e&&"object"==typeof e&&1===e.nodeType}function o(e,t){return(!t||"hidden"!==e)&&("visible"!==e&&"clip"!==e)}function i(e,t){if(e.clientHeight<e.scrollHeight||e.clientWidth<e.scrollWidth){var n=getComputedStyle(e,null);return o(n.overflowY,t)||o(n.overflowX,t)||function(e){var t=function(e){if(!e.ownerDocument||!e.ownerDocument.defaultView)return null;try{return e.ownerDocument.defaultView.frameElement}catch(e){return null}}(e);return!!t&&(t.clientHeight<e.scrollHeight||t.clientWidth<e.scrollWidth)}(e)}return!1}function l(e,t,n,r,o,i,l,d){return i<e&&l>t||i>e&&l<t?0:i<=e&&d<=n||l>=t&&d>=n?i-e-r:l>t&&d<n||i<e&&d>n?l-t+o:0}n.r(t);var d=function(e,t){var n=t.scrollMode,o=t.block,d=t.inline,a=t.boundary,s=t.skipOverflowHiddenElements,c="function"==typeof a?a:function(e){return e!==a};if(!r(e))throw new TypeError("Invalid target");for(var u=document.scrollingElement||document.documentElement,f=[],p=e;r(p)&&c(p);){if((p=p.parentNode)===u){f.push(p);break}p===document.body&&i(p)&&!i(document.documentElement)||i(p,s)&&f.push(p)}for(var h=window.visualViewport?visualViewport.width:innerWidth,g=window.visualViewport?visualViewport.height:innerHeight,b=window.scrollX||pageXOffset,v=window.scrollY||pageYOffset,m=e.getBoundingClientRect(),y=m.height,O=m.width,w=m.top,j=m.right,_=m.bottom,S=m.left,E="start"===o||"nearest"===o?w:"end"===o?_:w+y/2,T="center"===d?S+O/2:"end"===d?j:S,I=[],x=0;x<f.length;x++){var D=f[x],C=D.getBoundingClientRect(),M=C.height,N=C.width,P=C.top,k=C.right,F=C.bottom,L=C.left;if("if-needed"===n&&w>=0&&S>=0&&_<=g&&j<=h&&w>=P&&_<=F&&S>=L&&j<=k)return I;var B=getComputedStyle(D),V=parseInt(B.borderLeftWidth,10),H=parseInt(B.borderTopWidth,10),W=parseInt(B.borderRightWidth,10),A=parseInt(B.borderBottomWidth,10),R=0,z=0,K="offsetWidth"in D?D.offsetWidth-D.clientWidth-V-W:0,q="offsetHeight"in D?D.offsetHeight-D.clientHeight-H-A:0;if(u===D)R="start"===o?E:"end"===o?E-g:"nearest"===o?l(v,v+g,g,H,A,v+E,v+E+y,y):E-g/2,z="start"===d?T:"center"===d?T-h/2:"end"===d?T-h:l(b,b+h,h,V,W,b+T,b+T+O,O),R=Math.max(0,R+v),z=Math.max(0,z+b);else{R="start"===o?E-P-H:"end"===o?E-F+A+q:"nearest"===o?l(P,F,M,H,A+q,E,E+y,y):E-(P+M/2)+q/2,z="start"===d?T-L-V:"center"===d?T-(L+N/2)+K/2:"end"===d?T-k+W+K:l(L,k,N,V,W+K,T,T+O,O);var U=D.scrollLeft,X=D.scrollTop;E+=X-(R=Math.max(0,Math.min(X+R,D.scrollHeight-M+q))),T+=U-(z=Math.max(0,Math.min(U+z,D.scrollWidth-N+K)))}I.push({el:D,top:R,left:z})}return I};function a(e){return e===Object(e)&&0!==Object.keys(e).length}t.default=function(e,t){var n=!e.ownerDocument.documentElement.contains(e);if(a(t)&&"function"==typeof t.behavior)return t.behavior(n?[]:d(e,t));if(!n){var r=function(e){return!1===e?{block:"end",inline:"nearest"}:a(e)?e:{block:"start",inline:"nearest"}}(t);return function(e,t){void 0===t&&(t="auto");var n="scrollBehavior"in document.body.style;e.forEach((function(e){var r=e.el,o=e.top,i=e.left;r.scroll&&n?r.scroll({top:o,left:i,behavior:t}):(r.scrollTop=o,r.scrollLeft=i)}))}(d(e,r),r.behavior)}}}]);