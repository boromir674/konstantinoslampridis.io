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