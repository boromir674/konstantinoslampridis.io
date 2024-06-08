/* Provides predefined SVG elements properties and data, through a mapping */

import { IconSVGProps } from './IconSVG';

// type of data this module provides
interface SvgData {
    svgStyles: IconSVGProps["style"];
    svgChildren: IconSVGProps["children"];
}

// SVG data mapping

const SvgDataMapping: { [key: string]: SvgData } = {
    // GITHUB LOGO
    "github": {
        svgStyles: {
            // V1
            viewBox: "0 0 16 16",
            version: "1.1",
            'aria-hidden': "true",

            // avoid taking whole viewport in story lab web page
            // width: "88",
            // height: "86",
            // V2
            // xmlns="http://www.w3.org/2000/svg",
        },
        svgChildren: (
            <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
        )
    },
    // DOCUMENTATION BOOK
    'docs': {
        svgStyles: {
            // V1
            viewBox: "0 0 20 20",
            version: "1.1",
            xmlns: "http://www.w3.org/2000/svg",
            // 'aria-hidden': "true",

            // avoid taking whole viewport in story lab web page
            width: "88",
            height: "86",
        },
        svgChildren: (
            <g>
                <path
                    // fill-rule="evenodd"
                    d="M 3 1 L 3 3 L 2 3 L 2 4 L 3 4 L 3 5 L 2 5 L 2 6 L 3 6 L 3 7 L 2 7 L 2 8 L 3 8 L 3 9 L 2 9 L 2 10 L 3 10 L 3 11 L 2 11 L 2 12 L 3 12 L 3 13 L 2 13 L 2 14 L 3 14 L 3 15 L 2 15 L 2 16 L 3 16 L 3 17 L 2 17 L 2 18 L 3 18 L 3 20 L 18 20 L 18 1 L 3 1 z M 4 2 L 17 2 L 17 19 L 4 19 L 4 18 L 5 18 L 5 17 L 4 17 L 4 16 L 5 16 L 5 15 L 4 15 L 4 14 L 5 14 L 5 13 L 4 13 L 4 12 L 5 12 L 5 11 L 4 11 L 4 10 L 5 10 L 5 9 L 4 9 L 4 8 L 5 8 L 5 7 L 4 7 L 4 6 L 5 6 L 5 5 L 4 5 L 4 4 L 5 4 L 5 3 L 4 3 L 4 2 z M 7 6 L 7 7 L 15 7 L 15 6 L 7 6 z M 8 8 L 8 9 L 14 9 L 14 8 L 8 8 z "
                >
                </path>
            </g>
        )
    },

    // ROCKET - RELEASES ICON

    // CI Pipeline Icon
    'ci/cd': {
        // STYLES to pass to inner SVG
        svgStyles: {
            // fill: "#000000",
            viewBox: "0 0 16 16",
            version: "1.1",
            xmlns: "http://www.w3.org/2000/svg",
            // 'aria-hidden': "true",

            // avoid taking whole viewport in story lab web page
            width: "88",
            height: "86",
        },
        // CHILDREN to pass to inner SVG
        svgChildren: (
            <path fill="#000000" fill-rule="evenodd"
                d="M2.75 2.5A1.75 1.75 0 001 4.25v1C1 6.216 1.784 7 2.75 7h1a1.75 1.75 0 001.732-1.5H6.5a.75.75 0 01.75.75v3.5A2.25 2.25 0 009.5 12h1.018c.121.848.85 1.5 1.732 1.5h1A1.75 1.75 0 0015 11.75v-1A1.75 1.75 0 0013.25 9h-1a1.75 1.75 0 00-1.732 1.5H9.5a.75.75 0 01-.75-.75v-3.5A2.25 2.25 0 006.5 4H5.482A1.75 1.75 0 003.75 2.5h-1zM2.5 4.25A.25.25 0 012.75 4h1a.25.25 0 01.25.25v1a.25.25 0 01-.25.25h-1a.25.25 0 01-.25-.25v-1zm9.75 6.25a.25.25 0 00-.25.25v1c0 .138.112.25.25.25h1a.25.25 0 00.25-.25v-1a.25.25 0 00-.25-.25h-1z"
                clip-rule="evenodd" />
        )
    },

    // Resource Group - Cube with loose/spanning frame
    resourceGroup: {
        // STYLES to pass to inner SVG
        svgStyles: {
            // fill: "#000000",
            viewBox: "0 0 76 76",
            version: "1.1",
            xmlns: "http://www.w3.org/2000/svg",
            // 'aria-hidden': "true",

            // avoid taking whole viewport in story lab web page
            width: "88",
            height: "86",
        },
        // CHILDREN to pass to inner SVG
        svgChildren: (
            <>
                <path fill="#000000" fill-opacity="0.701961" stroke-width="0.2" stroke-linejoin="round" d="M 24,46.9792L 24,31.5L 37,38.9286L 37,54.4271L 24,46.9792 Z " />
                <path fill="#000000" fill-opacity="0.403922" stroke-width="0.2" stroke-linejoin="round" d="M 52,31.5L 52,46.9792L 39,54.4271L 39,38.9286L 52,31.5 Z " />
                <path fill="#000000" fill-opacity="1" stroke-width="0.2" stroke-linejoin="round" d="M 38,21L 51.75,29L 38,37L 24.25,29L 38,21 Z M 21,49.5L 28.5078,53.8682L 26.5625,55L 26.4219,55L 18,50.1L 18,25.9001L 26.4219,21.0001L 26.5625,21.0001L 28.5078,22.1319L 21,26.5001L 21,49.5 Z M 54.9999,49.5L 55,26.5001L 47.4921,22.1319L 49.4375,21L 49.578,21L 58,25.9001L 57.9999,50.1L 49.578,55L 49.4375,55L 47.4921,53.8682L 54.9999,49.5 Z " />
            </>
        )
    },

};

export { SvgDataMapping };
