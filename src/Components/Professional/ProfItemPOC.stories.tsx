import ProfItemPOC from "./ProfItemPOC";
import lightTheme from "../../LightMode";
import darkTheme from "../../DarkMode";

export default {
  component: ProfItemPOC,
  title: "ProfItemPOC",
  tags: ["autodocs"],
};

export const Light = {
  args: {
    // same interface as the props of the Component
    // theme
    theme: {
      tags: {
        item: lightTheme.professional.item.tag,
        // item: {
        //   ...lightTheme.professional.item.tag,
        //   onHoverBackgroundColor: "#000000",
        //   onHoverTextColor: "#ffffff",
        // },
      },
    },
    // data
    title: "Software Engineer",
    duration: "Sep 2022 - May 2023",
    company: "Ggvista SAS",
    description: "I worked at Ggvista as a Software Engineer.",
    activities: [
      "I worked on the development of a web application for the management of the company's internal processes.",
      "I worked on the development of a web application for the management of the company's internal processes.",
    ],
    technology_tags: ["React", "TypeScript", "JavaScript"],
  },
};

export const Dark = {
  args: {
    // same interface as the props of the Component
    ...Light.args,
    theme: {
      tags: {
        item: darkTheme.professional.item.tag,
      },
    },
  },
};
