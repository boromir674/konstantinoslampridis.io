import {BottomFooterPane} from "./BottomFooterPane";
import { commonStyling } from "../../AppStyles";
import lightMode from "../../LightMode";
import darkMode from "../../DarkMode";
import { ThemeManager } from "../../lib";

export default {
  component: BottomFooterPane,
  title: "BottomFooterPane",
  tags: ["autodocs"],
};

const tm = new ThemeManager(lightMode, darkMode, commonStyling);
const {
  light: {
    bottomFooterPane: bottomFooterStylesLightMode,
  },
  dark: {
    bottomFooterPane: bottomFooterStylesDarkMode,
  },
} = tm.toAppColorSet();


export const Light = {
  args: {
    // same interface as the props of the Component
    theme: bottomFooterStylesLightMode,
  },
};

export const Dark = {
  args: {
    ...Light.args,
    theme: bottomFooterStylesDarkMode,
  },
};
