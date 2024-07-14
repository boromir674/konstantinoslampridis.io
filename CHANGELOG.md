# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/).


## [1.5.2] - 14/07/2024

**Reducing the Minified Bundle to 2.3MB from 2.7MB**
- **~15%** Bundle Size reduction
- getting rid of [`polyfill`](https://developer.mozilla.org/en-US/docs/Glossary/Polyfill)
  - polyfill-6534e443b1457de06b09.js
  - polyfill-6534e443b1457de06b09.js.map

**Improving Lighthouse Audit Score**:
- Eliminating the [`max-potential-fid`](https://developer.chrome.com/docs/lighthouse/performance/lighthouse-max-potential-fid/) failed LH Assertion

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
