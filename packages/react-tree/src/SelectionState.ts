import React, { useState, useCallback } from "react";
import { NodeId, TreeNode } from "./Node";
import { toSubList } from "./NodeUtils";

export interface SelectionState {
  selected: NodeId[];
  cut: NodeId[];
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
        const selected = [node, ...selection.selected];
        const range = toSubList(tree, selected).map((node) => node.id);
        setSelection((current) => ({ ...current, selected: range }));
      } else if (event.metaKey) {
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
        setSelection((current) => ({ ...current, selected: [node] }));
      }
    },
    [tree, selection, disabled, disableMultipleSelection]
  );

  return { selection, handleClick, setSelection };
};
