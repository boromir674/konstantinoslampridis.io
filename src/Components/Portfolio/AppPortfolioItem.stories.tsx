import AppPortfolioItem, { AppPortfolioItemProps } from "./AppPortfolioItem";
import { FC } from "react";
// Import Style Objects
import { lightTheme, darkTheme } from '../../theme';


// Buttons that span modal dialog, such as Release Button and Resource Link Button
// require access to the ZIndex Context to be able to update their parents' z-index state.
// here we do not update any parent, but we still need it to instantiate the component
import ZIndexContext from '../../ZIndexContext';


// Proxy Component that encapsulates Content initialization
const AppPortfolioItemZIndex: FC<AppPortfolioItemProps> = (props: AppPortfolioItemProps) => {
  return (
    <ZIndexContext.Provider value={{
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      setZIndex: (zIndex: number) => null,
    }}>
      <AppPortfolioItem {...props} />
    </ZIndexContext.Provider>
  )
};

// Story Configuration
export default {
    component: AppPortfolioItemZIndex,
    title: "AppPortfolioItem",
    tags: ["autodocs"],
};

const args: AppPortfolioItemProps = {
    data: {
        title: "Cookiecutter Python Package",
        development_period: "2021-2024",
        status: "Mature",
        source_code_repo: "boromir674/cookiecutter-python-package",
        description: "A tool command-line interface (CLI) to automatically scaffold a new Python Open Source Project, along with multiple config files! Implemented using Python, Github Actions, Sphinx & Cookiecutter.",
        resource_links: [
            {
                // title: 'Source Code',
                url: 'https://github.com/example/repo',
                type: 'github',
            },
            {
                // title: 'Documentation',
                url: 'https://example.com/docs',
                type: 'docs',
            },
            {
                // title: 'CI/CD Pipeline',
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
                urlText: "https://hub.docker.com/r/boromir674/generate-python",
            },
            {
                type: "github",
                name: "cookiecutter-python-package",
                artifact_version: "v2.4.0",
                urlText: "https://github.com/boromir674/cookiecutter-python-package",
            },
        ],
        tags: [
            "Project Template",
            "Code Generator",
            "Automation",
            "Cookiecutter",
            "CLI",
            "Python",
            "PyPI",
            "Sphinx",
        ],
    },
    theme: {
        links: {
            ...lightTheme.portfolio.item.resourceLinks,
            item: {
                ...lightTheme.portfolio.item.resourceLinks.item,
                icons: [
                    // github
                    {
                        // svgStyles?: React.SVGProps<SVGSVGElement>;
                        // Path props, except for d attribute
                        svgStyles: {
                            width: "30",
                            height: "30",
                        }
                    },
                    // docs
                    {
                        svgStyles: {
                            width: "30",
                            height: "30",
                        }
                    },
                    // ci/cd
                    {
                        svgStyles: {
                            width: "30",
                            height: "30",
                        }
                    },
                ],
            }
        },
        releases: {
            headerFontFamily: "Arial",
            headerColor: "black",
            headerMarginBottom: "10px",
            releaseButtonTheme: {
                backgroundColor: "black",
                color: "white",
                onHoverBackgroundColor: "white",
                onHoverColor: "black",
                icons: [
                    /// pypi
                    {
                        svgStyles: {
                            fill: lightTheme.portfolio.item.releases.item.color,
                            width: "30",
                            height: "30",
                        },
                    },
                    /// docker
                    {
                        svgStyles: {
                            fill: lightTheme.portfolio.item.releases.item.color,
                            width: "30",
                            height: "30",
                        },
                    },
                    /// github
                    {
                        svgStyles: {
                            fill: lightTheme.portfolio.item.releases.item.color,
                            width: "30",
                            height: "30",
                        },
                    },
                ],
            },
        },
    },
};

export const Simple = {
    args,
};

const lightArgs: AppPortfolioItemProps = {
    ...args,
    theme: {
        links: {
            ...lightTheme.portfolio.item.resourceLinks,
            item: {
                ...lightTheme.portfolio.item.resourceLinks.item,
                icons: [
                    // github
                    {
                        // svgStyles?: React.SVGProps<SVGSVGElement>;
                        // Path props, except for d attribute
                        svgStyles: {
                            ...args.theme.links.item.icons?.[0]?.svgStyles,
                            fill: lightTheme.portfolio.item.resourceLinks.item.color,
                        }
                    },
                    // docs
                    {
                        svgStyles: {
                            ...args.theme.links.item.icons?.[1]?.svgStyles,
                            fill: lightTheme.portfolio.item.resourceLinks.item.color,
                        }
                    },
                    // ci/cd
                    {
                        svgStyles: {
                            ...args.theme.links.item.icons?.[2]?.svgStyles,
                            fill: lightTheme.portfolio.item.resourceLinks.item.color,
                        }
                    },
                ],
            }
        },
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
                            ...args.theme.releases.releaseButtonTheme.icons?.[0]?.svgStyles,
                            fill: lightTheme.portfolio.item.releases.item.color,
                        },
                    },
                    /// docker
                    {
                        svgStyles: {
                            ...args.theme.releases.releaseButtonTheme.icons?.[1]?.svgStyles,
                            fill: lightTheme.portfolio.item.releases.item.color,
                        },
                    },
                    /// github
                    {
                        svgStyles: {
                            ...args.theme.releases.releaseButtonTheme.icons?.[2]?.svgStyles,
                            fill: lightTheme.portfolio.item.releases.item.color,
                            // style svg so that it naturally renders and does not
                            // enlarge the ancestor lement dimensions
                            // viewBox: "0 0 54 54",
                            // width: "50",
                            // height: "50",
                        },
                    },
                ],
            },
        },
    },
};

export const Light = {
    args: lightArgs
};


const darkArgs: AppPortfolioItemProps = {
    ...args,
    theme: {
        links: {
            ...darkTheme.portfolio.item.resourceLinks,
            item: {
                ...darkTheme.portfolio.item.resourceLinks.item,
                icons: [
                    // github
                    {
                        // svgStyles?: React.SVGProps<SVGSVGElement>;
                        // Path props, except for d attribute
                        svgStyles: {
                            ...args.theme.links.item.icons?.[0]?.svgStyles,
                            fill: darkTheme.portfolio.item.resourceLinks.item.color,
                        }
                    },
                    // docs
                    {
                        svgStyles: {
                            ...args.theme.links.item.icons?.[1]?.svgStyles,
                            fill: darkTheme.portfolio.item.resourceLinks.item.color,
                        }
                    },
                    // ci/cd
                    {
                        svgStyles: {
                            ...args.theme.links.item.icons?.[2]?.svgStyles,
                            fill: darkTheme.portfolio.item.resourceLinks.item.color,
                        }
                    },
                ],
            }
        },
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
                            ...args.theme.releases.releaseButtonTheme.icons?.[0]?.svgStyles,
                            fill: darkTheme.portfolio.item.releases.item.color,
                        },

                    },
                    /// docker
                    {
                        svgStyles: {
                            ...args.theme.releases.releaseButtonTheme.icons?.[1]?.svgStyles,
                            fill: darkTheme.portfolio.item.releases.item.color,
                        },

                    },
                    /// github
                    {
                        svgStyles: {
                            ...args.theme.releases.releaseButtonTheme.icons?.[2]?.svgStyles,
                            fill: darkTheme.portfolio.item.releases.item.color,
                        },
                    },
                ],
            },
        },
    },
};

export const Dark = {
    args: darkArgs
};
