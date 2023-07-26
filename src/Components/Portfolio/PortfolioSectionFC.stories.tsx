import {
  ResponsiveLocalStorageLayout,
  defaultProps,
  ResponsiveLocalStorageLayoutProps,
} from "./PortfolioSectionFC";
import PortfolioItemCard from "./PortfolioItemV2";
import { FC } from "react";
import styled from "@emotion/styled";

import { useElementSize } from "../../Hooks/useElementSize";
interface LayoutItemContentProps {
  data: ResponsiveLocalStorageLayoutProps["data"][0];
}

const OuterContainer = styled.div`
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  // justify-content: center;
  // height: max-content;
`;

const InnerContainer = styled.div`
  // interpret all geometry properties to be relevant to the out side block
  position: absolute;
  padding: 10px;

  display: flex;
  flex-direction: column;
  // justify-content: space-between;
  height: 100%;
`;

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
`;

const render = (title: string, width: number, height: number) => {
  return (
    <>
      <h1>{title}</h1>
      <TopPartBlock>
        <LeftPane>
          Links (ie urls to source code, CI)
          <p />
          <span>
            Width: {width}px. Height: {height}
          </span>
        </LeftPane>
        <RightPane>
          maturity level<p>Releases pane</p>
        </RightPane>
      </TopPartBlock>
      <BottomPartBlock>Description</BottomPartBlock>
    </>
  );
};
const LayoutItemContent: FC<LayoutItemContentProps> = ({ data: { title } }) => {
  const [blockRef, { width, height }] = useElementSize();

  return (
    <OuterContainer>
      <InnerContainer ref={blockRef}>
        {render(title, width, height)}
      </InnerContainer>
    </OuterContainer>
  );
};

export default {
  component: ResponsiveLocalStorageLayout,
  title: "ResponsiveLocalStorageLayout",
  tags: ["autodocs"],
};

const args: ResponsiveLocalStorageLayoutProps = {
  className: "layout",
  cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  rowHeight: 30,
  element_to_render: LayoutItemContent,
  data: [
    {
      title: "Python Package Generator",
      development_period: "2020-2021",
      status: "Mature",
      description:
        "A CLI tool to generate a Python package with a single command.",
      source_code_repo: "boromir674/cookiecutter-python-package",
      release: [
        {
          artifact_type: "pypi",
          version: "0.1.0",
          name: "cookiecutter-python-package",
        },
      ],
      tags: ["Python", "CLI", "Automation", "Docker"],
    },
    {
      title: "Neural Style Transfer",
      development_period: "2020-2021",
      status: "Stable",
      description:
        "Re-paint any image with the style of another image (ie Van Gogh painting) using a Neural Style Transfer algorithm, accessible through an easy-to-use CLI.",
      source_code_repo: "boromir674/neural-style-transfer",
      release: [
        {
          artifact_type: "pypi",
          version: "0.6.1",
          name: "neural-style-transfer",
        },
      ],
      tags: [
        "Neural Style Transfer",
        "Deep Learning",
        "Python",
        "Docker",
        "CLI",
        "Sphinx",
        "PyPI",
      ],
    },
    {
      title: "Topic Modeling Toolkit",
      development_period: "2018-2019",
      status: "Mature",
      description:
        "A Python library for Topic Modeling providing a unified interface facilitating various research operations. It is designed to be easily extensible, allowing developers to implement their own algorithms and plug them in the toolkit.",
      source_code_repo: "boromir674/topic-modeling-toolkit",
      release: [
        {
          artifact_type: "pypi",
          version: "0.5.2",
          name: "topic-modeling-toolkit",
        },
      ],
      tags: [
        "Machine Learning",
        "Unsupervised Learning",
        "Topic Modeling",
        "Regression Testing",
        "Python",
        "PyPI",
        "automation",
        "CLI",
      ],
    },
  ],
};

export const Light = {
  args: args,
};

export const Dark = {
  args: {
    // same interface as the props of the Component
    ...Light.args,
  },
};
