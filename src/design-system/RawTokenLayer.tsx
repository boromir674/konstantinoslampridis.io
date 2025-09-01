import React from 'react';
import { type RawTokenLayerProps } from './TokenLayerTypes';
import { getEffectiveSize } from './utils';

const RawTokenLayer: React.FC<RawTokenLayerProps> = ({
  highlightedTokens,
  copiedToken,
  universalScale,
  rawTokenSize,
  sourceColor = "#ff9288",
  colorCategories,
  onTokenHover,
  onTokenCopy,
  getTokenValue,
  isTokenHighlighted
}) => {
  const rawSize = getEffectiveSize(35, rawTokenSize, universalScale);
  const rawSizeHighlighted = rawSize + 5; // 5px larger when highlighted

  return (
    <section>
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
                    onMouseEnter={() => onTokenHover(tokenName, true)}
                    onMouseLeave={() => onTokenHover(tokenName, false)}
                    onClick={() => onTokenCopy(tokenName)}
                    title={`${tokenName}: ${getTokenValue(tokenName)} (Click to copy CSS variable)`}
                  />
                );
              })}
            </div>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default RawTokenLayer;
