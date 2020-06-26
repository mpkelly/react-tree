import React, { CSSProperties, useRef } from "react";
import { TreeProps, Tree } from "./Tree";
import { SelectionState } from "./SelectionState";
import {
  scrollFocusedNodeIntoViewIfNecessary,
  disableScrollingUntilNextTick,
  ensureInView
} from "./ScrollUtils";
import { FlatNode } from "./Node";

export interface ScrollableTreeProps extends TreeProps {
  /**
   * Style to be applied to the scroll container div.
   */
  style?: CSSProperties;
  /**
   * An optional ID to be set on the scroll container div.
   */
  id?: string;
  /**
   * Scroll options to be passed to the library `scroll-into-view-if-needed`.
   */
  scrollOptions?: ScrollOptions;
}

let count = 1;
/**
 *
 * A `Tree` wrapped in a scroll container. It handles some of the browser's
 * scrolling quirks for you.
 */
export const ScrollableTree = (props: ScrollableTreeProps) => {
  const {
    id,
    style,
    scrollOptions,
    onChange,
    onSelectionChange,
    ...rest
  } = props;
  const { current: containerId } = useRef(id || `reacttree${count++}`);
  const allStyle = { ...(style || {}), overflow: "auto" };

  const handleSelectionChange = (selection: SelectionState) => {
    if (onSelectionChange) {
      onSelectionChange(selection);
    }
    scrollFocusedNodeIntoViewIfNecessary(
      selection,
      `#${containerId}`,
      scrollOptions
    );
  };

  const handleChange = (
    nodes: FlatNode[],
    property: keyof FlatNode,
    value: any,
    selection: SelectionState
  ) => {
    if (onChange) {
      onChange(nodes, property, value, selection);
    }
    disableScrollingUntilNextTick(`#${containerId}`);
    const focused = selection.selected[0];
    ensureInView(focused);
  };

  return (
    <div id={containerId} style={allStyle}>
      <Tree
        onChange={handleChange}
        onSelectionChange={handleSelectionChange}
        {...rest}
      />
    </div>
  );
};
