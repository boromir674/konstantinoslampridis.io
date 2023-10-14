import { BottomFooterPane } from "./BottomFooterPane";
import { ThemeManagerFactory } from "../../lib";

export default {
  component: BottomFooterPane,
  title: "BottomFooterPane",
  tags: ["autodocs"],
};

const tm = ThemeManagerFactory.createFromUserDesign();

const {
  light: { bottomFooterPane: bottomFooterStylesLightMode },
  dark: { bottomFooterPane: bottomFooterStylesDarkMode },
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
