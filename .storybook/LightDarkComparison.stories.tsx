import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import LightDarkComparison, { 
  useThemeComparison, 
  ComponentThemeShowcase, 
  TokenValidationComparison,
  QuickThemeCheck 
} from './LightDarkComparison';


// Example component for demonstration
const ExampleCard: React.FC<{ title?: string; subtitle?: string }> = ({ 
  title = "Design System Card",
  subtitle = "Testing semantic tokens across themes"
}) => (
  <div style={{
    background: 'var(--app-surface-raised)',
    border: '1px solid var(--app-border-subtle)',
    borderRadius: '12px',
    padding: '24px',
    color: 'var(--app-text-primary)',
  }}>
    <h3 style={{ 
      color: 'var(--app-text-primary)',
      marginBottom: '8px',
      fontSize: '18px',
      fontWeight: '600'
    }}>
      {title}
    </h3>
    <p style={{ 
      color: 'var(--app-text-secondary)',
      fontSize: '14px',
      marginBottom: '16px'
    }}>
      {subtitle}
    </p>
    <button style={{
      background: 'linear-gradient(90deg, var(--app-accent-from), var(--app-accent-to))',
      color: 'white',
      border: 'none',
      padding: '8px 16px',
      borderRadius: '6px',
      cursor: 'pointer'
    }}>
      Test Button
    </button>
  </div>
);

const meta: Meta<typeof LightDarkComparison> = {
  title: 'HOC/LightDarkComparison',
  component: LightDarkComparison,
  parameters: {
    docs: {
      description: {
        component: `
# 🌗 Light/Dark Theme Comparison HOC

**Higher-Order Component for Design System Validation!**

Perfect for testing semantic token mappings, contrast validation, and component theming across light/dark modes in Storybook stories.

## 🎯 Key Features:
- **Reusable**: Works with any React component
- **Isolated Theming**: Perfect theme context isolation
- **Configurable**: Custom labels, layouts, spacing
- **Multiple Variants**: Basic, decorator, showcase, validation modes
- **Force Re-render**: Ensures tokens update properly

## 📦 Usage Patterns:

### Basic Wrapper:
\`\`\`tsx
<LightDarkComparison>
  <YourComponent {...props} />
</LightDarkComparison>
\`\`\`

### As Decorator:
\`\`\`tsx
decorators: [useThemeComparison()]
\`\`\`

### Component Showcase:
\`\`\`tsx
<ComponentThemeShowcase
  component={YourComponent}
  props={yourProps}
  title="COMPONENT NAME"
/>
\`\`\`

## 🔧 Perfect For:
- Design system token validation
- Component contrast checking  
- Client theme demonstrations
- Accessibility compliance testing
- Cross-theme consistency verification
        `
      }
    },
    layout: 'fullscreen',
  },
  argTypes: {
    lightLabel: {
      control: 'text',
      description: 'Label for the light theme container',
      defaultValue: '☀️ LIGHT MODE',
    },
    darkLabel: {
      control: 'text', 
      description: 'Label for the dark theme container',
      defaultValue: '🌙 DARK MODE',
    },
    gap: {
      control: 'text',
      description: 'Gap between light and dark containers',
      defaultValue: '24px',
    },
    layout: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'Layout direction for the comparison',
      defaultValue: 'horizontal',
    },
    showLabels: {
      control: 'boolean',
      description: 'Show/hide theme labels',
      defaultValue: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;



export const BasicUsage: Story = {
  render: (args) => (
    <LightDarkComparison {...args}>
      <ExampleCard />
    </LightDarkComparison>
  ),
  parameters: {
    docs: {
      description: {
        story: `
### Basic HOC Usage

**Simple Wrapper**: Renders any component in both light and dark themes side-by-side.

**Token Testing**: Perfect for validating:
- Surface token contrast (\`--app-surface-raised\`)
- Text readability (\`--app-text-primary/secondary\`)  
- Accent color visibility (\`--app-accent-from/to\`)
- Border contrast (\`--app-border-subtle\`)

**Use Case**: Quick component theme validation during development.
        `
      }
    }
  }
};

export const CustomLabels: Story = {
  args: {
    lightLabel: "🎨 LIGHT DESIGN",
    darkLabel: "🎨 DARK DESIGN",
  },
  render: (args) => (
    <LightDarkComparison {...args}>
      <ExampleCard title="Custom Labels Demo" />
    </LightDarkComparison>
  ),
  parameters: {
    docs: {
      description: {
        story: `
### Custom Theme Labels

**Branded Labels**: Customize the theme container labels for specific use cases:
- Design reviews: "🎨 LIGHT DESIGN" / "🎨 DARK DESIGN"  
- Client demos: "☀️ DAY MODE" / "🌙 NIGHT MODE"
- A11y testing: "🔍 HIGH CONTRAST" / "🔍 LOW CONTRAST"

**Professional Presentation**: Clean, branded appearance for stakeholder reviews.
        `
      }
    }
  }
};

export const VerticalLayout: Story = {
  args: {  // props
    layout: 'vertical',
    lightLabel: "🔝 LIGHT TOKENS",
    darkLabel: "🔽 DARK TOKENS",
  },
  render: (args) => (
    <LightDarkComparison {...args}>
      <ExampleCard title="Vertical Layout" subtitle="Top-bottom comparison for narrow screens" />
    </LightDarkComparison>
  ),
  parameters: {
    docs: {
      description: {
        story: `
### Vertical Layout Mode

**Top-Bottom Comparison**: Perfect for:
- Mobile-responsive design testing
- Narrow container scenarios  
- Token documentation layouts
- Progressive comparison flows

**Adaptive**: Automatically adjusts gradient background and spacing for vertical orientation.
        `
      }
    }
  }
};

export const AsDecorator: Story = {
  decorators: [useThemeComparison({ 
    lightLabel: "🔧 DECORATOR LIGHT",
    darkLabel: "🔧 DECORATOR DARK",
    gap: "32px" 
  })],
  render: () => (
    <ExampleCard title="Decorator Pattern" subtitle="Clean story definition using HOC decorator" />
  ),
  parameters: {
    docs: {
      description: {
        story: `
### Using as Story Decorator

**Clean Pattern**: Apply theme comparison at the story level:

\`\`\`tsx
export const MyStory: Story = {
  decorators: [useThemeComparison({ 
    lightLabel: "🔧 DECORATOR LIGHT",
    darkLabel: "🔧 DECORATOR DARK" 
  })],
  render: () => <YourComponent />
};
\`\`\`

**Benefits**: 
- Cleaner story definitions
- Consistent theming approach
- Reusable decorator patterns
- No wrapper component needed
        `
      }
    }
  }
};

export const ComponentShowcase: Story = {
  render: () => (
    <ComponentThemeShowcase
      component={ExampleCard}
      props={{ 
        title: "Showcase Demo",
        subtitle: "Pre-configured component presentation" 
      }}
      title="DESIGN CARD"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: `
### Component Theme Showcase

**Pre-configured Wrapper**: Ideal for component library documentation:

\`\`\`tsx
<ComponentThemeShowcase
  component={YourComponent}
  props={yourProps}
  title="COMPONENT NAME"
/>
\`\`\`

**Perfect For**:
- Component library catalogs
- Design system documentation  
- Client component presentations
- Stakeholder design reviews
        `
      }
    }
  }
};

export const TokenValidation: Story = {
  render: () => (
    <TokenValidationComparison gap="20px">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <ExampleCard title="Token Test 1" subtitle="Surface & Text Tokens" />
        <ExampleCard title="Token Test 2" subtitle="Accent & Border Tokens" />
        <ExampleCard title="Token Test 3" subtitle="Interactive Tokens" />
      </div>
    </TokenValidationComparison>
  ),
  parameters: {
    docs: {
      description: {
        story: `
### Design System Token Validation

**Specialized Layout**: Vertical orientation perfect for systematic token testing:

- **Surface Hierarchy**: Base → Raised → Interactive
- **Text Contrast**: Primary → Secondary → Accent
- **Border Visibility**: Subtle → Focus → Interactive
- **Accent Gradients**: From → To color progression

**Use Case**: Comprehensive design system validation and documentation.
        `
      }
    }
  }
};

export const QuickCheck: Story = {
  render: () => (
    <QuickThemeCheck containerPadding="8px" gap="12px">
      <ExampleCard title="Quick Check" subtitle="Minimal comparison for rapid testing" />
    </QuickThemeCheck>
  ),
  parameters: {
    docs: {
      description: {
        story: `
### Quick Theme Check

**Minimal Comparison**: Compact side-by-side for rapid component validation:

- **No Labels**: Clean, minimal appearance
- **Tight Spacing**: Efficient screen usage
- **Quick Validation**: Perfect for development workflow

**Use Case**: Fast component theme checks during development iterations.
        `
      }
    }
  }
};
