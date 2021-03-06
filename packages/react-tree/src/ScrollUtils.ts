import scrollIntoView, {
  Options as ScrollOptions
} from "scroll-into-view-if-needed";
import { SelectionState } from "./SelectionState";
import { NodeId } from "./Node";

export const DefaultScrollOptions: ScrollOptions = {
  scrollMode: "if-needed",
  block: "nearest"
};

/**
 * Each time the selection moves to a new tree item, the browser will
 * scroll to that node. This scrolling is clunky by default and often uncessesary.
 * Using this utility function you avoid scrolling except when absolutely necessary
 * thanks to the package `scroll-into-view-if-needed`. You need to call
 * this method when `onSelectionChange` fires and pass in the `SelectionState`.
 * You also need to include a query selector for the scroll container the tree is in.
 *
 * @param selection the `SelectionState` passed to the  `onSelectionChange` callback.
 * @param selector the selector that uniquely identifies the tree's scroll container.
 * @param scrollOptions optional - the scroll options for
 * library `scroll-into-view-if-needed`. Default behaviour is to scroll to the `nearest`
 * point (start or end).
 */
export const scrollFocusedNodeIntoViewIfNecessary = (
  selection: SelectionState,
  selector: string,
  scrollOptions = DefaultScrollOptions
) => {
  const focused = selection.selected[0];
  if (selection.focused && focused !== undefined) {
    const element = document.querySelector(`[data-rt-element="${focused}"]`);
    if (element) {
      const container = document.querySelector(selector) as HTMLElement;
      if (container) {
        const { overflow } = container.style;
        let previousOverflow: string | null = null;
        if (overflow !== "hidden") {
          previousOverflow = overflow;
          container.style.overflow = "hidden";
        }
        setTimeout(() => {
          if (previousOverflow !== null) {
            container.style.overflow = previousOverflow;
          }

          if (element) {
            scrollIntoView(element, scrollOptions);
          }
        }, 1);
      }
    }
  }
};

/**
 * Disable scrolling until the next tick. You can call this in the handler passed
 * to `onChange` after a node has been collapsed as the browser will scroll to the
 * wrong point if it has a lot of children.
 *
 * @param selector the selector that uniquely identifies the tree's scroll container.
 */
export const disableScrollingUntilNextTick = (selector: string) => {
  const container = document.querySelector(selector) as HTMLElement;
  const { overflow } = container.style;
  if (overflow === "hidden") {
    return;
  }
  container.style.overflow = "hidden";
  setTimeout(() => {
    container.style.overflow = "auto";
  }, 1);
};

/**
 * Ensure a node is visible.
 *
 * @param id the `id` of the node to scroll to if necessary
 * @param scrollOptions the scroll options for
 * library `scroll-into-view-if-needed`. Default behaviour is to scroll to the `nearest`
 * point (start or end).
 */
export const ensureInView = (
  id: NodeId,
  scrollOptions = DefaultScrollOptions
) => {
  const element = document.querySelector(`[data-rt-element="${id}"]`);
  if (element) {
    scrollIntoView(element, scrollOptions);
  }
};
