/* Storybook code for SVGIcon */


// import Component and Props Type
import IconSVG, { IconSVGProps } from './IconSVG';



// Configuration for rendering the component in storybook
export default {
    component: IconSVG,
    title: "IconSVG",
    tags: ["autodocs"],
};



////// Github Logo Icon - STORY 1 //////

// Input values through Props
const githubLogoIconInputProps: IconSVGProps["style"] = {
    // V1
    viewBox: "0 0 16 16",
    version: "1.1",
    'aria-hidden': "true",

    // avoid taking whole viewport in story lab web page
    width: "88",
    height: "86",
    // V2
    // xmlns="http://www.w3.org/2000/svg",
}

// Input values through Children
const githubLogoIconInputChildren: IconSVGProps["children"] = (
    <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
)

// Story Args
const githubLogoIconArgs: IconSVGProps = {
    style: githubLogoIconInputProps,
    children: githubLogoIconInputChildren,
}

// Story
export const GithubLogoIcon = {
    args: githubLogoIconArgs
}



////// Documentation Book Icon - STORY 2 //////

// Input values through Props
const documentationBookIconInputProps: IconSVGProps["style"] = {
    // V1
    viewBox: "0 0 20 20",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    // 'aria-hidden': "true",

    // avoid taking whole viewport in story lab web page
    width: "88",
    height: "86",
}

// Input values through Children
const documentationBookIconInputChildren: IconSVGProps["children"] = (
    <g>
        <path
            // fill-rule="evenodd"
            d="M 3 1 L 3 3 L 2 3 L 2 4 L 3 4 L 3 5 L 2 5 L 2 6 L 3 6 L 3 7 L 2 7 L 2 8 L 3 8 L 3 9 L 2 9 L 2 10 L 3 10 L 3 11 L 2 11 L 2 12 L 3 12 L 3 13 L 2 13 L 2 14 L 3 14 L 3 15 L 2 15 L 2 16 L 3 16 L 3 17 L 2 17 L 2 18 L 3 18 L 3 20 L 18 20 L 18 1 L 3 1 z M 4 2 L 17 2 L 17 19 L 4 19 L 4 18 L 5 18 L 5 17 L 4 17 L 4 16 L 5 16 L 5 15 L 4 15 L 4 14 L 5 14 L 5 13 L 4 13 L 4 12 L 5 12 L 5 11 L 4 11 L 4 10 L 5 10 L 5 9 L 4 9 L 4 8 L 5 8 L 5 7 L 4 7 L 4 6 L 5 6 L 5 5 L 4 5 L 4 4 L 5 4 L 5 3 L 4 3 L 4 2 z M 7 6 L 7 7 L 15 7 L 15 6 L 7 6 z M 8 8 L 8 9 L 14 9 L 14 8 L 8 8 z "
        >
        </path>
    </g>
)

// Story Args
const documentationBookIconArgs: IconSVGProps = {
    style: documentationBookIconInputProps,
    children: documentationBookIconInputChildren,
}

// Story
export const DocumentationBookIcon = {
    args: documentationBookIconArgs
}


////// Automation Gear Icon - STORY 3 //////

// Input values through Props
const automationGearIconInputProps: IconSVGProps["style"] = {
    fill: "#000000",
    viewBox: "0 0 330 330",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    // 'xmlns:xlink': "http://www.w3.org/1999/xlink",
    // 'aria-hidden': "true",

    // avoid taking whole viewport in story lab web page
    width: "88",
    height: "86",
}

// Input values through Children
const automationGearIconInputChildren: IconSVGProps["children"] = (
    <g>
        <path d="M315,120h-22.689c-1.587-4.488-3.415-8.893-5.476-13.196l16.05-16.051c5.858-5.857,5.858-15.355,0-21.213L260.46,27.114
c-5.857-5.858-15.355-5.858-21.213,0l-16.051,16.05c-4.303-2.06-8.707-3.887-13.196-5.476V15c0-8.284-6.716-15-15-15h-60
c-8.284,0-15,6.716-15,15v22.689c-4.488,1.588-8.893,3.415-13.195,5.475l-16.051-16.05c-5.857-5.859-15.355-5.858-21.213,0
L27.114,69.54c-2.813,2.813-4.394,6.628-4.394,10.606s1.58,7.794,4.394,10.606l16.051,16.051c-2.06,4.304-3.888,8.708-5.476,13.196
H15c-8.284,0-15,6.716-15,15v60c0,8.284,6.716,15,15,15h22.689c1.588,4.488,3.416,8.893,5.476,13.196l-16.051,16.051
c-2.813,2.813-4.394,6.628-4.394,10.606s1.58,7.794,4.394,10.606l42.428,42.426c5.858,5.859,15.355,5.857,21.213,0l16.051-16.05
c4.302,2.06,8.706,3.887,13.194,5.475V315c0,8.284,6.716,15,15,15h60c8.284,0,15-6.716,15-15v-22.689
c4.489-1.589,8.894-3.416,13.196-5.476l16.051,16.05c5.857,5.857,15.355,5.857,21.213,0l42.426-42.426
c5.858-5.857,5.858-15.355,0-21.213l-16.05-16.051c2.061-4.304,3.889-8.708,5.476-13.196H315c8.284,0,15-6.716,15-15v-60
C330,126.716,323.284,120,315,120z M300,180h-18.781c-6.845,0-12.822,4.634-14.527,11.263c-2.436,9.472-6.213,18.576-11.227,27.06
c-3.482,5.894-2.533,13.396,2.308,18.237l13.294,13.294l-21.213,21.213l-13.294-13.294c-4.84-4.84-12.342-5.788-18.237-2.308
c-8.479,5.011-17.584,8.788-27.062,11.228c-6.628,1.706-11.261,7.683-11.261,14.526V300h-30v-18.781
c0-6.844-4.633-12.82-11.261-14.526c-9.476-2.44-18.579-6.217-27.06-11.228c-5.895-3.482-13.396-2.533-18.237,2.308l-13.294,13.294
l-21.215-21.213l13.294-13.294c4.841-4.84,5.79-12.343,2.308-18.236c-5.011-8.481-8.789-17.587-11.228-27.063
C61.602,184.633,55.625,180,48.781,180H30v-30h18.781c6.844,0,12.82-4.633,14.526-11.261c2.439-9.476,6.217-18.581,11.228-27.063
c3.482-5.894,2.533-13.397-2.308-18.236L58.934,80.146l21.214-21.213l13.294,13.294c4.84,4.84,12.345,5.79,18.237,2.308
c8.479-5.011,17.584-8.788,27.061-11.228C145.367,61.602,150,55.625,150,48.781V30h30v18.781c0,6.844,4.633,12.82,11.261,14.526
c9.478,2.44,18.583,6.217,27.062,11.228c5.893,3.48,13.396,2.533,18.237-2.308l13.294-13.294l21.213,21.213L257.772,93.44
c-4.841,4.841-5.79,12.344-2.308,18.237c5.014,8.483,8.79,17.588,11.227,27.06c1.705,6.629,7.683,11.263,14.527,11.263H300V180z"/>
        <path d="M203.95,152.28l-48-30c-4.624-2.891-10.453-3.043-15.222-0.4c-4.77,2.644-7.729,7.667-7.729,13.12v60
c0,5.453,2.959,10.477,7.729,13.12c2.266,1.255,4.77,1.88,7.271,1.88c2.764,0,5.523-0.763,7.95-2.28l48-30
c4.386-2.741,7.05-7.548,7.05-12.72S208.336,155.021,203.95,152.28z"/>
    </g>
)

// Story Args
const automationGearIconArgs: IconSVGProps = {
    style: automationGearIconInputProps,
    children: automationGearIconInputChildren,
}

// Story
export const AutomationGearIcon = {
    args: automationGearIconArgs
}


////// Deploy Icon - STORY 4 //////
// ROCKET - RELEASES ICON

// Input values through Props
const deployIconInputProps: IconSVGProps["style"] = {
    // fill: "#000000",
    viewBox: "0 0 24 24",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    // 'aria-hidden': "true",

    // avoid taking whole viewport in story lab web page
    width: "88",
    height: "86",
}

// Input values through Children
const deployIconInputChildren: IconSVGProps["children"] = (
    <path
        d="M8.95305171,17.9846747 C8.72737466,19.1334216 7.71488744,20 6.5,20 L4.5,20 C4.22385763,20 4,19.7761424 4,19.5 L4,17.5 C4,16.2851126 4.86657841,15.2726253 6.0153253,15.0469483 L6.02714614,14.7041437 C6.04713299,14.1245251 6.10682628,13.555636 6.20352226,13 L2.5,13 C2.1462677,13 1.90438878,12.6427369 2.03576165,12.3143047 L4.03576165,7.31430466 C4.11169333,7.12447547 4.29554771,7 4.5,7 L9,7 C9.02538451,7 9.05032719,7.00189166 9.07469478,7.0055417 C11.4290981,4.32146349 14.9247139,2.67696313 18.771296,2.80960389 C19.3819666,2.8306615 19.9902263,2.89709634 20.5910446,3.008359 C20.7946429,3.04606238 20.9539376,3.20535713 20.991641,3.40895537 C21.812186,7.83989855 20.1522623,12.1558183 16.9947249,14.9271075 C16.9982004,14.9509022 17,14.9752409 17,15 L17,19.5 C17,19.7044523 16.8755245,19.8883067 16.6856953,19.9642383 L11.6856953,21.9642383 C11.3572631,22.0956112 11,21.8537323 11,21.5 L11,17.7949378 C10.4368132,17.8936903 9.86739064,17.9531458 9.29585627,17.9728539 L8.95305171,17.9846747 Z M7.98749247,17.6945992 L6.30540075,16.0125075 C5.56890748,16.1079151 5,16.7375198 5,17.5 L5,19 L6.5,19 C7.26248018,19 7.8920849,18.4310925 7.98749247,17.6945992 L7.98749247,17.6945992 Z M12,17.5770127 L12,20.7614835 L16,19.1614835 L16,15.7132231 C14.8178863,16.5520811 13.4713529,17.1925443 12,17.5770127 L12,17.5770127 Z M6.42079004,12 C6.80202391,10.5414825 7.44257093,9.19144113 8.28872675,8 L4.83851648,8 L3.23851648,12 L6.42079004,12 L6.42079004,12 Z M8.69991595,16.9928092 L9.26139399,16.9734479 C9.82252402,16.9540985 10.3814387,16.8930532 10.9335157,16.7908167 C16.9701904,15.672914 20.9957193,9.95997934 20.0664857,3.93363717 C19.626205,3.86599452 19.1822172,3.82436794 18.7368337,3.80900989 C12.4850041,3.59342956 7.24213247,8.48677642 7.02655214,14.738606 L7.00719083,15.300084 L8.69991595,16.9928092 Z M14,13 C12.3431458,13 11,11.6568542 11,10 C11,8.34314575 12.3431458,7 14,7 C15.6568542,7 17,8.34314575 17,10 C17,11.6568542 15.6568542,13 14,13 Z M14,12 C15.1045695,12 16,11.1045695 16,10 C16,8.8954305 15.1045695,8 14,8 C12.8954305,8 12,8.8954305 12,10 C12,11.1045695 12.8954305,12 14,12 Z"
    />
)

// Story Args
const deployIconArgs: IconSVGProps = {
    style: deployIconInputProps,
    children: deployIconInputChildren,
}

// Story
export const DeployIcon = {
    args: deployIconArgs
}


////// Deployment Icon - STORY 5 //////

// Story Args
const deploymentIconArgs: IconSVGProps = {
    // STYLES to pass to inner SVG
    style: {
        // fill: "#000000",
        viewBox: "0 0 24 24",
        version: "1.1",
        xmlns: "http://www.w3.org/2000/svg",
        // 'aria-hidden': "true",

        // avoid taking whole viewport in story lab web page
        width: "88",
        height: "86",
    },
    // CHILDREN to pass to inner SVG
    children: (
        <g id="deployment">
            <g>
                <path d="M12.4,24c-0.2,0-0.4,0-0.5-0.1c-0.6-0.2-1.1-0.7-1.3-1.4L10,19.2c-0.1-0.5-0.3-0.9-0.6-1.2l-3.3-3.3
                c-0.3-0.3-0.7-0.5-1.2-0.6l-3.4-0.7c-0.7-0.1-1.2-0.6-1.4-1.3c-0.2-0.6,0-1.3,0.5-1.8l2.6-2.6C4,6.9,5.1,6.3,6.3,6.3h3.1
                c0.8-0.9,1.6-1.8,2.4-2.6C17.5-2,22.7,0.5,22.9,0.6l0.3,0.2l0.2,0.3c0.1,0.2,2.5,5.5-3.1,11.1c-0.9,0.9-1.8,1.7-2.6,2.4v3.1
                c0,1.2-0.5,2.2-1.3,3.1l-2.6,2.6C13.4,23.8,12.9,24,12.4,24z M2.2,11.5l3.1,0.6c0.8,0.2,1.6,0.6,2.2,1.2l3.3,3.3
                c0.6,0.6,1,1.4,1.2,2.2l0.6,3.1l2.4-2.4c0.4-0.4,0.7-1,0.7-1.6v-4l0.4-0.3c1-0.8,1.9-1.7,2.9-2.6c3.9-3.9,3.2-7.4,2.9-8.5
                c-1.1-0.4-4.6-1-8.5,2.9c-0.9,0.9-1.8,1.9-2.6,2.9l-0.3,0.4h-4c-0.6,0-1.2,0.2-1.6,0.7L2.2,11.5z M2.1,24L2.1,24
                c-0.8,0-1.3-0.1-1.6-0.4c-0.2-0.2-0.7-0.7-0.3-3.1c0.2-1.1,0.5-2.6,1.3-3.4c1.5-1.5,4-1.5,5.4,0c1.5,1.5,1.5,3.9,0,5.4
                C5.8,23.7,3.3,24,2.1,24z M4.3,18c-0.5,0-1,0.2-1.3,0.5C2.4,19.1,2.1,21,2.1,22c1,0,2.9-0.3,3.5-0.8c0.7-0.7,0.7-1.9,0-2.6
                C5.2,18.2,4.7,18,4.3,18z"/>
            </g>
            <g>
                <path d="M17,10c-1.7,0-3-1.3-3-3s1.3-3,3-3s3,1.3,3,3S18.7,10,17,10z M17,6c-0.6,0-1,0.4-1,1s0.4,1,1,1s1-0.4,1-1S17.6,6,17,6z" />
            </g>
        </g>
    ),
}

// Story
export const DeploymentIcon = {
    args: deploymentIconArgs
}


////// Efficiency Icon - STORY 6 //////

// Story Args
const efficiencyIconArgs: IconSVGProps = {
    // STYLES to pass to inner SVG
    style: {
        // fill: "#000000",
        viewBox: "0 0 330 330",
        version: "1.1",
        xmlns: "http://www.w3.org/2000/svg",
        // 'aria-hidden': "true",

        // avoid taking whole viewport in story lab web page
        width: "88",
        height: "86",
    },
    // CHILDREN to pass to inner SVG
    children: (
        <g>
            <path d="M315,120h-22.688c-1.588-4.487-3.416-8.893-5.477-13.196l16.05-16.05c5.858-5.858,5.858-15.355,0.001-21.213
                l-42.426-42.427c-2.813-2.813-6.629-4.394-10.607-4.394c-3.978,0-7.793,1.58-10.606,4.394l-16.051,16.05
                c-4.304-2.061-8.708-3.888-13.196-5.476V15c0-8.284-6.716-15-15-15h-60c-8.284,0-15,6.716-15,15v22.688
                c-4.488,1.588-8.893,3.416-13.195,5.476l-16.051-16.05c-5.857-5.858-15.355-5.858-21.213,0L27.114,69.541
                c-5.858,5.858-5.858,15.355,0,21.213l16.05,16.051c-2.06,4.303-3.887,8.707-5.475,13.195H15c-8.284,0-15,6.716-15,15v60
                c0,8.284,6.716,15,15,15h22.689c1.588,4.487,3.416,8.893,5.475,13.195l-16.05,16.051c-2.813,2.813-4.394,6.628-4.394,10.606
                c0,3.979,1.58,7.794,4.394,10.607l42.428,42.426c5.858,5.857,15.355,5.857,21.212,0l16.052-16.049
                c4.304,2.06,8.707,3.888,13.194,5.476V315c0,8.284,6.716,15,15,15h60c8.284,0,15-6.716,15-15v-22.689
                c4.488-1.588,8.893-3.415,13.196-5.476l16.052,16.05c5.857,5.857,15.354,5.858,21.212-0.001l42.426-42.426
                c5.858-5.858,5.858-15.355,0-21.213l-16.05-16.05c2.061-4.303,3.889-8.708,5.477-13.196H315c8.284,0,15-6.716,15-15v-60
                C330,126.716,323.284,120,315,120z M300,180h-18.781c-6.846,0-12.822,4.634-14.527,11.264c-2.435,9.469-6.213,18.573-11.227,27.058
                c-3.482,5.893-2.533,13.397,2.308,18.237l13.294,13.294l-21.213,21.213l-13.295-13.293c-4.839-4.839-12.342-5.789-18.234-2.308
                c-8.485,5.012-17.591,8.79-27.063,11.229C184.633,268.399,180,274.375,180,281.22V300h-30v-18.78
                c0-6.844-4.633-12.82-11.261-14.526c-9.471-2.438-18.575-6.216-27.062-11.229c-5.894-3.482-13.395-2.532-18.234,2.308
                l-13.295,13.293l-21.215-21.214l13.294-13.294c4.841-4.84,5.79-12.343,2.308-18.236c-5.012-8.483-8.789-17.588-11.228-27.061
                C61.602,184.633,55.625,180,48.781,180H30v-30h18.781c6.844,0,12.82-4.633,14.526-11.261c2.438-9.474,6.216-18.579,11.228-27.062
                c3.482-5.893,2.533-13.396-2.308-18.236L58.934,80.147l21.214-21.213l13.294,13.293c4.84,4.84,12.344,5.79,18.236,2.308
                c8.484-5.013,17.59-8.79,27.062-11.229C145.367,61.601,150,55.625,150,48.78V30h30v18.78c0,6.844,4.633,12.82,11.261,14.526
                c9.474,2.439,18.579,6.216,27.063,11.229c5.894,3.481,13.396,2.532,18.236-2.308l13.294-13.293l21.213,21.213l-13.294,13.294
                c-4.841,4.84-5.79,12.344-2.308,18.237c5.014,8.484,8.791,17.588,11.227,27.058c1.705,6.629,7.682,11.263,14.527,11.263H300V180z"
            />
            <path d="M186.394,132.394L152,166.787l-9.394-9.393c-5.857-5.858-15.355-5.858-21.213,0c-5.858,5.858-5.858,15.355,0,21.213l20,20
                C144.322,201.536,148.161,203,152,203c3.839,0,7.678-1.464,10.606-4.394l45-45c5.858-5.858,5.858-15.355,0-21.213
                C201.749,126.535,192.251,126.535,186.394,132.394z"/>
        </g>
    )
}

// Story
export const EfficiencyIcon = {
    args: efficiencyIconArgs
}


////// Pipeline Icon - STORY 7 //////

// Story Args
const pipelineIconArgs: IconSVGProps = {
    // STYLES to pass to inner SVG
    style: {
        // fill: "#000000",
        viewBox: "0 0 16 16",
        version: "1.1",
        xmlns: "http://www.w3.org/2000/svg",
        // 'aria-hidden': "true",

        // avoid taking whole viewport in story lab web page
        width: "88",
        height: "86",
    },
    // CHILDREN to pass to inner SVG
    children: (
        <path fill="#000000" fill-rule="evenodd"
            d="M2.75 2.5A1.75 1.75 0 001 4.25v1C1 6.216 1.784 7 2.75 7h1a1.75 1.75 0 001.732-1.5H6.5a.75.75 0 01.75.75v3.5A2.25 2.25 0 009.5 12h1.018c.121.848.85 1.5 1.732 1.5h1A1.75 1.75 0 0015 11.75v-1A1.75 1.75 0 0013.25 9h-1a1.75 1.75 0 00-1.732 1.5H9.5a.75.75 0 01-.75-.75v-3.5A2.25 2.25 0 006.5 4H5.482A1.75 1.75 0 003.75 2.5h-1zM2.5 4.25A.25.25 0 012.75 4h1a.25.25 0 01.25.25v1a.25.25 0 01-.25.25h-1a.25.25 0 01-.25-.25v-1zm9.75 6.25a.25.25 0 00-.25.25v1c0 .138.112.25.25.25h1a.25.25 0 00.25-.25v-1a.25.25 0 00-.25-.25h-1z"
            clip-rule="evenodd" />
    )
}

// Story
export const PipelineIcon = {
    args: pipelineIconArgs
}


////// Resource Group Icon - STORY 8 //////

// Story Args
const resourceGroupIconArgs: IconSVGProps = {
    // STYLES to pass to inner SVG
    style: {
        // fill: "#000000",
        viewBox: "0 0 76 76",
        version: "1.1",
        xmlns: "http://www.w3.org/2000/svg",
        // 'aria-hidden': "true",

        // avoid taking whole viewport in story lab web page
        width: "88",
        height: "86",
    },
    // CHILDREN to pass to inner SVG
    children: (
        <>
            <path fill="#000000" fill-opacity="0.701961" stroke-width="0.2" stroke-linejoin="round" d="M 24,46.9792L 24,31.5L 37,38.9286L 37,54.4271L 24,46.9792 Z " />
            <path fill="#000000" fill-opacity="0.403922" stroke-width="0.2" stroke-linejoin="round" d="M 52,31.5L 52,46.9792L 39,54.4271L 39,38.9286L 52,31.5 Z " />
            <path fill="#000000" fill-opacity="1" stroke-width="0.2" stroke-linejoin="round" d="M 38,21L 51.75,29L 38,37L 24.25,29L 38,21 Z M 21,49.5L 28.5078,53.8682L 26.5625,55L 26.4219,55L 18,50.1L 18,25.9001L 26.4219,21.0001L 26.5625,21.0001L 28.5078,22.1319L 21,26.5001L 21,49.5 Z M 54.9999,49.5L 55,26.5001L 47.4921,22.1319L 49.4375,21L 49.578,21L 58,25.9001L 57.9999,50.1L 49.578,55L 49.4375,55L 47.4921,53.8682L 54.9999,49.5 Z " />
        </>
    )
}

// Story
export const ResourceGroupIcon = {
    args: resourceGroupIconArgs
}
