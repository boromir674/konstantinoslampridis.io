import React, { useState, useCallback, useEffect } from "react";
import type { HeadFC } from "gatsby";
import { graphql, useStaticQuery } from "gatsby"
// import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { ThemeProvider } from "@emotion/react";

import useIsSSR from "../Hooks/useIsSSR";
import { ToggleSlider } from "../Components/MyToggleSwitch1";
import Profile from "../Components/Profile";
import Nav from "../Components/FloatingNavigationStyled";
import "../css/indexStyles.css";
import Header from "../Components/HeaderNavigationBar";

interface HeaderStyles {
  primaryColor: string;
  secondaryColor: string;
}
interface Theme {
  backgroundColor: string;
  foregroundColor: string;
  buttonColor: string;
  buttonHoverColor: string;
  headerStyles: HeaderStyles;
}

const lightTheme: Theme = {
  backgroundColor: '#ffffff',
  foregroundColor: '#000000',
  buttonColor: '#007bff',
  buttonHoverColor: '#0056b3',
  headerStyles: {
    primaryColor: '#ffffff',
    secondaryColor: '#0056b3',
  }
};

const darkTheme: Theme = {
  backgroundColor: '#333333',
  foregroundColor: '#ffffff',
  buttonColor: '#007bff',
  buttonHoverColor: '#0096ff',
  headerStyles: {
    primaryColor: '#333333',
    secondaryColor: '#0096ff',
  }
};

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
  innerWidth: number | null;
  innerHeight: number | null;
};
type getWindowSizeFunction = () => WindowSize;

const IndexPage = () => {
  // Define Build Time Data
  const buildTimeData = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
        }
        internal {
          type
        }
      }
      sitePlugin {
        name
      }
    }
  `)

  const SSROn = useIsSSR();
  const [theme, setTheme] = useState<ThemeType>(appThemeSets.default.light);
  const [theme1, setTheme1] = useState<Theme>(lightTheme);
  const [windowSize, setWindowSize] = useState<WindowSize>(() =>
    SSROn
      ? {
          innerWidth: null,
          innerHeight: null,
        }
      : {
          innerWidth: window.innerWidth,
          innerHeight: window.innerHeight,
        }
  );

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
        <div className="computerContainer">
          <Header
            theme={theme1.headerStyles}
            // activeNavButtonIndex={0}
            navLinks={[
              {
                key: "0",
                to: "#initial-view",
                label: "Home",
              },
              {
                key: "introduction",
                to: "#introduction",
                label: "Introduction",
              },
            ]}
            />
          <div id="initial-view" className="Header scrolled">
            <ToggleSlider
              active={booleanMap[positionMap[matchTogglePosition()]]}
              onToggle={(active: boolean) => {
                setTheme(
                  active
                    ? appThemeSets.default.dark
                    : appThemeSets.default.light
                );
                setTheme1(
                  active
                    ? darkTheme
                    : lightTheme
                );
              }}
            ></ToggleSlider>
            {buildTimeData.site.siteMetadata.title}
          </div>
          {(windowSize.innerWidth as number) > 500 && (
            <div className="Profile">
              <Profile />
            </div>
          )}
          <div className="Main-Pane">
            <div id="introduction" className="Introduction">
              <h2>Width: {windowSize.innerWidth}</h2>
              <h2>Height: {windowSize.innerHeight}</h2>
              <SomeText>some text</SomeText>
              <Button data-testid="button-id">This my button component.</Button>
              <p>{"Hi, I am Konstantinos Lampridis :)"}</p>
            </div>
            <div>
              <h3>Open Source Portfolio</h3>
            </div>
            <div className="Career">
              <h3>Professional Career</h3>
            </div>
          </div>
          {(windowSize.innerWidth as number) <= 500 && (
            <div className="Profile">
              <Profile />
              {/* <Nav navItems={buildTimeData.sections} theme={theme1} /> */}
              <Nav navItems={['sec 1', 'sec 2', 'sec 3']} theme={theme1} />
            </div>
          )}
          {/* Footer is always displayed */}
          <div className="Footer">
            <p
              className="tempp"
              data-testid="dynamic-el"
              css={{
                backgroundColor: "#228be6",
                color: "yellow",
              }}
            >
              Footer Content
            </p>
          </div>
        </div>
      </main>
    </ThemeProvider>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
