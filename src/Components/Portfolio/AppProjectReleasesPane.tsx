import { FC } from "react";
import styled from "@emotion/styled";

import { FaGithub, FaDocker, FaPython } from 'react-icons/fa';
import { IconType } from 'react-icons';

import { ReleaseItemData } from "../../PortfolioItemInterface";
import SoftwareReleaseButton, { SoftwareReleaseButtonTheme } from './SoftwareReleaseButton';



interface Theme {
  headerFontFamily: string;
  headerColor: string;
  headerMarginBottom: string;
  releaseButtonTheme: SoftwareReleaseButtonTheme;
}

interface ReleasesPaneProps {
  data: ReleaseItemData[];
  theme: Theme;
}

// interface ReleaseButtonTheme {
//   color: string;
//   backgroundColor: string;
//   onHoverColor: string;
//   onHoverBackgroundColor: string;
// }
// const ReleaseButton = styled.button<ReleaseButtonTheme>`
//   display: flex;
//   align-items: center;
//   padding: 10px;
//   margin-bottom: 10px;
//   border: none;
//   background-color: ${(props) => props.backgroundColor};
//   color: ${(props) => props.color};
//   border-radius: 4px;
//   font-size: 14px;
//   font-family: 'Courier New', Courier, monospace;
//   text-decoration: none;
//   cursor: pointer;
//   transition: background-color 0.3s ease, box-shadow 0.3s ease; // Add box-shadow to transition
//   box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); // Add this line

//   &:hover {
//     background-color: ${(props) => props.onHoverBackgroundColor};
//     color: ${(props) => props.onHoverColor};
//     box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.2); // Add this line
//   }

//   &:hover .release-type {
//     visibility: visible;
//   }

//   & > span {
//     margin-right: 10px;
//   }

//   @media (max-width: 768px) {
//     font-size: 12px;
//     padding: 8px;
//   }

// `;

const ReleaseType = styled.span`
  margin-left: auto;
  visibility: hidden;
`;


const ReleaseList = styled.div`
display: flex;
flex-direction: column;
`;

const ReleasesPane = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
`;

const IconWrapper = styled.span`
  margin-right: 5px;
`;

const ICONS: { [key: string]: IconType } = {
  github: FaGithub,
  pypi: FaPython,
  docker: FaDocker,
};

const FALLBACK_COMMANDS: { [key: string]: string } = {
  github: 'curl -L ...',
  pypi: 'pip install ...',
  docker: 'docker pull ...',
};

interface ReleaseIconProps {
  type: string;
}
const Icon: FC<ReleaseIconProps> = ({ type }) => {
  const IconComponent = ICONS[type];
  return IconComponent ? <IconWrapper><IconComponent /></IconWrapper> : null;
};

const StyledH3 = styled.h3<Theme>`
  font-family: ${props => props.headerFontFamily};
  color: ${props => props.headerColor};
  margin-bottom: ${props => props.headerMarginBottom};
`;


const AppReleasePane: FC<ReleasesPaneProps> = ({ data, theme }) => (
  <ReleasesPane>
    <StyledH3 {...theme}>Releases</StyledH3>
    <ReleaseList>
      {data.map((release, index) => (
        <SoftwareReleaseButton
          key={index}
          data={{
            command: release.command || FALLBACK_COMMANDS[release.type],
            urlText: release.urlText,
          }}
          theme={theme.releaseButtonTheme}
        >
          <Icon type={release.type} />
          <span>{release.name}</span>
          <span>{release.artifact_version}</span>
          <ReleaseType>{release.type.toUpperCase()}</ReleaseType>
        </SoftwareReleaseButton>
      ))}
    </ReleaseList>
  </ReleasesPane>
);


export default AppReleasePane;
export { type ReleasesPaneProps };
