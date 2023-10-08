import { ColorMode } from "./ColorModeInterface";
import { ThemeMode } from "./ThemeModeInterface";
import { CommonStylingInterface } from "./CommonThemeInterface";

const mergeStylings = (
  colorMode: ColorMode,
  commonStyling: CommonStylingInterface
): ThemeMode => {
  return {
    ...colorMode,
    ...commonStyling,

    professional: {
      containerBackgroundColor: colorMode.professional.containerBackgroundColor,
      title: {
        ...colorMode.professional.title,
        ...commonStyling.professional.title,
      },
      itemsColorModeSwitchDelay:
        commonStyling.professional.itemsColorModeSwitchDelay,
      item: {
        ...colorMode.professional.item,
        ...commonStyling.professional.item,
      },
    },

    education: {
      ...colorMode.education,
      ...commonStyling.education,
      item: {
        ...colorMode.education.item,
        ...commonStyling.education.item,
      },
    },
    portfolio: {
      ...colorMode.portfolio,
      ...commonStyling.portfolio,
      item: {
        ...colorMode.portfolio.item,
        ...commonStyling.portfolio.item,
        outline: {
          ...colorMode.portfolio.item.outline,
          ...commonStyling.portfolio.item.outline,
        },
      },
    },
  };
};


class ThemeManager {
  private lightMode: ColorMode;
  private darkMode: ColorMode;
  private commonStyles: CommonStylingInterface;

  constructor(
    lightMode: ColorMode,
    darkMode: ColorMode,
    commonStyles: CommonStylingInterface
  ) {
    this.lightMode = lightMode;
    this.darkMode = darkMode;
    this.commonStyles = commonStyles;
  }

  get light(): ThemeMode {
    return mergeStylings(this.lightMode, this.commonStyles);
  }

  get dark(): ThemeMode {
    return mergeStylings(this.darkMode, this.commonStyles);
  }

  toAppTheme = (theme: ThemeMode) => {
    return {
      containerBackgroundColor: theme.backgroundColor,
      topHeaderPane: {
        themeSwitch: theme.themeSwitch,
        headerNavigationBar: {
          colors: theme.navigationBar,
          padding: theme.headerNavigationBar.padding,
        },
        backgroundColor: theme.topHeaderPane.backgroundColor,
      },
      verticalSidePane: {
        personalInfo: {
          ...theme.personal,
          linkColor: theme.personal.urlTextColor,
        },
        education: {
          item: theme.education.item,
        },
      },
      verticalMainPane: {
        introduction: theme.introduction,
        professional: theme.professional,
        portfolio: theme.portfolio,
      },
      bottomFooterPane: theme.footerStyles,
    };
  };

  // toColoset function
  toAppColorSet = () => {
    return {
      light: this.toAppTheme(this.light),
      dark: this.toAppTheme(this.dark),
    };
  };
}


export default ThemeManager;
