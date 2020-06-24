import React, { useState, useCallback } from "react";
import { NodeId, TreeNode } from "./Node";
import { toSubList } from "./NodeUtils";

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

export const useSelectionState = (
  tree: TreeNode[],
  disabled?: boolean,
  disableMultipleSelection?: boolean,
  initialSelection: NodeId[] = []
) => {
  const [selection, setSelection] = useState<SelectionState>({
    selected: initialSelection,
    cut: [],
    copied: []
  });

  const handleClick = useCallback(
    (event: React.MouseEvent, node: NodeId) => {
      if (disabled) {
        return;
      }
      if (disableMultipleSelection) {
        setSelection((current) => ({ ...current, selected: [node] }));
      } else if (event.shiftKey && !selection.selected.includes(node)) {
        // Increase the selection from the last selected node to the
        // last clicked node selecting every intermediate node.
        const selected = [node, ...selection.selected];
        const range = toSubList(tree, selected).map((node) => node.id);
        setSelection((current) => ({ ...current, selected: range }));
      } else if (event.metaKey) {
        // if selected then deselect, else select.
        if (selection.selected.includes(node)) {
          const selected = selection.selected.filter(
            (selected) => selected !== node
          );
          setSelection((current) => ({ ...current, selected }));
        } else {
          const selected = [node, ...selection.selected];
          setSelection((current) => ({ ...current, selected }));
        }
      } else {
        // Node modifier key used so the selection is just the node that
        // was clicked.
        setSelection((current) => ({ ...current, selected: [node] }));
      }
    },
    [tree, selection, disabled, disableMultipleSelection]
  );

  return { selection, handleClick, setSelection };
};
