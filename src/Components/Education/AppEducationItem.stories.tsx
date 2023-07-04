import AppEducationItem from './AppEducationItem';
import { lightTheme, darkTheme } from '../../AppStyles';

export default {
  component: AppEducationItem,
  title: "AppEducationItem",
  tags: ["autodocs"],
};


export const Light = {
    args: {
        // same interface as the props of the Component
        theme: lightTheme.education.item,
        educationItemData: {
            name: "University of Amsterdam",
            location: "Amsterdam, Netherlands",
            degree: "MSc in Artificial Intelligence",
            thesis_title: "Political Spectrum Aware Topic Model",
            date: "2019",
            topics: ["python", 'docker'],
        },
    },
};

export const Dark = {
    args: {
        ...Light.args,
        theme: darkTheme.professional.item,
    },
};