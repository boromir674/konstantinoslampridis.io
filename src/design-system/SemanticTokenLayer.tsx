import React, { useMemo } from 'react';
import { SemanticTokenLayerProps } from './TokenLayerTypes';
import { getEffectiveSize } from './utils';

const SemanticTokenLayer: React.FC<SemanticTokenLayerProps> = ({
  highlightedTokens,
  copiedToken,
  universalScale,
  semanticTokenSize,
  semanticTokenCategories,
  semanticTokensByTheme,
  onTokenHover,
  onTokenCopy,
  getTokenValue,
  isTokenHighlighted
}) => {
  const semanticSize = getEffectiveSize(32, semanticTokenSize, universalScale);

  // PERFORMANCE OPTIMIZATION: Pre-compute all theme values once
  const themeValues = useMemo(() => {
    if (typeof window === 'undefined' || !semanticTokensByTheme) return {};
    
    const values: Record<string, { light: string; dark: string }> = {};
    const root = document.documentElement;
    const originalClass = root.className;
    const originalDataTheme = root.dataset.theme;
    
    // Get all unique token names
    const allTokens = new Set([
      ...Object.keys(semanticTokensByTheme.light || {}),
      ...Object.keys(semanticTokensByTheme.dark || {})
    ]);
    
    // Batch compute light values
    root.classList.remove('dark');
    delete root.dataset.theme;
    const lightComputedStyle = getComputedStyle(root);
    
    allTokens.forEach(tokenName => {
      if (!values[tokenName]) values[tokenName] = { light: '', dark: '' };
      values[tokenName].light = lightComputedStyle.getPropertyValue(tokenName).trim() || '#ccc';
    });
    
    // Batch compute dark values
    root.classList.add('dark');
    root.dataset.theme = 'dark';
    const darkComputedStyle = getComputedStyle(root);
    
    allTokens.forEach(tokenName => {
      values[tokenName].dark = darkComputedStyle.getPropertyValue(tokenName).trim() || '#333';
    });
    
    // Restore original state
    root.className = originalClass;
    if (originalDataTheme) {
      root.dataset.theme = originalDataTheme;
    } else {
      delete root.dataset.theme;
    }
    
    return values;
  }, [semanticTokensByTheme]);

  // Helper function to check if a token exists in both themes
  const hasLightAndDarkVariants = (tokenName: string): boolean => {
    return !!(
      semanticTokensByTheme?.light[tokenName] && 
      semanticTokensByTheme?.dark[tokenName]
    );
  };

  return (
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
              {category.name} ({category.tokens.length})
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
                      transition: 'border-color 0.1s ease, background-color 0.1s ease',
                      background: isHighlighted ? 'var(--app-surface-interactive)' : 'transparent'
                    }}
                    onMouseEnter={() => onTokenHover(tokenName, true)}
                    onMouseLeave={() => onTokenHover(tokenName, false)}
                    onClick={() => onTokenCopy(tokenName)}
                    title={`${tokenName}: ${getTokenValue(tokenName)} (Click to copy CSS variable)`}
                  >
                    {hasLightAndDarkVariants(tokenName) ? (
                      // Dual color boxes for tokens with both light and dark variants
                      <div style={{ display: 'flex', gap: '2px', flexShrink: 0 }}>
                        <div
                          style={{
                            width: `${semanticSize / 2 - 1}px`,
                            height: `${semanticSize}px`,
                            background: themeValues[tokenName]?.light || '#ccc',
                            border: '1px solid var(--app-border-subtle)',
                            borderRadius: '6px 0 0 6px',
                            position: 'relative'
                          }}
                          title={`Light: ${themeValues[tokenName]?.light || '#ccc'}`}
                        >
                          <div style={{
                            position: 'absolute',
                            bottom: '1px',
                            left: '1px',
                            fontSize: '8px',
                            color: 'rgba(0,0,0,0.7)',
                            backgroundColor: 'rgba(255,255,255,0.8)',
                            padding: '0 2px',
                            borderRadius: '2px',
                            lineHeight: '1'
                          }}>L</div>
                        </div>
                        <div
                          style={{
                            width: `${semanticSize / 2 - 1}px`,
                            height: `${semanticSize}px`,
                            background: themeValues[tokenName]?.dark || '#333',
                            border: '1px solid var(--app-border-subtle)',
                            borderRadius: '0 6px 6px 0',
                            position: 'relative'
                          }}
                          title={`Dark: ${themeValues[tokenName]?.dark || '#333'}`}
                        >
                          <div style={{
                            position: 'absolute',
                            bottom: '1px',
                            right: '1px',
                            fontSize: '8px',
                            color: 'rgba(255,255,255,0.9)',
                            backgroundColor: 'rgba(0,0,0,0.7)',
                            padding: '0 2px',
                            borderRadius: '2px',
                            lineHeight: '1'
                          }}>D</div>
                        </div>
                      </div>
                    ) : (
                      // Single color box for tokens with only one variant
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
                    )}
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
  );
};

export default SemanticTokenLayer;
