import PortfolioSection, { defaultProps, ResponsiveLocalStorageLayoutProps } from "./PortfolioSection";

import { commonStyling } from "../../AppStyles";
import lightMode from "../../LightMode";
import darkMode from "../../DarkMode";
import { ThemeManager } from "../../lib";

const tm = new ThemeManager(lightMode, darkMode, commonStyling);
const {
  light: {
    verticalMainPane: {
      portfolio: portfolioStylesLight,
    }
  },
  dark: {
    verticalMainPane: {
      portfolio: portfolioStylesDark,
    }
  }
} = tm.toAppColorSet();


export default {
  component: PortfolioSection,
  title: "PortfolioSection",
  tags: ["autodocs"],
};


const args: ResponsiveLocalStorageLayoutProps = {
  // ID is a required prop, since this component is designed to act as a
  // section that the navigation system can scroll to on user click
  id: "does-not-matter-in-this-story",
  data: [
    {
      title: "Python Package Generator",
      development_period: "2020-2021",
      status: "Mature",
      description:
        "A CLI tool to generate a Python package with a single command.",
      source_code_repo: "boromir674/cookiecutter-python-package",
      release: [
        {
          type: "pypi",
          artifact_version: "0.1.0",
          name: "cookiecutter-python-package",
        },
      ],
      tags: ["Python", "CLI", "Automation", "Docker"],
    },
    {
      title: "Neural Style Transfer",
      development_period: "2020-2021",
      status: "Stable",
      description:
        "Re-paint any image with the style of another image (ie Van Gogh painting) using a Neural Style Transfer algorithm, accessible through an easy-to-use CLI.",
      source_code_repo: "boromir674/neural-style-transfer",
      release: [
        {
          type: "pypi",
          artifact_version: "0.6.1",
          name: "neural-style-transfer",
        },
      ],
      tags: [
        "Neural Style Transfer",
        "Deep Learning",
        "Python",
        "Docker",
        "CLI",
        "Sphinx",
        "PyPI",
      ],
    },
    {
      title: "Topic Modeling Toolkit",
      development_period: "2018-2019",
      status: "Mature",
      description:
        "A Python library for Topic Modeling providing a unified interface facilitating various research operations. It is designed to be easily extensible, allowing developers to implement their own algorithms and plug them in the toolkit.",
      source_code_repo: "boromir674/topic-modeling-toolkit",
      release: [
        {
          type: "pypi",
          artifact_version: "0.5.2",
          name: "topic-modeling-toolkit",
        },
      ],
      tags: [
        "Machine Learning",
        "Unsupervised Learning",
        "Topic Modeling",
        "Regression Testing",
        "Python",
        "PyPI",
        "automation",
        "CLI",
      ],
    },
  ],
  theme: {
    ...portfolioStylesLight,
    item: {
      ...portfolioStylesLight.item,
      outline: `${portfolioStylesLight.item.outline.width} solid ${portfolioStylesLight.item.outline.color}`,
    },
  },
  ...defaultProps,
};


export const LightWithSolidOutline = {
  args,
};


export const DarkWithSolidOutline = {
  args: {
    ...LightWithSolidOutline.args,
    theme: {
      ...portfolioStylesDark,
      item: {
        ...portfolioStylesDark.item,
        outline: `${portfolioStylesDark.item.outline.width} solid ${portfolioStylesDark.item.outline.color}`,
      },
    },
  },
};



export const LightWithSimpleOutline = {
  args: {
    ...LightWithSolidOutline.args,
    theme: {
      ...LightWithSolidOutline.args.theme,
      item: {
        ...LightWithSolidOutline.args.theme.item,
        outline: `${portfolioStylesLight.item.outline.width} ${portfolioStylesLight.item.outline.color}`,
      }
    },
  },
};

export const DarkWithSimpleOutline = {
  args: {
    ...DarkWithSolidOutline.args,
    theme: {
      ...DarkWithSolidOutline.args.theme,
      item: {
        ...DarkWithSolidOutline.args.theme.item,
        outline: `${portfolioStylesDark.item.outline.width} ${portfolioStylesDark.item.outline.color}`,
      }
    },
  },
};
