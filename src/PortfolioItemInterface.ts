interface ReleaseItemData {
  artifact_type: string;
  version: string;
  name: string;
};

/**
 * A Portfolio Item information.
 * @summary This is how the App represents a Portfolio item.
 * @interface PortfolioItemData
 * @property {string} title - The Item title (ie project name).
 * @property {string} development_period - The period of development (ie '2020 - 2021').
 * @property {string} status - The status of the project (ie 'mature', 'stable').
 * @property {string} description - A textual description of the project.
 * @property {string} source_code_repo - The URL of the source code repository.
 * @property {ReleaseItemData[]} release - List of releases (ie pypi, docker) of the project.
 * @property {string[]} tags - List of tags (ie 'python', 'typescript') of the project.
 */
interface PortfolioItemData {
  title: string;
  development_period: string;
  status: string;
  description: string;
  source_code_repo: string;
  release: {
    artifact_type: string;
    version: string;
    name: string;
  }[];
  tags: string[];
}

export default PortfolioItemData;
