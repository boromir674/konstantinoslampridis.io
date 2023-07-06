import BigScreenView, { BigScreenViewProps} from "./BigScreenView";
import { lightTheme, darkTheme } from "../AppStyles";

export default {
  component: BigScreenView,
  title: "BigScreenView",
  tags: ["autodocs"],
};

export const Light = {
  args: {
    // same interface as the props of the Component
    theme: {
      containerBackgroundColor: lightTheme.backgroundColor,
      topHeaderPane: {
        navigationBar: lightTheme.navigationBar,
        backgroundColor: lightTheme.topHeaderPane.backgroundColor,
      },
      verticalSidePane: {
        personalInfo: {
          containerBackgroundColor:
            lightTheme.personal.containerBackgroundColor,
          textColor: lightTheme.personal.textColor,
          linkColor: lightTheme.personal.urlTextColor,
        },
        education: {
          containerBackgroundColor:
            lightTheme.education.containerBackgroundColor,
          title: lightTheme.education.title,
          item: lightTheme.education.item,
        },
      },
      verticalMainPane: {
        ...lightTheme,
        containerBackgroundColor: lightTheme.backgroundColor,
      },
      bottomFooterPane: lightTheme.footerStyles,
    },
    data: {
      topHeaderPane: {
        sections: [
          { name: "Home", to_element_id: "home-section" },
          { name: "Portfolio", to_element_id: "portfolio-section" },
          { name: "Professional", to_element_id: "professional-section" },
        ],
        onToggle: (active: boolean) => {
          console.log("active: ", active);
        },
        // starting position of toggle, if true it is on the right
        active: true,
        // false -> left, true -> right
    },
      verticalSidePane: {
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
      verticalMainPane: {
        data: {
          introduction: {
            name: "John Doe",
          },
          professional: [
            {
              title: "Software Engineer",
              company: "GG Navi",
              location: "Mountain View, CA",
              duration: "Sep 2022 - May 2023",
              description: "I worked at GG Navi as a Software Engineer.",
              technology_tags: ["python", "docker"],
            },
            {
              title: "Software Engineer",
              company: "GG Navi",
              location: "Mountain View, CA",
              duration: "Sep 2022 - May 2023",
              description: "I worked at GG Navi as a Software Engineer.",
              technology_tags: ["python", "docker"],
            },
          ],
        },
        // sectionIDs: {},
      },
    },
  },
};

export const Dark = {
  args: {
    ...Light.args,
    theme: {
      containerBackgroundColor: darkTheme.backgroundColor,
      topHeaderPane: {
        navigationBar: darkTheme.navigationBar,
        backgroundColor: darkTheme.topHeaderPane.backgroundColor,
      },
      verticalSidePane: {
        personalInfo: {
          containerBackgroundColor: darkTheme.personal.containerBackgroundColor,
          textColor: darkTheme.personal.textColor,
          linkColor: darkTheme.personal.urlTextColor,
        },
        education: {
          containerBackgroundColor: darkTheme.education.containerBackgroundColor,
          title: darkTheme.education.title,
          item: darkTheme.education.item,
        },
      },
      verticalMainPane: {
        ...darkTheme,
        containerBackgroundColor: darkTheme.backgroundColor,
      },
      bottomFooterPane: darkTheme.footerStyles,
    },
  },
};
