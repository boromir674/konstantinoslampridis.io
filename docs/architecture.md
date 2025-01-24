
# Architecture

> Detailed Project Architecture

## Application

```mermaid
block-beta
  columns 7
  
  %% ROW 1
  Frontend["Pages"]
  leftID1<[" "]>(left)
  Backend["Components:
  
  src/Components"]:5

  %% ROW 2  

  space:4
  up1<[" "]>(up)
  space
  up2<[" "]>(up)

  %% ROW 3

  Design_System["Design System
  
  src/design-system/"]

  right11<[" "]>(right)
    THEME_LIB["Theme Library

    src/theme/"]

right2<[" "]>(right)

  Hooks["React Hooks"]
  space
  %%Hoc["Higher-Order Components"]
  Hoc["HoC"]


  classDef front fill:#696,stroke:#333;
  classDef back fill:#969,stroke:#333;
  class Frontend front
  class Backend,Database back
```

### Alternative Diagram

```mermaid
block-beta

columns 3
%% APPLICATION - group taking up whole row

    PAGES["Pages: src/pages/"]:3

    REACT["React Components: src/Components/"]:3


    HOOKS["React Hooks

    src/Hooks/"]:2

    HOC["Higher-Order Components:
    
    src/Components/hoc.tsx
    src/HoC/"]

    DS["Design System

    src/design-system/"]

    THEME_LIB["Theme Library

    src/theme/"]

```

## Automated Tests

```mermaid
block-beta

columns 6

  TEST["Jest"]:4
  CYPRESS["Cypress: E2E
  
  e2e/"]:2

  %% JEST

  jest_config["Jest Config

  jest.config.ts
  jest-preprocess.js
  loadershim.js"]

  test_code["Tests

  __tests__/test_*.tsx"]

  test_data["Test Data

  __tests__/test_*.tsx.snap"]

  mocks["Test Mocks
  
__mocks__/"]

  %% CYPRESS - E2E
  CYPRESS_SPECS["Cypress Specs
  
  e2e/cypress/e2e/*.cy.js"]

  CYPRESS_C["Cypress Config
  
  e2e/cypress-config.ts"]


```

## Build

```mermaid
block-beta
  columns 5

  %% BUILD - GATSBY - WEBPACK - SSR
  %% 1 
  YARN["BUILD

    package.json
    yarn.lock"]

  %% 5
  TS["Typescript Config
  
  tsconfig.json"]

  %% 4
  BABEL["Babel Config
  
  babel.config.js"]

  %% 2
  GATSBY_CONFIG["Gatsby Config
  
  gatsby-config.ts"]

  %% 3
  GATSBY_Node["Gatsby Node
  
  gatsby-node.ts
  src/js-yaml.d.ts  (typing)"]

```

## CI/CD

```mermaid
block-beta
  columns 2

  %% CI/CD - group taking up whole row
  CICD["CI/CD Pipeline: .github/workflows/cicd.yml"]

  block:TEMPLATES
  columns 2
    test["Test with jsdom: test.yml"]

    build["Build SSR Site: build.yml"]

    e2e["Cypress E2E: e2e-test.yml"]

    lighthouse["Lighthouse Audit: lighthouse.yml"]

    deploy["Deploy: deploy.yml"]

  end


```

## Storybook - Front-end Lab
```mermaid
block-beta
  columns 4
  
  STORIES["Component Stories:
  
  src/Components/**/*.stories.tsx?"]

    PoC["Proof of Concept Stories:
    
    src/stories/*.stories.tsx?"]

    AS_CONFIG["Storybook Config
    
    .storybook/main.ts"]


    DT_CONFIG["Storybook Design Tokens Config
    
    .storybook/preview.ts"]
%% STORYBOOK - BLOCK
```

## LOCAL DEV
```mermaid
block-beta
  columns 5

%% LOCAL DEV - BLOCK - START

    GIT["Git
    
    .gitignore"]

    DOCKER["Docker
    
    Dockerfile
    docker-compose.yml
    .dockerignore"]

    DEV_CONTAINERS["Dev Containers
    
    .devcontainer/"]

    MAKE["Make
    
    Makefile
    config.env"]

    SCRIPTS["Scripts
    
    scripts/"]

%% LOCAL DEV - BLOCK - END
```

## Repository Essentials

- `README.md`
- `LICENSE`
- `CHANGELOG.md`
