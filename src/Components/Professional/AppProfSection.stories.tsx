import type { Meta, StoryObj } from '@storybook/react';
import AppProfSection, { type ProfessionalSectionProps } from './AppProfSection';
import { 
  useThemeComparison,
  ensureCleanThemeState,
  enforceLegacyDarkMode
} from '../HOC/LightDarkComparison';
import { lightTheme, darkTheme } from '../../theme';


// Story summary / metadata
const storyMeta: Meta<typeof AppProfSection> = {
  component: AppProfSection,
  title: "AppProfSection",
  tags: ["autodocs"],
};

export default storyMeta;


interface ComponentStory {
  args: ProfessionalSectionProps;
}

// 1: Light Mode Colors
const LightMode: ComponentStory = {
  args: {
    // same interface as the props of the Component
    data: {
      experience_items: [
        {
          title: "Software Engineer",
          company: "GG Navi",
          activities: ["other activity"],
          location: "Mountain View, CA",
          duration: "Sep 2022 - May 2023",
          description: "I worked at GG Navi as a Software Engineer.",
          technology_tags: ["python", 'docker'],
        },
        {
          title: "Software Engineer",
          company: "GG Navi",
          location: "Mountain View, CA",
          activities: ["other activity"],
          duration: "Sep 2022 - May 2023",
          description: "I worked at GG Navi as a Software Engineer.",
          technology_tags: ["python", 'docker'],
        },
      ]
    },
    theme: lightTheme.professional,
    id: 'storybook-professional-section-light',
  },
};
export { LightMode };

// 2: Dark Mode Colors (Legacy - Protected from HOC interference)
const DarkMode: ComponentStory & { decorators?: any[] } = {
  decorators: [ensureCleanThemeState()],
  args: {
    ...LightMode.args,
    theme: darkTheme.professional,
    id: 'storybook-professional-section-dark',
  },
};      
export { DarkMode };


type Story = StoryObj<typeof storyMeta>;

export const LightAndDarkSideBySide: Story = {
  decorators: [useThemeComparison({ 
    lightLabel: "🔧 DECORATOR LIGHT",
    darkLabel: "🔧 DECORATOR DARK",
    gap: "32px" 
  })],
  render: () => (
    <AppProfSection {...LightMode.args}/>
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

export const DarkModeProtected: Story = {
  decorators: [ensureCleanThemeState()],
  render: () => (
    <AppProfSection 
      {...LightMode.args}
      theme={darkTheme.professional}
      id="legacy-dark-protected"
    />
  ),
};
