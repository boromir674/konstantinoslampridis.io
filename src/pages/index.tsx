import React, { useState, useCallback, useEffect } from "react";
import type { HeadFC } from "gatsby";
// import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { ThemeProvider } from "@emotion/react";

import { ToggleSlider } from "../Components/MyToggleSwitch1";

// import "../css/indexPageStack.css";
// import "../css/indexPage.css";
import "../css/indexStyles.css";

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
  font-size: 40px;
`;

interface PositionMap {
  [keyName: string]: string;
}
const positionMap: PositionMap = {
  left: "light",
  right: "dark",
};

interface BooleanMap {
  [keyName: string]: boolean;
}
const booleanMap: BooleanMap = {
  light: false,
  dark: true,
};

type WindowSize = {
  innerWidth: number;
  innerHeight: number;
};
type getWindowSizeFunction = () => WindowSize;

const getReactNode = () => {
  return (
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
  );
};

// TODO change boundaries for conditional rendering to 320 width

const IndexPage = () => {
  const [theme, setTheme] = useState<ThemeType>(appThemeSets.default.light);
  const [windowSize, setWindowSize] = useState<WindowSize>(() => ({
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
  }));

  // const [appStyles] = useAppStyles();
  const matchTogglePosition = useCallback(
    () => (theme === appThemeSets.default.light ? "left" : "right"),
    [theme]
  );

  const getWindowSize: getWindowSizeFunction = useCallback(() => {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }, [windowSize]);

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <main style={pageStyles}>
        <ToggleSlider
          active={booleanMap[positionMap[matchTogglePosition()]]}
          onToggle={(active: boolean) => {
            setTheme(
              active ? appThemeSets.default.dark : appThemeSets.default.light
            );
          }}
        ></ToggleSlider>
        <div className="computerContainer">
          <div className="Header"></div>
          {windowSize.innerWidth > 500 && (
            <div className="Profile">
              <h2>Profile</h2>
            </div>
          )}
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
          {windowSize.innerWidth <= 500 && (
            <div className="Profile">
              <h2>Profile</h2>
            </div>
          )}
          <div className="Footer">Footer</div>
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
        <h2>Width: {windowSize.innerWidth}</h2>

        <h2>Height: {windowSize.innerHeight}</h2>

      </main>
    </ThemeProvider>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
