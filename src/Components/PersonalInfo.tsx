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

const PersonalInfo: React.FC<PersonalInfoProps> = ({
  name,
  email,
  github,
  gitlab,
  linkedin,
}) => {
  return (
    <Container>
      <InfoItem>
        <strong>Name:</strong> {name}
      </InfoItem>
      <InfoItem>
        <strong>Email:</strong> {email}
      </InfoItem>
      <InfoItem>
        <strong>Github:</strong>{' '}
        <a href={github} target="_blank" rel="noopener noreferrer">
          {github}
        </a>
      </InfoItem>
      <InfoItem>
        <strong>Gitlab:</strong>{' '}
        <a href={gitlab} target="_blank" rel="noopener noreferrer">
          {gitlab}
        </a>
      </InfoItem>
      <InfoItem>
        <strong>LinkedIn:</strong>{' '}
        <a href={linkedin} target="_blank" rel="noopener noreferrer">
          {linkedin}
        </a>
      </InfoItem>
    </Container>
  );
};

export default PersonalInfo;
