/* we provide the type definition for js-yaml, since @types/js-yaml does not seem to work */

// example attempt to add module tye declarations:
// yarn add --dev @types/js-yaml

// each module declaration should have a 'declare module'
declare module "js-yaml" {
  type YamlClient = {
    safeLoad: (yamlData: string) => any;
  };

  const yaml: YamlClient;
  export default yaml;
}
