declare module "js-yaml" {
  type YamlClient = {
    safeLoad: (yamlData: string) => any;
  };

  const yaml: YamlClient;
  export default yaml;
}
