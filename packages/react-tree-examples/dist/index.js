/*! For license information please see index.js.LICENSE.txt */
!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="./dist",n(n.s="./src/Index.tsx")}({"../react-tree/dist/index.js":function(module,exports,__webpack_require__){eval('!function(e,t){if(true)module.exports=t(__webpack_require__(/*! react */ "react"));else { var r, n; }}(window,(function(e){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="./dist",n(n.s=7)}([function(e,t,n){"use strict";var r=this&&this.__rest||function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]])}return n};Object.defineProperty(t,"__esModule",{value:!0}),t.getSelectedNodeIds=t.toSubList=t.toList=t.findTreeNodeById=t.toTreeNodes=t.toTreeNode=t.toFlatNodes=t.toFlatNode=void 0,t.toFlatNode=(e,t)=>{const{children:n}=e,o=r(e,["children"]);return Object.assign(Object.assign({},o),{parentId:t})},t.toFlatNodes=(e,n)=>{let r=[];return e.forEach(e=>{r.push(t.toFlatNode(e,n)),r=r.concat(t.toFlatNodes(e.children,e.id))}),r},t.toTreeNode=e=>Object.assign(Object.assign({},e),{children:[]}),t.toTreeNodes=e=>{const n=Object.create(null);e.forEach(e=>{n[e.id]=t.toTreeNode(e)});const r=[];return e.forEach(e=>{void 0!==e.parentId&&n[e.parentId]?n[e.parentId].children.push(n[e.id]):r.push(n[e.id])}),r},t.findTreeNodeById=(e,n,r=null)=>{for(const o of n){if(o.id===e)return{node:o,parent:r};const n=t.findTreeNodeById(e,o.children,o);if(n)return n}return null},t.toList=(e,n=!0,r=[])=>(e.forEach(e=>{r.push(t.toFlatNode(e,e.parentId)),(n||void 0===e.expanded||e.expanded)&&t.toList(e.children,n,r)}),r),t.toSubList=(e,n)=>{const r=t.toList(e);let o=r.length,d=0;return n.forEach(e=>{const t=r.findIndex(t=>t.id===e);t>=d&&(d=t),t<=o&&(o=t)}),r.slice(o,d+1)},t.getSelectedNodeIds=(e,n)=>{const r=t.toSubList(e,n).filter(e=>n.includes(e.id));return t.toTreeNodes(r).map(e=>e.id)}},function(t,n){t.exports=e},function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),d=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&r(t,e,n);return o(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.Tree=t.useTree=t.TreeContext=void 0;const i=d(n(1)),s=n(3),a=n(4),l=n(9),c=n(0),u=n(10),f=n(5);t.TreeContext=i.createContext(void 0),t.useTree=()=>i.useContext(t.TreeContext);const p={padding:0},g={listStyle:"none"};t.Tree=e=>{const{nodes:n,nameProperty:r,renderElement:o,onChange:d,onPaste:b,onSelectionChange:h,sortFunction:v,disableDrag:y,schema:O,disableSelection:j,disableMultiSelection:m,disableCut:_,disableCopy:S,renderDragImage:T,initialFocusedNodeId:x,labelledbyId:I}=e,D=c.toTreeNodes(n),[w,E]=i.useState(),[N,k]=i.useState();v?s.sortTree(D,v):s.sortTree(D,s.createAlphaNumericSort(r));const C=void 0!==x?[x]:[],{selection:P,handleClick:M,handleSelectionChange:L,handleBlur:A}=l.useSelectionState(D,h,j,m,C),B=[...P.selected,w],F=e=>{d&&d([e],"expanded",!e.expanded)};u.useKeyboard(D,P,r,L,()=>{const e=P.selected[0];if(void 0!==e)if(P.cut.length){if(!d)return;const t=n.filter(e=>P.cut.includes(e.id));f.isMoveValid(n,t.map(e=>e.id),!0,e,O)&&d(t,"parentId",e)}else{if(!b)return;const t=n.filter(e=>P.copied.includes(e.id));if(f.isMoveValid(n,t.map(e=>e.id),!1,e,O)){const t=c.getSelectedNodeIds(D,P.copied).map(e=>{const t=c.findTreeNodeById(e,D);return null==t?void 0:t.node});b(t,e)}}},F,!!_,!!S);const K=i.useCallback((e,t=0)=>{const n=[];return e.forEach((r,d)=>{const s=o(r,t);let l=[];const c=void 0===r.expanded||r.expanded;c&&(l=K(r.children,t+1));const u={};r.id===N&&N!==r.parentId&&(u["data-rt-drop-valid"]=!0),r.children.length&&(u["aria-expanded"]=c);const f=P.focused&&r.id===P.selected[0];n.push(i.default.createElement("li",Object.assign({"data-rt-element-wrapper":r.id,role:"treeitem","aria-level":t+1,"aria-setsize":e.length,"aria-posinset":d+1,tabIndex:f?0:-1},u,{style:g,key:r.id}),i.default.createElement(a.TreeElement,{node:r,depth:t},s),l&&i.default.createElement("ul",{role:"group",style:p},l)))}),n},[N,P,o]),V=K(D),R={overId:N,handleDrag:E,handleOver:e=>{f.isMoveValid(n,B,!0,e,O)?k(e):k(void 0)},handleDrop:(e,t)=>{if(void 0!==t){const r=n.find(t=>String(t.id)===String(e));if(r&&String(r.parentId)!==String(t)&&d){const e=c.getSelectedNodeIds(D,[...P.selected,w]).map(e=>n.find(t=>t.id===e));d(e,"parentId",t)}}k(void 0),E(void 0)},handleToggleCollapse:F,disableDrag:!!y,selection:P,handleSelectionChange:L,handleClick:M,renderDragImage:T,dragId:w};return i.default.createElement(t.TreeContext.Provider,{value:R},i.default.createElement("ul",{"data-rt-tree":!0,role:"tree",style:p,onBlur:A,"aria-labelledby":I},V))}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.sortTree=t.createAlphaNumericSort=void 0,t.createAlphaNumericSort=e=>(t,n)=>String(t[e]).localeCompare(String(n[e])),t.sortTree=(e,n)=>{e.sort(n),e.forEach(e=>t.sortTree(e.children,n))}},function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.TreeElement=void 0;const o=r(n(1)),d=n(8);t.TreeElement=e=>{const{node:t,children:n,dragDisabled:r}=e,{id:i}=t,s=d.useTreeElementState(e),a=!(t.dragDisabled||r);return o.default.createElement("div",Object.assign({key:i,draggable:a,role:"treeitem"},s),n)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isMoveValid=void 0;const r=n(6),o=n(0);t.isMoveValid=(e,t,n=!0,d,i)=>{if(void 0===d)return!1;for(const s of t){if(s===d)return!1;const t=e.find(e=>e.id===s);if(t){if(t.dragDisabled)return!1;if(n&&t.parentId===d)return!1;const a=e.find(e=>e.id===d);if(a){const n=o.findTreeNodeById(s,o.toTreeNodes(e));if(n&&n.node){if(o.toFlatNodes(n.node.children).find(e=>e.id===d))return!1}if(!r.isDropAllowed(t,a,i))return!1}}}return!0}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isDropAllowed=void 0,t.isDropAllowed=(e,t,n)=>{if(!n)return!0;const r=n.rules?n.rules[t.type]:void 0;return(!r||0!==r.length)&&(!(r&&!r.includes(e.type))&&(!n.isDropAllowed||n.isDropAllowed(e,t)))}},function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__exportStar||function(e,t){for(var n in e)"default"===n||t.hasOwnProperty(n)||r(t,e,n)};Object.defineProperty(t,"__esModule",{value:!0}),o(n(3),t),o(n(0),t),o(n(2),t),o(n(5),t),o(n(4),t),o(n(6),t),o(n(11),t)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.useTreeElementState=void 0;const r=n(2);t.useTreeElementState=e=>{const{node:t,depth:n,dragDisabled:o}=e,{overId:d,dragId:i,handleDrag:s,handleOver:a,handleDrop:l,disableDrag:c,selection:u,handleClick:f,renderDragImage:p}=r.useTree(),g=u.selected.includes(t.id),b=u.cut.includes(t.id),h=u.copied.includes(t.id),v=u.selected.slice();void 0===i||u.selected.includes(i)||v.push(i);const y={"data-rt-element":t.id,"data-rt-type":t.type,"data-rt-depth":n,draggable:!o,onClick:e=>{f(e,t.id)}};return g&&(y["data-rt-selected"]=!0),b&&(y["data-rt-cut"]=!0),h&&(y["data-rt-copied"]=!0),c?{}:(o||t.dragDisabled||(y.onDragStart=e=>{e.dataTransfer.setData("text/rt-id",String(t.id)),e.dataTransfer.dropEffect="move",p&&e.dataTransfer.setDragImage(p(v),0,0),s(t.id)}),y.onDragOver=e=>{a(t.id),e.preventDefault(),e.dataTransfer.dropEffect="move"},y.onDragLeave=()=>{a(void 0)},y.onDrop=e=>{if(e.preventDefault(),void 0!==d&&d===t.id){const n=e.dataTransfer.getData("text/rt-id");l(n,t.id)}},y)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.useSelectionState=void 0;const r=n(1),o=n(0);t.useSelectionState=(e,t,n,d,i=[])=>{const[s,a]=r.useState({focused:!!i.length,selected:i,cut:[],copied:[]}),l=e=>{let n=e;"function"==typeof e&&(n=e(s)),n.focused=!0,a(n),t&&t(n)},c=r.useCallback((t,r)=>{if(!n)if(d)l(e=>Object.assign(Object.assign({},e),{selected:[r]}));else if(t.shiftKey&&!s.selected.includes(r)){const t=[r,...s.selected],n=o.toSubList(e,t).map(e=>e.id);l(e=>Object.assign(Object.assign({},e),{selected:n}))}else if(t.metaKey)if(s.selected.includes(r)){const e=s.selected.filter(e=>e!==r);l(t=>Object.assign(Object.assign({},t),{selected:e}))}else{const e=[r,...s.selected];l(t=>Object.assign(Object.assign({},t),{selected:e}))}else l(e=>Object.assign(Object.assign({},e),{selected:[r]}))},[e,s,n,d]);return{selection:s,handleClick:c,handleSelectionChange:l,handleBlur:()=>{let e=Object.assign(Object.assign({},s),{focused:!1});a(e),t&&t(e)}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.useKeyboard=void 0;const r=n(1),o=n(0);t.useKeyboard=(e,t,n,d,i,s,a,l)=>{const c=r.useRef(0),u=o.toList(e,!1),f=e=>{c.current=0,d(t=>Object.assign(Object.assign({},t),{selected:[e]}))},p=(e,n)=>{const{selected:r}=t;if(r.length){const t=u.findIndex(e=>e.id===r[0]),o=u[t+n];o&&(e.shiftKey?(c.current>0&&-1===n||c.current<0&&1===n?d(e=>Object.assign(Object.assign({},e),{selected:r.slice(1)})):d(e=>Object.assign(Object.assign({},e),{selected:[o.id,...r]})),c.current+=n):f(o.id))}},g=(n,r)=>{const{selected:d}=t;if(d.length){const t=o.findTreeNodeById(d[0],e),i=null==t?void 0:t.node;i&&(-1===r?i.children.length&&i.expanded?s(i):p(n,-1):i.children.length&&!i.expanded?s(i):p(n,1))}},b=()=>{d(e=>Object.assign(Object.assign({},e),{copied:[],cut:[]}))},h=e=>{const r=u.findIndex(e=>e.id===t.selected[0])+1,o=e.toLowerCase();let i=u.slice(r).find(e=>String(e[n]).toLowerCase().startsWith(o));i||(i=u.slice(0,r).find(e=>String(e[n]).toLowerCase().startsWith(o))),i&&d(e=>Object.assign(Object.assign({},e),{selected:[i.id]}))},v=n=>{if(t.focused)switch(n.key){case"ArrowDown":p(n,1);break;case"ArrowUp":p(n,-1);break;case"ArrowLeft":g(n,-1);break;case"ArrowRight":g(n,1);break;case"Home":f(u[0].id);break;case"End":f(u[u.length-1].id);break;case"Escape":b();break;case" ":(()=>{if(t.selected.length){const e=u.find(e=>e.id===t.selected[0]);e&&s(e)}})();break;case"*":(()=>{const n=o.findTreeNodeById(t.selected[0],e);if(n){const{node:e,parent:t}=n;t?t.children.forEach(e=>{e.children.length&&!e.expanded&&s(e)}):e&&!(null==e?void 0:e.expanded)&&s(e)}})();break;default:if(n.metaKey)switch(n.key){case"x":(e=>{a||t.selected.length&&(e.preventDefault(),d(e=>Object.assign(Object.assign({},e),{copied:[],cut:t.selected.slice()})))})(n);break;case"c":(e=>{l||t.selected.length&&(e.preventDefault(),d(e=>Object.assign(Object.assign({},e),{cut:[],copied:t.selected.slice()})))})(n);break;case"v":(e=>{(t.cut.length||t.copied.length)&&(e.preventDefault(),i(),b())})(n);break;default:h(n.key)}else h(n.key)}};r.useEffect(()=>(window.addEventListener("keydown",v),()=>{window.removeEventListener("keydown",v)}))}},function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.CollapseToggle=void 0;const o=r(n(1)),d=n(2);t.CollapseToggle=e=>{const{children:t,node:n}=e,r=!n.expanded,{handleToggleCollapse:i}=d.useTree();if(!i)throw Error("It looks like you\'re trying to use CollapseToggle outside of the <Tree/> scope");return o.default.createElement("div",{onClick:()=>i(n),"data-rt-collapse-toggle":!0,"aria-pressed":r,tabIndex:0,role:"button"},t)}}])}));\n\n//# sourceURL=webpack:///../react-tree/dist/index.js?')},"./src/Index.tsx":function(module,exports,__webpack_require__){"use strict";eval('\n\nvar __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {\n  if (k2 === undefined) k2 = k;\n  Object.defineProperty(o, k2, {\n    enumerable: true,\n    get: function () {\n      return m[k];\n    }\n  });\n} : function (o, m, k, k2) {\n  if (k2 === undefined) k2 = k;\n  o[k2] = m[k];\n});\n\nvar __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {\n  Object.defineProperty(o, "default", {\n    enumerable: true,\n    value: v\n  });\n} : function (o, v) {\n  o["default"] = v;\n});\n\nvar __importStar = this && this.__importStar || function (mod) {\n  if (mod && mod.__esModule) return mod;\n  var result = {};\n  if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n\n  __setModuleDefault(result, mod);\n\n  return result;\n};\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\n\nconst react_1 = __importStar(__webpack_require__(/*! react */ "react"));\n\nconst react_dom_1 = __webpack_require__(/*! react-dom */ "react-dom");\n\nconst react_tree_1 = __webpack_require__(/*! @mpkelly/react-tree */ "../react-tree/dist/index.js"); // THE DATA\n\n\nvar Type;\n\n(function (Type) {\n  Type[Type["File"] = 0] = "File";\n  Type[Type["Folder"] = 1] = "Folder";\n})(Type || (Type = {}));\n\nconst FileSystemSchema = {\n  rules: {\n    [Type.Folder]: [Type.Folder, Type.File],\n    //empty array = accepts nothing\n    [Type.File]: []\n  }\n};\nlet id = 0;\nconst flatNodes = [{\n  id: id++,\n  expanded: true,\n  type: Type.Folder,\n  //FlatNode supports any additional properties you need\n  name: "Folder one"\n}, {\n  id: id++,\n  type: Type.File,\n  parentId: 0,\n  name: "File one"\n}, {\n  id: id++,\n  type: Type.File,\n  parentId: 0,\n  name: "File two"\n}, {\n  id: id++,\n  expanded: true,\n  parentId: 0,\n  type: Type.Folder,\n  name: "Folder two"\n}, {\n  id: id++,\n  type: Type.File,\n  parentId: 3,\n  name: "File three"\n}, {\n  id: id++,\n  type: Type.File,\n  parentId: 3,\n  name: "File four"\n}, {\n  id: id++,\n  type: Type.File,\n  parentId: 3,\n  name: "File five"\n}, {\n  id: id++,\n  type: Type.File,\n  parentId: 3,\n  name: "File six"\n}]; // THE UI\n\nconst ArrowRightIcon = props => react_1.default.createElement("svg", Object.assign({\n  xmlns: "http://www.w3.org/2000/svg",\n  width: "24",\n  height: "24",\n  viewBox: "0 0 24 24",\n  "data-arrow": true\n}, props), react_1.default.createElement("path", {\n  d: "M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z",\n  fill: "currentColor"\n}));\n\nconst FolderIcon = () => react_1.default.createElement("svg", {\n  xmlns: "http://www.w3.org/2000/svg",\n  width: "24",\n  height: "24",\n  viewBox: "0 0 24 24",\n  "data-folder": true\n}, react_1.default.createElement("path", {\n  d: "M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z",\n  fill: "currentColor"\n}));\n\nconst FileIcon = () => react_1.default.createElement("svg", {\n  xmlns: "http://www.w3.org/2000/svg",\n  width: "24",\n  height: "24",\n  viewBox: "0 0 24 24",\n  "data-file": true\n}, react_1.default.createElement("path", {\n  d: "M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z",\n  fill: "currentColor"\n}));\n\nconst TreeElement = props => {\n  const {\n    node,\n    icon,\n    depth\n  } = props;\n  let arrow = null;\n\n  if (node.type === Type.Folder) {\n    arrow = react_1.default.createElement(react_tree_1.CollapseToggle, {\n      node: node\n    }, react_1.default.createElement(ArrowRightIcon, null));\n  }\n\n  return react_1.default.createElement("div", {\n    "data-tree-element": true,\n    style: {\n      paddingLeft: depth * 16\n    }\n  }, arrow, " ", icon, " ", react_1.default.createElement("span", {\n    "data-element-name": true\n  }, node.name));\n}; // THE STYLE - see index.html\n\n\nconst App = () => {\n  const [nodes, setNodes] = react_1.useState(flatNodes); //Only two things can change: \'parentId\' and \'expanded\'\n\n  const handleChange = react_1.useCallback((changed, property, value) => {\n    const next = nodes.slice();\n    changed.forEach(changed => {\n      const node = next.find(node => node.id == changed.id);\n      const nextNode = Object.assign(Object.assign({}, node), {\n        [property]: value\n      });\n      next.splice(next.indexOf(node), 1, nextNode);\n    });\n    setNodes(next);\n  }, [nodes]);\n\n  const handlePaste = (newNodes, parentId) => {\n    const updateIds = (nodes, parentId) => {\n      nodes.forEach(node => {\n        //Assign a unique id for every new node\n        node.id = id++; // link to parent\n\n        node.parentId = parentId; // Update children and pass this node\'s new id as the parentId\n\n        updateIds(node.children, node.id);\n      });\n    };\n\n    updateIds(newNodes, parentId);\n    setNodes(nodes => nodes.concat(react_tree_1.toFlatNodes(newNodes, parentId)));\n  };\n\n  const renderElement = (node, depth) => {\n    switch (node.type) {\n      case Type.Folder:\n        return react_1.default.createElement(TreeElement, {\n          node: node,\n          depth: depth,\n          icon: react_1.default.createElement(FolderIcon, null)\n        });\n\n      case Type.File:\n        return react_1.default.createElement(TreeElement, {\n          node: node,\n          depth: depth,\n          icon: react_1.default.createElement(FileIcon, null)\n        });\n    }\n\n    throw Error("Node not handled: " + node.type);\n  };\n\n  return react_1.default.createElement(react_tree_1.Tree, {\n    nodes: nodes,\n    schema: FileSystemSchema,\n    renderElement: renderElement,\n    sortFunction: react_tree_1.createAlphaNumericSort("name"),\n    onChange: handleChange,\n    onPaste: handlePaste,\n    nameProperty: "name"\n  });\n};\n\nreact_dom_1.render(react_1.default.createElement(App, null), document.getElementById("app"));\n\n//# sourceURL=webpack:///./src/Index.tsx?')},react:function(module,exports){eval("module.exports = React;\n\n//# sourceURL=webpack:///external_%22React%22?")},"react-dom":function(module,exports){eval("module.exports = ReactDOM;\n\n//# sourceURL=webpack:///external_%22ReactDOM%22?")}});