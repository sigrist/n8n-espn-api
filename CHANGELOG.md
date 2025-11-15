# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.1-rc5] - 2025-11-15

### Fixed
- Fixed "Unrecognized node type" error by ensuring project build process is documented
- Added missing dist folder generation step in development workflow

### Changed
- Updated documentation to clarify that npm run build must be executed before publishing

## [0.0.1-rc2] - 2025-11-15

### Fixed
- Fixed release workflow executing twice (removed 'created' event, kept only 'published')
- Fixed version mismatch between Git tag and npm package
- Added automatic version extraction from Git tags to package.json
- Corrected package.json version from 1.0.0 to 0.0.1-rc2

### Changed
- Automated release process: pushing a tag now automatically updates package.json and creates GitHub release
- Auto-detection of pre-release versions based on semver identifiers (alpha, beta, rc, pre, dev)

## [1.0.0] - 2025-11-15

### Added
- Initial release of n8n-nodes-espn-api
- Support for multiple sports: NFL, NBA, MLB, NHL, College Football, College Basketball, Soccer
- Soccer league support: EPL, La Liga, Bundesliga, Serie A, Ligue 1, MLS, UEFA Champions League
- Core operations:
  - Get Scoreboard (with date filtering)
  - Get Teams (list all teams)
  - Get Team (specific team details)
  - Get Standings (league standings)
  - Get Athletes (list all athletes)
  - Get Athlete (specific athlete details)
  - Get News (latest news articles)
- Configurable parameters:
  - Date selection for scoreboards
  - Team ID and Athlete ID for specific queries
  - Season selection for standings
  - Limit parameter for controlling result size
  - Week parameter for NFL/College Football
- ESPN-branded node icon
- Comprehensive documentation
