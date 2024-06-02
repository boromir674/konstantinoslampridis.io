import * as React from 'react';

// Define your own Theme type. This is a placeholder and should be replaced with your actual Theme type.
interface Theme {}

// Define your own SxProps type. This is a placeholder and should be replaced with your actual SxProps type.
interface SxProps {
  [key: string]: any;
}

export type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'inherit';

export interface TypographyProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color?: 'initial' | 'inherit' | 'primary' | 'secondary' | 'textPrimary' | 'textSecondary' | 'error';
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   * By default, it's a 'p' tag when 'variant' is 'body1' or 'body2', and a 'span' tag otherwise.
   */
  component?: React.ElementType;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps;
  /**
   * Applies the theme typography styles.
   * @default 'body1'
   */
  variant?: Variant;
  /**
   * The ARIA role of the component.
   */
  role?: string;
  /**
   * The component maps the variant prop to a range of different HTML element types.
   * For instance, subtitle1 to `<h6>`.
   * If you wish to change that mapping, you can provide your own.
   * Alternatively, you can use the `component` prop.
   */
  variantMapping?: Partial<Record<Variant, string>>;
  /**
    * If `true`, the text will have a bottom margin.
    * @default false
   */
  gutterBottom?: boolean;
}

export type TypographyTypeMap<AdditionalProps = {}, RootComponent extends React.ElementType = 'span'> = {
  props: AdditionalProps & TypographyProps;
  defaultComponent: RootComponent;
};

/**
 * `TypographyPropsVariantOverrides` is a type used to override the styles of specific typography variants.
 * Currently, it's an empty object, which means no overrides are defined.
 * To use it, add keys that match the variant names (like 'h1', 'h2', etc.) and values that are objects containing the CSS properties to override.
 * For example, to override the font size of 'h1', you would do:
 * 
 * ```typescript
 * export type TypographyPropsVariantOverrides = {
 *   h1: {
 *     fontSize: '32px',
 *   },
 * };
 * ```
 * 
 * This would apply a font size of '32px' to all 'h1' variants of the Typography component.
 */
export type TypographyPropsVariantOverrides = {};