/** Component that renders a Div with Project's Content (ie Title, Description, etc) */
import React, { FC, useCallback } from "react";
import Typography from '../Typography';
import styled from "@emotion/styled";
import { withDefaultProps } from "../hoc";
import PortfolioItemInterface, {
  ReleaseItemData,
} from "../../PortfolioItemInterface";

// INNER CONTENT COMPONENTS
import AppReleasePane, { ReleasesPaneProps } from "./AppProjectReleasesPane";
import AppProjectLinksPane, { AppProjectLinksPaneProps } from './AppProjectLinksPane';
import PortfolioItemProjectTitle from './PortfolioItemProjectTitle';
import PortfolioItemProjectDescription from './PortfolioItemDescription';

// COMPONENT rendering a DIV Designed to host the Left and Right Panes
interface BottomPartBlockProps { theme: { minGapBetweenPanes: string }, ref: React.RefObject<HTMLDivElement> };
const BottomPartBlock = styled.div<BottomPartBlockProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  // control the Minimum gap between the Left and Right Panes that should be preserved
  gap: ${props => props.theme.minGapBetweenPanes};
`;
// COMPONENT rendering a DIV Designed to host the Project Links Pane
const LeftPane = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;
// COMPONENT rendering a DIV Designed to host the Releases Pane
const RightPane = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
`;


// Helper function definition
type RenderRelease = (release: ReleaseItemData, index: number) => React.ReactNode;

const RESOURCE_LINK_TYPE_2_HUMAN_READABLE_TEXT: { [key: string]: string } = {
  'github': 'Source Code',
  'source_code_repo': 'Source Code',
  'docs': 'Documentation',
  'documentation': 'Documentation',
  'ci/cd': 'CI/CD',
};

// COMPONENT - Software maturity Level
interface SoftwareMaturityLevelProps {
  theme: {
    fontFamily: string;
    fontSize: string;
  };
};
const SoftwareMaturityLevelSpan = withDefaultProps({ component: 'span' }, Typography);
const SoftwareMaturityLevel = styled(SoftwareMaturityLevelSpan) <SoftwareMaturityLevelProps>`
  font-family: ${props => props.theme.fontFamily};
  font-size: ${props => props.theme.fontSize};
`;

// Dynamic Sub TYPES of Exported Component
type AppPortfolioItemPropsTheme = BottomPartBlockProps['theme'] & {
  projectTitle: {
    fontFamily: string;
    fontSize?: string;
  };
  projectDescription: {
    fontFamily: string;
    fontSize: string;
  };
  links: AppProjectLinksPaneProps['theme'];
  releases: ReleasesPaneProps["theme"];
};
// TYPES of Exported Component
interface AppPortfolioItemProps {
  data: PortfolioItemInterface;
  theme: AppPortfolioItemPropsTheme;
  refs? : React.RefObject<HTMLElement>[];
}

const AppPortfolioItem: FC<AppPortfolioItemProps> = ({ data, theme, refs }) => {
  // measures dims of 3 inner DOM Elements
  const renderCallback = useCallback(() => <>
    <PortfolioItemProjectTitle ref={refs?.[0] ?? null}  // SELF-MEASURE DIMS
    theme={theme.projectTitle}>{data.title}</PortfolioItemProjectTitle>
    {/* Project Description. Could be github description or description from CV Pdf */}
    <PortfolioItemProjectDescription
    ref={refs?.[1] ?? null}   // SELF-MEASURE DIMS
    theme={theme.projectDescription}>
      {data.description}
    </PortfolioItemProjectDescription>
    <BottomPartBlock
    ref={refs?.[2] ?? null}  // SELF-MEASURE DIMS
    theme={{ minGapBetweenPanes: theme.minGapBetweenPanes }}>  {/* DIV Bottom Part Block */}
      <LeftPane>  {/* DIV Left Pane */}
        {data.resource_links ? (
          <AppProjectLinksPane
            data={{
              links: data.resource_links.map((link) => ({
                title: RESOURCE_LINK_TYPE_2_HUMAN_READABLE_TEXT[link.type],
                url: link.url,
                type: link.type as 'github' | 'docs' | 'ci/cd' | 'source_code_repo' | 'documentation',
              })),
            }}
            theme={{
              headerColor: theme.links.headerColor,
              item: theme.links.item,
              header: theme.links.header,
            }}
          ></AppProjectLinksPane>
        ) : (
          <></>
        )}
      </LeftPane>
      <RightPane>  {/* DIV Right Pane */}
        {/* NOTE: we are using the same objects as the Props of PortfolioItemProjectDescription */}
        <SoftwareMaturityLevel theme={theme.projectDescription}>Software maturity level: {data.status}</SoftwareMaturityLevel>
        {/* A Block where each element covers a line */}
        {/* Each element should be able to wrap below according to size of block */}
        {data.release ? (
          <AppReleasePane data={data.release} theme={{
            headerFontFamily: theme.releases.headerFontFamily,
            headerColor: theme.releases.headerColor,
            headerFontSize: theme.releases.headerFontSize,
            headerMarginBottom: theme.releases.headerMarginBottom,
            releaseButtonTheme: theme.releases.releaseButtonTheme,
          }} />
        ) : (
          <></>
        )}
      </RightPane>
    </BottomPartBlock>
  </>,
    [data, theme]);
  return <>{renderCallback()}</>;
};

export default AppPortfolioItem;

export type { RenderRelease, AppPortfolioItemProps };
