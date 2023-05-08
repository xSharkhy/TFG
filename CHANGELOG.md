# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

-   Terms and conditions, privacy policy and cookies policy are now available on the footer, though they are not implemented yet.
-   Blocking certain routes if the user is or not logged in.

## [0.0.4] - 2023-05-08

### Added

-   Added `dotenv` to the project, now the `.env` file is used to store the `PORT` and `MONGO_URI` variables.
-   Basic routes routing, the game is now rendered on `/game` and the login and register forms on `/login` and `/signup` respectively.
-   Authentication is now working, you can register and login with your account, though it's not fully implemented yet.
-   Custom colors for `TailwindCSS`.
-   Comunication between frontend, backend and database is properly working now.

### Changed

-   Major refactor on the project, now it's more organized and easier to understand.
-   Improved User model, now it's more complete and has more fields.

## [0.0.3] - 2023-04-26

### Added

-   Added Authentication forms.
-   Added `TailwindCSS` to the project. For now, it's only used on basic forms.
-   Added basic routing to the project, now you can navigate between the login and register pages.

### Changed

-   Refactored whole project, now it's more organized and easier to understand.
-   Resolved correctly the problem with `mongoose` not reading `localhost` as a valid host, now using `127.0.0.1`.

## [0.0.2] - 2023-04-25

### Added

-   Added `concurrency` to `package.json` to run the frontend and backend together.
-   Created `Index.tsx` to render the game, now `index.html` points correctly to it.

### Changed

-   CHANGELOG.md now follows the date format YYYY-MM-DD (ISO 8601)
-   Corrected and documented `PhaserGame.tsx`.
-   Fix on `load.ts`, the load bar is faster now (only for development purposes).

## [0.0.1] - 2023-04-24

### Added

-   Initial release.
-   Builded all dependencies.
-   Basic configuration for the project, including:
    -   .gitignore
    -   Frontend with React, Vite, Phaser and Typescript configuration files.
    -   Backend with MongoDB and Express configuration files.

[0.0.1]: https://github.com/xSharkhy/TFG/releases/tag/v0.0.1
[0.0.2]: https://github.com/xSharkhy/TFG/compare/v0.0.1...v0.0.2
[0.0.3]: https://github.com/xSharkhy/TFG/compare/v0.0.2...v0.0.3
[0.0.4]: https://github.com/xSharkhy/TFG/compare/v0.0.3...v0.0.4
