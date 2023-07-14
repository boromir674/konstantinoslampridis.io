import styled from "@emotion/styled";

const FrameContainer = styled.div`
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;

// width: 100%;
// height: 100vh;
// background-color: #f0f0f0;
// padding: 20px;
// box-sizing: border-box;

// App Portfolio Item Card - Outer most Container
const AppPortfolioItemCard = styled.div`

  background-color: #ffffff;
  height: 293px;
  position: relative;
  width: 574px;
  border: 1px solid;
`;

// Releases Pane
const AppReleasesPane = styled.div`

  border: 1px solid;
  background-color: #00000033;
  box-shadow: 0px 4px 4px #00000040;
  height: 140px;
  left: 354px;
  position: absolute;
  top: 18px;
  width: 202px;
`;

// PYPI Release Container
const PyPIReleaseContainer = styled.div`
  height: 23px;
  left: 18px;
  width: fit-content;
  position: absolute;
  top: 67px;
  // set width to automatically fit content and also not surpass a max value
  display: flex;
flex-wrap: wrap;
`;

// PYPI Release Text Container
const TextWrapper = styled.div`
  color: #000000;
  font-family: "Kokoro-Regular", Helvetica;
  font-size: 15px;
  font-weight: 400;
  left: 9px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 2px;
  width: 133px;
`;

// DOCKER Release Container
const DockerReleaseContainer = styled.div`
  height: 20px;
  left: 26px;
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
  left: 5px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 1px;
  white-space: nowrap;
  width: 113px;
`;

// Software Maturity Level Container (ie stable, mature, beta, alpha, etc)
const SoftwareMaturityContainer = styled.div`
  height: 40px;
  left: 6px;
  position: absolute;
  top: 8px;
  width: 186px;
`;

// Software Maturity Level Text Container
const SoftwareMaturity = styled.div`
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

// PROJECT TITLE
const TitleContainer = styled.div`
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
position: absolute;
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
// POINTERS Container (ie links to source code, CI, etc)
const PointersContainer = styled.div`
  height: 102px;
  left: 22px;
  position: absolute;
  top: 56px;
  width: 259px;
`;

// Source Code Pointer Container
const SourceCodeContainer = styled.div`
  height: 31px;
  left: 14px;
  position: absolute;
  top: 13px;
  width: 211px;
`;

// Source Code Link/Pointer Content
const P = styled.p`
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
  color: #000000;
  font-family: "Kokoro-Regular", Helvetica;
  font-size: 15px;
  font-weight: 400;
  left: 9px;
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

const Frame = () => {
  return (
    <FrameContainer>
      <AppPortfolioItemCard>
        {/* RELEASES PANE */}
        <AppReleasesPane>
          <PyPIReleaseContainer>
            <TextWrapper>PYPI Release</TextWrapper>
          </PyPIReleaseContainer>
          <DockerReleaseContainer>
            <TextWrapper2>Docker Release</TextWrapper2>
          </DockerReleaseContainer>
          <SoftwareMaturityContainer>
            <SoftwareMaturity>Software Maturity Level</SoftwareMaturity>
          </SoftwareMaturityContainer>
        </AppReleasesPane>
        {/* TITLE */}
        <TitleContainer><TitleSpan>Python Package Generator</TitleSpan></TitleContainer>
        <PointersContainer>
          <SourceCodeContainer>
            <P>Logo + Source Code URL</P>
          </SourceCodeContainer>
          <CIContainer>
            <CIContent>Logo + CI URL</CIContent>
          </CIContainer>
        </PointersContainer>
        <ProjectDescriptionContainer>
          <ProjectDescriptionContent>
            A Python Package hosting multiple (CLI) programs that facilitate
            Topic Modeling research operations, on a
            <br />
            collection of documents.
          </ProjectDescriptionContent>
        </ProjectDescriptionContainer>
      </AppPortfolioItemCard>
    </FrameContainer>
  );
};

export default Frame;
