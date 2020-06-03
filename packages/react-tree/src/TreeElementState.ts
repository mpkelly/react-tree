import React, { useCallback } from "react";
import { useTreeContext, TreeContextValue } from "./Tree";
import { TreeElementProps } from "./TreeElement";

type DragHandler = (event: React.DragEvent<HTMLDivElement>) => void;

export const useTreeElementState = (props: TreeElementProps) => {
  const { node, depth, dragDisabled } = props;
  const {
    overId,
    handleDrag,
    handleOver,
    handleDrop,
    readOnly,
  } = useTreeContext() as TreeContextValue;

  if (readOnly) {
    return {};
  }

  let onDragStart: DragHandler | undefined = undefined;
  if (!dragDisabled) {
    onDragStart = (event) => {
      event.dataTransfer.setData("text/rt-id", String(node.id));
      event.dataTransfer.dropEffect = "move";
      handleDrag(node.id);
    };
  }

  const onDragOver: DragHandler = (event) => {
    handleOver(node.id);
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onDragLeave: DragHandler = () => {
    handleOver(undefined);
  };

  const onDrop: DragHandler = useCallback(
    (event) => {
      event.preventDefault();
      if (overId !== undefined && overId == node.id) {
        const id = event.dataTransfer.getData("text/rt-id");
        handleDrop(id, node.id);
      }
    },
    [overId]
  );

  const elementProps: Object = {
    "data-rt-element": node.id,
    "data-rt-type": node.type,
    "data-rt-depth": depth,
    draggable: !dragDisabled,
    onDragStart,
    onDragOver,
    onDragLeave,
    onDrop,
  };

  return elementProps;
};
