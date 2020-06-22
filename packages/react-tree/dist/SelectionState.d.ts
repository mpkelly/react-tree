import React from "react";
import { NodeId, TreeNode } from "./Node";
export interface SelectionState {
    selected: NodeId[];
    cut: NodeId[];
    copied: NodeId[];
}
export declare const useSelectionState: (tree: TreeNode[], disabled?: boolean, disableMultipleSelection?: boolean, initialSelection?: NodeId[]) => {
    selection: SelectionState;
    handleClick: (event: React.MouseEvent, node: NodeId) => void;
    setSelection: React.Dispatch<React.SetStateAction<SelectionState>>;
};
