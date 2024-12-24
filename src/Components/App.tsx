import { graphql, useStaticQuery } from "gatsby";
import React, { FC, useMemo, useCallback } from "react";

import BigScreenViewInteractive, { BigScreenViewInteractiveProps } from "./BigScreenViewInteractive";
import { lightTheme, darkTheme } from '../theme';
import { UserDefinedTextData } from '../types';
import { useThemeAdapterCallback } from '../Hooks/useThemeAdapter';
import { useDataAdapterCallback } from '../Hooks/useDataAdapter';

// Leverage CSS modules to do CSS reset
// import '../global.css'; // Import the global CSS reset
type RawColorTheme = typeof lightTheme | typeof darkTheme;
type AppColorTheme = BigScreenViewInteractiveProps["colorSet"]["light"] | BigScreenViewInteractiveProps["colorSet"]["dark"];


interface EducationItemUserTextData {
  name: string;
  location: string;
  degree: string;
  date: string;
  thesis_title: string;
  topics: string[];
}

interface BuildTimeData {
  userDefinedWebsiteData: UserDefinedTextData
}


//// APP COMPONENT; Top-Level without Props ////
const App: FC = () => {
  // READ From GraphQL DATA LAYER
  const {
    // userDefinedWebsiteData: { personal, education, professional, portfolio },
    userDefinedWebsiteData,
  } = useStaticQuery<BuildTimeData>(graphql`
    query {
      userDefinedWebsiteData {
        personal {
          name
          email
          phone
          location
          links {
            id
            name
            url
          }
          description
        }
        education {
          name
          location
          degree
          thesis_title
          date
          topics
        }
        professional {
          experience_items {
            title
            company
            location
            duration
            description
            activities
            technology_tags
          }
        }
        portfolio {
          title
          development_period
          status
          source_code_repo
          resource_links {
            type
            url
          }
          release {
            type
            name
            artifact_version
            url
            command
          }
          description
          tags
        }
      }
    }
  `);

  const [adaptTheme] = useThemeAdapterCallback();
  const [adaptData] = useDataAdapterCallback();

  // compute maximum number of Releases contained in a single portfolio item
  const maxNumberOfReleasesPerPortfolioItems = useMemo(() => userDefinedWebsiteData.portfolio.reduce(
    (acc, { release = [] }) => Math.max(acc, release.length),
    0
  ), [userDefinedWebsiteData]);
  // compute maximum number of links contained in a single portfolio item
  const maxNumberOfLinksPerPortfolioItems = useMemo(() => userDefinedWebsiteData.portfolio.reduce(
    (acc, { resource_links = [] }) => Math.max(acc, resource_links.length),
    0
  ), [userDefinedWebsiteData]);

  const computeTheme = useCallback((theme: RawColorTheme) => {
    const appTheme = adaptTheme(theme);
    // Adapt 'icon' to 'icons' by crating an rray of the same item multiple times
    const adaptedAppTheme: AppColorTheme = {
      ...appTheme,
      verticalMainPane: {
        ...appTheme.verticalMainPane,
        portfolio: {
          ...appTheme.verticalMainPane.portfolio,
          item: {
            ...appTheme.verticalMainPane.portfolio.item,
            theme: {
              ...appTheme.verticalMainPane.portfolio.item.theme,
              links: {
                ...appTheme.verticalMainPane.portfolio.item.theme.links,
                item: {
                  ...appTheme.verticalMainPane.portfolio.item.theme.links.item,
                  icons: Array.from({ length: maxNumberOfLinksPerPortfolioItems }, () => appTheme.verticalMainPane.portfolio.item.theme.links.item.icon
                  ),
                },
              },
              releases: {
                ...appTheme.verticalMainPane.portfolio.item.theme.releases,
                releaseButtonTheme: {
                  ...appTheme.verticalMainPane.portfolio.item.theme.releases.releaseButtonTheme,
                  icons: Array.from({ length: maxNumberOfReleasesPerPortfolioItems }, () => appTheme.verticalMainPane.portfolio.item.theme.releases.releaseButtonTheme.icon
                  ),
                },
              },
            },
          },
        },
      },
    }
    return adaptedAppTheme;
  }, [adaptTheme]);

  // Memoized Data and Themes
  const appData = useMemo(() => adaptData(userDefinedWebsiteData), [adaptData, userDefinedWebsiteData]);
  const lightAppTheme = useMemo(() => computeTheme(lightTheme), [computeTheme, lightTheme]);
  const darkAppTheme = useMemo(() => computeTheme(darkTheme), [computeTheme, darkTheme]);

  return (
    // <main>
    <BigScreenViewInteractive
      // style={{}}
      navigationSections={[
        {
          htmlID: "introduction-section",
          barLabel: "Introduction",
        },
        {
          htmlID: "professional-section",
          barLabel: "Professional",
        },
        {
          htmlID: "open-source-portfolio-section",
          barLabel: "Open Source Portfolio",
        },
      ]}
      data={appData}
      colorSet={{
        light: lightAppTheme,  // LIGHT / DARK THEME - MODE
        dark: darkAppTheme,    // DARK THEME - MODE
      }}
      html={{
        verticalMainPaneID: "vertical-main-pane",
        bottomFooterPaneID: "bottom-footer-pane",
      }}
    />
    // </main>
  );
};

export default App;
