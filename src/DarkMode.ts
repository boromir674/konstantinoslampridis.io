/* DESIGN your Dark Mode Color Theme */
import DESIGN_TOKENS from "./design-system/tokens.json";
import { Theme } from "./AppStyles";

/////////// DARK MODE ///////////

const darkColorMode: Theme = {
  // This affects some out most backgound color
  backgroundColor: DESIGN_TOKENS["--md-sys-color-background-dark"],

  //// TOP HEADER PANE ////
  topHeaderPane: {
    backgroundColor: DESIGN_TOKENS["--md-sys-color-background-dark"],
  },
  //// NAVIGATION BAR in big-screen page view ////
  navigationBar: {
    backgroundColor: DESIGN_TOKENS["--md-sys-color-surface-dark"],
    textColor: DESIGN_TOKENS["--md-sys-color-on-surface-dark"],
    hoverBackgroundColor: DESIGN_TOKENS["--md-sys-color-primary-dark"],
    hoverTextColor: DESIGN_TOKENS["--md-sys-color-on-primary-dark"],
    activatedBackgroundColor: DESIGN_TOKENS["--md-sys-color-secondary-dark"],
    activatedTextColor: DESIGN_TOKENS["--md-sys-color-on-secondary-dark"],
  },
  //// THEME SWITCH ////
  themeSwitch: {
    backgroundColor: DESIGN_TOKENS["--md-sys-color-secondary-dark"],
    handleBackgroundColor: DESIGN_TOKENS["--md-sys-color-on-secondary-dark"],
    backgroundColorActive: DESIGN_TOKENS["--md-sys-color-on-secondary-dark"],
    handleBackgroundColorActive: DESIGN_TOKENS["--md-sys-color-surface-dark"],
  },
  ///// INTRODUCTION /////
  introduction: {
    // containerBackgroundColor: DESIGN_TOKENS['--md-sys-color-primary-container-dark'],
    containerBackgroundColor: DESIGN_TOKENS["--md-sys-color-surface-dark"],
    textColor: DESIGN_TOKENS["--md-sys-color-on-primary-container-dark"],
  },
  // PERSONAL INFO / CONTACT / LINKS
  personal: {
    containerBackgroundColor: DESIGN_TOKENS["--md-sys-color-surface-dark"],
    textColor: DESIGN_TOKENS["--md-sys-color-on-surface-dark"],
    urlTextColor: DESIGN_TOKENS["--md-sys-color-on-surface-variant-dark"],
    externalURLSVGColor:
      DESIGN_TOKENS["--md-sys-color-on-surface-variant-dark"],
  },
  //////// EDUCATION SECTION DARK ////////
  education: {
    // title: {
    //   textColor: "#ffffff",
    //   backgroundColor: "#333333",
    // },
    item: {
      backgroundColor: DESIGN_TOKENS["--md-sys-color-surface-dark"],
      textColor: DESIGN_TOKENS["--md-sys-color-on-surface-dark"],
      linkColor: "#2063e9",
      onHoverBackgroundColor: DESIGN_TOKENS["--md-sys-color-surface-dark"],
      onHoverTextColor:
        DESIGN_TOKENS["--md-sys-color-on-tertiary-container-dark"],
      tag: {
        textColor: DESIGN_TOKENS["--md-sys-color-on-surface-dark"],
        backgroundColor: DESIGN_TOKENS["--md-sys-color-surface-dark"],
        onHoverBackgroundColor: DESIGN_TOKENS["--md-sys-color-tertiary-dark"],
        onHoverTextColor: DESIGN_TOKENS["--md-sys-color-on-tertiary-dark"],
        outlineColor: DESIGN_TOKENS["--md-sys-color-outline-dark"],
      },
    },
    containerBackgroundColor: DESIGN_TOKENS["--md-sys-color-surface-dark"],
  },

  ///// PROFESSIONAL DARK /////
  professional: {
    // governs color of spaces around title
    containerBackgroundColor: DESIGN_TOKENS["--md-sys-color-surface-dark"],
    title: {
      backgroundColor: DESIGN_TOKENS["--md-sys-color-surface-dark"],
      textColor: DESIGN_TOKENS["--md-sys-color-on-surface-dark"],
    },
    item: {
      backgroundColor: DESIGN_TOKENS["--md-sys-color-surface-dark"],
      textColor: DESIGN_TOKENS["--md-sys-color-on-surface-dark"],
      linkColor: "#2063e9",
      onHoverBackgroundColor: DESIGN_TOKENS["--md-sys-color-surface-dark"],
      onHoverTextColor:
        DESIGN_TOKENS["--md-sys-color-on-tertiary-container-dark"],
      tag: {
        backgroundColor: DESIGN_TOKENS["--md-sys-color-surface-dark"],
        textColor: DESIGN_TOKENS["--md-sys-color-on-surface-dark"],
        onHoverBackgroundColor: DESIGN_TOKENS["--md-sys-color-primary-dark"],
        onHoverTextColor: DESIGN_TOKENS["--md-sys-color-on-primary-dark"],
        outlineColor: DESIGN_TOKENS["--md-sys-color-outline-dark"],
      },
    },
  },
  // PORTFOLIO DARK
  portfolio: {
    container: {
      backgroundColor: DESIGN_TOKENS["--md-sys-color-surface-dark"],
    },
    sectionHeader: {
      backgroundColor: DESIGN_TOKENS["--md-sys-color-surface-dark"],
      color: DESIGN_TOKENS["--md-sys-color-on-secondary-container-dark"],
    },
    // Portfolio PROJECT ITEM - DARK
    item: {
      // TODO; fix bug: item color backgroundColor has no effect
      backgroundColor: DESIGN_TOKENS["--md-sys-color-secondary-container-dark"],
      color: DESIGN_TOKENS["--md-sys-color-on-secondary-container-dark"],
      outline: {
        color: DESIGN_TOKENS["--md-sys-color-outline-dark"],
      },
      // RESOURCE LINKS - PANE - DARK
      resourceLinks: {
        backgroundColor: DESIGN_TOKENS['--md-sys-color-secondary-container-dark'],
        headerColor: DESIGN_TOKENS['--md-sys-color-on-secondary-container-dark'],
        item: {
          backgroundColor: DESIGN_TOKENS['--md-sys-color-secondary-container-dark'],
          color: DESIGN_TOKENS['--md-sys-color-on-secondary-container-dark'],
          onHoverBackgroundColor: DESIGN_TOKENS['--md-sys-color-tertiary-container-dark'],
          onHoverColor: DESIGN_TOKENS['--md-sys-color-on-tertiary-container-dark'],
        }
      },
      // RELEASES PANE - DARK
      releases: {
        backgroundColor: DESIGN_TOKENS["--md-sys-color-surface-dark"],
        color: DESIGN_TOKENS["--md-sys-color-on-surface-dark"],
        // RELEASE ITEM
        item: {
          backgroundColor: DESIGN_TOKENS['--md-sys-color-surface-variant-dark'],
          color: DESIGN_TOKENS["--md-sys-color-on-surface-dark"],
          onHoverBackgroundColor: DESIGN_TOKENS["--md-sys-color-tertiary-dark"],
          onHoverColor: DESIGN_TOKENS["--md-sys-color-on-tertiary-dark"],
        },
      },
    },
  },
  footerStyles: {
    textColor: "#D6D6DF",
    backgroundColor: "#1D5556",
  },
};

export default darkColorMode;
