/**
 * Provides the 'Color Mode Interface', which should be enough to
 * represent the styles that describe the App Color Mode (Light or Dark)
 **/

// Represents a set of colors corresponding to the Business Logic of the App
// Usually this interface can describe the colors of a so-called "color mode"
/// For example Light/Dark mode/theme

/** Color Mode Interface (ie Light or Dark mode)
 * Properties of this interface are correspond to Visual/Logical Components of the App
 * and the values define css styles, which should be enough to describe all
 * the Color Mode specific styles of the App
 **/
interface ColorMode {
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
  /// INTRODUCTIONS Section COLORS ///
  introduction: {
    containerBackgroundColor: string;
    textColor: string;
  };
  /// PERSONAL Section COLORS ///
  personal: {
    textColor: string;
    urlTextColor: string;
    containerBackgroundColor: string;
    externalURLSVGColor: string;
  };
  /// EDUCATION Section COLORS ///
  education: {
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

  /// PROFESSIONAL Section COLORS ///
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
  /// PORTFOLIO Section COLORS ///
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
      urlLinkTextColor: string;
      onHoverURLLinkTextColor: string;
    };
  };
  /// BOTTOM FOOTER COLORS ///
  footerStyles: {
    textColor: string;
    backgroundColor: string;
  };
}

export { type ColorMode };
