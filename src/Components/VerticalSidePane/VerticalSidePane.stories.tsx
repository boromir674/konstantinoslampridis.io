import { VerticalSidePane } from "./VerticalSidePane";
import { commonStyling } from "../../AppStyles";
import lightMode from "../../LightMode";
import darkMode from "../../DarkMode";
import { ThemeManager } from "../../lib";

const tm = new ThemeManager(lightMode, darkMode, commonStyling);

// App Styles ('light' + common), 'dark' + common)
const colorSet = tm.toAppColorSet()

export default {
  component: VerticalSidePane,
  title: "VerticalSidePane",
  tags: ["autodocs"],
};

export const Light = {
  args: {
    // same interface as the props of the Component
    theme: colorSet.light.verticalSidePane,
    data: {
      personal: {
        name: "John Doe",
        email: "jd@email.io",
        github: "github.com/john-doe",
        gitlab: "gitlab.com/john-doe",
        linkedin: "linkedin.com/in/john-doe",
      },
      education: [
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
  },
};

export const Dark = {
  args: {
    ...Light.args,
    theme: colorSet.dark.verticalSidePane,
  },
};
