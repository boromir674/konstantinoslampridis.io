import AppProfSection from './AppProfSection';
import { lightTheme, darkTheme } from '../../AppStyles';

export default {
  component: AppProfSection,
  title: "AppProfSection",
  tags: ["autodocs"],
};

// 1: Light Mode Colors
export const LightMode = {
  args: {
      // same interface as the props of the Component
      data: {experience_items: [
        {
          title: "Software Engineer",
          company: "GG Navi",
          location: "Mountain View, CA",
          duration: "Sep 2022 - May 2023",
          description: "I worked at GG Navi as a Software Engineer.",
          technology_tags: ["python", 'docker'],
        },
        {
          title: "Software Engineer",
          company: "GG Navi",
          location: "Mountain View, CA",
          duration: "Sep 2022 - May 2023",
          description: "I worked at GG Navi as a Software Engineer.",
          technology_tags: ["python", 'docker'],
        },
      ]},
      theme: lightTheme.professional,
      // {
      //   item: lightTheme.professional.item,
      //   containerBackground: lightTheme.professional.containerBackground,
      // },
  },
};


// 2: Dark Mode Colors
export const DarkMode = {
  args: {
    ...LightMode.args,
    theme: darkTheme.professional,
    // theme: {
    //   item: darkTheme.professional.item,
    //   containerBackground: darkTheme.professional.containerBackground,
    // },
  },
};      



// // 3: Production Professional Data & Light Mode Colors
// interface UserDefinedProfessionalTextData {
//   professional: {
//     experience_items: {
//       title: string;
//       company: string;
//       location: string;
//       duration: string;
//       description: string;
//       activities?: string[];
//       technology_tags: string[];
//     }[];
//   };
// }

// let data;
// try {
//   // Read the YAML file
//   const yamlData = fs.readFileSync("data.yaml", "utf8");
//   // Parse the YAML data
//   // const data: UserDefinedProfessionalTextData = yaml.safeLoad(yamlData);
//   data = yaml.safeLoad(yamlData);
  
// } catch (error) {
//   console.error("Error reading or parsing YAML file:", error);
//   data = {};
//   // const data: UserDefinedProfessionalTextData = {
//   //   professional: LightMode.args.data
//   // };
// }

// export const ProdLightMode = {
//   args: {
//     ...LightMode.args,
//     ...data
//   },
// }; 


// // 4: Production Professional Data & Dark Mode Colors
// export const ProdDarkMode = {
//   args: {
//     ...DarkMode.args,
//     ...data
//   },
// };
