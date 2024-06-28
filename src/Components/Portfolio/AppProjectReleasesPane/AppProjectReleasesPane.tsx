import React, { FC, SVGAttributes } from "react";

import styled from "@emotion/styled";

import { createSVGIcon } from '../../SVGIcons';

// import Typography from '../../Typography';


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
    headerFontFamily: string;
    headerColor: string;
    headerMarginBottom: string;
    // Styles per Release
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
    github: 'curl -L ...',
    pypi: 'pip install ...',
    docker: 'docker pull ...',
};


const StyledH3 = styled.h3<Theme>`
  font-family: ${props => props.headerFontFamily};
  color: ${props => props.headerColor};
  margin-bottom: ${props => props.headerMarginBottom};
`;


const AppReleasePane: FC<ReleasesPaneProps> = ({ data, theme }) => {
    return (

        <ReleasesPane>
            <StyledH3 {...theme}>Releases</StyledH3>
            <ReleaseList>
                {data.map((release, index) => (
                    <SoftwareReleaseButton
                        key={index}
                        data={{
                            command: release.command || FALLBACK_COMMANDS[release.type],
                            urlText: release.urlText,
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
