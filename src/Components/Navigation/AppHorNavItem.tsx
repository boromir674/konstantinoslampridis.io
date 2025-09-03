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


// ALT Nav Item Design
// Border: --app-surface-interactive-alt-bg (using alt as border)
// Background: --app-accent-subtle-bg (very light accent wash)
// Text: --app-text-primary
// Hover: Use --app-surface-interactive-alt-* tokens

const NavItem = styled.a<NavItemProps>`

  // font-size: 18px;
  font-weight: bold;

  background: var(--app-surface-raised, ${(props) =>
    props.active
      ? props.theme.colorSet.activatedBackgroundColor
      : props.theme.colorSet.backgroundColor});
  color: var(--app-text-secondary, ${(props) =>
    props.active
      ? props.theme.colorSet.activatedTextColor
      : 'var(--app-text-secondary)'});

  // border: 1px solid var(--app-border-subtle);
  border: ${(props) => props.active ? '2px' : '1px'} solid ${(props) => props.active ? 'var(--app-brand-color-accent)' : 'var(--app-text-secondary)'};
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
