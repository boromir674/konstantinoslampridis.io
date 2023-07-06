import { FC, useState, useCallback } from "react";

import BigScreenView, { BigScreenViewProps } from "./BigScreenView";

// Our Hooks
import useIsSSR from "../Hooks/useIsSSR";
// import useWindowSizeTrackingState from "../Hooks/useWindowSizeTrackingState";

interface BooleanMap {
  [keyName: string]: boolean;
}

interface NavigationSection {
  htmlID: string;
  barLabel: string;
}

interface BigScreenViewInteractiveProps {
  // information required to provide navigation with auto scroll
  navigationSections: NavigationSection[];
  // data that can be fetched at build time based on user config
  data: {
    verticalMainPane: BigScreenViewProps["data"]["verticalMainPane"]["data"];
    verticalSidePane: BigScreenViewProps["data"]["verticalSidePane"];
  };
  // designed theme duo of Light and Color modes
  colorSet: {
    light: BigScreenViewProps["theme"];
    dark: BigScreenViewProps["theme"];
  };
}

const BigScreenViewInteractive: FC<BigScreenViewInteractiveProps> = ({
  navigationSections,
  data,
  colorSet,
}) => {
  // Component State
  const SSROn = useIsSSR();
  const [theme, setTheme] = useState(colorSet.light);
//   const [windowSize] = useWindowSizeTrackingState(SSROn);

  // this state's initial value governs whether the toggle switch will be left or right
  const matchTogglePosition = useCallback(
    () => (theme === colorSet.light ? "left" : "right"),
    [theme]
  );
  const booleanMap: BooleanMap = {
    light: false,
    dark: true,
  };
  const positionMap = {
    left: "light",
    right: "dark",
  };
  return (
    <BigScreenView
      theme={theme}
      data={{
        ...data,
        topHeaderPane: {
          // specify where to scroll on navigation bar click
          sections: navigationSections.map((section) => ({
            to_element_id: '#' + section.htmlID,
            name: section.barLabel,
          })),
          // change theme colors from Light/Dark on toggle switch
          onToggle: (active: boolean) => {
            // if active is true then currently we are on the left (light)
            setTheme(active ? colorSet.dark : colorSet.light);
          },
          // automatically initiale at left if initial state is light, or right if black
          active: booleanMap[positionMap[matchTogglePosition()]],
        },
        verticalMainPane: {
          data: data.verticalMainPane,
          sectionIDs: navigationSections.map((section) => section.htmlID),
        },
      }}
    />
  );
};

export default BigScreenViewInteractive;
export type { BigScreenViewInteractiveProps };
