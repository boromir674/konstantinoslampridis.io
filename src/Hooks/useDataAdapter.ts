/** Provides Hook supplies a Callback to adapt Build Time Data to the App interface */

import { useCallback } from "react";

import { UserDefinedTextData as BuilTimeData } from '../types';


// Hook supplying a Callback to adapt Build Time Data to the App interface
const useDataAdapterCallback = () => {
    const adaptData = useCallback((buildTimeData: BuilTimeData) => {
        // be invariant of any assumption about the order the Links are inside the array
        const name2Url = buildTimeData.personal.links.reduce(
            (acc: any, { name, id, url }: any) => ({ ...acc, [id]: url }),
            {}
        );
        const appData = {
            verticalMainPane: {
                introduction: {
                    name: buildTimeData.personal.name,
                },
                professional: buildTimeData.professional.experience_items,

                portfolio: buildTimeData.portfolio.map((item: BuilTimeData['portfolio'][0]) => ({
                    ...item,
                    release: item.release.map((release) => ({
                        ...release,
                        urlText: release.url,
                    })),
                })),
            },

            verticalSidePane: {
                personal: {
                    name: buildTimeData.personal.name,
                    email: buildTimeData.personal.email,
                    // Order of Links is hard-coded in Component's JSX; TODO: allow Data-Driven order Design
                    github: name2Url["github"],
                    gitlab: name2Url["gitlab"],
                    linkedin: name2Url["linkedin"],
                },
                education: buildTimeData.education.map(
                    // (item, _index) => ({
                    (item) => ({
                        degree_title: item.degree,
                        university_name: item.name,
                        location: item.location,
                        duration: item.date,
                        thesis_title: item.thesis_title,
                        topics: item.topics,
                    })
                ),
            },
        }
        return appData;
    }, []);
    return [adaptData];
};


export { useDataAdapterCallback };
