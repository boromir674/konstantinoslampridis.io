import { graphql, useStaticQuery } from "gatsby";
import type { FC } from "react";
import BigScreenViewInteractive from "./BigScreenViewInteractive";
import { lightColorModeStyles, darkColorModeStyles, commonStyling } from "../UserDesign";
import { ThemeManager } from "../lib";

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

  const tm = new ThemeManager(lightColorModeStyles, darkColorModeStyles, commonStyling);

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
          education: education.map((item: EducationItemUserTextData) => ({
            degree_title: item.degree,
            university_name: item.name,
            location: item.location,
            duration: item.date,
            thesis_title: item.thesis_title,
            topics: item.topics,
          })),
        },
      }}
      // Current BigScreenView constructor interface requires an object of 2 keys: lightTheme and darkTheme
      // each object value autonomously "holds" all color and common styles
      colorSet={tm.toAppColorSet()}
    />
    // </main>
  );
};

export default App;
