import PortfolioSectionFC from "./PortfolioSectionFC";

export default {
  component: PortfolioSectionFC,
  title: "PortfolioSectionFC",
  tags: ["autodocs"],
};

export const Light = {
  args: {
    // same interface as the props of the Component
    data: [
      {
        title: "Python Package Generator",
      },
      {
        title: "Neural Style Transfer",
      },
      {
        title: "Topic Modeling Toolkit",
      },
      {
        title: "Software Patterns",
      },
      {
        title: "Pytest Object Getter",
      },
    ],
  },
};

export const Dark = {
  args: {
    // same interface as the props of the Component
    ...Light.args,
  },
};
