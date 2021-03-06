import React, { ReactNode, SVGProps, useState, Fragment } from "react";
import { render } from "react-dom";
import {
  TreeNode,
  FlatNode,
  createAlphaNumericSort,
  ScrollableTree as Tree,
  CollapseToggle,
  Schema,
  NodeId,
  toFlatNodes
} from "../src";
import { SelectionState } from "../src/SelectionState";

enum Type {
  File,
  Folder
}

const FileSystemSchema: Schema = {
  rules: {
    [Type.Folder]: [Type.Folder, Type.File],
    [Type.File]: []
  }
};

let id = 0;

const flatNodes: FlatNode[] = [
  {
    id: id++,
    expanded: true,
    type: Type.Folder,
    name: "Folder one"
  },
  {
    id: id++,
    type: Type.File,
    parentId: 0,
    name: "File one"
  },
  {
    id: id++,
    type: Type.File,
    parentId: 0,
    name: "File two"
  },
  {
    id: id++,
    expanded: true,
    parentId: 0,
    type: Type.Folder,
    name: "Folder two"
  }
];

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
    <div
      data-tree-element
      data-id={node.id}
      style={{ paddingLeft: depth * 16 }}
    >
      {arrow} {icon} <span data-element-name>{node.name}</span>
    </div>
  );
};

const App = () => {
  const [nodes, setNodes] = useState(flatNodes);
  const [selection, setSelection] = useState<SelectionState>({
    focused: false,
    selected: [],
    cut: [],
    copied: []
  });

  const handleChange = (
    changed: FlatNode[],
    property: keyof FlatNode,
    value: any
  ) => {
    const next = nodes.slice();
    changed.forEach((changed) => {
      const node = next.find((node) => node.id == changed.id) as FlatNode;
      const nextNode = { ...node, [property]: value };
      next.splice(next.indexOf(node), 1, nextNode);
    });
    setNodes(next);
  };

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
      <Tree
        nodes={nodes}
        schema={FileSystemSchema}
        renderElement={renderElement}
        sortFunction={createAlphaNumericSort("name")}
        onChange={handleChange}
        onPaste={handlePaste}
        onSelectionChange={setSelection}
        nameProperty="name"
      />
      <div id="selected">{selection.selected.length}</div>
    </Fragment>
  );
};

render(<App />, document.getElementById("app"));
