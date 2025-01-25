# Changelog

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](https://semver.org/).

## [1.13.0] - 24/01/2025

### Changes

#### Feature
- run `Content-Aware Algorithm` on (Grid `Portfolio Item`) **Resize Item events**
- preserve minimum gap between `Links` and `Releases Panes` in `Portfolio Item`

#### Refactor
- expose top and bottom margin CSS  props in AppTheme
- preserve styles of AppPortfolioItem, but expose margin props
- delegate Grid onResize Handler logic to new Hooks
- add HoC and Hook for Content-Aware Algo solution
- provide only the onLayoutChange handler via the useGridLayoutHandlers Hook
- allow Typography to accept ref and bind it to DOM element
- accept ref from PortfolioItemContainer (aka AppPortfolioItem) and bind to inner DIV

#### Test
- accept Portfolio Project Title css className changed snapshot hash

#### CI
- accept **Prod Builds** of **2.6MB size**

#### Docs
- docs: add **Architecture Diagrams**
- add comments for `Typescript Compiler Options` in config file

#### Story
- track and commit all PoC Stories
- Content-Aware RGL + Grid Item Render Times
- PortfolioSection with Content-Aware onResize Handler
- easier visual proof for useMemo with distributed State RGL PoC
- demonstrate how to render an RGL with Content-Aware onResize Handler
- add story as poc for content-aware onResize handler!
- automatically nest Stories inside src/stories dir under the PoC group

#### Dev
- exclude from docker build the *.stories.* files


## [1.12.0] - 11/01/2025

### Changes

#### Feature
- make `Portfolio Section` **SSR** compatible
- dynamically adjust Portfolio Item content's "text-wrap", on `User item-resize`
- prevent `Portfolio Description` from overflowing to the right in cases where Grid Item is small
- change `zIndex` to 100 (from 10) when on Resource Link Hover

#### Refactor
- eliminate all dev server warnings
- remove 2 DIVs from the Element (sub) tree that `Portfolio Item` renders
- **memoize** `Portfolio Items` to minimize re-renders git st
- allow passing renderProps callback through Portfolio Section props
- delegate Layouts State and LS integration to new Hook

#### Docs
- update README's reported Bundle Size to 2.4MB from old 2.7MB
- clean code, add comments, and docstrings

#### Story
- add the `Portfolio Section Experimental` Story to Experiment/Verify new code-updates on Portfolio Section
- add multiple Grid Stories to verify PoC's


## [1.11.0] - 26/12/2024

### Changes

#### Feature
- better Dark Mode Release Button/Dialog/Code Color Contrast
- memoize and useCallback for everything in App Component

#### CI
- fix secret passing to deploy.yml called Workflow

#### Test
- Personal Info with dedicated Snapshot and low-level sanity check

#### Dev
- create Stories for Comparing Light Grid Color Contrast
- solve and add @types/jest for IDE typechecking of Jest Tests, in Dev Container
- use useCallback with render props pattern in AppPortfolioItem
- leave only the setZIndex function in the ZIndex Contenxt Interface
- eliminate warning from Stories that need ZIndex Context Provider, by adding it


## [1.10.0] - 21/12/2024

### Changes

#### Feature
- use app Theme for color styles of Copy pop-up
- simple Copied pop-up on shell cmd user copy
- copy to clipboard on shell command click
- style Introduction Section text

#### CI
- accept 2.5MB of prod build Bundle Size; a 4.17% increase from previous 2.4MB
- improve inputs description for Headless Lighthouse Reusable Workflow
- properly invalidate Cloudfront Distribution

#### Test
- update snapshots data

#### Dev
- add new story to examine Single Release Button inside a Reactive Grid
- install make in Dev Container and run 'yarn install' at post Start


## [1.8.0] - 14/09/2024

### Changes

#### Feature
- style Introduction Section text

#### Test
- update snapshots data


## [1.7.0] - 13/09/2024

**New Content Updates:**
- `D-Cube` Experience Item
- Open Source Projects
  - `Automated Workflows`
  - `Action Sem Ver Bumper`
  - `Action Changelog CI`
  - `Action Generate Changelog`

### Changes

#### Feature
- add 'D-Cube' Experience Item and improve 'Ecodev' one
- render 4 new Projects in Portfolio

#### CI
- call Resuable Workflow for 'Tag on Main' Workflow
- bump 'boromir674/automated-workflows' to v1.13.1 for 'PR to boarding' and 'Check CI Green' Jobs
- ci: use boromir674/all-greens fork
- ci: use commit from recent fix in all-greens action
- improve script code
- implement dynamic acceptance Job, using the all-greens action
- fix automated derivation of New Prod Tag


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
