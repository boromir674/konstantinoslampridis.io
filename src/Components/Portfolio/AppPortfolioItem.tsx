import React, { FC, useCallback } from "react";
import styled from "@emotion/styled";
import PortfolioItemInterface, {
  ReleaseItemData,
} from "../../PortfolioItemInterface";
import AppExternalURLIcon from "../AppExternalURLIcon";

// URL (TODO: put into a dedicated Component and re-use in whole App)
interface URLProps {
  theme: {
    textColor: string;
    onHoverTextColor?: string;
  };
}

// color: #ff7f50;
// color: #a12aef;

const Link = styled.a<URLProps>`
  color: ${(props) => props.theme.textColor};
  // text-decoration: none;
  transition: color ease;

  &:hover {
    color: ${(props) => props.theme.onHoverTextColor || props.theme.textColor};
  }
`;

const MyLink = styled(Link)`
  margin-right: 10px;
`;

// DIV Wrappers

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
type RenderRelease = (
  release: ReleaseItemData,
  index: number
) => React.ReactNode;

// React Component

interface AppPortfolioItemProps {
  theme: {
    urlLinkTextColor: string;
    onHoverURLLinkTextColor: string;
  };
  data: PortfolioItemInterface;
  //   renderRelease: (r: PortfolioItemInterface["release"][0]) => React.ReactNode;
}

const AppPortfolioItem: FC<AppPortfolioItemProps> = ({ data, theme }) => {
  // create a callback function at most 2 times,
  // since we currently support 2 type of releases: pypi and github
  const renderReleaseCallback: RenderRelease = useCallback(
    (r: ReleaseItemData, index: number) => {
      return (
        <div key={index}>
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
    (d: PortfolioItemInterface) => {
      return (
        <>
          <h1>{d.title}</h1>
          <TopPartBlock>
            <LeftPane>
              {d.source_code_repo ? (
                <span>
                  Source Code:{" "}
                  <MyLink
                    href={`https://github.com/${d.source_code_repo}`}
                    target="_blank"
                    theme={{
                      textColor: theme.urlLinkTextColor,
                      onHoverTextColor: theme.onHoverURLLinkTextColor,
                    }}
                  >
                    github.com/{d.source_code_repo}{" "}
                    <AppExternalURLIcon
                      theme={{ lineColor: theme.urlLinkTextColor }}
                    />
                  </MyLink>
                </span>
              ) : null}
            </LeftPane>
            <RightPane>
              <span>Software maturity level: {d.status}</span>
              {/* A Block where each element covers a line */}
              {/* Each element should be able to wrap below according to size of block */}
              {d.release ? (
                <ReleasesPane>
                  <h3>Releases</h3>
                  <ReleaseListContainer>
                    {d.release.map((release, index) =>
                      renderReleaseCallback(release, index)
                    )}
                  </ReleaseListContainer>
                </ReleasesPane>
              ) : null}
            </RightPane>
          </TopPartBlock>
          <BottomPartBlock>{d.description}</BottomPartBlock>
        </>
      );
    },
    [renderReleaseCallback, data]
  );

  return <>{renderCallback(data)}</>;
};

export default AppPortfolioItem;
