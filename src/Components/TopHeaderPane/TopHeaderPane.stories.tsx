import { useState, FC, useCallback } from 'react';
import {TopHeaderPane, TopHeaderPaneProps } from "./TopHeaderPane";
import lightMode from "../../LightMode";
import darkMode from "../../DarkMode";
import { ComputedTheme, mergeStylings, commonStyling } from "../../AppStyles";

const lightTheme: ComputedTheme = mergeStylings(lightMode, commonStyling);
const darkTheme: ComputedTheme = mergeStylings(darkMode, commonStyling);;


interface BooleanMap {
  [keyName: string]: boolean;
}

const lightThemeInstance = {
  backgroundColor: lightTheme.topHeaderPane.backgroundColor,
  headerNavigationBar: {
    colors: lightTheme.navigationBar,
    padding: lightTheme.headerNavigationBar.padding,
  },
  themeSwitch: lightTheme.themeSwitch,
};

const darkThemeInstance = {
  backgroundColor: darkTheme.topHeaderPane.backgroundColor,
  headerNavigationBar: {
    colors: darkTheme.navigationBar,
    padding: darkTheme.headerNavigationBar.padding,
  },
  themeSwitch: darkTheme.themeSwitch,
};


interface HeaderPaneWrapperProps {
  theme: TopHeaderPaneProps["theme"];
  data: {
    sections: TopHeaderPaneProps["data"]["sections"];
    // active: TopHeaderPaneProps["data"]["active"];
  }
}
const HeaderPaneWrapper: FC<TopHeaderPaneProps> = ({
  theme: themeObject,
  data,
}) => {
  // set initial theme to theme from props
  const [theme, setTheme] = useState<TopHeaderPaneProps["theme"]>(themeObject);
  // this state's initial value governs whether the toggle switch will be left or right
  const matchTogglePosition = useCallback(
    () => (theme === themeObject ? "left" : "right"),
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
    <TopHeaderPane
      theme={theme}
      data={{
        ...data,
        onToggle: (active: boolean) => {
          setTheme(active ? darkThemeInstance : lightThemeInstance);
        },
        active: booleanMap[positionMap[matchTogglePosition()]],
      }}
    />
  )

};

export default {
  component: HeaderPaneWrapper,
  title: "HeaderPaneWrapper",
  tags: ["autodocs"],
};

export const LightWithToggleLeft = {
  args: {
    theme: lightThemeInstance,
    data: {
      sections: [
        { name: "Home", to_element_id: "home-section" },
        { name: "Portfolio", to_element_id: "portfolio-section" },
        { name: "Professional", to_element_id: "professional-section" },
      ],
      // onToggle: (active: boolean) => {
      //   console.log("active: ", active);
      // },
      // change theme colors from Light/Dark on toggle switch
      // onToggle: (active: boolean) => {
      //   // if active is true then currently we are on the left (light)
      //   setTheme(active ? colorSet.dark : colorSet.light);
      // },
      // starting position of toggle, if true it is on the right
      // active: false,
      
      // false -> left, true -> right
    },
  },
};

export const DarkWithToggleLeft = {
  args: {
    ...LightWithToggleLeft.args,
    theme: darkThemeInstance,
  },
};

// export const LightsWithToggleRight = {
//   args: {
//     ...LightWithToggleLeft.args,
//     data: {
//       ...LightWithToggleLeft.args.data,
//       active: true,
//       // false -> left, true -> right
//     },
//   },
// };
