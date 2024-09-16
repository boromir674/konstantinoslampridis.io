import AppHorNavItem, { type NavItemProps } from "./AppHorNavItem";

import lightMode from "../../LightMode";
import darkMode from "../../DarkMode";

import { ComputedTheme, mergeStylings, commonStyling } from "../../AppStyles";

const lightTheme: ComputedTheme = mergeStylings(lightMode, commonStyling);
const darkTheme: ComputedTheme = mergeStylings(darkMode, commonStyling);


export default {
  component: AppHorNavItem,
  title: "AppHorNavItem",
  tags: ["autodocs"],
};

interface ComponentVariantExport {
  args: NavItemProps;
}

const DeactivatedLight: ComponentVariantExport = {
  args: {
    theme: {
      colorSet: lightTheme.navigationBar,
      // colorSet: {
      //   textColor: "",
      //   backgroundColor: "",
      //   hoverBackgroundColor: "",
      //   hoverTextColor: "",
      //   activatedTextColor: "",
      //   activatedBackgroundColor: ""
      // },
      padding: {
        vertical: "8px",
        horizontal: "28px",
      },
    },
    active: false,
    children: "Not in current view",
  },
};
export { DeactivatedLight };

// Activated Light
const ActivatedLight: ComponentVariantExport = {
  args: {
    ...DeactivatedLight.args,
    active: true,
    children: "In current view",
  },
};
export { ActivatedLight };

// Deactivated Dark
const DeactivatedDark: ComponentVariantExport = {
  args: {
    ...DeactivatedLight.args,
    theme: {
      ...DeactivatedLight.args.theme,
      colorSet: darkTheme.navigationBar,
    },
  },
};
export { DeactivatedDark };

// Activated dark
const ActivatedDark: ComponentVariantExport = {
  args: {
    ...ActivatedLight.args,
    theme: DeactivatedDark.args.theme,
  },
};
export { ActivatedDark };
