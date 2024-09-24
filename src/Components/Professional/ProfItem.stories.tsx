import ProfItem, { type AppProfItemProps } from './ProfItem';
import { lightTheme, darkTheme } from '../../theme';

export default {
    component: ProfItem,
    title: "ProfItem",
    tags: ["autodocs"],
};


const LightProps: AppProfItemProps = {
    // same interface as the props of the Component
    theme: lightTheme.professional.item,
    experienceItemData: {
        title: "Software Engineer",
        company: "GG Navi",
        activities: ["I worked at GG Navi as a Software Engineer.", "other activity"],
        location: "Mountain View, CA",
        duration: "Sep 2022 - May 2023",
        description: "I worked at GG Navi as a Software Engineer.",
        technology_tags: ["python", 'docker'],
    },
};

export const Light = {
    args: {
        ...LightProps,
        item: {
            ...LightProps.experienceItemData,
            theme: {
                ...lightTheme.professional.item,
                title: {
                    fontFamily: 'times-new-roman',
                    fontSize: '30px',
                  },
            },
        }
    },
}


export const Dark = {
    args: {
        ...Light.args,
        theme: darkTheme.professional.item,
    },
};
