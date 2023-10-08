import BigScreenView, { BigScreenViewProps } from "./BigScreenView";
import { ThemeManagerFactory } from "../lib";

const tm = ThemeManagerFactory.createFromUserDesign();

// App Styles ('light' + common), 'dark' + common)
const colorSet = tm.toAppColorSet()

// STORY CONFIGURATION
export default {
  component: BigScreenView,
  title: "BigScreenView",
  tags: ["autodocs"],
};

// STORY DEFAULT PROPS VALUES
const args: BigScreenViewProps = {
  // same interface as the props of the Component
  theme: colorSet.light,
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
            activities: [
              "I worked at GG Navi as a Software Engineer.",
              "other activity",
            ],
            technology_tags: ["python", "docker"],
          },
          {
            title: "Software Engineer",
            company: "GG Navi",
            location: "Mountain View, CA",
            duration: "Sep 2022 - May 2023",
            description: "I worked at GG Navi as a Software Engineer.",
            activities: [
              "I worked at GG Navi as a Software Engineer.",
              "other activity",
            ],
            technology_tags: ["python", "docker"],
          },
        ],
        portfolio: [
          {
            title: "Python Package Generator",
            development_period: "Sep 2022 - May 2023",
            status: "In Progress",
            description: "I worked at GG Navi as a Software Engineer.",
            source_code_repo: "https://github.com",
            release: [],
            tags: ["python", "docker"],
          },
          {
            title: "Neural Style Transfer",
            development_period: "Sep 2022 - May 2023",
            status: "In Progress",
            description: "I worked at GG Navi as a Software Engineer.",
            source_code_repo: "https://github.com",
            release: [],
            tags: ["python", "docker"],
          },
          {
            title: "Topic Modeling Toolkit",
            development_period: "Sep 2022 - May 2023",
            status: "In Progress",
            description: "I worked at GG Navi as a Software Engineer.",
            source_code_repo: "https://github.com",
            release: [],
            tags: ["python", "docker"],
          },
          {
            title: "Software Patterns",
            development_period: "Sep 2022 - May 2023",
            status: "In Progress",
            description: "I worked at GG Navi as a Software Engineer.",
            source_code_repo: "https://github.com",
            release: [],
            tags: ["python", "docker"],
          },
          {
            title: "Pytest Object Getter",
            development_period: "Sep 2022 - May 2023",
            status: "In Progress",
            description: "I worked at GG Navi as a Software Engineer.",
            source_code_repo: "https://github.com",
            release: [],
            tags: ["python", "docker"],
          },
        ],
      },
      // sectionIDs: {},
    },
  },
};

export const Light = {
  args,
};

export const Dark = {
  args: {
    ...Light.args,
    theme: colorSet.dark,
  },
};
