import { FC } from "react";

import styled from "@emotion/styled";
import {
  FaGithub,  // github icon
  FaBook,  // book icon
  FaCircleNotch,  // icon for CI/CD
  // FaExternalLinkAlt,  // external link icon
  // FaCheckCircle,
  // FaTimesCircle,
  // FaExclamationTriangle,
  // FaTimesCircle,
} from 'react-icons/fa';
import { IconType } from 'react-icons';

import Typography from '../Typography';
import ResourceLinkButton from './ResourceLinkButton'

interface Link {
  title: string;
  url: string;
  type: 'github-repo' | 'docs' | 'ci/cd' | 'other';
}

interface LinksPaneProps {
  data: {
    links: Link[];
  },
  theme: {
    // headerFontFamily: string;
    headerColor: string;
    item: {
      color: string;
      backgroundColor: string;
      onHoverColor: string;
      onHoverBackgroundColor: string;
    }
    // headerMarginBottom: string;
  };
}

const ICONS: { [key: string]: IconType } = {
  source_code_repo: FaGithub,
  documentation: FaBook,
  docs: FaBook,
  'ci/cd': FaCircleNotch,
};



const IconWrapper = styled.span`
  margin-right: 5px;
`;
interface ResourceLinkIconProps {
  type: string;
}
const Icon: FC<ResourceLinkIconProps> = ({ type }) => {
  const IconComponent = ICONS[type];
  return IconComponent ? <IconWrapper><IconComponent /></IconWrapper> : null;
};

const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 6px;
  padding-right: 12px;
  // margin-bottom: 16px;
`;

const CardContent = styled.div``;

const ResourcesLinksDiv = styled.div`
display: flex;
flex-direction: column;
`;

// const ProjectLinksPane: FC<LinksPaneProps> = ({ data: { links }, theme }) => {
const ProjectLinksPane: FC<LinksPaneProps> = (props) => {
  const { data: { links }, theme } = props;
  return (
    <Card>
      <CardContent>
        {/* Resource Links - HEADER TITLE */}
        <Typography variant="h3"
          style={{
            // fontFamily: theme.headerFontFamily,
            color: theme.headerColor,
            // marginBottom: theme.headerMarginBottom
          }}
        >
          Resource Links
        </Typography>

        <ResourcesLinksDiv>
          {links.map((link, index) => (
            <ResourceLinkButton
              key={index}
              theme={theme.item}
              urlText={link.url}
            >
              <Icon type={link.type} />
              <span>{link.title}</span>
            </ResourceLinkButton>
          ))}
        </ResourcesLinksDiv>
      </CardContent>
    </Card>
  );
};

export default ProjectLinksPane;
export type { LinksPaneProps };
