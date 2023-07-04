import AppEducationSection from "./AppEducationSection";
import { lightTheme, darkTheme } from "../../AppStyles";

export default {
  component: AppEducationSection,
  title: "AppEducationSection",
  tags: ["autodocs"],
};

export const Light = {
  args: {
    // same interface as the props of the Component
    theme: {
      item: lightTheme.education.item,
    },
    data: {
      title: "Education",
      educationItems: [
        {
          degree_title: "MSc in Artificial Intelligence",
          university_name: "University of Amsterdam",
          location: "Amsterdam, Netherlands",
          duration: "2014 - 2019",
          thesis_title: "Political Spectrum Aware Topic Model",
          topics: ["python", "docker"],
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
      // same interface as the props of the Component
      theme: {
        item: darkTheme.education.item,
      },
      data: {
        title: "Education",
        educationItems: [
          {
            degree_title: "MSc in Artificial Intelligence",
            university_name: "University of Amsterdam",
            location: "Amsterdam, Netherlands",
            duration: "2014 - 2019",
            thesis_title: "Political Spectrum Aware Topic Model",
            topics: ["python", "docker"],
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

// export const Dark = {
//   args: {
//     ...Light.args,
//     theme: darkTheme.education.item,
//   },
// };
