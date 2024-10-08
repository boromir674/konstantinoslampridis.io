import PersonalInfo, { type PersonalInfoProps } from "./PersonalInfo";

import { lightTheme, darkTheme } from '../theme';

export default {
  component: PersonalInfo,
  title: "PersonalInfo",
  tags: ["autodocs"],
};

const LightProps: PersonalInfoProps = {
  userData: {
    name: "My Name",
    email: "email@gg.navi",
    github: "github.com/boromir674",
    gitlab: "gitlab.com/boromir674",
    linkedin: "linkedin/boromir674",
  },
  theme: {
    ...lightTheme.personal,
    infoItem: {
      ...lightTheme.personal.infoItem,
      key: {
        ...lightTheme.personal.infoItem.key,
        // fontFamily: 'Roboto, sans-serif',
        // fontSize: '26px',
      },
      value: {
        ...lightTheme.personal.infoItem.value,
        // fontFamily: 'sans-serif',
        // fontSize: '16px',
      },
    },
    linkColor: lightTheme.personal.urlTextColor,
  },
};

export const ProdLightMode = {
  args: LightProps,
}

const DarkProps: PersonalInfoProps = {
  ...LightProps,
  theme: {
    ...darkTheme.personal,
    linkColor: darkTheme.personal.urlTextColor,
  },
};

export const ProdDarkMode = {
  args: DarkProps,
}




// // Light Mode Colors
// const lightColors = {
//     background: "#F8F3E6",
//     text: "#4A4A4A",
//     primary: "#FFAD00",
//     secondary: "#B4654A",
//     accent: "#FF6B35",
//   };
  
//   // Dark Mode Colors
//   const darkColors = {
//     background: "#222222",
//     text: "#EDEDED",
//     primary: "#FFD700",
//     secondary: "#D98C66",
//     accent: "#FF8C00",
//   };

// export const Default = {
//     args: {
//       // same interface as the props of the Component
//       userData: {
//       name: "My Name",
//       email: "email@gg.navi",
//       github: "github.com/boromir674",
//       gitlab: "gitlab.com/boromir674",
//       linkedin: "lknin/boromir674",
//       },
//       theme: {
//           containerBackground: lightColors.background,
//           textColor: lightColors.text,
//           linkColor: '#2063e9',
//       }
//     },
// };

// export const DarkMode = {
//     args: {
//       ...Default.args,
//       theme: {
//           containerBackground: darkColors.background,
//           textColor: darkColors.text,
//           linkColor: '#2063e9',
//       }
//     },
//   };