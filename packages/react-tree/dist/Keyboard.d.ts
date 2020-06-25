import { Node, TreeNode, FlatNode } from "./Node";
import { SelectionState } from "./SelectionState";
/**
 * Most of this functionality is based on the W3C ARIA specification for
 * Treeviews.
 *
 * https://www.w3.org/TR/wai-aria-practices/examples/treeview/treeview-1/treeview-1b.html#kbd_label
 */
export declare const useKeyboard: (tree: TreeNode[], selection: SelectionState, filterProperty: keyof FlatNode, handleSelectionChange: React.Dispatch<React.SetStateAction<SelectionState>>, handlePasteNodes: Function, handleToggleCollapse: (node: Node[]) => void, disableCut: boolean, disableCopy: boolean) => void;
