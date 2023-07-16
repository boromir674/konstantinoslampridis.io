import PortfolioSectionV3, { ResponsiveLocalStorageLayoutProps } from "./PortfolioSectionV3";

export default {
  component: PortfolioSectionV3,
  title: "PortfolioSectionV3",
  tags: ["autodocs"],
};

// const args: ResponsiveLocalStorageLayoutProps = {
const args = {
  theme: {
    container: {
      backgroundColor: "#D5D7C6",
    },
    item: {
      backgroundColor: "#D5D7C6",
      color: "#125160",
    },
  },
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
};

export const Light = {
  args,
};


export const Dark = {
  args: {
    ...Light.args,
    theme: {
      container: {
        backgroundColor: "#125160",
      },
      item: {
        backgroundColor: "#125160",
        color: "#D5D7C6",
      },
    },
  },
};
