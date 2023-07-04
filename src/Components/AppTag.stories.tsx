import AppTag from "./AppTag";

export default {
  component: AppTag,
  title: "AppTag",
  tags: ["autodocs"],
};

// Light Mode Colors
const lightColors = {
  // background: "#FFFFFF",
  // text: "#333333",
  // primary: "#007BFF",
  // secondary: "#6C757D",
  // accent: "#FFAD00",
  background: "#F8F3E6",
  text: "#4A4A4A",
  primary: "#FFAD00",
  secondary: "#B4654A",
  accent: "#FF6B35",
};

// Dark Mode Colors
const darkColors = {
  background: "#333333",
  text: "#FFFFFF",
  primary: "#61DAFB",
  secondary: "#9B9B9B",
  accent: "#FFAD00",
};

export const Default = {
  args: {
    // same interface as the props of the Component
    theme: {
      // backgroundColor: "#FFAD00",
      // textColor: "#333",
      // onHoverBackgroundColor: "#FECB55",
      // onHoverTextColor: "#333",
      backgroundColor: lightColors.background,
      textColor: lightColors.text,
      onHoverBackgroundColor: lightColors.secondary,
      onHoverTextColor: lightColors.accent,
    },
    children: "Machine Learning",
  },
};

export const DarkMode = {
  args: {
    ...Default.args,
    theme: {
      ...Default.args.theme,
      backgroundColor: "#333",
      textColor: "#FFF",
      onHoverBackgroundColor: "#555",
      onHoverTextColor: "#FFF",
    },
  },
};
