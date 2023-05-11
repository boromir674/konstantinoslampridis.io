import React from 'react';
import styled from '@emotion/styled';

interface PersonalInfoProps {
  name: string;
  email: string;
  github: string;
  gitlab: string;
  linkedin: string;
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const InfoItem = styled.div`
  flex: 1 1 50%; /* Two items per row, adjust as needed */
  padding: 10px;
`;

const InfoKey = styled.span`
  font-weight: bold;
`;

const InfoValue = styled.span`
  word-break: break-all;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const PersonalInfo1: React.FC<PersonalInfoProps> = ({
  name,
  email,
  github,
  gitlab,
  linkedin,
}) => {
  return (
    <Container>
      <InfoItem>
        <InfoKey>Name:</InfoKey> <InfoValue>{name}</InfoValue>
      </InfoItem>
      <InfoItem>
        <InfoKey>Email:</InfoKey> <InfoValue>{email}</InfoValue>
      </InfoItem>
      <InfoItem>
        <InfoKey>Github:</InfoKey>{' '}
        <InfoValue>
          <a href={`https://${github}`} target="_blank" rel="noopener noreferrer">
            {github}
          </a>
        </InfoValue>
      </InfoItem>
      <InfoItem>
        <InfoKey>Gitlab:</InfoKey>{' '}
        <InfoValue>
          <a href={`https://${gitlab}`} target="_blank" rel="noopener noreferrer">
            {gitlab}
          </a>
        </InfoValue>
      </InfoItem>
      <InfoItem>
        <InfoKey>LinkedIn:</InfoKey>{' '}
        <InfoValue>
          <a href={`https://${linkedin}`} target="_blank" rel="noopener noreferrer">
            {linkedin}
          </a>
        </InfoValue>
      </InfoItem>
    </Container>
  );
};

export default PersonalInfo1;
