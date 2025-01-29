import React, { FC, CSSProperties, forwardRef } from "react";
import {
  TypographyProps as MuiTypographyProps,
  Variant,
} from "./TypographyInterface";

interface TypographyProps extends MuiTypographyProps {
  style?: CSSProperties;
  ref?: React.Ref<HTMLElement>;
}

const defaultVariantMapping: Record<Variant, string> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  subtitle1: "h6",
  subtitle2: "h6",
  body1: "p",
  body2: "p",
  inherit: "p",
};

const Typography: FC<TypographyProps> = forwardRef(({
  variant = "body1",
  component,
  children,
  variantMapping = defaultVariantMapping,
  gutterBottom = false,
  style = {},
  ...otherProps
}, ref) => {
  const combinedStyle = {
    ...style,
    marginBottom: gutterBottom ? "1em" : undefined,
  };
  const Component = component || variantMapping[variant] || "span";
  return React.createElement(
    Component,
    { ...otherProps, style: combinedStyle , ref},
    children
  );
});

export default Typography;
