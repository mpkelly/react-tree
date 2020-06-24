import { useEffect, useRef } from "react";
import { Node, TreeNode } from "./Node";
import { toList } from "./NodeUtils";
import { SelectionState } from "./SelectionState";

export const useKeyboard = (
  tree: TreeNode[],
  selection: SelectionState,
  handleSelectionChange: React.Dispatch<React.SetStateAction<SelectionState>>,
  handlePasteNodes: Function,
  handleToggleCollapse: (node: Node) => void,
  disableCut: boolean,
  disableCopy: boolean
) => {
  const steps = useRef<number>(0);
  const list = toList(tree);

  const handleChange = (event: KeyboardEvent, delta: number) => {
    const { selected } = selection;
    if (selected.length) {
      const index = list.findIndex((node) => node.id === selected[0]);
      const next = list[index + delta];
      if (next) {
        if (event.shiftKey) {
          if (
            (steps.current > 0 && delta === -1) ||
            (steps.current < 0 && delta === 1)
          ) {
            handleSelectionChange((current) => ({
              ...current,
              selected: selected.slice(1)
            }));
          } else {
            handleSelectionChange((current) => ({
              ...current,
              selected: [next.id, ...selected]
            }));
          }
          steps.current += delta;
        } else {
          steps.current = 0;
          handleSelectionChange((current) => ({
            ...current,
            selected: [next.id]
          }));
        }
      }
    }
  };

  const handleCut = (event: KeyboardEvent) => {
    if (disableCut) {
      return;
    }
    if (event.metaKey && selection.selected.length) {
      event.preventDefault();
      handleSelectionChange((current) => ({
        ...current,
        copied: [],
        cut: selection.selected.slice()
      }));
    }
  };

  const handleCopy = (event: KeyboardEvent) => {
    if (disableCopy) {
      return;
    }
    if (event.metaKey && selection.selected.length) {
      event.preventDefault();
      handleSelectionChange((current) => ({
        ...current,
        cut: [],
        copied: selection.selected.slice()
      }));
    }
  };

  const handleEscape = () => {
    handleSelectionChange((current) => ({
      ...current,
      copied: [],
      cut: []
    }));
  };

  const handlePaste = (event: KeyboardEvent) => {
    if ((event.metaKey && selection.cut.length) || selection.copied.length) {
      handlePasteNodes();
      handleEscape();
    }
  };

  const handleSpace = () => {
    if (selection.selected.length) {
      const selected = list.find((node) => node.id === selection.selected[0]);
      if (selected) {
        handleToggleCollapse(selected);
      }
    }
  };

  /** esline-disable react-hooks/exhaustive-deps */
  const handleKey = (event: KeyboardEvent) => {
    if (document.activeElement !== document.body) {
      // Ignore key events if other nodes are focused. Might need
      // make this an API option.
      return;
    }
    switch (event.key) {
      case "ArrowDown":
        handleChange(event, 1);
        break;
      case "ArrowUp":
        handleChange(event, -1);
        break;
      case "x":
        handleCut(event);
        break;
      case "c":
        handleCopy(event);
        break;
      case "v":
        handlePaste(event);
        break;
      case "Escape":
        handleEscape();
        break;
      case " ":
        handleSpace();
        break;
      // no default
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  });
};
