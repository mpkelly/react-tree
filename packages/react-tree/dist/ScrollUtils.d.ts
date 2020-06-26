import { Options as ScrollOptions } from "scroll-into-view-if-needed";
import { SelectionState } from "./SelectionState";
import { NodeId } from "./Node";
export declare const DefaultScrollOptions: ScrollOptions;
/**
 * Each time the selection moves to a new tree item, the browser will
 * scroll to that node. This scrolling is clunky by default and often uncessesary.
 * Using this utility function you avoid scrolling except when absolutely necessary
 * thanks to the package `scroll-into-view-if-needed`. You need to call
 * this method when `onSelectionState` fires and pass in the `SelectionState`.
 * You also need to include a query selector for the scroll container.
 *
 * @param selection the `SelectionState` passed to the  `onSelectionState` callback.
 * @param selector the selector that uniquely identifies the tree's scroll container.
 * @param scrollOptions optional - the scroll options for
 * library `scroll-into-view-if-needed`. Default behaviour is to scroll to the `nearest`
 * point (start or end).
 */
export declare const scrollFocusedNodeIntoViewIfNecessary: (selection: SelectionState, selector: string, scrollOptions?: ScrollOptions<any>) => void;
/**
 * Disable scrolling until the next tick. You can call this in the handler passed
 * to `onChange` after a node has been collapsed as the browser will scroll to the
 * wrong point if it has a lot of children.
 *
 * @param selector the selector that uniquely identifies the tree's scroll container.
 */
export declare const disableScrollingUntilNextTick: (selector: string) => void;
/**
 * Ensure a node is visible.
 *
 * @param id the `id` of the node to scroll to if necessary
 * @param scrollOptions the scroll options for
 * library `scroll-into-view-if-needed`. Default behaviour is to scroll to the `nearest`
 * point (start or end).
 */
export declare const ensureInView: (id: NodeId, scrollOptions?: ScrollOptions<any>) => void;
