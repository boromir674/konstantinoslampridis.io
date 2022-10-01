import React, { useState, useCallback } from "react";
import type { HeadFC } from "gatsby";
// import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { ThemeProvider } from "@emotion/react";

import { ToggleSlider } from "../Components/MyToggleSwitch1";

import "../css/indexPage.css";

const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
  backgroundColor: "#e4889a",
};

const Button = styled.button({
  color: "red",
  fontSize: "30px",
  "@media (max-width: 800px)": {
    color: "blue",
    fontSize: "20px",
  },
});

// Todo implemente ThemeSets (light + dark)
const appThemeSets = {
  default: {
    light: {
      colors: {
        primary: "yellow",
      },
    },
    dark: {
      colors: {
        primary: "purple",
      },
    },
  },
};

interface ThemeType {
  colors: {
    primary: string;
  };
}
interface PropsType {
  theme?: ThemeType; // exists when there is a ThemeProvider parent component
}
const SomeText = styled.div`
  color: ${(props: PropsType) => (props.theme as ThemeType).colors.primary};
`;

const positionMap = {
  'left': 'light',
  'right': 'dark',
}

const booleanMap = {
  'light': false,
  'dark': true,
}

const IndexPage = () => {
  const [theme, setTheme] = useState<ThemeType>(appThemeSets.default.light);
  // const [appStyles] = useAppStyles();
  const matchTogglePosition = useCallback(() => theme === appThemeSets.default.light ? 'left' : 'right', [theme]);
  /* If toggle is left (aka inactive) return true, else false
   *
   */
  const isSwitchLeft = useCallback((isActive: boolean) => !isActive, []);

  return (
    <ThemeProvider theme={theme}>
      <main style={pageStyles}>
        <ToggleSlider
          active={true}
          onToggle={(active: boolean) => {
            // setTheme(active ? appThemeSets.default.light[positionMap[matchTogglePosition()]])
            setTheme(active ? appThemeSets.default.dark : appThemeSets.default.light)
            // positionMap[matchTogglePosition()]
            // isSwitchLeft(active)
            //   ? setTheme(appThemeSets.default.light)
            //   : setTheme(appThemeSets.default.dark);
          }}
        ></ToggleSlider>
        <div className="computerContainer">
          <div className="Header"></div>
          <div className="Side-Profile">
            <h2>Profile</h2>
          </div>
          <div className="Main-Pane">
            <div className="Introduction">
              <p>{"Hi, I am Konstantinos Lampridis :)"}</p>
            </div>
            <div>
              <h3>Open Source Portfolio</h3>
            </div>
            <div className="Career">
              <h3>Professional Career</h3>
            </div>
          </div>
          <div className="Footer"></div>
        </div>
        <SomeText>some text</SomeText>
        <Button data-testid="button-id">This my button component.</Button>
        <p
          className="tempp"
          data-testid="dynamic-el"
          css={{
            backgroundColor: "#228be6",
            color: "yellow",
          }}
        >
          Test text!
        </p>
      </main>
    </ThemeProvider>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
