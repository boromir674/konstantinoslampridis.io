import TopHeaderPane, { TopHeaderPaneProps } from "./TopHeaderPane";
import lightTheme from "../../LightMode";
import darkTheme from "../../DarkMode";

export default {
  component: TopHeaderPane,
  title: "TopHeaderPane",
  tags: ["autodocs"],
};


const args: TopHeaderPaneProps = {
  theme: {
    navigationBar: lightTheme.navigationBar,
    backgroundColor: lightTheme.topHeaderPane.backgroundColor,
    themeSwitch: lightTheme.themeSwitch,
  },
  data: {
    sections: [
      { name: "Home", to_element_id: "home-section" },
      { name: "Portfolio", to_element_id: "portfolio-section" },
      { name: "Professional", to_element_id: "professional-section" },
    ],
    onToggle: (active: boolean) => {
      console.log("active: ", active);
    },
    // starting position of toggle, if true it is on the right
    // false -> left
    // true -> right
    active: false,
  },
}


export const LightWithToggleLeft: {args: TopHeaderPaneProps} = {
  args,
};

export const DarkWithToggleLeft: {args: TopHeaderPaneProps} = {
  args: {
    ...LightWithToggleLeft.args,
    // theme: darkTheme,
    theme: {
      navigationBar: darkTheme.navigationBar,
      backgroundColor: darkTheme.topHeaderPane.backgroundColor,
      themeSwitch: darkTheme.themeSwitch,
    },
  },
};

export const LightsWithToggleRight: {args: TopHeaderPaneProps} = {
  args: {
    ...LightWithToggleLeft.args,
    data: {
      ...LightWithToggleLeft.args.data,
      active: true,
      // false -> left, true -> right
    },
  },
};
