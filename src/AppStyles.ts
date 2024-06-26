interface HeaderStyles {
  primaryColor: string;
  secondaryColor: string;
}

// Represents a set of colors corresponding to the Business Logic of the App
// Usually this interface can describe the colors of a so-called "color mode"
// For example Light/Dark mode/theme
interface Theme {

  backgroundColor: string;
  topHeaderPane: {
    backgroundColor: string;
  };
  /// NAVIGATION COLORS ///
  navigationBar: {
    textColor: string;
    backgroundColor: string;
    hoverBackgroundColor: string;
    hoverTextColor: string;
    activatedTextColor: string;
    activatedBackgroundColor: string;
  };
  /// THEME SWITCH COLORS ///
  themeSwitch: {
    backgroundColor: string;
    backgroundColorActive: string;
    handleBackgroundColor: string;
    handleBackgroundColorActive: string;
  };
  /// INTRODUCTIONS COLORS ///
  introduction: {
    containerBackgroundColor: string;
    textColor: string;
  };
  /// PERSONAL COLORS ///
  personal: {
    textColor: string;
    urlTextColor: string;
    containerBackgroundColor: string;
    externalURLSVGColor: string;
  };
  /// EDUCATION COLORS ///
  education: {
    // title: {
    //   textColor: string;
    //   backgroundColor: string;
    // };
    item: {
      backgroundColor: string;
      textColor: string;
      linkColor: string;
      onHoverBackgroundColor: string;
      onHoverTextColor: string;
      tag: {
        backgroundColor: string;
        textColor: string;
        onHoverBackgroundColor: string;
        onHoverTextColor: string;
        outlineColor: string;
      };
    };
    containerBackgroundColor: string;
  };

  /// PROFESSIONAL COLORS ///
  professional: {
    containerBackgroundColor: string;
    title: {
      textColor: string;
      backgroundColor: string;
    };
    item: {
      backgroundColor: string;
      textColor: string;
      linkColor: string;
      onHoverBackgroundColor: string;
      onHoverTextColor: string;
      tag: {
        backgroundColor: string;
        textColor: string;
        onHoverBackgroundColor: string;
        onHoverTextColor: string;
        outlineColor: string;
      };
    };
  };
  /// PORTFOLIO COLORS ///
  portfolio: {
    container: {
      backgroundColor: string;
    };
    sectionHeader: {
      backgroundColor: string;
      color: string;
    };
    // PROJECT ITEM
    item: {
      outline: {
        color: string;
      };
      backgroundColor: string;
      color: string;
      // Resource Links - Pane
      resourceLinks: {
        backgroundColor: string;
        headerColor: string;
        item: {
          backgroundColor: string;
          color: string;
          onHoverBackgroundColor: string;
          onHoverColor: string;
        };
      };
      // Releases Pane
      releases: {
        backgroundColor: string;
        color: string;
        item: {
          backgroundColor: string;
          color: string;
          onHoverBackgroundColor: string;
          onHoverColor: string;
        };
      };
    };
  };

  footerStyles: {
    textColor: string;
    backgroundColor: string;
    svgStyles: {
      fill: string;
    };
  };
}

// Used internally for type checking
interface ComputedTheme extends Theme {
  //// ALL PROFESSIONAL STYLES
  professional: {
    containerBackgroundColor: Theme["professional"]["containerBackgroundColor"];
    title: {
      textColor: Theme["professional"]["title"]["textColor"];
      backgroundColor: Theme["professional"]["title"]["backgroundColor"];
      padding: string;
    };
    item: {
      padding?: string;
      backgroundColor: string;
      textColor: string;
      linkColor: string;
      onHoverBackgroundColor: string;
      onHoverTextColor: string;
      onHoverTransformDuration: string;
      onHoverBackgroundColorChangeDuration: string;
      tag: {
        backgroundColor: string;
        textColor: string;
        onHoverBackgroundColor: string;
        onHoverTextColor: string;
        outlineColor: string;
      };
    };
    // defines whether there will be a delay between the the top item and the
    // bottom, on color mode switch (toggle)

    // for example if given number is 4 then from the moment the top item
    // starts to change colors (on mode switch), till the moment the bottom
    // item changed colors, 4 seconds would pass
    itemsColorModeSwitchDelay: number;
  };
  //// ALL EDUCATION STYLES
  education: {
    // title: {
    //   textColor: string;
    //   backgroundColor: string;
    //   padding: string;
    // };
    item: {
      padding?: string;
      backgroundColor: string;
      textColor: string;
      linkColor: string;
      onHoverBackgroundColor: string;
      onHoverTextColor: string;
      // Common Styling that does not depend on color
      onHoverTransformDuration: string;
      onHoverBackgroundColorChangeDuration: string;
      tag: Theme["education"]["item"]["tag"];
    };
    containerBackgroundColor: string;
  };
  //// ALL PORTFOLIO STYLES
  portfolio: {
    container: Theme["portfolio"]["container"];
    sectionHeader: Theme["portfolio"]["sectionHeader"];
    item: {
      outline: {
        color: string;
        width: string;
      };
      backgroundColor: string;
      color: string;
      // Resource Links - Pane
      // resourceLinks: Theme["portfolio"]["item"]["resourceLinks"];
      resourceLinks: {
        backgroundColor: string;
        headerColor: string;
        item: {
          // Colors
          backgroundColor: string;
          color: string;
          onHoverBackgroundColor: string;
          onHoverColor: string;
          // Sizing for SVG Icons
          iconStyles: {
            width: string;
            height: string;
          },
        };
      };
      releases: {
        // Color styles
        backgroundColor: string;
        color: string;
        // other styles
        fontFamily: string;
        headerMarginBottom: string;
        item: {
          // Color styles
          backgroundColor: string;
          color: string;
          onHoverBackgroundColor: string;
          onHoverColor: string;
          // other styles
          fontFamily: string;
          // Sizing for SVG Icons
          iconStyles: {
            width: string;
            height: string;
          },
        };
      };
    };
  };
  // FOOTER Styles with color mode plus svgStyles
  footerStyles: {
    textColor: string;
    backgroundColor: string;
    svgStyles: {
      fill: string;
      width: string;
      height: string;
    };
  }
}

// DESIGNER SPACE
// COMMON Styling Configuration between Light and Dark Modes

const commonStyling = {
  fontFamily: "Roboto, sans-serif",
  fontSize: "16px",
  fontWeight: "400",
  lineHeight: "1.5",
  letterSpacing: "0.00938em",
  // Domain Specific Styling
  professional: {
    title: {
      padding: "15px",
    },
    item: {
      padding: "15px",
      onHoverTransformDuration: "0.5s",
      onHoverBackgroundColorChangeDuration: "0.7s",
      // onHoverTransitionDelay: '1s',
    },
    itemsColorModeSwitchDelay: 1.2,
  },
  education: {
    title: {
      padding: "15px",
    },
    item: {
      onHoverTransformDuration: "1.6s",
      onHoverBackgroundColorChangeDuration: "0.7s",
      // onHoverTransitionDelay: '1s',
      padding: "15px",
    },
  },
  portfolio: {
    item: {
      outline: {
        width: "3px",
      },
      // Resource Links - Pane
      resourceLinks: {
        item: {
          iconStyles: {
            width: "14px",
            height: "14px",
          },
        },
      },
      // Releases Pane
      releases: {
        headerFont: "Roboto, sans-serif",
        headerMarginBottom: "15px",
        item: {
          font: "Roboto, sans-serif",
          iconStyles: {
            width: "14px",
            height: "14px",
          },
        },
      },
    },
  },
  footerStyles: {
    svgStyles: {
      width: "18px",
      height: "18px",
    },
    // fill: lightTheme.portfolio.item.releases.item.color,
  },
};


// Computing the final (Light + Common Styles, Dark + Common Styles) Theme
type CommonStyling = typeof commonStyling;

const mergeStylings = (
  theme: Theme,
  commonStyling: CommonStyling
): ComputedTheme => {
  return {
    ...theme,
    ...commonStyling,

    professional: {
      containerBackgroundColor: theme.professional.containerBackgroundColor,
      title: {
        ...theme.professional.title,
        ...commonStyling.professional.title,
      },
      itemsColorModeSwitchDelay:
        commonStyling.professional.itemsColorModeSwitchDelay,
      item: {
        ...theme.professional.item,
        ...commonStyling.professional.item,
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
        ...commonStyling.education.item,
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
        },
        // Software Releases - Pane
        releases: {
          ...theme.portfolio.item.releases,
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

export { type ComputedTheme, type Theme, mergeStylings, commonStyling };
