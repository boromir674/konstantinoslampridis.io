import ProfessionalItem from "./ProfessionalItem";
import { ThemeManagerFactory } from "../../lib";

const tm = ThemeManagerFactory.createFromUserDesign();

export default {
  component: ProfessionalItem,
  title: "ProfessionalItem",
  tags: ["autodocs"],
};

export const Light = {
  args: {
    // same interface as the props of the Component
    // theme
    theme: {
      tags: {
        item: tm.light.professional.item.tag,
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
        item: tm.dark.professional.item.tag,
      },
    },
  },
};
