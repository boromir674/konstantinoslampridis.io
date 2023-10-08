import AppHorNavItem, { NavItemProps } from "./AppHorNavItem";

import { commonStyling } from "../../AppStyles";
import lightMode from "../../LightMode";
import darkMode from "../../DarkMode";
import { ThemeManager } from "../../lib";

const tm = new ThemeManager(lightMode, darkMode, commonStyling);
const {
  light: {
    topHeaderPane: {
      headerNavigationBar: horNavItemLightStyles,
    }
  },
  dark: {
    topHeaderPane: {
      headerNavigationBar: horNavItemDarkStyles,
    },
  }
} = tm.toAppColorSet();


export default {
  component: AppHorNavItem,
  title: "AppHorNavItem",
  tags: ["autodocs"],
};


const lightProps: NavItemProps = {
  // same interface as the props of the Component
  // Theme
  theme: horNavItemLightStyles,
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
    theme: horNavItemDarkStyles,
  },
};
