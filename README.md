# n8n-nodes-espn-api

[![CI](https://github.com/sigrist/n8n-espn-api/actions/workflows/ci.yml/badge.svg)](https://github.com/sigrist/n8n-espn-api/actions/workflows/ci.yml)
[![Release](https://github.com/sigrist/n8n-espn-api/actions/workflows/release.yml/badge.svg)](https://github.com/sigrist/n8n-espn-api/actions/workflows/release.yml)
[![npm version](https://badge.fury.io/js/%40paulo.sigrist%2Fn8n-nodes-espn-api.svg)](https://www.npmjs.com/package/@paulo.sigrist/n8n-nodes-espn-api)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This is an n8n community node that allows you to consume the ESPN Public API in your n8n workflows.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## Features

This node provides access to ESPN's public API endpoints for various sports:

### Supported Sports
- **NFL** (National Football League)
- **NBA** (National Basketball Association)
- **MLB** (Major League Baseball)
- **NHL** (National Hockey League)
- **College Football**
- **College Basketball**
- **Soccer** (Multiple leagues)
  - English Premier League
  - La Liga
  - Bundesliga
  - Serie A
  - Ligue 1
  - MLS
  - UEFA Champions League

### Available Operations

1. **Get Scoreboard** - Retrieve scores and game information for a specific date
2. **Get Teams** - Get a list of teams in a league
3. **Get Team** - Get detailed information about a specific team
4. **Get Standings** - Retrieve current league standings
5. **Get Athletes** - Get a list of athletes
6. **Get Athlete** - Get detailed information about a specific athlete
7. **Get News** - Retrieve latest news articles

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

### Using npm

1. Go to **Settings > Community Nodes** in your n8n instance
2. Click **Install a community node**
3. Enter `@paulo.sigrist/n8n-nodes-espn-api` in the npm Package Name field
4. Click **Install**

### Manual Installation

1. Clone this repository or download it
2. Navigate to your n8n installation directory
3. Go to the custom nodes folder (usually `~/.n8n/custom/`)
4. Copy the compiled `dist` folder or install via npm:
   ```bash
   npm install @paulo.sigrist/n8n-nodes-espn-api
   ```

### Development Installation

For local development and testing before publishing:

See [INSTALL_DEV.md](INSTALL_DEV.md) for detailed instructions, or use the automated script:

```bash
git clone https://github.com/sigrist/n8n-espn-api.git
cd n8n-espn-api
./install-dev.sh
```

**Quick start:**

```bash
# Install dependencies and build
npm install
npm run build

# Link to your n8n instance
npm link
cd ~/.n8n
npm link @paulo.sigrist/n8n-nodes-espn-api
n8n start
```

**Common issue:** If `npm install` shows only 1 package installed, run:
```bash
rm -rf node_modules package-lock.json
npm install
```

## Usage Examples

### Example 1: Get Today's NFL Scores

1. Add the ESPN API node to your workflow
2. Select **NFL** as the resource
3. Select **Get Scoreboard** as the operation
4. Leave the date field empty to get today's games
5. Execute the node

### Example 2: Get NBA Team Information

1. Add the ESPN API node
2. Select **NBA** as the resource
3. Select **Get Team** as the operation
4. Enter the team ID (e.g., "1" for Atlanta Hawks)
5. Execute the node

### Example 3: Get Premier League Standings

1. Add the ESPN API node
2. Select **Soccer** as the resource
3. Select **English Premier League** as the league
4. Select **Get Standings** as the operation
5. Execute the node

## Configuration

### Parameters

#### Resource
Select the sport/league you want to query:
- NFL
- NBA
- MLB
- NHL
- College Football
- College Basketball
- Soccer (with league selection)

#### Operation
Choose what data you want to retrieve:
- Get Scoreboard
- Get Teams
- Get Team
- Get Standings
- Get Athletes
- Get Athlete
- Get News

#### Additional Parameters
Depending on the operation selected, you may need to provide:
- **Date**: For scoreboard queries (format: YYYYMMDD)
- **Team ID**: For specific team queries
- **Athlete ID**: For specific athlete queries
- **Season**: For standings queries (format: YYYY)
- **Limit**: Maximum number of results to return
- **Week**: For NFL/College Football specific weeks

## API Information

This node uses the unofficial ESPN Public API. The API is undocumented and has been reverse-engineered from ESPN's own applications.

**Important Notes:**
- This is an unofficial API and may be subject to changes without notice
- Rate limiting may apply
- No authentication is required for public endpoints
- Data availability may vary by sport and season

### API Endpoints Used

- `site.api.espn.com` - General site data (scores, news, teams, standings)
- ESPN CDN endpoints for various resources

## Development

### Build

```bash
npm install
npm run build
```

### Format

```bash
npm run format
```

### Lint

```bash
npm run lint
npm run lintfix  # Auto-fix issues
```

### GitHub Actions Workflows

This project uses GitHub Actions for continuous integration and automated releases:

#### CI Workflow
- **Trigger**: Push to main/develop branches, Pull Requests
- **Actions**: Lint, build, and test on multiple Node.js versions (18.x, 20.x)
- **Purpose**: Ensure code quality and compatibility

#### Release Workflow
- **Trigger**: Creating a GitHub Release
- **Actions**: Build, lint, publish to npm, upload artifacts
- **Tags**:
  - Regular releases → `latest` tag on npm
  - Pre-releases → `next` tag on npm

#### Build Workflow
- **Trigger**: Manual dispatch or git tags
- **Actions**: Build project and create package tarball
- **Purpose**: On-demand builds for testing

#### Auto Release Workflow
- **Trigger**: Manual dispatch with version input
- **Actions**: Update version, create tag and GitHub release
- **Purpose**: Automated release creation

For detailed information about releases and publishing, see [.github/RELEASE.md](.github/RELEASE.md).

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
* [ESPN Public API Guide](https://github.com/pseudo-r/Public-ESPN-API)
* [n8n documentation](https://docs.n8n.io/)

## Version History

### 1.0.0
- Initial release
- Support for NFL, NBA, MLB, NHL, College Football, College Basketball, and Soccer
- Operations: Scoreboard, Teams, Team, Standings, Athletes, Athlete, News

## License

[MIT](LICENSE)

## Contributing

Contributions are welcome! Please read our [Contributing Guidelines](.github/CONTRIBUTING.md) before submitting a Pull Request.

### Quick Start for Contributors

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run linter and build (`npm run lint && npm run build`)
5. Commit your changes (`git commit -m 'feat: add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

See [CONTRIBUTING.md](.github/CONTRIBUTING.md) for detailed guidelines.

## Disclaimer

This project is not affiliated with, endorsed by, or sponsored by ESPN or The Walt Disney Company. ESPN is a trademark of ESPN, Inc.

The use of this API may be subject to ESPN's Terms of Service. Use at your own risk.

## Support

If you have any issues or questions, please open an issue on the [GitHub repository](https://github.com/sigrist/n8n-espn-api/issues).
