import { VerticalMainPane, AppVerticalMainPaneProps } from "./VerticalMainPane";
import { commonStyling } from "../../AppStyles";
import lightMode from "../../LightMode";
import darkMode from "../../DarkMode";
import { ThemeManager } from "../../lib";

const tm = new ThemeManager(lightMode, darkMode, commonStyling);

// App Styles ('light' + common), 'dark' + common)
const colorSet = tm.toAppColorSet()

export default {
  component: VerticalMainPane,
  title: "VerticalMainPane",
  tags: ["autodocs"],
};

const args: AppVerticalMainPaneProps = {
  theme: colorSet.light.verticalMainPane,
  data: {
    introduction: {
      name: "John Doe",
    },
    professional: [
      {
        title: "Software Engineer",
        activities: [
          "Engineered a Test Framework to facilitate easier/automated testing of new integrations",
          "Added new features for 'MySQL' and 'MS SQL Server' integrations in user-facing app",
          "Implemented a GDPR 'delete user data' feature, upon user request in user-facing app",
          "Designed a process to facilitate faster collaborative development, version control (and merging strategies) and Continuous Integration (CI), throughout the release cycle.",
        ],
        company: "Alvin",
        location: "Thessaloniki, Greece",
        duration: "Feb 2022 - Apr 2022",
        description: "Alvin parses SQL metadata from popular Data Platforms, such as Postgres, Redshift, Airflow, BigQuery, Tableau, Hive, etc and facilitates Data Governance Operations by providing a Software as a Service (SaaS) web app. Working asynchronously and fully remotely on adding features and automating (backend) testing of our Data Governance SaaS product",
        technology_tags: ["python", "docker", "FastAPI", "VueJS"],
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
    theme: colorSet.dark.verticalMainPane,
  },
};
