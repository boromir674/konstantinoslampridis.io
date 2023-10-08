/* DESIGN your Dark Mode Color Theme */

import { ColorMode } from "../lib/ColorModeInterface";

/////////// DARK MODE ///////////

const darkColorMode: ColorMode = {
  // This affects some out most backgound color
  backgroundColor: "background-dark",

  //// TOP HEADER PANE ////
  topHeaderPane: {
    backgroundColor: "background-dark",
  },
  //// NAVIGATION BAR in big-screen page view ////
  navigationBar: {
    backgroundColor: "surface-dark",
    textColor: "on-surface-dark",
    hoverBackgroundColor: "primary-dark",
    hoverTextColor: "on-primary-dark",
    activatedBackgroundColor: "secondary-dark",
    activatedTextColor: "on-secondary-dark",
  },
  //// THEME SWITCH ////
  themeSwitch: {
    backgroundColor: "secondary-dark",
    handleBackgroundColor: "on-secondary-dark",
    backgroundColorActive: "on-secondary-dark",
    handleBackgroundColorActive: "surface-dark",
  },
  ///// INTRODUCTION /////
  introduction: {
    // containerBackgroundColor: 'primary-container-dark',
    containerBackgroundColor: "surface-dark",
    textColor: "on-primary-container-dark",
  },
  // PERSONAL INFO / CONTACT / LINKS
  personal: {
    containerBackgroundColor: "surface-dark",
    textColor: "on-surface-dark",
    urlTextColor: "on-surface-variant-dark",
    externalURLSVGColor: "on-surface-variant-dark",
  },
  //////// EDUCATION SECTION DARK ////////
  education: {
    item: {
      backgroundColor: "surface-dark",
      textColor: "on-surface-dark",
      linkColor: "#2063e9",
      onHoverBackgroundColor: "surface-dark",
      onHoverTextColor: "on-tertiary-container-dark",
      tag: {
        textColor: "on-surface-dark",
        backgroundColor: "surface-dark",
        onHoverBackgroundColor: "tertiary-dark",
        onHoverTextColor: "on-tertiary-dark",
        outlineColor: "outline-dark",
      },
    },
    containerBackgroundColor: "surface-dark",
  },

  ///// PROFESSIONAL DARK /////
  professional: {
    // governs color of spaces around title
    containerBackgroundColor: "surface-dark",
    title: {
      backgroundColor: "surface-dark",
      textColor: "on-surface-dark",
    },
    item: {
      backgroundColor: "surface-dark",
      textColor: "on-surface-dark",
      linkColor: "#2063e9",
      onHoverBackgroundColor: "surface-dark",
      onHoverTextColor: "on-tertiary-container-dark",
      tag: {
        backgroundColor: "surface-dark",
        textColor: "on-surface-dark",
        onHoverBackgroundColor: "primary-dark",
        onHoverTextColor: "on-primary-dark",
        outlineColor: "outline-dark",
      },
    },
  },
  // PORTFOLIO DARK
  portfolio: {
    container: {
      backgroundColor: "surface-dark",
    },
    sectionHeader: {
      backgroundColor: "surface-dark",
      color: "on-secondary-container-dark",
    },
    item: {
      // TODO; fix bug: item color backgroundColor has no effect
      backgroundColor: "secondary-container-dark",
      color: "on-secondary-container-dark",
      urlLinkTextColor: "on-surface-variant-dark",
      onHoverURLLinkTextColor: "on-surface-dark",
      // onHoverURLLinkTextColor: 'on-secondary-container-dark',
      outline: {
        color: "outline-dark",
      },
    },
  },
  footerStyles: {
    textColor: "#D6D6DF",
    backgroundColor: "#1D5556",
  },
};

export default darkColorMode;
