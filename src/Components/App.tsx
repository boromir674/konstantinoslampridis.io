import { graphql, useStaticQuery } from "gatsby";
import React, { FC, useMemo, useCallback } from "react";

import BigScreenViewInteractive, { BigScreenViewInteractiveProps } from "./BigScreenViewInteractive";
import { lightTheme, darkTheme } from '../theme';
import { UserDefinedTextData } from '../types';
import { useThemeAdapterCallback } from '../Hooks/useThemeAdapter';

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
// lightMode.portfolio.item.resourceLinks
const App: FC = () => {
  const {
    userDefinedWebsiteData: { personal, education, professional, portfolio },
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
  const name2Url = personal.links.reduce(
    (acc: any, { name, id, url }: any) => ({ ...acc, [id]: url }),
    {}
  );

  // const lightTheme: ComputedTheme = mergeStylings(lightMode, commonStyling);
  // const darkTheme: ComputedTheme = mergeStylings(darkMode, commonStyling);

  // compute maximum number of Releases contained in a single portfolio item
  const maxNumberOfReleasesPerPortfolioItems = portfolio.reduce(
    (acc, { release = [] }) => Math.max(acc, release.length),
    0
  );
  // compute maximum number of links contained in a single portfolio item
  const maxNumberOfLinksPerPortfolioItems = portfolio.reduce(
    (acc, { resource_links = [] }) => Math.max(acc, resource_links.length),
    0
  );

  const computeTheme = useCallback((theme: RawColorTheme) => {
    const appTheme = adaptTheme(theme);
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

  const lightAppTheme = useMemo(() => computeTheme(lightTheme), [computeTheme, lightTheme]);
  const darkAppTheme = useMemo(() => computeTheme(darkTheme), [computeTheme, darkTheme]);
  // appTheme.verticalMainPane.portfolio.item.theme.links.item.icon,

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
      data={{
        verticalMainPane: {
          introduction: {
            name: personal.name,
          },
          professional: professional.experience_items,

          portfolio: portfolio.map((item: UserDefinedTextData['portfolio'][0]) => ({
            ...item,
            release: item.release.map((release) => ({
              ...release,
              urlText: release.url,
            })),
          })),
        },

        verticalSidePane: {
          personal: {
            name: personal.name,
            email: personal.email,
            github: name2Url["github"],
            gitlab: name2Url["gitlab"],
            linkedin: name2Url["linkedin"],
          },
          education: education.map(
            (item: EducationItemUserTextData, index: number) => ({
              degree_title: item.degree,
              university_name: item.name,
              location: item.location,
              duration: item.date,
              thesis_title: item.thesis_title,
              topics: item.topics,
            })
          ),
        },
      }}
      colorSet={{
        // LIGHT THEME - MODE
        light: lightAppTheme,
        // DARK THEME - MODE
        dark: darkAppTheme,
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
