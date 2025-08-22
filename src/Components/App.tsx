import { graphql, useStaticQuery } from "gatsby";
import React, { FC, useMemo, useCallback } from "react";

import BigScreenViewInteractive, { BigScreenViewInteractiveProps } from "./BigScreenViewInteractive";
import { lightTheme, darkTheme } from '../theme';
import { UserDefinedTextData } from '../types';
import { useThemeAdapterCallback } from '../Hooks/useThemeAdapter';
import { useDataAdapterCallback } from '../Hooks/useDataAdapter';

// Import Semantic Tokens from 'Design System' for branding and theming
// import '../design-system/reset.css';  // CSS Reset - must be first
import '../design-system/tokens.css';  // raw tokens needed for Semantic ones
import '../design-system/typography.css';
import '../design-system/semantic-tokens.css';

// Leverage CSS modules to do CSS reset
// import '../global.css'; // Import the global CSS reset
type RawColorTheme = typeof lightTheme | typeof darkTheme;
type AppColorTheme = BigScreenViewInteractiveProps["colorSet"]["light"] | BigScreenViewInteractiveProps["colorSet"]["dark"];


//// APP COMPONENT; Top-Level without Props ////
const App: FC = () => {
  // READ From GraphQL DATA LAYER
  const {
    // userDefinedWebsiteData: { personal, education, professional, portfolio },
    userDefinedWebsiteData,
  } = useStaticQuery<{
    userDefinedWebsiteData: UserDefinedTextData
  }>(graphql`
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

  // Memoized Data and Themes
  const appData = useMemo(() => adaptData(userDefinedWebsiteData), [adaptData, userDefinedWebsiteData]);
  const lightAppTheme: AppColorTheme = useMemo(() => adaptTheme(lightTheme), [adaptTheme, lightTheme]);
  const darkAppTheme: AppColorTheme = useMemo(() => adaptTheme(darkTheme), [adaptTheme, darkTheme]);

  return (
    // <main>
    <BigScreenViewInteractive
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
        light: lightAppTheme,  // LIGHT THEME - MODE
        dark: darkAppTheme,    // DARK  THEME - MODE
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
