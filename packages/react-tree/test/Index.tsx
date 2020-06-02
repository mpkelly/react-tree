import React, { ReactNode, SVGProps, useState } from "react";
import { render } from "react-dom";
import {
  TreeNode,
  FlatNode,
  createAlphaNumericSort,
  Tree,
  CollapseToggle,
  Schema,
} from "../src";

enum Type {
  File,
  Folder,
}

const FileSystemSchema: Schema = {
  rules: {
    [Type.Folder]: [Type.Folder, Type.File],
    [Type.File]: [],
  },
};

const flatNodes: FlatNode[] = [
  {
    id: 0,
    expanded: true,
    type: Type.Folder,
    name: "Folder one",
  },
  {
    id: 1,
    type: Type.File,
    parentId: 0,
    name: "File one",
  },
  {
    id: 2,
    type: Type.File,
    parentId: 0,
    name: "File two",
  },
  {
    id: 3,
    expanded: true,
    parentId: 0,
    type: Type.Folder,
    name: "Folder two",
  },
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

  const handleChange = (
    changed: FlatNode,
    property: keyof FlatNode,
    value: any
  ) => {
    setNodes((nodes) => {
      const next = nodes.slice();
      (next.find((node) => node.id == changed.id) as FlatNode)[
        property
      ] = value;
      return next;
    });
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
    <Tree
      nodes={nodes}
      schema={FileSystemSchema}
      renderElement={renderElement}
      sortFunction={createAlphaNumericSort("name")}
      onChange={handleChange}
    />
  );
};

render(<App />, document.getElementById("app"));
