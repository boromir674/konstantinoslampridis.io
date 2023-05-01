import { FC, useState, useEffect } from "react";
import styled from "@emotion/styled";
import ScrollingNavigationItem from "./ScrollingNavigationItemGeneric";
import useHandleNavigationClickFunction from '../Hooks/useNavigationClickHandler';
import useScreenScrollHandler from '../Hooks/useScreenScrollHandler';

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

interface NavItemProps {
  colorSet: {
    textColor: string;
    backgroundColor: string;
    hoverBackgroundColor: string;
    hoverTextColor: string;
    activatedTextColor: string;
    activatedBackgroundColor: string;
  };
  active: boolean;
  children?: React.ReactNode;
}

const NavItem = styled.a<NavItemProps>`
  //   color: #b3deff;
  border: 1px solid #ffcc80;
  border-radius: 5px;
  padding: 5px;

  display: block;
  flex-grow: 0;
  flex-shrink: 1;
  flex-basis: auto;
  align-self: auto;
  order: 0;

  // font-size: 18px;
  font-weight: bold;
  // background: "inherit";
  background: ${(props) =>
    props.active
      ? props.colorSet.activatedBackgroundColor
      : props.colorSet.backgroundColor};
  color: ${(props) =>
    props.active
      ? props.colorSet.activatedTextColor
      : props.colorSet.textColor};
  // color: "inherit";
  cursor: pointer;
  margin: 0 0px;
  // text-decoration: none;
  // flex: 1; // add this
  display: flex; // add this
  justify-content: center; // add this
  align-items: center; // add this

  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) => props.colorSet.hoverBackgroundColor};
    color: ${(props) => props.colorSet.hoverTextColor};
  }
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


const Header1Nav: FC<HeaderNavProps> = ({ items, colorSet }) => {
  
  const activeLinkIndex = useScreenScrollHandler(items);

    return (
        <NavContainerNew>
        {items.map((item, index) => (
            <ScrollingNavigationItem
            renderProps={({
                active,
                onClick,
            }) => <NavItem
                colorSet={colorSet}
                active={active}
                onClick={onClick}
                >{item.label}</NavItem>}
            key={index}
            data={{
                to: item.to_element_id,
                active: item.to_element_id === items[activeLinkIndex || 0].to_element_id,
            }}
            >
            </ScrollingNavigationItem>
        ))}
        </NavContainerNew>
    );
};


export default Header1Nav;
