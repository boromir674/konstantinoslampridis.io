import React from 'react';
import styled from '@emotion/styled';
import Profile from './Profile';
import BuildTimePersonalInfo from './BuildTimePersonalInfo';

interface AppLeftPaneProps {
  theme: {
    containerBackgroundColor: string;
    textColor: string;
    linkColor: string;
  };
};

const LeftPane = styled.div`
  grid-area: Profile;
  // position: fixed;
  left: 0px;
  // height: 100%;
  background-color: lightgreen;
`;

const AppLeftPane: React.FC<AppLeftPaneProps> = ({
  theme,
}) => {
  return (
    <LeftPane>
        <Profile />
        <BuildTimePersonalInfo theme={theme}/>
    </LeftPane>
  );
};

export default AppLeftPane;
