/** Provides Callback to adapt ComputedTheme Object to AppTheme */

import { useCallback } from "react";

import { type ComputedTheme } from "../theme";
import { type BigScreenViewProps } from "../Components/BigScreenView";

// APP THEME is the type of BigScreenViewProps props.theme value
type APP_THEME_TYPE = BigScreenViewProps["theme"];

// Hook providing a Callback to adapt ComputedTheme Object to AppTheme
const useThemeAdapterCallback = () => {
    // Adapt Theme given `Lib Theme` (interface acting as the surface for a Designer)
    /** Adapt `Lib Theme` to `App Theme` and make ready for app consumption. */
    const adaptTheme = useCallback(
        // Function Signature
        (theme: ComputedTheme): APP_THEME_TYPE => {
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
    return [adaptTheme];
}

export { useThemeAdapterCallback };
