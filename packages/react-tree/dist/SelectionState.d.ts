import React from "react";
import { NodeId, TreeNode } from "./Node";
export interface SelectionState {
    /**
     * Node ids for nodes that have been selected by click or by cursor.
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
export declare const useSelectionState: (tree: TreeNode[], disabled?: boolean, disableMultipleSelection?: boolean, initialSelection?: NodeId[]) => {
    selection: SelectionState;
    handleClick: (event: React.MouseEvent, node: NodeId) => void;
    setSelection: React.Dispatch<React.SetStateAction<SelectionState>>;
};
