import BigScreenViewInteractive, {
  BigScreenViewInteractiveProps,
} from "./BigScreenViewInteractive";

import { commonStyling } from "../AppStyles";
import lightMode from "../LightMode";
import darkMode from "../DarkMode";
import { ThemeManager } from "../lib";

const tm = new ThemeManager(lightMode, darkMode, commonStyling);


// STORY CONFIGURATION
export default {
  component: BigScreenViewInteractive,
  title: "BigScreenViewInteractive",
  tags: ["autodocs"],
};

const arg1: BigScreenViewInteractiveProps = {
  // same interface as the props of the Component
  navigationSections: [
    {
      htmlID: "introduction-section",
      barLabel: "Introduction",
    },
    {
      htmlID: "professional-section",
      barLabel: "Professional",
    },
  ],
  data: {
    verticalMainPane: {
      introduction: {
        name: "string",
      },
      professional: [
        {
          title: "Software Engineer",
          activities: ["1", "2"],
          company: "GG Navi",
          location: "Mountain View, CA",
          duration: "Sep 2022 - May 2023",
          description: "I worked at GG Navi as a Software Engineer.",
          technology_tags: ["python", "docker"],
        },
        {
          title: "Software Engineer",
          activities: ["1", "2"],
          company: "GG Navi",
          location: "Mountain View, CA",
          duration: "Sep 2022 - May 2023",
          description: "I worked at GG Navi as a Software Engineer.",
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
  },
  colorSet: tm.toAppColorSet(),
};

export const LightColorOnTheLeft = {
  args: arg1,
};

export const DarkColorOnTheLeft = {
  args: {
    ...LightColorOnTheLeft.args,
    colorSet: {
      light: LightColorOnTheLeft.args.colorSet.dark,
      dark: LightColorOnTheLeft.args.colorSet.light,
    },
  },
};
