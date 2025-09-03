// import React, { FC, useMemo, useState, useEffect } from "react";
// import { WidthProvider, Responsive, Layouts } from "react-grid-layout";
// import styled from "@emotion/styled";

// // A Grid Layout with simple listener facility for width changes
// const ResponsiveReactGridLayout = WidthProvider(Responsive);
// const originalLayouts = getFromLS("layouts") || {};

// interface ResponsiveLocalStorageLayoutProps {
//   className?: string;
//   cols?: { lg: number; md: number; sm: number; xs: number; xxs: number };
//   rowHeight?: number;
// }

// // Grid Item Component that counts self re-renders, simulates constant data from props with string type for demonstration
// interface CounterGridItemProps {
//   constantDataFromProps: string;
//   // onClick?: () => void;
// }
// const CounterGridItem: FC<CounterGridItemProps> = (props) => {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     console.log("Grid Item Rendered");
//     setCount((count) => count + 1);
//   }, []);

//   return (
//       <span onClick={() => setCount((count) => count + 1)}>{props.constantDataFromProps}: {count}</span>
//   );
// }


// const ResponsiveLocalStorageLayout: React.FC<ResponsiveLocalStorageLayoutProps> = ({
//   className = "layout",
//   cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
//   rowHeight = 30,
// }) => {
//   const [layouts, setLayouts] = useState<Layouts>(JSON.parse(JSON.stringify(originalLayouts)));

//   // Common Style can be computed only on first render and reused on all the rest
//   // so we memoize the Common Styles value
//   const commonStyles = useMemo(() => {
//     // Compute Common Styles only once, regardless of Grid Items count !
//     console.log("Grid Item Styles computed only ONCE !");
//     return {
//       outline: "1px solid black",
//     };
//   }, []);

//   const resetLayout = () => {
//     setLayouts({});
//   };

//   const onLayoutChange = (layout: any, layouts: Layouts) => {
//     saveToLS("layouts", layouts);
//     setLayouts(layouts);
//   };

//   return (
//     <div>
//       <button onClick={resetLayout}>Reset Layout</button>
//       {/* A Grid Layout with simple listener facility for width changes */}
//       <ResponsiveReactGridLayout
//         className={className}
//         cols={cols}
//         rowHeight={rowHeight}
//         layouts={layouts}
//         onLayoutChange={onLayoutChange}
//       >
//         <div key="1" data-grid={{ w: 2, h: 3, x: 0, y: 0, minW: 2, minH: 3 }} style={commonStyles}>
//           <CounterGridItem className="text" constantDataFromProps="A: Renderasdasd Times" />
//         </div>
//         <div key="2" data-grid={{ w: 2, h: 3, x: 2, y: 0, minW: 2, minH: 3 }} style={commonStyles}>
//         <CounterGridItem constantDataFromProps={"B: Render Times"} />
//         </div>
//         <div key="3" data-grid={{ w: 2, h: 3, x: 4, y: 0, minW: 2, minH: 3 }} style={commonStyles}>
//         <CounterGridItem constantDataFromProps={"C: Render Times"} />
//         </div>
//         <div key="4" data-grid={{ w: 2, h: 3, x: 6, y: 0, minW: 2, minH: 3 }} style={commonStyles}>
//         <CounterGridItem constantDataFromProps={"D: Render Times"} />
//         </div>
//         <div key="5" data-grid={{ w: 2, h: 3, x: 8, y: 0, minW: 2, minH: 3 }} style={commonStyles}>
//         <CounterGridItem constantDataFromProps={"E: Render Times"} />
//         </div>
//       </ResponsiveReactGridLayout>
//     </div>
//   );
// };

// function getFromLS(key: string) {
//   let ls = {};
//   if (global.localStorage) {
//     try {
//       ls = JSON.parse(global.localStorage.getItem("rgl-8") || "{}");
//     } catch (e) {
//       /*Ignore*/
//     }
//   }
//   return ls[key];
// }

// function saveToLS(key: string, value: any) {
//   if (global.localStorage) {
//     global.localStorage.setItem(
//       "rgl-8",
//       JSON.stringify({
//         [key]: value,
//       })
//     );
//   }
// }

// export default {
//   component: ResponsiveLocalStorageLayout,
//   title: "ResponsiveLocalStorageLayout",
//   tags: ["autodocs"],
// };

// const SimpleArgs: ResponsiveLocalStorageLayoutProps = {

// }

// export const SimpleResponsiveLocalStorageLayout = {
//   args: SimpleArgs,
// }






import React, { FC, useRef, useState, useCallback } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";


// Grid Item Component that counts self re-renders, simulates constant data from props with string type for demonstration
interface CounterGridItemProps {
  constantDataFromProps: string;
  children?: React.ReactNode;
  // onClick?: () => void;
}
const CounterGridItem: FC<CounterGridItemProps> = (props) => {
  const rendersNo  = useRef(0)
  // const [counter, setCounter] = useState(0)

  const logComponentRerender = useCallback(() => {
    rendersNo.current = rendersNo.current + 1
  }, [])
  logComponentRerender()

  // rendersNo.current = rendersNo.current + 1
  // const increase = () => {setCounter((c: number) => c + 1)}

  return (
      <span><p>{props.children}{"->"}{props.constantDataFromProps}: {rendersNo.current}</p></span>
  );
}

// A Grid Layout with simple listener facility for width changes
const ResponsiveReactGridLayout = WidthProvider(Responsive);
const originalLayouts = getFromLS("layouts") || {};

/**
 * This layout demonstrates how to sync multiple responsive layouts to localstorage.
 */
class ResponsiveLocalStorageLayoutClassExample extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      layouts: JSON.parse(JSON.stringify(originalLayouts))
    };
  }

  static get defaultProps() {
    return {
      className: "layout",
      cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
      rowHeight: 30
    };
  }

  commonStyles() {
    console.log("Grid Item Styles");
    return {
      outline: "1px solid black",
    }
  }
  resetLayout() {
    this.setState({ layouts: {} });
  }

  onLayoutChange(layout, layouts) {
    saveToLS("layouts", layouts);
    this.setState({ layouts });
  }

//   const children = React.useMemo(() => {
//     return [
//       <div key="1" data-grid={{ w: 2, h: 3, x: 0, y: 0, minW: 2, minH: 3 }} style={this.commonStyles()}>
//       <CounterGridItem className="text" constantDataFromProps="Render Times">A</CounterGridItem>
//     </div>,
//     <div key="2" data-grid={{ w: 2, h: 3, x: 2, y: 0, minW: 2, minH: 3 }} style={this.commonStyles()}>
//       <CounterGridItem constantDataFromProps="Render Times">B</CounterGridItem>
//     </div>,
//     <div key="3" data-grid={{ w: 2, h: 3, x: 4, y: 0, minW: 2, minH: 3 }} style={this.commonStyles()}>
//       <CounterGridItem constantDataFromProps="Render Times">C</CounterGridItem>
//     </div>,
//     <div key="4" data-grid={{ w: 2, h: 3, x: 6, y: 0, minW: 2, minH: 3 }} style={this.commonStyles()}>
//       <CounterGridItem constantDataFromProps="Render Times">D</CounterGridItem>
//     </div>,
//     <div key="5" data-grid={{ w: 2, h: 3, x: 8, y: 0, minW: 2, minH: 3 }} style={this.commonStyles()}>
//       <CounterGridItem constantDataFromProps="Render Times">E</CounterGridItem>
//     </div>,
//     ]
//     // return new Array(props.count).fill(undefined).map((val, idx) => {
//     //     return <div key={idx} style={{outline: "1px solid black"}} data-grid={{ x: idx, y: 1, w: 1, h: 1 }}>
//     //         <CounterGridItem className="text" constantDataFromProps="Render Times">ID {idx}</CounterGridItem>
//     //     </div>;
//     // });
// }, [
//   // props.count
// ]);


  render() {
    console.log("Responsive Grid Class Example: Rendering");
    return (
      <div>
        <button onClick={() => this.resetLayout()}>Reset Layout</button>
        {/* A Grid Layout with simple listener facility for width changes */}
        <ResponsiveReactGridLayout
          // className="layout"
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={30}
          layouts={this.state.layouts}
          onLayoutChange={(layout, layouts) =>
            this.onLayoutChange(layout, layouts)
          }
        >
          <div key="1" data-grid={{ w: 2, h: 3, x: 0, y: 0, minW: 2, minH: 3 }} style={this.commonStyles()}>
            <CounterGridItem className="text" constantDataFromProps="Render Times">A</CounterGridItem>
          </div>
          <div key="2" data-grid={{ w: 2, h: 3, x: 2, y: 0, minW: 2, minH: 3 }} style={this.commonStyles()}>
            <CounterGridItem constantDataFromProps="Render Times">B</CounterGridItem>
          </div>
          <div key="3" data-grid={{ w: 2, h: 3, x: 4, y: 0, minW: 2, minH: 3 }} style={this.commonStyles()}>
            <CounterGridItem constantDataFromProps="Render Times">C</CounterGridItem>
          </div>
          <div key="4" data-grid={{ w: 2, h: 3, x: 6, y: 0, minW: 2, minH: 3 }} style={this.commonStyles()}>
            <CounterGridItem constantDataFromProps="Render Times">D</CounterGridItem>
          </div>
          <div key="5" data-grid={{ w: 2, h: 3, x: 8, y: 0, minW: 2, minH: 3 }} style={this.commonStyles()}>
            <CounterGridItem constantDataFromProps="Render Times">E</CounterGridItem>
          </div>
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}

function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("rgl-8")) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      "rgl-8",
      JSON.stringify({
        [key]: value
      })
    );
  }
}

// if (process.env.STATIC_EXAMPLES === true) {
//   import("../test-hook.jsx").then(fn =>
//     fn.default(ResponsiveLocalStorageLayout)
//   );
// }


export default {
  component: ResponsiveLocalStorageLayoutClassExample,
  title: "Responsive Grid Layout with LS Integration - Simple Example",
  tags: ["autodocs"],
};


export const FunctionalComponent = () => <ResponsiveLocalStorageLayoutClassExample />;
