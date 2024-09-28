import React, { FC, SVGAttributes } from "react";

import styled from "@emotion/styled";

import { createSVGIcon } from '../../SVGIcons';
import { withDefaultProps } from '../../hoc';
import Typography from '../../Typography';


import { ReleaseItemData } from "../../../PortfolioItemInterface";
import SoftwareReleaseButton, { SoftwareReleaseButtonTheme } from './SoftwareReleaseButton';

type ReleaseTypeNames = "pypi" | "docker" | "github" | "gh_release";

// Record of ReleaseTypeNames to icon type names
const RELEASE_TYPE_ICONS: Record<ReleaseTypeNames, string> = {
    pypi: "python",
    docker: "docker",
    github: "gh_release",
    gh_release: "gh_release",
};


interface Theme {
    // Styles of Title/Header of Releases Pane
    headerFontFamily: string;
    headerColor: string;
    headerMarginBottom: string;
    headerFontSize: string;
    // Styles per Release item
    releaseButtonTheme: SoftwareReleaseButtonTheme & {
        icons?: {
            svgStyles?: React.SVGProps<SVGSVGElement>;
            // Path props, except for d attribute
            pathStyles?: Omit<React.SVGProps<SVGPathElement>, "d">[];
        }[],
    },
};

interface ReleasesPaneProps {
    data: ReleaseItemData[];
    theme: Theme;
}


const ReleaseType = styled.span`
  margin-left: auto;
  visibility: hidden;
`;


const ReleaseList = styled.div`
  display: flex;
  flex-direction: column;
`;

const ReleasesPane = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  // margin-bottom: 10px;
  // bottomn padding
  padding-bottom: 10px;
`;

const IconWrapper = styled.span`
  margin-right: 5px;
`;


const FALLBACK_COMMANDS: { [key: string]: string } = {
    github: 'curl -LJO',
    pypi: 'pip install',
    docker: 'docker pull',
};


const DEFAULT_RELEASE: { [key: string]: { createCommand: (release: ReleaseItemData) => string, createURL: (release: ReleaseItemData) => string } } = {
    // github: (release) => `curl -LJO ${release.urlText || `https://github.com/boromir674/${release.name}/releases/tag/${release.artifact_version}`}`,
    // pypi: (release) => `pip install ${release.name}`,
    // docker: (release) => `docker pull ${release.name}`,
    github: {
        createCommand: (release) => `curl -LJO ${release.urlText || `https://github.com/boromir674/${release.name}/releases/tag/${release.artifact_version}`}`,
        createURL: (release) => `https://github.com/boromir674/${release.name}/releases/tag/${release.artifact_version}`,
    },
    pypi: {
        createCommand: (release) => `pip install ${release.name}`,
        createURL: (release) => `https://pypi.org/project/${release.name}/`,
    },
    docker: {
        createCommand: (release) => `docker pull ${release.name}`,
        createURL: (release) => `https://hub.docker.com/r/boromir674/${release.name}`,
    },
};

const createCommand = (release: ReleaseItemData) => {
    const commandMaker = DEFAULT_RELEASE[release.type].createCommand;
    return commandMaker(release);
}
const deriveURL = (release: ReleaseItemData) => {
    const urlMaker = DEFAULT_RELEASE[release.type].createURL;
    return urlMaker(release);
};


// COMPONENT - Releases Pane Header / Title
interface ReleasesHeaderProps {
    theme: {
        fontFamily?: string;
        fontSize: string;
        color: string;
        marginBottom: string;
    };
};
const ReleasesHeaderH3 = withDefaultProps({variant: "h3"}, Typography);
const ReleasesHeader = styled(ReleasesHeaderH3) <ReleasesHeaderProps>`
    font-family: ${props => props.theme.fontFamily || "inherit"};
    font-size: ${props => props.theme.fontSize};
    color: ${props => props.theme.color};
    margin-bottom: ${props => props.theme.marginBottom};
`;

const StyledH3 = styled.h3<Theme>`
  font-family: ${props => props.headerFontFamily};
  color: ${props => props.headerColor};
  margin-bottom: ${props => props.headerMarginBottom};
`;


const AppReleasePane: FC<ReleasesPaneProps> = ({ data, theme }) => {
    return (

        <ReleasesPane>
            {/* <StyledH3 {...theme}>Releases</StyledH3> */}
            <ReleasesHeader theme={{
                fontFamily: theme.headerFontFamily,
                fontSize: theme.headerFontSize,
                color: theme.headerColor,
                marginBottom: theme.headerMarginBottom
            }}>Releases</ReleasesHeader>
            <ReleaseList>
                {data.map((release, index) => (
                    <SoftwareReleaseButton
                        key={index}
                        data={{
                            // command: release.command || FALLBACK_COMMANDS[release.type],
                            command: release.command || createCommand(release),
                            urlText: release.urlText || deriveURL(release),
                        }}
                        theme={theme.releaseButtonTheme}
                    >
                        <IconWrapper>
                            {createSVGIcon(
                                RELEASE_TYPE_ICONS[release.type as ReleaseTypeNames],
                                theme.releaseButtonTheme.icons?.[index]
                                // {
                                //     svgStyles: theme.releaseButtonTheme.icons?.[index].svgStyles,
                                //     pathStyles: theme.releaseButtonTheme.icons?.[index].pathStyles,
                                // }
                            )}
                        </IconWrapper>
                        <span>{release.name}</span>
                        <span>{release.artifact_version}</span>
                        <ReleaseType>{release.type.toUpperCase()}</ReleaseType>
                    </SoftwareReleaseButton>
                ))}
            </ReleaseList>
        </ReleasesPane>
    )
};


export default AppReleasePane;
export { type ReleasesPaneProps };
