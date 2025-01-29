import React, { FC, SVGAttributes } from "react";
import styled from "@emotion/styled";

import { ReleaseItemData } from "../../../PortfolioItemInterface";
import { IconStyles } from '../../../interfaces';
import { createSVGIcon } from '../../SVGIcons';
import { withDefaultProps } from '../../hoc';
import Typography from '../../Typography';
import SoftwareReleaseButton, { type SoftwareReleaseButtonProps } from './SoftwareReleaseButton';


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
    // Same Styles are used per Release item
    releaseButtonTheme: SoftwareReleaseButtonProps["theme"] & {
        icons?: IconStyles | IconStyles[];
    };
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
  width: 100%; /* Match the container width */
  max-width: 100%; /* Prevent exceeding the parent width */
  box-sizing: border-box; /* Include padding and border in width calculations */
  overflow-wrap: break-word; /* Ensure long text breaks into the next line */
  word-break: break-word; /* Handle long strings without spaces */
`;
const ArtifactVersion = styled.span`
  white-space: nowrap; /* Prevent breaking semantic version into multiple lines */
  overflow: hidden; /* Hide any overflowing text */
  text-overflow: ellipsis; /* Add ellipsis (...) for clipped content */
  display: inline-block; /* Ensure text respects width constraints */
  max-width: 100%; /* Prevent overflow beyond container width */
// max-width: 800px; /* Adjust this value to set the truncation threshold */

`;

const IconWrapper = styled.span`
  margin-right: 5px;
`;

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
const ReleasesHeaderH3 = withDefaultProps({ variant: "h3" }, Typography);
const ReleasesHeader = styled(ReleasesHeaderH3) <ReleasesHeaderProps>`
    font-family: ${props => props.theme.fontFamily || "inherit"};
    font-size: ${props => props.theme.fontSize};
    color: ${props => props.theme.color};
    margin-bottom: ${props => props.theme.marginBottom};
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
                                // SVG style overrides (ie fill, width, height CSS) necessary for color mode switching
                                Array.isArray(theme.releaseButtonTheme.icons) ? theme.releaseButtonTheme.icons[index] : theme.releaseButtonTheme.icons,
                            )}
                        </IconWrapper>
                        <span>{release.name}</span>
                        <ArtifactVersion>{release.artifact_version}</ArtifactVersion>
                        {/* <ReleaseType>{release.type.toUpperCase()}</ReleaseType> */}
                    </SoftwareReleaseButton>
                ))}
            </ReleaseList>
        </ReleasesPane>
    )
};


export default AppReleasePane;
export { type ReleasesPaneProps };
