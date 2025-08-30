import React, { useState, useRef, useCallback, useMemo } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import styled from "@emotion/styled";

// Import token layer components
import RawTokenLayer from './RawTokenLayer';
import SystemTokenLayer from './SystemTokenLayer';
import SemanticTokenLayer from './SemanticTokenLayer';

import { parseTokensFromLiveCSS as parseTokensFromCSS, buildTokenMappings, getTokenValue } from './utils';

// Import layout state management
import useLayoutsState from '../Hooks/useLayoutsState';

// Import CSS files to style the grid layout using classes
import "../css/react-grid-layout.css";
import "../css/react-resizable.css";

// Import Design System CSS files to enable CSS variable access
import './tokens.css';         // raw tokens needed for Semantic ones
import './semantic-tokens.css';



export default {
  title: "Design Tokens/Grid",
  tags: ["autodocs"],
};


interface SizeConfig {
  universalScale: number;
  rawTokenSize?: number;
  systemTokenSize?: number;
  semanticTokenSize?: number;
  showAllSystemTokens?: boolean;
}

// Grid Layout Interface
interface LayoutInterface {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  minH?: number;
  maxW?: number;
  maxH?: number;
  moved?: boolean;
  static?: boolean;
  isDraggable?: boolean;
  isResizable?: boolean;
}

type LayoutsObject = {
  [key: string]: LayoutInterface[];
}

type LayoutArray = ReadonlyArray<LayoutInterface>;
type ResponsiveReactGridLayoutonLayoutChange = (layout: LayoutArray, layouts: LayoutsObject) => void;

// Layout Item Props
interface LayoutItemProps {
  moved?: boolean;
  static?: boolean;
  isDraggable?: boolean;
  isResizable?: boolean;
  resizeHandles?: string[];
  resizeHandle?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  isBounded?: boolean;
}

// Styled Grid Item Container - matches RGL styling
const LayoutItem = styled.div<LayoutItemProps>`
  border-style: ridge;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background: var(--app-surface-base);
  padding: 1rem;
  overflow: auto;
  box-sizing: border-box;
  
  /* Ensure internal content respects padding */
  > * {
    max-width: 100%;
    overflow-wrap: break-word;
  }
  
  /* Prevent content from reaching the edges */
  section, div {
    margin: 0;
    padding: 0;
  }
`;

// Hover Effects Component
const ItemWithHover = styled.div`
  /* Ensure content respects parent padding */
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  
  /* Prevent any internal scrolling issues */
  overflow: visible;
  
  /* Make sure nested content doesn't break out */
  > section {
    width: 100%;
    box-sizing: border-box;
  }
`;

const ResponsiveGridLayout = WidthProvider(Responsive);


///// MAIN REACT COMPONENT /////
const DesignTokenGridVisualization: React.FC<SizeConfig> = ({
  universalScale = 1,
  rawTokenSize,
  systemTokenSize,
  semanticTokenSize,
  showAllSystemTokens = false
}) => {
  // Shared state for all token layers
  const [highlightedTokens, setHighlightedTokens] = useState<string[]>([]);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  // Copy CSS variable to clipboard
  const copyTokenToClipboard = async (tokenName: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(`var(${tokenName})`);
        setCopiedToken(tokenName);
        setTimeout(() => setCopiedToken(null), 2000);
      } catch (err) {
        console.error('Failed to copy to clipboard:', err);
      }
    }
  };

  // Parse tokens and build mappings - use the working embedded logic
  const parsedTokens = parseTokensFromCSS();
  // const allMappings = useMemo(() => buildTokenMappings(parsedTokens), [parsedTokens]);
  const allMappings = buildTokenMappings(parsedTokens);
  const tokenMappings = allMappings.mappings;
  const systemToSemanticMappings = allMappings.systemToSemantic;

  // DEBUGGING: Log token mappings
  React.useEffect(() => {
    console.log('Parsed tokens:', {
      rawCount: Object.keys(parsedTokens.rawTokens).length,
      systemCount: Object.keys(parsedTokens.systemTokens).length,
      semanticCount: Object.keys(parsedTokens.semanticTokens).length,
      rawSample: Object.keys(parsedTokens.rawTokens).slice(0, 3),
      systemSample: Object.keys(parsedTokens.systemTokens).slice(0, 3),
      semanticSample: Object.keys(parsedTokens.semanticTokens).slice(0, 3)
    });
    console.log('Token mappings (raw->system/semantic):', tokenMappings);
    console.log('System to semantic mappings:', systemToSemanticMappings);
    console.log('Available stylesheets:', Array.from(document.styleSheets).map(sheet => ({
      href: sheet.href,
      rules: sheet.cssRules ? sheet.cssRules.length : 'No access'
    })));
  }, []);

  //// HANDLER FUNCTIONS ////
  const handleRawTokenHover = (tokenName: string, enter: boolean) => {
    if (enter) {
      const relatedTokens = tokenMappings[tokenName] || [];
      const allRelated = [tokenName, ...relatedTokens];

      // Also check for system tokens that map to semantics
      relatedTokens.forEach(token => {
        const semanticTokens = systemToSemanticMappings[token] || [];
        allRelated.push(...semanticTokens);
      });

      setHighlightedTokens(allRelated);
    } else {
      setHighlightedTokens([]);
    }
  };

  const handleSystemTokenHover = (tokenName: string, enter: boolean) => {
    if (enter) {
      const allRelated = [tokenName];

      // Find semantic tokens that this system token maps to
      const relatedSemanticTokens = systemToSemanticMappings[tokenName] || [];
      allRelated.push(...relatedSemanticTokens);

      // Find raw tokens that map to this system token (reverse lookup)
      Object.entries(tokenMappings).forEach(([rawToken, mappedTokens]) => {
        if (Array.isArray(mappedTokens) && mappedTokens.includes(tokenName)) {
          allRelated.push(rawToken);
        }
      });

      setHighlightedTokens(allRelated);
    } else {
      setHighlightedTokens([]);
    }
  };

  const handleSemanticTokenHover = (tokenName: string, enter: boolean) => {
    if (enter) {
      const allRelated = [tokenName];

      console.log(`\n=== SEMANTIC TOKEN HOVER: ${tokenName} ===`);
      console.log('Starting with:', allRelated);

      // Find system tokens that map to this semantic token (reverse lookup)
      Object.entries(systemToSemanticMappings).forEach(([systemToken, semanticTokens]) => {
        if (Array.isArray(semanticTokens) && semanticTokens.includes(tokenName)) {
          console.log(`Found system token ${systemToken} maps to ${tokenName}`);
          allRelated.push(systemToken);

          // For each system token, also find its raw token sources
          Object.entries(tokenMappings).forEach(([rawToken, mappedTokens]) => {
            if (Array.isArray(mappedTokens) && mappedTokens.includes(systemToken)) {
              console.log(`Found raw token ${rawToken} maps to system token ${systemToken}`);
              allRelated.push(rawToken);
            }
          });
        }
      });

      // Also check direct raw-to-semantic mappings
      Object.entries(tokenMappings).forEach(([rawToken, mappedTokens]) => {
        if (Array.isArray(mappedTokens) && mappedTokens.includes(tokenName)) {
          console.log(`Found direct raw-to-semantic mapping: ${rawToken} -> ${tokenName}`);
          allRelated.push(rawToken);
        }
      });

      console.log('Final related tokens:', allRelated);
      console.log('=== END SEMANTIC HOVER ===\n');

      setHighlightedTokens(allRelated);
    } else {
      setHighlightedTokens([]);
    }
  };


  //// DATA PREPARATION ////
  const sourceColor = "#ff9288";  // Seed color for raw palette tokens

  // RAW PALET COLOR CATEGORIES
  const colorCategories = [
    { name: "primary", palette: "md-ref-palette-primary" },
    { name: "secondary", palette: "md-ref-palette-secondary" },
    { name: "tertiary", palette: "md-ref-palette-tertiary" },
    { name: "neutral", palette: "md-ref-palette-neutral" },
    { name: "neutral-variant", palette: "md-ref-palette-neutral-variant" },
  ];

  // System color categories for the intermediate layer - conditional display based on toggle
  const systemColorCategories = showAllSystemTokens ? [
    // Show ALL system tokens organized by type
    {
      name: "Primary System",
      tokens: Object.keys(parsedTokens.systemTokens).filter(token =>
        token.includes('primary')
      )
    },
    {
      name: "Secondary System",
      tokens: Object.keys(parsedTokens.systemTokens).filter(token =>
        token.includes('secondary')
      )
    },
    {
      name: "Tertiary System",
      tokens: Object.keys(parsedTokens.systemTokens).filter(token =>
        token.includes('tertiary')
      )
    },
    {
      name: "Error System",
      tokens: Object.keys(parsedTokens.systemTokens).filter(token =>
        token.includes('error')
      )
    },
    {
      name: "Surface System",
      tokens: Object.keys(parsedTokens.systemTokens).filter(token =>
        token.includes('surface')
      )
    },
    {
      name: "Background System",
      tokens: Object.keys(parsedTokens.systemTokens).filter(token =>
        token.includes('background')
      )
    },
    {
      name: "Outline System",
      tokens: Object.keys(parsedTokens.systemTokens).filter(token =>
        token.includes('outline')
      )
    },
    {
      name: "Inverse System",
      tokens: Object.keys(parsedTokens.systemTokens).filter(token =>
        token.includes('inverse')
      )
    },
    {
      name: "Other System",
      tokens: Object.keys(parsedTokens.systemTokens).filter(token =>
        token.includes('shadow') || token.includes('scrim') || token.includes('surface-tint')
      )
    }
  ].filter(category => category.tokens.length > 0) : [
    // Show only system tokens that are used by semantic tokens (original behavior)
    {
      name: "Primary System",
      tokens: Object.keys(parsedTokens.systemTokens).filter(token =>
        token.includes('primary') && (
          Object.values(systemToSemanticMappings).some(semanticTokens =>
            Array.isArray(semanticTokens) && semanticTokens.length > 0
          ) || Object.values(tokenMappings).some(mappedTokens =>
            Array.isArray(mappedTokens) && mappedTokens.includes(token)
          )
        )
      ).slice(0, 4)
    },
    {
      name: "Secondary System",
      tokens: Object.keys(parsedTokens.systemTokens).filter(token =>
        token.includes('secondary') && (
          Object.values(systemToSemanticMappings).some(semanticTokens =>
            Array.isArray(semanticTokens) && semanticTokens.length > 0
          ) || Object.values(tokenMappings).some(mappedTokens =>
            Array.isArray(mappedTokens) && mappedTokens.includes(token)
          )
        )
      ).slice(0, 4)
    },
    {
      name: "Surface System",
      tokens: Object.keys(parsedTokens.systemTokens).filter(token =>
        token.includes('surface') && (
          Object.values(systemToSemanticMappings).some(semanticTokens =>
            Array.isArray(semanticTokens) && semanticTokens.length > 0
          ) || Object.values(tokenMappings).some(mappedTokens =>
            Array.isArray(mappedTokens) && mappedTokens.includes(token)
          )
        )
      ).slice(0, 4)
    },
    {
      name: "Text & Outline",
      tokens: Object.keys(parsedTokens.systemTokens).filter(token =>
        (token.includes('outline') || (token.includes('on-') && token.includes('surface'))) && (
          Object.values(systemToSemanticMappings).some(semanticTokens =>
            Array.isArray(semanticTokens) && semanticTokens.length > 0
          ) || Object.values(tokenMappings).some(mappedTokens =>
            Array.isArray(mappedTokens) && mappedTokens.includes(token)
          )
        )
      ).slice(0, 4)
    }
  ].filter(category => category.tokens.length > 0);

  // Semantic tokens grouped by category - built dynamically  
  const semanticTokenCategories = [
    {
      name: "Brand",
      tokens: Object.keys(parsedTokens.semanticTokens).filter(token =>
        token.includes('brand')
      )
    },

    {
      name: "Surfaces",
      tokens: Object.keys(parsedTokens.semanticTokens).filter(token =>
        token.includes('surface')
      )
    },
    // {
    //   name: "Interaction",
    //   tokens: Object.keys(parsedTokens.semanticTokens).filter(token =>
    //     token.includes('focus') || token.includes('border') || token.includes('accent')
    //   )
    // },
    // parse other semantic tokens
    {
      name: "Miscellaneous",
      tokens: Object.keys(parsedTokens.semanticTokens).filter(token => 
        !token.includes('brand') && !token.includes('text') && !token.includes('surface')
        // !token.includes('focus') && !token.includes('border') && !token.includes('accent')  // &&
        // !token.includes('container') && !token.includes('elevation') &&
        // !token.includes('hover') && !token.includes('pressed') && !token.includes('selected') &&
        // !token.includes('error') && !token.includes('warning') &&
        // !token.includes('shadow') && !token.includes('scrim') && !token.includes('divider')
      )
    },
    {
      name: "Text",
      tokens: Object.keys(parsedTokens.semanticTokens).filter(token =>
        token.includes('text')
      )
    },
  ].filter(category => category.tokens.length > 0);


  /// SUPPORT OBJECTS / Functions ///
  const isTokenHighlighted = (tokenName: string) => {
    return highlightedTokens.includes(tokenName);
  };

  const getTokenChain = () => {
    if (highlightedTokens.length === 0) return null;

    // Categorize tokens by layer
    const rawTokens = highlightedTokens.filter(token => token.startsWith('--md-ref-palette-'));
    const systemTokens = highlightedTokens.filter(token => token.startsWith('--md-sys-color-'));
    const semanticTokens = highlightedTokens.filter(token => token.startsWith('--app-'));

    return { rawTokens, systemTokens, semanticTokens };
  };

  const renderTokenChainItem = (tokenName: string, layer: string) => {
    return (
      <div
        key={tokenName}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem',
          background: 'var(--app-surface-base)',
          borderRadius: '6px',
          marginBottom: '0.25rem',
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
        onClick={() => copyTokenToClipboard(tokenName)}
        title={`Click to copy: var(${tokenName})`}
      >
        <div
          style={{
            width: '16px',
            height: '16px',
            background: getTokenValue(tokenName),
            border: '1px solid var(--app-border-subtle)',
            borderRadius: '3px',
            flexShrink: 0
          }}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: '0.75rem',
            fontFamily: 'var(--app-font-family-courier, monospace)',
            color: 'var(--app-text-primary)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>
            {tokenName}
          </div>
          <div style={{
            fontSize: '0.65rem',
            color: 'var(--app-text-secondary)',
            fontWeight: 600,
            textTransform: 'uppercase'
          }}>
            {layer} • {getTokenValue(tokenName)}
          </div>
        </div>
        <span style={{
          fontSize: '0.7rem',
          color: 'var(--app-text-secondary)',
          opacity: copiedToken === tokenName ? 1 : 0.6
        }}>
          {copiedToken === tokenName ? '✓' : '📋'}
        </span>
      </div>
    );
  };

  const tokenChain = getTokenChain();


  //// Grid Layout Management
  const rendersNo = useRef(0);
  const logComponentRerender = useCallback(() => {
    rendersNo.current = rendersNo.current + 1;
  }, []);
  logComponentRerender();

  const [layouts, setLayouts, saveToLS] = useLayoutsState();

  const handleClickResetLayoutButton = () => {
    setLayouts({});
  };

  const onLayoutChange: ResponsiveReactGridLayoutonLayoutChange = (
    currentLayout: ReadonlyArray<LayoutInterface>,
    allLayouts: LayoutsObject
  ) => {
    saveToLS("layouts", allLayouts);
    setLayouts(allLayouts);
  };

  /// Render the Component
  return (
    <div style={{
      padding: '20px',
      fontFamily: 'var(--app-font-family-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif)',
      background: 'var(--app-surface-base)',
      color: 'var(--app-text-primary)',
      minHeight: '100vh'
    }}>
      <h1 style={{
        color: 'var(--app-brand-color-accent)',
        marginBottom: '1.5rem',
        fontSize: '2rem'
      }}>
        Design Token Grid Layout
      </h1>

      <p style={{
        marginBottom: '1rem',
        color: 'var(--app-text-secondary)',
        lineHeight: 1.6
      }}>
        Interactive grid layout with resizable and draggable token panels. Hover over any token to see relationships.
      </p>

      {/* Grid Controls */}
      <div style={{ marginBottom: '1rem' }}>
        <button
          onClick={handleClickResetLayoutButton}
          style={{
            padding: '0.5rem 1rem',
            background: 'var(--app-brand-color-accent)',
            color: 'var(--app-surface-base)',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 600
          }}
        >
          Reset Layout
        </button>
        <span style={{
          marginLeft: '1rem',
          fontSize: '0.8rem',
          color: 'var(--app-text-secondary)'
        }}>
          Grid Renders: {rendersNo.current}
        </span>
      </div>

      {/* Responsive Grid Layout */}
      <ResponsiveGridLayout
        layouts={layouts}
        onLayoutChange={onLayoutChange}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        rowHeight={60}
        margin={[10, 10]}
      >
        {/* Raw Palette Grid Item */}
        <LayoutItem
          key="raw-palette"
          data-grid={{
            i: "raw-palette",
            x: 0, y: 0, w: 4, h: 3
          }}
        >
          <ItemWithHover>
            <RawTokenLayer
              highlightedTokens={highlightedTokens}
              copiedToken={copiedToken}
              universalScale={universalScale}
              rawTokenSize={rawTokenSize}
              colorCategories={colorCategories}
              onTokenHover={handleRawTokenHover}
              onTokenCopy={copyTokenToClipboard}
              getTokenValue={getTokenValue}
              isTokenHighlighted={isTokenHighlighted}
            />
          </ItemWithHover>
        </LayoutItem>

        {/* System Tokens Grid Item */}
        <LayoutItem
          key="system-tokens"
          data-grid={{
            i: "system-tokens",
            x: 4, y: 0, w: 4, h: 3
          }}
        >
          <ItemWithHover>
            <SystemTokenLayer
              highlightedTokens={highlightedTokens}
              copiedToken={copiedToken}
              universalScale={universalScale}
              systemTokenSize={systemTokenSize}
              systemColorCategories={systemColorCategories}
              onTokenHover={handleSystemTokenHover}
              onTokenCopy={copyTokenToClipboard}
              getTokenValue={getTokenValue}
              isTokenHighlighted={isTokenHighlighted}
            />
          </ItemWithHover>
        </LayoutItem>

        {/* Semantic Tokens Grid Item */}
        <LayoutItem
          key="semantic-tokens"
          data-grid={{
            i: "semantic-tokens",
            x: 8, y: 0, w: 4, h: 3
          }}
        >
          <ItemWithHover>
            <SemanticTokenLayer
              highlightedTokens={highlightedTokens}
              copiedToken={copiedToken}
              universalScale={universalScale}
              semanticTokenSize={semanticTokenSize}
              semanticTokenCategories={semanticTokenCategories}
              semanticTokensByTheme={parsedTokens.semanticTokensByTheme}
              onTokenHover={handleSemanticTokenHover}
              onTokenCopy={copyTokenToClipboard}
              getTokenValue={getTokenValue}
              isTokenHighlighted={isTokenHighlighted}
            />
          </ItemWithHover>
        </LayoutItem>
      </ResponsiveGridLayout>
    </div>
  );
};

export const Default = {
  args: {
    universalScale: 1,
    rawTokenSize: undefined,
    systemTokenSize: undefined,
    semanticTokenSize: undefined,
    showAllSystemTokens: true,
  },
  argTypes: {
    universalScale: {
      control: {
        type: 'range',
        min: 0.5,
        max: 3,
        step: 0.1
      },
      description: 'Universal scale multiplier for all color boxes',
    },
    rawTokenSize: {
      control: {
        type: 'number',
        min: 10,
        max: 100,
        step: 1
      },
      description: 'Override size for raw palette tokens (px). Leave empty to use default.',
    },
    systemTokenSize: {
      control: {
        type: 'number',
        min: 10,
        max: 100,
        step: 1
      },
      description: 'Override size for system tokens (px). Leave empty to use default.',
    },
    semanticTokenSize: {
      control: {
        type: 'number',
        min: 10,
        max: 100,
        step: 1
      },
      description: 'Override size for semantic tokens (px). Leave empty to use default.',
    },
    showAllSystemTokens: {
      control: {
        type: 'boolean'
      },
      description: 'Toggle to show all system tokens vs only those used by semantic tokens',
    },
  },
  render: (args: SizeConfig) => <DesignTokenGridVisualization {...args} />,
  parameters: {
    docs: {
      description: {
        story: '🔶 **Mixed Data**: Interactive grid layout showcasing the three-layer token architecture in resizable and draggable panels. Each token layer (Raw Palette, System Tokens, Semantic App Tokens) is contained in its own grid item that can be moved and resized. Hover over any token to see its relationships across all layers. The layout is responsive and persists changes to local storage. Uses real CSS data parsed from stylesheets with some demonstration filtering for better presentation.'
      }
    }
  }
};
