import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";

interface Theme {
  primaryColor: string;
  secondaryColor: string;
}

interface NavButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
  theme: Theme;
}

const NavButton = styled.button<NavButtonProps>`
  font-size: 16px;
  padding: 8px 16px;
  border: none;
  border-radius: 999px;
  background-color: ${(props) =>
    props.active ? props.theme.primaryColor : props.theme.secondaryColor};
  color: ${(props) => (props.active ? "#fff" : props.theme.primaryColor)};
  cursor: pointer;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) => props.theme.primaryColor};
    color: #fff;
  }
`;

interface NavItemProps {
  key: string;
  to: string;
  active?: boolean;
  theme: Theme;
  children: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({
  key,
  to,
  active,
  theme,
  children,
}) => {
  const handleClick = () => {
    const target = document.querySelector(to);
    if (target) {
      const yOffset = -100; // adjust this as needed
      const y =
        target.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <li key={key}>
      <NavButton active={active} theme={theme} onClick={handleClick}>
        {children}
      </NavButton>
    </li>
  );
};

interface HeaderProps {
  siteTitle?: string;
  theme: Theme;
  navLinks: ReadonlyArray<{ key: string; to: string; label: string }>;
  // navLinks: Array<{ key: string; to: string; label: string }>;
}


const Header: React.FC<HeaderProps> = ({ siteTitle, theme, navLinks }) => {
  const [activeLinkIndex, setActiveLinkIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const linkIndex = (navLinks || []).findIndex(
        (link) => {
            // if document.querySelector(link.to undefined return false
            // if not thean compare with scrollPosition
            const a = document.querySelector(link.to);
            if (a) {
                const b = a.getBoundingClientRect().top + window.pageYOffset;
                return b > scrollPosition;
            }
            return false;
        }
        );
      setActiveLinkIndex(linkIndex === -1 ? null : linkIndex);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initialize active link on mount

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [navLinks]);

  return (
    <header>
      <nav>
        <ul>
          {navLinks.map((navLink, index) => (
            <NavItem
              key={navLink.key}
              to={navLink.to}
              active={index === activeLinkIndex}
              theme={theme}
            >
              {navLink.label}
            </NavItem>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
