import { ReactNode } from "react";
import { TreeNode } from "./Node";
export interface CollapseToggleProps {
    children: ReactNode;
    node: TreeNode;
}
/**
 * Wraps any valid `ReactNode` and provides a click handler for
 * toggling between expanded/collapsed state. You should wrap your angle
 * bracket icon or whatever with this.
 */
export declare const CollapseToggle: (props: CollapseToggleProps) => JSX.Element;
