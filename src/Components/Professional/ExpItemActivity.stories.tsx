import ExpItemActivity from "./ExpItemActivity";
import { commonStyling } from "../../AppStyles";
import lightMode from "../../LightMode";
import darkMode from "../../DarkMode";
import { ThemeManager } from "../../lib";

const tm = new ThemeManager(lightMode, darkMode, commonStyling);

export default {
  component: ExpItemActivity,
  title: "ExpItemActivity",
  tags: ["autodocs"],
};

export const Light = {
    args: {
        theme: {
            containerBackgroundColor: tm.light.introduction.containerBackgroundColor,
            textColor: tm.light.introduction.textColor,
        },
        data: {
            text: "Auditing the ML predictive models",
        },
    },
};

export const Dark = {
    args: {
        ...Light.args,
        theme: {
            containerBackgroundColor: tm.dark.introduction.containerBackgroundColor,
            textColor: tm.dark.introduction.textColor,
        },
    }
};
