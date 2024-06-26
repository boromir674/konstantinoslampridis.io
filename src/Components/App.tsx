import { graphql, useStaticQuery } from "gatsby";
import React, { FC } from "react";

import BigScreenViewInteractive from "./BigScreenViewInteractive";
import { mergeStylings, commonStyling, ComputedTheme } from "../AppStyles";
import lightMode from '../LightMode';
import darkMode from '../DarkMode';
import { UserDefinedTextData } from '../types';

// Leverage CSS modules to do CSS reset
// import '../global.css'; // Import the global CSS reset


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
lightMode.portfolio.item.resourceLinks
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

  const name2Url = personal.links.reduce(
    (acc: any, { name, id, url }: any) => ({ ...acc, [id]: url }),
    {}
  );

  const lightTheme: ComputedTheme = mergeStylings(lightMode, commonStyling);
  const darkTheme: ComputedTheme = mergeStylings(darkMode, commonStyling);

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
          light: {
            containerBackgroundColor: lightTheme.backgroundColor,
            topHeaderPane: {
              themeSwitch: lightTheme.themeSwitch,
              navigationBar: lightTheme.navigationBar,
              backgroundColor: lightTheme.topHeaderPane.backgroundColor,
            },
            verticalSidePane: {
              personalInfo: {
                // pass Theme Personal Color Design
                ...lightTheme.personal,
                // adjust interface
                linkColor: lightTheme.personal.urlTextColor,
              },
              education: {
                item: lightTheme.education.item,
              },
            },
            verticalMainPane: {
              introduction: lightTheme.introduction,
              professional: lightTheme.professional,
              portfolio: {
                ...lightTheme.portfolio,
                item: {
                  ...lightTheme.portfolio.item,
                  theme: {
                    links: {
                      ...lightTheme.portfolio.item.resourceLinks,
                      item: {
                        ...lightTheme.portfolio.item.resourceLinks.item,
                        icons: Array.from({ length: maxNumberOfLinksPerPortfolioItems }, () => ({
                          svgStyles: {
                            width: "12px",
                            height: "12px",
                            fill: lightTheme.portfolio.item.resourceLinks.item.color,
                          },
                        })),
                      },
                    },
                    releases: {
                      ...lightTheme.portfolio.item.releases,
                      headerFontFamily: lightTheme.portfolio.item.releases.fontFamily,
                      headerColor: lightTheme.portfolio.item.releases.color,
                      releaseButtonTheme: {
                        ...lightTheme.portfolio.item.releases.item,
                        icons: Array.from({ length: maxNumberOfReleasesPerPortfolioItems }, () => ({
                          svgStyles: {
                            width: "12px",
                            height: "12px",
                            fill: lightTheme.portfolio.item.releases.item.color,
                          },
                        })),
                      },
                    },
                  },
                },
              },
              // ...lightTheme,
              // containerBackgroundColor: lightTheme.backgroundColor,
            },
            bottomFooterPane: {
              ...lightTheme.footerStyles,
              // svgStyles: {
              //   width: "15px",
              //   height: "15px",
              // }
            },
          },
          // DARK THEME - MODE
          dark: {
            containerBackgroundColor: darkTheme.backgroundColor,
            topHeaderPane: {
              themeSwitch: darkTheme.themeSwitch,
              navigationBar: darkTheme.navigationBar,
              backgroundColor: darkTheme.topHeaderPane.backgroundColor,
            },
            verticalSidePane: {
              personalInfo: {
                // pass Theme Personal Color Design
                ...darkTheme.personal,
                // adjust interface
                linkColor: darkTheme.personal.urlTextColor,
              },
              education: {
                item: darkTheme.education.item,
              },
            },
            verticalMainPane: {
              ...darkTheme,
              portfolio: {
                ...darkTheme.portfolio,
                item: {
                  ...darkTheme.portfolio.item,
                  theme: {
                    links: {
                      ...darkTheme.portfolio.item.resourceLinks,
                      item: {
                        ...darkTheme.portfolio.item.resourceLinks.item,
                        icons: Array.from({ length: maxNumberOfLinksPerPortfolioItems }, () => ({
                          svgStyles: {
                            width: "12px",
                            height: "12px",
                            fill: darkTheme.portfolio.item.resourceLinks.item.color,
                          },
                        })),
                      },
                    },
                    releases: {
                      ...darkTheme.portfolio.item.releases,
                      headerFontFamily: darkTheme.portfolio.item.releases.fontFamily,
                      headerColor: darkTheme.portfolio.item.releases.color,
                      releaseButtonTheme: {
                        ...darkTheme.portfolio.item.releases.item,
                        icons: Array.from({ length: maxNumberOfReleasesPerPortfolioItems }, () => ({
                          svgStyles: {
                            width: "12px",
                            height: "12px",
                            fill: darkTheme.portfolio.item.releases.item.color,
                          },
                        })),
                      },
                    },
                  },
                },
              },
            },
            bottomFooterPane: darkTheme.footerStyles,
          },
        }}
      />
    // </main>
  );
};

export default App;
