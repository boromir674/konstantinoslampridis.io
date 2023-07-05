import { FC } from "react";
import styled from "@emotion/styled";

// import { useTheme } from "@emotion/react";

interface BottomFooterPaneTheme {
  textColor: string;
  backgroundColor: string;
}
interface BottomFooterPaneContainerProps {
    theme: BottomFooterPaneTheme;
    children?: React.ReactNode;
};

const BottomFooterPaneContainer = styled.div<BottomFooterPaneContainerProps>`
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.backgroundColor};
  justify-self: center;
  align-self: center;
  //   grid-area: Footer;
  position: fixed;
  bottom: 0;
  width: 100%;
`;

interface BottomFooterPaneProps {
  theme: BottomFooterPaneTheme;
  children?: React.ReactNode;
}

const BottomFooterPane: FC<BottomFooterPaneProps> = (props) => {
  return <BottomFooterPaneContainer theme={props.theme}>Footer Pane</BottomFooterPaneContainer>;
};

export default BottomFooterPane;
