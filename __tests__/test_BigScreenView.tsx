/**
 * @jest-environment jsdom
 */

// Test Helpers Imports
import React from "react";
import { Context as ResponsiveContext } from "react-responsive";
import { render } from "@testing-library/react";

// Business-logic Imports
import BigScreenView, { BigScreenViewProps } from "../src/Components/BigScreenView";
import { lightTheme } from '../src/theme';

// TEST DATA
const DATA = {
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
};

// Helper Code to adapt Lib Theme to App Theme
type LibTheme = typeof lightTheme;
type AppColorTheme = BigScreenViewProps["theme"];

// compute maximum number of Releases contained in a single portfolio item
const maxNumberOfReleasesPerPortfolioItems = DATA.verticalMainPane.data.portfolio.reduce(
    (acc, { release = [] }) => Math.max(acc, release.length),
    0
);
// compute maximum number of links contained in a single portfolio item
const maxNumberOfLinksPerPortfolioItems = DATA.verticalMainPane.data.portfolio.reduce(
    (acc, { resource_links = [] }) => Math.max(acc, resource_links.length),
    0
);

const computeTheme = (theme: LibTheme): AppColorTheme => {
    console.log("Lib Description Theme: ", theme.portfolio.item.projectDescription);
    const adaptTheme = (theme: LibTheme) => {
        return {
            containerBackgroundColor: theme.backgroundColor,
            topHeaderPane: {
                themeSwitch: theme.themeSwitch,
                navigationBar: theme.navigationBar,
                backgroundColor: theme.topHeaderPane.backgroundColor,
            },
            verticalSidePane: {
                personalInfo: {
                    // pass Theme Personal Color Design
                    ...theme.personal,
                    // adjust interface
                    linkColor: theme.personal.urlTextColor,
                },
                education: theme.education,
            },
            verticalMainPane: {
                introduction: theme.introduction,
                professional: theme.professional,
                portfolio: {
                    ...theme.portfolio,
                    item: {
                        ...theme.portfolio.item,
                        theme: {
                            // Portfolio Project Item - Project Title and Description
                            ...theme.portfolio.item,
                            links: {
                                ...theme.portfolio.item.resourceLinks,
                                item: {
                                    ...theme.portfolio.item.resourceLinks.item,
                                    icon: {
                                        svgStyles: {
                                            // TODO: supply from theme object
                                            width: "12px",
                                            height: "12px",
                                            fill: theme.portfolio.item.resourceLinks.item.color,
                                        },
                                    },
                                },
                            },
                            // Portfolio Project Item - Software Releases
                            releases: {
                                ...theme.portfolio.item.releases,
                                headerFontFamily: theme.portfolio.item.releases.fontFamily,
                                headerColor: theme.portfolio.item.releases.color,
                                releaseButtonTheme: {
                                    ...theme.portfolio.item.releases.item,
                                    icon: {
                                        svgStyles: {
                                            // TODO: supply from theme object
                                            width: "12px",
                                            height: "12px",
                                            fill: theme.portfolio.item.releases.item.color,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                // ...theme,
                // containerBackgroundColor: theme.backgroundColor,
            },
            bottomFooterPane: {
                ...theme.footerStyles,
                // svgStyles: {
                //   width: "15px",
                //   height: "15px",
                // }
            },
        };
    };
    const appTheme = adaptTheme(theme);

    console.log("Addapted Description Theme Artifact 1: ", appTheme.verticalMainPane.portfolio.item.projectDescription);
    console.log("Addapted Description Theme Artifact 2: ", appTheme.verticalMainPane.portfolio.item.theme.projectDescription);

    // Adapt 'icon' to 'icons' by crating an rray of the same item multiple times
    const adaptedAppTheme: AppColorTheme = {
        ...appTheme,
        verticalMainPane: {
            ...appTheme.verticalMainPane,
            portfolio: {
                ...appTheme.verticalMainPane.portfolio,
                item: {
                    ...appTheme.verticalMainPane.portfolio.item,
                    theme: {
                        ...appTheme.verticalMainPane.portfolio.item.theme,
                        links: {
                            ...appTheme.verticalMainPane.portfolio.item.theme.links,
                            item: {
                                ...appTheme.verticalMainPane.portfolio.item.theme.links.item,
                                icons: Array.from({ length: maxNumberOfLinksPerPortfolioItems }, () => appTheme.verticalMainPane.portfolio.item.theme.links.item.icon
                                ),
                            },
                        },
                        releases: {
                            ...appTheme.verticalMainPane.portfolio.item.theme.releases,
                            releaseButtonTheme: {
                                ...appTheme.verticalMainPane.portfolio.item.theme.releases.releaseButtonTheme,
                                icons: Array.from({ length: maxNumberOfReleasesPerPortfolioItems }, () => appTheme.verticalMainPane.portfolio.item.theme.releases.releaseButtonTheme.icon
                                ),
                            },
                        },
                    },
                },
            },
        },
    }
    console.log("Final Description Theme: ", adaptedAppTheme.verticalMainPane.portfolio.item.theme.projectDescription);

    return adaptedAppTheme;
};

const LIGHT_THEME: AppColorTheme = computeTheme(lightTheme);

// PROPS VALUES
const args: BigScreenViewProps = {
  // same interface as the props of the Component
  theme: LIGHT_THEME,
  data: DATA,
};

export const Light = {
  args,
};


describe("Test App width = 700", () => {

  beforeEach(() => {
    // mock ResizeObserver browser-api
    window.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }))
  })

  test("matches the snapshot", () => {
    const { container: mobile } = render(
      <ResponsiveContext.Provider value={{ width: 700 }}>
        <BigScreenView {...Light.args} />
      </ResponsiveContext.Provider>
    );
    expect(mobile).toMatchSnapshot();
  });
});

// describe("Test App width = 400", () => {
//   test("matches the snapshot", () => {
//     const { container: mobile } = render(
//       <ResponsiveContext.Provider value={{ width: 400 }}>
//         <IndexPage />
//       </ResponsiveContext.Provider>
//     );
//     expect(mobile).toMatchSnapshot();
//   });
// });
