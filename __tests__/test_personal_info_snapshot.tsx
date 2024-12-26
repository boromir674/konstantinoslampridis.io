/**
* @jest-environment jsdom
*/

import React from "react";
// Helper for rendering in customizable viewports (ie custom width)
import { Context as ResponsiveContext } from "react-responsive";
import { render } from "@testing-library/react";

// Business-logic Imports
import PersonalInfo, { PersonalInfoProps } from "../src/Components/PersonalInfo";
import { lightTheme } from '../src/theme';


type LinkData = {
    name: string;
    id: string;
    url: string;
};

describe("Test Personal Section with width = 700", () => {

    // GIVEN an Array of Links
    const links: LinkData[] = [
        {
            name: "github",
            id: "github",
            url: "test-github-url"
        },
        {
            name: "gitlab",
            id: "gitlab",
            url: "test-gitlab-url"
        },
        {
            name: "linkedin",
            id: "linkedin",
            url: "test-linkedin-url"
        },
    ]

    const name2Url = links.reduce(
        (acc: any, { name, id, url }: any) => ({ ...acc, [id]: url }),
        {}
    );

    // PROPS VALUES
    const args: PersonalInfoProps = {
        // same interface as the props of the Component
        userData: {
            name: 'test-name',
            email: 'test-email',
            // github: name2Url["github"],
            github: links[0].url,
            gitlab: name2Url["gitlab"],
            linkedin: name2Url["linkedin"],
        },
        theme: {
            ...lightTheme.personal,
            linkColor: lightTheme.personal.urlTextColor,
        }

    };

    test("matches the snapshot", () => {
        // WHEN the Component is rendered in a Test DOM
        const { container: tree } = render(
            <ResponsiveContext.Provider value={{ width: 700 }}>
                <PersonalInfo {...args} />
            </ResponsiveContext.Provider>
        );  
        expect(tree).toMatchSnapshot();
        // AND there should be link with readable text 'test-github-url'
        // expect(tree).toHaveTextContent("test-linkedin-url");
    });
    
});
