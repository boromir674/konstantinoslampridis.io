/* Placeholders to customize the Gatsby build process, like adding built-time data */

/* Gatsby gives plugins and site builders many APIs for building your site.
* Code in the file gatsby-node.js/gatsby-node.ts is run once in the process
* of building your site. You can use its APIs to create pages dynamically,
* add data into GraphQL, or respond to events during the build lifecycle.
*/

// Gatsby offers various hooks, if you implement the corresponding API
// - https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/

// Quick ref to available hooks
// - onCreateWebpackConfig
// - onCreateBabelConfig
// - onCreatePage
// - onCreateNode
// - createSchemaCustomization
// - createPages
// - createResolvers

import { CreateNodeArgs, GatsbyNode, SourceNodesArgs, PluginOptions, PluginCallback } from "gatsby";
import yaml from "js-yaml";
import fs from "fs";
import { UserDefinedTextData } from "./src/types";

// Skills extraction utilities
interface ExtractedSkill {
  name: string;
  frequency: number;
  sources: string[]; // 'portfolio' | 'professional'
  category?: string; // auto-categorized
}

// HEURISTIC ALGO for Skills Extraction
function extractSkillsFromData(data: UserDefinedTextData): ExtractedSkill[] {
  const skillFrequency = new Map<string, { count: number; sources: Set<string> }>();
  
  // Extract from portfolio tags
  data.portfolio?.forEach(project => {
    project.tags?.forEach(tag => {
      const normalizedSkill = normalizeSkillName(tag);
      if (normalizedSkill) {
        const existing = skillFrequency.get(normalizedSkill) || { count: 0, sources: new Set() };
        existing.count++;
        existing.sources.add('portfolio');
        skillFrequency.set(normalizedSkill, existing);
      }
    });
  });

  // Extract from professional technology_tags
  data.professional?.experience_items?.forEach(item => {
    item.technology_tags?.forEach(tech => {
      const normalizedSkill = normalizeSkillName(tech);
      if (normalizedSkill) {
        const existing = skillFrequency.get(normalizedSkill) || { count: 0, sources: new Set() };
        existing.count++;
        existing.sources.add('professional');
        skillFrequency.set(normalizedSkill, existing);
      }
    });
  });

  // Convert to array and sort by frequency
  const skills: ExtractedSkill[] = Array.from(skillFrequency.entries())
    .map(([name, data]) => ({
      name,
      frequency: data.count,
      sources: Array.from(data.sources),
      category: categorizeSkill(name)
    }))
    .sort((a, b) => b.frequency - a.frequency);

  return skills;
}

// Normalization baseed on hard-coded mapping (aka binning/classification)
function normalizeSkillName(skill: string): string | null {
  if (!skill) return null;
  
  // Basic normalization: trim, lowercase, handle common variations
  const normalized = skill.trim();
  
  // Skip very short or generic terms
  if (normalized.length < 2) return null;
  
  // Common skill name mappings/normalizations
  const skillMappings: Record<string, string> = {
    'js': 'JavaScript',
    'ts': 'TypeScript',
    'py': 'Python',
    'api': 'API Development',
    'rest api': 'REST API',
    'ci/cd': 'CI/CD',
    'scrum/agile': 'Agile/Scrum',
    'ml': 'Machine Learning',
    'ai': 'Artificial Intelligence',
    'nlp': 'Natural Language Processing',
    'cv': 'Computer Vision'
  };

  const lowerNormalized = normalized.toLowerCase();
  return skillMappings[lowerNormalized] || normalized;
}

function categorizeSkill(skillName: string): string {
  const skill = skillName.toLowerCase();
  
  // Programming Languages
  if (/^(python|javascript|typescript|java|c\+\+|c#|go|rust|php|ruby|swift|kotlin)$/i.test(skill)) {
    return 'Programming Languages';
  }
  
  // Frameworks & Libraries
  if (/^(react|vue|angular|django|flask|fastapi|express|spring|laravel|rails)$/i.test(skill)) {
    return 'Frameworks & Libraries';
  }
  
  // DevOps & Infrastructure
  if (/^(docker|kubernetes|aws|azure|gcp|terraform|ansible|jenkins|gitlab|github actions|ci\/cd|gitops)$/i.test(skill)) {
    return 'DevOps & Infrastructure';
  }
  
  // Databases
  if (/^(postgresql|mysql|mongodb|redis|elasticsearch|cassandra|sqlite)$/i.test(skill)) {
    return 'Databases';
  }
  
  // Machine Learning & AI
  if (/^(machine learning|artificial intelligence|deep learning|neural networks|tensorflow|pytorch|scikit-learn|nlp|computer vision)$/i.test(skill)) {
    return 'Machine Learning & AI';
  }
  
  // Methodologies
  if (/^(agile|scrum|kanban|tdd|bdd|devops)$/i.test(skill)) {
    return 'Methodologies';
  }
  
  // Tools & Platforms
  if (/^(git|jira|confluence|slack|notion|figma|sketch|photoshop)$/i.test(skill)) {
    return 'Tools & Platforms';
  }
  
  return 'Other';
}


//// PUT DATA INTO THE DATA LAYER ////

/* Instruct Gatsby to put data into the Data Layer, served by the GraphQL API */
// export const sourceNodes: GatsbyNode["sourceNodes"] = async (
//   {
//     actions: { createNode },
//     // createNodeId,
//     createContentDigest,
//   }: SourceNodesArgs,
//   options: PluginOptions,
//   callback: PluginCallback<void>
// ) => {
export const sourceNodes = async ({
  actions: { createNode },
  // createNodeId,
  createContentDigest,
}: CreateNodeArgs) => {
  try {
    // Read the YAML files, parse them, and insert them into the Data Layer (GraphQL API)

    // Read Personal, Education, Professional Data file
    const yamlData = fs.readFileSync("data.yaml", "utf8");

    // Parse Personal, Education, Professional YAML data
    const data: UserDefinedTextData = yaml.safeLoad(yamlData);

    // Read Open Source Portfolio / Projects
    const portfolioYamlData = fs.readFileSync("data-portfolio.yml", "utf8");

    // Parse Open Source Portfolio / Projects YAML data
    const portfolioData = yaml.safeLoad(portfolioYamlData);

    // "attach" the portfolio data to the main data object
    data.portfolio = portfolioData.projects;

    // SKILLS SECTION: Check if skills exist in data.yaml, if not extract automatically
    let skills: ExtractedSkill[] = [];
    
    // Check if skills section exists in data.yaml
    const hasSkillsSection = (data as any).skills && Array.isArray((data as any).skills);
    
    if (hasSkillsSection) {
      console.log("📊 Found existing skills section in data.yaml");
      skills = (data as any).skills;
    } else {
      console.log("🔍 No skills section found, extracting automatically from portfolio and professional data...");
      
      // Auto-extract skills from portfolio tags and professional technology_tags
      skills = extractSkillsFromData(data);
      
      console.log(`✅ Extracted ${skills.length} unique skills automatically`);
      console.log("Top 10 skills by frequency:", skills.slice(0, 10).map(s => `${s.name} (${s.frequency})`));
    }

    // Add skills to the data object
    (data as any).skills = skills;

    // insert into the Data Layer, which exposes a GraphQL API
    // create node for build time data
    createNode({
      ...data,
      // required fields
      id: "user-defined-build-time-data",
      parent: null,
      children: [],
      internal: {
        // use type to "select" GraphQL node/Query. Example below
        // query {
        //   userDefinedWebsiteData {
        //     personal
        //   }
        // }
        type: "UserDefinedWebsiteData",
        content: JSON.stringify(data),
        contentDigest: createContentDigest(data),
      },
    });

    // callback();
  } catch (error) {
    console.error("Error reading or parsing YAML file:", error);
  }
};
