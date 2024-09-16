import ExpItemActivity from "./ExpItemActivity";
// import lightTheme from "../../LightMode";
// import darkTheme from "../../DarkMode";

import { lightTheme, darkTheme } from '../../theme';

export default {
  component: ExpItemActivity,
  title: "ExpItemActivity",
  tags: ["autodocs"],
};

export const Light = {
    args: {
        theme: {
            containerBackgroundColor: lightTheme.introduction.containerBackgroundColor,
            textColor: lightTheme.introduction.textColor,
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
            containerBackgroundColor: darkTheme.introduction.containerBackgroundColor,
            textColor: darkTheme.introduction.textColor,
        },
    }
};
