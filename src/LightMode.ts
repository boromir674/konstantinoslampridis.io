/* DESIGN your Light Mode Color Theme */
import DESIGN_TOKENS from "./design-system/tokens.json";
import { Theme } from './AppStyles';

/////////// LIGHT MODE ///////////

const lightColorMode: Theme = {

  // This affects some out most backgound color
  backgroundColor: DESIGN_TOKENS['--md-sys-color-secondary-container-light'],
  //// TOP HEADER PANE ////
  topHeaderPane: {
    backgroundColor: DESIGN_TOKENS["--md-sys-color-surface-light"],
  },
  //// NAVIGATION BAR in big-screen page view ////
  navigationBar: {
    // backgroundColor: DESIGN_TOKENS['--md-sys-color-secondary-light'],
    // textColor: DESIGN_TOKENS["--md-sys-color-on-secondary-light"],
    backgroundColor: DESIGN_TOKENS["--md-sys-color-surface-variant-light"],
    textColor: DESIGN_TOKENS["--md-sys-color-on-surface-variant-light"],
    
    hoverBackgroundColor: DESIGN_TOKENS['--md-sys-color-primary-light'],
    hoverTextColor: DESIGN_TOKENS["--md-sys-color-on-primary-light"],
    activatedBackgroundColor: DESIGN_TOKENS["--md-sys-color-secondary-light"],
    activatedTextColor: DESIGN_TOKENS["--md-sys-color-on-secondary-light"],
  },
  //// THEME SWITCH ////
  themeSwitch: {
    backgroundColor: DESIGN_TOKENS['--md-sys-color-secondary-light'],
    backgroundColorActive: DESIGN_TOKENS['--md-sys-color-on-secondary-light'],
    handleBackgroundColor: DESIGN_TOKENS['--md-sys-color-on-secondary-light'],
    handleBackgroundColorActive: DESIGN_TOKENS['--md-sys-color-surface-light'],
  },
  //// INTRODUCTION ////
  introduction: {
    containerBackgroundColor: DESIGN_TOKENS['--md-sys-color-primary-container-light'],
    textColor: DESIGN_TOKENS['--md-sys-color-on-primary-container-light'],
  },
  /// PERSONAL LIGHT ///
  personal: {
    containerBackgroundColor: DESIGN_TOKENS["--md-sys-color-surface-variant-light"],
    textColor: DESIGN_TOKENS["--md-sys-color-on-surface-variant-light"],
    urlTextColor: DESIGN_TOKENS["--md-sys-color-on-surface-variant-light"],
    externalURLSVGColor: DESIGN_TOKENS["--md-sys-color-on-surface-variant-light"],
  },
  /// EDUCATION LIGHT ///
  education: {
    title: {
      textColor: "#000000",
      backgroundColor: "#ffffff",
    },
    item: {
      backgroundColor: DESIGN_TOKENS['--md-sys-color-secondary-container-light'],
      textColor: DESIGN_TOKENS["--md-sys-color-secondary-on-container-light"],
      linkColor: "#2063e9",
      onHoverBackgroundColor: DESIGN_TOKENS['--md-sys-color-tertiary-container-light'],
      onHoverTextColor: DESIGN_TOKENS['--md-sys-color-on-tertiary-container-light'],
      tag: {
        backgroundColor: DESIGN_TOKENS['--md-sys-color-secondary-container-light'],
        textColor: DESIGN_TOKENS["--md-sys-color-secondary-on-container-light"],
        onHoverBackgroundColor: DESIGN_TOKENS['--md-sys-color-secondary-light'],
        onHoverTextColor: DESIGN_TOKENS['--md-sys-color-on-secondary-light'],
        outlineColor: DESIGN_TOKENS['--md-sys-color-outline-light'],
      },
    },
    containerBackgroundColor: DESIGN_TOKENS["--md-sys-color-surface-light"],
  },
  ///// PROFESSIONAL LIGHT /////
  professional: {
    containerBackgroundColor: DESIGN_TOKENS["--md-sys-color-secondary-container-light"],
    title: {
      backgroundColor: DESIGN_TOKENS["--md-sys-color-secondary-container-light"],
      textColor: DESIGN_TOKENS["--md-sys-color-on-secondary-container-light"],
    },
    item: {
      backgroundColor: DESIGN_TOKENS['--md-sys-color-secondary-container-light'],
      textColor: DESIGN_TOKENS["--md-sys-color-secondary-on-container-light"],
      linkColor: "#2063e9",
      onHoverBackgroundColor: DESIGN_TOKENS['--md-sys-color-tertiary-container-light'],
      onHoverTextColor: DESIGN_TOKENS['--md-sys-color-on-tertiary-container-light'],
      tag: {
        backgroundColor: DESIGN_TOKENS['--md-sys-color-secondary-container-light'],
        textColor: DESIGN_TOKENS["--md-sys-color-secondary-on-container-light"],
        onHoverBackgroundColor: DESIGN_TOKENS['--md-sys-color-primary-light'],
        onHoverTextColor: DESIGN_TOKENS['--md-sys-color-on-primary-light'],
        outlineColor: DESIGN_TOKENS['--md-sys-color-outline-light'],
      },
    },
  },
  // PORTFOLIO LIGHT
  portfolio: {
    container: {
      backgroundColor: DESIGN_TOKENS['--md-sys-color-secondary-container-light'],
    },
    sectionHeader: {
      backgroundColor: DESIGN_TOKENS['--md-sys-color-secondary-container-light'],
      color: DESIGN_TOKENS['--md-sys-color-on-secondary-container-light'],
    },
    item: {
      // TODO; fix bug: item color backgroundColor has no effect
      backgroundColor: DESIGN_TOKENS['--md-sys-color-secondary-container-light'],
      color: DESIGN_TOKENS['--md-sys-color-on-secondary-container-light'],
      outline: {
        color: DESIGN_TOKENS['--md-sys-color-outline-light'],
      },
    },
  },

  footerStyles: {
    textColor: "#1D5556",
    backgroundColor: "#D6D6DF",
  },
};

export default lightColorMode;
