import React from 'react';
import { SystemTokenLayerProps } from './TokenLayerTypes';
import { getEffectiveSize } from './utils';

const SystemTokenLayer: React.FC<SystemTokenLayerProps> = ({
  highlightedTokens,
  copiedToken,
  universalScale,
  systemTokenSize,
  systemColorCategories,
  onTokenHover,
  onTokenCopy,
  getTokenValue,
  isTokenHighlighted
}) => {
  const systemSize = getEffectiveSize(24, systemTokenSize, universalScale);

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
                    onMouseEnter={() => onTokenHover(tokenName, true)}
                    onMouseLeave={() => onTokenHover(tokenName, false)}
                    onClick={() => onTokenCopy(tokenName)}
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
  );
};

export default SystemTokenLayer;
