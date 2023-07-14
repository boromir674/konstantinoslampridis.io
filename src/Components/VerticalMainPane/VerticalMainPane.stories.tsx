import { VerticalMainPane, AppVerticalMainPaneProps } from "./VerticalMainPane";
import { lightTheme, darkTheme } from "../../AppStyles";

export default {
  component: VerticalMainPane,
  title: "VerticalMainPane",
  tags: ["autodocs"],
};

const args: AppVerticalMainPaneProps = {
  theme: {
    ...lightTheme,
    // containerBackgroundColor: '#FFAD00',
    containerBackgroundColor: "#009385",

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
  args: {
    // same interface as the props of the Component
    theme: {
      ...lightTheme,
      // containerBackgroundColor: '#FFAD00',
      containerBackgroundColor: "#009385",

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
        },
        {
          title: "Neural Style Transfer",
        },
        {
          title: "Topic Modeling Toolkit",
        },
        {
          title: "Software Patterns",
        },
        {
          title: "Pytest Object Getter",
        },
      ],
    },
  },
};

export const Dark = {
  args: {
    ...Light.args,
    theme: {
      ...darkTheme,
      containerBackgroundColor: "#D6F5E0",
      // introduction: darkTheme.introduction,
      // professional: darkTheme.professional,
    },
  },
};
