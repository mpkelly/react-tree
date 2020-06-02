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
  const { node, children } = props;
  const { id } = node;
  const elementProps = useTreeElementState(props);
  return (
    <div key={id} draggable {...elementProps}>
      {children}
    </div>
  );
};
