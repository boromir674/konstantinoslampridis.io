/** Provides Callback to adapt ComputedTheme Object to AppTheme */

import { useCallback } from "react";

import { type ComputedTheme } from "../theme";
import { type BigScreenViewProps } from "../Components/BigScreenView";

// Type Aliases to allow extending
type BigScreenViewPropsTheme = BigScreenViewProps["theme"];
type VerticalMainPaneTheme = BigScreenViewProps["theme"]["verticalMainPane"];

type Portfolio = BigScreenViewProps["theme"]["verticalMainPane"]["portfolio"]
type PortfolioItem = BigScreenViewProps["theme"]["verticalMainPane"]["portfolio"]["item"];
type PortfolioItemTheme = BigScreenViewProps["theme"]["verticalMainPane"]["portfolio"]["item"]["theme"];
type PortfolioItemThemeLinks = BigScreenViewProps["theme"]["verticalMainPane"]["portfolio"]["item"]["theme"]["links"];
type PortfolioItemThemeReleases = BigScreenViewProps["theme"]["verticalMainPane"]["portfolio"]["item"]["theme"]["releases"];
type PortfolioItemThemeReleasesButtonTheme = BigScreenViewProps["theme"]["verticalMainPane"]["portfolio"]["item"]["theme"]["releases"]["releaseButtonTheme"];
type PortfolioItemThemeLinksItem = BigScreenViewProps["theme"]["verticalMainPane"]["portfolio"]["item"]["theme"]["links"]["item"];


// Type Common Adapted Icon Object for DRY
interface Icon {
    // we want to add these to the default values passes to style prop of <svg>
    svgStyles: {
        width: string
        height: string
        fill: string
    }
    // we do not need to override any pathStyles
    // pathStyles:
}

// Typechecking for the Adapter
interface AppPortfolioItemThemeLinksItem extends Omit<PortfolioItemThemeLinksItem, "icons"> {
    // ADAPTED INTERFACE for Resource Links Theme
    icon: Icon
    // color: string;
    // backgroundColor: string;
    // onHoverColor: string;
    // onHoverBackgroundColor: string;
}
interface AppPortfolioItemThemeLinks extends PortfolioItemThemeLinks {
    item: AppPortfolioItemThemeLinksItem
}

interface AppPortfolioItemThemeReleasesButtonTheme extends Omit<PortfolioItemThemeReleasesButtonTheme, "icons"> {
    // ADAPTED INTERFACE for Releases Theme
    icon: Icon
}
interface AppPortfolioItemThemeReleases extends PortfolioItemThemeReleases {
    releaseButtonTheme: AppPortfolioItemThemeReleasesButtonTheme
}

interface AppPortfolioItemTheme extends PortfolioItemTheme {
    links: AppPortfolioItemThemeLinks
    releases: AppPortfolioItemThemeReleases
}
interface AppPortfolioItem extends PortfolioItem {
    theme: AppPortfolioItemTheme
}
interface AppPortfolio extends Portfolio {
    item: AppPortfolioItem
}
interface AppVerticalMainPaneTheme extends VerticalMainPaneTheme {
    portfolio: AppPortfolio
}
interface AppTheme extends BigScreenViewPropsTheme {
    verticalMainPane: AppVerticalMainPaneTheme;
}

interface AppThemeV2 extends BigScreenViewPropsTheme {
    verticalMainPane: AppVerticalMainPaneTheme;
}


// Hook providing a Callback to adapt ComputedTheme Object to AppTheme
const useThemeAdapterCallback = () => {
    const adaptTheme = useCallback(
        (theme: ComputedTheme): AppTheme => {
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
        },
        []
    );

    // Adapt Theme given `Lib Theme` (interface acting as the surface for a Designer)
    /** Adapt `Lib Theme` to `App Theme` and make ready for app consumption. */
    const adaptThemeV2 = useCallback(
        // Function Signature
        (theme: ComputedTheme): BigScreenViewPropsTheme => {
            const { icon: libThemeLinkIcon, ...libThemeLink } = theme.portfolio.item.resourceLinks.item;
            const { icon: libThemeReleaseIcon, ...libThemeRelease } = theme.portfolio.item.releases.item;
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
                        // adapt interface
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
                                    item: {  // ITEM
                                        ...libThemeLink,
                                        // addapt theme.portfolio.item.resourceLinks.item.icon to 'icons'
                                        icons: libThemeLinkIcon,
                                    },
                                },
                                // Portfolio Project Item - Software Releases
                                releases: {
                                    ...theme.portfolio.item.releases,
                                    headerFontFamily: theme.portfolio.item.releases.fontFamily,
                                    headerColor: theme.portfolio.item.releases.color,
                                    releaseButtonTheme: {  // ITEM
                                        ...libThemeRelease,
                                        // addapt theme.portfolio.item.releases.item.icon to 'icons'
                                        icons: libThemeReleaseIcon,
                                    },
                                },
                            },
                        },
                    },
                },
                bottomFooterPane: theme.footerStyles,
            };
    }, [])
    return [adaptTheme, adaptThemeV2];
}

export { useThemeAdapterCallback };
