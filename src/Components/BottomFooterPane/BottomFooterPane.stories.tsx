import {BottomFooterPane} from "./BottomFooterPane";
import lightTheme from "../../LightMode";
import darkTheme from "../../DarkMode";

export default {
  component: BottomFooterPane,
  title: "BottomFooterPane",
  tags: ["autodocs"],
};

export const Light = {
  args: {
    // same interface as the props of the Component
    theme: lightTheme.footerStyles,
  },
};

export const Dark = {
  args: {
    ...Light.args,
    theme: darkTheme.footerStyles,
  },
};


