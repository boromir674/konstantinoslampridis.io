import BigScreenViewInteractive, {
  BigScreenViewInteractiveProps,
} from "./BigScreenViewInteractive";
import lightMode from "../LightMode";
import darkMode from "../DarkMode";
import { ComputedTheme, mergeStylings, commonStyling } from "../AppStyles";

const lightTheme: ComputedTheme = mergeStylings(lightMode, commonStyling);
const darkTheme: ComputedTheme = mergeStylings(darkMode, commonStyling);

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
  colorSet: {
    light: {
      containerBackgroundColor: lightTheme.backgroundColor,
      topHeaderPane: {
        headerNavigationBar: {
          colors: lightTheme.navigationBar,
          padding: lightTheme.headerNavigationBar.padding,
        },
        backgroundColor: lightTheme.topHeaderPane.backgroundColor,
        themeSwitch: lightTheme.themeSwitch,
      },
      verticalSidePane: {
        personalInfo: {
          containerBackgroundColor:
            lightTheme.personal.containerBackgroundColor,
          textColor: lightTheme.personal.textColor,
          linkColor: lightTheme.personal.urlTextColor,
          externalURLSVGColor: lightTheme.personal.externalURLSVGColor,
        },
        education: {
          item: lightTheme.education.item,
        },
      },
      verticalMainPane: {
        introduction: lightTheme.introduction,
        professional: lightTheme.professional,
        portfolio: lightTheme.portfolio,
      },
      bottomFooterPane: lightTheme.footerStyles,
    },
    dark: {
      containerBackgroundColor: darkTheme.backgroundColor,
      topHeaderPane: {
        headerNavigationBar: {
          colors: darkTheme.navigationBar,
          padding: darkTheme.headerNavigationBar.padding,
        },
        backgroundColor: darkTheme.topHeaderPane.backgroundColor,
        themeSwitch: darkTheme.themeSwitch,
      },
      verticalSidePane: {
        personalInfo: {
          containerBackgroundColor: darkTheme.personal.containerBackgroundColor,
          textColor: darkTheme.personal.textColor,
          linkColor: darkTheme.personal.urlTextColor,
          externalURLSVGColor: darkTheme.personal.externalURLSVGColor,
        },
        education: {
          item: darkTheme.education.item,
        },
      },
      verticalMainPane: {
        introduction: darkTheme.introduction,
        professional: darkTheme.professional,
        portfolio: darkTheme.portfolio,
      },
      bottomFooterPane: darkTheme.footerStyles,
    },
  },
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
