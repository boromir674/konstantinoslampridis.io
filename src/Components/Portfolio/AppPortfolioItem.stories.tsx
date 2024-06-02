// Import component
import AppPortfolioItem, { AppPortfolioItemProps } from "./AppPortfolioItem";
// Import Component props Interface
import PortfolioItemInterface from "../../PortfolioItemInterface";

// Import Style Objects boilerplate
import lightMode from "../../LightMode";
import darkMode from "../../DarkMode";
import { ComputedTheme, mergeStylings, commonStyling } from "../../AppStyles";

const lightTheme: ComputedTheme = mergeStylings(lightMode, commonStyling);
const darkTheme: ComputedTheme = mergeStylings(darkMode, commonStyling);

// Story Configuration
export default {
    component: AppPortfolioItem,
    title: "AppPortfolioItem",
    tags: ["autodocs"],
};

const args: AppPortfolioItemProps = {
    data: {
        title: "Cookiecutter Python Package",
        development_period: "2021-2024",
        status: "Mature",
        source_code_repo: "boromir674/cookiecutter-python-package",
        description: "A tool command-line interface (CLI) to automatically scaffold a new Python Open Source Project, along with multiple config files! Implemented using Python, Github Actions, Sphinx & Cookiecutter.",

        release: [
            {
                type: "pypi",
                name: "cookiecutter-python-package",
                artifact_version: "2.4.0",
            },
            {
                // docker pull boromir674/generate-python:v2.4.0
                type: "docker",
                name: "generate-python",
                artifact_version: "v2.4.0",
            },
            {
                type: "github",
                name: "cookiecutter-python-package",
                artifact_version: "v2.4.0",
            },
        ],
        tags: [
            "Project Template",
            "Code Generator",
            "Automation",
            "Cookiecutter",
            "CLI",
            "Python",
            "PyPI",
            "Sphinx",
        ],
    },
    theme: {
        links: {
            ...lightTheme.portfolio.item.resourceLinks,
        },
        releases: {
            headerFontFamily: "Arial",
            headerColor: "black",
            headerMarginBottom: "10px",
            releaseButtonTheme: {
                backgroundColor: "black",
                color: "white",
                onHoverBackgroundColor: "white",
                onHoverColor: "black",
            },
        },
    },
};

export const Simple = {
    args,
};

const lightArgs: AppPortfolioItemProps = {
    ...args,
    theme: {
        links: {
            ...lightTheme.portfolio.item.resourceLinks,
        },
        releases: {
            headerFontFamily: lightTheme.portfolio.item.releases.fontFamily,
            headerColor: lightTheme.portfolio.item.releases.color,
            headerMarginBottom: lightTheme.portfolio.item.releases.headerMarginBottom,
            releaseButtonTheme: lightTheme.portfolio.item.releases.item,
        },
    },
};

export const Light = {
    args: lightArgs
};


const darkArgs: AppPortfolioItemProps = {
    ...args,
    theme: {
        links: {
            ...darkTheme.portfolio.item.resourceLinks,
        },
        releases: {
            headerFontFamily: darkTheme.portfolio.item.releases.fontFamily,
            headerColor: darkTheme.portfolio.item.releases.color,
            headerMarginBottom: darkTheme.portfolio.item.releases.headerMarginBottom,
            releaseButtonTheme: darkTheme.portfolio.item.releases.item,
        },
    },
};

export const Dark = {
    args: darkArgs
};
