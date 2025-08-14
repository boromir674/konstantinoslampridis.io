import styled from "@emotion/styled";

// interface AppTagProps {
//   backgroundColor: string;
//   textColor: string;
//     onHoverBackgroundColor: string;
//     onHoverTextColor?: string;
// }

// We try to stick to the convention that some Components act as a style layer
// Components in the Style Layer should only be concenred about styling, colors, etc
// thus a style layer component should/could be only associated with a theme props
interface AppTagProps {
  theme: {
    backgroundColor: string;
    textColor: string;
    onHoverBackgroundColor: string;
    onHoverTextColor?: string;
    outlineColor: string;
    fontFamily?: string;
    fontSize?: string;
  };
}

const AppTag = styled.span<AppTagProps>`
  // COLOR THEME
  // background-color: ${(props) => props.theme.backgroundColor};
  background-color: var(--app-surface-interactive-alt-bg, #f8f3e6);
  // color: ${(props) => props.theme.textColor};
  color: var(--app-surface-interactive-alt-color);
  border-color: ${(props) => props.theme.outlineColor};
  &:hover {
    background-color: ${(props) => props.theme.onHoverBackgroundColor};
    color: ${(props) => props.theme.onHoverTextColor || props.theme.textColor};
  }
  // OTHER STYLES
  font-family: ${(props) => props.theme.fontFamily || "inherit"};
  font-size: ${(props) => props.theme.fontSize || "inherit"};

  padding: 8px 12px;
  border-radius: 20px;
  margin: 4px;
  // configure border line width
  // border-style: solid;
  border: 0.5px, solid, ${(props) => props.theme.outlineColor};
  transition: background-color 0.3s ease;
`;
export default AppTag;
export type { AppTagProps };
