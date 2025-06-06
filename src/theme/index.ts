// Theme / Style initialization Operations
import lightMode from "../LightMode";
import darkMode from "../DarkMode";
import commonStyles from "./CommonTheme";

import { type ComputedTheme, type Theme } from "./AppStyles";


// Computing the final (Light + Common Styles, Dark + Common Styles) Theme
type CommonStyling = typeof commonStyles;

/**
 * Compute Theme object by merging a Color (Styles) Theme with Common Styles.
 * 
 * Takes a Color (Styles) Theme (ie LightMode, DarkMode) and Common Styles that
 * (CSS Styles that do not overlap with Color (Styles) Theme) and merges them
 * into a single Computed Theme object. This Computed Theme object should
 * contain all Styling information required to render whole App's Component Tree.
 * 
 * @param {Theme} theme a Color (Styles) Theme (i.e. LightMode, DarkMode)
 * @param {CommonStyling} commonStyling Common Styles that do not overlap with Color (Styles) Theme
 * @returns {ComputedTheme} a computed Theme object
 */
const mergeStylings = (
  theme: Theme,
  commonStyling: CommonStyling
): ComputedTheme => {
  return {
    ...theme,
    ...commonStyling,

    navigationBar: {
      ...theme.navigationBar,
      ...commonStyling.navigationBar
    },

    personal: {
      ...theme.personal,
      ...commonStyling.personal,
    },

    professional: {
      containerBackgroundColor: theme.professional.containerBackgroundColor,
      title: {
        ...theme.professional.title,
        ...commonStyling.professional.title,
      },
      itemsColorModeSwitchDelay: commonStyling.professional.itemsColorModeSwitchDelay,
      item: {
        ...theme.professional.item,
        ...commonStyling.professional.item,
        tag: {
          ...theme.professional.item.tag,
          ...commonStyling.professional.item.tag,
        },
      },
    },

    education: {
      ...theme.education,
      ...commonStyling.education,
      // title: {
      //   ...theme.education.title,
      //   ...commonStyling.education.title,
      // },
      item: {
        ...theme.education.item,
        padding: commonStyling.education.item.padding,
        onHoverTransformDuration: commonStyling.education.item.onHoverTransformDuration,
        onHoverBackgroundColorChangeDuration: commonStyling.education.item.onHoverBackgroundColorChangeDuration,
        tag: {
          ...theme.education.item.tag,
          ...commonStyling.education.item.tags,
        },
        body: commonStyling.education.item.body,
        degreeTitle: commonStyling.education.item.degreeTitle,
      },
    },
    portfolio: {
      ...theme.portfolio,
      ...commonStyling.portfolio,
      sectionHeader: {
        ...theme.portfolio.sectionHeader,
        ...commonStyling.portfolio.sectionHeader,
      },
      item: {
        ...theme.portfolio.item,
        ...commonStyling.portfolio.item,
        outline: {
          ...theme.portfolio.item.outline,
          ...commonStyling.portfolio.item.outline,
        },
        // Project Links - Pane
        resourceLinks: {
          ...theme.portfolio.item.resourceLinks,
          ...commonStyling.portfolio.item.resourceLinks,
          item: {
            ...theme.portfolio.item.resourceLinks.item,
            ...commonStyling.portfolio.item.resourceLinks.item,
            icon: {
              ...theme.portfolio.item.resourceLinks.item.icon,
              ...commonStyling.portfolio.item.resourceLinks.item.icon,
              svgStyles: {
                // Merge color-dependent (ie fill) styles with common styles (ie width, height)
                ...theme.portfolio.item.resourceLinks.item.icon.svgStyles,
                ...commonStyling.portfolio.item.resourceLinks.item.icon.svgStyles,
              },
            },
          },
        },
        // Software Releases - Pane
        releases: {
          ...theme.portfolio.item.releases,
          ...commonStyling.portfolio.item.releases,
          headerFontFamily: commonStyling.portfolio.item.releases.headerFont,
          fontFamily: commonStyling.portfolio.item.releases.headerFont,
          headerMarginBottom: commonStyling.portfolio.item.releases.headerMarginBottom,
          item: {
            ...theme.portfolio.item.releases.item,
            ...commonStyling.portfolio.item.releases.item,
            fontFamily: commonStyling.portfolio.item.releases.item.font,
            icon: {
              ...theme.portfolio.item.releases.item.icon,
              ...commonStyling.portfolio.item.releases.item.icon,
              svgStyles: {
                ...theme.portfolio.item.releases.item.icon.svgStyles,
                ...commonStyling.portfolio.item.releases.item.icon.svgStyles,
              },
            },
          },
        },
      },
    },
    footerStyles: {
      ...theme.footerStyles,
      ...commonStyling.footerStyles,
      svgStyles: {
        ...theme.footerStyles.svgStyles,
        ...commonStyling.footerStyles.svgStyles,
      }
    },
  };
};


const lightTheme: ComputedTheme = mergeStylings(lightMode, commonStyles);
const darkTheme: ComputedTheme = mergeStylings(darkMode, commonStyles);

export { lightTheme, darkTheme, type ComputedTheme };
