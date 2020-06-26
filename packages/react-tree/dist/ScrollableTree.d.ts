import { CSSProperties } from "react";
import { TreeProps } from "./Tree";
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
/**
 *
 * A `Tree` wrapped in a scroll container. It handles some of the browser's
 * scrolling quirks for you.
 */
export declare const ScrollableTree: (props: ScrollableTreeProps) => JSX.Element;
