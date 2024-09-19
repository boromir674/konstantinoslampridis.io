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
type TagTheme = Theme["education"]["item"]["tag"];
interface ComputedTagTheme extends TagTheme {
  fontFamily: string;
  fontSize: string;
}
interface ComputedTheme extends Theme {
  //// ALL PERSONAL INFORMATION STYLES
  personal: {
    textColor: Theme["personal"]["textColor"];
    urlTextColor: Theme["personal"]["urlTextColor"];
    containerBackgroundColor: Theme["personal"]["containerBackgroundColor"];
    externalURLSVGColor: Theme["personal"]["externalURLSVGColor"];
    infoItem: {
      key: {
        fontFamily: string;
        fontSize: string;
      };
      value: {
        fontFamily: string;
        fontSize: string;
      };
    };
  };
  //// ALL PROFESSIONAL STYLES
  professional: {
    containerBackgroundColor: Theme["professional"]["containerBackgroundColor"];
    title: {
      textColor: Theme["professional"]["title"]["textColor"];
      backgroundColor: Theme["professional"]["title"]["backgroundColor"];
      padding: string;
      fontFamily: string;
      fontSize: string;
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
      title: {
        fontFamily: string;
        fontSize: string;
      },
      body: {
        fontFamily: string;
        fontSize: string;
      },
      tag: {
        backgroundColor: string;
        textColor: string;
        onHoverBackgroundColor: string;
        onHoverTextColor: string;
        outlineColor: string;
        fontFamily: string;
        fontSize: string;
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
    containerBackgroundColor: string;
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
      degreeTitle: {
        fontFamily: string;
        fontSize: string;
      };
      body: {
        fontFamily: string;
        fontSize: string;
      };
      // tag: Theme["education"]["item"]["tag"];
      tag: ComputedTagTheme;
    };
  };
  //// ALL PORTFOLIO STYLES
  portfolio: {
    container: Theme["portfolio"]["container"];
    sectionHeader: Theme["portfolio"]["sectionHeader"];
    item: {
      projectTitle: {
        fontFamily: string;
      };
      projectDescription: {
        fontFamily: string;
      };
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





// export { type ComputedTheme, type Theme, mergeStylings, commonStyling };
export { type ComputedTheme, type Theme };
