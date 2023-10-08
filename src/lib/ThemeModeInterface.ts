/**
 * Provides the 'Theme Mode Interface', which should be enough to
 * represent the full styles of the App.
 * Full styles include Color Mode (Light or Dark) plus the common (invariant of
 * color mode) styles
 **/

import { ColorMode } from "./ColorModeInterface";


/**
 * Theme Mode Interface, which represent all the App's styles.
 * At any given moment the App's styles include Color Mode specific styles
 * (Light or Dark) plus other common styles (ie paddings), invariant of color
 * mode.
 **/
interface ThemeMode extends ColorMode {
  // Header Navigation Bar (ie renders on Desktop view)
  headerNavigationBar: {
    padding: {
      vertical: string;
      horizontal: string;
    };
  };
  //// ALL PROFESSIONAL STYLES
  professional: {
    containerBackgroundColor: ColorMode["professional"]["containerBackgroundColor"];
    title: {
      textColor: ColorMode["professional"]["title"]["textColor"];
      backgroundColor: ColorMode["professional"]["title"]["backgroundColor"];
      padding: string;
    };
    item: {
      padding?: string;
      backgroundColor: string;
      textColor: string;
      linkColor: string;
      onHoverBackgroundColor: string;
      onHoverTextColor: string;
      onHoverTransformDuration: string;
      onHoverBackgroundColorChangeDuration: string;
      tag: {
        backgroundColor: string;
        textColor: string;
        onHoverBackgroundColor: string;
        onHoverTextColor: string;
        outlineColor: string;
      };
    };
    // defines whether there will be a delay between the the top item and the
    // bottom, on color mode switch (toggle)

    // for example if given number is 4 then from the moment the top item
    // starts to change colors (on mode switch), till the moment the bottom
    // item changed colors, 4 seconds would pass
    itemsColorModeSwitchDelay: number;
  };
  //// ALL EDUCATION STYLES
  education: {
    item: {
      padding?: string;
      backgroundColor: string;
      textColor: string;
      linkColor: string;
      onHoverBackgroundColor: string;
      onHoverTextColor: string;
      // Common Styling that does not depend on color
      onHoverTransformDuration: string;
      onHoverBackgroundColorChangeDuration: string;
      tag: ColorMode["education"]["item"]["tag"];
    };
    containerBackgroundColor: string;
  };
  //// ALL PORTFOLIO STYLES
  portfolio: {
    container: ColorMode["portfolio"]["container"];
    sectionHeader: ColorMode["portfolio"]["sectionHeader"];
    item: {
      outline: {
        color: string;
        width: string;
      };
      color: string;
      backgroundColor: string;
      urlLinkTextColor: string;
      onHoverURLLinkTextColor: string;
    };
  };
}

export { type ThemeMode };
