import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    // Configuration for the https://storybook.js.org/addons/storybook-design-token addon
    // we define the default token to show in the Tokens tab
    designToken: {
      defaultTab: 'Colors'
    }
  },
};

export default preview;

// import '../src/index.css';

// //👇 Configures Storybook to log the actions( onArchiveTask and onPinTask ) in the UI.
// /** @type { import('@storybook/react').Preview } */
// const preview = {
//   parameters: {
//     actions: { argTypesRegex: "^on[A-Z].*" },
//     controls: {
//       matchers: {
//         color: /(background|color)$/i,
//         date: /Date$/,
//       },
//     },
//   },
// };

// export default preview;
