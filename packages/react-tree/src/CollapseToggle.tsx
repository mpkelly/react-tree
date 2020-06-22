import React, { ReactNode } from "react";
import { TreeNode } from "./Node";
import { useTree, TreeContextValue } from "./Tree";

export interface CollapseToggleProps {
  children: ReactNode;
  node: TreeNode;
}

/**
 * Wraps any valid `ReactNode` and provides a click handler for
 * toggling between expanded/collapsed state. You should wrap your angle
 * bracket icon or whatever with this.
 */
export const CollapseToggle = (props: CollapseToggleProps) => {
  const { children, node } = props;
  const collapsed = !node.expanded;
  const { handleToggleCollapse } = useTree() as TreeContextValue;
  if (!handleToggleCollapse) {
    throw Error(
      "It looks like you're trying to use CollapseToggle outside of the <Tree/> scope"
    );
  }
  return (
    <div
      data-rt-collapse-toggle
      data-rt-collapsed={collapsed}
      onClick={() => handleToggleCollapse(node)}
    >
      {children}
    </div>
  );
};
