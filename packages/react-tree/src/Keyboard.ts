import { useEffect, useRef } from "react";
import { TreeNode } from "./Node";
import { toList } from "./NodeUtils";
import { SelectionState } from "./SelectionState";

export const useKeyboard = (
  tree: TreeNode[],
  selection: SelectionState,
  setSelection: React.Dispatch<React.SetStateAction<SelectionState>>,
  handlePasteNodes: Function,
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
            setSelection((current) => ({
              ...current,
              selected: selected.slice(1),
            }));
          } else {
            setSelection((current) => ({
              ...current,
              selected: [next.id, ...selected],
            }));
          }
          steps.current += delta;
        } else {
          steps.current = 0;
          setSelection((current) => ({ ...current, selected: [next.id] }));
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
      setSelection((current) => ({
        ...current,
        copied: [],
        cut: selection.selected.slice(),
      }));
    }
  };

  const handleCopy = (event: KeyboardEvent) => {
    if (disableCopy) {
      return;
    }
    if (event.metaKey && selection.selected.length) {
      event.preventDefault();
      setSelection((current) => ({
        ...current,
        cut: [],
        copied: selection.selected.slice(),
      }));
    }
  };

  const handlePaste = (event: KeyboardEvent) => {
    if ((event.metaKey && selection.cut.length) || selection.copied.length) {
      handlePasteNodes();
      handleEscape();
    }
  };

  const handleEscape = () => {
    setSelection((current) => ({
      ...current,
      copied: [],
      cut: [],
    }));
  };

  const handleKey = (event: KeyboardEvent) => {
    switch (event.key) {
      case "ArrowDown":
        return handleChange(event, 1);
      case "ArrowUp":
        return handleChange(event, -1);
      case "x":
        return handleCut(event);
      case "c":
        return handleCopy(event);
      case "v":
        return handlePaste(event);
      case "Escape":
        return handleEscape();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [selection]);
};
