# Changelog

All notable changes to this project will be documented in this file.

## [0.0.2] - 2023-04-25

### Added

- Added `concurrency` to `package.json` to run the frontend and backend together.
- Created `Index.tsx` to render the game, now `index.html` points correctly to it.

### Changed

- CHANGELOG.md now follows the date format YYYY-MM-DD (ISO 8601)
- Corrected and documented `PhaserGame.tsx`.
- Fix on `load.ts`, the load bar is faster now (only for development purposes).

## [0.0.1] - 2023-04-24

### Added

- Initial release.
- Builded all dependencies.
- Basic configuration for the project, including:
  - .gitignore
  - Frontend with React, Vite, Phaser and Typescript configuration files.
  - Backend with MongoDB and Express configuration files.

[0.0.1]: https://github.com/xSharkhy/TFG/releases/tag/v0.0.1
[0.0.2]: https://github.com/xSharkhy/TFG/compare/v0.0.1...v0.0.2
