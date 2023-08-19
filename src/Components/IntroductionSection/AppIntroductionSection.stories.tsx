import AppIntroductionSection from "./AppIntroductionSection";
import lightTheme from "../../LightMode";
import darkTheme from "../../DarkMode";

export default {
  component: AppIntroductionSection,
  title: "AppIntroductionSection",
  tags: ["autodocs"],
};

export const Light = {
    args: {
        theme: lightTheme.introduction,
        data: {
            name: "John Doe",
        },
        id: "introduction-section",
    },
};

export const Dark = {
    args: {
        ...Light.args,
        theme: darkTheme.introduction,
    },
};
