interface HeaderStyles {
  primaryColor: string;
  secondaryColor: string;
}

// Represents a set of colors corresponding to the Business Logic of the App
// Usually this interface can describe the colors of a so-called "color mode"
// For example Light/Dark mode/theme
interface Theme {
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
    };
    containerBackgroundColor: string;
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
};

const lightColorMode: Theme = {
  // <picked> color after thought
  backgroundColor: "#D6D6DF",
  foregroundColor: "#1D5556",
  // </picked>

  // foregroundColor: "#000000",
  buttonColor: "#007bff",
  buttonHoverColor: "#0056b3",
  headerStyles: {
    primaryColor: "#ffffff",
    secondaryColor: "#0056b3",
  },
  topHeaderPane: {
    backgroundColor: "#D6D6DF",
  },
  navigationBar: {
    textColor: "#000000",
    backgroundColor: "#009385",
    hoverBackgroundColor: "#fff",
    hoverTextColor: "#000000",
    activatedBackgroundColor: "#fa345f",
    activatedTextColor: "#000000",
  },
  personal: {
    textColor: "#4A4A4A",
    urlTextColor: "#2063e9",
    // containerBackgroundColor: "#f6f8fa",
    containerBackgroundColor: "#EDB6DB",
  },
  education: {
    title: {
      textColor: "#000000",
      backgroundColor: "#ffffff",
    },
    item: {
      // MY OLD DESIGN
      // backgroundColor: "#FFAD00",
      // textColor: "#333",
      onHoverBackgroundColor: "#ddd",
      onHoverTextColor: "#333",
      linkColor: "#2063e9",
      // NEW DESIGN
      textColor: "#123123",
      backgroundColor: "#ffffff",
      // textColor: "#000000",
      // onHoverBackgroundColor: "#f6f8fa",
      // onHoverTextColor: "#000000",
    },
    containerBackgroundColor: "#f6f8fa",
  },
  introduction: {
    containerBackgroundColor: "#D6D6DF",
    textColor: "#1D5556",
  },
  professional: {
    title: {
      textColor: "#000000",
      backgroundColor: "#ffffff",
    },
    item: {
      textColor: "#000000",
      backgroundColor: "#ffffff",
      linkColor: "#1651f3",
      onHoverBackgroundColor: "#a4e2c7",
      onHoverTextColor: "#000000",
      tag: {
        backgroundColor: "#8be0c8",
        textColor: "#174b58",
        onHoverBackgroundColor: "#000000",
        onHoverTextColor: "#ffffff",
      },
    },
    containerBackgroundColor: "#f6f8fa",
  },
  footerStyles: {
    textColor: "#1D5556",
    backgroundColor: "#D6D6DF",
  },
};

const darkColorMode: Theme = {
  // <picked> color after thought
  backgroundColor: "#D6D6DF",
  foregroundColor: "#1D5556",
  // </picked>
  // backgroundColor: "#333333",
  // foregroundColor: "#ffffff",

  buttonColor: "#007bff",
  buttonHoverColor: "#0096ff",
  headerStyles: {
    primaryColor: "#333333",
    secondaryColor: "#0096ff",
  },
  topHeaderPane: {
    backgroundColor: "#463507",
  },
  navigationBar: {
    backgroundColor: "#333333",
    textColor: "#ffffff",
    hoverBackgroundColor: "#fff",
    hoverTextColor: "#ffffff",
    activatedBackgroundColor: "#ff345f",
    activatedTextColor: "#ffffff",
  },
  // PERSONAL INFO / CONTACT / LINKS
  personal: {
    textColor: "#EDEDED",
    urlTextColor: "#D98C66",
    // containerBackgroundColor: "#222222",
    containerBackgroundColor: "#2D0B22",
  },
  // EDUCATION SECTION
  education: {
    title: {
      textColor: "#ffffff",
      backgroundColor: "#333333",
    },
    item: {
      backgroundColor: "#333333",
      textColor: "#ffffff",
      linkColor: "#D98C66",
      onHoverBackgroundColor: "#444444",
      onHoverTextColor: "#ffffff",
    },
    containerBackgroundColor: "#222222",
  },
  introduction: {
    containerBackgroundColor: "#1D5556",
    textColor: "#D6D6DF",
  },
  // PROFESSIONAL EXPERIENCE SECTION
  professional: {
    title: {
      textColor: "#d7e5db",
      backgroundColor: "#201f1f",
    },
    item: {
      textColor: "#d7e5db",
      backgroundColor: "#201f1f",
      linkColor: "#aec0f1",
      onHoverBackgroundColor: "#494343",
      onHoverTextColor: "#d7e5db",
      tag: {
        backgroundColor: "#174b58",
        textColor: "#8be0c8",
        onHoverBackgroundColor: "#ffffff",
        onHoverTextColor: "#000000",
      },
    },
    containerBackgroundColor: "#1d2421",
  },
  footerStyles: {
    textColor: "#D6D6DF",
    backgroundColor: "#1D5556",
  },
};

// Computing the final (Light + Common Styles, Dark + Common Styles) Theme
type CommonStyling = typeof commonStyling;

const mergeStylings = (theme: Theme, commonStyling: CommonStyling): ComputedTheme => {
  return {
    ...theme,
    ...commonStyling,

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
  };
};

const lightTheme: ComputedTheme = mergeStylings(lightColorMode, commonStyling);
const darkTheme: ComputedTheme = mergeStylings(darkColorMode, commonStyling);

export { ComputedTheme, lightTheme, darkTheme };
