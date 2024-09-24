/**
* @jest-environment jsdom
*/

import React from "react";

// Required to mock the graphql query
import * as Gatsby from "gatsby"

// '@emotion/jest' matchers
// provides matchers such as toHaveStyleRule
import { matchers } from "@emotion/jest";

// Test by rendering in the DOM
import { render } from '@testing-library/react';

// for rendering in customizable viewports (ie custom width)
import { Context as ResponsiveContext } from "react-responsive";


// Add the custom matchers provided by '@emotion/jest'
// allows matchers such as: expect(tree).toHaveStyleRule('color', 'hotpink')
expect.extend(matchers);

// Imports for Business Logic
import App from '../src/Components/App';


// Mock values Objects

const grapghQLMockData = {
    "userDefinedWebsiteData": {
        "personal": {
            "name": "Konstantinos Lampridis",
            "email": "k.lampridis@hotmail.com",
            "phone": "+306942671779",
            "location": "Thessaloniki, Greece",
            "links": [
                {
                    "id": "github",
                    "name": "GitHub Account Profile",
                    "url": "github.com/boromir674"
                },
                {
                    "id": "gitlab",
                    "name": "Gitlab Account Profile",
                    "url": "gitlab.com/boromir674"
                },
                {
                    "id": "linkedin",
                    "name": "LinkedIn Account Profile",
                    "url": "linkedin.com/in/konstantinos-lampridis/"
                }
            ],
            "description": "Greetings and welcome, my name is Konstantinos Lampridis."
        },
        "education": [
            {
                "name": "University of Amsterdam",
                "location": "Amsterdam, Netherlands",
                "degree": "MSc in Artificial Intelligence",
                "thesis_title": "Political Spectrum Aware Topic Model",
                "date": "2014 - 2019",
                "topics": [
                    "Machine Learning",
                    "Computer Vision",
                    "Natural Language Processing",
                    "Autonomous Agents",
                    "Reinforcement Learning"
                ]
            },
            {
                "name": "University of Macedonia",
                "location": "Thessaloniki, Greece",
                "degree": "BSc in Applied Informatics",
                "thesis_title": "Exterior Point Simplex Algorithm Analysis",
                "date": "2008 - 2013",
                "topics": [
                    "Computer Programming",
                    "Computer Science",
                    "Data Structures",
                    "Algorithm Analysis",
                    "Software Engineering",
                    "Operating Systems",
                    "Computer Architecture",
                    "Discete Mathematics",
                    "Statistics",
                    "Micro/Macro Economics"
                ]
            }
        ],
        "professional": {
            "experience_items": [
                {
                    "title": "Tech Lead - Contractor",
                    "company": "Eco Development S.A.",
                    "location": "Fyliro - Thessaloniki, Greece",
                    "duration": "May 2023 - Present",
                    "description": "Supervisor of the 'Data Analytics' team, responsible for the development of the company's Machine Learning Models and Data Pipelines Infrastructure.\n",
                    "activities": [
                        "Engineering Data Pipelines to facilitate ETL wokflows",
                        "Auditing Eco Development's ML predictive models for mosquito abundance and disease risk",
                        "Redesigning the company's ML models to improve performance and scalability"
                    ],
                    "technology_tags": [
                        "Python",
                        "Machine Learning",
                        "Random Forest",
                        "Gradient Boosting Methods",
                        "Variational Autoencoders",
                        "Pandas",
                        "SQL",
                        "Pytest",
                        "GCP",
                        "BigQuery",
                        "Scrum/Agile"
                    ]
                },
                {
                    "title": "DevOps Engineer - Contractor",
                    "company": "Infovista SAS",
                    "location": "Massy, France - Remote",
                    "duration": "Sep 2022 - May 2023",
                    "description": "Member of the DevOps Enablement team, tasked with Platform Engineering, creating Automations, and CI/CD Pipelines.",
                    "activities": [
                        "Facilitated automated DevOps Compliance and Bill of Material (BoM) on-demand computing, by developing a new CLI tool",
                        "Enabled company managers to manage, track and mitigate whole portfolio's CVEs, by developing the API Backend of UI-driven app for handling managers' use cases",
                        "Enabled tracking of Automated Deployments and their Lifecycle, by implementing a custom Logging and Monitoring solution",
                        "Maintained the stability and reliability of the shared GitOps pipelines, which were critical to the CI/CD process for all portfolio's software at Infovista",
                        "Contributed to the library of shared Job Templates, which served as essential building blocks for teams to construct flexible CI/CD pipelines"
                    ],
                    "technology_tags": [
                        "Docker",
                        "Python",
                        "Git",
                        "Bash",
                        "Gitlab CI",
                        "Pytest",
                        "PostgreSQL",
                        "AWS",
                        "VMware",
                        "Jira/Confluence",
                        "Platform Engineering",
                        "Scum/Agile",
                        "GitOps"
                    ]
                },
                {
                    "title": "Senior Software Developer",
                    "company": "Alvin",
                    "location": "Thessaloniki, Greece",
                    "duration": "Feb 2022 - Apr 2022",
                    "description": "Alvin parses SQL metadata from popular \"Data Platforms\", such as Postgres, Redshift, Airflow, BigQuery, Tableau, Hive, etc and facilitates Data Governance Operations by providing a Software as a Service (SaaS) web app.\nWorking asynchronously and fully remotely on adding features and automating (backend) testing of our Data Governance SaaS product\n",
                    "activities": [
                        "Engineered a Test Framework to facilitate easier/automated testing of new integrations",
                        "Added new features for 'MySQL' and 'MS SQL Server' integrations in user-facing app",
                        "Implemented a GDPR \"delete user data\" feature, upon user request in user-facing app",
                        "Designed a process to facilitate faster collaborative development, version control (and merging strategies) and Continuous Integration (CI), throughout the release cycle."
                    ],
                    "technology_tags": [
                        "Python",
                        "FastAPI",
                        "Docker",
                        "Amundsen",
                        "VueJS",
                        "Automated Testing",
                        "Pytest",
                        "REST API",
                        "OpenAPI",
                        "AWS",
                        "Scrum/Agile"
                    ]
                },
                {
                    "title": "Full-stack Developer",
                    "company": "FeelRobotics BV",
                    "location": "Amsterdam, Netherlands",
                    "duration": "Mar 2020 - Mar 2021",
                    "description": "Member of the Technology team, working on various (web, mobile, desktop) stacks, being involved in all aspects of the software: design, development, (automated) testing, CI/CD.",
                    "activities": [
                        "Continuously contributing on the in-house 'Order Management \\& Dashboard' web app, fulfilling clients' orders coming from various webshops at real-time.",
                        "Increased web app security by implementing '2FA flow' involving 'QR-Code scanning'",
                        "Enabled sales for global customers in Australia, Indonesia, Hong-Kong and Singapore, by integrating our web app with the Invenco 3PL web API to periodically exchange data, using an authorized serverless app (AWS Lambda app)",
                        "Migrated web app's legacy \"http polling\" to real-time/event-driven solution  and achieve data exchange with the newly published Rakuten web API",
                        "Enabled web app autoamated invoice generation and delivery to customers, with custom solution.",
                        "Adding features for the IoT mobile (iOS \\& Android) app, providing a UI to allow inter-device Bluetooth communication.",
                        "Developed a Terminal App, providing a Wizard to guide Bluetooth Device Testing on factory-site."
                    ],
                    "technology_tags": [
                        "Python",
                        "Django",
                        "CircleCI",
                        "Docker",
                        "Pytest",
                        "Javascript",
                        "React",
                        "Bluetooth",
                        "AWS Lambda",
                        "AWS EB",
                        "AWS Cloudwatch",
                        "AWS SQS",
                        "HTML",
                        "CSS",
                        "Angular",
                        "Firebase",
                        "Scrum/Agile"
                    ]
                },
                {
                    "title": "Artificial Intelligence Specialist",
                    "company": "Nmbrs BV",
                    "location": "Amsterdam, Netherlands",
                    "duration": "Nov 2017 - Jul 2018",
                    "description": "Member of the AI squad; was responsible for researching and enhancing the company's main product, “Payroll”, by developing AI-powered features to assist the end-user pro-actively and intelligently.\n",
                    "activities": [
                        "Implemented data-driven systems for “salary proposal” and “wage-code prediction” powered by Linear Regression and Random Forest models respectively",
                        "Built web REST APIs for the above systems, hosted them in Azure cloud platform and was responsible for monitoring traffic and performance"
                    ],
                    "technology_tags": [
                        "Machine Learning",
                        "Python",
                        "Linear Regression",
                        "SQL",
                        "Flask",
                        "REST API",
                        "OpenAPI",
                        "Azure Web App",
                        "Scrum/Agile"
                    ]
                },
                {
                    "title": "Software Developer - Freelance",
                    "company": "Universiteit van Amsterdam",
                    "location": "Amsterdam, Netherlands",
                    "duration": "Nov 2017 - Mar 2018",
                    "description": "Member of the 'Analysis Team', tasked with contributing to the Inca Open-Source Project.",
                    "activities": [
                        "Engineered the 'analysis' (python) interface, that developers should implement, in case they want to supply a new 'analysis' algorithm.",
                        "Developed a Topic Modeling algorithm as a concrete implementation of the 'analysis' interface",
                        "Provided mentoring, within the team, for software and 'git' best practices, in our collaborative setting"
                    ],
                    "technology_tags": [
                        "Python",
                        "Topic Modeling",
                        "Latent Dirichlet Allocation (LDA)",
                        "Machine Learning",
                        "Git",
                        "Celery"
                    ]
                },
                {
                    "title": "Research & Development Internship",
                    "company": "Textkernel BV",
                    "location": "Amsterdam, Netherlands",
                    "duration": "Aug 2016 - Dec 2016",
                    "description": "Augmented Textkernel's main product, Extract!, a CV (resume) parsing software, by building a Machine Learning model able to \"understand\" the Greek language, surpassing worldwide competition in model performance benchmarks.",
                    "activities": [
                        "Developed Hidden Markov and Conditional Random Field Machine Learning model, trained on the Greek Language.",
                        "Feature Engineering and token normalization."
                    ],
                    "technology_tags": [
                        "Machine Learning",
                        "Natural Language Processing",
                        "Conditional Random Fields",
                        "Hidden Markov Models",
                        "Feature Engineering",
                        "Perl",
                        "Git",
                        "Bash",
                        "Scrum/Agile",
                        "CI/CD"
                    ]
                }
            ]
        },
        "portfolio": [
            {
                "title": "Python Package Generator",
                "development_period": "Apr 2022 - Feb 2024",
                "status": "mature",
                "source_code_repo": null,
                "resource_links": [
                    {
                        "type": "source_code_repo",
                        "url": "https://github.com/boromir674/cookiecutter-python-package"
                    },
                    {
                        "type": "documentation",
                        "url": "https://python-package-generator.readthedocs.io/"
                    },
                    {
                        "type": "ci/cd",
                        "url": "https://github.com/boromir674/cookiecutter-python-package/actions/workflows/test.yaml"
                    }
                ],
                "release": [
                    {
                        "type": "docker",
                        "name": "generate-python",
                        "artifact_version": "2.4.0",
                        "url": "https://hub.docker.com/r/boromir674/generate-python",
                        "command": "docker pull boromir674/generate-python:v2.4.0"
                    },
                    {
                        "type": "pypi",
                        "name": "cookiecutter-python-package",
                        "artifact_version": "2.4.0",
                        "url": "https://pypi.org/project/cookiecutter-python/",
                        "command": "pip install cookiecutter-python"
                    },
                    {
                        "type": "github",
                        "name": "cookiecutter-python-package",
                        "artifact_version": "v2.4.0",
                        "url": "https://github.com/boromir674/cookiecutter-python-package/releases/tag/v2.4.0",
                        "command": "curl -LJO https://github.com/boromir674/cookiecutter-python-package/archive/refs/tags/v2.4.0.tar.gz"
                    }
                ],
                "description": "A tool command-line interface (CLI) to automatically scaffold a new Python Open Source Project, along with multiple config files! Implemented using Python, Github Actions, Sphinx \\& Cookiecutter.\n",
                "tags": [
                    "Project Template",
                    "Code Generator",
                    "Automation",
                    "Cookiecutter",
                    "CLI",
                    "Python",
                    "PyPI",
                    "Sphinx"
                ]
            },
            {
                "title": "Neural Style Transfer",
                "development_period": "Sep 2021 - Dec 2021",
                "status": "stable",
                "source_code_repo": "boromir674/neural-style-transfer",
                "resource_links": [
                    {
                        "type": "source_code_repo",
                        "url": "https://github.com/boromir674/neural-style-transfer"
                    },
                    {
                        "type": "documentation",
                        "url": "https://neural-style-transfer.readthedocs.io/"
                    },
                    {
                        "type": "ci/cd",
                        "url": "https://github.com/boromir674/neural-style-transfer/actions"
                    }
                ],
                "release": [
                    {
                        "type": "pypi",
                        "name": "artificial-artwork",
                        "artifact_version": null,
                        "url": "https://pypi.org/project/artificial-artwork/",
                        "command": "pip install artificial-artwork"
                    },
                    {
                        "type": "docker",
                        "name": "neural-style-transfer",
                        "artifact_version": "1.0.2",
                        "url": "https://hub.docker.com/r/boromir674/neural-style-transfer",
                        "command": "docker pull boromir674/neural-style-transfer:1.0.2"
                    },
                    {
                        "type": "github",
                        "name": "neural-style-transfer",
                        "artifact_version": "v1.0.2",
                        "url": "https://github.com/boromir674/neural-style-transfer/releases/tag/v1.0.2",
                        "command": "curl -LJO https://github.com/boromir674/neural-style-transfer/archive/refs/tags/v1.0.2.tar.gz"
                    }
                ],
                "description": "Re-paint any image with the style of another image (ie Van Gogh painting) using a Neural Style Transfer algorithm, accessible through an easy-to-use CLI.\n",
                "tags": [
                    "Neural Style Transfer",
                    "Deep Learning",
                    "Python",
                    "Docker",
                    "Sphinx",
                    "PyPI",
                    "CLI"
                ]
            },
            {
                "title": "Software Patterns",
                "development_period": "Dec 2021 - Jun 2022",
                "status": "stable",
                "source_code_repo": "boromir674/software-patterns",
                "resource_links": [
                    {
                        "type": "source_code_repo",
                        "url": "https://github.com/boromir674/software-patterns"
                    },
                    {
                        "type": "documentation",
                        "url": "https://software-patterns.readthedocs.io/"
                    },
                    {
                        "type": "ci/cd",
                        "url": "https://app.circleci.com/pipelines/github/boromir674/software-patterns"
                    }
                ],
                "release": [
                    {
                        "type": "pypi",
                        "name": "software-patterns",
                        "artifact_version": null,
                        "url": "https://pypi.org/project/software-patterns/",
                        "command": "pip install software-patterns"
                    },
                    {
                        "type": "github",
                        "name": "software-patterns",
                        "artifact_version": null,
                        "url": "https://github.com/boromir674/software-patterns/releases/tag/v2.0.0",
                        "command": "curl -LJO https://github.com/boromir674/software-patterns/archive/refs/tags/v2.0.0.tar.gz"
                    }
                ],
                "description": "A Python library with reusable Software Design Patterns with Types.\n",
                "tags": [
                    "Software Design Patterns",
                    "Software Library",
                    "Python",
                    "Sphinx",
                    "PyPI"
                ]
            },
            {
                "title": "Pytest Object Getter",
                "development_period": "Apr 2022 - Jul 2022",
                "status": "mature",
                "source_code_repo": "boromir674/pytest-object-getter",
                "resource_links": [
                    {
                        "type": "source_code_repo",
                        "url": "https://github.com/boromir674/pytest-object-getter"
                    },
                    {
                        "type": "documentation",
                        "url": "https://pytest-object-getter.readthedocs.io/"
                    },
                    {
                        "type": "ci/cd",
                        "url": "https://github.com/boromir674/pytest-object-getter/actions"
                    }
                ],
                "release": [
                    {
                        "type": "pypi",
                        "name": "pytest-object-getter",
                        "artifact_version": "1.0.2",
                        "url": null,
                        "command": "pip install pytest-object-getter"
                    },
                    {
                        "type": "github",
                        "name": null,
                        "artifact_version": "v1.0.2",
                        "url": null,
                        "command": null
                    }
                ],
                "description": "A Pytest Plugin providing a `fixture` to dynamically import any object from a python (3rd party) module, while mocking its namespace on demand.\n",
                "tags": [
                    "Pytest",
                    "Plugin",
                    "Fixture",
                    "Python",
                    "PyPI"
                ]
            },
            {
                "title": "Python Software Release",
                "development_period": "May 2022",
                "status": "stable",
                "source_code_repo": "boromir674/software-release",
                "resource_links": [
                    {
                        "type": "source_code_repo",
                        "url": "https://github.com/boromir674/software-release"
                    }
                ],
                "release": [
                    {
                        "type": "pypi",
                        "name": "software-release",
                        "artifact_version": "0.1.0",
                        "url": null,
                        "command": null
                    },
                    {
                        "type": "github",
                        "name": null,
                        "artifact_version": "v0.1.0",
                        "url": null,
                        "command": null
                    }
                ],
                "description": "A CLI that streamlines the process of making a \"new\" Software Release to Github, using Semantic Versioning. Implemeted in Python, the CLI provides a wizard, that guides the user through the semi-automated \"release process\".\n",
                "tags": [
                    "Automated Software Release",
                    "Semantic Versioning",
                    "github",
                    "Python",
                    "PyPI",
                    "automation",
                    "CLI"
                ]
            },
            {
                "title": "Pytest Subprocess Plugin",
                "development_period": "Jul 2022",
                "status": "stable",
                "source_code_repo": "boromir674/pytest-subprocess",
                "resource_links": [
                    {
                        "type": "source_code_repo",
                        "url": "https://github.com/boromir674/pytest-subprocess"
                    },
                    {
                        "type": "documentation",
                        "url": "https://subprocess-pytest-plugin.readthedocs.io/"
                    },
                    {
                        "type": "ci/cd",
                        "url": "https://github.com/boromir674/pytest-subprocess/actions"
                    }
                ],
                "release": [
                    {
                        "type": "pypi",
                        "name": "pytest-subprocess",
                        "artifact_version": "0.10.0",
                        "url": null,
                        "command": null
                    },
                    {
                        "type": "github",
                        "name": null,
                        "artifact_version": "v0.10.0",
                        "url": null,
                        "command": null
                    }
                ],
                "description": "A Pytest Plugin providing a `fixture` to assist in testing sub-processes and reduce boilerplate test code.\n",
                "tags": [
                    "Pytest",
                    "Plugin",
                    "Fixture",
                    "Python",
                    "PyPI"
                ]
            },
            {
                "title": "Topic Modeling Toolkit",
                "development_period": "Apr 2018 - Sep 2019",
                "status": "mature",
                "source_code_repo": "boromir674/topic-modeling-toolkit",
                "resource_links": [
                    {
                        "type": "source_code_repo",
                        "url": "https://github.com/boromir674/topic-modeling-toolkit"
                    },
                    {
                        "type": "ci/cd",
                        "url": "https://travis-ci.org/boromir674/topic-modeling-toolkit"
                    }
                ],
                "release": [
                    {
                        "type": "pypi",
                        "name": "cookiecutter-python-package",
                        "artifact_version": null,
                        "url": "https://pypi.org/project/topic-modeling-toolkit/",
                        "command": "pip install topic-modeling-toolkit"
                    },
                    {
                        "type": "github",
                        "name": null,
                        "artifact_version": "v0.5.6",
                        "url": "https://github.com/boromir674/topic-modeling-toolkit/releases/tag/v0.5.6",
                        "command": "curl -LJO https://github.com/boromir674/topic-modeling-toolkit/archive/refs/tags/v0.5.6.tar.gz"
                    }
                ],
                "description": "A Python Package hosting multiple (CLI) programs that facilitate Topic Modeling research operations, on a collection of documents.\n",
                "tags": [
                    "Machine Learning",
                    "Unsupervised Learning",
                    "Topic Modeling",
                    "Python",
                    "PyPI",
                    "automation",
                    "CLI"
                ]
            },
            {
                "title": "So Magic",
                "development_period": "May 2020 - Jun 2021",
                "status": "stable",
                "source_code_repo": "boromir674/so-magic",
                "resource_links": [
                    {
                        "type": "source_code_repo",
                        "url": "https://github.com/boromir674/so-magic"
                    },
                    {
                        "type": "documentation",
                        "url": "https://so-magic.readthedocs.io/"
                    },
                    {
                        "type": "ci/cd",
                        "url": "https://app.circleci.com/pipelines/github/boromir674/so-magic"
                    }
                ],
                "release": [
                    {
                        "type": "pypi",
                        "name": "so-magic",
                        "artifact_version": "0.7.1",
                        "url": "https://pypi.org/project/so-magic/",
                        "command": "pip install so-magic"
                    },
                    {
                        "type": "github",
                        "name": null,
                        "artifact_version": "v0.7.1",
                        "url": "https://github.com/boromir674/so-magic/releases/tag/v0.7.1",
                        "command": "curl -LJO https://github.com/boromir674/so-magic/archive/refs/tags/v0.7.1.tar.gz"
                    }
                ],
                "description": "A Python library to infer Self-Organising Map models, based on structured data.\n",
                "tags": [
                    "Self-Organizing Maps",
                    "Machine Learning",
                    "Unsupervised Learning",
                    "Python",
                    "PyPI"
                ]
            },
            {
                "title": "PyDoer",
                "development_period": "Mar 2018 - Apr 2022",
                "status": "mature",
                "source_code_repo": "boromir674/doer",
                "resource_links": [
                    {
                        "type": "source_code_repo",
                        "url": "https://github.com/boromir674/doer"
                    },
                    {
                        "type": "ci/cd",
                        "url": "https://app.circleci.com/pipelines/github/boromir674/doer"
                    }
                ],
                "release": [
                    {
                        "type": "pypi",
                        "name": "pydoer",
                        "artifact_version": "1.0.2",
                        "url": "https://pypi.org/project/pydoer/",
                        "command": "pip install pydoer"
                    },
                    {
                        "type": "github",
                        "name": "doer",
                        "artifact_version": "v1.0.2",
                        "url": "https://github.com/boromir674/doer/releases/tag/v1.0.2",
                        "command": "curl -LJO https://github.com/boromir674/doer/archive/refs/tags/v1.0.2.tar.gz"
                    }
                ],
                "description": "A CLI program that renders a menu of options, each of which launches one or more Terminal Applications, \"bootstrapped\" with one or more custom bash commands. Implemented with Python and Bash allowing all options & commands to be designed by the User, through a json file.\n",
                "tags": [
                    "Automation",
                    "Bash",
                    "CLI",
                    "Python",
                    "PyPI"
                ]
            },
            {
                "title": "Music Album Creator",
                "development_period": "Jan 2019 - Nov 2019",
                "status": "stable",
                "source_code_repo": "boromir674/music-album-creator",
                "resource_links": [
                    {
                        "type": "source_code_repo",
                        "url": "https://github.com/boromir674/music-album-creator"
                    },
                    {
                        "type": "documentation",
                        "url": "https://music-album-creator.readthedocs.io/"
                    },
                    {
                        "type": "ci/cd",
                        "url": "https://ci.appveyor.com/project/boromir674/music-album-creator/branch/master"
                    }
                ],
                "release": [
                    {
                        "type": "pypi",
                        "name": "music-album-creation",
                        "artifact_version": "1.4.0",
                        "url": "https://pypi.org/project/music-album-creation/",
                        "command": "pip install music-album-creation"
                    },
                    {
                        "type": "github",
                        "name": null,
                        "artifact_version": "v1.4.0",
                        "url": "https://github.com/boromir674/music-album-creator/releases/tag/v1.4.0",
                        "command": "curl -LJO https://github.com/boromir674/music-album-creator/archive/refs/tags/v1.4.0.tar.gz"
                    }
                ],
                "description": "Download a youtube video, convert and segment it into audio tracks, attach metadata (per track) and save to disk.\n",
                "tags": [
                    "Audio Segmentation",
                    "Metadata",
                    "Youtube",
                    "CLI",
                    "Python",
                    "PyPI",
                    "Docker"
                ]
            }
        ]
    }
}
const useStaticQuery = jest.spyOn(Gatsby, `useStaticQuery`)

///// TEST 1 /////
describe("Test Primary and Secondary Fonts are used in the app", () => {
    beforeEach(() => {
        useStaticQuery.mockImplementation(() => grapghQLMockData)
    })

    afterEach(() => {
        jest.restoreAllMocks()
    })

    // GIVEN the expected Font Family names
    const EXPECTED_PRIMARY_FONT = "Roboto,sans-serif";

    const EXPECTED_SECONDARY_FONT = "'Courier New',Courier,monospace";
    // const EXPECTED_ALTERNATIVE_FONT = "Roboto Mono, monospace";

    it(`Verify font-family CSS properties have expected value`, () => {
        // WHEN we render the App in the DOM
        render(<App />);

        // THEN all Text in Introduction Section should have the Secondary Font
        const introSection = document.getElementById('introduction-section');
        expect(introSection).toHaveStyleRule('font-family', EXPECTED_SECONDARY_FONT);


        // THEN the text of the Professional Section Title Header should have the Primary Font
        const professionalSection = document.getElementById('professional-section');

        // query for the Section Title Header, which is the first h1 element 
        const profSectionTitleHeader = professionalSection.querySelector('h1');
        // assert that the font-family is the expected Primary Font
        expect(profSectionTitleHeader).toHaveStyleRule('font-family', EXPECTED_PRIMARY_FONT);

    })
});
