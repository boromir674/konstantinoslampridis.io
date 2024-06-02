import PortfolioSectionV3, { defaultProps, ResponsiveLocalStorageLayoutProps } from "./PortfolioSectionV3";

// import App Styles Symbols
import lightMode from "../../LightMode";
import darkMode from "../../DarkMode";
import { ComputedTheme, mergeStylings, commonStyling } from "../../AppStyles";

const lightTheme: ComputedTheme = mergeStylings(lightMode, commonStyling);
const darkTheme: ComputedTheme = mergeStylings(darkMode, commonStyling);

export default {
  component: PortfolioSectionV3,
  title: "PortfolioSectionV3",
  tags: ["autodocs"],
};

const argsLight: ResponsiveLocalStorageLayoutProps = {
  id: "arbitrary-id-not-used-by-components-in-this-DOM-scope",
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
          name: "cookiecutter-python-package",
          artifact_version: "2.4.0",
        },
        {
          // docker pull boromir674/generate-python:v2.4.0
          type: "docker",
          name: "generate-python",
          artifact_version: "v2.4.0",
        },
        {
          type: "github",
          name: "cookiecutter-python-package",
          artifact_version: "v2.4.0",
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
        {
          type: "docker",
          name: "nst",
          artifact_version: "v0.6.1",
        },
        {
          type: "github",
          name: "neural-style-transfer",
          artifact_version: "v0.6.1",
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
        {
          type: "docker",
          name: "topic-modeling",
          artifact_version: "v0.5.2",
        },
        {
          type: "github",
          name: "topic-modeling-toolkit",
          artifact_version: "v0.5.2",
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
  // THEME - Styles - Colors
  theme: {

    // OUTER MOST element of 'Portfolio Section Header' + 'Portfolio Projects Interactive Grid'
    container: lightTheme.portfolio.container,  // Portfolio Section Container

    // HEADER with Title; ie 'Open Source & Portfolio'
    sectionHeader: lightTheme.portfolio.sectionHeader,  // Portfolio Section Header

    // Portfolio Project Item
    item: {
      // outline:
      outline: `${lightTheme.portfolio.item.outline.width} solid ${lightTheme.portfolio.item.outline.color}`,
      backgroundColor: lightTheme.portfolio.item.backgroundColor,  // not used
      color: lightTheme.portfolio.item.color,  // Project Header color css property
      theme: {
        releases: {
          headerFontFamily: lightTheme.portfolio.item.releases.fontFamily,
          headerColor: lightTheme.portfolio.item.releases.color,
          headerMarginBottom: lightTheme.portfolio.item.releases.headerMarginBottom,
          releaseButtonTheme: lightTheme.portfolio.item.releases.item
        },
      }
    },
  },
  // Other Props, most likely with dedicated fallback values
  ...defaultProps,
};

export const Light = {
  args: argsLight
};


const argsDark: ResponsiveLocalStorageLayoutProps = {
  ...argsLight,
  theme: {
    ...darkTheme.portfolio,
    item: {
      outline: `${darkTheme.portfolio.item.outline.width} solid ${darkTheme.portfolio.item.outline.color}`,
      backgroundColor: darkTheme.portfolio.item.backgroundColor,
      color: darkTheme.portfolio.item.color,
      theme: {
        releases: {
          ...darkTheme.portfolio.item.releases,
          headerColor: darkTheme.portfolio.item.releases.color,
          headerFontFamily: darkTheme.portfolio.item.releases.fontFamily,
          releaseButtonTheme: darkTheme.portfolio.item.releases.item
        },
      }
    },
  },
};

export const Dark = {
  args: argsDark
};
