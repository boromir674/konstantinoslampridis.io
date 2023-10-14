import AppIntroductionSection from "./AppIntroductionSection";
import { ThemeManagerFactory } from "../../lib";


export default {
  component: AppIntroductionSection,
  title: "AppIntroductionSection",
  tags: ["autodocs"],
};

const tm = ThemeManagerFactory.createFromUserDesign();

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
