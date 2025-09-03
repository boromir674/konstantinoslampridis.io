// Dynamic CSS token parsing from imported CSS files - now supports multiple selectors/themes

import { get } from "http";

type Tokens = {
    rawTokens: Record<string, string>;
    systemTokens: Record<string, string>;
    semanticTokens: Record<string, string>;
    semanticTokensByTheme: {
        light: Record<string, string>;
        dark: Record<string, string>;
    };
};

type ParseTokensFromCSS = () => Tokens;


export const parseTokensFromLiveCSS: ParseTokensFromCSS = () => {
    const allTokens: Tokens = { 
        rawTokens: {} as Record<string, string>, 
        systemTokens: {} as Record<string, string>, 
        semanticTokens: {} as Record<string, string>,
        semanticTokensByTheme: {
        light: {} as Record<string, string>,
        dark: {} as Record<string, string>
        }
    };

    if (typeof window === 'undefined') return allTokens;

    // Process all stylesheets, not just ones with specific hrefs
    Array.from(document.styleSheets).forEach(stylesheet => {
        try {
        const rules = Array.from(stylesheet.cssRules || []);
        
        rules.forEach(rule => {
            if (rule.type === CSSRule.STYLE_RULE) {
            const styleRule = rule as CSSStyleRule;
            const selector = styleRule.selectorText;
            
            // Process different selector types
            if (selector === ':root') {
                // Light mode / default tokens
                const style = styleRule.style;
                
                for (let i = 0; i < style.length; i++) {
                const prop = style[i];
                
                if (prop.startsWith('--')) {
                    const value = style.getPropertyValue(prop).trim();
                    if (!value) continue;
                    
                    // Categorize tokens by prefix
                    if (prop.startsWith('--md-ref-palette-')) {
                    allTokens.rawTokens[prop] = value;
                    } else if (prop.startsWith('--md-sys-color-')) {
                    allTokens.systemTokens[prop] = value;
                    } else if (prop.startsWith('--app-')) {
                    allTokens.semanticTokens[prop] = value;
                    allTokens.semanticTokensByTheme.light[prop] = value;
                    }
                }
                }
            } else if (selector.includes('.dark') || selector.includes('[data-theme="dark"]')) {
                // Dark mode tokens
                const style = styleRule.style;
                
                for (let i = 0; i < style.length; i++) {
                const prop = style[i];
                
                if (prop.startsWith('--app-')) {
                    const value = style.getPropertyValue(prop).trim();
                    if (value) {
                    allTokens.semanticTokensByTheme.dark[prop] = value;
                    // Also add to main semantic tokens if not already present
                    if (!allTokens.semanticTokens[prop]) {
                        allTokens.semanticTokens[prop] = value;
                    }
                    }
                }
                }
            }
            }
        });
        } catch (e) {
        // Silently handle CORS or other issues with external stylesheets
        console.warn('Could not read stylesheet rules:', e);
        }
    });

    return allTokens;
};


// Build dynamic mappings based on actual color values and var() references - now theme-aware
export const buildTokenMappings = (tokens: Tokens) => {

    const mappings: Record<string, string[]> = {};
    const systemToSemantic: Record<string, string[]> = {};

    // Helper function to extract var() references precisely
    const extractVarReferences = (value: string): string[] => {
        const varMatches = value.match(/var\(([^,)]+)/g);
        if (varMatches) {
        return varMatches.map(match => match.replace('var(', ''));
        }
        return [];
    };

    // Helper function to resolve var() references
    const resolveVarReference = (value: string): string => {
        const varMatch = value.match(/var\(([^,)]+)(?:,\s*([^)]+))?\)/);
        if (varMatch) {
        const varName = varMatch[1];
        // Try to get the actual computed value
        if (typeof window !== 'undefined') {
            const computedValue = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
            return computedValue || varMatch[2] || value; // fallback to default or original
        }
        return varMatch[2] || value; // fallback value or original
        }
        return value;
    };

    console.log('\n=== BUILDING THEME-AWARE TOKEN MAPPINGS ===');
    console.log('Light theme tokens:', Object.keys(tokens.semanticTokensByTheme.light).length);
    console.log('Dark theme tokens:', Object.keys(tokens.semanticTokensByTheme.dark).length);

    // Build raw → system/semantic mappings by matching color values
    Object.entries(tokens.rawTokens).forEach(([rawToken, rawValue]) => {
        const relatedTokens: string[] = [];
        
        // Find system tokens with same color value
        Object.entries(tokens.systemTokens).forEach(([systemToken, systemValue]) => {
        if (systemValue === rawValue || resolveVarReference(systemValue) === rawValue) {
            relatedTokens.push(systemToken);
        }
        });
        
        // Find semantic tokens that directly reference this raw token (check both themes)
        const allSemanticTokens = {
        ...tokens.semanticTokensByTheme.light,
        ...tokens.semanticTokensByTheme.dark
        };
        
        Object.entries(allSemanticTokens).forEach(([semanticToken, semanticValue]) => {
        const varReferences = extractVarReferences(semanticValue);
        const resolvedSemanticValue = resolveVarReference(semanticValue);
        
        // Direct reference check (more precise)
        if (varReferences.includes(rawToken)) {
            if (!relatedTokens.includes(semanticToken)) {
            relatedTokens.push(semanticToken);
            }
        }
        // Fallback to resolved value check
        else if (resolvedSemanticValue === rawValue) {
            if (!relatedTokens.includes(semanticToken)) {
            relatedTokens.push(semanticToken);
            }
        }
        });
        
        if (relatedTokens.length > 0) {
        mappings[rawToken] = relatedTokens;
        }
    });

    // Build system → semantic mappings (theme-aware)
    Object.entries(tokens.systemTokens).forEach(([systemToken, systemValue]) => {
        const relatedSemanticTokens: string[] = [];
        
        // Check light theme tokens
        Object.entries(tokens.semanticTokensByTheme.light).forEach(([semanticToken, semanticValue]) => {
        const varReferences = extractVarReferences(semanticValue);
        if (varReferences.includes(systemToken)) {
            relatedSemanticTokens.push(semanticToken);
            console.log(`✓ Light theme match: ${semanticToken} references ${systemToken}`);
        }
        });
        
        // Check dark theme tokens
        Object.entries(tokens.semanticTokensByTheme.dark).forEach(([semanticToken, semanticValue]) => {
        const varReferences = extractVarReferences(semanticValue);
        if (varReferences.includes(systemToken)) {
            if (!relatedSemanticTokens.includes(semanticToken)) {
            relatedSemanticTokens.push(semanticToken);
            }
            console.log(`✓ Dark theme match: ${semanticToken} references ${systemToken}`);
        }
        });
        
        if (relatedSemanticTokens.length > 0) {
        systemToSemantic[systemToken] = relatedSemanticTokens;
        }
    });

    console.log('System to Semantic mappings:', systemToSemantic);
    console.log('=== END THEME-AWARE MAPPING BUILD ===\n');

    return { mappings, systemToSemantic, tokens };
};


// Read CSS variable value dynamically from the document using 
export const getTokenValue = (token: string) => {
if (typeof window !== 'undefined') {
    return getComputedStyle(document.documentElement).getPropertyValue(token).trim();
}
return '#000000';
};


// Calculate effective size based on base size, override size, and universal scale
export const getEffectiveSize = (baseSize: number, overrideSize: number | undefined, universalScale: number): number => {
  const size = overrideSize ?? baseSize;
  return size * universalScale;
};

