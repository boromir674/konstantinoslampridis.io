interface PersonalWebsiteData {
  name: string;
  email: string;
  phone: string;
  location: string;
  links: {
    name: string;
    id: string;
    url: string;
  }[];
  description: string;
};

interface UserDefinedTextData {
  personal: PersonalWebsiteData,
  education: {
    name: string;
    location: string;
    degree: string;
    thesis_title: string;
    date: string;
    topics: string[];
  }[];
  professional: {
    experience_items: {
      title: string;
      company: string
      location: string;
      duration: string;
      description: string;
      activities: string[];
      technology_tags: string[];
    }[];
  };
  portfolio: {
    title: string;
    development_period: string;
    status: string;
    description: string;
    source_code_repo: string;
    resource_links?: {
      type: string;
      url: string;
    }[];
    release: {
      // artifact_type: string;
      type: string;
      url: string;
      command?: string;
      artifact_version: string;
      name: string;
    }[];
    tags: string[];
  }[];
};

export type { UserDefinedTextData };
