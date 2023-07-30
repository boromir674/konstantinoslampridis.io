import { Theme } from './AppStyles';
import DESIGN_TOKENS from "./design-system/tokens.json";


/////////// DARK MODE ///////////
const darkColorDesign = {
  latestColor: '#FFBEC3',
  latestBackgroundColor: '#0E2637',
  latestContainerBackgroundColor: '#214C63',  // cello
};
const darkColorMode: Theme = {
  latestColor: '#0E2637',
  latestBackgroundColor: '#7AFCBA',
  // Secondly, an alternative background color for outer containers
  // latestContainerBackgroundColor: '#FFBEC3',
  latestContainerBackgroundColor: '#214C63',  // cello

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
    backgroundColor: DESIGN_TOKENS["--md-sys-color-surface-dark"],
  },
  navigationBar: {
    textColor: DESIGN_TOKENS["--md-sys-color-on-tertiary-dark"],
    backgroundColor: DESIGN_TOKENS['--md-sys-color-tertiary-dark'],
    hoverBackgroundColor: "#000000",
    hoverTextColor: "#ffffff",
    activatedBackgroundColor: DESIGN_TOKENS["--md-sys-color-primary-dark"],
    activatedTextColor: DESIGN_TOKENS["--md-sys-color-on-primary-dark"],
  },
  // PERSONAL INFO / CONTACT / LINKS
  personal: {
    textColor: DESIGN_TOKENS["--md-sys-color-on-surface-variant-dark"],
    urlTextColor: DESIGN_TOKENS["--md-sys-color-on-surface-variant-dark"],
    containerBackgroundColor: DESIGN_TOKENS["--md-sys-color-surface-variant-dark"],
  },
  //////// EDUCATION SECTION DARK ////////
  education: {
    title: {
      textColor: "#ffffff",
      backgroundColor: "#333333",
    },
    item: {
      onHoverBackgroundColor: DESIGN_TOKENS['--md-sys-color-tertiary-container-dark'],
      onHoverTextColor: DESIGN_TOKENS['--md-sys-color-on-tertiary-container-dark'],
      linkColor: "#2063e9",
      textColor: DESIGN_TOKENS["--md-sys-color-secondary-on-container-dark"],
      backgroundColor: DESIGN_TOKENS['--md-sys-color-secondary-container-dark'],
      tag: {
        backgroundColor: DESIGN_TOKENS['--md-sys-color-secondary-dark'],
        textColor: DESIGN_TOKENS['--md-sys-color-on-secondary-dark'],
        onHoverBackgroundColor: DESIGN_TOKENS['--md-sys-color-tertiary-dark'],
        onHoverTextColor: DESIGN_TOKENS['--md-sys-color-on-tertiary-dark'],
      },
    },
    containerBackgroundColor: DESIGN_TOKENS["--md-sys-color-surface-dark"],
  },
  introduction: {
    containerBackgroundColor: darkColorDesign.latestBackgroundColor,
    // containerBackgroundColor: darkColorDesign.latestContainerBackgroundColor,
    textColor: darkColorDesign.latestColor,
    // containerBackgroundColor: "#1D5556",
    // textColor: "#D6D6DF",
  },
  ///// PROFESSIONAL DARK /////
  professional: {
    title: {
        backgroundColor: DESIGN_TOKENS["--md-sys-color-secondary-container-dark"],
        textColor: DESIGN_TOKENS["--md-sys-color-on-secondary-container-dark"],
    },
    item: {
      onHoverBackgroundColor: DESIGN_TOKENS['--md-sys-color-tertiary-container-dark'],
      onHoverTextColor: DESIGN_TOKENS['--md-sys-color-on-tertiary-container-dark'],
      linkColor: "#2063e9",
      textColor: DESIGN_TOKENS["--md-sys-color-secondary-on-container-dark"],
      backgroundColor: DESIGN_TOKENS['--md-sys-color-secondary-container-dark'],
      tag: {
        backgroundColor: DESIGN_TOKENS['--md-sys-color-primary-dark'],
        textColor: DESIGN_TOKENS['--md-sys-color-on-primary-dark'],
        onHoverBackgroundColor: DESIGN_TOKENS['--md-sys-color-secondary-dark'],
        onHoverTextColor: DESIGN_TOKENS['--md-sys-color-on-secondary-dark'],
      },
    },
    containerBackgroundColor: DESIGN_TOKENS["--md-sys-color-secondary-container-dark"],
  },
  // PORTFOLIO DARK
  portfolio: {
    container: {
      backgroundColor: "#125160",
    },
    item: {
      backgroundColor: "#125160",
      color: "#D5D7C6",
    },
  },
  footerStyles: {
    textColor: "#D6D6DF",
    backgroundColor: "#1D5556",
  },
};

export default darkColorMode;
