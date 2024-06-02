import AppProjectLinksPane, { LinksPaneProps } from "./AppProjectLinksPane";

// import App Styles Symbols
import lightMode from "../../LightMode";
import darkMode from "../../DarkMode";
import { ComputedTheme, mergeStylings, commonStyling } from "../../AppStyles";

const lightTheme: ComputedTheme = mergeStylings(lightMode, commonStyling);
const darkTheme: ComputedTheme = mergeStylings(darkMode, commonStyling);


export default {
    component: AppProjectLinksPane,
    title: "AppProjectLinksPane",
    tags: ["autodocs"],
};


const args: LinksPaneProps = {
    data: {
        links: [
            {
                title: 'Source Code',
                url: 'https://github.com/example/repo',
                type: 'github-repo',
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
        item: lightTheme.portfolio.item.resourceLinks.item,
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
            item: darkTheme.portfolio.item.resourceLinks.item,
        },
    },
};
