import ProfItemPOC, { type ProfItemProps } from "./ProfItemPOC";
import { lightTheme, darkTheme } from '../../theme';

export default {
  component: ProfItemPOC,
  title: "ProfItemPOC",
  tags: ["autodocs"],
};

const lightProps: ProfItemProps = {
  // same interface as the props of the Component
  // theme
  theme: {
    title: {
      fontFamily: lightTheme.professional.item.title.fontFamily,
      fontSize: lightTheme.professional.item.title.fontSize,
    },
    body: {
      fontFamily: lightTheme.professional.item.body.fontFamily,
      fontSize: lightTheme.professional.item.body.fontSize,
    },
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
  location: "Some Location",
};
export const Light = {
  args: lightProps,
};


const darkProps: ProfItemProps = {
  // same interface as the props of the Component
  ...Light.args,
  theme: {
    tags: {
      item: darkTheme.professional.item.tag,
    },
  },
};
export const Dark = {
  args: darkProps,
}
