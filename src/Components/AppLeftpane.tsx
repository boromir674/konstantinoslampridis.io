import React from 'react';
import styled from '@emotion/styled';
import Profile from './Profile';
import BuildTimePersonalInfo from './BuildTimePersonalInfo';

const LeftPane = styled.div`
  grid-area: Profile;
  position: fixed;
  left: 0px;
  height: 100%;
  background-color: lightgreen;
`;

const AppLeftPane: React.FC = () => {
  return (
    <LeftPane>
        <Profile />
        <BuildTimePersonalInfo/>
    </LeftPane>
  );
};

export default AppLeftPane;
