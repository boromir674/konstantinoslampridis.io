import AppHorNavItem, { NavItemProps } from "./AppHorNavItem";
import lightMode from "../../LightMode";
import darkMode from "../../DarkMode";
import { ComputedTheme, mergeStylings, commonStyling } from "../../AppStyles";

const lightTheme: ComputedTheme = mergeStylings(lightMode, commonStyling);
const darkTheme: ComputedTheme = mergeStylings(darkMode, commonStyling);;


export default {
  component: AppHorNavItem,
  title: "AppHorNavItem",
  tags: ["autodocs"],
};


const lightProps: NavItemProps = {
  // same interface as the props of the Component
  // Theme
  theme: {
    colors: lightTheme.navigationBar,
    padding: lightTheme.headerNavigationBar.padding,
  },
  // Data
  active: false,  // on initialization
  // Children React Elements to render
  children: "Not in current view",
};


// Render with LIGHT Theme
export const LightNavigationItem = {
  args: lightProps,
};

// Render with DARK Theme
export const DarkNavigationItem = {
  args: {
    // same interface as the props of the Component
    ...LightNavigationItem.args,
    theme: {
      colorSet: darkTheme.navigationBar,
    },
  },
};
