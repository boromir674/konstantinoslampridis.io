/** Provides the App's Common Styles Object, between Light and Dark Mode */

// When you want to modify your Page Design (ie change font for a page section)
// you should do it here in the commonStyling object

import DESIGN_TOKENS from "../design-system/tokens.json";


const commonStyling = {
    //// THEME SWITCH ////
    themeSwitch: {
        backgroundColor: DESIGN_TOKENS['--md-sys-color-secondary-light'],
        handleBackgroundColor: DESIGN_TOKENS['--md-sys-color-on-secondary-light'],
        // Must put the Dark colors here ! to avoid mid-grag changing of inactive/active color pair
        backgroundColorActive: DESIGN_TOKENS["--md-sys-color-on-secondary-dark"],
        handleBackgroundColorActive: DESIGN_TOKENS["--md-sys-color-secondary-dark"],
    },
    // NAVIGATION BAR (in header)
    navigationBar: {
        fontFamily: DESIGN_TOKENS["--md-sys-typescale-headline-small-font-family-name"],
        // fontFamily: 'Roboto, sans-serif',
        fontSize: DESIGN_TOKENS['--md-sys-typescale-headline-small-font-size'],
    },
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
        // EDUCATION SECTION TITLE
        title: {
            padding: "15px",
        },
        item: {
            onHoverTransformDuration: "0.5s",
            onHoverBackgroundColorChangeDuration: "0.7s",
            // onHoverTransitionDelay: '1s',
            padding: "15px",
            degreeTitle: {
                fontFamily: DESIGN_TOKENS["--md-sys-typescale-headline-large-font-family-name"],
                fontSize: DESIGN_TOKENS['--md-sys-typescale-headline-large-font-size'],
                // fontSize: DESIGN_TOKENS['--md-sys-typescale-display-small-font-size']
                // fontSize: '54px',
            },
            body: {
                fontFamily: DESIGN_TOKENS["--md-sys-typescale-body-large-font-family-name"],
                fontSize: DESIGN_TOKENS['--md-sys-typescale-body-large-font-size'],
            },
            tags: {
                fontFamily: DESIGN_TOKENS["--md-sys-typescale-body-large-font-family-name"],
                fontSize: DESIGN_TOKENS['--md-sys-typescale-body-large-font-size'],
            }
        },
    },
    // PORTFOLIO SECTION
    portfolio: {
        // PORTFOLIO SECTION TITLE
        sectionHeader: {
            fontFamily: DESIGN_TOKENS["--md-sys-typescale-headline-large-font-family-name"],
            fontSize: DESIGN_TOKENS['--md-sys-typescale-headline-large-font-size'],
        },
        // GRID LAYOUT - RESET BUTTON
        resetLayoutButton: {
            fontFamily: DESIGN_TOKENS["--md-sys-typescale-label-large-font-family-name"],
            fontSize: DESIGN_TOKENS['--md-sys-typescale-label-large-font-size'],
            // fontSize: "22px",
        },
        // STYLES PER (GRID) PORTFOLIO ITEM
        item: {
            // PROJECT TITLE
            projectTitle: {
                fontFamily: DESIGN_TOKENS["--md-sys-typescale-headline-large-font-family-name"],
                fontSize: DESIGN_TOKENS['--md-sys-typescale-headline-large-font-size'],
            },
            // PROJECT DESCRIPTION
            projectDescription: {
                fontFamily: DESIGN_TOKENS["--md-sys-typescale-body-large-font-family-name"],
                fontSize: DESIGN_TOKENS['--md-sys-typescale-body-large-font-size'],
                // top and bottom margin in pixels, for Description <p> tag
                margin: 16,
            },
            // OUTER-MOST OUTLINE (ie lines surrouding the box) 
            outline: {
                width: "3px",
            },
            // Minimum "gap" between Left/Right Links/Releases Panes that should be preserved, when item is shrinked (ie on resize via user's drag-n-drop of botton right handle) and releases are pushed to the left (inside the Grid Item)
            minGapBetweenPanes: "10px",
            // Resource Links - Pane
            resourceLinks: {  // TODO test that font size and family is passed as css styles through props
                header: {
                    fontFamily: DESIGN_TOKENS["--md-sys-typescale-title-medium-font-family-name"],
                    // fontFamily: 'times new roman',
                    fontSize: DESIGN_TOKENS['--md-sys-typescale-title-medium-font-size'],
                },
                // Resource Link Item
                item: {
                    fontFamily: DESIGN_TOKENS["--md-sys-typescale-body-medium-font-family-name"],
                    fontSize: DESIGN_TOKENS['--md-sys-typescale-body-large-font-size'],
                    icon: {
                        svgStyles: {
                            width: "12px",
                            height: "12px",
                        },
                    },
                },
            },
            // Releases Pane
            releases: {  // TODO test that font size and family is passed as css styles through props
                headerFont: DESIGN_TOKENS['--md-sys-typescale-title-medium-font-family-name'],
                headerFontSize: DESIGN_TOKENS['--md-sys-typescale-title-medium-font-size'],
                headerMarginBottom: "15px",
                item: {
                    font: DESIGN_TOKENS['--md-sys-typescale-body-medium-font-family-name'],
                    fontSize: DESIGN_TOKENS['--md-sys-typescale-body-medium-font-size'],
                    icon: {
                        svgStyles: {
                            width: "12px",
                            height: "12px",
                        },
                    },
                },
            },
        },
    },
    // PAGE FOOTER
    footerStyles: {
        svgStyles: {
            width: "18px",
            height: "18px",
        },
        // fill: lightTheme.portfolio.item.releases.item.color,
    },
};

export default commonStyling;
