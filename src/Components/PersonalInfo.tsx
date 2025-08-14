import React from "react";
import styled from "@emotion/styled";

// Open PDF in new TAB ICON
import AppExternalURLIcon from "./AppExternalURLIcon";

import PersonalInfoInterface from "../PersonalInfoInterface";

interface ContainerProps {
  theme: {
    containerBackgroundColor: string;
    textColor: string;
  };
}


interface SocialLink {
  label: string;
  url: string;
}

interface CurricularDoc {
  label: string;
  url: string;
}

interface PersonalInfoProps {
  userData: PersonalInfoInterface;
  theme: {
    containerBackgroundColor: string;
    textColor: string;
    linkColor: string;
    externalURLSVGColor: string;
    infoItem: {
      key: { fontFamily: string; fontSize: string };
      value: { fontFamily: string; fontSize: string };
    };
    backgroundColorGradient: { start: string; end: string };
    colors?: { // optional dynamic color tokens
      focusRing?: string;
      socialBadgeBg?: string;
      socialBadgeBorder?: string;
      socialBadgeHoverBg?: string;
      socialBadgeHoverText?: string;
      docBadgeBgFrom?: string;
      docBadgeBgTo?: string;
      docBadgeHoverBgFrom?: string;
      docBadgeHoverBgTo?: string;
      docBadgeBeforeFrom?: string;
      docBadgeBeforeTo?: string;
      docBadgeFocusOutline?: string;
    };
  };
}

// Enhanced container now a semantic section with accent
const Container = styled.section<ContainerProps>`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 12px 28px;
  padding: 28px 30px 26px;
  border-radius: 18px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  background: linear-gradient(
    145deg,
    ${(p) => p.theme.containerBackgroundColor} 0%,
    rgba(255, 255, 255, 0.02) 100%
  );
  color: ${(p) => p.theme.textColor};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06),
    0 6px 18px -8px rgba(0, 0, 0, 0.15);
  position: relative;
  &::after {
    content: "";
    position: absolute;
    top: 0; left: 0;
    width: 6px; height: 100%;
    background: linear-gradient(180deg, var(--app-accent-from, var(--accent-color-start)), var(--app-accent-to, var(--accent-color-end)));
    border-top-left-radius: inherit;
    border-bottom-left-radius: inherit;
  }
`;

// Accent (falls back if theme does not provide)
const Header = styled.header<{ accentStart: string; accentEnd: string }>`
  grid-column: 1 / -1;
  margin: -8px 0 4px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 30% 120%, rgba(255,255,255,0.12), transparent 70%);
    pointer-events: none;
  }
`;

const BioHeading = styled.h1`
  margin: 0 0 2px;
  font-size: clamp(2.2rem, 3vw, 3rem);
  line-height: 1.05;
  font-weight: 800;
  letter-spacing: 1px;
  background: linear-gradient(90deg,
    var(--app-accent-from),
    var(--app-accent-to)
  );
  -webkit-background-clip: text;
  // color: transparent;
`;

const SubtleNote = styled.p`
  margin: 0 0 4px;
  font-size: .85rem;
  font-weight: 500;
  letter-spacing: .6px;
  text-transform: uppercase;
  opacity: .7;
`;

// Item now flex column with spacing
const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 240px;
  padding: 4px 0 10px;
  gap: 4px;
`;

// Full row variant for sections that should span entire width
const InfoItemFullRow = styled(InfoItem)`
  grid-column: 1 / -1;
`;

// === Reintroduced label/value styled components (were removed in cleanup) ===
interface InfoKeyProps {
  theme: { fontFamily: string; fontSize: string };
}
const InfoKey = styled.span<InfoKeyProps>`
  font-weight: 650;
  font-size: calc(${(p) => p.theme.fontSize} * 1.05);
  font-family: ${(p) => p.theme.fontFamily};
  letter-spacing: 0.45px;
  text-transform: uppercase;
  opacity: 0.95;
`;

const InfoValue = styled.span<{ valueFontFamily: string; valueFontSize: string }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 0;
  font-family: ${(p) => p.valueFontFamily};
  font-size: calc(${(p) => p.valueFontSize} * 1.03);
  line-height: 1.38;
`;
// === End reintroduced components ===

const Link = styled.a<{ theme: any }>`
  --focus-ring-color: var(--app-focus-ring, ${(p) => p.theme.colors?.focusRing || p.theme.nameGradient?.start || p.theme.linkColor || p.theme.textColor});
  color: var(--app-text-primary, ${(p) => p.theme.textColor});
  position: relative;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.25s ease, transform 0.2s ease;
  &:hover { color: var(--app-focus-ring, ${(p) => p.theme.colors?.focusRing || p.theme.linkColor || p.theme.textColor}); }
  &:active { transform: translateY(1px); }
  &:focus-visible { outline: 2px solid var(--focus-ring-color); outline-offset: 3px; border-radius: 4px; }
`;

const MyLink = styled(Link)`
  margin-right: 10px;
`;

// Badge for curriculum docs
const PDFDocument = styled.a<{ theme: any }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px 6px 12px;
  margin: 4px 4px 0 0;
  border: 2px, solid, var(--app-brand-color-accent, ${(p) => p.theme.colors?.docBadgeBorder || 'rgba(255,127,80,0.2)'});
  border-radius: 999px;
  background: linear-gradient(135deg,
    var(--app-surface-interactive-from, ${(p) => p.theme.badgeBgFrom || p.theme.colors?.docBadgeBgFrom || 'rgba(255,127,80,0.15)'}) 0%,
    var(--app-surface-interactive-to, ${(p) => p.theme.badgeBgTo || p.theme.colors?.docBadgeBgTo || 'rgba(255,127,80,0.05)'}) 100%);
  color: var(--app-text-primary, ${(p) => p.theme.textColor || p.theme.linkColor || 'inherit'});
  font-size: 12px;
  font-size: var(--app-font-size-body-body);
  line-height: 1.2;
  font-weight: 500;
  letter-spacing: 0.25px;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  transition: background 0.25s ease, color 0.25s ease, box-shadow 0.25s ease;
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg,
      var(--app-surface-interactive-from, ${(p) => p.theme.badgeBeforeFrom || p.theme.colors?.docBadgeBeforeFrom || 'rgba(255,127,80,0.5)'}),
      var(--app-surface-interactive-to, ${(p) => p.theme.badgeBeforeTo || p.theme.colors?.docBadgeBeforeTo || 'rgba(255,127,80,0)'}));
    opacity: 0;
    transition: opacity 0.35s;
  }
  &:hover::before { opacity: 0.18; }
  &:hover {
    background: linear-gradient(135deg,
      var(--app-surface-interactive-hover-from, ${(p) => p.theme.badgeHoverBgFrom || p.theme.colors?.docBadgeHoverBgFrom || 'rgba(255,127,80,0.25)'} ) 0%,
      var(--app-surface-interactive-hover-to, ${(p) => p.theme.badgeHoverBgTo || p.theme.colors?.docBadgeHoverBgTo || 'rgba(255,127,80,0.05)'} ) 100%);
  }
  &:focus-visible { outline: 2px solid var(--app-focus-ring, ${(p) => p.theme.focusOutline || p.theme.colors?.docBadgeFocusOutline || p.theme.colors?.focusRing || '#ff7f50'}); outline-offset: 3px; }
`;

// Container of all PDFs
const PDFContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 4px;
`;

// Badge style for inline social links
const OnlineProfileBadge = styled(MyLink)<{ theme: any }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: var(--app-surface-interactive);
  padding: 6px 8px;
  border-radius: 999px;
  font-size: .75rem;
  font-weight: 600;
  letter-spacing: .4px;
  text-transform: uppercase;
  backdrop-filter: blur(4px);
  border: 1px solid var(--app-brand-color-accent, ${(p) => p.theme.colors?.socialBadgeBorder || 'rgba(255,255,255,0.09)'});
  transition: background .25s, color .25s, box-shadow .25s;
  white-space: nowrap;
  flex: 0 1 auto;
  &:hover { background: var(--app-online-profile-hover-bg, ${(p) => p.theme.colors?.socialBadgeHoverBg || 'rgba(255,127,80,0.18)'}); color: ${(p) => p.theme.colors?.socialBadgeHoverText || 'var(--app-text-primary, #ffefe8)'}; }
`;

// Row grouping Online Profiles
const OnlineProfilesDiv = styled.div`
  display: flex;
  flex-wrap: wrap; /* enable wrapping */
  justify-content: flex-start;
  gap: 8px;
  margin-top: 4px;
  width: 100%;
  /* removed overflow:hidden so wrapped rows are visible */
`;
// @media (max-width: 640px) { flex-wrap: wrap; }

// TODO read ALL Data from props
const PersonalInfo: React.FC<PersonalInfoProps> = ({
  userData: { name, email, github, gitlab, linkedin },
  theme,
}) => {
  const accentStart = theme.backgroundColorGradient.start;
  const accentEnd = theme.backgroundColorGradient.end;
  const safeTheme = { ...theme, colors: theme.colors || {} }; // ensure colors object exists
  return (
    <Container
      theme={safeTheme}
      aria-label="Personal contact information"
      style={{
        // Provide fallback custom props only if semantic vars missing
        ['--accent-color-start' as any]: accentStart,
        ['--accent-color-end' as any]: accentEnd,
      }}
      id="personal-info"
    >
      <Header accentStart={accentStart} accentEnd={accentEnd}>
        <BioHeading>{name}</BioHeading>
        <SubtleNote style={{'color': `var(--app-text-secondary ${safeTheme.textColor})`}}>Personal Information</SubtleNote>
      </Header>
      {/* Email */}
      <InfoItem >
        <InfoKey style={{color: 'var(--app-text-secondary, ' + safeTheme.textColor + ')'}} theme={safeTheme.infoItem.key}>Email</InfoKey>
        <InfoValue style={{color: 'var(--app-text-primary, ' + safeTheme.textColor + ')'}} valueFontFamily={safeTheme.infoItem.value.fontFamily} valueFontSize={safeTheme.infoItem.value.fontSize}>{email}</InfoValue>
      </InfoItem>
      {/* Social Profiles consolidated */}
      <InfoItemFullRow>
        <InfoKey style={{color: 'var(--app-text-secondary, ' + safeTheme.textColor + ')'}} theme={safeTheme.infoItem.key}>Profiles</InfoKey>
        <OnlineProfilesDiv>
          {/* Github */}
          <OnlineProfileBadge
            href={`https://${github}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open GitHub profile ${github} in new tab`}
            theme={safeTheme}
          >
            GitHub
            <AppExternalURLIcon theme={{ lineColor: safeTheme.externalURLSVGColor }} />
          </OnlineProfileBadge>
          {/* LinkedIn */}
          <OnlineProfileBadge
            href={`https://${linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open LinkedIn profile ${linkedin} in new tab`}
            theme={safeTheme}
          >
            LinkedIn
            <AppExternalURLIcon theme={{ lineColor: safeTheme.externalURLSVGColor }} />
          </OnlineProfileBadge>
          {/* Gitlab */}
          <OnlineProfileBadge
            href={`https://${gitlab}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open GitLab profile ${gitlab} in new tab`}
            theme={safeTheme}
          >
            GitLab
            <AppExternalURLIcon theme={{ lineColor: safeTheme.externalURLSVGColor }} />
          </OnlineProfileBadge>
        </OnlineProfilesDiv>
      </InfoItemFullRow>
      {/* Curriculum Docs */}
      <InfoItemFullRow>
        <InfoKey style={{color: 'var(--app-text-secondary, ' + safeTheme.textColor + ')'}} theme={safeTheme.infoItem.key}>Curricular PDFs</InfoKey>
        <PDFContainer>
          <PDFDocument
            href="https://konstantinos-lampridis-cv-documents.s3.eu-central-1.amazonaws.com/main_resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open 1 Page Resume PDF in new tab"
            theme={{ ...safeTheme, textColor: safeTheme.linkColor }}
          >
            1 Page Resume <AppExternalURLIcon theme={{ lineColor: safeTheme.externalURLSVGColor }} />
          </PDFDocument>
          <PDFDocument
            href="https://konstantinos-lampridis-cv-documents.s3.eu-central-1.amazonaws.com/main_cv%2Bprojects.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open CV plus Projects PDF in new tab"
            theme={{ ...safeTheme, textColor: safeTheme.linkColor }}
          >
            CV + Projects <AppExternalURLIcon theme={{ lineColor: safeTheme.externalURLSVGColor }} />
          </PDFDocument>
        </PDFContainer>
      </InfoItemFullRow>
    </Container>
  );
};

export default PersonalInfo;
export type { PersonalInfoProps };
