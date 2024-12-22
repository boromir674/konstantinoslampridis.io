import React, { FC } from 'react';

import AppReleasePane, { ReleasesPaneProps } from "./AppProjectReleasesPane";

// import App Styles Symbols
import { lightTheme, darkTheme } from '../../../theme';

// Buttons that span modal dialog, such as Release Button and Resource Link Button
// require access to the ZIndex Context to be able to update their parents' z-index state.
// here we do not update any parent, but we still need it to instantiate the component
import ZIndexContext from '../../../ZIndexContext';


// Proxy Component that encapsulates Content initialization
const ReleasePaneWithZIndex: FC<ReleasesPaneProps> = (props: ReleasesPaneProps) => {
  return (
    <ZIndexContext.Provider value={{
      // zIndex: 1,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      setZIndex: (zIndex: number) => null,
    }}>
      <AppReleasePane {...props} />
    </ZIndexContext.Provider>
  )
};


export default {
  component: ReleasePaneWithZIndex,
  title: "AppReleasePane",
  tags: ["autodocs"],
};


const args: ReleasesPaneProps = {
  data: [
    {
      type: "pypi",
      name: "cookiecutter-python-package",
      artifact_version: "0.1.0",
      urlText: "https://pypi.org/projects/cookiecutter-python-package",
      command: "docker pull boromir674/generate-python:v2.4.0",
    },
    {
      type: "docker",
      name: "cookiecutter-python-package",
      artifact_version: "0.1.0",
      urlText: "https://pypi.org/projects/cookiecutter-python-package",
      command: "docker pull boromir674/generate-python:v2.4.0",
    },
    {
      type: "gh_release",
      name: "cookiecutter-python-package",
      artifact_version: "0.1.0",
      command: "docker pull boromir674/generate-python:v2.4.0",
      urlText: "https://pypi.org/projects/cookiecutter-python-package",
    },
  ],
  theme: {
    headerFontSize: "24px",
    headerFontFamily: "Courier New, Courier, monospace",
    headerColor: "#555",
    headerMarginBottom: "20px",
    releaseButtonTheme: {
      color: "#D5D7C6",
      backgroundColor: "#125160",
      onHoverColor: "#125160",
      onHoverBackgroundColor: "#D5D7C6",
      icons: [
        /// pypi
        {},
        /// docker
        {
          svgStyles: {
            width: "88",
            height: "86",
          },
        },
        /// github
        {
          svgStyles: {
            width: "88",
            height: "86",
          },
        },
      ],
    },
  },
};


export const Simple = {
  args,
};

const argsLight: ReleasesPaneProps = {
  ...args,
  theme: {
    // Release Pane Title Header
    headerFontSize: "24px",
    headerFontFamily: lightTheme.portfolio.item.releases.fontFamily,
    headerColor: lightTheme.portfolio.item.releases.color,
    headerMarginBottom: lightTheme.portfolio.item.releases.headerMarginBottom,
    // Item in Releases List/Catalog
    releaseButtonTheme: {
      ...lightTheme.portfolio.item.releases.item,
      icons: [
        /// pypi
        {
          svgStyles: {
            fill: lightTheme.portfolio.item.releases.item.color,
          },
          // pathStyles: [
          //   {
          //     fill: lightTheme.portfolio.item.releases.item.color,
          //   },
          // ],
        },
        /// docker
        {
          svgStyles: {
            fill: lightTheme.portfolio.item.releases.item.color,
            width: "88",
            height: "86",
          },
          pathStyles: [
            {
              fill: lightTheme.portfolio.item.releases.item.color,
            },
          ],
        },
        /// github
        {
          svgStyles: {
            fill: lightTheme.portfolio.item.releases.item.color,
            width: "88",
            height: "86",
          },
          pathStyles: [
            {
              fill: lightTheme.portfolio.item.releases.item.color,
            },
          ],
        },
      ],
    },
  },
};

export const Light = {
  args: argsLight,
};

const argsDark: ReleasesPaneProps = {
  ...args,
  theme: {
    ...args.theme,
    // Release Pane Title Header
    headerFontFamily: darkTheme.portfolio.item.releases.fontFamily,
    headerColor: darkTheme.portfolio.item.releases.color,
    headerMarginBottom: darkTheme.portfolio.item.releases.headerMarginBottom,
    // Item in Releases List/Catalog
    releaseButtonTheme: {
      ...darkTheme.portfolio.item.releases.item,
      icons: [
        /// pypi
        {
          svgStyles: {
            fill: darkTheme.portfolio.item.releases.item.color,
            width: "88",
            height: "86",
          },
          // pathStyles: [
          //   {
          //     fill: darkTheme.portfolio.item.releases.item.color,
          //   },
          // ],
        },
        /// docker
        {
          svgStyles: {
            fill: darkTheme.portfolio.item.releases.item.color,
            width: "88",
            height: "86",
          },
          pathStyles: [
            {
              fill: darkTheme.portfolio.item.releases.item.color,
            },
          ],
        },
        /// github
        {
          svgStyles: {
            fill: darkTheme.portfolio.item.releases.item.color,
            width: "88",
            height: "86",
          },
          pathStyles: [
            {
              fill: darkTheme.portfolio.item.releases.item.color,
            },
          ],
        },
      ],
    },
  },
};

export const Dark = {
  args: argsDark,
};
