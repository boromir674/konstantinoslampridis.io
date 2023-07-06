import React, { useState, useCallback, useEffect } from "react";
import { graphql, useStaticQuery } from "gatsby";

import styled from "@emotion/styled";
import { ThemeProvider } from "@emotion/react";

import "../css/indexStyles.css";
import { ComputedTheme, lightTheme, darkTheme } from "../AppStyles";
import useIsSSR from "../Hooks/useIsSSR";
import useWindowSizeTrackingState from "../Hooks/useWindowSizeTrackingState";

import { ToggleSlider } from "./MyToggleSwitch1";
import { HorizontalNavBar, VerticalFlowtingNav } from "./Navigation";

import Profile from "./Profile";
import BuildTimePersonalInfo from "./BuildTimePersonalInfo";
import AppLeftPane from "./AppLeftpane";
import Portfolio from "./Portfolio";
import ProfessionalSection from "./BuildTimeProfessional";
import BuildTimeEducationSection from "./BuildTimeEducationSection";

interface HeaderStyles {
  primaryColor: string;
  secondaryColor: string;
}

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

// LECACY. TODO: refactor and remove
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
  `);

  const SSROn = useIsSSR();
  const [theme, setTheme] = useState<ThemeType>(appThemeSets.default.light);
  const [theme1, setTheme1] = useState<ComputedTheme>(lightTheme);

  const [windowSize] = useWindowSizeTrackingState(SSROn);

  // const [appStyles] = useAppStyles();
  const matchTogglePosition = useCallback(
    () => (theme === appThemeSets.default.light ? "left" : "right"),
    [theme]
  );
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
            <div id="ela" className="Header scrolled">
              <ToggleSlider
                active={booleanMap[positionMap[matchTogglePosition()]]}
                onToggle={(active: boolean) => {
                  setTheme(
                    active
                      ? appThemeSets.default.dark
                      : appThemeSets.default.light
                  );
                  setTheme1(active ? darkTheme : lightTheme);
                }}
              ></ToggleSlider>
              <HorizontalNavBar
                items={navItems}
                activeItem={activeNavItem}
                colorSet={theme1.navigationBar}
              />
              {buildTimeData.site.siteMetadata.title}
            </div>
          </div>

          {(windowSize.innerWidth as number) > 500 && (
            <AppLeftPane
              theme={{
                ...theme1.personal,
                linkColor: theme1.personal.urlTextColor,
              }}
            />
          )}
          <div className="Main-Pane">
            <div id="introduction" className="Introduction">
              {/* <h2>Width: {windowSize.innerWidth}</h2>
              <h2>Height: {windowSize.innerHeight}</h2> */}
              {/* <SomeText>some text</SomeText> */}
              {/* <Button data-testid="button-id">This my button component.</Button> */}
              <p>{"Hi, I am Konstantinos Lampridis :)"}</p>
            </div>
            <div>
              <h3 id="open-source-portfolio">Open Source Portfolio</h3>
              <Portfolio></Portfolio>
            </div>
            <div className="Career">
              <h3 id="professional-career">Professional Career</h3>
              <ProfessionalSection
                theme={theme1.professional}
              ></ProfessionalSection>
            </div>
          </div>
          {(windowSize.innerWidth as number) <= 500 && (
            <div className="Profile">
              <Profile />
              <BuildTimePersonalInfo
                theme={{
                  ...theme1.personal,
                  linkColor: theme1.personal.urlTextColor,
                }}
              />
              <React.StrictMode>
                <BuildTimeEducationSection theme={theme1.education} />
              </React.StrictMode>
              <VerticalFlowtingNav
                items={navItems}
                colorSet={theme1.navigationBar}
              />
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
          {/* Footer is always displayed */}
        </div>
      </main>
    </ThemeProvider>
  );
};

export default IndexPage;
