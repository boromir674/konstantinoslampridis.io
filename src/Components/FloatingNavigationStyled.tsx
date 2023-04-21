import React from 'react';
import styled from '@emotion/styled';

interface Theme {
    backgroundColor: string;
    foregroundColor: string;
    buttonColor: string;
    buttonHoverColor: string;
  }
  
  const NavContainer = styled.div<{ theme: Theme }>`
    position: fixed;
    top: 50%;
    right: 2rem;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    // background-color: ${(props) => props.theme.backgroundColor};
    color: ${(props) => props.theme.foregroundColor};
  `;
  
  const NavButton = styled.button<{ theme: Theme }>`
    width: 2.5rem;
    height: 2.5rem;
    margin-bottom: 0.5rem;
    border-radius: 50%;
    background-color: ${(props) => props.theme.buttonColor};
    color: white;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
  
    &:hover {
      background-color: ${(props) => props.theme.buttonHoverColor};
      transform: scale(1.1);
    }
  `;
  
  interface NavProps {
    navItems: string[];
    theme: Theme;
  }

  const Nav: React.FC<NavProps> = ({ navItems, theme }) => {
    return (
      <NavContainer theme={theme}>
        {navItems.map((navItem) => (
          <NavButton key={navItem} theme={theme}>
            {navItem}
          </NavButton>
        ))}
      </NavContainer>
    );
  };

export default Nav;
