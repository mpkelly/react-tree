import React, { useCallback } from "react";
import { TreeElementProps } from "./TreeElement";
import { TreeContextValue, useTree } from "./Tree";

export const useTreeElementState = (props: TreeElementProps) => {
  const { node, depth, dragDisabled } = props;
  const {
    overId,
    dragId,
    handleDrag,
    handleOver,
    handleDrop,
    disableDrag,
    selection,
    handleClick,
    renderDragImage,
  } = useTree() as TreeContextValue;

  const onClick = (event: React.MouseEvent) => {
    handleClick(event, node.id);
  };

  const selected = selection.selected.includes(node.id);
  const cut = selection.cut.includes(node.id);
  const copied = selection.copied.includes(node.id);
  const dragging = selection.selected.slice();

  if (dragId !== undefined && !selection.selected.includes(dragId)) {
    dragging.push(dragId);
  }

  const elementProps: any = {
    "data-rt-element": node.id,
    "data-rt-type": node.type,
    "data-rt-depth": depth,
    draggable: !dragDisabled,
    onClick,
  };

  if (selected) {
    elementProps["data-rt-selected"] = true;
  }

  if (cut) {
    elementProps["data-rt-cut"] = true;
  }

  if (copied) {
    elementProps["data-rt-copied"] = true;
  }

  if (disableDrag) {
    return {};
  }

  if (!dragDisabled && !node.dragDisabled) {
    elementProps.onDragStart = (event: React.DragEvent) => {
      event.dataTransfer.setData("text/rt-id", String(node.id));
      event.dataTransfer.dropEffect = "move";
      if (renderDragImage) {
        event.dataTransfer.setDragImage(renderDragImage(dragging), 0, 0);
      }
      handleDrag(node.id);
    };
  }

  elementProps.onDragOver = (event: React.DragEvent) => {
    handleOver(node.id);
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  elementProps.onDragLeave = () => {
    handleOver(undefined);
  };

  elementProps.onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      if (overId !== undefined && overId == node.id) {
        const id = event.dataTransfer.getData("text/rt-id");
        handleDrop(id, node.id);
      }
    },
    [overId]
  );

  return elementProps;
};
