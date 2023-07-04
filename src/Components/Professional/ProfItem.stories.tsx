import AppProfItem from './ProfItem';
import { lightTheme, darkTheme } from '../../AppStyles';

export default {
  component: AppProfItem,
  title: "AppProfItem",
  tags: ["autodocs"],
};


export const Light = {
    args: {
        // same interface as the props of the Component
        theme: lightTheme.professional.item,
        experienceItemData: {
            title: "Software Engineer",
            company: "GG Navi",
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