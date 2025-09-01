import React, { useState, useEffect } from 'react';

interface LightDarkComparisonProps {
  children: React.ReactNode;
  lightLabel?: string;
  darkLabel?: string;
  gap?: string;
  containerPadding?: string;
  showLabels?: boolean;
  layout?: 'horizontal' | 'vertical';
  lightBackground?: string;
  darkBackground?: string;
}

/**
 * 🌗 Higher-Order Component for Side-by-Side Light/Dark Theme Comparison
 * 
 * Perfect for Storybook stories to validate design system token mappings!
 * 
 * @example
 * ```tsx
 * export const ThemeComparison: Story = {
 *   render: (args) => (
 *     <LightDarkComparison>
 *       <YourComponent {...args} />
 *     </LightDarkComparison>
 *   ),
 * };
 * ```
 */
const LightDarkComparison: React.FC<LightDarkComparisonProps> = ({
  children,
  lightLabel = "☀️ LIGHT MODE",
  darkLabel = "🌙 DARK MODE",
  gap = "24px",
  containerPadding = "16px",
  showLabels = true,
  layout = "horizontal",
  lightBackground = "#ffffff",
  darkBackground = "#1a1a1a"
}) => {
  const [lightRef, setLightRef] = useState<HTMLDivElement | null>(null);
  const [darkRef, setDarkRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    // 🌞 LIGHT THEME: Ensure clean state
    if (lightRef) {
      lightRef.classList.remove('dark');
      delete lightRef.dataset.theme;
      // Force re-render to apply light tokens
      lightRef.style.display = 'none';
      lightRef.offsetHeight; // Trigger reflow
      lightRef.style.display = '';
    }

    // 🌙 DARK THEME: Apply dark mode classes
    if (darkRef) {
      darkRef.classList.add('dark');
      darkRef.dataset.theme = 'dark';
      // Force re-render to apply dark tokens
      darkRef.style.display = 'none';
      darkRef.offsetHeight; // Trigger reflow  
      darkRef.style.display = '';
    }
  }, [lightRef, darkRef]);

  const themeContainerStyle = (isLight: boolean): React.CSSProperties => ({
    flex: 1,
    background: isLight ? lightBackground : darkBackground,
    borderRadius: '12px',
    padding: containerPadding,
    boxShadow: isLight
      ? '0 4px 12px rgba(0, 0, 0, 0.1)'
      : '0 4px 12px rgba(0, 0, 0, 0.4)',
    position: 'relative',
    overflow: 'hidden',
    // Ensure proper isolation for theme tokens
    isolation: 'isolate',
  });

  const labelStyle = (isLight: boolean): React.CSSProperties => ({
    position: 'absolute',
    marginTop: '20px',
    top: '-8px',
    left: '16px',
    background: isLight ? '#007acc' : '#6366f1',
    color: 'white',
    padding: '4px 12px',
    borderRadius: '16px',
    fontSize: '12px',
    fontWeight: '600',
    zIndex: 10,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  });

  return (
    <div style={{
      display: 'flex',
      flexDirection: layout === 'horizontal' ? 'row' : 'column',
      gap,
      width: '100%',
      minHeight: layout === 'horizontal' ? '400px' : '800px',
      padding: '20px',
      background: layout === 'horizontal'
        ? `linear-gradient(90deg, #f8f9fa 50%, #2a2a2a 50%)`
        : `linear-gradient(180deg, #f8f9fa 50%, #2a2a2a 50%)`,
    }}>
      {/* 🌞 LIGHT THEME CONTAINER */}
      <div
        ref={setLightRef}
        style={themeContainerStyle(true)}
        data-theme-context="light"
      >
        {showLabels && (
          <div style={labelStyle(true)}>
            {lightLabel}
          </div>
        )}
        {children}
      </div>

      {/* 🌙 DARK THEME CONTAINER */}
      <div
        ref={setDarkRef}
        style={themeContainerStyle(false)}
        data-theme-context="dark"
      >
        {showLabels && (
          <div style={labelStyle(false)}>
            {darkLabel}
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default LightDarkComparison;

// 🎯 CONVENIENCE HOOKS FOR ADVANCED USAGE

/**
 * Hook to create a themed story decorator
 * 
 * @example
 * ```tsx
 * export const MyThemedStory: Story = {
 *   decorators: [useThemeComparison()],
 *   // ... rest of story
 * };
 * ```
 */
export const useThemeComparison = (options?: Partial<LightDarkComparisonProps>) => {
  return (Story: React.ComponentType) => (
    <LightDarkComparison {...options}>
      <Story />
    </LightDarkComparison>
  );
};

/**
 * Pre-configured comparison for component showcases
 */
export const ComponentThemeShowcase: React.FC<{
  component: React.ComponentType<any>;
  props?: any;
  title?: string;
}> = ({ component: Component, props = {}, title }) => (
  <LightDarkComparison
    lightLabel={title ? `☀️ ${title} - LIGHT` : undefined}
    darkLabel={title ? `🌙 ${title} - DARK` : undefined}
  >
    <Component {...props} />
  </LightDarkComparison>
);

// 🔧 DESIGN SYSTEM VALIDATION HELPERS

/**
 * 🛡️ Legacy Dark Mode Protection Decorator
 * 
 * Ensures clean theme state for legacy dark mode stories that rely on 
 * document-level theme application instead of the HOC approach.
 * 
 * Use this when you have existing dark mode stories that get messed up
 * by residual dark classes from HOC usage.
 * 
 * @example
 * ```tsx
 * export const LegacyDarkMode: Story = {
 *   decorators: [ensureCleanThemeState()],
 *   args: {
 *     theme: darkTheme.yourSection
 *   }
 * };
 * ```
 */
export const ensureCleanThemeState = () => {
  return (Story: React.ComponentType) => {
    React.useEffect(() => {
      // 🧹 CLEAN SLATE: Remove any residual dark theme classes/data
      document.documentElement.classList.remove('dark');
      delete document.documentElement.dataset.theme;

      // Force a reflow to ensure clean state is applied
      document.documentElement.offsetHeight;

      // Optional: Set explicit light state if needed
      // document.documentElement.classList.add('light');

    }, []);

    return <Story />;
  };
};

/**
 * 🌙 Legacy Dark Mode Enforcer Decorator
 * 
 * For legacy dark mode stories that need document-level dark theme application.
 * This ensures the story gets proper dark mode without HOC interference.
 * 
 * @example
 * ```tsx
 * export const LegacyDarkMode: Story = {
 *   decorators: [enforceLegacyDarkMode()],
 *   args: {
 *     theme: darkTheme.yourSection
 *   }
 * };
 * ```
 */
export const enforceLegacyDarkMode = () => {
  return (Story: React.ComponentType) => {
    React.useEffect(() => {
      // 🌙 LEGACY DARK MODE: Apply document-level dark theme
      document.documentElement.classList.add('dark');
      document.documentElement.dataset.theme = 'dark';

      // Cleanup function to restore when leaving story
      return () => {
        document.documentElement.classList.remove('dark');
        delete document.documentElement.dataset.theme;
      };
    }, []);

    return <Story />;
  };
};

/**
 * Vertical layout for design system token validation
 */
export const TokenValidationComparison: React.FC<LightDarkComparisonProps> = (props) => (
  <LightDarkComparison
    layout="vertical"
    gap="16px"
    lightLabel="🎨 LIGHT TOKENS"
    darkLabel="🎨 DARK TOKENS"
    {...props}
  />
);

/**
 * Compact side-by-side for quick component checks
 */
export const QuickThemeCheck: React.FC<LightDarkComparisonProps> = (props) => (
  <LightDarkComparison
    gap="16px"
    containerPadding="12px"
    showLabels={false}
    {...props}
  />
);
