import { useState, FC, useCallback } from 'react';
import { TopHeaderPane, TopHeaderPaneProps } from "./TopHeaderPane";
import { ThemeManagerFactory } from "../../lib";

const tm = ThemeManagerFactory.createFromUserDesign();

// App Styles ('light' + common), 'dark' + common)
const colorSet = tm.toAppColorSet()

interface BooleanMap {
  [keyName: string]: boolean;
}

interface HeaderPaneWrapperProps {
  theme: TopHeaderPaneProps["theme"];
  data: {
    sections: TopHeaderPaneProps["data"]["sections"];
  }
}
const HeaderPaneWrapper: FC<HeaderPaneWrapperProps> = ({
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
          setTheme(active ? colorSet.dark.topHeaderPane : colorSet.light.topHeaderPane);
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
    theme: colorSet.light.topHeaderPane,
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
  // Has a bug when toggling between themes using the switch in the UI
  args: {
    ...LightWithToggleLeft.args,
    theme: colorSet.dark.topHeaderPane,
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
