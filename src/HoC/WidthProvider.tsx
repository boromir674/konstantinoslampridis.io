/** Provides a Grid Layout SSR-compatible Width Provider */

import * as React from "react";
import PropTypes from "prop-types";
// import ResizeObserver from "resize-observer-polyfill";
import clsx from "clsx";

// util
export type ReactRef<T extends HTMLElement> = {
    current: T | null
};


interface WPDefaultProps {
    measureBeforeMount: boolean
};

// eslint-disable-next-line no-unused-vars
interface WPProps extends WPDefaultProps {
    className?: string;
    style?: Object;
    //   ...WPDefaultProps
    // "spread" WPDefaultProps

};

type WPState = {
    width: number
};

type ComposedProps<Config> = Config & {
    measureBeforeMount?: boolean;
    className?: string;
    style?: Object;
    width?: number;
};

const layoutClassName = "react-grid-layout";
const serverSizeWidth = 1280;

/*
 * A simple HOC that provides facility for listening to container resizes.
 */
export default function WidthProvideRGL<Config>(
    ComposedComponent: React.AbstractComponent<Config>
): React.AbstractComponent<ComposedProps<Config>> {
    return class WidthProvider extends React.Component<
        ComposedProps<Config>,
        WPState
    > {
        static defaultProps: WPDefaultProps = {
            measureBeforeMount: false
        };

        static propTypes = {
            // If true, will not render children until mounted. Useful for getting the exact width before
            // rendering, to prevent any unsightly resizing.
            measureBeforeMount: PropTypes.bool
        };

        state: WPState = {
            width: serverSizeWidth,
        };

        elementRef: ReactRef<HTMLDivElement> = React.createRef();
        mounted: boolean = false;
        resizeObserver: ResizeObserver;

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
                this.resizeObserver.unobserve(node);
            }
            this.resizeObserver.disconnect();
        }

        render() {
            const { measureBeforeMount, ...rest } = this.props;
            if (measureBeforeMount && !this.mounted) {
                return (
                    <div
                        className={clsx(this.props.className, layoutClassName)}
                        style={{
                            ...this.props,
                            width: serverSizeWidth // Default width during SSR
                        }}
                        ref={this.elementRef}
                    />
                );
            }

            return (
                <ComposedComponent
                    innerRef={this.elementRef}
                    {...rest}
                    // {...this.state}
                    width={this.state.width || serverSizeWidth} // Default SSR width

                />
            );
        }
    };
}
