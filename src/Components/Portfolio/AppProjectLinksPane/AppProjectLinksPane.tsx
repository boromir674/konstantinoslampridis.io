
import React, { FC } from 'react';
import styled from "@emotion/styled";

import { IconStyles } from '../../../interfaces';
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
            /** Allows overriding <svg style=..> and <path style=..> */
            icons?: IconStyles | IconStyles[];
        }
        // headerMarginBottom: string;
    };
}

const DivContainer = styled.div`
  background-color: var(--app-color-draggable, --app-container-primary);
  color: var( --app-color-draggable-text, --app-on-container-primary);
  
//   border: 1px solid var(--app-brand-color-accent);
//   border-radius: 4px;
  
  border: 2px solid var(--app-brand-color-accent);
  border-radius: 12px;
  
  padding: 6px;
  padding-right: 12px;
  // margin-bottom: 16px;
`;


const ResourcesLinksDiv = styled.div`
    background-color: var(--app-color-draggable, --app-container-primary);
    color: var(--app-on-container-primary);
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
    background-color: var(--app-color-draggable, --app-surface-primary);
    color: var(--app-on-surface-primary);
    font-family: ${props => props.theme.fontFamily || "inherit"};
    font-size: ${props => props.theme.fontSize};
`;

const AppProjectLinksPane: FC<AppProjectLinksPaneProps> = ({ data, theme }) => {
    // ovverides for svg and its inner path(s) styles, need to recompute only if specific theme properties change

    return (
        <DivContainer>
            {/* <DivContent> */}
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
                                {createSVGIcon(PROJECT_LINKS_MAPPING[link.type],
                                    // SVG style overrides (ie fill CSS) necessary for color mode switching
                                    Array.isArray(theme.item.icons) ? theme.item.icons[index] : theme.item.icons,
                                )}
                            </IconWrapper>
                            {/* <Icon type={link.type} /> */}
                            <span>{link.title}</span>
                        </AppResourceLinkButton>
                    ))}
                </ResourcesLinksDiv>
            {/* </DivContent> */}
        </DivContainer>
    );
}

export default AppProjectLinksPane;
export type { AppProjectLinksPaneProps };
