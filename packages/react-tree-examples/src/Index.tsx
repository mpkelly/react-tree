import React, {
  ReactNode,
  SVGProps,
  useState,
  useCallback,
  Fragment,
} from "react";
import { render } from "react-dom";
import {
  TreeNode,
  FlatNode,
  createAlphaNumericSort,
  ScrollableTree,
  CollapseToggle,
  Schema,
  NodeId,
  toFlatNodes,
  SelectionState,
  scrollFocusedNodeIntoViewIfNecessary,
  disableScrollingUntilNextTick,
} from "@mpkelly/react-tree";

// THE DATA

enum Type {
  File,
  Folder,
}

const FileSystemSchema: Schema = {
  rules: {
    [Type.Folder]: [Type.Folder, Type.File],
    //empty array = accepts nothing
    [Type.File]: [],
  },
};

let id = 0;

const flatNodes: FlatNode[] = [
  {
    id: id++,
    expanded: true,
    type: Type.Folder,
    //FlatNode supports any additional properties you need
    name: "Folder one",
  },
  {
    id: id++,
    type: Type.File,
    parentId: 0,
    name: "File one",
  },
  {
    id: id++,
    type: Type.File,
    parentId: 0,
    name: "File two",
  },
  {
    id: id++,
    expanded: true,
    parentId: 0,
    type: Type.Folder,
    name: "Folder two",
  },
  {
    id: id++,
    type: Type.File,
    parentId: 3,
    name: "File three",
  },
  {
    id: id++,
    type: Type.File,
    parentId: 3,
    name: "File four",
  },
  {
    id: id++,
    type: Type.File,
    parentId: 3,
    name: "File five",
  },
  {
    id: id++,
    type: Type.File,
    parentId: 3,
    name: "File six",
  },
];

// THE UI

const ArrowRightIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    data-arrow
    {...props}
  >
    <path
      d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"
      fill="currentColor"
    />
  </svg>
);

const FolderIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    data-folder
  >
    <path
      d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"
      fill="currentColor"
    />
  </svg>
);

const FileIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    data-file
  >
    <path
      d="M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z"
      fill="currentColor"
    />
  </svg>
);

type TreeElementProps = {
  node: TreeNode;
  icon: ReactNode;
  depth: number;
};

const TreeElement = (props: TreeElementProps) => {
  const { node, icon, depth } = props;

  let arrow: ReactNode | null = null;

  if (node.type === Type.Folder) {
    arrow = (
      <CollapseToggle node={node}>
        <ArrowRightIcon />
      </CollapseToggle>
    );
  }

  return (
    <div data-tree-element style={{ paddingLeft: depth * 16 }}>
      {arrow} {icon} <span data-element-name>{node.name}</span>
    </div>
  );
};

// THE STYLE - see index.html

const App = () => {
  const [nodes, setNodes] = useState(flatNodes);

  //Only two things can change: 'parentId' and 'expanded'
  const handleChange = useCallback(
    (changed: FlatNode[], property: keyof FlatNode, value: any) => {
      const next = nodes.slice();
      changed.forEach((changed) => {
        const node = next.find((node) => node.id == changed.id) as FlatNode;
        const nextNode = { ...node, [property]: value };
        next.splice(next.indexOf(node), 1, nextNode);
      });
      setNodes(next);
    },
    [nodes]
  );

  const handlePaste = (newNodes: TreeNode[], parentId: NodeId) => {
    const updateIds = (nodes: TreeNode[], parentId: NodeId) => {
      nodes.forEach((node) => {
        //Assign a unique id for every new node
        node.id = id++;
        // link to parent
        node.parentId = parentId;
        // Update children and pass this node's new id as the parentId
        updateIds(node.children, node.id);
      });
    };
    updateIds(newNodes, parentId);

    setNodes((nodes) => nodes.concat(toFlatNodes(newNodes, parentId)));
  };

  const handleAddNodes = () => {
    const newNodes: FlatNode[] = [];

    Array.from({ length: 10 }).forEach((_folder) => {
      const folderId = id++;
      const folder = {
        id: folderId,
        expanded: true,
        parentId: 0,
        type: Type.Folder,
        name: "Folder " + folderId,
      };
      nodes.push(folder);
      Array.from({ length: 99 }).forEach((_file) => {
        const nextId = id++;
        const file = {
          id: nextId,
          parentId: folderId,
          expanded: true,
          type: Type.File,
          name: "File " + nextId,
        };
        nodes.push(file);
      });
    });

    setNodes((nodes) => nodes.concat(newNodes));
  };

  const renderElement = (node: TreeNode, depth: number) => {
    switch (node.type) {
      case Type.Folder:
        return <TreeElement node={node} depth={depth} icon={<FolderIcon />} />;
      case Type.File:
        return <TreeElement node={node} depth={depth} icon={<FileIcon />} />;
    }
    throw Error("Node not handled: " + node.type);
  };

  return (
    <Fragment>
      <button onClick={handleAddNodes} style={{ margin: 8 }}>
        add 1000 nodes
      </button>
      <ScrollableTree
        nodes={nodes}
        schema={FileSystemSchema}
        renderElement={renderElement}
        sortFunction={createAlphaNumericSort("name")}
        onChange={handleChange}
        onPaste={handlePaste}
        nameProperty="name"
        style={{ height: 500, padding: 8, maxWidth: 240 }}
      />
    </Fragment>
  );
};

render(<App />, document.getElementById("app"));
