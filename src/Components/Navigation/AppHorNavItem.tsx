import styled from "@emotion/styled";

interface NavItemProps {
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
  active: boolean;
  children?: React.ReactNode;
}

const NavItem = styled.a<NavItemProps>`
  border: 1px solid #ffcc80;
  border-radius: 100px;
  
  letter-spacing: 3px;

  // padding
  padding-top: ${(props) => props.theme.padding.vertical};
  padding-bottom: ${(props) => props.theme.padding.vertical};
  padding-left: ${(props) => props.theme.padding.horizontal};
  padding-right: ${(props) => props.theme.padding.horizontal};

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
      ? props.theme.colorSet.activatedBackgroundColor
      : props.theme.colorSet.backgroundColor};
  color: ${(props) =>
    props.active
      ? props.theme.colorSet.activatedTextColor
      : props.theme.colorSet.textColor};
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
    background-color: ${(props) => props.theme.colorSet.hoverBackgroundColor};
    color: ${(props) => props.theme.colorSet.hoverTextColor};
  }
`;

export default NavItem;
export type { NavItemProps };
