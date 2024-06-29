import React, { FC } from "react";
import styled from "@emotion/styled";

import useScreenScrollHandler from "../../Hooks/useScreenScrollHandler";

import ScrollingNavigationItemGeneric from "./ScrollingNavigationItemGeneric";
import AppHorNavItem from "./AppHorNavItem";

const NavContainerNew = styled.nav`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  background: "inherit";
  /* Set the desired spacing between flex items */
  gap: 1px;
`;

interface HeaderNavProps {
  items: {
    label: string;
    to_element_id: string;
  }[];
  activeItem: string;
  theme: {
    colorSet: {
      textColor: string;
      backgroundColor: string;
      hoverBackgroundColor: string;
      hoverTextColor: string;
      activatedTextColor: string;
      activatedBackgroundColor: string;
    };
    // paddings for vertical and horizontal control
    padding: {
      vertical: string;
      horizontal: string;
    };
  };
}

const HorizontalNavBar: FC<HeaderNavProps> = ({ items, theme: { colorSet, padding } }) => {
  // whenever the user makes a scroll we capture the "screen view position"
  // and we store in the 'activeLinkIndex' state attribute of this component
  // since the state value gets updated on scroll event,
  // the re-render triggers essentially on scroll event
  const activeLinkIndex = useScreenScrollHandler(items);

  return (
    <NavContainerNew>
      {items.map((item, index) => (
        <ScrollingNavigationItemGeneric
          renderProps={({ active, onClick }) => (
            <AppHorNavItem
              key={index}
              theme={{ colorSet, padding }}
              active={active}
              onClick={onClick}
            >
              {item.label}
            </AppHorNavItem>
          )}
          key={index}
          data={{
            to: item.to_element_id,
            active:
              item.to_element_id === items[activeLinkIndex || 0].to_element_id,
          }}
        ></ScrollingNavigationItemGeneric>
      ))}
    </NavContainerNew>
  );
};

export default HorizontalNavBar;
