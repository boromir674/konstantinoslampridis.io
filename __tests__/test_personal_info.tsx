/**
 * @jest-environment jsdom
 */

// Test Helpers Imports
import React from "react";


// '@emotion/jest' matchers
// provides matchers such as toHaveStyleRule
import { matchers } from "@emotion/jest";

// Test by rendering in the DOM
import { render } from '@testing-library/react';
// import { toBeInTheDocument } from '@testing-library/jest-dom';

// for rendering in customizable viewports (ie custom width)
import { Context as ResponsiveContext } from "react-responsive";


// Add the custom matchers provided by '@emotion/jest'
// allows matchers such as: expect(tree).toHaveStyleRule('color', 'hotpink')
expect.extend(matchers);


// Business-logic Imports
import PersonalInfo, { PersonalInfoProps } from "../src/Components/PersonalInfo";
import { lightTheme } from '../src/theme';


type LinkData = {
    name: string;
    id: string;
    url: string;
};


///// TEST 1 /////
describe("Test Personal Section with width = 700", () => {
    beforeEach(() => null);

    afterEach(() => null);

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
            url: "gitlab.com/test"
        },
        {
            name: "linkedin",
            id: "linkedin",
            url: "test-linkedin-url"
        },
    ]

    // GIVEN a way to create the PersonalInfo Component Props
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
            github: name2Url["github"],
            gitlab: links[1].url,
            linkedin: name2Url["linkedin"],
        },
        theme: {
            ...lightTheme.personal,
            linkColor: lightTheme.personal.urlTextColor,
        }
    };


    it(`Verify font-family CSS properties have expected value`, () => {
        // WHEN we render the PersonalInfo Component in the Test DOM
        const { getByText } = render(<PersonalInfo {...args}/>);

        // THEN there should be a link with readable text 'test-github-url'
        const githubLink = getByText('test-github-url');
        // AND the HTML Element is an anchor <a>
        expect(githubLink.tagName).toBe('A');
        // AND the on Click the redirect is to https URL
        expect(githubLink.getAttribute('href')).toBe('https://test-github-url');

        // AND there should be a link with readable text 'gitlab.com/test'
        const gitlabLink = getByText('gitlab.com/test');

        // AND the HTML Element is an anchor <a>
        expect(gitlabLink.tagName).toBe('A');

        // AND there should be a link with readable text 'test-linkedin-url'
        const linkedinLink = getByText('test-linkedin-url');

        // AND the HTML Element is an anchor <a>
        expect(linkedinLink.tagName).toBe('A');

        // THEN all Text in Introduction Section should have the Secondary Font
        // const introSection = document.getElementById('introduction-section');
        // expect(introSection).toHaveStyleRule('font-family', EXPECTED_SECONDARY_FONT);


        // THEN the text of the Professional Section Title Header should have the Primary Font
        // const professionalSection = document.getElementById('professional-section');

        // query for the Section Title Header, which is the first h1 element 
        // const profSectionTitleHeader = professionalSection.querySelector('h1');
        // assert that the font-family is the expected Primary Font
        // expect(profSectionTitleHeader).toHaveStyleRule('font-family', EXPECTED_PRIMARY_FONT);

    })
});
