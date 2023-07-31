/* DESIGN your Light Mode Color Theme */
import DESIGN_TOKENS from "./design-system/tokens.json";
import { Theme } from './AppStyles';

/////////// LIGHT MODE ///////////
const lightColorDesign = {
  latestColor: '#0E2637',
  latestBackgroundColor: '#FFBEC3',
  // latestBackgroundColor: '#7AFCBA',
  // latestColor: '#7AFCBA',
  // latestBackgroundColor: '#0E2637',
  // Secondly, an alternative background color for outer containers
  // latestContainerBackgroundColor: '#214C63',  // cello
  latestContainerBackgroundColor: '#7AFCBA',
  // latestContainerBackgroundColor: '#FFBEC3',
}
const lightColorMode: Theme = {
  latestColor: '#7AFCBA',
  latestBackgroundColor: '#0E2637',
  // Secondly, an alternative background color for outer containers
  // latestContainerBackgroundColor: '#214C63',  // cello
  latestContainerBackgroundColor: '#FFBEC3',
  
  // <picked> color after thought
  // backgroundColor: "#D6D6DF",
  foregroundColor: "#1D5556",
  // </picked>

  // This affects some out most backgound color
  backgroundColor: DESIGN_TOKENS['--md-sys-color-secondary-container-light'],

  // foregroundColor: "#000000",
  buttonColor: "#007bff",
  buttonHoverColor: "#0056b3",
  headerStyles: {
    primaryColor: "#ffffff",
    secondaryColor: "#0056b3",
  },
  topHeaderPane: {
    backgroundColor: DESIGN_TOKENS["--md-sys-color-surface-light"],
  },
  navigationBar: {
    textColor: DESIGN_TOKENS["--md-sys-color-on-tertiary-light"],
    backgroundColor: DESIGN_TOKENS['--md-sys-color-tertiary-light'],
    hoverBackgroundColor: "#fff",
    hoverTextColor: "#000000",
    activatedBackgroundColor: DESIGN_TOKENS["--md-sys-color-primary-light"],
    activatedTextColor: DESIGN_TOKENS["--md-sys-color-on-primary-light"],
  },
  themeSwitch: {
    backgroundColor: DESIGN_TOKENS['--md-sys-color-secondary-light'],
    backgroundColorActive: DESIGN_TOKENS['--md-sys-color-on-secondary-light'],
    handleBackgroundColor: DESIGN_TOKENS['--md-sys-color-on-secondary-light'],
    handleBackgroundColorActive: DESIGN_TOKENS['--md-sys-color-surface-light'],
  },
  /// PERSONAL LIGHT ///
  personal: {
    textColor: DESIGN_TOKENS["--md-sys-color-on-surface-variant-light"],
    containerBackgroundColor: DESIGN_TOKENS["--md-sys-color-surface-variant-light"],
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
      // backgroundColor: DESIGN_TOKENS['--md-sys-color-tertiary-container-light'],
      // textColor: DESIGN_TOKENS["--md-sys-color-tertiary-on-container-light"],
      backgroundColor: DESIGN_TOKENS['--md-sys-color-secondary-container-light'],
      textColor: DESIGN_TOKENS["--md-sys-color-secondary-on-container-light"],
      // textColor: '#ffffff',
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
  introduction: {
    // containerBackgroundColor: lightColorDesign.latestBackgroundColor,
    // textColor: lightColorDesign.latestColor,
    containerBackgroundColor: DESIGN_TOKENS['--md-sys-color-primary-container-light'],
    textColor: DESIGN_TOKENS['--md-sys-color-on-primary-container-light'],
  },
  ///// PROFESSIONAL LIGHT /////
  professional: {
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
    containerBackgroundColor: DESIGN_TOKENS["--md-sys-color-secondary-container-light"],
  },
  // PORTFOLIO LIGHT
  portfolio: {
    container: {
      // backgroundColor: "#D5D7C6",
      backgroundColor: DESIGN_TOKENS['--md-sys-color-secondary-container-light'],
    },
    sectionHeader: {
      backgroundColor: DESIGN_TOKENS['--md-sys-color-secondary-container-light'],
      color: DESIGN_TOKENS['--md-sys-color-on-secondary-container-light'],
    },
    item: {
      // backgroundColor: "#D5D7C6",
      // color: "#125160",
      // TODO; fix bug: item color background has no effect
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
