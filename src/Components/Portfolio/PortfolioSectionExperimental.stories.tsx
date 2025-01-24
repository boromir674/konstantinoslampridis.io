import { FC, useRef, useCallback, forwardRef } from "react";
import PortfolioSection, { defaultProps, ResponsiveLocalStorageLayoutProps } from "./PortfolioSection";

import DESIGN_TOKENS from "../../design-system/tokens.json";

// import App Styles Symbols
import { lightTheme, darkTheme, type ComputedTheme } from '../../theme';

// Import Content Component
import AppPortfolioItem, { AppPortfolioItemProps } from "./AppPortfolioItem";

import PortfolioItemInterface from "../../PortfolioItemInterface";


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
    title: "Portfolio Section Experimental",
    tags: ["autodocs"],
};

// DATA (Portfolio Items Array)
const DATA: PortfolioItemInterface[] = [
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
];

// Adjust Theme to App Theme
// compute maximum number of Releases contained in a single portfolio item
const maxNumberOfReleasesPerPortfolioItems = () => DATA.reduce(
    (acc, { release = [] }) => Math.max(acc, release.length),
    0
);
// compute maximum number of links contained in a single portfolio item
const maxNumberOfLinksPerPortfolioItems = () => DATA.reduce(
    (acc, { resource_links = [] }) => Math.max(acc, resource_links.length),
    0
);

const hookAdapterFunction = (theme: ComputedTheme) => {
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

type RawColorTheme = typeof lightTheme | typeof darkTheme;

const computeTheme = (theme: RawColorTheme) => {
    const appTheme = hookAdapterFunction(theme);
    // Adapt 'icon' to 'icons' by crating an rray of the same item multiple times
    const adaptedAppTheme = {
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
                                icons: Array.from({ length: maxNumberOfLinksPerPortfolioItems() }, () => appTheme.verticalMainPane.portfolio.item.theme.links.item.icon
                                ),
                            },
                        },
                        releases: {
                            ...appTheme.verticalMainPane.portfolio.item.theme.releases,
                            releaseButtonTheme: {
                                ...appTheme.verticalMainPane.portfolio.item.theme.releases.releaseButtonTheme,
                                icons: Array.from({ length: maxNumberOfReleasesPerPortfolioItems() }, () => appTheme.verticalMainPane.portfolio.item.theme.releases.releaseButtonTheme.icon
                                ),
                            },
                        },
                    },
                },
            },
        },
    }
    return adaptedAppTheme;
};

// Full App Theme objects LIGHT/DARK
const lightAppTheme = computeTheme(lightTheme);
const lightThemeObj = lightAppTheme.verticalMainPane.portfolio;
const darkAppTheme = computeTheme(darkTheme);
const darkThemeObj = darkAppTheme.verticalMainPane.portfolio;


// RnD / Support Component to show number of Renders per Grid Item
const CountRenderTimes = forwardRef((props: { backgroundColor: string, children?: React.ReactNode }, ref) => {
    const rendersNo = useRef(0)
    const logComponentRerender = useCallback(() => {
        rendersNo.current = rendersNo.current + 1
    }, [])
    // Increment Render Counter
    logComponentRerender()
    return <div ref={ref} style={{ backgroundColor: props.backgroundColor }}>
        <h2>Render Times: {rendersNo.current}</h2>
    </div>
});

const AppPortfolioItemWrapper = forwardRef((props: AppPortfolioItemProps, ref) => {
    return <>
        {/* Component to Count Number of Render Times */}
        <CountRenderTimes ref={ref} backgroundColor={props.theme.releases.releaseButtonTheme.backgroundColor}></CountRenderTimes>
        {/* Production Component Contents Render */}
        <AppPortfolioItem data={props.data} theme={props.theme} refs={props.refs} />
    </>
});

// type RenderProps = ResponsiveLocalStorageLayoutProps["renderProps"];

// NOT WORKING SINCE THE PROD CODE DALL with 3 args!
// STORY SPECIFIC CODE
const renderPropsOverride = (data, theme, refs, ref) => <AppPortfolioItemWrapper ref={ref} data={data} theme={theme} refs={refs} />

const argsLight: ResponsiveLocalStorageLayoutProps = {
    // Other Props, most likely with dedicated fallback values
    ...defaultProps,
    // other properties...
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    rowHeight: 41,
    // other properties...
    id: "arbitrary-id-not-used-by-components-in-this-DOM-scope",
    data: DATA,
    // THEME - Styles - Colors
    theme: {
        ...lightThemeObj,
        item: {
            ...lightThemeObj.item,
            outline: `${lightThemeObj.item.outline.width} solid ${lightThemeObj.item.outline.color}`
        },
    },
    renderProps: renderPropsOverride,  // CONTENT
};

// STORY: Portflolio Section as a Responsive Grid with a 4 Layout Items, and Light Theme
export const Light = {
    args: { grids: [argsLight] }
};

const argsDark: ResponsiveLocalStorageLayoutProps = {
    ...argsLight,
    theme: {
        ...darkThemeObj,
        item: {
            ...darkThemeObj.item,
            outline: `${darkThemeObj.item.outline.width} solid ${darkThemeObj.item.outline.color}`
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
