import React, { useState } from "react";
import ColorPalette from "./DesignSystem";

export default {
  component: ColorPalette,
  title: "Design System UI - Legacy",
  tags: ["autodocs"],
};

export const Default = () => <ColorPalette />;

// Interactive Token Layer Visualization
const TokenLayerVisualization = () => {
  const [highlightedToken, setHighlightedToken] = useState<string | null>(null);
  const [selectedLayer, setSelectedLayer] = useState<'raw' | 'system' | 'semantic'>('semantic');

  // Token hierarchy mapping
  const tokenHierarchy = {
    // Raw → System → Semantic mapping
    '--md-ref-palette-primary70': {
      systemTokens: ['--md-sys-color-primary-light', '--md-sys-color-primary-dark'],
      semanticTokens: ['--app-brand-color-accent'],
      description: 'Brand accent color - coral pink',
      value: '#fb8b81'
    },
    '--md-ref-palette-primary10': {
      systemTokens: ['--md-sys-color-surface-dark', '--md-sys-color-primary-container-dark'],
      semanticTokens: ['--app-brand-color-accent-bg'],
      description: 'Deep brand background',
      value: '#410003'
    },
    '--md-sys-color-on-surface-light': {
      rawTokens: ['--md-ref-palette-neutral10'],
      semanticTokens: ['--app-text-primary'],
      description: 'Primary text in light mode',
      value: '#1d1b20'
    },
    '--md-sys-color-on-surface-dark': {
      rawTokens: ['--md-ref-palette-neutral90'],
      semanticTokens: ['--app-text-primary'],
      description: 'Primary text in dark mode',
      value: '#e6e0e9'
    },
    '--md-sys-color-secondary-container-light': {
      rawTokens: ['--md-ref-palette-secondary90'],
      semanticTokens: ['--app-surface-interactive', '--app-surface-raised'],
      description: 'Interactive surface container',
      value: '#ffdad6'
    },
    '--md-sys-color-primary-light': {
      rawTokens: ['--md-ref-palette-primary40'],
      semanticTokens: ['--app-focus-ring'],
      description: 'Focus indication and primary actions',
      value: '#9c423b'
    }
  };

  const semanticTokens = [
    {
      category: 'Brand',
      tokens: [
        { name: '--app-brand-color-accent', description: 'Primary brand accent', usage: 'CTAs, highlights, active states' },
        { name: '--app-brand-color-accent-bg', description: 'Brand background', usage: 'Deep brand surfaces' },
      ]
    },
    {
      category: 'Text',
      tokens: [
        { name: '--app-text-primary', description: 'Primary text color', usage: 'Body text, headings' },
        { name: '--app-text-secondary', description: 'Secondary text', usage: 'Captions, subdued content' },
      ]
    },
    {
      category: 'Surfaces',
      tokens: [
        { name: '--app-surface-base', description: 'Base surface', usage: 'Page background' },
        { name: '--app-surface-raised', description: 'Elevated surface', usage: 'Cards, modals' },
        { name: '--app-surface-interactive', description: 'Interactive surface', usage: 'Buttons, navigation' },
      ]
    },
    {
      category: 'Interaction',
      tokens: [
        { name: '--app-focus-ring', description: 'Focus indicator', usage: 'Keyboard navigation' },
        { name: '--app-border-subtle', description: 'Subtle borders', usage: 'Dividers, outlines' },
      ]
    }
  ];

  const colorPalettes = [
    { name: 'primary', baseColor: '--md-ref-palette-primary', description: 'Brand primary palette' },
    { name: 'secondary', baseColor: '--md-ref-palette-secondary', description: 'Supporting colors' },
    { name: 'tertiary', baseColor: '--md-ref-palette-tertiary', description: 'Accent variations' },
    { name: 'neutral', baseColor: '--md-ref-palette-neutral', description: 'Text and surfaces' },
  ];

  const getTokenValue = (tokenName: string) => {
    if (typeof window !== 'undefined') {
      return getComputedStyle(document.documentElement).getPropertyValue(tokenName).trim();
    }
    return tokenHierarchy[tokenName]?.value || '#000000';
  };

  const isRelatedToken = (tokenName: string, highlighted: string) => {
    const hierarchy = tokenHierarchy[highlighted];
    if (!hierarchy) return false;
    
    return (
      hierarchy.systemTokens?.includes(tokenName) ||
      hierarchy.semanticTokens?.includes(tokenName) ||
      hierarchy.rawTokens?.includes(tokenName) ||
      tokenName === highlighted
    );
  };

  return (
    <div style={{ 
      fontFamily: 'var(--app-font-family-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif)',
      padding: '2rem',
      background: 'var(--app-surface-base)',
      color: 'var(--app-text-primary)',
      minHeight: '100vh'
    }}>
      <h1 style={{ 
        marginBottom: '2rem',
        color: 'var(--app-brand-color-accent)',
        fontSize: '2.5rem',
        fontWeight: 700
      }}>
        Design System Token Architecture
      </h1>

      <div style={{ marginBottom: '2rem' }}>
        <p style={{ 
          fontSize: '1.1rem', 
          lineHeight: 1.6,
          color: 'var(--app-text-secondary)',
          maxWidth: '800px'
        }}>
          Our design system uses a three-layer token architecture: <strong>Raw Tokens</strong> (Material Design palettes) → 
          <strong> System Tokens</strong> (semantic roles) → <strong>Semantic Tokens</strong> (app-specific aliases). 
          Hover over tokens to see their relationships across layers.
        </p>
      </div>

      {/* Layer Navigation */}
      <div style={{ 
        display: 'flex', 
        gap: '1rem', 
        marginBottom: '2rem',
        borderBottom: '1px solid var(--app-border-subtle)',
        paddingBottom: '1rem'
      }}>
        {(['raw', 'system', 'semantic'] as const).map((layer) => (
          <button
            key={layer}
            onClick={() => setSelectedLayer(layer)}
            style={{
              padding: '0.75rem 1.5rem',
              border: selectedLayer === layer ? '2px solid var(--app-brand-color-accent)' : '1px solid var(--app-border-subtle)',
              background: selectedLayer === layer ? 'var(--app-surface-interactive)' : 'transparent',
              color: selectedLayer === layer ? 'var(--app-brand-color-accent)' : 'var(--app-text-primary)',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: selectedLayer === layer ? 600 : 400,
              textTransform: 'capitalize',
              fontSize: '1rem'
            }}
          >
            {layer} Tokens
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
        
        {/* Left Column: Raw Material Palettes */}
        <div>
          <h2 style={{ 
            fontSize: '1.5rem', 
            marginBottom: '1.5rem',
            color: 'var(--app-text-primary)',
            fontWeight: 600
          }}>
            Raw Material Palettes
          </h2>
          
          {colorPalettes.map((palette) => (
            <div key={palette.name} style={{ marginBottom: '2rem' }}>
              <h3 style={{ 
                fontSize: '1.1rem', 
                marginBottom: '0.5rem',
                color: 'var(--app-text-secondary)',
                textTransform: 'capitalize'
              }}>
                {palette.name}
              </h3>
              <p style={{ 
                fontSize: '0.9rem', 
                color: 'var(--app-text-secondary)', 
                marginBottom: '1rem',
                fontStyle: 'italic'
              }}>
                {palette.description}
              </p>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(40px, 1fr))',
                gap: '4px',
                maxWidth: '500px'
              }}>
                {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100].map((step) => {
                  const tokenName = `${palette.baseColor}${step}`;
                  const isHighlighted = highlightedToken && isRelatedToken(tokenName, highlightedToken);
                  
                  return (
                    <div
                      key={step}
                      style={{
                        width: '40px',
                        height: '40px',
                        background: `var(${tokenName}, #ccc)`,
                        border: isHighlighted ? '3px solid var(--app-brand-color-accent)' : '1px solid var(--app-border-subtle)',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        transform: isHighlighted ? 'scale(1.1)' : 'scale(1)',
                        boxShadow: isHighlighted ? '0 4px 12px rgba(0,0,0,0.15)' : 'none',
                        position: 'relative'
                      }}
                      onMouseEnter={() => setHighlightedToken(tokenName)}
                      onMouseLeave={() => setHighlightedToken(null)}
                      title={`${tokenName}: ${getTokenValue(tokenName)}`}
                    >
                      <div style={{
                        position: 'absolute',
                        bottom: '-20px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        fontSize: '0.7rem',
                        color: 'var(--app-text-secondary)',
                        fontWeight: 500
                      }}>
                        {step}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Semantic Tokens */}
        <div>
          <h2 style={{ 
            fontSize: '1.5rem', 
            marginBottom: '1.5rem',
            color: 'var(--app-text-primary)',
            fontWeight: 600
          }}>
            Semantic App Tokens
          </h2>
          
          {semanticTokens.map((category) => (
            <div key={category.category} style={{ marginBottom: '2rem' }}>
              <h3 style={{ 
                fontSize: '1.1rem', 
                marginBottom: '1rem',
                color: 'var(--app-text-secondary)',
                fontWeight: 600
              }}>
                {category.category}
              </h3>
              
              {category.tokens.map((token) => {
                const isHighlighted = highlightedToken && isRelatedToken(token.name, highlightedToken);
                const tokenValue = getTokenValue(token.name);
                
                return (
                  <div
                    key={token.name}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1rem',
                      border: isHighlighted ? '2px solid var(--app-brand-color-accent)' : '1px solid var(--app-border-subtle)',
                      borderRadius: '8px',
                      marginBottom: '0.5rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      background: isHighlighted ? 'var(--app-surface-interactive)' : 'var(--app-surface-base)',
                      transform: isHighlighted ? 'translateX(8px)' : 'translateX(0)'
                    }}
                    onMouseEnter={() => setHighlightedToken(token.name)}
                    onMouseLeave={() => setHighlightedToken(null)}
                  >
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        background: tokenValue,
                        border: '1px solid var(--app-border-subtle)',
                        borderRadius: '4px',
                        flexShrink: 0
                      }}
                    />
                    
                    <div style={{ flex: 1 }}>
                      <div style={{ 
                        fontFamily: 'var(--app-font-family-courier, monospace)',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        color: 'var(--app-text-primary)',
                        marginBottom: '0.25rem'
                      }}>
                        {token.name}
                      </div>
                      <div style={{ 
                        fontSize: '0.85rem',
                        color: 'var(--app-text-secondary)',
                        marginBottom: '0.25rem'
                      }}>
                        {token.description}
                      </div>
                      <div style={{ 
                        fontSize: '0.75rem',
                        color: 'var(--app-text-secondary)',
                        fontStyle: 'italic'
                      }}>
                        Usage: {token.usage}
                      </div>
                    </div>
                    
                    <div style={{
                      fontFamily: 'var(--app-font-family-courier, monospace)',
                      fontSize: '0.8rem',
                      color: 'var(--app-text-secondary)',
                      background: 'var(--app-surface-raised)',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '4px'
                    }}>
                      {tokenValue}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Token Relationship Indicator */}
      {highlightedToken && (
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          background: 'var(--app-surface-raised)',
          border: '2px solid var(--app-brand-color-accent)',
          borderRadius: '12px',
          padding: '1rem',
          maxWidth: '300px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          zIndex: 1000
        }}>
          <h4 style={{ 
            margin: '0 0 0.5rem 0',
            color: 'var(--app-brand-color-accent)',
            fontSize: '1rem',
            fontWeight: 600
          }}>
            Token Relationships
          </h4>
          <div style={{ 
            fontFamily: 'var(--app-font-family-courier, monospace)',
            fontSize: '0.85rem',
            color: 'var(--app-text-primary)',
            marginBottom: '0.5rem',
            fontWeight: 600
          }}>
            {highlightedToken}
          </div>
          <div style={{ 
            fontSize: '0.85rem',
            color: 'var(--app-text-secondary)',
            lineHeight: 1.4
          }}>
            {tokenHierarchy[highlightedToken]?.description || 'Part of the design system token hierarchy'}
          </div>
        </div>
      )}
    </div>
  );
};

export const InteractiveTokenVisualization = {
  render: () => <TokenLayerVisualization />,
  parameters: {
    docs: {
      description: {
        story: 'Interactive visualization of the design system token architecture, showing relationships between raw Material Design palettes, system tokens, and semantic app tokens.'
      }
    }
  }
};
