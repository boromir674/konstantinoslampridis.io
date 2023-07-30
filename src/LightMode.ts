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
  personal: {
    textColor: DESIGN_TOKENS["--md-sys-color-on-surface-variant-light"],
    urlTextColor: DESIGN_TOKENS["--md-sys-color-on-surface-variant-light"],
    containerBackgroundColor: DESIGN_TOKENS["--md-sys-color-surface-variant-light"],
  },
  /// EDUCATION LIGHT ///
  education: {
    title: {
      textColor: "#000000",
      backgroundColor: "#ffffff",
    },
    item: {
      onHoverBackgroundColor: DESIGN_TOKENS['--md-sys-color-tertiary-container-light'],
      onHoverTextColor: DESIGN_TOKENS['--md-sys-color-on-tertiary-container-light'],
      linkColor: "#2063e9",
      textColor: DESIGN_TOKENS["--md-sys-color-secondary-on-container-light"],
      backgroundColor: DESIGN_TOKENS['--md-sys-color-secondary-container-light'],
      tag: {
        backgroundColor: DESIGN_TOKENS['--md-sys-color-secondary-light'],
        textColor: DESIGN_TOKENS['--md-sys-color-on-secondary-light'],
        onHoverBackgroundColor: DESIGN_TOKENS['--md-sys-color-tertiary-light'],
        onHoverTextColor: DESIGN_TOKENS['--md-sys-color-on-tertiary-light'],
      },
    },
    containerBackgroundColor: DESIGN_TOKENS["--md-sys-color-surface-light"],
  },
  introduction: {
    containerBackgroundColor: lightColorDesign.latestBackgroundColor,
    textColor: lightColorDesign.latestColor,
  },
  ///// PROFESSIONAL LIGHT /////
  professional: {
    title: {
      backgroundColor: DESIGN_TOKENS["--md-sys-color-secondary-container-light"],
      textColor: DESIGN_TOKENS["--md-sys-color-on-secondary-container-light"],
    },
    item: {
      onHoverBackgroundColor: DESIGN_TOKENS['--md-sys-color-tertiary-container-light'],
      onHoverTextColor: DESIGN_TOKENS['--md-sys-color-on-tertiary-container-light'],
      linkColor: "#2063e9",
      textColor: DESIGN_TOKENS["--md-sys-color-secondary-on-container-light"],
      backgroundColor: DESIGN_TOKENS['--md-sys-color-secondary-container-light'],
      tag: {
        backgroundColor: DESIGN_TOKENS['--md-sys-color-primary-light'],
        textColor: DESIGN_TOKENS['--md-sys-color-on-primary-light'],
        onHoverBackgroundColor: DESIGN_TOKENS['--md-sys-color-secondary-light'],
        onHoverTextColor: DESIGN_TOKENS['--md-sys-color-on-secondary-light'],
      },
    },
    containerBackgroundColor: DESIGN_TOKENS["--md-sys-color-secondary-container-light"],
  },
  // PORTFOLIO LIGHT
  portfolio: {
    container: {
      backgroundColor: "#D5D7C6",
    },
    item: {
      backgroundColor: "#D5D7C6",
      color: "#125160",
    },
  },

  footerStyles: {
    textColor: "#1D5556",
    backgroundColor: "#D6D6DF",
  },
};

export default lightColorMode;
