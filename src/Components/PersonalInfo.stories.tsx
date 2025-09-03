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
    backgroundColorGradient: lightTheme.personal.backgroundColorGradient || { start: '#9c423b', end: '#725b2e' },
    colors: {
      focusRing: '#9c423b',
      socialBadgeBg: 'rgba(0,0,0,0.04)',
      socialBadgeBorder: '#857371',
      socialBadgeHoverBg: '#9c423b',
      socialBadgeHoverText: '#ffffff',
      docBadgeBgFrom: 'rgba(156,66,59,0.18)',
      docBadgeBgTo: 'rgba(156,66,59,0.04)',
      docBadgeHoverBgFrom: 'rgba(114,91,46,0.28)',
      docBadgeHoverBgTo: 'rgba(114,91,46,0.06)',
      docBadgeBeforeFrom: 'rgba(156,66,59,0.55)',
      docBadgeBeforeTo: 'rgba(156,66,59,0)',
      docBadgeFocusOutline: '#725b2e',
    },
    infoItem: {
      ...lightTheme.personal.infoItem,
      key: { ...lightTheme.personal.infoItem.key },
      value: { ...lightTheme.personal.infoItem.value },
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
    backgroundColorGradient: darkTheme.personal.backgroundColorGradient || { start: '#ffb4ac', end: '#e0c38c' },
    colors: {
      focusRing: darkTheme.personal.colors?.focusRing || '#ffb4ac',
      socialBadgeBorder: darkTheme.personal.colors?.socialBadgeBorder || '#a08c8a',
      // socialBadgeBg: 'rgba(255,255,255,0.08)',
      // socialBadgeHoverBg: '#ffb4ac',
      // socialBadgeHoverText: '#5f1412',

      // docBadgeBgFrom: 'rgba(255,180,172,0.22)',
      // docBadgeBgTo: 'rgba(255,180,172,0.06)',
      docBadgeBgFrom: darkTheme.personal.colors?.docBadgeBgFrom || undefined,
      docBadgeBgTo: darkTheme.personal.colors?.docBadgeBgFrom || undefined,

      // docBadgeHoverBgFrom: 'rgba(224,195,140,0.32)',
      // docBadgeHoverBgTo: 'rgba(224,195,140,0.08)',
      // docBadgeBeforeFrom: 'rgba(255,180,172,0.6)',
      // docBadgeBeforeTo: 'rgba(255,180,172,0)',
      // docBadgeFocusOutline: '#e0c38c',
    },
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