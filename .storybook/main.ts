import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    // takes you through some of the Storybook features
    // "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    
    // DESIGN TOKENS in STORYBOOK
    'storybook-design-token',
    // By default, the addon parses all .css, .scss, .less, .svg, .jpeg, .png
    // and .gif files of your code base for annotated design tokens. If you
    // only want to parse specific files, you can pass a glob via the
    // DESIGN_TOKEN_GLOB environment variable or via an option in your main.js.
    // For example:
    // DESIGN_TOKEN_GLOB=**/*.tokens.{css,scss,less,svg}

    // ACCESSIBILITY in STORYBOOK
    // "@storybook/addon-a11y",
  ],
  docs: {
    autodocs: "tag",
  },
};

export default config;
