import React, { useState, FC } from "react";
import { ThemeProvider } from "@emotion/react";

interface ThemeType {
  colors: {
    primary: string;
  };
}

type Props = {
  theme: ThemeType | {};
  children?: React.ReactNode;
};

type State = {
  theme: ThemeType | {};
};

const AppThemeProvider: FC<Props> = ({ theme, children }: Props) => {
  const [state, setState] = useState<State>({ theme });

  return (
    <ThemeProvider theme={(state as State).theme}>{children}</ThemeProvider>
  );
};
