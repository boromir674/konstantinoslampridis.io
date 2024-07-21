# Changelog

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](https://semver.org/).


## [1.6.3] - 21/07/2024

Update to latest `Gatsby 4.x`, and update its `plugins`, and `babel`  
dev dep to their corresponding latest allowed


## [1.6.2] - 20/07/2024

Pinning package dependencies (`yarn.lock`) to versions same as v1.5.1.  
Then we add the `gatsby-plugin-manifest` package which generates favicons.
This **fixes a bug** wehre the Portfolio items were not draggable and were incorrectly placed on the grid.

### Fix
- portfolio items not draggable and incorrectly placed on grid

### CI
- expect **2 extra Polyfill** files, and **2.7MB Bundle Size** in `test-bundle` workflow

### Other
- fix 'run_dev_server' and 'static_file_server' make targets


## [1.6.1] - 20/07/2024

Reducing the Minified Bundle back to 2.3MB from regressed 2.7MB
- **~15%** Bundle Size reduction
- again getting rid of [`polyfill`](https://developer.mozilla.org/en-US/docs/Glossary/Polyfill) from the Minified Bundle (webpack).
  - polyfill-6534e443b1457de06b09.js
  - polyfill-6534e443b1457de06b09.js.map

We pin package dependencies to versions same as v1.5.2. Then we add the 'gatsby-plugin-manifest' package which generates favicons.  
This achieves the desired effect of having a smaller Bundle Size.

### Build
- revert yarn.lock to v1.5.2 and added gatsby-plugin-manifest

### CI
- reduce Lighthouse 'max-potential-fid' assertion score to 0.11

### Docs
- add usefull aliases for development in Readme Dev section

### Other
- leverate docker-compose for 'make yarn' target


## [1.6.0] - 17/07/2024

Adding **favicon(s)**.

### Feature
- add Favicon png and automatically generate at different sizes at build time

### Build
- support building site with static Favicons

### CI
- expect 50 Web Bundle files of 2.7MB in disk
- remove 2 expected 'erros-in-console' failed assertions from Lighthouse GS
- expect 8 favicons of specific different sizes, in icons/ dir
- explicitly pass the lighthouserc file to lhci CLI
- add set lighthouse.preset to 'all' and lower 'max-potential-fid' quality requirement

### Other
- improve reasoning for implementing Design Tokens with CSS Properties
- lint code
- remove unused ThemeProvider
- remove unused Component
- polish docker, compose, and make
- rename Dockerfile.build to Dockerfile
- add docker-compose.yml


## [1.5.2] - 14/07/2024

Reducing the Minified Bundle to 2.3MB from 2.7MB
- **~15%** Bundle Size reduction
- getting rid of [`polyfill`](https://developer.mozilla.org/en-US/docs/Glossary/Polyfill)
  - polyfill-6534e443b1457de06b09.js
  - polyfill-6534e443b1457de06b09.js.map

### Build
- do a 'yarn upgrade'

### CI
- update regression threshold at 2.3MB Bundle Size
- add Unit Tests as input to deploy signal & gatsby build earlier


## [1.5.2-rc] - 14/07/2024

Automated **Lighthouse CI** Tests and improved **CI/CD Pipeline**.

### Lighthouse CI
- new `Lighthouse` (LH) Reusable Workflow for Headless LH **Audits/Assertions**
- configure CI/CD Pipe to run `LH` on `built` web bundle (ie minified from `webpack`)
- report Live/Runtime Lighthouse Assertion Results as `md`, in Step Summary

### Other CI improvements
- improve Job Summary of 'Build Bundle' and 'Test Bundle' Workflows
- pass CI only if Minified web bundle does not exceed 2.7MB
- improve 'Test Bundle' Job trigger condition and add sanity check
- use `OVERRIDE_*` for naming the **`Top-level Override Switches`**

### Docs
- add section for lighthouse and `lhci` CLI's

### Docker
- declare a compose for running Headless Lighthouse

### Other
- update `.gitignore` and `.dockerignore` files


## [1.5.0] - 29/04/2024

### Added
- improve heuristic by which the initial Grid Items's widths are calculated, on first render

### Fixed
- make 'project-links' pop-ups appear stacked on top of neighbouring grid items
- make releases' pop-ups appear stacked on top of neighbouring grid items
- prevent overlap of Main and Footer content


## [1.4.0] - 27/04/2024

### Added
- Release v1.4.0

[Unreleased]: https://github.com/boromir674/konstantinoslampridis.io/compare/v1.5.0...HEAD
[1.5.0]: https://github.com/boromir674/konstantinoslampridis.io/releases/tag/v1.4.0...v1.5.0
