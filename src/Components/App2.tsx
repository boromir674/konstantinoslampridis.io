import { graphql, useStaticQuery } from "gatsby";
import type { FC } from "react";
import BigScreenViewInteractive from "./BigScreenViewInteractive";
import { lightTheme, darkTheme } from "../AppStyles";

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
    userDefinedWebsiteData: { personal, education, professional },
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
      }
    }
  `);

  // create a name2Url mapping as an object, given the links array using Object.create
  // const name2Url = Object.create(
  //   {},
  //   {
  //     ...personal.links.map(
  //       ({ name, url }: { name: string; url: string }) => ({
  //         [name]: url,
  //       })
  //     ),
  //   }
  // );
  // ALT
  // create a name2Url mapping
  const name2Url = personal.links.reduce(
    (acc: any, { name, id, url }: any) => ({ ...acc, [id]: url }),
    {}
  );

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
      ]}
      data={{
        verticalMainPane: {
          introduction: {
            name: personal.name,
          },
          professional: professional.experience_items,
          // portfolio: data.portfolio;
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
            navigationBar: lightTheme.navigationBar,
            backgroundColor: lightTheme.topHeaderPane.backgroundColor,
          },
          verticalSidePane: {
            personalInfo: {
              containerBackgroundColor:
                lightTheme.personal.containerBackgroundColor,
              textColor: lightTheme.personal.textColor,
              linkColor: lightTheme.personal.urlTextColor,
            },
            education: {
              containerBackgroundColor:
                lightTheme.education.containerBackgroundColor,
              title: lightTheme.education.title,
              item: lightTheme.education.item,
            },
          },
          verticalMainPane: {
            ...lightTheme,
            containerBackgroundColor: lightTheme.backgroundColor,
          },
          bottomFooterPane: lightTheme.footerStyles,
        },
        dark: {
          containerBackgroundColor: darkTheme.backgroundColor,
          topHeaderPane: {
            navigationBar: darkTheme.navigationBar,
            backgroundColor: darkTheme.topHeaderPane.backgroundColor,
          },
          verticalSidePane: {
            personalInfo: {
              containerBackgroundColor:
                darkTheme.personal.containerBackgroundColor,
              textColor: darkTheme.personal.textColor,
              linkColor: darkTheme.personal.urlTextColor,
            },
            education: {
              containerBackgroundColor:
                darkTheme.education.containerBackgroundColor,
              title: darkTheme.education.title,
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
