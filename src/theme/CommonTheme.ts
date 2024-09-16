// COMMON Styling Configuration between Light and Dark Modes
// Common Theme Design Object

// When you want to modify your Page Design (ie change font for a page section)
// you should do it here in the commonStyling object

import DESIGN_TOKENS from "../design-system/tokens.json";


const commonStyling = {
    // fontFamily: "Roboto, sans-serif",
    fontFamily: DESIGN_TOKENS["--md-sys-typescale-body-large-font-family-name"],
    // fontSize: "16px",
    fontSize: DESIGN_TOKENS['--md-sys-typescale-body-large-font-size'],
    fontWeight: "400",
    lineHeight: "1.5",
    letterSpacing: "0.00938em",
    // Domain Specific Styling
    // PERSNOAL INFO SECTION
    personal: {
        infoItem: {
            // --md-sys-typescale-headline-small-font-size
            key: {
                fontFamily: DESIGN_TOKENS["--md-sys-typescale-body-large-font-family-name"],
                // fontFamily: 'Roboto, sans-serif',
                fontSize: DESIGN_TOKENS['--md-sys-typescale-body-large-font-size'],
                // fontSize: DESIGN_TOKENS['--md-sys-typescale-headline-small-font-size'],
            },
            value: {
                fontFamily: DESIGN_TOKENS["--md-sys-typescale-body-large-font-family-name"],
                fontSize: DESIGN_TOKENS['--md-sys-typescale-body-large-font-size'],
            },
        },
    },
    // PROFESSIONAL SECTION
    professional: {
        title: {
            padding: "15px",
            fontFamily: DESIGN_TOKENS["--md-sys-typescale-headline-large-font-family-name"],
            fontSize: DESIGN_TOKENS['--md-sys-typescale-headline-large-font-family-name'],
        },
        item: {
            padding: "15px",
            onHoverTransformDuration: "0.5s",
            onHoverBackgroundColorChangeDuration: "0.7s",
            // onHoverTransitionDelay: '1s',
            title: {
                fontFamily: DESIGN_TOKENS["--md-sys-typescale-headline-medium-font-family-name"],
                // fontFamily: 'Roboto, sans-serif',
                // fontSize: "34px",
                fontSize: DESIGN_TOKENS['--md-sys-typescale-headline-medium-font-size'],
            },
            body: {
                fontFamily: DESIGN_TOKENS["--md-sys-typescale-body-large-font-family-name"],
                fontSize: DESIGN_TOKENS['--md-sys-typescale-body-large-font-size'],
            },
            tag: {
                fontFamily: DESIGN_TOKENS["--md-sys-typescale-body-large-font-family-name"],
                fontSize: DESIGN_TOKENS['--md-sys-typescale-body-large-font-size'],
            },
        },
        itemsColorModeSwitchDelay: 1.2,
    },
    education: {
        title: {
            padding: "15px",
        },
        item: {
            onHoverTransformDuration: "1.6s",
            onHoverBackgroundColorChangeDuration: "0.7s",
            // onHoverTransitionDelay: '1s',
            padding: "15px",
        },
    },
    portfolio: {
        item: {
            outline: {
                width: "3px",
            },
            // Resource Links - Pane
            resourceLinks: {
                item: {
                    iconStyles: {
                        width: "14px",
                        height: "14px",
                    },
                },
            },
            // Releases Pane
            releases: {
                headerFont: "Roboto, sans-serif",
                headerMarginBottom: "15px",
                item: {
                    font: "Roboto, sans-serif",
                    iconStyles: {
                        width: "14px",
                        height: "14px",
                    },
                },
            },
        },
    },
    footerStyles: {
        svgStyles: {
            width: "18px",
            height: "18px",
        },
        // fill: lightTheme.portfolio.item.releases.item.color,
    },
};

export default commonStyling;
