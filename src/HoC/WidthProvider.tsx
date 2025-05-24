/** Provides a Grid Layout SSR-compatible Width Provider */

import * as React from "react";
// import ResizeObserver from "resize-observer-polyfill";
import clsx from "clsx";


type WPState = {
    width: number
};
import {
    // WidthProvider,
    Responsive,
    type ResponsiveProps,
  } from "react-grid-layout";


type AddedProps = {
    // hoc adds new prop to ResponsiveProps
    measureBeforeMount?: boolean;
};

// CONSTANTS
const layoutClassName = "react-grid-layout";
const serverSizeWidth = 1280;

/*
 * A simple HOC that provides facility for listening to container resizes.
 */
export default function WidthProvideRGL<Props extends {
    // explicitly typecheck what props are required by the inner component passed to hoc
    innerRef?: React.Ref<HTMLDivElement | null>;
    width?: number;
    className?: string;
}> (
    ComposedComponent: React.ComponentType<Props>
): React.ComponentType<Props & AddedProps> {
    return class WidthProvider extends React.Component<
        Props & AddedProps,
        WPState
    > {
        static defaultProps: Partial<Props & AddedProps> = {
            measureBeforeMount: false
        } as Partial<Props & AddedProps>;

        state: WPState = {
            width: serverSizeWidth,
        };

        elementRef = React.createRef<HTMLDivElement>();
        mounted = false;
        resizeObserver: ResizeObserver | undefined

        // SAVE Node Width to State and observe resize changes
        componentDidMount() {
            // prevent SSR from skipping this component by checking if window is defined
            if (typeof window !== "undefined") {
                this.mounted = true;
                this.resizeObserver = new ResizeObserver(entries => {
                    const node = this.elementRef.current;
                    if (node instanceof HTMLElement) {
                        const width = entries[0].contentRect.width;
                        this.setState({ width });
                    }
                });
                const node = this.elementRef.current;
                if (node instanceof HTMLElement) {
                    this.resizeObserver.observe(node);
                }
            }
        }

        componentWillUnmount() {
            this.mounted = false;
            const node = this.elementRef.current;
            if (node instanceof HTMLElement) {
                (this.resizeObserver as ResizeObserver).unobserve(node);
            }
            (this.resizeObserver as ResizeObserver).disconnect();
        }

        render() {
            const {
                // destructure the AddedProps
                measureBeforeMount,
                // Keep the rest with same interface as inner Component
                ...rest} = this.props;

            if (measureBeforeMount && !this.mounted) {
                return (
                    <div
                        className={clsx(this.props.className, layoutClassName)}
                        style={{
                            ...this.props,
                            // overrides possible width from props
                            width: serverSizeWidth // Default width during SSR
                        }}
                        ref={this.elementRef}
                    />
                );
            }

            return (
                <ComposedComponent
                {...rest as Props}
                innerRef={this.elementRef}

                // overrides possible width from props
                width={this.state.width || serverSizeWidth} // Default SSR width
                />
            );
        }
    };
}
