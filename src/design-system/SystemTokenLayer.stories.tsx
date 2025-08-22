import React, { useState, useMemo } from "react";

import SystemTokenLayer from './SystemTokenLayer';
import { parseTokensFromLiveCSS as parseTokensFromCSS, buildTokenMappings, getTokenValue } from './utils';


export default {
  title: "Design Tokens/System",
  component: SystemTokenLayer,
  tags: ["autodocs"],
};


interface StoryConfig {
  universalScale: number;
  systemTokenSize?: number;
  showAllSystemTokens?: boolean;
}


const SystemTokenLayerVisualization = ({ 
  universalScale = 1,
  systemTokenSize,
  showAllSystemTokens = false
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

  // System token hover handler with relationship logic
  const handleSystemTokenHover = (tokenName: string, enter: boolean) => {
    if (enter) {
      const allRelated = [tokenName];
      
      // Find semantic tokens that this system token maps to
      const relatedSemanticTokens = tokenMappings.systemToSemantic[tokenName] || [];
      allRelated.push(...relatedSemanticTokens);
      
      // Find raw tokens that map to this system token (reverse lookup)
      Object.entries(tokenMappings.mappings).forEach(([rawToken, mappedTokens]) => {
        if (Array.isArray(mappedTokens) && mappedTokens.includes(tokenName)) {
          allRelated.push(rawToken);
        }
      });
      
      setHighlightedTokens(allRelated);
    } else {
      setHighlightedTokens([]);
    }
  };

  // System color categories for the intermediate layer
  // Note: This shows real CSS data with some demonstration categorization
  const systemColorCategories = showAllSystemTokens ? [
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
      name: "Other System", 
      tokens: Object.keys(parsedTokens.systemTokens).filter(token => 
        !token.includes('primary') && !token.includes('secondary') && 
        !token.includes('tertiary') && !token.includes('error') && 
        !token.includes('surface') && !token.includes('background') && 
        !token.includes('outline')
      )
    }
  ].filter(category => category.tokens.length > 0) : [
    // Simplified demonstration categories - just show basic token groups
    { 
      name: "Primary System", 
      tokens: Object.keys(parsedTokens.systemTokens).filter(token => 
        token.includes('primary')
      ).slice(0, 6)
    },
    { 
      name: "Secondary System", 
      tokens: Object.keys(parsedTokens.systemTokens).filter(token => 
        token.includes('secondary')
      ).slice(0, 6)
    },
    { 
      name: "Surface System", 
      tokens: Object.keys(parsedTokens.systemTokens).filter(token => 
        token.includes('surface')
      ).slice(0, 6)
    },
    { 
      name: "Text & Outline", 
      tokens: Object.keys(parsedTokens.systemTokens).filter(token => 
        token.includes('outline') || token.includes('on-')
      ).slice(0, 6)
    }
  ].filter(category => category.tokens.length > 0);

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
        System Token Layer
      </h1>
      
      <p style={{ 
        marginBottom: '2rem',
        color: 'var(--app-text-secondary)',
        lineHeight: 1.6
      }}>
        <strong>🔶 Mixed Data:</strong> Material Design 3 system tokens parsed from CSS files, 
        with some filtered/limited categories for demonstration purposes. System tokens reference 
        raw palette tokens and are consumed by semantic tokens. Toggle "Show All" to see the complete set.
      </p>

      {/* Debug info */}
      <div style={{ 
        marginBottom: '1rem', 
        padding: '0.5rem', 
        background: 'var(--app-surface-variant)', 
        borderRadius: '4px',
        fontSize: '0.8rem',
        color: 'var(--app-text-secondary)'
      }}>
        <strong>Debug:</strong> Found {Object.keys(parsedTokens.systemTokens).length} system tokens
        {Object.keys(parsedTokens.systemTokens).length > 0 && (
          <>
            <br />
            Sample tokens: {Object.keys(parsedTokens.systemTokens).slice(0, 3).join(', ')}...
          </>
        )}
      </div>

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
    </div>
  );
};

// STORY DEFINITION
export const Default = {
  args: {
    universalScale: 1,
    systemTokenSize: undefined,
    showAllSystemTokens: false,
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
    systemTokenSize: {
      control: { 
        type: 'number', 
        min: 10, 
        max: 100, 
        step: 1 
      },
      description: 'Override size for system tokens (px). Leave empty to use default.',
    },
    showAllSystemTokens: {
      control: { 
        type: 'boolean'
      },
      description: 'Toggle to show all system tokens vs only those used by semantic tokens',
    },
  },
  render: (args: StoryConfig) => <SystemTokenLayerVisualization {...args} />,
  parameters: {
    docs: {
      description: {
        story: '🔶 **Mixed Data**: Interactive display of Material Design 3 system tokens with a combination of real CSS data and filtered/demonstration categories. System tokens serve as an intermediate layer between raw palette tokens and semantic application tokens. The component parses actual CSS custom properties but applies filtering logic that may limit the displayed tokens for demonstration purposes. Use the "Show All" toggle to see the complete token set vs. a curated subset. Hover over any token to see its relationships to raw and semantic tokens. **Note**: Some categories show limited tokens (4 max) or filtered results for better story presentation.'
      }
    }
  }
};
