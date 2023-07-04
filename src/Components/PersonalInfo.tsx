import React from "react";
import styled from "@emotion/styled";
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
interface PersonalInfoProps {
  userData: PersonalInfoInterface;
  theme: {
    containerBackgroundColor: string;
    textColor: string;
    linkColor: string;
  };
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

const InfoKey = styled.span`
  font-weight: bold;
  font-size: 18px;
`;

const InfoValue = styled.span`
  display: inline-flex;
  align-items: center;
  font-size: 16px;
  margin-top: 5px;
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

// const GitLabLink = styled(Link)`
//   margin-right: 10px;
// `;

// const LinkedInLink = styled(Link)`
//   margin-right: 10px;
// `;

const PersonalInfo: React.FC<PersonalInfoProps> = ({
  userData: { name, email, github, gitlab, linkedin },
  theme,
}) => {
  return (
    <Container theme={theme}>
      <InfoItem>
        <InfoKey>Name:</InfoKey> <InfoValue>{name}</InfoValue>
      </InfoItem>
      <InfoItem>
        <InfoKey>Email:</InfoKey> <InfoValue>{email}</InfoValue>
      </InfoItem>
      <InfoItem>
        <InfoKey>Github:</InfoKey>{" "}
        <InfoValue>
          <MyLink
            href={`https://github.com/${github}`}
            target="_blank"
            rel="noopener noreferrer"
            theme={{
              textColor: theme.linkColor,
            }}
          >
            {github}
          </MyLink>
        </InfoValue>
      </InfoItem>
      <InfoItem>
        <InfoKey>Gitlab:</InfoKey>{" "}
        <InfoValue>
          <MyLink
            href={`https://gitlab.com/${gitlab}`}
            target="_blank"
            rel="noopener noreferrer"
            theme={{
              textColor: theme.linkColor,
            }}
          >
            {gitlab}
          </MyLink>
        </InfoValue>
      </InfoItem>
      <InfoItem>
        <InfoKey>LinkedIn:</InfoKey>{" "}
        <InfoValue>
          <MyLink
            href={`https://${linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            theme={{
              textColor: theme.linkColor,
            }}
          >
            {linkedin}
          </MyLink>
        </InfoValue>
      </InfoItem>
    </Container>
  );
};

export default PersonalInfo;
