import { graphql, useStaticQuery } from "gatsby";

// since we use gatsby as static site generator
// we set the <title> html element text to the user name at build time assuming
// it is extracted in the GraphQL layer

type BuildTimeSourcePluginDataGraphQLData = {
  userDefinedWebsiteData: {
    personal: {
      name: string;
    };
  };
};

const BuildTimeTitle: React.FC = () => {
  const {
    userDefinedWebsiteData: {
      personal: { name },
    },
  } = useStaticQuery<BuildTimeSourcePluginDataGraphQLData>(graphql`
    query {
      userDefinedWebsiteData {
        personal {
          name
        }
      }
    }
  `);

  return <title>{name}</title>;
};

export default BuildTimeTitle;
