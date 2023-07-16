import React, { FC, useCallback } from "react";
import styled from "@emotion/styled";
import PortfolioItemInterface, {
  ReleaseItemData,
} from "../../PortfolioItemInterface";

const TopPartBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

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
type RenderRelease = (release: ReleaseItemData) => React.ReactNode;

const render = (d: PortfolioItemInterface, renderRelease: RenderRelease) => {
  return (
    <>
      <h1>{d.title}</h1>
      <TopPartBlock>
        <LeftPane>
          <span>
            Source Code:<a>github.com/{d.source_code_repo}</a>
          </span>
        </LeftPane>
        <RightPane>
          <span>Software maturity level: {d.status}</span>
          {/* A Block where each element covers a line */}
          {/* Each element should be able to wrap below according to size of block */}
          {d.release ? (
            <ReleasesPane>
              <h3>Releases</h3>
              <ReleaseListContainer>
                {d.release.map((release) => renderRelease(release))}
              </ReleaseListContainer>
            </ReleasesPane>
          ) : (
            <></>
          )}
        </RightPane>
      </TopPartBlock>
      <BottomPartBlock>{d.description}</BottomPartBlock>
    </>
  );
};

// React Component

interface AppPortfolioItemProps {
  data: PortfolioItemInterface;
  //   renderRelease: (r: PortfolioItemInterface["release"][0]) => React.ReactNode;
}

const AppPortfolioItem: FC<AppPortfolioItemProps> = ({ data }) => {
  // create a callback function at most 2 times,
  // since we currently support 2 type of releases: pypi and github
  const renderReleaseCallback: RenderRelease = useCallback(
    (r: PortfolioItemInterface["release"][0]) => {
      return (
        <div>
          <span>
            {r.type} {"->"}{" "}
          </span>
          <span>{r.artifact_version}</span>
        </div>
      );
    },
    []
  );

  //   const renderCallback: (data: PortfolioItemInterface) => React.ReactNode = useCallback(
  const renderCallback = useCallback(
    (portfolioItemData: PortfolioItemInterface) => {
      return render(portfolioItemData, renderReleaseCallback);
    },
    [renderReleaseCallback]
  );

  return <>{renderCallback(data)}</>;
};

export default AppPortfolioItem;
