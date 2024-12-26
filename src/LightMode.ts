/* DESIGN your Light Mode Color Theme */
import DESIGN_TOKENS from "./design-system/tokens.json";
import { Theme } from "./theme/AppStyles";

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
    // title: {
    //   // backgroundColor: "#ffffff",
    //   backgroundColor: "#111111",
    //   textColor: DESIGN_TOKENS["--md-sys-color-secondary-on-container-light"],
    // },
    item: {
      backgroundColor: DESIGN_TOKENS['--md-sys-color-secondary-container-light'],
      textColor: DESIGN_TOKENS["--md-sys-color-on-secondary-container-light"],
      linkColor: "#2063e9",
      onHoverBackgroundColor: DESIGN_TOKENS['--md-sys-color-tertiary-container-light'],
      onHoverTextColor: DESIGN_TOKENS['--md-sys-color-on-tertiary-container-light'],
      tag: {
        backgroundColor: DESIGN_TOKENS['--md-sys-color-secondary-container-light'],
        textColor: DESIGN_TOKENS["--md-sys-color-on-secondary-container-light"],
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
      textColor: DESIGN_TOKENS["--md-sys-color-on-secondary-container-light"],
      linkColor: "#2063e9",
      onHoverBackgroundColor: DESIGN_TOKENS['--md-sys-color-tertiary-container-light'],
      onHoverTextColor: DESIGN_TOKENS['--md-sys-color-on-tertiary-container-light'],
      tag: {
        backgroundColor: DESIGN_TOKENS['--md-sys-color-secondary-container-light'],
        textColor: DESIGN_TOKENS["--md-sys-color-on-secondary-container-light"],
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
    // PROJECT ITEM
    item: {
      // TODO; fix bug: item color backgroundColor has no effect
      backgroundColor: DESIGN_TOKENS['--md-sys-color-secondary-container-light'],
      color: DESIGN_TOKENS['--md-sys-color-on-secondary-container-light'],
      outline: {
        color: DESIGN_TOKENS['--md-sys-color-outline-light'],
      },
      // RESOURCE LINKS - PANE - LIGHT
      resourceLinks: {
        backgroundColor: DESIGN_TOKENS['--md-sys-color-secondary-container-light'],
        headerColor: DESIGN_TOKENS['--md-sys-color-on-secondary-container-light'],
        item: {
          backgroundColor: DESIGN_TOKENS['--md-sys-color-surface-variant-light'],
          color: DESIGN_TOKENS['--md-sys-color-on-secondary-container-light'],
          onHoverBackgroundColor: DESIGN_TOKENS['--md-sys-color-tertiary-container-light'],
          onHoverColor: DESIGN_TOKENS['--md-sys-color-on-tertiary-container-light'],
        }
        // linkColor: DESIGN_TOKENS['--md-sys-color-on-secondary-container-light'],
        // onHoverBackgroundColor: DESIGN_TOKENS['--md-sys-color-tertiary-container-light'],
        // onHoverColor: DESIGN_TOKENS['--md-sys-color-on-tertiary-container-light'],
      },
      // RELEASES PANE LIGHT
      releases: {
        backgroundColor: DESIGN_TOKENS['--md-sys-color-secondary-container-light'],
        color: DESIGN_TOKENS['--md-sys-color-on-secondary-container-light'],
        // RELEASE ITEM
        // TODO: go from Light to Darker when opening dialogs.
        // TODO clearly declare here General, Buttons, Dialogs Background interface
        item: {
          // backgroundColor: DESIGN_TOKENS['--md-sys-color-secondary-container-light'],
          // --md-sys-color-surface-variant-light
          backgroundColor: DESIGN_TOKENS['--md-sys-color-surface-variant-light'],
          color: DESIGN_TOKENS['--md-sys-color-on-secondary-container-light'],
          onHoverBackgroundColor: DESIGN_TOKENS['--md-sys-color-tertiary-container-light'],
          onHoverColor: DESIGN_TOKENS['--md-sys-color-on-tertiary-container-light'],
          // <pre> / <code> Colors
          codeColor: DESIGN_TOKENS['--md-sys-color-on-secondary-container-light'],

          // CODE BACKGROUND, should better be a bit "darker" than the Dialog Background, for better contrast

          // Nice Light Grey Color in general. Darker than the Dialog Background. Good-enough, for now, it would be nicer to redesign this.
          // this is a nice "mellow" yellow background; definitely darker than the dialog. can work!
          codeBackgroundColor: DESIGN_TOKENS['--md-sys-color-tertiary-container-light'],
          // this is a very nice darker "version of pink" compared to the dialog background "pink". very nice!
          // codeBackgroundColor: DESIGN_TOKENS['--md-sys-color-outline-variant-light'],
          // Not bad, redish color darker than the Dialog, but not too dark. Passable solution.
          // codeBackgroundColor: DESIGN_TOKENS['--md-sys-color-inverse-primary-light']


          // codeBackgroundColor: DESIGN_TOKENS['--md-sys-color-surface-variant-light'], // SAME AS Dialog Background
          // codeBackgroundColor: DESIGN_TOKENS['--md-sys-color-on-secondary-light'], // WHITE
          // codeBackgroundColor: DESIGN_TOKENS['--md-sys-color-inverse-on-surface-light'],
          // very brownish/greenish and too dark, for this case.
          // codeBackgroundColor: DESIGN_TOKENS['--md-sys-color-tertiary-light'],
          // Very Nice Dark color, but too dark for this case. Use elsewhere, it is very nice.
          //  codeBackgroundColor: DESIGN_TOKENS['--md-sys-color-secondary-light']
          // same (or almsot the same) as the Dialog Background. no contrast at all
          // codeBackgroundColor: DESIGN_TOKENS['--md-sys-color-primary-container-light']
          // Completely white, much lighter than Dialog Background
          // codeBackgroundColor: DESIGN_TOKENS['--md-sys-color-on-primary-light']
          // belongs to the Dark family of tones. too dark for this case. but viable for varying dark elsewhere.
          // codeBackgroundColor: DESIGN_TOKENS['--md-sys-color-inverse-surface-light']
          // this is white
          // codeBackgroundColor: DESIGN_TOKENS['--md-sys-color-inverse-on-surface-light']
          // nice in between grey and black, but too dark for here
          // codeBackgroundColor: DESIGN_TOKENS['--md-sys-color-outline-light']
          // belongs to the Dark family of tones. too dark for this case. but viable for varying dark elsewhere.
          // codeBackgroundColor: DESIGN_TOKENS['--md-sys-color-on-surface-variant-light']
          // this is white
          // codeBackgroundColor: DESIGN_TOKENS['--md-sys-color-inverse-on-surface-light']
          // this is the slightest possible "darker" than the dialog background. it does not offer practical contrast.
          // codeBackgroundColor: DESIGN_TOKENS['--md-sys-color-secondary-container-light']
          
          onHoverCodeBackgroundColor: DESIGN_TOKENS['--md-sys-color-inverse-primary-light'],

        },
      },
    },
  },

  footerStyles: {
    textColor: "#1D5556",
    backgroundColor: "#D6D6DF",
    svgStyles: {
      fill: DESIGN_TOKENS['--md-sys-color-on-secondary-container-light'],
    },
  },
};

export default lightColorMode;
