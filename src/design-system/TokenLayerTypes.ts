// Shared types and interfaces for token layer components

export interface TokenMappings {
  mappings: Record<string, string[]>; // raw -> system/semantic mappings
  systemToSemantic: Record<string, string[]>; // system -> semantic mappings
  tokens: ParsedTokens;
}

export interface ParsedTokens {
  rawTokens: Record<string, string>;
  systemTokens: Record<string, string>;
  semanticTokens: Record<string, string>;
  semanticTokensByTheme: {
    light: Record<string, string>;
    dark: Record<string, string>;
  };
}

export interface TokenLayerProps {
  // Common props for all token layers
  highlightedTokens: string[];
  copiedToken: string | null;
  universalScale: number;
  onTokenHover: (tokenName: string, enter: boolean) => void;
  onTokenCopy: (tokenName: string) => void;
  getTokenValue: (tokenName: string) => string;
  isTokenHighlighted: (tokenName: string) => boolean;
}

export interface RawTokenLayerProps extends TokenLayerProps {
  rawTokenSize?: number;
  sourceColor?: string;
  colorCategories: Array<{
    name: string;
    palette: string;
  }>;
}

export interface SystemTokenLayerProps extends TokenLayerProps {
  systemTokenSize?: number;
  showAllSystemTokens?: boolean;
  systemColorCategories: Array<{
    name: string;
    tokens: string[];
  }>;
}

export interface SemanticTokenLayerProps extends TokenLayerProps {
  semanticTokenSize?: number;
  semanticTokenCategories: Array<{
    name: string;
    tokens: string[];
  }>;
}
