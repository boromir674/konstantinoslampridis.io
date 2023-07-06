import AppProfSection from './AppProfSection';
import { lightTheme, darkTheme } from '../../AppStyles';

export default {
  component: AppProfSection,
  title: "AppProfSection",
  tags: ["autodocs"],
};

// 1: Light Mode Colors
export const LightMode = {
  args: {
      // same interface as the props of the Component
      data: {experience_items: [
        {
          title: "Software Engineer",
          company: "GG Navi",
          activities: ["other activity"],
          location: "Mountain View, CA",
          duration: "Sep 2022 - May 2023",
          description: "I worked at GG Navi as a Software Engineer.",
          technology_tags: ["python", 'docker'],
        },
        {
          title: "Software Engineer",
          company: "GG Navi",
          location: "Mountain View, CA",
          activities: ["other activity"],
          duration: "Sep 2022 - May 2023",
          description: "I worked at GG Navi as a Software Engineer.",
          technology_tags: ["python", 'docker'],
        },
      ]},
      theme: lightTheme.professional,
      // {
      //   item: lightTheme.professional.item,
      //   containerBackground: lightTheme.professional.containerBackground,
      // },
  },
};


// 2: Dark Mode Colors
export const DarkMode = {
  args: {
    ...LightMode.args,
    theme: darkTheme.professional,
    // theme: {
    //   item: darkTheme.professional.item,
    //   containerBackground: darkTheme.professional.containerBackground,
    // },
  },
};      
