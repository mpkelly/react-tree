!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="./dist",r(r.s=1)}([function(e,t){e.exports=React},function(e,t,r){"use strict";var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),l=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&n(t,e,r);return o(t,e),t};Object.defineProperty(t,"__esModule",{value:!0});const d=l(r(0)),a=r(2),i=r(3);var u;!function(e){e[e.File=0]="File",e[e.Folder=1]="Folder"}(u||(u={}));const c={[u.Folder]:[u.Folder,u.File],[u.File]:[]},s=[{id:1,expanded:!0,type:u.Folder,parentId:void 0,name:"Folder one"},{id:2,type:u.File,parentId:1,name:"File one"},{id:3,type:u.File,parentId:1,name:"File two"},{id:4,expanded:!0,parentId:1,type:u.Folder,name:"Folder two"}],f=e=>d.default.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24","data-arrow":!0},e),d.default.createElement("path",{d:"M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z",fill:"currentColor"})),p=()=>d.default.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24","data-folder":!0},d.default.createElement("path",{d:"M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z",fill:"currentColor"})),h=()=>d.default.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24","data-file":!0},d.default.createElement("path",{d:"M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z",fill:"currentColor"})),v=e=>{const{node:t,icon:r,depth:n}=e;let o=null;return t.type===u.Folder&&(o=d.default.createElement(i.CollapseToggle,{node:t},d.default.createElement(f,null))),d.default.createElement("div",{"data-tree-element":!0,style:{paddingLeft:16*n}},o," ",r," ",d.default.createElement("span",{"data-element-name":!0},t.name))};a.render(d.default.createElement(()=>{const[e,t]=d.useState(s);return d.default.createElement(i.Tree,{nodes:e,schema:c,renderElement:(e,t)=>{switch(e.type){case u.Folder:return d.default.createElement(v,{node:e,depth:t,icon:d.default.createElement(p,null)});case u.File:return d.default.createElement(v,{node:e,depth:t,icon:d.default.createElement(h,null)})}throw Error("Node not handled: "+e.type)},sortFunction:i.createAlphaNumericSort("name"),onChange:(e,r,n)=>{t(t=>{const o=t.slice();return o.find(t=>t.id==e.id)[r]=n,o})}})},null),document.getElementById("app"))},function(e,t){e.exports=ReactDOM},function(e,t,r){var n;window,e.exports=(n=r(0),function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="./dist",r(r.s=5)}([function(e,t){e.exports=n},function(e,t,r){"use strict";var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),l=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&n(t,e,r);return o(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.Tree=t.useTreeContext=t.TreeContext=void 0;const d=l(r(0)),a=r(2),i=r(3),u=r(4);t.TreeContext=d.createContext(void 0),t.useTreeContext=()=>d.useContext(t.TreeContext),t.Tree=e=>{const{nodes:r,renderElement:n,onChange:o,sortFunction:l,readOnly:c,schema:s}=e,[f,p]=d.useState(),[h,v]=d.useState(),m=a.toTreeNodes(r);l&&a.sortTree(m,l);const g=d.useCallback(e=>{if(void 0===e)return void v(void 0);if(f===e)return;const t=r.find(e=>e.id===f);if(t){if(t.parentId==e)return!1;const n=r.find(t=>t.id===e);if(n){const r=a.findTreeNodeById(f,m);if(r&&r.node&&a.toFlatNodes(r.node.children).find(t=>t.id==e))return;u.isDropAllowed(t,n,s)&&v(e)}}},[f]),b=(e,t=0)=>{const r=[];return e.forEach(e=>{const o=n(e,t);let l=[];(void 0===e.expanded||e.expanded)&&(l=b(e.children,t+1));let a={};e.id===h&&h!==e.parentId&&(a["data-rtk-drop-valid"]=!0),r.push(d.default.createElement("div",Object.assign({"data-rtk-element":!0},a),d.default.createElement(i.TreeElement,{node:e,depth:t},o),l))}),r},y=b(m),O={overId:h,handleDrag:p,handleOver:g,handleDrop:(e,t)=>{if(t){const n=r.find(t=>String(t.id)===String(e));n&&String(n.parentId)!==String(t)&&o&&o(n,"parentId",t)}v(void 0)},handleToggleCollapse:e=>{console.log("Node",e.expanded,e),o&&o(e,"expanded",!e.expanded)},readOnly:Boolean(c)};return d.default.createElement(t.TreeContext.Provider,{value:O},d.default.createElement("div",{"data-rtk-tree":!0},y))}},function(e,t,r){"use strict";var n=this&&this.__rest||function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(n=Object.getOwnPropertySymbols(e);o<n.length;o++)t.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(e,n[o])&&(r[n[o]]=e[n[o]])}return r};Object.defineProperty(t,"__esModule",{value:!0}),t.findTreeNodeById=t.toTreeNodes=t.toTreeNode=t.toFlatNodes=t.toFlatNode=t.sortTree=t.createAlphaNumericSort=void 0,t.createAlphaNumericSort=e=>(t,r)=>String(t[e]).localeCompare(String(r[e])),t.sortTree=(e,r)=>{e.sort(r),e.forEach(e=>{t.sortTree(e.children,r)})},t.toFlatNode=(e,t)=>{const{children:r}=e,o=n(e,["children"]);return Object.assign(Object.assign({},o),{parentId:t})},t.toFlatNodes=(e,r)=>{let n=[];return e.forEach(e=>{n.push(t.toFlatNode(e,r)),n=n.concat(t.toFlatNodes(e.children,e.id))}),n},t.toTreeNode=e=>Object.assign(Object.assign({},e),{children:[]}),t.toTreeNodes=e=>{const r=Object.create(null);e.forEach(e=>r[e.id]=t.toTreeNode(e));const n=[];return e.forEach(e=>{e.parentId?r[e.parentId].children.push(r[e.id]):n.push(r[e.id])}),n},t.findTreeNodeById=(e,r,n=null)=>{for(let o of r){if(o.id===e)return{node:o,parent:n};{const r=t.findTreeNodeById(e,o.children,o);if(r)return r}}return null}},function(e,t,r){"use strict";var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),l=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&n(t,e,r);return o(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.useTreeElement=t.TreeElement=void 0;const d=l(r(0)),a=r(1);t.TreeElement=e=>{const{node:r,children:n}=e,{id:o}=r,l=t.useTreeElement(e);return d.default.createElement("div",Object.assign({key:o},l),n)},t.useTreeElement=e=>{const{node:t,depth:r,dragDisabled:n}=e,{overId:o,handleDrag:l,handleOver:i,handleDrop:u,readOnly:c}=a.useTreeContext();if(c)return{};let s=void 0;n||(s=e=>{e.dataTransfer.setData("text/rtk-id",String(t.id)),e.dataTransfer.dropEffect="move",l(t.id)});const f=d.useCallback(e=>{if(e.preventDefault(),o&&o==t.id){const r=e.dataTransfer.getData("text/rtk-id");u(r,t.id)}},[o]);return{"data-rtk-node":t.id,"data-rtk-type":t.type,"data-rtk-depth":r,draggable:!n,onDragStart:s,onDragOver:e=>{i(t.id),e.preventDefault(),e.dataTransfer.dropEffect="move"},onDragLeave:e=>{i(void 0)},onDrop:f}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isDropAllowed=void 0,t.isDropAllowed=(e,t,r)=>{if(!r)return!0;const n=r[t.type];return!n||0!==n.length&&!!n.includes(e.type)&&(!r.isDropAllowed||r.isDropAllowed(e,t))}},function(e,t,r){"use strict";var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),o=this&&this.__exportStar||function(e,t){for(var r in e)"default"===r||t.hasOwnProperty(r)||n(t,e,r)};Object.defineProperty(t,"__esModule",{value:!0}),o(r(6),t),o(r(2),t),o(r(1),t),o(r(3),t),o(r(4),t)},function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.CollapseToggle=void 0;const o=n(r(0)),l=r(1);t.CollapseToggle=e=>{const{children:t,node:r}=e,n=!r.expanded,{handleToggleCollapse:d}=l.useTreeContext();if(!d)throw Error("It looks like you're trying to use CollapseToggle outside of the <Tree/> scope");return o.default.createElement("div",{"data-rtk-collapse-toggle":!0,"data-rtk-collapsed":n,onClick:()=>d(r)},t)}}]))}]);