import AppHorNavItem from "./AppHorNavItem";
import { lightTheme, darkTheme } from "../../AppStyles";

export default {
  component: AppHorNavItem,
  title: "AppHorNavItem",
  tags: ["autodocs"],
};

// Deactivated Light
export const DeactivatedLight = {
  args: {
    // same interface as the props of the Component
    colorSet: lightTheme.navigationBar,
    active: false,
    children: "Not in current view",
  },
};

// Deactivated Dark
export const DeactivatedDark = {
  args: {
    // same interface as the props of the Component
    ...DeactivatedLight.args,
    colorSet: darkTheme.navigationBar,
  },
};

// Activated Light
export const ActivatedLight = {
  args: {
    // same interface as the props of the Component
    colorSet: lightTheme.navigationBar,
    active: true,
    children: "In current view",
  },
};

// Activated dark
export const ActivatedDark = {
  args: {
    // same interface as the props of the Component
    ...ActivatedLight.args,
    colorSet: darkTheme.navigationBar,
  },
};
