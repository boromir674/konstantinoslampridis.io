// Global type declarations for CSS modules
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export = classes;
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export = classes;
}

declare module '*.module.sass' {
  const classes: { [key: string]: string };
  export default classes;
}
