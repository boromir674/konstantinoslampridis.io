import { FC } from "react";
import PortfolioSection, { defaultProps, ResponsiveLocalStorageLayoutProps } from "./PortfolioSection";
import { PortfolioLayoutItemContentProps } from './PortfolioItem/PortfolioItemContainer';

import DESIGN_TOKENS from "../../design-system/tokens.json";

// import App Styles Symbols
import { lightTheme, darkTheme } from '../../theme';
import { on } from "events";

import PortfolioItemInterface from "../../PortfolioItemInterface";
import { AppPortfolioItemProps } from "./AppPortfolioItem";
type RenderProps = (data: PortfolioItemInterface, theme: AppPortfolioItemProps['theme']) => React.ReactNode;


// Adapted Component of PortfolioSection allowing multiple Grids (side-by-side) for Style comparison
interface PortfolioSectionMultiGridProps {
  // array of PortfolioSection instances to render
  grids: ResponsiveLocalStorageLayoutProps[];
};
const PortfolioSectionMultiGrid: FC<PortfolioSectionMultiGridProps> = (props) => {
  return (
    // if array has 1 item render it, if multiple wrap them in a div
    <>
      {props.grids.length === 1 ? <PortfolioSection {...props.grids[0]} /> : <div style={{
        display: "flex", flexDirection: "row",
        // make box width bigger
        // width: "100vw",
      }}>{props.grids.map(function (gridArgs, index) { return (<PortfolioSection key={index} {...gridArgs} />) })}</div>}
    </>
  );
}

export default {
  component: PortfolioSectionMultiGrid,
  title: "PortfolioSection",
  tags: ["autodocs"],
};

const renderPropsOverride: RenderProps = (data, theme) => {
  return <div></div>
}

const argsLight: ResponsiveLocalStorageLayoutProps = {
  // other properties...
  cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  rowHeight: 41,
  // other properties...
  id: "arbitrary-id-not-used-by-components-in-this-DOM-scope",
  data: [
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
  // THEME - Styles - Colors
  theme: {
    // OUTER MOST element of 'Portfolio Section Header' + 'Portfolio Projects Interactive Grid'
    container: lightTheme.portfolio.container, // Portfolio Section Container

    // HEADER with Title; ie 'Open Source & Portfolio'
    sectionHeader: lightTheme.portfolio.sectionHeader, // Portfolio Section Header

    // Reset Layout - Button
    resetLayoutButton: lightTheme.portfolio.resetLayoutButton,

    // Portfolio Project Item
    item: {
      // outline:
      outline: `${lightTheme.portfolio.item.outline.width} solid ${lightTheme.portfolio.item.outline.color}`,
      backgroundColor: lightTheme.portfolio.item.backgroundColor, // not used
      color: lightTheme.portfolio.item.color, // Project Header color css property
      theme: {
        // Project Title
        projectTitle: lightTheme.portfolio.item.projectTitle,
        // Project Description
        projectDescription: lightTheme.portfolio.item.projectDescription,
        // Project Releases Pane
        releases: {
          headerFontFamily: lightTheme.portfolio.item.releases.fontFamily,
          headerFontSize: lightTheme.portfolio.item.releases.headerFontSize,
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
        },
        // Project Links Pane, ie source code repo docs, etc
        links: {
          headerColor: lightTheme.portfolio.item.resourceLinks.headerColor,
          header: {
            fontFamily: lightTheme.portfolio.item.resourceLinks.header.fontFamily,
            fontSize: lightTheme.portfolio.item.resourceLinks.header.fontSize,
          },
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
        },
      }
    },
  },
  // Other Props, most likely with dedicated fallback values
  ...defaultProps,
  // renderProps: renderPropsOverride,
  element_to_render: defaultProps.element_to_render as FC<PortfolioLayoutItemContentProps>,
};

// STORY: Portflolio Section as a Responsive Grid with a 4 Layout Items, and Light Theme
export const Light = {
  args: { grids: [argsLight] }
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
          releaseButtonTheme: {
            ...darkTheme.portfolio.item.releases.item,
            icons: [
              /// pypi
              {
                svgStyles: {
                  ...argsLight.theme.item.theme.releases.releaseButtonTheme.icons?.[0].svgStyles,
                  fill: darkTheme.portfolio.item.releases.item.color,
                },
              },
              /// docker
              {
                svgStyles: {
                  ...argsLight.theme.item.theme.releases.releaseButtonTheme.icons?.[1].svgStyles,
                  // leave default black fill color
                  // fill: darkTheme.portfolio.item.releases.item.color,
                },
              },
              /// github
              {
                svgStyles: {
                  ...argsLight.theme.item.theme.releases.releaseButtonTheme.icons?.[2].svgStyles,
                  fill: darkTheme.portfolio.item.releases.item.color,
                },
              },
            ],
          }
        },
        links: {
          headerColor: darkTheme.portfolio.item.resourceLinks.headerColor,
          header: darkTheme.portfolio.item.resourceLinks.header,
          item: {
            ...darkTheme.portfolio.item.resourceLinks.item,
            icons: [
              // github
              {
                svgStyles: {
                  ...argsLight.theme.item.theme.releases.releaseButtonTheme.icons?.[0].svgStyles,
                  fill: darkTheme.portfolio.item.resourceLinks.item.color,
                },
              },
              // docs
              {
                svgStyles: {
                  ...argsLight.theme.item.theme.releases.releaseButtonTheme.icons?.[1].svgStyles,
                  fill: darkTheme.portfolio.item.resourceLinks.item.color
                },
              },
              // ci/cd
              {
                svgStyles: {
                  ...argsLight.theme.item.theme.releases.releaseButtonTheme.icons?.[2].svgStyles,
                  fill: darkTheme.portfolio.item.resourceLinks.item.color
                },
              },
            ],
          }
        },
        projectTitle: {
          fontFamily: "",
          fontSize: undefined
        },
        projectDescription: {
          fontFamily: "",
          fontSize: ""
        }
      }
    },
  },
};

// STORY: Portflolio Section as a Responsive Grid with a 4 Layout Items, and Dark Theme
export const Dark = {
  args: { grids: [argsDark] }
};


// STORY: Responsive Grid with 1 Layout Item that has 2 Release Buttons
export const SingleItemWithTwoReleaseButtons = {
  args: {
    grids: [{
      ...argsLight,
      data: [{
        ...argsLight.data[0],
        // release: argsLight.data[0].release ? [argsLight.data[0].release[0]] : []
        // 2 release items
        release: argsLight.data[0].release ? [argsLight.data[0].release[0], argsLight.data[0].release[1]] : []
      }],
    }]
  }
};


// STORY: 2 Dark Grids to compare Contrast of different Theme Color schemes
// Each Grid has only 1 Item which is sufficient to compare Color schemes contrast
export const TwoDarkGridsSideBySide = {
  args: {
    grids: [
      { ...argsDark, data: [argsDark.data[0]] },
      {
        // EXPERIMENTAL COLOR SCHEME to Consider for next ITERATION
        ...argsDark,
        data: [argsDark.data[0]],
        theme: {
          ...argsDark.theme,
          item: {
            ...argsDark.theme.item,

            // Portfolio Item Background Color
            // backgroundColor: argsDark.theme.item.backgroundColor,
            // color: argsDark.theme.item.color,

            theme: {
              ...argsDark.theme.item.theme,
              releases: {
                ...argsDark.theme.item.theme.releases,
                // headerColor: darkTheme.portfolio.item.releases.color,
                // headerFontFamily: darkTheme.portfolio.item.releases.fontFamily,
                releaseButtonTheme: {
                  ...argsDark.theme.item.theme.releases.releaseButtonTheme,
                  // Darker than Release Button Background
                  dialogBackgroundColor: DESIGN_TOKENS['--md-sys-color-on-secondary-dark'],
                  // Same as Release Button Background
                  codeBackgroundColor: DESIGN_TOKENS['--md-sys-color-surface-variant-dark'],
                  // CURRENT DESIGN
                  // onHoverCodeBackgroundColor: DESIGN_TOKENS['--md-sys-color-on-tertiary-dark'],
                  // NEW DESIGN Darker than the Dialog Background, which actually emphasizes the interaction! GOOD!
                  onHoverCodeBackgroundColor: DESIGN_TOKENS['--md-sys-color-inverse-on-surface-dark'],
                },
              },
            },
          },
        },
      }]
  }
};


// STORY: 2 Light Grids to compare Contrast of different Theme Color schemes
const twoLightGridsSideBySideArgs: PortfolioSectionMultiGridProps = {
  ...TwoDarkGridsSideBySide.args,
  grids: [
    { ...argsLight, data: [argsLight.data[0]] },
    {
      // EXPERIMENTAL COLOR SCHEME to Consider for next ITERATION
      ...argsLight,
      data: [argsLight.data[0]],
      theme: {
        ...argsLight.theme,
        item: {
          ...argsLight.theme.item,

          // backgroundColor: argsDark.theme.item.backgroundColor,
          // color: argsDark.theme.item.color,

          theme: {
            ...argsLight.theme.item.theme,
            releases: {
              ...argsLight.theme.item.theme.releases,
              // headerColor: darkTheme.portfolio.item.releases.color,
              // headerFontFamily: darkTheme.portfolio.item.releases.fontFamily,
              releaseButtonTheme: {
                ...argsLight.theme.item.theme.releases.releaseButtonTheme,
                // Darker than Release Button Background
                dialogBackgroundColor: DESIGN_TOKENS['--md-sys-color-on-secondary-dark'],
                // Same as Release Button Background
                codeBackgroundColor: DESIGN_TOKENS['--md-sys-color-surface-variant-dark'],
                // CURRENT DESIGN
                // onHoverCodeBackgroundColor: DESIGN_TOKENS['--md-sys-color-on-tertiary-dark'],
                // NEW DESIGN Darker than the Dialog Background, which actually emphasizes the interaction! GOOD!
                onHoverCodeBackgroundColor: DESIGN_TOKENS['--md-sys-color-inverse-on-surface-dark'],
              },
            },
          },
        },
      },
    }]
};

export const TwoLightGridsSideBySide = {
  args: twoLightGridsSideBySideArgs
};
