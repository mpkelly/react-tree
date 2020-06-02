# react-tree

A React Tree that supports drag and drop. I wrote this out of frustration after trying several other trees. In total I must have used 5-6 trees for React but none of them felt quite right: some were too buggy and others had whacky data models or didn't allow me to do X.

### Install

`npm i @mpkelly/react-tree`

### Demoes

- [Simple demo](https://codesandbox.io/s/fervent-wave-u7psb?file=/src/App.tsx)
- Lazy children demo
- [Journal example](https://github.com/mpkelly/Journal/blob/master/packages/journal/src/features/collections-tree/CollectionsTree.tsx)

### Features

- [x] Tiny bundle size - zero dependencies other than React
- [x] TypeScript & JavaScript support
- [x] Basic drag & drop support
- [x] Simple list data model
- [x] Support for toggling expand/collapse
- [x] Custom sorting functions
- [x] Simple, declarative Schema
- [x] Exports utilities for working with nodes
- [ ] Dropping at precise locations in target
- [ ] Multi-select and multi-drag and drop
- [ ] Keyboard support and better a11y
- [ ] Performance testing and optimisation

I wrote this for [Journal](https://github.com/mpkelly/Journal), another side-project of mine, and didn't immediately add the last few features but they will be added once I have relaunched Journal this month.

### API

#### Nodes

To make use of the tree you just need to provide an array of `FlatNodes`.

```TypeScript

export type NodeId = string | number;
export type NodeType = string | number;

export interface Node {
  id: NodeId;
  type: NodeType;
  expanded?: boolean;
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
      //a folder accepts folders and other files
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
    
    //Note how FlatNode supports any additional properties you need
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

React Tree has a small helper component that helps you deal with toggling a node expanded/collapsed. It accepts any valid `ReactNode` as children as well as the `Node` being rendered. You can see the demoes above for how to make use of this fully but the basic usage looks like:

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

React Tree doesn't provide styling because it doesn't render anything by itself but it does set some data attributes on wrapper elements. Here's some styling from one of the examples:

```CSS
 
    // This property is set on a node when another node that it can accept as a child is dragged over it - you will want to use some visual indicator so the user knows they can release
    [data-rt-drop-valid] {
      background-color: rgba(0, 0, 0, .1);
    }

    // Applied to the <TreeElement/> wrapper which wraps the UI you render for each Node with `renderElement`
    // This wrapper will include children to if present
    [data-rt-element-wrapper] {

    }

    // Output on the above wrappper allowing you target specific types
    [data-rt-type="type"] {

    }

    // Also output on the wrapper with the node's depth in the tree
    [data-rt-depth="0"] {

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

#### Mutating your state

The `onChange` callback should look something like this:

```TypeScript
  const handleChange = (
    changed: FlatNode,
    property: keyof FlatNode,
    value: any
  ) => {
    const nextNode = {...node, [property]:value};
   
    //call setState or whatever
    handleNodeChange(nextNode);
  };
```

React Tree also exports some utilities that can help you delete a `FlatNode` and its children. An example:

```TypeScript

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

The Tree API. Note how most properties are optional

```TypeScript
export interface TreeProps {

  // Your node array from the DB or API
  nodes: FlatNode[];  
 
  // A function that renders your node. You can easily convert the depth into horizontal padding
  renderElement(node: TreeNode, depth: number): JSX.Element;

  // Change events are fired when the `expanded` property changes or the `parentId` changes
  onChange?(node: FlatNode, property: keyof FlatNode, value: any): void;
 
  // You will typical want to set this using the exported `createAlphaNumericSort` function e.g. `createAlphaNumericSort("name") to sort your items by the Node's name property. If not set items will be appended into their new parent
  sortFunction?: TreeNodeSort;
 
  // Disable drag and drop
  readOnly?: boolean;
 
  // Schema is optional but without one all nodes will accept all other nodes as children
  schema?: Schema;
}
```
