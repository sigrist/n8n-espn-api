# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
