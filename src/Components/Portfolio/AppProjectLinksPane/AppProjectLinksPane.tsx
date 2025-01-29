
import React, { FC } from 'react';
import styled from "@emotion/styled";

// import App Icons Hook
// import { useAppIcons } from '../../../Hooks/useAppIcons';

import { createSVGIcon } from '../../SVGIcons';

import { withDefaultProps } from '../../hoc';
import Typography from '../../Typography';

import AppResourceLinkButton from './AppResourceLinkButton'

type ExternalLinkTypeNames = "github" | 'source_code_repo' | "docs" | "documentation" | "ci/cd";

// Recognizable by the code: createSVG Function, SVG Styles Mapping
type ProjectLinkTypeNames = "github" | "docs" | "ci/cd";

// Record of ReleaseTypeNames to icon type names
const PROJECT_LINKS_MAPPING: Record<ExternalLinkTypeNames, ProjectLinkTypeNames> = {
    // Github Repositoy Link
    github: "github",
    source_code_repo: "github",
    // Documentation Web (Pages) Site
    docs: "docs",
    documentation: "docs",
    // CI/CD Pipeline Link
    'ci/cd': "ci/cd",
};

interface Link {
    title: string;
    url: string;
    // type: 'github-repo' | 'docs' | 'ci/cd' | 'other';
    type: ExternalLinkTypeNames;
}

/** Allows overriding <svg style=..> and <path style=..> */
type Icon = {
    svgStyles?: React.SVGProps<SVGSVGElement>;
    // Path props, except for d attribute
    pathStyles?: Omit<React.SVGProps<SVGPathElement>, "d">[];
}
interface AppProjectLinksPaneProps {
    data: {
        links: Link[];
    },
    theme: {
        // headerFontFamily: string;
        headerColor: string;
        header: {
            fontFamily: string;
            fontSize: string;
        };
        item: {  // Styles per Project Link
            color: string;
            backgroundColor: string;
            onHoverColor: string;
            onHoverBackgroundColor: string;
            icons?: Icon | Icon[];
        }
        // headerMarginBottom: string;
    };
}

const DivContainer = styled.div`
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 6px;
  padding-right: 12px;
  // margin-bottom: 16px;
`;

const DivContent = styled.div``;

const ResourcesLinksDiv = styled.div`
display: flex;
flex-direction: column;
`;

const IconWrapper = styled.span`
  margin-right: 5px;
`;

// COMPONENT - Resource Links Header / Title
interface ResourceLinksHeaderProps {
    theme: {
        fontFamily?: string;
        fontSize: string;
        color: string;
    };
};
const ResourceLinksHeaderH3 = withDefaultProps({variant: "h3"}, Typography);
const ResourceLinksHeader = styled(ResourceLinksHeaderH3) <ResourceLinksHeaderProps>`
    font-family: ${props => props.theme.fontFamily || "inherit"};
    font-size: ${props => props.theme.fontSize};
    color: ${props => props.theme.color};
`;

const AppProjectLinksPane: FC<AppProjectLinksPaneProps> = ({ data, theme }) => {
    // ovverides for svg and its inner path(s) styles, need to recompute only if specific theme properties change

    return (
        <DivContainer>
            <DivContent>
                {/* Resource Links - HEADER TITLE */}
                <ResourceLinksHeader theme={{...theme.header, color: theme.headerColor}}>Resource Links</ResourceLinksHeader>
                {/* Resource Links - List of Links */}
                <ResourcesLinksDiv>
                    {data.links.map((link, index) => (
                        <AppResourceLinkButton
                            key={index}
                            theme={theme.item}
                            urlText={link.url}
                        >
                            <IconWrapper>
                                {createSVGIcon(
                                    PROJECT_LINKS_MAPPING[link.type],
                                    theme.item.icons?.[index]
                                    // {
                                    //     svgStyles: {
                                    //         fill: theme.item.color,
                                    //     },
                                    //     pathStyles: [
                                    //         {
                                    //             fill: theme.item.color,
                                    //         },
                                    //     ],
                                    // }
                                )}
                            </IconWrapper>
                            {/* <Icon type={link.type} /> */}
                            <span>{link.title}</span>
                        </AppResourceLinkButton>
                    ))}
                </ResourcesLinksDiv>
            </DivContent>
        </DivContainer>
    );
}

export default AppProjectLinksPane;
export type { AppProjectLinksPaneProps };
