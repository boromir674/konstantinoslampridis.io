import { graphql, useStaticQuery } from "gatsby";
import type { FC } from "react";
import BigScreenViewInteractive from "./BigScreenViewInteractive";
import { mergeStylings, commonStyling, ComputedTheme } from "../AppStyles";
import lightMode from '../LightMode';
import darkMode from '../DarkMode';

interface EducationItemUserTextData {
  name: string;
  location: string;
  degree: string;
  date: string;
  thesis_title: string;
  topics: string[];
}

const App: FC = () => {
  const {
    userDefinedWebsiteData: { personal, education, professional, portfolio },
  } = useStaticQuery(graphql`
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
          release {
            type
            name
            artifact_version
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
      data={{
        verticalMainPane: {
          introduction: {
            name: personal.name,
          },
          professional: professional.experience_items,
          portfolio,
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
            portfolio: lightTheme.portfolio,
            // ...lightTheme,
            containerBackgroundColor: lightTheme.backgroundColor,
          },
          bottomFooterPane: lightTheme.footerStyles,
        },
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
            containerBackgroundColor: darkTheme.backgroundColor,
          },
          bottomFooterPane: darkTheme.footerStyles,
        },
      }}
    />
    // </main>
  );
};

export default App;
