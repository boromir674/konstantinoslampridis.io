/** Component that renders a Div with Project's Content (ie Title, Description, etc) */
import React, { FC, useCallback } from "react";
import Typography from '../Typography';
import styled from "@emotion/styled";
import { withDefaultProps } from "../hoc";
import PortfolioItemInterface, {
  ReleaseItemData,
} from "../../PortfolioItemInterface";
import AppReleasePane, { ReleasesPaneProps } from "./AppProjectReleasesPane";
import AppProjectLinksPane, { AppProjectLinksPaneProps } from './AppProjectLinksPane';

const LeftPane = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;
const RightPane = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
`;

const BottomPartBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
`;

const ReleasesPane = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;

const ReleaseListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
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

// COMPONENT - Project Title
interface PortfolioItemProjectTitleProps {
  theme: {
    fontFamily: string;
    fontSize?: string;
  };
};
const PortfolioItemProjectTitleH2 = withDefaultProps({
  variant: "h2",
}, Typography);
const PortfolioItemProjectTitle = styled(PortfolioItemProjectTitleH2) <PortfolioItemProjectTitleProps>`
  margin: 0;
  font-family: ${props => props.theme?.fontFamily || "inherit"};
  font-size: ${props => props.theme?.fontSize || "24px"};
  font-weight: bold;
`;

// COMPONENT - Project Description
interface PortfolioItemProjectDescriptionProps {
  theme: {
    fontFamily: string;
    fontSize: string;
  };
};
const PortfolioItemProjectDescriptionP = withDefaultProps({variant: "body1"}, Typography);
const PortfolioItemProjectDescription = styled(PortfolioItemProjectDescriptionP) <PortfolioItemProjectDescriptionProps>`
  // margin: 0;
  font-family: ${props => props.theme.fontFamily};
  font-size: ${props => props.theme.fontSize};
  // font-weight: bold;
`;
// COMPONENT - Software maturity Level
interface SoftwareMaturityLevelProps {
  theme: {
    fontFamily: string;
    fontSize: string;
  };
};
const SoftwareMaturityLevelSpan = withDefaultProps({component: 'span'}, Typography);
const SoftwareMaturityLevel = styled(SoftwareMaturityLevelSpan) <SoftwareMaturityLevelProps>`
  font-family: ${props => props.theme.fontFamily};
  font-size: ${props => props.theme.fontSize};
`;
interface AppPortfolioItemProps {
  data: PortfolioItemInterface;
  theme: {
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
  //   renderRelease: (r: PortfolioItemInterface["release"][0]) => React.ReactNode;
}

const render = (d: PortfolioItemInterface, theme: AppPortfolioItemProps["theme"]) => {
  return (
    <>

      <PortfolioItemProjectTitle theme={theme.projectTitle}>{d.title}</PortfolioItemProjectTitle>
      {/* Project Description. Could be github description or description from CV Pdf */}
      <PortfolioItemProjectDescription theme={theme.projectDescription}>
        {d.description}
      </PortfolioItemProjectDescription>
      <BottomPartBlock>
        <LeftPane>
          {d.resource_links ? (
            <AppProjectLinksPane
              data={{
                links: d.resource_links.map((link) => ({
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
        <RightPane>
          {/* NOTE: we are using the same objects as the Props of PortfolioItemProjectDescription */}
          <SoftwareMaturityLevel theme={theme.projectDescription}>Software maturity level: {d.status}</SoftwareMaturityLevel>
          {/* A Block where each element covers a line */}
          {/* Each element should be able to wrap below according to size of block */}
          {d.release ? (
            <AppReleasePane data={d.release} theme={{
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
    </>
  );
};

// React Component
const AppPortfolioItem: FC<AppPortfolioItemProps> = ({ data, theme }) => {
  // const JSXInstance = useMemo(() => render(data, theme), [data, theme]);
  const renderCallback = useCallback(() => render(data, theme), [data, theme]);
  return (
    <div>
      {renderCallback()}
    </div>
  );
};

export default AppPortfolioItem;

export { ReleasesPane, ReleaseListContainer };
export type { RenderRelease, AppPortfolioItemProps };
