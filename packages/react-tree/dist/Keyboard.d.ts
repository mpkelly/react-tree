import { Node, TreeNode } from "./Node";
import { SelectionState } from "./SelectionState";
export declare const useKeyboard: (tree: TreeNode[], selection: SelectionState, handleSelectionChange: React.Dispatch<React.SetStateAction<SelectionState>>, handlePasteNodes: Function, handleToggleCollapse: (node: Node) => void, disableCut: boolean, disableCopy: boolean) => void;
