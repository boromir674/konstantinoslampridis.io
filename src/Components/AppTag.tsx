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
  };
}

const AppTag = styled.span<AppTagProps>`
  // COLOR THEME
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.textColor};
  border-color: ${(props) => props.theme.outlineColor};
  &:hover {
    background-color: ${(props) => props.theme.onHoverBackgroundColor};
    color: ${(props) => props.theme.onHoverTextColor || props.theme.textColor};
  }
  // OTHER STYLES
  font-size: 14px;
  padding: 8px 12px;
  border-radius: 20px;
  margin: 4px;
  // configure border line width
  border-style: solid;
  transition: background-color 0.3s ease;
`;
export default AppTag;
export type { AppTagProps };
