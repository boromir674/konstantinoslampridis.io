import React from 'react';
import { SemanticTokenLayerProps } from './TokenLayerTypes';
import { getEffectiveSize } from './utils';

const SemanticTokenLayer: React.FC<SemanticTokenLayerProps> = ({
  highlightedTokens,
  copiedToken,
  universalScale,
  semanticTokenSize,
  semanticTokenCategories,
  onTokenHover,
  onTokenCopy,
  getTokenValue,
  isTokenHighlighted
}) => {
  const semanticSize = getEffectiveSize(32, semanticTokenSize, universalScale);

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
                      transition: 'all 0.2s ease',
                      background: isHighlighted ? 'var(--app-surface-interactive)' : 'transparent'
                    }}
                    onMouseEnter={() => onTokenHover(tokenName, true)}
                    onMouseLeave={() => onTokenHover(tokenName, false)}
                    onClick={() => onTokenCopy(tokenName)}
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
  );
};

export default SemanticTokenLayer;
