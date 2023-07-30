interface HeaderStyles {
  primaryColor: string;
  secondaryColor: string;
}

// Represents a set of colors corresponding to the Business Logic of the App
// Usually this interface can describe the colors of a so-called "color mode"
// For example Light/Dark mode/theme
interface Theme {
  // latest iteration of color system, including 3 colors
  // Firstly, a color duo as alternating color and background-color css properties
  latestColor: string;
  latestBackgroundColor: string;
  // Secondly, an alternative background color for outer containers
  latestContainerBackgroundColor: string;

  backgroundColor: string;
  foregroundColor: string;
  buttonColor: string;
  buttonHoverColor: string;
  headerStyles: HeaderStyles;
  topHeaderPane: {
    backgroundColor: string;
  };
  navigationBar: {
    textColor: string;
    backgroundColor: string;
    hoverBackgroundColor: string;
    hoverTextColor: string;
    activatedTextColor: string;
    activatedBackgroundColor: string;
  };
  personal: {
    textColor: string;
    urlTextColor: string;
    containerBackgroundColor: string;
  };
  education: {
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
      };
    };
    containerBackgroundColor: string;
  };
  introduction: {
    containerBackgroundColor: string;
    textColor: string;
  };
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
      };
    };
  };
  portfolio: {
    container: {
      backgroundColor: string;
    };
    sectionHeader: {
      backgroundColor: string;
      color: string;
    };
    item: {
      outline: {
        color: string;
      };
      backgroundColor: string;
      color: string;
    };
  };

  footerStyles: {
    textColor: string;
    backgroundColor: string;
  };
}

// Used internally for type checking
interface ComputedTheme extends Theme {
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
      };
    };
    // defines whether there will be a delay between the the top item and the
    // bottom, on color mode switch (toggle)

    // for example if given number is 4 then from the moment the top item
    // starts to change colors (on mode switch), till the moment the bottom
    // item changed colors, 4 seconds would pass
    itemsColorModeSwitchDelay: number;
  };
  education: {
    title: {
      textColor: string;
      backgroundColor: string;
      padding: string;
    };
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
    };
  };
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
    },
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
      title: {
        ...theme.education.title,
        ...commonStyling.education.title,
      },
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
      },
    },
  };
};

export { type ComputedTheme, type Theme, mergeStylings, commonStyling };
