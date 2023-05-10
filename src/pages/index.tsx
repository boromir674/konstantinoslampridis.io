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
import Header1Nav from "../Components/HeaderNavigationNew1";

import BuildTimePersonalInfo from "../Components/BuildTimePersonalInfo";


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
  navigationBar: {
    backgroundColor: string;
    textColor: string;
    hoverBackgroundColor: string;
    hoverTextColor: string;
    activatedBackgroundColor: string;
    activatedTextColor: string;
  };
}

const lightTheme: Theme = {
  backgroundColor: '#ffffff',
  foregroundColor: '#000000',
  buttonColor: '#007bff',
  buttonHoverColor: '#0056b3',
  headerStyles: {
    primaryColor: '#ffffff',
    secondaryColor: '#0056b3',
  },
  navigationBar: {
    backgroundColor: '#ffffff',
    textColor: '#000000',
    hoverBackgroundColor: '#fff',
    hoverTextColor: '#000000',
    activatedBackgroundColor: '#fa345f',
    activatedTextColor: '#000000',
  },
};

const darkTheme: Theme = {
  backgroundColor: '#333333',
  foregroundColor: '#ffffff',
  buttonColor: '#007bff',
  buttonHoverColor: '#0096ff',
  headerStyles: {
    primaryColor: '#333333',
    secondaryColor: '#0096ff',
  },
  navigationBar: {
    backgroundColor: '#333333',
    textColor: '#ffffff',
    hoverBackgroundColor: '#fff',
    hoverTextColor: '#ffffff',
    activatedBackgroundColor: '#ff345f',
    activatedTextColor: '#ffffff',
  },
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
  // Build-Time Data Fetching

  // Fetch data using the graphql automatically supplied by gatsby (see gatsby-config.ts)
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
  // // Fetch data using the sourceNodes API and the custom createNode action
  // const data = useStaticQuery(graphql`
  //   query {
  //     exampleYaml {
  //       personal {
  //         name
  //         email
  //         phone
  //         location
  //         links {
  //           name
  //           url
  //         }
  //         description
  //       }
  //     }
  //   }
  // `);

  // const { personal } = data.exampleYaml;

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

  // Nav Bar 1
  const navItems = [
    {
      label: "Intro",
      to_element_id: "#introduction",
    },
    {
      label: "Open Source Portfolio",
      to_element_id: "#open-source-portfolio",
    },
    {
      label: "Professional Career",
      to_element_id: "#professional-career",
    },
  ];

  const activeNavItem = "Intro";

  return (
    <ThemeProvider theme={theme}>
      <main style={pageStyles}>
        <div className="computerContainer">
          <div>
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
              <Header1Nav
                items={navItems}
                activeItem={activeNavItem}
                colorSet={theme1.navigationBar}
              />
              {buildTimeData.site.siteMetadata.title}
            </div>
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
              <BuildTimePersonalInfo/>
              <SomeText>some text</SomeText>
              <Button data-testid="button-id">This my button component.</Button>
              <p>{"Hi, I am Konstantinos Lampridis :)"}</p>
            </div>
            <div>
              <h3 id="open-source-portfolio">Open Source Portfolio</h3>
            </div>
            <div className="Career">
              <h3 id="professional-career">Professional Career</h3>
            </div>
          </div>
          {(windowSize.innerWidth as number) <= 500 && (
            <div className="Profile">
              <Profile />
              <Nav items={navItems} colorSet={theme1.navigationBar} />
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
