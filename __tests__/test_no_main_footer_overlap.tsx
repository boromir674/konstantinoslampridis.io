/**
* @jest-environment jsdom
*/

import React from "react";

// Test by rendering in a DOM
import { render } from '@testing-library/react';
// import '@testing-library/jest-dom';

// for rendering in customizable viewports (ie custom width)
import { Context as ResponsiveContext } from "react-responsive";


// Imports for Business Logic
import VerticalMainPane from '../src/Components/VerticalMainPane';
import BottomFooterPane from '../src/Components/BottomFooterPane';
import BigScreenView, { BigScreenViewProps } from "../src/Components/BigScreenView";

import { lightTheme } from '../src/theme';


// TEST DATA
const DATA = {
    introduction: {
        name: "John Doe",
    },
    professional: [
        {
            title: "Software Engineer",
            company: "GG Navi",
            location: "Mountain View, CA",
            duration: "Sep 2022 - May 2023",
            description: "I worked at GG Navi as a Software Engineer.",
            activities: [
                "I worked at GG Navi as a Software Engineer.",
                "other activity",
            ],
            technology_tags: ["python", "docker"],
        },
        {
            title: "Software Engineer",
            company: "GG Navi",
            location: "Mountain View, CA",
            duration: "Sep 2022 - May 2023",
            description: "I worked at GG Navi as a Software Engineer.",
            activities: [
                "I worked at GG Navi as a Software Engineer.",
                "other activity",
            ],
            technology_tags: ["python", "docker"],
        },
    ],
    portfolio: [
        // PROJECT 1
        {
            title: "Python Package Generator",
            development_period: "2020-2021",
            status: "Mature",
            description:
                "A CLI tool to generate a Python package with a single command.",
            source_code_repo: "boromir674/cookiecutter-python-package",
            resource_links: [
                {
                    url: 'https://github.com/example/repo',
                    type: 'github',
                },
                {
                    url: 'https://example.com/docs',
                    type: 'docs',
                },
                {
                    url: 'https://example.com/ci-cd',
                    type: 'ci/cd',
                },
            ],
            release: [
                {
                    type: "pypi",
                    name: "cookiecutter-python-package",
                    artifact_version: "2.4.0",
                    urlText: "https://pypi.org/projects/cookiecutter-python-package",
                },
                {
                    // docker pull boromir674/generate-python:v2.4.0
                    type: "docker",
                    name: "generate-python",
                    artifact_version: "v2.4.0",
                    urlText: "https://pypi.org/projects/cookiecutter-python-package",
                },
                {
                    type: "github",
                    name: "cookiecutter-python-package",
                    urlText: "https://pypi.org/projects/cookiecutter-python-package",
                    artifact_version: "v2.4.0",
                },
            ],
            tags: ["Python", "CLI", "Automation", "Docker"],
        },
        // PROJECT 2
        {
            title: "Neural Style Transfer",
            development_period: "2020-2021",
            status: "Stable",
            description:
                "Re-paint any image with the style of another image (ie Van Gogh painting) using a Neural Style Transfer algorithm, accessible through an easy-to-use CLI.",
            source_code_repo: "boromir674/neural-style-transfer",
            resource_links: [
                {
                    url: 'https://github.com/neural-style-transfer',
                    type: 'github',
                },
                {
                    url: 'https://neural-style-transfer.com/ci-cd',
                    type: 'ci/cd',
                },
            ],
            release: [
                {
                    type: "pypi",
                    artifact_version: "0.6.1",
                    name: "neural-style-transfer",
                    urlText: "https://pypi.org/projects/cookiecutter-python-package",
                },
                {
                    type: "docker",
                    name: "nst",
                    artifact_version: "v0.6.1",
                    urlText: "https://pypi.org/projects/cookiecutter-python-package",
                },
                {
                    type: "github",
                    name: "neural-style-transfer",
                    urlText: "https://pypi.org/projects/cookiecutter-python-package",
                    artifact_version: "v0.6.1",
                },

            ],
            tags: [
                "Neural Style Transfer",
                "Deep Learning",
                "Python",
                "Docker",
                "CLI",
                "Sphinx",
                "PyPI",
            ],
        },
        // PROJECT 3
        {
            title: "Topic Modeling Toolkit",
            development_period: "2018-2019",
            status: "Mature",
            description:
                "A Python library for Topic Modeling providing a unified interface facilitating various research operations. It is designed to be easily extensible, allowing developers to implement their own algorithms and plug them in the toolkit.",
            source_code_repo: "boromir674/topic-modeling-toolkit",
            resource_links: [
                {
                    url: 'https://github.com/neural-style-transfer',
                    type: 'github',
                },
            ],
            release: [
                {
                    type: "pypi",
                    artifact_version: "0.5.2",
                    name: "topic-modeling-toolkit",
                    urlText: "https://pypi.org/projects/cookiecutter-python-package",
                },
                {
                    type: "docker",
                    name: "topic-modeling",
                    artifact_version: "v0.5.2",
                    urlText: "https://pypi.org/projects/cookiecutter-python-package",
                },
                {
                    type: "github",
                    name: "topic-modeling-toolkit",
                    urlText: "https://pypi.org/projects/cookiecutter-python-package",
                    artifact_version: "v0.5.2",
                },
            ],
            tags: [
                "Machine Learning",
                "Unsupervised Learning",
                "Topic Modeling",
                "Regression Testing",
                "Python",
                "PyPI",
                "automation",
                "CLI",
            ],
        },
        // Project with 2 Releases
        {
            title: "Project with 2 Releases",
            development_period: "2018-2019",
            status: "Mature",
            description:
                "A Python library for Topic Modeling providing a unified interface facilitating various research operations. It is designed to be easily extensible, allowing developers to implement their own algorithms and plug them in the toolkit.",
            source_code_repo: "boromir674/repo-with-2-releases",
            resource_links: [
                {
                    url: 'https://github.com/repo-with-2-releases',
                    type: 'github',
                },
                {
                    url: 'https://repo-with-2-releases.com/ci-cd',
                    type: 'ci/cd',
                },
            ],
            release: [
                {
                    type: "pypi",
                    artifact_version: "0.5.2",
                    name: "repo-with-2-releases",
                    urlText: "https://pypi.org/projects/repo-with-2-releases",
                },
                {
                    type: "github",
                    name: "repo-with-2-releases",
                    urlText: "https://pypi.org/projects/repo-with-2-releases",
                    artifact_version: "v0.5.2",
                },
            ],
            tags: [
                "Machine Learning",
                "Unsupervised Learning",
                "Topic Modeling",
                "Regression Testing",
                "Python",
                "PyPI",
                "automation",
                "CLI",
            ],
        },
    ],
};

// Helper Code to adapt Lib Theme to App Theme
type LibTheme = typeof lightTheme;
type AppColorTheme = BigScreenViewProps["theme"];

// compute maximum number of Releases contained in a single portfolio item
const maxNumberOfReleasesPerPortfolioItems = DATA.portfolio.reduce(
    (acc, { release = [] }) => Math.max(acc, release.length),
    0
);
// compute maximum number of links contained in a single portfolio item
const maxNumberOfLinksPerPortfolioItems = DATA.portfolio.reduce(
    (acc, { resource_links = [] }) => Math.max(acc, resource_links.length),
    0
);

const computeTheme = (theme: LibTheme): AppColorTheme => {
    console.log("Lib Description Theme: ", theme.portfolio.item.projectDescription);
    const adaptTheme = (theme: LibTheme) => {
        return {
            containerBackgroundColor: theme.backgroundColor,
            topHeaderPane: {
                themeSwitch: theme.themeSwitch,
                navigationBar: theme.navigationBar,
                backgroundColor: theme.topHeaderPane.backgroundColor,
            },
            verticalSidePane: {
                personalInfo: {
                    // pass Theme Personal Color Design
                    ...theme.personal,
                    // adjust interface
                    linkColor: theme.personal.urlTextColor,
                },
                education: theme.education,
            },
            verticalMainPane: {
                introduction: theme.introduction,
                professional: theme.professional,
                portfolio: {
                    ...theme.portfolio,
                    item: {
                        ...theme.portfolio.item,
                        theme: {
                            // Portfolio Project Item - Project Title and Description
                            ...theme.portfolio.item,
                            links: {
                                ...theme.portfolio.item.resourceLinks,
                                item: {
                                    ...theme.portfolio.item.resourceLinks.item,
                                    icon: {
                                        svgStyles: {
                                            // TODO: supply from theme object
                                            width: "12px",
                                            height: "12px",
                                            fill: theme.portfolio.item.resourceLinks.item.color,
                                        },
                                    },
                                },
                            },
                            // Portfolio Project Item - Software Releases
                            releases: {
                                ...theme.portfolio.item.releases,
                                headerFontFamily: theme.portfolio.item.releases.fontFamily,
                                headerColor: theme.portfolio.item.releases.color,
                                releaseButtonTheme: {
                                    ...theme.portfolio.item.releases.item,
                                    icon: {
                                        svgStyles: {
                                            // TODO: supply from theme object
                                            width: "12px",
                                            height: "12px",
                                            fill: theme.portfolio.item.releases.item.color,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                // ...theme,
                // containerBackgroundColor: theme.backgroundColor,
            },
            bottomFooterPane: {
                ...theme.footerStyles,
                // svgStyles: {
                //   width: "15px",
                //   height: "15px",
                // }
            },
        };
    };
    const appTheme = adaptTheme(theme);

    console.log("Addapted Description Theme Artifact 1: ", appTheme.verticalMainPane.portfolio.item.projectDescription);
    console.log("Addapted Description Theme Artifact 2: ", appTheme.verticalMainPane.portfolio.item.theme.projectDescription);

    // Adapt 'icon' to 'icons' by crating an rray of the same item multiple times
    const adaptedAppTheme: AppColorTheme = {
        ...appTheme,
        verticalMainPane: {
            ...appTheme.verticalMainPane,
            portfolio: {
                ...appTheme.verticalMainPane.portfolio,
                item: {
                    ...appTheme.verticalMainPane.portfolio.item,
                    theme: {
                        ...appTheme.verticalMainPane.portfolio.item.theme,
                        links: {
                            ...appTheme.verticalMainPane.portfolio.item.theme.links,
                            item: {
                                ...appTheme.verticalMainPane.portfolio.item.theme.links.item,
                                icons: Array.from({ length: maxNumberOfLinksPerPortfolioItems }, () => appTheme.verticalMainPane.portfolio.item.theme.links.item.icon
                                ),
                            },
                        },
                        releases: {
                            ...appTheme.verticalMainPane.portfolio.item.theme.releases,
                            releaseButtonTheme: {
                                ...appTheme.verticalMainPane.portfolio.item.theme.releases.releaseButtonTheme,
                                icons: Array.from({ length: maxNumberOfReleasesPerPortfolioItems }, () => appTheme.verticalMainPane.portfolio.item.theme.releases.releaseButtonTheme.icon
                                ),
                            },
                        },
                    },
                },
            },
        },
    }
    console.log("Final Description Theme: ", adaptedAppTheme.verticalMainPane.portfolio.item.theme.projectDescription);

    return adaptedAppTheme;
};

const LIGHT_THEME: AppColorTheme = computeTheme(lightTheme);


// TEST CODE

beforeEach(() => {
    // mock ResizeObserver browser-api
    window.ResizeObserver = jest.fn().mockImplementation(() => ({
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
    }))
})
LIGHT_THEME.verticalMainPane.portfolio.item.theme.projectDescription.margin

///// TEST 1 /////
test("Main/Footer - Overlap: render fragment with Main and Footer and verify they do not overlap", () => {

    // render in DOM
    render(
        <>
            <VerticalMainPane id='unittest-main-pane' {...{
                theme: LIGHT_THEME.verticalMainPane,
                data: DATA,
            }} />
            <BottomFooterPane id='unittest-footer-pane' {...{
                theme: LIGHT_THEME.bottomFooterPane,
            }} />
        </>
    );

    const mainPane = document.getElementById('unittest-main-pane');
    const footerPane = document.getElementById('unittest-footer-pane');

    // assert queries elements are not null or undefined
    expect(mainPane).not.toBeNull();
    expect(footerPane).not.toBeNull();

    // test that after rendering the 2 elements do not overlap in content
    expect(mainPane).not.toEqual(footerPane);

    // test that after rendering the 2 elements do not overlap in position
    const mainPaneBottom = mainPane?.getBoundingClientRect().bottom;
    const footerPaneTop = footerPane?.getBoundingClientRect().top;

    // if the mainPaneBottom is less than the footerPaneTop, then the 2 elements overlap
    // if the mainPaneBottom is equal to the footerPaneTop, then the 2 elements touch
    // if the mainPaneBottom is greater than the footerPaneTop, then the 2 elements do not overlap

    // assert the two elements do not overlap, but "touch": equal
    expect(mainPaneBottom).toBeLessThanOrEqual(footerPaneTop);
    // verify no overlap, but also no "big gap" between the two elements
    expect(mainPaneBottom).toBeCloseTo(footerPaneTop, 0);

});


// BigScreenView PROPS VALUES for below Test Cases
const bigScreenViewProps: BigScreenViewProps = {
    // same interface as the props of the Component
    theme: LIGHT_THEME,
    data: {
        topHeaderPane: {
            sections: [
                { name: "Home", to_element_id: "home-section" },
                { name: "Portfolio", to_element_id: "portfolio-section" },
                { name: "Professional", to_element_id: "professional-section" },
            ],
            onToggle: (active: boolean) => {
                console.log("active: ", active);
            },
            // starting position of toggle, if true it is on the right
            active: true,
            // false -> left, true -> right
        },
        verticalSidePane: {
            personal: {
                name: "John Doe",
                email: "jd@email.io",
                github: "github.com/john-doe",
                gitlab: "gitlab.com/john-doe",
                linkedin: "linkedin.com/in/john-doe",
            },
            education: [
                {
                    degree_title: "MSc in Artificial Intelligence",
                    university_name: "University of Amsterdam",
                    location: "Amsterdam, Netherlands",
                    duration: "2014 - 2019",
                    thesis_title: "Political Spectrum Aware Topic Model",
                    topics: ["ML", "CV", "RL", "NLP"],
                },
                {
                    degree_title: "BSc in Applied Informatics",
                    university_name: "University of Macedonia",
                    location: "Thessaloniki, Greece",
                    duration: "2008 - 2013",
                    thesis_title: "Computational Analysis of Simplex Points Algorithm",
                    topics: [
                        "Operating Systems",
                        "Linear Programming",
                        "Discreet Mathematics",
                    ],
                },
            ],
        },
        verticalMainPane: {
            data: {
                introduction: {
                    name: "John Doe",
                },
                professional: [
                    {
                        title: "Software Engineer",
                        company: "GG Navi",
                        location: "Mountain View, CA",
                        duration: "Sep 2022 - May 2023",
                        description: "I worked at GG Navi as a Software Engineer.",
                        activities: [
                            "I worked at GG Navi as a Software Engineer.",
                            "other activity",
                        ],
                        technology_tags: ["python", "docker"],
                    },
                    {
                        title: "Software Engineer",
                        company: "GG Navi",
                        location: "Mountain View, CA",
                        duration: "Sep 2022 - May 2023",
                        description: "I worked at GG Navi as a Software Engineer.",
                        activities: [
                            "I worked at GG Navi as a Software Engineer.",
                            "other activity",
                        ],
                        technology_tags: ["python", "docker"],
                    },
                ],
                portfolio: [
                    // PROJECT 1
                    {
                        title: "Python Package Generator",
                        development_period: "2020-2021",
                        status: "Mature",
                        description:
                            "A CLI tool to generate a Python package with a single command.",
                        source_code_repo: "boromir674/cookiecutter-python-package",
                        resource_links: [
                            {
                                url: 'https://github.com/example/repo',
                                type: 'github',
                            },
                            {
                                url: 'https://example.com/docs',
                                type: 'docs',
                            },
                            {
                                url: 'https://example.com/ci-cd',
                                type: 'ci/cd',
                            },
                        ],
                        release: [
                            {
                                type: "pypi",
                                name: "cookiecutter-python-package",
                                artifact_version: "2.4.0",
                                urlText: "https://pypi.org/projects/cookiecutter-python-package",
                            },
                            {
                                // docker pull boromir674/generate-python:v2.4.0
                                type: "docker",
                                name: "generate-python",
                                artifact_version: "v2.4.0",
                                urlText: "https://pypi.org/projects/cookiecutter-python-package",
                            },
                            {
                                type: "github",
                                name: "cookiecutter-python-package",
                                urlText: "https://pypi.org/projects/cookiecutter-python-package",
                                artifact_version: "v2.4.0",
                            },
                        ],
                        tags: ["Python", "CLI", "Automation", "Docker"],
                    },
                    // PROJECT 2
                    {
                        title: "Neural Style Transfer",
                        development_period: "2020-2021",
                        status: "Stable",
                        description:
                            "Re-paint any image with the style of another image (ie Van Gogh painting) using a Neural Style Transfer algorithm, accessible through an easy-to-use CLI.",
                        source_code_repo: "boromir674/neural-style-transfer",
                        resource_links: [
                            {
                                url: 'https://github.com/neural-style-transfer',
                                type: 'github',
                            },
                            {
                                url: 'https://neural-style-transfer.com/ci-cd',
                                type: 'ci/cd',
                            },
                        ],
                        release: [
                            {
                                type: "pypi",
                                artifact_version: "0.6.1",
                                name: "neural-style-transfer",
                                urlText: "https://pypi.org/projects/cookiecutter-python-package",
                            },
                            {
                                type: "docker",
                                name: "nst",
                                artifact_version: "v0.6.1",
                                urlText: "https://pypi.org/projects/cookiecutter-python-package",
                            },
                            {
                                type: "github",
                                name: "neural-style-transfer",
                                urlText: "https://pypi.org/projects/cookiecutter-python-package",
                                artifact_version: "v0.6.1",
                            },

                        ],
                        tags: [
                            "Neural Style Transfer",
                            "Deep Learning",
                            "Python",
                            "Docker",
                            "CLI",
                            "Sphinx",
                            "PyPI",
                        ],
                    },
                    // PROJECT 3
                    {
                        title: "Topic Modeling Toolkit",
                        development_period: "2018-2019",
                        status: "Mature",
                        description:
                            "A Python library for Topic Modeling providing a unified interface facilitating various research operations. It is designed to be easily extensible, allowing developers to implement their own algorithms and plug them in the toolkit.",
                        source_code_repo: "boromir674/topic-modeling-toolkit",
                        resource_links: [
                            {
                                url: 'https://github.com/neural-style-transfer',
                                type: 'github',
                            },
                        ],
                        release: [
                            {
                                type: "pypi",
                                artifact_version: "0.5.2",
                                name: "topic-modeling-toolkit",
                                urlText: "https://pypi.org/projects/cookiecutter-python-package",
                            },
                            {
                                type: "docker",
                                name: "topic-modeling",
                                artifact_version: "v0.5.2",
                                urlText: "https://pypi.org/projects/cookiecutter-python-package",
                            },
                            {
                                type: "github",
                                name: "topic-modeling-toolkit",
                                urlText: "https://pypi.org/projects/cookiecutter-python-package",
                                artifact_version: "v0.5.2",
                            },
                        ],
                        tags: [
                            "Machine Learning",
                            "Unsupervised Learning",
                            "Topic Modeling",
                            "Regression Testing",
                            "Python",
                            "PyPI",
                            "automation",
                            "CLI",
                        ],
                    },
                    // Project with 2 Releases
                    {
                        title: "Project with 2 Releases",
                        development_period: "2018-2019",
                        status: "Mature",
                        description:
                            "A Python library for Topic Modeling providing a unified interface facilitating various research operations. It is designed to be easily extensible, allowing developers to implement their own algorithms and plug them in the toolkit.",
                        source_code_repo: "boromir674/repo-with-2-releases",
                        resource_links: [
                            {
                                url: 'https://github.com/repo-with-2-releases',
                                type: 'github',
                            },
                            {
                                url: 'https://repo-with-2-releases.com/ci-cd',
                                type: 'ci/cd',
                            },
                        ],
                        release: [
                            {
                                type: "pypi",
                                artifact_version: "0.5.2",
                                name: "repo-with-2-releases",
                                urlText: "https://pypi.org/projects/repo-with-2-releases",
                            },
                            {
                                type: "github",
                                name: "repo-with-2-releases",
                                urlText: "https://pypi.org/projects/repo-with-2-releases",
                                artifact_version: "v0.5.2",
                            },
                        ],
                        tags: [
                            "Machine Learning",
                            "Unsupervised Learning",
                            "Topic Modeling",
                            "Regression Testing",
                            "Python",
                            "PyPI",
                            "automation",
                            "CLI",
                        ],
                    },
                ],
            },
            // sectionIDs: [
            //     'unittest-introduction-section',
            //     'unittest-professional-section',
            //     'unittest-portfolio-section',
            // ],
        },
    },
    html: {
        verticalMainPaneID: "vertical-main-pane",
        bottomFooterPaneID: "bottom-footer-pane",
    }
};

///// TEST 2 /////
test("Main/Footer - Overlap: render BigScreenView verify Main and Footer do not overlap", () => {

    // render in DOM
    render(
        <BigScreenView {...bigScreenViewProps} />
    );

    // get VerticalMainPane element reference
    const verticalMainPane = document.getElementById('vertical-main-pane');

    // get BottomFooterPane element reference
    const bottomFooterPane = document.getElementById('bottom-footer-pane');

    // assert queries elements are not null or undefined
    expect(verticalMainPane).not.toBeNull();
    expect(bottomFooterPane).not.toBeNull();

    // test that after rendering the 2 elements do not overlap in position
    const verticalMainPaneBottom = verticalMainPane?.getBoundingClientRect().bottom;
    const bottomFooterPaneTop = bottomFooterPane?.getBoundingClientRect().top;

    // if the mainPaneBottom is less than the footerPaneTop, then the 2 elements overlap
    // if the mainPaneBottom is equal to the footerPaneTop, then the 2 elements touch
    // if the mainPaneBottom is greater than the footerPaneTop, then the 2 elements do not overlap

    // assert the two elements do not overlap, but "touch": equal
    expect(verticalMainPaneBottom).toBeLessThanOrEqual(bottomFooterPaneTop);
    // verify no overlap, but also no "big gap" between the two elements
    expect(verticalMainPaneBottom).toBeCloseTo(bottomFooterPaneTop, 0);
});

///// TEST 3 /////
test("Main/Footer - Overlap: render BigScreenView with width 350 and verify Main and Footer do not overlap", () => {

    // render in DOM
    const { container: mobile } = render(
        <ResponsiveContext.Provider value={{ width: 350 }}>
            <BigScreenView {...bigScreenViewProps} />
        </ResponsiveContext.Provider>
    );

    // get VerticalMainPane element reference
    const verticalMainPane = document.getElementById('vertical-main-pane');

    // get BottomFooterPane element reference
    const bottomFooterPane = document.getElementById('bottom-footer-pane');

    // assert queries elements are not null or undefined
    expect(verticalMainPane).not.toBeNull();
    expect(bottomFooterPane).not.toBeNull();

    // test that after rendering the 2 elements do not overlap in position
    const verticalMainPaneBottom = verticalMainPane?.getBoundingClientRect().bottom;
    const bottomFooterPaneTop = bottomFooterPane?.getBoundingClientRect().top;

    // if the mainPaneBottom is less than the footerPaneTop, then the 2 elements overlap
    // if the mainPaneBottom is equal to the footerPaneTop, then the 2 elements touch
    // if the mainPaneBottom is greater than the footerPaneTop, then the 2 elements do not overlap

    // assert the two elements do not overlap, but "touch": equal
    expect(verticalMainPaneBottom).toBeLessThanOrEqual(bottomFooterPaneTop);
    // verify no overlap, but also no "big gap" between the two elements
    expect(verticalMainPaneBottom).toBeCloseTo(bottomFooterPaneTop, 0);

});

///// TEST 4 /////
test("Main/Footer - Overlap: render BigScreenView with width 750 and verify Main and Footer do not overlap", () => {
    // render in DOM
    const { container: mobile } = render(
        <ResponsiveContext.Provider value={{ width: 750 }}>
            <BigScreenView {...bigScreenViewProps} />
        </ResponsiveContext.Provider>
    );

    // get VerticalMainPane element reference
    const verticalMainPane = document.getElementById('vertical-main-pane');

    // get BottomFooterPane element reference
    const bottomFooterPane = document.getElementById('bottom-footer-pane');

    // assert queries elements are not null or undefined
    expect(verticalMainPane).not.toBeNull();
    expect(bottomFooterPane).not.toBeNull();

    // test that after rendering the 2 elements do not overlap in position
    const verticalMainPaneBottom = verticalMainPane?.getBoundingClientRect().bottom;
    const bottomFooterPaneTop = bottomFooterPane?.getBoundingClientRect().top;

    // if the mainPaneBottom is less than the footerPaneTop, then the 2 elements overlap
    // if the mainPaneBottom is equal to the footerPaneTop, then the 2 elements touch
    // if the mainPaneBottom is greater than the footerPaneTop, then the 2 elements do not overlap

    // assert the two elements do not overlap, but "touch": equal
    expect(verticalMainPaneBottom).toBeLessThanOrEqual(bottomFooterPaneTop);
    // verify no overlap, but also no "big gap" between the two elements
    expect(verticalMainPaneBottom).toBeCloseTo(bottomFooterPaneTop, 0);

});
