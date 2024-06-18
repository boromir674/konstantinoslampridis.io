import React, { FC, useCallback } from "react";
import Typography from '../Typography';
import styled from "@emotion/styled";
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

interface AppPortfolioItemProps {
  data: PortfolioItemInterface;
  theme: {
    links: AppProjectLinksPaneProps['theme'];
    releases: ReleasesPaneProps["theme"];
  };
  //   renderRelease: (r: PortfolioItemInterface["release"][0]) => React.ReactNode;
}

const render = (d: PortfolioItemInterface, theme: AppPortfolioItemProps["theme"]) => {
  return (
    <>
      <h1>{d.title}</h1>
      {/* Project Description. Could be github description or description from CV Pdf */}
      <Typography variant="body1" gutterBottom>
        {d.description}
      </Typography>
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
                item: theme.links.item
              }}
            ></AppProjectLinksPane>
          ) : (
            <></>
          )}
        </LeftPane>
        <RightPane>
          <span>Software maturity level: {d.status}</span>
          {/* A Block where each element covers a line */}
          {/* Each element should be able to wrap below according to size of block */}
          {d.release ? (
            <AppReleasePane data={d.release} theme={{
              headerFontFamily: theme.releases.headerFontFamily,
              headerColor: theme.releases.headerColor,
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

const AppPortfolioItem: FC<AppPortfolioItemProps> = (props) => {

  const renderCallback = useCallback(
    (portfolioItemProps: AppPortfolioItemProps) => {
      return render(portfolioItemProps.data, portfolioItemProps.theme);
    },
    []
  );

  return <div>{renderCallback(props)}</div>;
};

export default AppPortfolioItem;

export { ReleasesPane, ReleaseListContainer };
export type { RenderRelease, AppPortfolioItemProps };
