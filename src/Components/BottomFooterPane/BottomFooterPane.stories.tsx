// Import React Component
import { BottomFooterPane } from "./BottomFooterPane";

// Apply CSS reset
import '../../global.css';

import lightMode from '../../LightMode'
import darkMode from "../../DarkMode";
import { ComputedTheme, mergeStylings, commonStyling } from "../../AppStyles";

const lightTheme: ComputedTheme = mergeStylings(lightMode, commonStyling);
const darkTheme: ComputedTheme = mergeStylings(darkMode, commonStyling);

export default {
  component: BottomFooterPane,
  title: "BottomFooterPane",
  tags: ["autodocs"],
};

export const Light = {
  args: {
    // same interface as the props of the Component
    theme: lightTheme.footerStyles,
  },
};

export const Dark = {
  args: {
    ...Light.args,
    theme: darkTheme.footerStyles,
  },
};


