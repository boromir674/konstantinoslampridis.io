import { FC } from "react";
import styled from "@emotion/styled";
import ScrollingNavigationItemGeneric from "./ScrollingNavigationItemGeneric";
import useScreenScrollHandler from "../../Hooks/useScreenScrollHandler";
import AppHorNavItem from "./AppHorNavItem";

const NavContainerNew = styled.nav`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  // background: #ffecb3;
  background: "inherit";
`;

interface HeaderNavProps {
  items: {
    label: string;
    to_element_id: string;
  }[];
  activeItem: string;
  colorSet: {
    textColor: string;
    backgroundColor: string;
    hoverBackgroundColor: string;
    hoverTextColor: string;
    activatedTextColor: string;
    activatedBackgroundColor: string;
  };
}

const HorizontalNavBar: FC<HeaderNavProps> = ({ items, colorSet }) => {
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
              colorSet={colorSet}
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
