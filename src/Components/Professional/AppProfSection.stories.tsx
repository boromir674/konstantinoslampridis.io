import AppProfSection, { type ProfessionalSectionProps } from './AppProfSection';

// Theme / Style initialization Operations
import lightMode from "../../LightMode";
import darkMode from "../../DarkMode";

import { ComputedTheme, mergeStylings, commonStyling } from "../../AppStyles";

const lightTheme: ComputedTheme = mergeStylings(lightMode, commonStyling);
const darkTheme: ComputedTheme = mergeStylings(darkMode, commonStyling);

// Story summary / metadata
export default {
  component: AppProfSection,
  title: "AppProfSection",
  tags: ["autodocs"],
};

interface ComponentStory {
  args: ProfessionalSectionProps;
}

// 1: Light Mode Colors
const LightMode: ComponentStory = {
  args: {
    // same interface as the props of the Component
    data: {
      experience_items: [
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
      ]
    },
    theme: lightTheme.professional,
    id: 'storybook-professional-section-light',
  },
};
export { LightMode };

// 2: Dark Mode Colors
const DarkMode: ComponentStory = {
  args: {
    ...LightMode.args,
    theme: darkTheme.professional,
    id: 'storybook-professional-section-dark',
  },
};      
export { DarkMode };
