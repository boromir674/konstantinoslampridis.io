import {TopHeaderPane} from "./TopHeaderPane";
import lightTheme from "../../LightMode";
import darkTheme from "../../DarkMode";

export default {
  component: TopHeaderPane,
  title: "TopHeaderPane",
  tags: ["autodocs"],
};

export const LightWithToggleLeft = {
  args: {
    theme: {
      navigationBar: lightTheme.navigationBar,
      backgroundColor: lightTheme.topHeaderPane.backgroundColor,
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
      active: false,
      // false -> left, true -> right
    },
  },
};

export const DarkWithToggleLeft = {
  args: {
    ...LightWithToggleLeft.args,
    // theme: darkTheme,
    theme: {
      navigationBar: darkTheme.navigationBar,
      backgroundColor: darkTheme.topHeaderPane.backgroundColor,
    },
  },
};

export const LightsWithToggleRight = {
  args: {
    ...LightWithToggleLeft.args,
    data: {
      ...LightWithToggleLeft.args.data,
      active: true,
      // false -> left, true -> right
    },
  },
};
