import { EducationItem } from "./Education";
import { ThemeManagerFactory } from "../lib";

const tm = ThemeManagerFactory.createFromUserDesign();

const {
  light: {
    verticalSidePane: {
      education: { item: educationItemStylesLightMode },
    },
  },
  dark: {
    verticalSidePane: {
      education: { item: educationItemStylesDarkMode },
    },
  },
} = tm.toAppColorSet();

export default {
  component: EducationItem,
  title: "EducationItem",
  tags: ["autodocs"],
};

export const Light = {
  args: {
    theme: educationItemStylesLightMode,
    userData: {
      degree_title: "MSc in Artificial Intelligence",
      university_name: "University of Amsterdam",
      location: "Amsterdam, Netherlands",
      duration: "2014 - 2019",
      thesis_title: "Political Spectrum Aware Topic Model",
      topics: ["python", "docker"],
    },
  },
};

export const Dark = {
  args: {
    ...Light.args,
    theme: educationItemStylesDarkMode,
  },
};
