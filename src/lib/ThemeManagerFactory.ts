import ThemeManager from "./ThemeManager";
import {
  lightColorModeStyles,
  darkColorModeStyles,
  commonStyling,
} from "../UserDesign";

export default class ThemeManagerFactory {
  static createFromUserDesign = () => {
    return new ThemeManager(
      lightColorModeStyles,
      darkColorModeStyles,
      commonStyling
    );
  };
}
