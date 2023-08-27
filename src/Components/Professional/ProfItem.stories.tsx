import ProfItem from './ProfItem';
import lightTheme from "../../LightMode";
import darkTheme from "../../DarkMode";

export default {
  component: ProfItem,
  title: "ProfItem",
  tags: ["autodocs"],
};


export const Light = {
    args: {
        // same interface as the props of the Component
        theme: lightTheme.professional.item,
        experienceItemData: {
            title: "Software Engineer",
            company: "GG Navi",
            activities: ["I worked at GG Navi as a Software Engineer.", "other activity"],
            location: "Mountain View, CA",
            duration: "Sep 2022 - May 2023",
            description: "I worked at GG Navi as a Software Engineer.",
            technology_tags: ["python", 'docker'],
        },
    },
};

export const Dark = {
    args: {
        ...Light.args,
        theme: darkTheme.professional.item,
    },
};


export const LightWithLongText = {
    args: {
        // same interface as the props of the Component
        theme: lightTheme.professional.item,
        experienceItemData: {
            title: "Software Engineer",
            company: "AI Company",
            activities: ["I worked at AI Company as a Software Engineer.", "other activity"],
            location: "Mountain View, CA",
            duration: "Sep 2022 - May 2023",
            description: "AI Company parses SQL metadata from popular Data Platforms, such as Postgres, Redshift, Airflow, BigQuery, Tableau, Hive, etc and facilitates Data Governance Operations by providing a Software as a Service (SaaS) web app. Working asynchronously and fully remotely on adding features and automating (backend) testing of our Data Governance SaaS product",
            technology_tags: ["python", 'docker'],
        },
    },
};