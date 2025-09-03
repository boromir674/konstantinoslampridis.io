import BigScreenView, { BigScreenViewProps } from "./BigScreenView";
import { lightTheme, darkTheme } from '../theme';

// STORY CONFIGURATION
export default {
  component: BigScreenView,
  title: "BigScreenView",
  tags: ["autodocs"],
};

// STORY DEFAULT PROPS VALUES
const args: BigScreenViewProps = {
  // same interface as the props of the Component
  theme: {
    containerBackgroundColor: lightTheme.backgroundColor,
    topHeaderPane: {
      navigationBar: lightTheme.navigationBar,
      backgroundColor: lightTheme.topHeaderPane.backgroundColor,
      themeSwitch: lightTheme.themeSwitch,
    },
    verticalSidePane: {
      personalInfo: {
        containerBackgroundColor: lightTheme.personal.containerBackgroundColor,
        textColor: lightTheme.personal.textColor,
        linkColor: lightTheme.personal.urlTextColor,
        externalURLSVGColor: lightTheme.personal.externalURLSVGColor,
        infoItem: lightTheme.personal.infoItem,
      },
      // Education needs adapter code to match the theme
      education: {
        item: lightTheme.education.item
      },
    },
    verticalMainPane: {
      introduction: lightTheme.introduction,
      professional: lightTheme.professional,
      portfolio: {
        ...lightTheme.portfolio,
        item: {
          ...lightTheme.portfolio.item,
          theme: {
            minGapBetweenPanes: "16px",
            projectTitle: lightTheme.portfolio.item.projectTitle,
            projectDescription: lightTheme.portfolio.item.projectDescription,
            releases: {
              headerFontFamily: lightTheme.portfolio.item.releases.fontFamily,
              headerColor: lightTheme.portfolio.item.releases.color,
              headerMarginBottom: lightTheme.portfolio.item.releases.headerMarginBottom,
              releaseButtonTheme: {
                ...lightTheme.portfolio.item.releases.item,
                icons: [
                  /// pypi
                  {
                    svgStyles: {
                      fill: lightTheme.portfolio.item.releases.item.color,
                      width: "14px",
                      height: "14px",
                    },
                  },
                  /// docker
                  {
                    svgStyles: {
                      fill: lightTheme.portfolio.item.releases.item.color,
                      width: "14px",
                      height: "14px",
                    },
                  },
                  /// github
                  {
                    svgStyles: {
                      fill: lightTheme.portfolio.item.releases.item.color,
                      width: "14px",
                      height: "14px",
                    },
                  },
                ],
              },
              headerFontSize: ""
            },
            // Project Links Pane, ie source code repo docs, etc
            links: {
              headerColor: lightTheme.portfolio.item.resourceLinks.headerColor,
              item: {
                ...lightTheme.portfolio.item.resourceLinks.item,
                icons: [
                  // github
                  {
                    svgStyles: {
                      width: "12px",
                      height: "12px",
                      fill: lightTheme.portfolio.item.resourceLinks.item.color
                    },
                  },
                  // docs
                  {
                    svgStyles: {
                      width: "12px",
                      height: "12px",
                      fill: lightTheme.portfolio.item.resourceLinks.item.color
                    },
                  },
                  // ci/cd
                  {
                    svgStyles: {
                      width: "12px",
                      height: "12px",
                      fill: lightTheme.portfolio.item.resourceLinks.item.color
                    },
                  },
                ],
              },
              header: {
                fontFamily: "",
                fontSize: ""
              }
            },
          },
        },
      }
      // bottomFooterPane: lightTheme.footerStyles,
    },
    bottomFooterPane: lightTheme.footerStyles,
  },

  data: {
    topHeaderPane: {
      sections: [
        { name: "Home", to_element_id: "home-section" },
        { name: "Portfolio", to_element_id: "portfolio-section" },
        { name: "Professional", to_element_id: "professional-section" },
      ],
      onToggle: (active: boolean) => {
        console.log("active: ", active);
      },
      // starting position of toggle, if true it is on the right
      active: true,
      // false -> left, true -> right
    },
    verticalSidePane: {
      personal: {
        name: "John Doe",
        email: "jd@email.io",
        github: "github.com/john-doe",
        gitlab: "gitlab.com/john-doe",
        linkedin: "linkedin.com/in/john-doe",
      },
      education: [
        {
          degree_title: "MSc in Artificial Intelligence",
          university_name: "University of Amsterdam",
          location: "Amsterdam, Netherlands",
          duration: "2014 - 2019",
          thesis_title: "Political Spectrum Aware Topic Model",
          topics: ["ML", "CV", "RL", "NLP"],
        },
        {
          degree_title: "BSc in Applied Informatics",
          university_name: "University of Macedonia",
          location: "Thessaloniki, Greece",
          duration: "2008 - 2013",
          thesis_title: "Computational Analysis of Simplex Points Algorithm",
          topics: [
            "Operating Systems",
            "Linear Programming",
            "Discreet Mathematics",
          ],
        },
      ],
    },
    verticalMainPane: {
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
        portfolio: [
          // PROJECT 1
          {
            title: "Python Package Generator",
            development_period: "2020-2021",
            status: "Mature",
            description:
              "A CLI tool to generate a Python package with a single command.",
            source_code_repo: "boromir674/cookiecutter-python-package",
            resource_links: [
              {
                url: 'https://github.com/example/repo',
                type: 'github',
              },
              {
                url: 'https://example.com/docs',
                type: 'docs',
              },
              {
                url: 'https://example.com/ci-cd',
                type: 'ci/cd',
              },
            ],
            release: [
              {
                type: "pypi",
                name: "cookiecutter-python-package",
                artifact_version: "2.4.0",
                urlText: "https://pypi.org/projects/cookiecutter-python-package",
              },
              {
                // docker pull boromir674/generate-python:v2.4.0
                type: "docker",
                name: "generate-python",
                artifact_version: "v2.4.0",
                urlText: "https://pypi.org/projects/cookiecutter-python-package",
              },
              {
                type: "github",
                name: "cookiecutter-python-package",
                urlText: "https://pypi.org/projects/cookiecutter-python-package",
                artifact_version: "v2.4.0",
              },
            ],
            tags: ["Python", "CLI", "Automation", "Docker"],
          },
          // PROJECT 2
          {
            title: "Neural Style Transfer",
            development_period: "2020-2021",
            status: "Stable",
            description:
              "Re-paint any image with the style of another image (ie Van Gogh painting) using a Neural Style Transfer algorithm, accessible through an easy-to-use CLI.",
            source_code_repo: "boromir674/neural-style-transfer",
            resource_links: [
              {
                url: 'https://github.com/neural-style-transfer',
                type: 'github',
              },
              {
                url: 'https://neural-style-transfer.com/ci-cd',
                type: 'ci/cd',
              },
            ],
            release: [
              {
                type: "pypi",
                artifact_version: "0.6.1",
                name: "neural-style-transfer",
                urlText: "https://pypi.org/projects/cookiecutter-python-package",
              },
              {
                type: "docker",
                name: "nst",
                artifact_version: "v0.6.1",
                urlText: "https://pypi.org/projects/cookiecutter-python-package",
              },
              {
                type: "github",
                name: "neural-style-transfer",
                urlText: "https://pypi.org/projects/cookiecutter-python-package",
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
          // PROJECT 3
          {
            title: "Topic Modeling Toolkit",
            development_period: "2018-2019",
            status: "Mature",
            description:
              "A Python library for Topic Modeling providing a unified interface facilitating various research operations. It is designed to be easily extensible, allowing developers to implement their own algorithms and plug them in the toolkit.",
            source_code_repo: "boromir674/topic-modeling-toolkit",
            resource_links: [
              {
                url: 'https://github.com/neural-style-transfer',
                type: 'github',
              },
            ],
            release: [
              {
                type: "pypi",
                artifact_version: "0.5.2",
                name: "topic-modeling-toolkit",
                urlText: "https://pypi.org/projects/cookiecutter-python-package",
              },
              {
                type: "docker",
                name: "topic-modeling",
                artifact_version: "v0.5.2",
                urlText: "https://pypi.org/projects/cookiecutter-python-package",
              },
              {
                type: "github",
                name: "topic-modeling-toolkit",
                urlText: "https://pypi.org/projects/cookiecutter-python-package",
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
          // Project with 2 Releases
          {
            title: "Project with 2 Releases",
            development_period: "2018-2019",
            status: "Mature",
            description:
              "A Python library for Topic Modeling providing a unified interface facilitating various research operations. It is designed to be easily extensible, allowing developers to implement their own algorithms and plug them in the toolkit.",
            source_code_repo: "boromir674/repo-with-2-releases",
            resource_links: [
              {
                url: 'https://github.com/repo-with-2-releases',
                type: 'github',
              },
              {
                url: 'https://repo-with-2-releases.com/ci-cd',
                type: 'ci/cd',
              },
            ],
            release: [
              {
                type: "pypi",
                artifact_version: "0.5.2",
                name: "repo-with-2-releases",
                urlText: "https://pypi.org/projects/repo-with-2-releases",
              },
              {
                type: "github",
                name: "repo-with-2-releases",
                urlText: "https://pypi.org/projects/repo-with-2-releases",
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
      },
      // sectionIDs: {},
    },
  },
};
export const Light = {
  args,
};

// DARK MODE
const darkProps: BigScreenViewProps = {
  ...args,
  theme: {
    containerBackgroundColor: darkTheme.backgroundColor,
    topHeaderPane: {
      navigationBar: darkTheme.navigationBar,
      backgroundColor: darkTheme.topHeaderPane.backgroundColor,
      themeSwitch: darkTheme.themeSwitch,
    },
    verticalSidePane: {
      personalInfo: {
        containerBackgroundColor: darkTheme.personal.containerBackgroundColor,
        textColor: darkTheme.personal.textColor,
        linkColor: darkTheme.personal.urlTextColor,
        infoItem: darkTheme.personal.infoItem,
        externalURLSVGColor: darkTheme.personal.externalURLSVGColor,
      },
      education: {
        item: darkTheme.education.item,
      },
    },
    verticalMainPane: {
      ...darkTheme,
      // containerBackgroundColor: darkTheme.backgroundColor,
      portfolio: {
        ...darkTheme.portfolio,
        item: {
          theme: {
            projectTitle: darkTheme.portfolio.item.projectTitle,
            projectDescription: darkTheme.portfolio.item.projectDescription,
            minGapBetweenPanes: "16px",
            releases: {
              headerFontFamily: darkTheme.portfolio.item.releases.fontFamily,
              headerColor: darkTheme.portfolio.item.releases.color,
              headerMarginBottom: darkTheme.portfolio.item.releases.headerMarginBottom,
              releaseButtonTheme: {
                ...darkTheme.portfolio.item.releases.item,
                icons: [
                  /// pypi
                  {
                    svgStyles: {
                      fill: darkTheme.portfolio.item.releases.item.color,
                      width: "14px",
                      height: "14px",
                    },
                  },
                  /// docker
                  {
                    svgStyles: {
                      fill: darkTheme.portfolio.item.releases.item.color,
                      width: "14px",
                      height: "14px",
                    },
                  },
                  /// github
                  {
                    svgStyles: {
                      fill: darkTheme.portfolio.item.releases.item.color,
                      width: "14px",
                      height: "14px",
                    },
                  },
                ],
              },
              headerFontSize: ""
            },
            // Project Links Pane, ie source code repo docs, etc
            links: {
              headerColor: darkTheme.portfolio.item.resourceLinks.headerColor,
              item: {
                ...darkTheme.portfolio.item.resourceLinks.item,
                icons: [
                  // github
                  {
                    svgStyles: {
                      width: "12px",
                      height: "12px",
                      fill: darkTheme.portfolio.item.resourceLinks.item.color
                    },
                  },
                  // docs
                  {
                    svgStyles: {
                      width: "12px",
                      height: "12px",
                      fill: darkTheme.portfolio.item.resourceLinks.item.color
                    },
                  },
                  // ci/cd
                  {
                    svgStyles: {
                      width: "12px",
                      height: "12px",
                      fill: darkTheme.portfolio.item.resourceLinks.item.color
                    },
                  },
                ],
              },
              header: {
                fontFamily: "",
                fontSize: ""
              }
            },
          },
          outline: {
            color: "",
            width: ""
          },
          backgroundColor: "",
          color: ""
        },
      },
    },
    bottomFooterPane: darkTheme.footerStyles,
  },
};

export const Dark = {
  args: darkProps,
};
