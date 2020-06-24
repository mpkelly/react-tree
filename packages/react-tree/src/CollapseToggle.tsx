/* eslint-disable jsx-a11y/click-events-have-key-events */
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
      onClick={() => handleToggleCollapse(node)}
      data-rt-collapse-toggle
      aria-pressed={collapsed}
      tabIndex={0}
      role="button"
    >
      {children}
    </div>
  );
};
