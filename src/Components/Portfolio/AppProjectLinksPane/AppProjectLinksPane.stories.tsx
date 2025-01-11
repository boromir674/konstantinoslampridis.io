/* Storybook code for SVGIcon */
import { FC } from 'react';
// import Component and Props Type
import AppProjectLinksPane, { AppProjectLinksPaneProps } from './AppProjectLinksPane';

// import App Styles Symbols
import { lightTheme, darkTheme } from '../../../theme';


// Buttons that span modal dialog, such as Release Button and Resource Link Button
// require access to the ZIndex Context to be able to update their parents' z-index state.
// here we do not update any parent, but we still need it to instantiate the component
import ZIndexContext from '../../../ZIndexContext';


// Proxy Component that encapsulates Content initialization
const AppProjectLinksPaneWithZIndex: FC<AppProjectLinksPaneProps> = (props: AppProjectLinksPaneProps) => {
  return (
    <ZIndexContext.Provider value={{
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      setZIndex: (zIndex: number) => null,
    }}>
      <AppProjectLinksPane {...props} />
    </ZIndexContext.Provider>
  )
};

// Configuration for rendering the component in storybook
export default {
    component: AppProjectLinksPaneWithZIndex,
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
        header: {
            fontFamily: '',
            fontSize: ''
        }
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
