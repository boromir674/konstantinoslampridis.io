import ProfessionalSection, { ProfessionalSectionProps } from "./ProfessionalSection";
import { ThemeManagerFactory } from "../../lib";

const tm = ThemeManagerFactory.createFromUserDesign();

export default {
  component: ProfessionalSection,
  title: "ProfessionalSection",
  tags: ["autodocs"],
};


const args: ProfessionalSectionProps = {
  data: {
    experience_items: [
      {
        title: "Software Engineer",
        company: "GG Navi",
        activities: ["other activity"],
        location: "Mountain View, CA",
        duration: "Sep 2022 - May 2023",
        description: "I worked at GG Navi as a Software Engineer.",
        technology_tags: ["python", "docker"],
      },
      {
        title: "Software Engineer",
        company: "AI Company",
        activities: [
          "I worked at AI Company as a Software Engineer.",
          "other activity",
        ],
        location: "Mountain View, CA",
        duration: "Sep 2022 - May 2023",
        description:
          "AI Company parses SQL metadata from popular Data Platforms, such as Postgres, Redshift, Airflow, BigQuery, Tableau, Hive, etc and facilitates Data Governance Operations by providing a Software as a Service (SaaS) web app. Working asynchronously and fully remotely on adding features and automating (backend) testing of our Data Governance SaaS product",
        technology_tags: ["python", "docker"],
      },
      {
        title: "Software Engineer",
        company: "GG Navi",
        location: "Mountain View, CA",
        activities: ["other activity"],
        duration: "Sep 2022 - May 2023",
        description: "I worked at GG Navi as a Software Engineer.",
        technology_tags: ["python", "docker"],
      },
    ],
  },
  theme: tm.light.professional,
  id: "id_that_we_will_not_use_to_scroll_to_in_this_story",
};

// 1: Light Mode Colors
export const LightMode = {
  args,
};

// 2: Dark Mode Colors
export const DarkMode = {
  args: {
    ...LightMode.args,
    theme: tm.dark.professional,
  },
};
