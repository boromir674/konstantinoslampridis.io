import { VerticalSidePane, type AppVerticalSidePaneProps } from "./VerticalSidePane";
import { lightTheme, darkTheme } from '../../theme';


export default {
  component: VerticalSidePane,
  title: "VerticalSidePane",
  tags: ["autodocs"],
};

const lightProps: AppVerticalSidePaneProps = {
  // same interface as the props of the Component
  theme: {
    ...lightTheme,
    personalInfo: {
      ...lightTheme.personal,
      linkColor: lightTheme.personal.urlTextColor,
    },
    // education: lightTheme.education
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
};
export const Light = {
  args: lightProps,
}

const darkProps: AppVerticalSidePaneProps = {
  ...Light.args,
  theme: {
    ...darkTheme,
    personalInfo: {
      ...darkTheme.personal,
      linkColor: darkTheme.personal.urlTextColor,
    },
  },
};
export const Dark = {
  args: darkProps,
}
