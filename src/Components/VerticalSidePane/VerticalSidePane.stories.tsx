import { VerticalSidePane } from "./VerticalSidePane";
import { lightTheme, darkTheme } from "../../AppStyles";

export default {
  component: VerticalSidePane,
  title: "VerticalSidePane",
  tags: ["autodocs"],
};

export const Light = {
  args: {
    // same interface as the props of the Component
    theme: {
        personalInfo: {
            containerBackgroundColor: lightTheme.personal.containerBackgroundColor,
            textColor: lightTheme.personal.textColor,
            linkColor: lightTheme.personal.urlTextColor,
        },
        education: {
            containerBackground: lightTheme.education.containerBackgroundColor,
            title: lightTheme.education.title,
            item: lightTheme.education.item,
        }
    },
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
    theme: {
        personalInfo: {
            containerBackgroundColor: darkTheme.personal.containerBackgroundColor,
            textColor: darkTheme.personal.textColor,
            linkColor: darkTheme.personal.urlTextColor,
        },
        education: {
            containerBackground: darkTheme.education.containerBackgroundColor,
            title: darkTheme.education.title,
            item: darkTheme.education.item,
        }
    },
  },
};
