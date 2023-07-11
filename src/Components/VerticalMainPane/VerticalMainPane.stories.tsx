import { VerticalMainPane } from "./VerticalMainPane";
import { lightTheme, darkTheme } from "../../AppStyles";

export default {
  component: VerticalMainPane,
  title: "VerticalMainPane",
  tags: ["autodocs"],
};

export const Light = {
  args: {
    // same interface as the props of the Component
    theme: {
      ...lightTheme,
      // containerBackgroundColor: '#FFAD00',
      containerBackgroundColor: '#009385',
      
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
    },
  },
};

export const Dark = {
  args: {
    ...Light.args,
    theme: {
      ...darkTheme,
      containerBackgroundColor: '#D6F5E0',
      // introduction: darkTheme.introduction,
      // professional: darkTheme.professional,
    },
  },
};
