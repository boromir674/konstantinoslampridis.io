/** Provides Callback to adapt ComputedTheme Object to AppTheme */

import { useCallback } from "react";

import { ComputedTheme } from "../theme";
import { BigScreenViewProps } from "../Components/BigScreenView";

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
    svgStyles: {
        width: string
        height: string
        fill: string
    }
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

    return [adaptTheme];
}

export { useThemeAdapterCallback };
