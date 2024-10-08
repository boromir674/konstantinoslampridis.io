import React from "react";
import styled from "@emotion/styled";

// Open PDF in new TAB ICON
import AppExternalURLIcon from "./AppExternalURLIcon";

import PersonalInfoInterface from "../PersonalInfoInterface";

interface ContainerProps {
  theme: {
    containerBackgroundColor: string;
    textColor: string;
  };
}
interface URLProps {
  theme: {
    textColor: string;
  };
}

interface SocialLink {
  label: string;
  url: string;
}

interface CurricularDoc {
  label: string;
  url: string;
}

interface PersonalInfoProps {
  userData: PersonalInfoInterface;
  theme: {
    containerBackgroundColor: string;
    textColor: string;
    linkColor: string;
    externalURLSVGColor: string;
    infoItem: {
      key: {
        fontFamily: string;
        fontSize: string;
      };
      value: {
        fontFamily: string;
        fontSize: string;
      };
    };
  }
}

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-wrap: wrap;
  // background-color: #f6f8fa;
  // color: #333;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: ${(props) => props.theme.containerBackgroundColor};
  color: ${(props) => props.theme.textColor};
`;

const InfoItem = styled.div`
  flex: 1 1 50%;
  padding: 10px;
`;

interface InfoKeyProps {
  theme: {
    fontFamily: string;
    fontSize: string;
  };
}
const InfoKey = styled.span<InfoKeyProps>`
  font-weight: bold;
  // font-size: 18px;
  font-size: ${(props) => props.theme.fontSize};
  font-family: ${(props) => props.theme.fontFamily};
  // use sans-serif font
  // font-family: sans-serif;
  // font-family: "Roboto", sans-serif;
`;

type InforValueProps = InfoKeyProps;
const InfoValue = styled.span<InforValueProps>`
  display: inline-flex;
  align-items: center;
  margin-top: 5px;
  font-family: ${(props) => props.theme.fontFamily};
  // font-size: 16px;
  font-size: ${(props) => props.theme.fontSize};
`;

const InfoURLVerticalFlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 10px;
`;

const InfoURLVerticalFlexContainerItem = styled.div<URLProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 5px;
  color: ${(props) => props.theme.textColor};
`;

const Link = styled.a<URLProps>`
  color: ${(props) => props.theme.textColor};
  // color: #2063e9;
  // text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #ff7f50;
  }
`;

const MyLink = styled(Link)`
  margin-right: 10px;
`;

// Open PDF in new TAB ICON
// library.add(faB, faS, faHouseLaptop, faCheckSquare, faCoffee, faDatabase, faWindowMaximize)
const IconWrapper = styled.span`
  margin-right: 8px;
`;
const ExternalLinkIcon = () => (
  <IconWrapper>
    <i className="fas fa-external-link-alt"></i>
  </IconWrapper>
);


// TODO read ALL Data from props
const PersonalInfo: React.FC<PersonalInfoProps> = ({
  userData: { name, email, github, gitlab, linkedin },
  theme,
}) => {
  return (
    <Container theme={theme}>
      <InfoItem>
        <InfoKey theme={theme.infoItem.key}>Name:</InfoKey> <InfoValue theme={theme.infoItem.value}>{name}</InfoValue>
      </InfoItem>
      <InfoItem>
        <InfoKey theme={theme.infoItem.key}>Email:</InfoKey> <InfoValue theme={theme.infoItem.value}>{email}</InfoValue>
      </InfoItem>
      <InfoItem>
        <InfoKey theme={theme.infoItem.key}>Github:</InfoKey>{" "}
        <InfoValue theme={theme.infoItem.value}>
          <MyLink
            href={`https://${github}`}
            target="_blank"
            rel="noopener noreferrer"
            theme={{
              textColor: theme.linkColor,
            }}
          >
            {github} <AppExternalURLIcon theme={{ lineColor: theme.externalURLSVGColor }} />
          </MyLink>
        </InfoValue>
      </InfoItem>
      <InfoItem>
        <InfoKey theme={theme.infoItem.key}>Gitlab:</InfoKey>{" "}
        <InfoValue theme={theme.infoItem.value}>
          <MyLink
            href={`https://${gitlab}`}
            target="_blank"
            rel="noopener noreferrer"
            theme={{
              textColor: theme.linkColor,
            }}
          >
            {gitlab} <AppExternalURLIcon theme={{ lineColor: theme.externalURLSVGColor }} />
          </MyLink>
        </InfoValue>
      </InfoItem>
      <InfoItem>
        <InfoKey theme={theme.infoItem.key}>LinkedIn:</InfoKey>{" "}
        <InfoValue theme={theme.infoItem.value}>
          <MyLink
            href={`https://${linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            theme={{
              textColor: theme.linkColor,
            }}
          >
            {linkedin} <AppExternalURLIcon theme={{ lineColor: theme.externalURLSVGColor }} />
          </MyLink>
        </InfoValue>
      </InfoItem>
      {/* Render the various PDF documents and link to their publicly accessible urls */}
      <InfoItem>
        {" "}
        <InfoKey theme={theme.infoItem.key}>Curricular Docs:</InfoKey>{" "}
        <InfoURLVerticalFlexContainer>
          {/* 1 PAGE RESUME */}
          <InfoURLVerticalFlexContainerItem theme={{ textColor: "#fff" }}>
            <MyLink
              href={`https://konstantinos-lampridis-cv-documents.s3.eu-central-1.amazonaws.com/main_resume.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              theme={{
                textColor: theme.linkColor,
              }}
            >
              '1 Page Resume' <AppExternalURLIcon theme={{ lineColor: theme.externalURLSVGColor }} />
            </MyLink>
          </InfoURLVerticalFlexContainerItem>
          {/* CV + PROJECTS */}
          <InfoURLVerticalFlexContainerItem theme={{ textColor: "#fff" }}>
            <MyLink
              href={`https://konstantinos-lampridis-cv-documents.s3.eu-central-1.amazonaws.com/main_cv%2Bprojects.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              theme={{
                textColor: theme.linkColor,
              }}
            >
              'CV + Projects' <AppExternalURLIcon theme={{ lineColor: theme.externalURLSVGColor }} />
            </MyLink>
          </InfoURLVerticalFlexContainerItem>
        </InfoURLVerticalFlexContainer>
      </InfoItem>
    </Container>
  );
};

export default PersonalInfo;
export type { PersonalInfoProps };
