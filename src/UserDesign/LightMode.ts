/* DESIGN your Light Mode Color Theme */

import { ColorMode } from "../lib/ColorModeInterface";

/////////// LIGHT MODE ///////////

const lightColorMode: ColorMode = {
  // This affects some out most backgound color
  backgroundColor: "secondary-container-light",
  //// TOP HEADER PANE ////
  topHeaderPane: {
    backgroundColor: "surface-light",
  },
  //// NAVIGATION BAR in big-screen page view ////
  navigationBar: {
    // backgroundColor: 'secondary-light',
    // textColor: "on-secondary-light",
    backgroundColor: "surface-variant-light",
    textColor: "on-surface-variant-light",

    hoverBackgroundColor: "primary-light",
    hoverTextColor: "on-primary-light",
    activatedBackgroundColor: "secondary-light",
    activatedTextColor: "on-secondary-light",
  },
  //// THEME SWITCH ////
  themeSwitch: {
    backgroundColor: "secondary-light",
    backgroundColorActive: "on-secondary-light",
    handleBackgroundColor: "on-secondary-light",
    handleBackgroundColorActive: "surface-light",
  },
  //// INTRODUCTION ////
  introduction: {
    containerBackgroundColor: "primary-container-light",
    textColor: "on-primary-container-light",
  },
  /// PERSONAL LIGHT ///
  personal: {
    containerBackgroundColor: "surface-variant-light",
    textColor: "on-surface-variant-light",
    urlTextColor: "on-surface-variant-light",
    externalURLSVGColor: "on-surface-variant-light",
  },
  /// EDUCATION LIGHT ///
  education: {
    // title: {
    //   // backgroundColor: "#ffffff",
    //   backgroundColor: "#111111",
    //   textColor: "secondary-on-container-light",
    // },
    item: {
      backgroundColor: "secondary-container-light",
      textColor: "on-secondary-container-light",
      linkColor: "#2063e9",
      onHoverBackgroundColor: "tertiary-container-light",
      onHoverTextColor: "on-tertiary-container-light",
      tag: {
        backgroundColor: "secondary-container-light",
        textColor: "on-secondary-container-light",
        onHoverBackgroundColor: "secondary-light",
        onHoverTextColor: "on-secondary-light",
        outlineColor: "outline-light",
      },
    },
    containerBackgroundColor: "surface-light",
  },
  ///// PROFESSIONAL LIGHT /////
  professional: {
    containerBackgroundColor: "secondary-container-light",
    title: {
      backgroundColor: "secondary-container-light",
      textColor: "on-secondary-container-light",
    },
    item: {
      backgroundColor: "secondary-container-light",
      textColor: "on-secondary-container-light",
      linkColor: "#2063e9",
      onHoverBackgroundColor: "tertiary-container-light",
      onHoverTextColor: "on-tertiary-container-light",
      tag: {
        backgroundColor: "secondary-container-light",
        textColor: "on-secondary-container-light",
        onHoverBackgroundColor: "primary-light",
        onHoverTextColor: "on-primary-light",
        outlineColor: "outline-light",
      },
    },
  },
  // PORTFOLIO LIGHT
  portfolio: {
    container: {
      backgroundColor: "secondary-container-light",
    },
    sectionHeader: {
      backgroundColor: "secondary-container-light",
      color: "on-secondary-container-light",
    },
    item: {
      // TODO; fix bug: item color backgroundColor has no effect
      backgroundColor: "secondary-container-light",
      color: "on-secondary-container-light",
      urlLinkTextColor: "on-surface-variant-light",
      onHoverURLLinkTextColor: "on-surface-light",
      outline: {
        color: "outline-light",
      },
    },
  },

  footerStyles: {
    textColor: "#1D5556",
    backgroundColor: "#D6D6DF",
  },
};

export default lightColorMode;
