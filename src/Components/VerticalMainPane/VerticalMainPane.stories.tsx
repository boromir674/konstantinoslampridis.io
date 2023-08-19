import { VerticalMainPane, AppVerticalMainPaneProps } from "./VerticalMainPane";
import lightTheme from "../../LightMode";
import darkTheme from "../../DarkMode";

export default {
  component: VerticalMainPane,
  title: "VerticalMainPane",
  tags: ["autodocs"],
};

const args: AppVerticalMainPaneProps = {
  theme: {
    ...lightTheme,
    // containerBackgroundColor: '#FFAD00',
    containerBackgroundColor: lightTheme.latestContainerBackgroundColor,

    // introduction: lightTheme.introduction,
    // professional: lightTheme.professional,
  },
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
};

export const Light = {
  args,
};

export const Dark = {
  args: {
    ...Light.args,
    theme: {
      ...darkTheme,
      containerBackgroundColor: darkTheme.latestContainerBackgroundColor,
      // introduction: darkTheme.introduction,
      // professional: darkTheme.professional,
    },
  },
};
