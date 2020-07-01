# react-tree

An tiny, accessible React Tree component with a sensible API that supports sorting, drag & drop, keyboard navigation and cut/copy/paste while leaving the visual content entirely to the library user. 

This tree is intended for file systems and the like. It will be comfortable with thousands of nodes but is not virtualized and not intended for use with massive data sets. 

### Install

`npm i @mpkelly/react-tree`

### Demos

- [File browser demo](https://codesandbox.io/s/fervent-wave-u7psb?file=/src/file-browser/FileBrowser.tsx)
- Lazy children demo
- [Journal example](https://github.com/mpkelly/Journal/blob/ab927cb481f60459d50a58012b89795aa33bfa47/packages/journal/src/features/collections-tree/CollectionsTree.tsx#L39)

### Features

- [x] Tiny bundle size - 5.8kB gzipped
- [x] TypeScript & JavaScript support
- [x] Basic drag & drop support
- [x] Simple list data model
- [x] Support for toggling expand/collapse
- [x] Custom sorting functions
- [x] Simple, declarative Schema
- [x] Exports utilities for working with nodes
- [x] Multi-select and multi-drag and drop
- [x] Keyboard support, including navigating, selecting, copying/cutting and pasting
- [x] Implement W3C's [Tree View accessibility specification](https://www.w3.org/TR/wai-aria-practices/#TreeView)
- [ ] Dropping at precise locations in target

I wrote this for [Journal](https://github.com/mpkelly/Journal), another side-project of mine, and didn't need to drop a precise locations but may add this in future.

### Quick Start



```TypeScript

// Use `ScrollableTree` which wraps the `Tree` in a scroll container 
// but also fixes various scrolling/focusing quirks. 

import {ScrollableTree as Tree} from "@mpkelly/react-tree";

<Tree
  nodes={nodes}
  schema={FileSystemSchema}
  renderElement={renderElement}
  onChange={handleChange}
  onPaste={handlePaste}
  nameProperty="name"
/>
```

### API

#### Nodes

To make use of the tree you just need to provide an array of [FlatNodes](https://github.com/mpkelly/react-tree/blob/master/packages/react-tree/src/Node.ts).

```TypeScript

export type NodeId = string | number;
export type NodeType = string | number;

export interface Node {
  id: NodeId;
  type: NodeType;
  expanded?: boolean;
  dragDisabled?:boolean;
  [key: string]: any;
}

export interface FlatNode extends Node {
  parentId?: NodeId;
}

```

The key thing is that the Node has an `id` prop and, unless it's a root node, a `parentId` so that the library can construct a tree from it. Internally, `react-tree` converts your nodes into `TreeNodes` which it uses to render the tree.

#### Schema

Most trees will have some constraints and will require a `Schema`. React Tree has some built-in checks, for example, not allowing a parent to be dropped into a child, but you will typically need others and that's where the [Schema](https://github.com/mpkelly/react-tree/blob/master/packages/react-tree/src/Schema.ts) comes in. If your tree is for a file system, a Schema might look something like this:

```TypeScript
enum Type {
  File,
  Folder,
}

const FileSystemSchema: Schema = {
  rules: {
      //a folder accepts folders and files
      [Type.Folder]: [Type.Folder, Type.File],

      //empty array = accepts nothing
      [Type.File]: [],
  }
};

```

You would then declare your nodes like this:

```TypeScript
const flatNodes: FlatNode[] = [
  {
    id: 1,
    expanded: true,
    type: Type.Folder,
    
    //Note how FlatNode supports arbitrary properties
    name: "Folder one",
  },
  {
    id: 2,
    type: Type.File,
    parentId: 1,
    name: "File one",
  },
```

(a folder with one child of type file)

If you need to do more advanced validation that can't be easily described by simple type mapping then you can add a `isDropAllowed(dragNode, dropNode)` to your Schema object. This function is called after the internal sanity checks and rule checks are passed.

#### Expand / collapse

React Tree has a small helper component that helps you deal with toggling a node expanded/collapsed. It accepts any valid `ReactNode` as children as well as the `Node` being rendered. It is also accessible and uses `aria` attributes and responds to the `space` key. You can see the demos above for how to make use of this fully but the basic usage looks like:

```TypeScript
const FolderElement = (props: TreeElementProps) => {
  const { node, depth } = props;
  return (
    <div className="my-folder-item" style={{ paddingLeft: depth * 16 }}>
      <CollapseToggle node={node}>
        <ArrowIcon />
      </CollapseToggle>
       <span data-element-name>{node.name}</span>
    </div>
  );
};

```

#### Styling

React Tree doesn't provide styling because it doesn't render anything visible by itself but it does set some data attributes on wrapper elements. Here's some styling from one of the examples:

```CSS
 
// This attribute is set on a node when another node that it can accept as a child is dragged over it - you will want to use some visual indicator so the user knows they can release
[data-rt-drop-valid] {
  background-color: rgba(0, 0, 0, .1);
}

// Set on nodes which have been selected by clicking to using cursor.
// More than one node can be selected unless `disableMultipleSelection` is set.
[data-rt-selected] {
  background-color: rgba(0, 0, 0, .2);
}

// Attribute added to nodes that have been cut (ctrl+x) but not yet pasted
[data-rt-cut] {
  opacity: .4
}

// Attribute added to nodes that have been copied (ctrl+c) but not yet pasted
[data-rt-copied] {
  background-color: rgba(0, 0, 0, .05);
}

// Applied to the <TreeElement/> wrapper `div` which wraps the UI you render for each Node with `renderElement`
// This wrapper will include child <TreeElement/>s  if present
[data-rt-element-wrapper] {

}

// Applied to a single <TreeElement/> that you render for each Node with `renderElement`
[data-rt-element] {

}

// Output on the above wrappper allowing you target specific types
[data-rt-type="type"] {

}

// set on the <CollapseToggle/> wrapper with value true or false according to `Node.expanded`
[data-rt-collapsed="false"] {
  transform: rotate(90deg);
}

// always set on the <CollapseToggle/> wrapper element
[data-rt-collapse-toggle] {
  transition: transform .3s;
}

```

#### Deleting a node and all of its children

React Tree also exports some utilities that can help you delete a `FlatNode` and its children. An example:

```TypeScript
import {toTreeNodes, toFlatNodes, findTreeNodeById} from "@mpkelly/react-tree"
...

//Construct a tree from `FlatNode` array
const tree = toTreeNodes(nodes);

// Find the Node we want to delete - returns {node, parent}
const result = findTreeNodeById(idToDelete, tree);

if (result && result.node) {

  //Convert the sub-tree to a flat array and then convert that to an array of ids
  const ids = toFlatNodes([result.node]).map((node) => node.id);
 
  // Now just call your DB or API to delete them
  deleteAllById(ids);
}

```

#### Tree

View the full [Tree API](https://github.com/mpkelly/react-tree/blob/master/packages/react-tree/src/Tree.tsx).
