// Theme / Style initialization Operations
import lightMode from "../LightMode";
import darkMode from "../DarkMode";
import commonStyles from "./CommonTheme";

import { type ComputedTheme, type Theme } from "./AppStyles";


// Computing the final (Light + Common Styles, Dark + Common Styles) Theme
type CommonStyling = typeof commonStyles;

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
          item: {
            ...theme.portfolio.item.resourceLinks.item,
            ...commonStyling.portfolio.item.resourceLinks.item,
          },
          header: {
            fontFamily: "",
            fontSize: ""
          }
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

export { lightTheme, darkTheme };
