import AppIntroductionSection from "./AppIntroductionSection";
import { commonStyling } from "../../AppStyles";
import lightMode from "../../LightMode";
import darkMode from "../../DarkMode";
import { ThemeManager } from "../../lib";

export default {
  component: AppIntroductionSection,
  title: "AppIntroductionSection",
  tags: ["autodocs"],
};

const tm = new ThemeManager(lightMode, darkMode, commonStyling);
const {
  light: {
    verticalMainPane: { introduction: introductionSectionStylesLightMode },
  },
  dark: {
    verticalMainPane: { introduction: introductionSectionStylesDarkMode },
  },
} = tm.toAppColorSet();

export const Light = {
  args: {
    theme: introductionSectionStylesLightMode,
    data: {
      name: "John Doe",
    },
    id: "introduction-section",
  },
};

export const Dark = {
  args: {
    ...Light.args,
    theme: introductionSectionStylesDarkMode,
  },
};
