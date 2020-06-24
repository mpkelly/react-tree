/*! For license information please see index.js.LICENSE.txt */
!function(e,n){if("object"==typeof exports&&"object"==typeof module)module.exports=n(require("react"));else if("function"==typeof define&&define.amd)define(["react"],n);else{var t="object"==typeof exports?n(require("react")):n(e.React);for(var r in t)("object"==typeof exports?exports:e)[r]=t[r]}}(window,(function(__WEBPACK_EXTERNAL_MODULE_react__){return function(e){var n={};function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)t.d(r,o,function(n){return e[n]}.bind(null,o));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="./dist",t(t.s="./src/Index.ts")}({"./src/CollapseToggle.tsx":function(module,exports,__webpack_require__){"use strict";eval('\n\nvar __importDefault = this && this.__importDefault || function (mod) {\n  return mod && mod.__esModule ? mod : {\n    "default": mod\n  };\n};\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.CollapseToggle = void 0;\n/* eslint-disable jsx-a11y/click-events-have-key-events */\n\nconst react_1 = __importDefault(__webpack_require__(/*! react */ "react"));\n\nconst Tree_1 = __webpack_require__(/*! ./Tree */ "./src/Tree.tsx");\n/**\n * Wraps any valid `ReactNode` and provides a click handler for\n * toggling between expanded/collapsed state. You should wrap your angle\n * bracket icon or whatever with this.\n */\n\n\nexports.CollapseToggle = props => {\n  const {\n    children,\n    node\n  } = props;\n  const collapsed = !node.expanded;\n  const {\n    handleToggleCollapse\n  } = Tree_1.useTree();\n\n  if (!handleToggleCollapse) {\n    throw Error("It looks like you\'re trying to use CollapseToggle outside of the <Tree/> scope");\n  }\n\n  return react_1.default.createElement("div", {\n    onClick: () => handleToggleCollapse(node),\n    "data-rt-collapse-toggle": true,\n    "aria-pressed": collapsed,\n    tabIndex: 0,\n    role: "button"\n  }, children);\n};\n\n//# sourceURL=webpack:///./src/CollapseToggle.tsx?')},"./src/Index.ts":function(module,exports,__webpack_require__){"use strict";eval('\n\nvar __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {\n  if (k2 === undefined) k2 = k;\n  Object.defineProperty(o, k2, {\n    enumerable: true,\n    get: function () {\n      return m[k];\n    }\n  });\n} : function (o, m, k, k2) {\n  if (k2 === undefined) k2 = k;\n  o[k2] = m[k];\n});\n\nvar __exportStar = this && this.__exportStar || function (m, exports) {\n  for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);\n};\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\n\n__exportStar(__webpack_require__(/*! ./Node */ "./src/Node.ts"), exports);\n\n__exportStar(__webpack_require__(/*! ./NodeUtils */ "./src/NodeUtils.ts"), exports);\n\n__exportStar(__webpack_require__(/*! ./Tree */ "./src/Tree.tsx"), exports);\n\n__exportStar(__webpack_require__(/*! ./TreeUtils */ "./src/TreeUtils.ts"), exports);\n\n__exportStar(__webpack_require__(/*! ./TreeElement */ "./src/TreeElement.tsx"), exports);\n\n__exportStar(__webpack_require__(/*! ./Schema */ "./src/Schema.ts"), exports);\n\n__exportStar(__webpack_require__(/*! ./CollapseToggle */ "./src/CollapseToggle.tsx"), exports);\n\n//# sourceURL=webpack:///./src/Index.ts?')},"./src/Keyboard.ts":function(module,exports,__webpack_require__){"use strict";eval('\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.useKeyboard = void 0;\n\nconst react_1 = __webpack_require__(/*! react */ "react");\n\nconst NodeUtils_1 = __webpack_require__(/*! ./NodeUtils */ "./src/NodeUtils.ts");\n\nexports.useKeyboard = (tree, selection, setSelection, handlePasteNodes, handleToggleCollapse, disableCut, disableCopy) => {\n  const steps = react_1.useRef(0);\n  const list = NodeUtils_1.toList(tree);\n\n  const handleChange = (event, delta) => {\n    const {\n      selected\n    } = selection;\n\n    if (selected.length) {\n      const index = list.findIndex(node => node.id === selected[0]);\n      const next = list[index + delta];\n\n      if (next) {\n        if (event.shiftKey) {\n          if (steps.current > 0 && delta === -1 || steps.current < 0 && delta === 1) {\n            setSelection(current => Object.assign(Object.assign({}, current), {\n              selected: selected.slice(1)\n            }));\n          } else {\n            setSelection(current => Object.assign(Object.assign({}, current), {\n              selected: [next.id, ...selected]\n            }));\n          }\n\n          steps.current += delta;\n        } else {\n          steps.current = 0;\n          setSelection(current => Object.assign(Object.assign({}, current), {\n            selected: [next.id]\n          }));\n        }\n      }\n    }\n  };\n\n  const handleCut = event => {\n    if (disableCut) {\n      return;\n    }\n\n    if (event.metaKey && selection.selected.length) {\n      event.preventDefault();\n      setSelection(current => Object.assign(Object.assign({}, current), {\n        copied: [],\n        cut: selection.selected.slice()\n      }));\n    }\n  };\n\n  const handleCopy = event => {\n    if (disableCopy) {\n      return;\n    }\n\n    if (event.metaKey && selection.selected.length) {\n      event.preventDefault();\n      setSelection(current => Object.assign(Object.assign({}, current), {\n        cut: [],\n        copied: selection.selected.slice()\n      }));\n    }\n  };\n\n  const handleEscape = () => {\n    setSelection(current => Object.assign(Object.assign({}, current), {\n      copied: [],\n      cut: []\n    }));\n  };\n\n  const handlePaste = event => {\n    if (event.metaKey && selection.cut.length || selection.copied.length) {\n      handlePasteNodes();\n      handleEscape();\n    }\n  };\n\n  const handleSpace = () => {\n    if (selection.selected.length) {\n      const selected = list.find(node => node.id === selection.selected[0]);\n\n      if (selected) {\n        handleToggleCollapse(selected);\n      }\n    }\n  };\n  /** esline-disable react-hooks/exhaustive-deps */\n\n\n  const handleKey = event => {\n    if (document.activeElement !== document.body) {\n      // Ignore key events if other nodes are focused. Might need\n      // make this an API option.\n      return;\n    }\n\n    switch (event.key) {\n      case "ArrowDown":\n        handleChange(event, 1);\n        break;\n\n      case "ArrowUp":\n        handleChange(event, -1);\n        break;\n\n      case "x":\n        handleCut(event);\n        break;\n\n      case "c":\n        handleCopy(event);\n        break;\n\n      case "v":\n        handlePaste(event);\n        break;\n\n      case "Escape":\n        handleEscape();\n        break;\n\n      case " ":\n        handleSpace();\n        break;\n      // no default\n    }\n  };\n\n  react_1.useEffect(() => {\n    window.addEventListener("keydown", handleKey);\n    return () => {\n      window.removeEventListener("keydown", handleKey);\n    };\n  });\n};\n\n//# sourceURL=webpack:///./src/Keyboard.ts?')},"./src/Node.ts":function(module,exports,__webpack_require__){"use strict";eval('\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.sortTree = exports.createAlphaNumericSort = void 0;\n/**\n * Creates a simple sorting function that performs an alpha-numeric sort\n * using `String.localeCompare`.\n *\n * @param property the property on the node you wish to use for sorting.\n * This property is typically called `name` or `title` etc.\n */\n\nexports.createAlphaNumericSort = property => (a, b) => String(a[property]).localeCompare(String(b[property]));\n/**\n * Sort the tree according to the `sortFunction` provided.\n *\n * @param tree the tree as an array of `TreeNodes`.\n * @param sortFunction the sorting function to use.\n */\n\n\nexports.sortTree = (tree, sortFunction) => {\n  tree.sort(sortFunction);\n  tree.forEach(node => exports.sortTree(node.children, sortFunction));\n};\n\n//# sourceURL=webpack:///./src/Node.ts?')},"./src/NodeUtils.ts":function(module,exports,__webpack_require__){"use strict";eval('\n\nvar __rest = this && this.__rest || function (s, e) {\n  var t = {};\n\n  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];\n\n  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {\n    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];\n  }\n  return t;\n};\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.getSelectedNodeIds = exports.toSubList = exports.toList = exports.findTreeNodeById = exports.toTreeNodes = exports.toTreeNode = exports.toFlatNodes = exports.toFlatNode = void 0;\n/**\n * Convert a `TreeNode` into a `FlatNode`.\n *\n * @param node The `TreeNode` to convert.\n * @param parentId the `id` of the parent `TreeNode` unless the node is a root node.\n */\n\nexports.toFlatNode = (node, parentId) => {\n  // eslint-disable-next-line @typescript-eslint/no-unused-vars\n  const {\n    children\n  } = node,\n        rest = __rest(node, ["children"]);\n\n  return Object.assign(Object.assign({}, rest), {\n    parentId\n  });\n};\n/**\n *\n * @param nodes The `TreeNodes` to flatten into `FlatNodes`.\n * @param parentId The parentId of the subtree or undefined if the `nodes`\n * array contains root elements.\n */\n\n\nexports.toFlatNodes = (nodes, parentId) => {\n  let items = [];\n  nodes.forEach(node => {\n    items.push(exports.toFlatNode(node, parentId));\n    items = items.concat(exports.toFlatNodes(node.children, node.id));\n  });\n  return items;\n};\n/**\n * Convert a `FlatNode` into a `TreeNode`.\n *\n * @param node the `FlatNode` to convert.\n */\n\n\nexports.toTreeNode = node => Object.assign(Object.assign({}, node), {\n  children: []\n});\n/**\n * Convert an array of `FlatNode`s into a tree.\n *\n * @param nodes the `FlatNode`s to convert into a tree.\n */\n\n\nexports.toTreeNodes = nodes => {\n  const table = Object.create(null);\n  nodes.forEach(node => {\n    table[node.id] = exports.toTreeNode(node);\n  });\n  const tree = [];\n  nodes.forEach(node => {\n    if (node.parentId !== undefined && table[node.parentId]) {\n      table[node.parentId].children.push(table[node.id]);\n    } else {\n      tree.push(table[node.id]);\n    }\n  });\n  return tree;\n};\n/**\n * Find a `TreeNode` somewhere on a tree. The parent is also returned\n * if it is exists i.e. non-root nodes.\n *\n * @param id the ID to search for\n * @param nodes the nodes to search\n */\n\n\nexports.findTreeNodeById = (id, nodes, parent = null) => {\n  // eslint-disable-next-line no-restricted-syntax\n  for (const node of nodes) {\n    if (node.id === id) {\n      return {\n        node,\n        parent\n      };\n    }\n\n    const result = exports.findTreeNodeById(id, node.children, node);\n\n    if (result) {\n      return result;\n    }\n  }\n\n  return null;\n};\n/**\n * Convert a tree into a list while maintaining the tree\'s sort order.\n *\n * @param tree the tree as an array of `TreeNodes`.\n * @param result optional, the array to collect the results into.\n */\n\n\nexports.toList = (tree, result = []) => {\n  tree.forEach(node => {\n    result.push(exports.toFlatNode(node, node.parentId));\n    node.children.forEach(child => {\n      result.push(exports.toFlatNode(child, child.parentId));\n      exports.toList(child.children, result);\n    });\n  });\n  return result;\n};\n/**\n * Get a sub-list from a tree that has been converted into a list. The sub-list\n * start index is based on the lowest index of the nodes which are mapped from\n * the `ids` param. The end index is the highest index of the node which\n * maps from the `ids` param. All intermediate nodes even if their id is not in\n * the `ids` paramsare returned and both indices are inclusive.\n *\n *  See also `toList`.\n *\n * @param tree the tree as an array of `TreeNodes`.\n * @param ids the ids that are included.\n */\n\n\nexports.toSubList = (tree, ids) => {\n  const list = exports.toList(tree);\n  let min = list.length;\n  let max = 0;\n  ids.forEach(nodeId => {\n    const index = list.findIndex(node => node.id === nodeId);\n\n    if (index >= max) {\n      max = index;\n    }\n\n    if (index <= min) {\n      min = index;\n    }\n  });\n  return list.slice(min, max + 1);\n};\n/**\n * Get all of the nodes which are selected. Only the most compact selection is returned\n * i.e. if a node\'s folder is also selected then the node will not be returned.\n *\n * @param tree the tree as an array of `TreeNodes`.\n * @param ids the `NodeIds` that are selected.\n */\n\n\nexports.getSelectedNodeIds = (tree, ids) => {\n  const list = exports.toSubList(tree, ids).filter(node => ids.includes(node.id));\n  return exports.toTreeNodes(list).map(node => node.id);\n};\n\n//# sourceURL=webpack:///./src/NodeUtils.ts?')},"./src/Schema.ts":function(module,exports,__webpack_require__){"use strict";eval('\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.isDropAllowed = void 0;\n\nexports.isDropAllowed = (dragNode, dropNode, schema) => {\n  if (!schema) return true;\n  const accepts = schema.rules ? schema.rules[dropNode.type] : undefined;\n\n  if (accepts && accepts.length === 0) {\n    return false;\n  }\n\n  if (accepts && !accepts.includes(dragNode.type)) {\n    return false;\n  }\n\n  if (schema.isDropAllowed) {\n    return schema.isDropAllowed(dragNode, dropNode);\n  }\n\n  return true;\n};\n\n//# sourceURL=webpack:///./src/Schema.ts?')},"./src/SelectionState.ts":function(module,exports,__webpack_require__){"use strict";eval('\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.useSelectionState = void 0;\n\nconst react_1 = __webpack_require__(/*! react */ "react");\n\nconst NodeUtils_1 = __webpack_require__(/*! ./NodeUtils */ "./src/NodeUtils.ts");\n\nexports.useSelectionState = (tree, disabled, disableMultipleSelection, initialSelection = []) => {\n  const [selection, setSelection] = react_1.useState({\n    selected: initialSelection,\n    cut: [],\n    copied: []\n  });\n  const handleClick = react_1.useCallback((event, node) => {\n    if (disabled) {\n      return;\n    }\n\n    if (disableMultipleSelection) {\n      setSelection(current => Object.assign(Object.assign({}, current), {\n        selected: [node]\n      }));\n    } else if (event.shiftKey && !selection.selected.includes(node)) {\n      const selected = [node, ...selection.selected];\n      const range = NodeUtils_1.toSubList(tree, selected).map(node => node.id);\n      setSelection(current => Object.assign(Object.assign({}, current), {\n        selected: range\n      }));\n    } else if (event.metaKey) {\n      if (selection.selected.includes(node)) {\n        const selected = selection.selected.filter(selected => selected !== node);\n        setSelection(current => Object.assign(Object.assign({}, current), {\n          selected\n        }));\n      } else {\n        const selected = [node, ...selection.selected];\n        setSelection(current => Object.assign(Object.assign({}, current), {\n          selected\n        }));\n      }\n    } else {\n      setSelection(current => Object.assign(Object.assign({}, current), {\n        selected: [node]\n      }));\n    }\n  }, [tree, selection, disabled, disableMultipleSelection]);\n  return {\n    selection,\n    handleClick,\n    setSelection\n  };\n};\n\n//# sourceURL=webpack:///./src/SelectionState.ts?')},"./src/Tree.tsx":function(module,exports,__webpack_require__){"use strict";eval('\n\nvar __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {\n  if (k2 === undefined) k2 = k;\n  Object.defineProperty(o, k2, {\n    enumerable: true,\n    get: function () {\n      return m[k];\n    }\n  });\n} : function (o, m, k, k2) {\n  if (k2 === undefined) k2 = k;\n  o[k2] = m[k];\n});\n\nvar __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {\n  Object.defineProperty(o, "default", {\n    enumerable: true,\n    value: v\n  });\n} : function (o, v) {\n  o["default"] = v;\n});\n\nvar __importStar = this && this.__importStar || function (mod) {\n  if (mod && mod.__esModule) return mod;\n  var result = {};\n  if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n\n  __setModuleDefault(result, mod);\n\n  return result;\n};\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.Tree = exports.useTree = exports.TreeContext = void 0;\n\nconst react_1 = __importStar(__webpack_require__(/*! react */ "react"));\n\nconst Node_1 = __webpack_require__(/*! ./Node */ "./src/Node.ts");\n\nconst TreeElement_1 = __webpack_require__(/*! ./TreeElement */ "./src/TreeElement.tsx");\n\nconst SelectionState_1 = __webpack_require__(/*! ./SelectionState */ "./src/SelectionState.ts");\n\nconst NodeUtils_1 = __webpack_require__(/*! ./NodeUtils */ "./src/NodeUtils.ts");\n\nconst Keyboard_1 = __webpack_require__(/*! ./Keyboard */ "./src/Keyboard.ts");\n\nconst TreeUtils_1 = __webpack_require__(/*! ./TreeUtils */ "./src/TreeUtils.ts");\n\nexports.TreeContext = react_1.createContext(undefined);\n\nexports.useTree = () => react_1.useContext(exports.TreeContext);\n/**\n * See docs on `TreeProps`.\n */\n\n\nexports.Tree = props => {\n  const {\n    nodes,\n    renderElement,\n    onChange,\n    onPaste,\n    sortFunction,\n    disableDrag,\n    schema,\n    disableSelection,\n    disableMultiSelection,\n    disableCut,\n    disableCopy,\n    renderDragImage\n  } = props;\n  const treeNodes = NodeUtils_1.toTreeNodes(nodes);\n  const [dragId, setDragId] = react_1.useState();\n  const [overId, setOverId] = react_1.useState();\n\n  if (sortFunction) {\n    Node_1.sortTree(treeNodes, sortFunction);\n  }\n\n  const {\n    selection,\n    handleClick,\n    setSelection\n  } = SelectionState_1.useSelectionState(treeNodes, disableSelection, disableMultiSelection);\n  const selected = [...selection.selected, dragId];\n\n  const handlePasteNodes = () => {\n    const target = selection.selected[0];\n\n    if (target === undefined) {\n      return;\n    }\n\n    if (selection.cut.length) {\n      if (!onChange) {\n        return;\n      }\n\n      const changed = nodes.filter(node => selection.cut.includes(node.id));\n\n      if (TreeUtils_1.isMoveValid(nodes, changed.map(node => node.id), target, schema)) {\n        onChange(changed, "parentId", target);\n      }\n    } else {\n      if (!onPaste) {\n        return;\n      }\n\n      const changed = nodes.filter(node => selection.copied.includes(node.id));\n\n      if (TreeUtils_1.isMoveValid(nodes, changed.map(node => node.id), target, schema)) {\n        onPaste(changed, target);\n      }\n    }\n  };\n\n  const handleToggleCollapse = node => {\n    if (onChange) {\n      onChange([node], "expanded", !node.expanded);\n    }\n  };\n\n  Keyboard_1.useKeyboard(treeNodes, selection, setSelection, handlePasteNodes, handleToggleCollapse, !!disableCut, !!disableCopy);\n\n  const handleDrop = (dropped, target) => {\n    if (target !== undefined) {\n      const node = nodes.find(node => String(node.id) === String(dropped));\n\n      if (node && String(node.parentId) !== String(target)) {\n        if (onChange) {\n          const changedIds = NodeUtils_1.getSelectedNodeIds(treeNodes, [...selection.selected, dragId]);\n          const changed = changedIds.map(id => nodes.find(node => node.id === id));\n          onChange(changed, "parentId", target);\n        }\n      }\n    }\n\n    setOverId(undefined);\n    setDragId(undefined);\n  };\n\n  const handleOver = overId => {\n    if (TreeUtils_1.isMoveValid(nodes, selected, overId, schema)) {\n      setOverId(overId);\n    } else {\n      setOverId(undefined);\n    }\n  };\n\n  const renderTree = react_1.useCallback((nodes, depth = 0) => {\n    const result = [];\n    nodes.forEach(node => {\n      const nodeItem = renderElement(node, depth);\n      let children = [];\n\n      if (node.expanded === undefined || node.expanded) {\n        children = renderTree(node.children, depth + 1);\n      }\n\n      const props = {};\n\n      if (node.id === overId && overId !== node.parentId) {\n        props["data-rt-drop-valid"] = true;\n      }\n\n      result.push(react_1.default.createElement("div", Object.assign({\n        "data-rt-element-wrapper": node.id\n      }, props), react_1.default.createElement(TreeElement_1.TreeElement, {\n        node: node,\n        depth: depth\n      }, nodeItem), children));\n    });\n    return result;\n  }, [overId, renderElement]);\n  const tree = renderTree(treeNodes);\n  const value = {\n    overId,\n    handleDrag: setDragId,\n    handleOver,\n    handleDrop,\n    handleToggleCollapse,\n    disableDrag: !!disableDrag,\n    selection,\n    setSelection,\n    handleClick,\n    renderDragImage,\n    dragId\n  };\n  return react_1.default.createElement(exports.TreeContext.Provider, {\n    value: value\n  }, react_1.default.createElement("div", {\n    "data-rt-tree": true\n  }, tree));\n};\n\n//# sourceURL=webpack:///./src/Tree.tsx?')},"./src/TreeElement.tsx":function(module,exports,__webpack_require__){"use strict";eval('\n\nvar __importDefault = this && this.__importDefault || function (mod) {\n  return mod && mod.__esModule ? mod : {\n    "default": mod\n  };\n};\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.TreeElement = void 0;\n\nconst react_1 = __importDefault(__webpack_require__(/*! react */ "react"));\n\nconst TreeElementState_1 = __webpack_require__(/*! ./TreeElementState */ "./src/TreeElementState.ts");\n\nexports.TreeElement = props => {\n  const {\n    node,\n    children,\n    dragDisabled\n  } = props;\n  const {\n    id\n  } = node;\n  const elementProps = TreeElementState_1.useTreeElementState(props);\n  const draggable = !(node.dragDisabled || dragDisabled);\n  return react_1.default.createElement("div", Object.assign({\n    key: id,\n    draggable: draggable\n  }, elementProps), children);\n};\n\n//# sourceURL=webpack:///./src/TreeElement.tsx?')},"./src/TreeElementState.ts":function(module,exports,__webpack_require__){"use strict";eval('\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.useTreeElementState = void 0;\n\nconst Tree_1 = __webpack_require__(/*! ./Tree */ "./src/Tree.tsx");\n\nexports.useTreeElementState = props => {\n  const {\n    node,\n    depth,\n    dragDisabled\n  } = props;\n  const {\n    overId,\n    dragId,\n    handleDrag,\n    handleOver,\n    handleDrop,\n    disableDrag,\n    selection,\n    handleClick,\n    renderDragImage\n  } = Tree_1.useTree();\n\n  const onClick = event => {\n    handleClick(event, node.id);\n  };\n\n  const selected = selection.selected.includes(node.id);\n  const cut = selection.cut.includes(node.id);\n  const copied = selection.copied.includes(node.id);\n  const dragging = selection.selected.slice();\n\n  if (dragId !== undefined && !selection.selected.includes(dragId)) {\n    dragging.push(dragId);\n  }\n\n  const elementProps = {\n    "data-rt-element": node.id,\n    "data-rt-type": node.type,\n    "data-rt-depth": depth,\n    draggable: !dragDisabled,\n    onClick\n  };\n\n  if (selected) {\n    elementProps["data-rt-selected"] = true;\n  }\n\n  if (cut) {\n    elementProps["data-rt-cut"] = true;\n  }\n\n  if (copied) {\n    elementProps["data-rt-copied"] = true;\n  }\n\n  if (disableDrag) {\n    return {};\n  }\n\n  if (!dragDisabled && !node.dragDisabled) {\n    elementProps.onDragStart = event => {\n      event.dataTransfer.setData("text/rt-id", String(node.id));\n      event.dataTransfer.dropEffect = "move";\n\n      if (renderDragImage) {\n        event.dataTransfer.setDragImage(renderDragImage(dragging), 0, 0);\n      }\n\n      handleDrag(node.id);\n    };\n  }\n\n  elementProps.onDragOver = event => {\n    handleOver(node.id);\n    event.preventDefault();\n    event.dataTransfer.dropEffect = "move";\n  };\n\n  elementProps.onDragLeave = () => {\n    handleOver(undefined);\n  };\n\n  elementProps.onDrop = event => {\n    event.preventDefault();\n\n    if (overId !== undefined && overId === node.id) {\n      const id = event.dataTransfer.getData("text/rt-id");\n      handleDrop(id, node.id);\n    }\n  };\n\n  return elementProps;\n};\n\n//# sourceURL=webpack:///./src/TreeElementState.ts?')},"./src/TreeUtils.ts":function(module,exports,__webpack_require__){"use strict";eval('\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.isMoveValid = void 0;\n\nconst Schema_1 = __webpack_require__(/*! ./Schema */ "./src/Schema.ts");\n\nconst NodeUtils_1 = __webpack_require__(/*! ./NodeUtils */ "./src/NodeUtils.ts");\n\nexports.isMoveValid = (nodes, selection, overId, schema) => {\n  if (overId === undefined) {\n    return false;\n  } // eslint-disable-next-line no-restricted-syntax\n\n\n  for (const dragId of selection) {\n    // Don\'t allow drop on self\n    if (dragId === overId) {\n      return false;\n    }\n\n    const dragNode = nodes.find(node => node.id === dragId);\n\n    if (dragNode) {\n      if (dragNode.dragDisabled) {\n        return false;\n      } // Don\'t allow dropping into existing parent\n\n\n      if (dragNode.parentId === overId) {\n        return false;\n      }\n\n      const overNode = nodes.find(node => node.id === overId);\n\n      if (overNode) {\n        const search = NodeUtils_1.findTreeNodeById(dragId, NodeUtils_1.toTreeNodes(nodes));\n\n        if (search && search.node) {\n          const children = NodeUtils_1.toFlatNodes(search.node.children); // Don\'t allow dropping into a child node\n\n          if (children.find(child => child.id === overId)) {\n            return false;\n          }\n        } // Validate against schema, if set\n\n\n        if (!Schema_1.isDropAllowed(dragNode, overNode, schema)) {\n          return false;\n        }\n      }\n    }\n  }\n\n  return true;\n};\n\n//# sourceURL=webpack:///./src/TreeUtils.ts?')},react:function(module,exports){eval("module.exports = __WEBPACK_EXTERNAL_MODULE_react__;\n\n//# sourceURL=webpack:///external_%7B%22commonjs%22:%22react%22,%22commonjs2%22:%22react%22,%22amd%22:%22react%22,%22root%22:%22React%22,%22umd%22:%22react%22%7D?")}})}));