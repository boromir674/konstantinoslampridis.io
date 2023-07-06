import type { FC } from "react";
import { graphql, useStaticQuery } from "gatsby";
import BigScreenView from "./BigScreenView";

const BuildTimeBigScreenView: FC = () => {
  const {
    userDefinedWebsiteData: {
      personal: { name },
    },
  } = useStaticQuery(graphql`
    query {
      userDefinedWebsiteData {
        personal {
          name
          email
          phone
          location
          links {
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

  return <BigScreenView />;
};

export default BuildTimeBigScreenView;
