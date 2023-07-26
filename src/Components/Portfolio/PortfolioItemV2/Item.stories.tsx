import Item from "./Item";

export default {
  component: Item,
  title: "Styled PORTFOLIO ITEM",
  tags: ["autodocs"],
};


export const Default = {
    args: {
      // same interface as the props of the Component
      data: {
        title: "Python Package Generator",
        development_period: "2020-2021",
        status: "Mature",
        description: "A CLI tool to generate a Python package with a single command.",
        source_code_repo: "boromir674/cookiecutter-python-package",
        release: [{
          artifact_type: "pypi",
          version: "0.1.0",
          name: "cookiecutter-python-package",
        }],
        tags: ["Python", "CLI", "Automation", "Docker"],
      },
    },
};
