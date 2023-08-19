import { Education } from "./Education";
import lightTheme from "../LightMode";
import darkTheme from "../DarkMode";

export default {
  component: Education,
  title: "Education",
  tags: ["autodocs"],
};

export const Light = {
  args: {
    // same interface as the props of the Component
    theme: lightTheme.education,
    data: [
      {
        degree_title: "MSc in Artificial Intelligence",
        university_name: "University of Amsterdam",
        location: "Amsterdam, Netherlands",
        duration: "2014 - 2019",
        thesis_title: "Political Spectrum Aware Topic Model",
        topics: ["ML", "CV", "RL", "NLP"],
      },
      {
        degree_title: "BSc in Applied Informatics",
        university_name: "University of Macedonia",
        location: "Thessaloniki, Greece",
        duration: "2008 - 2013",
        thesis_title: "Computational Analysis of Simplex Points Algorithm",
        topics: [
          "Operating Systems",
          "Linear Programming",
          "Discreet Mathematics",
        ],
      },
    ],
  },
};


export const Dark = {
  args: {
    ...Light.args,
    theme: darkTheme.education,
  },
};
