import { FC } from "react";
import styled from "@emotion/styled";

interface ExpItemActivityContainerProps {
  children?: React.ReactNode;
  theme: {
    backgroundColor?: string;
    textColor?: string;
  };
};

const ExpItemActivityContainer = styled.div<ExpItemActivityContainerProps>`
  background: ${(props) => props.theme.backgroundColor || "inherit"};
  color: ${(props) => props.theme.textColor || "inherit"};
  box-sizing: border-box;
`;


interface ExpItemActivityProps {
  theme: {
    containerBackgroundColor?: string;
    textColor: string;
  };
  data: {
    text: string;
  };
}

const ExpItemActivity: FC<ExpItemActivityProps> = ({
  theme,
  data: { text },
}) => {
  return (
    <ExpItemActivityContainer theme={theme}>
      {text}
    </ExpItemActivityContainer>
  );
};

export default ExpItemActivity;
