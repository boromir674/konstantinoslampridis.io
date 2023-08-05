/* DESIGN your Dark Mode Color Theme */
import DESIGN_TOKENS from "./design-system/tokens.json";
import { Theme } from './AppStyles';


/////////// DARK MODE ///////////
const darkColorMode: Theme = {
  latestColor: '#0E2637',
  latestBackgroundColor: '#7AFCBA',
  // Secondly, an alternative background color for outer containers
  // latestContainerBackgroundColor: '#FFBEC3',
  latestContainerBackgroundColor: '#214C63',  // cello

  // This affects some out most backgound color
  backgroundColor: DESIGN_TOKENS['--md-sys-color-background-dark'],
  foregroundColor: "#1D5556",

  buttonColor: "#007bff",
  buttonHoverColor: "#0096ff",
  headerStyles: {
    primaryColor: "#333333",
    secondaryColor: "#0096ff",
  },
  topHeaderPane: {
    // backgroundColor: DESIGN_TOKENS["--md-sys-color-surface-dark"],
    backgroundColor: DESIGN_TOKENS["--md-sys-color-background-dark"],
  },
  navigationBar: {
    // textColor: DESIGN_TOKENS["--md-sys-color-on-tertiary-dark"],
    // backgroundColor: DESIGN_TOKENS['--md-sys-color-tertiary-dark'],
    // hoverBackgroundColor: DESIGN_TOKENS['--md-sys-color-surface-dark'],
    // hoverTextColor: DESIGN_TOKENS["--md-sys-color-on-surface-dark"],
    // activatedBackgroundColor: DESIGN_TOKENS["--md-sys-color-primary-dark"],
    // activatedTextColor: DESIGN_TOKENS["--md-sys-color-on-primary-dark"],

    // backgroundColor: DESIGN_TOKENS['--md-sys-color-surface-variant-dark'],
    // textColor: DESIGN_TOKENS["--md-sys-color-on-surface-variant-dark"],

    backgroundColor: DESIGN_TOKENS['--md-sys-color-surface-dark'],
    textColor: DESIGN_TOKENS["--md-sys-color-on-surface-dark"],

    hoverBackgroundColor: DESIGN_TOKENS['--md-sys-color-primary-dark'],
    hoverTextColor: DESIGN_TOKENS["--md-sys-color-on-primary-dark"],
    activatedBackgroundColor: DESIGN_TOKENS["--md-sys-color-secondary-dark"],
    activatedTextColor: DESIGN_TOKENS["--md-sys-color-on-secondary-dark"],
  },
  themeSwitch: {
    backgroundColor: DESIGN_TOKENS['--md-sys-color-secondary-dark'],
    handleBackgroundColor: DESIGN_TOKENS['--md-sys-color-on-secondary-dark'],
    backgroundColorActive: DESIGN_TOKENS['--md-sys-color-on-secondary-dark'],
    handleBackgroundColorActive: DESIGN_TOKENS['--md-sys-color-surface-dark'],
  },
  ///// INTRODUCTION /////
  introduction: {
    // containerBackgroundColor: DESIGN_TOKENS['--md-sys-color-primary-container-dark'],
    containerBackgroundColor: DESIGN_TOKENS['--md-sys-color-surface-dark'],
    textColor: DESIGN_TOKENS['--md-sys-color-on-primary-container-dark'],
  },
  // PERSONAL INFO / CONTACT / LINKS
  personal: {
    containerBackgroundColor: DESIGN_TOKENS['--md-sys-color-surface-dark'],
    textColor: DESIGN_TOKENS['--md-sys-color-on-surface-dark'],
    urlTextColor: DESIGN_TOKENS["--md-sys-color-on-surface-variant-dark"],
    externalURLSVGColor: DESIGN_TOKENS["--md-sys-color-on-surface-variant-dark"],
  },
  //////// EDUCATION SECTION DARK ////////
  education: {
    title: {
      textColor: "#ffffff",
      backgroundColor: "#333333",
    },
    item: {
      // backgroundColor: DESIGN_TOKENS['--md-sys-color-tertiary-container-dark'],
      // textColor: DESIGN_TOKENS["--md-sys-color-tertiary-on-container-dark"],
      backgroundColor: DESIGN_TOKENS['--md-sys-color-surface-dark'],
      textColor: DESIGN_TOKENS['--md-sys-color-on-surface-dark'],
      // textColor: '#ffffff',
      linkColor: "#2063e9",
      onHoverBackgroundColor: DESIGN_TOKENS['--md-sys-color-surface-dark'],
      onHoverTextColor: DESIGN_TOKENS['--md-sys-color-on-tertiary-container-dark'],
      tag: {
        // backgroundColor: DESIGN_TOKENS['--md-sys-color-secondary-dark'],
        // textColor: DESIGN_TOKENS['--md-sys-color-on-secondary-dark'],
        textColor: DESIGN_TOKENS['--md-sys-color-on-surface-dark'],
        backgroundColor: DESIGN_TOKENS['--md-sys-color-surface-dark'],
        onHoverBackgroundColor: DESIGN_TOKENS['--md-sys-color-tertiary-dark'],
        onHoverTextColor: DESIGN_TOKENS['--md-sys-color-on-tertiary-dark'],
        outlineColor: DESIGN_TOKENS['--md-sys-color-outline-dark'],
      },
    },
    containerBackgroundColor: DESIGN_TOKENS["--md-sys-color-surface-dark"],
  },

  ///// PROFESSIONAL DARK /////
  professional: {
    // governs color of spaces around title
    // containerBackgroundColor: DESIGN_TOKENS["--md-sys-color-secondary-container-dark"],
    containerBackgroundColor: DESIGN_TOKENS['--md-sys-color-surface-dark'],
    title: {
        // backgroundColor: DESIGN_TOKENS["--md-sys-color-secondary-container-dark"],
        // textColor: DESIGN_TOKENS["--md-sys-color-on-secondary-container-dark"],
        backgroundColor: DESIGN_TOKENS['--md-sys-color-surface-dark'],
        textColor: DESIGN_TOKENS['--md-sys-color-on-surface-dark'],
    },
    item: {
      // backgroundColor: DESIGN_TOKENS['--md-sys-color-secondary-container-dark'],
      // textColor: DESIGN_TOKENS["--md-sys-color-secondary-on-container-dark"],
      backgroundColor: DESIGN_TOKENS['--md-sys-color-surface-dark'],
      textColor: DESIGN_TOKENS['--md-sys-color-on-surface-dark'],
      linkColor: "#2063e9",
      onHoverBackgroundColor: DESIGN_TOKENS['--md-sys-color-surface-dark'],
      onHoverTextColor: DESIGN_TOKENS['--md-sys-color-on-tertiary-container-dark'],
      tag: {
        backgroundColor: DESIGN_TOKENS['--md-sys-color-surface-dark'],
        textColor: DESIGN_TOKENS['--md-sys-color-on-surface-dark'],
        onHoverBackgroundColor: DESIGN_TOKENS['--md-sys-color-primary-dark'],
        onHoverTextColor: DESIGN_TOKENS['--md-sys-color-on-primary-dark'],
        outlineColor: DESIGN_TOKENS['--md-sys-color-outline-dark'],
      },
    },
  },
  // PORTFOLIO DARK
  portfolio: {
    container: {
      backgroundColor: DESIGN_TOKENS['--md-sys-color-surface-dark'],
    },
    sectionHeader: {
      // backgroundColor: DESIGN_TOKENS['--md-sys-color-secondary-container-dark'],
      backgroundColor: DESIGN_TOKENS['--md-sys-color-surface-dark'],
      color: DESIGN_TOKENS['--md-sys-color-on-secondary-container-dark'],
    },
    item: {
      // TODO; fix bug: item color backgroundColor has no effect
      backgroundColor: DESIGN_TOKENS['--md-sys-color-secondary-container-dark'],
      color: DESIGN_TOKENS['--md-sys-color-on-secondary-container-dark'],
      outline: {
        color: DESIGN_TOKENS['--md-sys-color-outline-dark'],
      },
    },
  },
  footerStyles: {
    textColor: "#D6D6DF",
    backgroundColor: "#1D5556",
  },
};

export default darkColorMode;
