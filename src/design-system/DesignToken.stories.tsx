import React, { useState } from "react";

import { getTokenValue, getEffectiveSize, parseTokensFromLiveCSS as parseTokensFromCSS, buildTokenMappings } from './utils'; // Utility function to get token values

// Import Design System CSS files to enable CSS variable access
import './tokens.css';         // raw tokens needed for Semantic ones
import './semantic-tokens.css';
import { parse } from "path";


export default {
  title: "Design Tokens",
  tags: ["autodocs"],
};

interface SizeConfig {
  universalScale: number;
  rawTokenSize?: number;
  systemTokenSize?: number;
  semanticTokenSize?: number;
  showAllSystemTokens?: boolean;
  horizontalLayout?: boolean;
}

const DesignTokenVisualization = ({ 
  universalScale = 1,
  rawTokenSize,
  systemTokenSize,
  semanticTokenSize,
  showAllSystemTokens = false,
  horizontalLayout = false
}: SizeConfig) => {
  // STATE MANAGEMENT
  const [highlightedTokens, setHighlightedTokens] = useState<string[]>([]);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  
  // Copy CSS variable to clipboard
  const copyTokenToClipboard = async (tokenName: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(`var(${tokenName})`);
        setCopiedToken(tokenName);
        setTimeout(() => setCopiedToken(null), 2000); // Clear after 2 seconds
      } catch (err) {
        console.error('Failed to copy to clipboard:', err);
      }
    }
  };

  const rawSize = getEffectiveSize(32, rawTokenSize, universalScale);
  const rawSizeHighlighted = rawSize + 5; // 5px larger when highlighted
  const systemSize = getEffectiveSize(32, systemTokenSize, universalScale);
  const semanticSize = getEffectiveSize(34, semanticTokenSize, universalScale);

  // Get dynamic mappings
  const tokens = parseTokensFromCSS();  
  const dynamicMappings = buildTokenMappings(tokens);
  const tokenMappings = dynamicMappings.mappings;
  const systemToSemanticMappings = dynamicMappings.systemToSemantic;
  const parsedTokens = dynamicMappings.tokens;

  // Debug logging (remove in production)
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

  const sourceColor = "#ff9288";

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
      name: "Text",
      tokens: Object.keys(parsedTokens.semanticTokens).filter(token => 
        token.includes('text')
      )
    },
    {
      name: "Surfaces",
      tokens: Object.keys(parsedTokens.semanticTokens).filter(token => 
        token.includes('surface')
      )
    },
    {
      name: "Interaction",
      tokens: Object.keys(parsedTokens.semanticTokens).filter(token => 
        token.includes('focus') || token.includes('border') || token.includes('accent')
      )
    },
    // parse container-related tokens
    {
      name: "Containers",
      tokens: Object.keys(parsedTokens.semanticTokens).filter(token => 
        token.includes('container') || token.includes('elevation')
      )
    },
    // parse state-related tokens
    {
      name: "States",
      tokens: Object.keys(parsedTokens.semanticTokens).filter(token => 
        token.includes('hover') || token.includes('pressed') || token.includes('selected')
      )
    },
    // parse error-related tokens
    {
      name: "Error",
      tokens: Object.keys(parsedTokens.semanticTokens).filter(token => 
        token.includes('error') || token.includes('warning')
      )
    },
    // parse utility tokens
    {
      name: "Utilities",
      tokens: Object.keys(parsedTokens.semanticTokens).filter(token => 
        token.includes('shadow') || token.includes('scrim') || token.includes('divider')
      )
    },
    // parse other semantic tokens
    {
      name: "Miscellaneous",
      tokens: Object.keys(parsedTokens.semanticTokens).filter(token => 
        !token.includes('brand') && !token.includes('text') && !token.includes('surface') &&
        !token.includes('focus') && !token.includes('border') && !token.includes('accent') &&
        !token.includes('container') && !token.includes('elevation') &&
        !token.includes('hover') && !token.includes('pressed') && !token.includes('selected') &&
        !token.includes('error') && !token.includes('warning') &&
        !token.includes('shadow') && !token.includes('scrim') && !token.includes('divider')
      )
    }
  ].filter(category => category.tokens.length > 0);

  // HANDLERS
  const handleTokenHover = (tokenName: string, enter: boolean) => {
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
    const getTokenValue = (token: string) => {
      if (typeof window !== 'undefined') {
        return getComputedStyle(document.documentElement).getPropertyValue(token).trim();
      }
      return '#000000';
    };

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

  //// Render the component
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
        Design Token Layers
      </h1>
      
      <p style={{ 
        marginBottom: '1.5rem',
        color: 'var(--app-text-secondary)',
        lineHeight: 1.6
      }}>
        Hover over any token to see its relationships across the three layers: Raw → System → Semantic
      </p>

      {/* Source Color */}
      <div style={{ marginBottom: '1.5rem' }}>
        <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>Source Color: </span>
        <div
          style={{
            width: "50px",
            height: "50px",
            background: sourceColor,
            display: "inline-block",
            marginLeft: "10px",
            border: "2px solid var(--app-border-subtle)",
            borderRadius: '8px'
          }}
        />
      </div>

      {/* Layout Container - switches between vertical and horizontal */}
      <div style={{
        display: horizontalLayout ? 'grid' : 'block',
        gridTemplateColumns: horizontalLayout ? '1fr 1fr' : 'none',
        gap: horizontalLayout ? '2rem' : '0',
        marginBottom: '2rem'
      }}>
        
        {/* Raw Palette Layer */}
        <section style={{ marginBottom: horizontalLayout ? '0' : '2rem' }}>
          {/* Section Title */}
          <h2 style={{ 
            fontSize: '1.5rem',
            marginBottom: '0.75rem',
            color: 'var(--app-text-primary)',
            borderBottom: '2px solid var(--app-brand-color-accent)',
            paddingBottom: '0.5rem',
            display: 'inline-block'
          }}>
            Raw Palette Tokens
          </h2>
          {/* Grid of Raw Color Palettes */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              gap: "15px",
            }}
          >
            {colorCategories.map((category) => (
              <React.Fragment key={category.name}>
                <span style={{ 
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: 'var(--app-text-secondary)',
                  alignSelf: 'center',
                  textTransform: 'capitalize'
                }}>
                  {category.name}:
                </span>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(11, ${rawSize}px)`,
                    gap: "8px",
                  }}
                >
                  {Array.from({ length: 11 }, (_, i) => i * 10).map((step) => {
                    const tokenName = `--${category.palette}${step}`;
                    const isHighlighted = isTokenHighlighted(tokenName);
                    
                    return (
                      <div
                        key={step}
                        style={{
                          width: isHighlighted ? `${rawSizeHighlighted}px` : `${rawSize}px`,
                          height: isHighlighted ? `${rawSizeHighlighted}px` : `${rawSize}px`,
                          background: `var(${tokenName}, #ccc)`,
                          border: isHighlighted 
                            ? "2px solid var(--app-focus-ring)" 
                            : "2px solid var(--app-border-subtle)",
                          borderRadius: '6px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          boxShadow: isHighlighted ? '0 4px 12px rgba(0,0,0,0.2)' : 'none',
                          margin: isHighlighted ? `-${(rawSizeHighlighted - rawSize) / 2}px` : '0',
                          position: 'relative',
                          zIndex: isHighlighted ? 10 : 1
                        }}
                        onMouseEnter={() => handleTokenHover(tokenName, true)}
                        onMouseLeave={() => handleTokenHover(tokenName, false)}
                        onClick={() => copyTokenToClipboard(tokenName)}
                        title={`${tokenName}: ${getTokenValue(tokenName)} (Click to copy CSS variable)`}
                      />
                    );
                  })}
                </div>
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* System Tokens Layer */}
        <section style={{ marginBottom: horizontalLayout ? '0' : '2rem' }}>
          <h2 style={{ 
            fontSize: '1.5rem',
            marginBottom: '0.75rem',
            color: 'var(--app-text-primary)',
            borderBottom: '2px solid var(--app-brand-color-accent)',
            paddingBottom: '0.5rem',
            display: 'inline-block'
          }}>
            System Tokens (Material Design)
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem'
          }}>
            {systemColorCategories.map((category) => (
              <div key={category.name}>
                <h3 style={{ 
                  fontSize: '1rem',
                  marginBottom: '0.5rem',
                  color: 'var(--app-text-secondary)',
                  fontWeight: 600
                }}>
                  {category.name}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {category.tokens.map((tokenName) => {
                    const isHighlighted = isTokenHighlighted(tokenName);
                    
                    return (
                      <div
                        key={tokenName}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.5rem',
                          border: isHighlighted 
                            ? '1px solid var(--app-brand-color-accent)' 
                            : '1px solid var(--app-border-subtle)',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          background: isHighlighted ? 'var(--app-surface-interactive)' : 'transparent',
                          position: 'relative'
                        }}
                        onMouseEnter={() => handleSystemTokenHover(tokenName, true)}
                        onMouseLeave={() => handleSystemTokenHover(tokenName, false)}
                        onClick={() => copyTokenToClipboard(tokenName)}
                        title={`${tokenName}: ${getTokenValue(tokenName)} (Click to copy CSS variable)`}
                      >
                        <div
                          style={{
                            width: `${systemSize}px`,
                            height: `${systemSize}px`,
                            background: `var(${tokenName}, #ccc)`,
                            border: '1px solid var(--app-border-subtle)',
                            borderRadius: '4px',
                            flexShrink: 0
                          }}
                        />
                        <span style={{
                          fontSize: '0.8rem',
                          fontFamily: 'var(--app-font-family-courier, monospace)',
                          color: 'var(--app-text-primary)',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          flex: 1
                        }}>
                          {tokenName.replace('--md-sys-color-', '')}
                        </span>
                        <span style={{
                          fontSize: '0.7rem',
                          color: 'var(--app-text-secondary)',
                          fontFamily: 'var(--app-font-family-courier, monospace)',
                          marginRight: '0.25rem'
                        }}>
                          {getTokenValue(tokenName)}
                        </span>
                        <span style={{
                          fontSize: '0.8rem',
                          color: 'var(--app-text-secondary)',
                          opacity: copiedToken === tokenName ? 1 : 0.6
                        }}>
                          {copiedToken === tokenName ? '✓' : '📋'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
        
      </div>

      {/* Semantic Tokens Layer */}
      <section>
        <h2 style={{ 
          fontSize: '1.5rem',
          marginBottom: '0.75rem',
          color: 'var(--app-text-primary)',
          borderBottom: '2px solid var(--app-brand-color-accent)',
          paddingBottom: '0.5rem',
          display: 'inline-block'
        }}>
          Semantic App Tokens
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem'
        }}>
          {semanticTokenCategories.map((category) => (
            <div key={category.name}>
              <h3 style={{ 
                fontSize: '1rem',
                marginBottom: '0.5rem',
                color: 'var(--app-text-secondary)',
                fontWeight: 600
              }}>
                {category.name}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {category.tokens.map((tokenName) => {
                  const isHighlighted = isTokenHighlighted(tokenName);
                  
                  return (
                    <div
                      key={tokenName}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.75rem',
                        border: isHighlighted 
                          ? '2px solid var(--app-brand-color-accent)' 
                          : '2px solid var(--app-border-subtle)',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        background: isHighlighted ? 'var(--app-surface-interactive)' : 'transparent'
                      }}
                      onMouseEnter={() => handleSemanticTokenHover(tokenName, true)}
                      onMouseLeave={() => handleSemanticTokenHover(tokenName, false)}
                      onClick={() => copyTokenToClipboard(tokenName)}
                      title={`${tokenName}: ${getTokenValue(tokenName)} (Click to copy CSS variable)`}
                    >
                      <div
                        style={{
                          width: `${semanticSize}px`,
                          height: `${semanticSize}px`,
                          background: `var(${tokenName}, #ccc)`,
                          border: '1px solid var(--app-border-subtle)',
                          borderRadius: '6px',
                          flexShrink: 0
                        }}
                      />
                      <span style={{
                        fontSize: '0.9rem',
                        fontFamily: 'var(--app-font-family-courier, monospace)',
                        color: 'var(--app-text-primary)',
                        fontWeight: 600,
                        flex: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {tokenName}
                      </span>
                      <span style={{
                        fontSize: '0.75rem',
                        color: 'var(--app-text-secondary)',
                        fontFamily: 'var(--app-font-family-courier, monospace)',
                        marginRight: '0.25rem'
                      }}>
                        {getTokenValue(tokenName)}
                      </span>
                      <span style={{
                        fontSize: '0.9rem',
                        color: 'var(--app-text-secondary)',
                        opacity: copiedToken === tokenName ? 1 : 0.6
                      }}>
                        {copiedToken === tokenName ? '✓' : '📋'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Active Relationships Display */}
      {highlightedTokens.length > 0 && tokenChain && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: 'var(--app-surface-raised)',
          border: '2px solid var(--app-brand-color-accent)',
          borderRadius: '12px',
          padding: '1rem',
          maxWidth: '320px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          zIndex: 1000
        }}>
          <h4 style={{ 
            margin: '0 0 1rem 0',
            color: 'var(--app-brand-color-accent)',
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span>Token Chain</span>
            <div style={{
              background: 'var(--app-brand-color-accent)',
              color: 'var(--app-surface-raised)',
              fontSize: '0.7rem',
              padding: '0.2rem 0.4rem',
              borderRadius: '10px',
              fontWeight: 600
            }}>
              {highlightedTokens.length}
            </div>
          </h4>
          
          {/* Raw Tokens */}
          {tokenChain.rawTokens.length > 0 && (
            <div style={{ marginBottom: '0.75rem' }}>
              <div style={{
                fontSize: '0.7rem',
                color: 'var(--app-text-secondary)',
                fontWeight: 600,
                marginBottom: '0.5rem',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Raw Palette
              </div>
              {tokenChain.rawTokens.map(token => renderTokenChainItem(token, 'Raw'))}
            </div>
          )}

          {/* Arrow Down */}
          {tokenChain.rawTokens.length > 0 && (tokenChain.systemTokens.length > 0 || tokenChain.semanticTokens.length > 0) && (
            <div style={{ 
              textAlign: 'center', 
              margin: '0.5rem 0',
              color: 'var(--app-brand-color-accent)',
              fontSize: '1rem'
            }}>
              ↓
            </div>
          )}
          
          {/* System Tokens */}
          {tokenChain.systemTokens.length > 0 && (
            <div style={{ marginBottom: '0.75rem' }}>
              <div style={{
                fontSize: '0.7rem',
                color: 'var(--app-text-secondary)',
                fontWeight: 600,
                marginBottom: '0.5rem',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                System Layer
              </div>
              {tokenChain.systemTokens.map(token => renderTokenChainItem(token, 'System'))}
            </div>
          )}

          {/* Arrow Down */}
          {tokenChain.systemTokens.length > 0 && tokenChain.semanticTokens.length > 0 && (
            <div style={{ 
              textAlign: 'center', 
              margin: '0.5rem 0',
              color: 'var(--app-brand-color-accent)',
              fontSize: '1rem'
            }}>
              ↓
            </div>
          )}
          
          {/* Semantic Tokens */}
          {tokenChain.semanticTokens.length > 0 && (
            <div>
              <div style={{
                fontSize: '0.7rem',
                color: 'var(--app-text-secondary)',
                fontWeight: 600,
                marginBottom: '0.5rem',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Semantic Layer
              </div>
              {tokenChain.semanticTokens.map(token => renderTokenChainItem(token, 'App'))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const Default = {
  args: {
    universalScale: 1,
    rawTokenSize: undefined,
    systemTokenSize: undefined,
    semanticTokenSize: undefined,
    showAllSystemTokens: false,
    horizontalLayout: false,
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
    horizontalLayout: {
      control: { 
        type: 'boolean'
      },
      description: 'Toggle between vertical layout (default) and horizontal layout (system tokens to the right of raw palette)',
    },
  },
  render: (args: SizeConfig) => <DesignTokenVisualization {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Interactive visualization showing the three-layer token architecture: Raw Material palettes → System tokens → Semantic app tokens. Hover over any token to see its relationships across layers. Use the controls to adjust sizing, toggle between showing all system tokens or only used ones, and switch between vertical and horizontal layouts.'
      }
    }
  }
};
