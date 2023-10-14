import PersonalInfo, { PersonalInfoProps } from "./PersonalInfo";
import { ThemeManagerFactory } from "../lib";

const tm = ThemeManagerFactory.createFromUserDesign();

const {
  light: {
    verticalSidePane: { personalInfo: personalInfoStylesLightMode },
  },
  dark: {
    verticalSidePane: { personalInfo: personalInfoStylesDarkMode },
  },
} = tm.toAppColorSet();

export default {
  component: PersonalInfo,
  title: "PersonalInfo",
  tags: ["autodocs"],
};

const lightModePropsValues: PersonalInfoProps = {
  userData: {
    name: "My Name",
    email: "email@gg.navi",
    github: "github.com/boromir674",
    gitlab: "gitlab.com/boromir674",
    linkedin: "linkedin/boromir674",
  },
  theme: personalInfoStylesLightMode,
};

export const LightMode = {
  args: lightModePropsValues,
};

export const DarkMode = {
  args: {
    ...LightMode.args,
    theme: personalInfoStylesDarkMode,
  },
};
