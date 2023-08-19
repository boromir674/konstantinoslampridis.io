import { EducationItem } from "./Education";
import lightTheme from "../LightMode";
import darkTheme from "../DarkMode";

export default {
  component: EducationItem,
  title: "EducationItem",
  tags: ["autodocs"],
};

export const Light = {
  args: {
    theme: lightTheme.education.item,
    userData: {
    degree_title: "MSc in Artificial Intelligence",
    university_name: "University of Amsterdam",
    location: "Amsterdam, Netherlands",
    duration: "2014 - 2019",
    thesis_title: "Political Spectrum Aware Topic Model",
    topics: ["python", "docker"],
    }
  },
};

export const Dark = {
  args: {
    ...Light.args,
    theme: darkTheme.education.item,
    // theme: darkTheme.professional.item,
  },
};
