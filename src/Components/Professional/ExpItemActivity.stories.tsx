import ExpItemActivity from "./ExpItemActivity";
import { ThemeManagerFactory } from "../../lib";;

const tm = ThemeManagerFactory.createFromUserDesign();

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
