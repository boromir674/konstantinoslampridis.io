import ProfItemPOC from "./ProfItemPOC";

export default {
  component: ProfItemPOC,
  title: "ProfItemPOC",
  tags: ["autodocs"],
};

export const Light = {
  args: {
    // same interface as the props of the Component
    title: "Software Engineer",
    duration: "Sep 2022 - May 2023",
    company: "Ggvista SAS",
    description: "I worked at Ggvista as a Software Engineer.",
  },
};

export const Dark = {
  args: {
    // same interface as the props of the Component
    ...Light.args,
  },
};
