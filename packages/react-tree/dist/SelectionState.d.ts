import React from "react";
import { NodeId, TreeNode } from "./Node";
export interface SelectionState {
    /**
     * This is true if a node in the tree has been focused by setting
     * `tabindex="0"`, otherwise false.
     */
    focused: boolean;
    /**
     * Node ids for nodes that have been selected by click or by cursor. Newly
     * selected nodes are at the start of the array.
     */
    selected: NodeId[];
    /**
     * Node ids for nodes that have been cut usign ctrl+x. Always empty if
     * `copied` is non-empty.
     */
    cut: NodeId[];
    /**
     * Node ids for nodes that have been cut usign ctrl+c. Always empty if
     * `cut` is non-empty.
     */
    copied: NodeId[];
}
declare type SetSelectionFunction = (selection: SelectionState) => SelectionState;
declare type handleSelectionChangeType = SelectionState | SetSelectionFunction;
export declare const useSelectionState: (tree: TreeNode[], onSelectionChange?: (selection: SelectionState) => void, disabled?: boolean, disableMultipleSelection?: boolean, initialSelection?: NodeId[]) => {
    selection: SelectionState;
    handleClick: (event: React.MouseEvent, node: NodeId) => void;
    handleSelectionChange: (change: handleSelectionChangeType) => void;
    handleBlur: () => void;
};
export {};
