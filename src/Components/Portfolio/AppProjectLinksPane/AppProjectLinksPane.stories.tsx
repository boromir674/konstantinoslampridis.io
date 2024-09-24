/* Storybook code for SVGIcon */

// import Component and Props Type
import AppProjectLinksPane, { AppProjectLinksPaneProps } from './AppProjectLinksPane';

// import App Styles Symbols
import { lightTheme, darkTheme } from '../../../theme';


// Configuration for rendering the component in storybook
export default {
    component: AppProjectLinksPane,
    title: "AppProjectLinksPane",
    tags: ["autodocs"],
};


const args: AppProjectLinksPaneProps = {
    data: {
        links: [
            {
                title: 'Source Code',
                url: 'https://github.com/example/repo',
                type: 'github',
            },
            {
                title: 'Documentation',
                url: 'https://example.com/docs',
                type: 'docs',
            },
            {
                title: 'CI/CD Pipeline',
                url: 'https://example.com/ci-cd',
                type: 'ci/cd',
            },
        ],
    },
    theme: {
        // Link Pane Title Header
        // headerFontFamily: lightTheme.portfolio.item.resourceLinks.fontFamily,
        headerColor: lightTheme.portfolio.item.resourceLinks.headerColor,
        // item: lightTheme.portfolio.item.resourceLinks.item,
        item: {
            ...lightTheme.portfolio.item.resourceLinks.item,
            icons: [
                // github
                {
                    svgStyles: {
                        width: "24px",
                        height: "24px",
                        fill: lightTheme.portfolio.item.resourceLinks.item.color
                    },
                },
                // docs
                {
                    svgStyles: {
                        width: "24px",
                        height: "24px",
                        fill: lightTheme.portfolio.item.resourceLinks.item.color
                    },
                },
                // ci/cd
                {
                    svgStyles: {
                        width: "24px",
                        height: "24px",
                        fill: lightTheme.portfolio.item.resourceLinks.item.color
                    },
                },
            ],
        },
    },
    // headerMarginBottom: lightTheme.portfolio.item.links.headerMarginBottom,
    // Item in Links List/Catalog
    // linkButtonTheme: lightTheme.portfolio.item.links.item

};

export const Light = {
    args: args
};

export const Dark = {
    args: {
        ...args,
        theme: {
            headerColor: darkTheme.portfolio.item.resourceLinks.headerColor,
            // item: darkTheme.portfolio.item.resourceLinks.item,
            item: {
                ...darkTheme.portfolio.item.resourceLinks.item,
                icons: [
                    // github
                    {
                        svgStyles: {
                            ...args.theme.item.icons?.[0].svgStyles,
                            // fill: darkTheme.portfolio.item.resourceLinks.item.color
                        },
                    },
                    // docs
                    {
                        svgStyles: {
                            ...args.theme.item.icons?.[1].svgStyles,
                            fill: darkTheme.portfolio.item.resourceLinks.item.color
                        },
                    },
                    // ci/cd
                    {
                        svgStyles: {
                            ...args.theme.item.icons?.[2].svgStyles,
                            fill: darkTheme.portfolio.item.resourceLinks.item.color
                        },
                    },
                ],
            },
        },
    },
};
