import { useEffect, useRef } from "react";
import { Node, TreeNode, NodeId, FlatNode } from "./Node";
import { toList, findTreeNodeById } from "./NodeUtils";
import { SelectionState } from "./SelectionState";

/**
 * Most of this functionality is based on the W3C ARIA specification for
 * Treeviews.
 *
 * https://www.w3.org/TR/wai-aria-practices/examples/treeview/treeview-1/treeview-1b.html#kbd_label
 */
export const useKeyboard = (
  tree: TreeNode[],
  selection: SelectionState,
  filterProperty: keyof FlatNode,
  handleSelectionChange: React.Dispatch<React.SetStateAction<SelectionState>>,
  handlePasteNodes: Function,
  handleToggleCollapse: (node: Node) => void,
  disableCut: boolean,
  disableCopy: boolean
) => {
  const steps = useRef<number>(0);
  const list = toList(tree, false);

  const handleSingleSelect = (id: NodeId) => {
    steps.current = 0;
    handleSelectionChange((current) => ({
      ...current,
      selected: [id]
    }));
  };

  const handleVerticalMove = (event: KeyboardEvent, delta: number) => {
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
          handleSingleSelect(next.id);
        }
      }
    }
  };

  const handleHorizontalMove = (event: KeyboardEvent, delta: number) => {
    const { selected } = selection;
    if (selected.length) {
      const result = findTreeNodeById(selected[0], tree);
      const focused = result?.node;
      if (focused) {
        // Left or up
        if (delta === -1) {
          if (focused.children.length && focused.expanded) {
            handleToggleCollapse(focused);
          } else {
            handleVerticalMove(event, -1);
          }
          // Right or down
        } else if (focused.children.length && !focused.expanded) {
          handleToggleCollapse(focused);
        } else {
          handleVerticalMove(event, 1);
        }
      }
    }
  };

  const handleMoveToStart = () => {
    handleSingleSelect(list[0].id);
  };

  const handleMoveToEnd = () => {
    handleSingleSelect(list[list.length - 1].id);
  };

  const handleCut = (event: KeyboardEvent) => {
    if (disableCut) {
      return;
    }
    if (selection.selected.length) {
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
    if (selection.selected.length) {
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
    if (selection.cut.length || selection.copied.length) {
      event.preventDefault();
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

  const handleExpandCurrentLevel = () => {
    const result = findTreeNodeById(selection.selected[0], tree);
    if (result) {
      const { node, parent } = result;
      if (parent) {
        parent.children.forEach((child) => {
          if (child.children.length && !child.expanded) {
            handleToggleCollapse(child);
          }
        });
      } else if (node && !node?.expanded) {
        handleToggleCollapse(node);
      }
    }
  };

  const handleSearch = (key: string) => {
    const index =
      list.findIndex((node) => node.id === selection.selected[0]) + 1;
    const search = key.toLowerCase();
    let next = list.slice(index).find((node) => {
      const name = String(node[filterProperty]).toLowerCase();
      return name.startsWith(search);
    });
    if (!next) {
      next = list.slice(0, index).find((node) => {
        const name = String(node[filterProperty]).toLowerCase();
        return name.startsWith(search);
      });
    }
    if (next) {
      handleSelectionChange((current) => ({
        ...current,
        selected: [(next as FlatNode).id]
      }));
    }
  };

  /** esline-disable react-hooks/exhaustive-deps */
  const handleKey = (event: KeyboardEvent) => {
    if (!selection.focused) {
      return;
    }
    switch (event.key) {
      case "ArrowDown":
        handleVerticalMove(event, 1);
        break;
      case "ArrowUp":
        handleVerticalMove(event, -1);
        break;
      case "ArrowLeft":
        handleHorizontalMove(event, -1);
        break;
      case "ArrowRight":
        handleHorizontalMove(event, 1);
        break;
      case "Home":
        handleMoveToStart();
        break;
      case "End":
        handleMoveToEnd();
        break;
      case "Escape":
        handleEscape();
        break;
      case " ":
        handleSpace();
        break;
      case "*":
        handleExpandCurrentLevel();
        break;
      default:
        if (event.metaKey) {
          switch (event.key) {
            case "x":
              handleCut(event);
              break;
            case "c":
              handleCopy(event);
              break;
            case "v":
              handlePaste(event);
              break;
            default:
              handleSearch(event.key);
          }
        } else {
          handleSearch(event.key);
        }
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
