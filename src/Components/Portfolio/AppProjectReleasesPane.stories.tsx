import AppReleasePane, { ReleasesPaneProps } from "./AppProjectReleasesPane";

// import App Styles Symbols
import lightMode from "../../LightMode";
import darkMode from "../../DarkMode";
import { ComputedTheme, mergeStylings, commonStyling } from "../../AppStyles";

const lightTheme: ComputedTheme = mergeStylings(lightMode, commonStyling);
const darkTheme: ComputedTheme = mergeStylings(darkMode, commonStyling);

export default {
    component: AppReleasePane,
    title: "AppReleasePane",
    tags: ["autodocs"],
};

const args: ReleasesPaneProps = {
    data: [
        {
            'type': 'pypi',
            'name': 'cookiecutter-python-package',
            'artifact_version': '0.1.0',
        },
        {
            'type': 'docker',
            'name': 'cookiecutter-python-package',
            'artifact_version': '0.1.0',
        },
        {
            'type': 'github',
            'name': 'cookiecutter-python-package',
            'artifact_version': '0.1.0',
        },
    ],
    theme: {
        headerFontFamily: 'Courier New, Courier, monospace',
        headerColor: '#555',
        headerMarginBottom: '20px',
        releaseButtonTheme: {
            color: '#D5D7C6',
            backgroundColor: '#125160',
            onHoverColor: '#125160',
            onHoverBackgroundColor: '#D5D7C6',
        }
    }
};

export const Simple = {
    args,
};

const argsLight: ReleasesPaneProps = {
    ...args,
    theme: {
        // Release Pane Title Header
        headerFontFamily: lightTheme.portfolio.item.releases.fontFamily,
        headerColor: lightTheme.portfolio.item.releases.color,
        headerMarginBottom: lightTheme.portfolio.item.releases.headerMarginBottom,
        // Item in Releases List/Catalog
        releaseButtonTheme: lightTheme.portfolio.item.releases.item
    }
};


export const Light = {
    args: argsLight,
};

const argsDark: ReleasesPaneProps = {
    ...args,
    theme: {
        // Release Pane Title Header
        headerFontFamily: darkTheme.portfolio.item.releases.fontFamily,
        headerColor: darkTheme.portfolio.item.releases.color,
        headerMarginBottom: darkTheme.portfolio.item.releases.headerMarginBottom,
        // Item in Releases List/Catalog
        releaseButtonTheme: darkTheme.portfolio.item.releases.item
    }
};

export const Dark = {
    args: argsDark,
};
