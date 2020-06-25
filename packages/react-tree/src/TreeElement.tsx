import React, { ReactNode } from "react";
import { TreeNode } from "./Node";
import { useTreeElementState } from "./TreeElementState";

export interface TreeElementProps {
  children: ReactNode;
  node: TreeNode;
  depth: number;
  dragDisabled?: boolean;
}

export const TreeElement = (props: TreeElementProps) => {
  const { node, children, dragDisabled } = props;
  const { id } = node;
  const elementProps = useTreeElementState(props);
  const draggable = !(node.dragDisabled || dragDisabled);
  return (
    <div key={id} draggable={draggable} role="treeitem" {...elementProps}>
      {children}
    </div>
  );
};
