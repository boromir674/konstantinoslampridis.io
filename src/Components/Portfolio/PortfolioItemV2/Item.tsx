import { FC } from "react";
import styled from "@emotion/styled";

import PortfolioItemInterface from "../../../PortfolioItemInterface";

const FrameContainer = styled.div`
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: center;
  // width: 100%;
  // set width to be as inner elemenet
  // width: fit-content;
  border: 1px solid;
`;

// App Portfolio Item Card - Outer most Container
const AppPortfolioItemCard = styled.div`
  background-color: #ffffff;
  display: flex;
  height: 293px;
  position: relative;
  width: 574px;
`;

const TopPartOfCard = styled.div`
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  border: 1px solid;
`;

// PROJECT TITLE
const TitleContainer = styled.div`
  position: absolute;
  //   color: #000000;
  //   font-family: "Kokoro-Regular", Helvetica;
  //   font-size: 18px;
  //   font-weight: 400;
  //   left: 18px;
  //   letter-spacing: 0;
  //   line-height: normal;
  //   position: absolute;
  //   top: 17px;
  //   width: 212px;
  box-sizing: border-box;
  // content or box type
  display: flex;
  flex-wrap: wrap;
  // wrap text below if container gets smaller
  height: 40px;
  // height of container
  left: 18px;
  // left margin
  // position relative to parent container
  top: 17px;
  // top margin
`;
// PROJECT TITLE SPAN
const TitleSpan = styled.span`
  padding: 0px 10px;
  font-size: 18px;
  font-weight: 400;
  font-family: "Kokoro-Regular", Helvetica;
  color: #000000;
  letter-spacing: 0;
  line-height: normal;
  text-align: left;
  top: 47px;
`;

// Right Pane with Maturity Level and Releases
const AppReleasesPane = styled.div`
  border: 1px solid;
  background-color: #00000033;
  box-shadow: 0px 4px 4px #00000040;
  height: 110px;
  // height: max-content;
  left: 354px;
  position: absolute;
  top: 18px;
  //   width: 202px;
  width: auto;
  // display: flex;
  // flex-wrap: wrap; /* Wrap inner elements below */
  // align-content: flex-start; /* Align items to the top */
`;

// Software Maturity Level Container (ie stable, mature, beta, alpha, etc)
const SoftwareMaturityContainer = styled.div`
  height: 40px;
  left: 6px;
  position: absolute;
  top: 2px;
  width: 186px;
`;

// Software Maturity Level Text Container
const SoftwareMaturity = styled.span`
  color: #000000;
  font-family: "Kokoro-Regular", Helvetica;
  font-size: 15px;
  font-weight: 400;
  left: 10px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 7px;
`;

// RELEASES PANE in PyPI, Docker, etc
const ReleasesPane = styled.div`
  position: absolute;
  top: -20px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: flex-start;
  height: 100%;
  width: 100%;
`;

// PYPI Release Container
const PyPIReleaseContainer = styled.div`
  height: 23px;
  left: 18px;
  // width: fit-content;
  position: absolute;
  top: 67px;
  inline-size: min-content;
  // display: inline-block;
  //   display: flex;
  //   flex-direction: column;
  //   flex-wrap: wrap; /* Wrap inner elements below */
`;

// PYPI Release Text Container
const TextWrapper = styled.span`
  // display: flex;
  // flex-wrap: wrap; /* Wrap inner elements below */
  color: #000000;
  font-family: "Kokoro-Regular", Helvetica;
  font-size: 15px;
  font-weight: 400;
  left: 9px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 2px;
  // width: fit-content;
  // width: 100%;
  high: auto;
  width: 113px;
  overflow-wrap: break-word;
`;

// DOCKER Release Container
const DockerReleaseContainer = styled.div`
  height: 20px;
  left: 18px;
  position: absolute;
  top: 100px;
  width: 124px;
`;

// Docker Release Text Container
const TextWrapper2 = styled.div`
  color: #000000;
  font-family: "Kokoro-Regular", Helvetica;
  font-size: 15px;
  font-weight: 400;
  left: 9px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 1px;
  white-space: nowrap;
  width: 113px;
`;

// POINTERS Container (ie links to source code, CI, etc)
const PointersContainer = styled.div`
  height: 102px;
  left: 22px;
  position: absolute;
  top: 36px;
  width: 259px;
  box-sizing: border-box;
  // content or box type
  display: flex;
  flex-wrap: wrap;
  // wrap text below if container gets smaller
`;

// Source Code Pointer Container
const SourceCodeContainer = styled.div`
  height: 31px;
  left: 14px;
  position: absolute;
  top: 13px;
  width: 211px;
  box-sizing: border-box;
  // content or box type
  // display: inline-block;
  // flex-wrap: wrap;
  // wrap text below if container gets smaller
`;

// Source Code Link/Pointer Content
const P = styled.p`
  display: flex;
  color: #000000;
  font-family: "Kokoro-Regular", Helvetica;
  font-size: 15px;
  font-weight: 400;
  left: 7px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 4px;
  width: 187px;
`;

// CI Link/Pointer/URL Container
const CIContainer = styled.div`
  height: 35px;
  left: 14px;
  position: absolute;
  top: 60px;
  width: 164px;
`;

// CI Link/Pointer/URL Content
const CIContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  color: #000000;
  font-family: "Kokoro-Regular", Helvetica;
  font-size: 15px;
  font-weight: 400;
  left: 7px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: -1px;
  width: 155px;
`;

// PROJECT DESCRIPTION Container
const ProjectDescriptionContainer = styled.div`
  height: 95px;
  left: 31px;
  position: absolute;
  top: 178px;
  width: 525px;
`;

// PROJECT DESCRIPTION Content
const ProjectDescriptionContent = styled.p`
  color: #000000;
  font-family: "Kokoro-Regular", Helvetica;
  font-size: 15px;
  font-weight: 400;
  left: 11px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 7px;
  width: 448px;
`;
interface PortfolioItemProps {
  data: PortfolioItemInterface;
}

const Frame: FC<PortfolioItemProps> = ({
  data: {
    title,
    development_period,
    status,
    description,
    source_code_repo,
    release,
    tags,
  },
}) => {
  return (
    <FrameContainer>
      <AppPortfolioItemCard>
        <TopPartOfCard>
          {/* TITLE */}
          <TitleContainer>
            <TitleSpan>{title}</TitleSpan>
          </TitleContainer>
          {/* RELEASES PANE */}
          <AppReleasesPane>
            <SoftwareMaturityContainer>
              <SoftwareMaturity>Dev stage: {status}</SoftwareMaturity>
            </SoftwareMaturityContainer>
            <ReleasesPane>
              <PyPIReleaseContainer>
                <TextWrapper>PYPI Release</TextWrapper>
              </PyPIReleaseContainer>
              <DockerReleaseContainer>
                <TextWrapper2>Docker Release</TextWrapper2>
              </DockerReleaseContainer>
            </ReleasesPane>
          </AppReleasesPane>
          {/* POINTERS PANE */}
          <PointersContainer>
            <SourceCodeContainer>
              <P>Github: {source_code_repo}</P>
            </SourceCodeContainer>
            {/* <CIContainer>
            <CIContent>Logo + CI URL</CIContent>
          </CIContainer> */}
          </PointersContainer>
        </TopPartOfCard>
        {/* PROJECT DESCRIPTION */}
        <ProjectDescriptionContainer>
          <ProjectDescriptionContent>{description}</ProjectDescriptionContent>
        </ProjectDescriptionContainer>
      </AppPortfolioItemCard>
    </FrameContainer>
  );
};

export default Frame;
