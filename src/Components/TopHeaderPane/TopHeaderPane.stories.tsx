import TopHeaderPane from "./TopHeaderPane";
import { lightTheme, darkTheme } from "../../AppStyles";

export default {
  component: TopHeaderPane,
  title: "TopHeaderPane",
  tags: ["autodocs"],
};

export const LightWithToggleLeft = {
  args: {
    theme: { navigationBar: lightTheme.navigationBar },
    data: {
      sectionNames: ["Home", "Professional"],
      onToggle: (active: boolean) => {
        console.log("active: ", active);
      },
      // starting position of toggle, if true it is on the right
      active: false,
      // false -> left, true -> right
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


export const DarkWithToggleLeft = {
  args: {
    ...LightWithToggleLeft.args,
    // theme: darkTheme,
    theme: { navigationBar: darkTheme.navigationBar },
  },
};


