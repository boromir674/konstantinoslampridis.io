import React, { useState, useMemo } from "react";

import RawTokenLayer from './RawTokenLayer';
import { parseTokensFromLiveCSS as parseTokensFromCSS, buildTokenMappings, getTokenValue } from './utils';


export default {
  title: "Design Tokens/Raw",
  component: RawTokenLayer,
  tags: ["autodocs"],
};


interface StoryConfig {
  universalScale: number;
  rawTokenSize?: number;
  sourceColor?: string;
}

const RawTokenLayerVisualization = ({ 
  universalScale = 1,
  rawTokenSize,
  sourceColor = "#ff9288"
}: StoryConfig) => {
  // Shared state for token interactions
  const [highlightedTokens, setHighlightedTokens] = useState<string[]>([]);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  
  // Parse tokens and build mappings
  const parsedTokens = useMemo(() => parseTokensFromCSS(), []);
  const tokenMappings = useMemo(() => buildTokenMappings(parsedTokens), [parsedTokens]);

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

  const isTokenHighlighted = (tokenName: string) => {
    return highlightedTokens.includes(tokenName);
  };

  // Raw token hover handler with relationship logic
  const handleRawTokenHover = (tokenName: string, enter: boolean) => {
    if (enter) {
      const relatedTokens = tokenMappings.mappings[tokenName] || [];
      const allRelated = [tokenName, ...relatedTokens];
      
      // Also check for system tokens that map to semantics
      relatedTokens.forEach(token => {
        const semanticTokens = tokenMappings.systemToSemantic[token] || [];
        allRelated.push(...semanticTokens);
      });
      
      setHighlightedTokens(allRelated);
    } else {
      setHighlightedTokens([]);
    }
  };

  // Color categories for raw palette
  const colorCategories = [
    { name: "primary", palette: "md-ref-palette-primary" },
    { name: "secondary", palette: "md-ref-palette-secondary" },
    { name: "tertiary", palette: "md-ref-palette-tertiary" },
    { name: "neutral", palette: "md-ref-palette-neutral" },
    { name: "neutral-variant", palette: "md-ref-palette-neutral-variant" },
  ];

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
        marginBottom: '1rem',
        fontSize: '2rem'
      }}>
        Raw Token Layer
      </h1>
      
      <p style={{ 
        marginBottom: '2rem',
        color: 'var(--app-text-secondary)',
        lineHeight: 1.6
      }}>
        <strong>🔴 Live CSS Data:</strong> Material Design 3 raw palette tokens parsed from actual CSS files. 
        These are the foundational color values that system tokens reference. 
        Hover over any token to see its relationships to system and semantic tokens.
      </p>

      <RawTokenLayer
        highlightedTokens={highlightedTokens}
        copiedToken={copiedToken}
        universalScale={universalScale}
        rawTokenSize={rawTokenSize}
        sourceColor={sourceColor}
        colorCategories={colorCategories}
        onTokenHover={handleRawTokenHover}
        onTokenCopy={copyTokenToClipboard}
        getTokenValue={getTokenValue}
        isTokenHighlighted={isTokenHighlighted}
      />
    </div>
  );
};


// STORY DEFINITION
export const Default = {
  args: {
    universalScale: 1,
    rawTokenSize: undefined,
    sourceColor: "#ff9288",
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
    sourceColor: {
      control: { 
        type: 'color'
      },
      description: 'Source color used to generate the color palette',
    },
  },
  render: (args: StoryConfig) => <RawTokenLayerVisualization {...args} />,
  parameters: {
    docs: {
      description: {
        story: '🔴 **Live CSS Data**: Interactive display of Material Design 3 raw palette tokens parsed from actual CSS files in the project. These foundational color values serve as the source for system tokens. Each color category displays its full range from lightest to darkest variants. Hover over any token to see which system and semantic tokens reference it. Click any token to copy its CSS variable name to the clipboard. **Note**: Token data is dynamically parsed from document.styleSheets, so it reflects the actual CSS loaded in the browser.'
      }
    }
  }
};
