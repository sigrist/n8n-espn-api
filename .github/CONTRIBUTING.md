# Contributing to n8n-nodes-espn-api

Thank you for your interest in contributing to n8n-nodes-espn-api! This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone.

## How to Contribute

### Reporting Bugs

If you find a bug, please open an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment details (n8n version, Node.js version, OS)
- Screenshots if applicable

### Suggesting Enhancements

For feature requests or enhancements:
- Check if the feature already exists
- Describe the feature clearly
- Explain why it would be useful
- Provide examples of how it would work

### Pull Requests

1. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR-USERNAME/n8n-espn-api.git
   cd n8n-espn-api
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Make your changes**
   - Follow the existing code style
   - Add comments for complex logic
   - Update documentation if needed

5. **Test your changes**
   ```bash
   npm run lint      # Check code quality
   npm run build     # Ensure it builds
   ```

6. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   # or
   git commit -m "fix: resolve bug"
   ```

   Follow [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat:` New feature
   - `fix:` Bug fix
   - `docs:` Documentation changes
   - `style:` Code style changes (formatting)
   - `refactor:` Code refactoring
   - `test:` Adding tests
   - `chore:` Maintenance tasks

7. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

8. **Create a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Fill in the PR template
   - Wait for review

## Development Setup

### Prerequisites
- Node.js 18.x or higher
- npm 9.x or higher
- Git

### Local Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Build the project**
   ```bash
   npm run build
   ```

3. **Run linter**
   ```bash
   npm run lint
   npm run lintfix  # Auto-fix issues
   ```

4. **Format code**
   ```bash
   npm run format
   ```

### Testing in n8n

To test your changes in a local n8n instance:

1. **Link the package**
   ```bash
   npm run build
   npm link
   ```

2. **In your n8n installation**
   ```bash
   cd ~/.n8n
   npm link @paulo.sigrist/n8n-nodes-espn-api
   ```

3. **Start n8n**
   ```bash
   n8n start
   ```

## Code Style

### TypeScript

- Use TypeScript for all code
- Follow the existing code structure
- Use meaningful variable and function names
- Add JSDoc comments for public methods

### Formatting

- Use tabs for indentation
- Use single quotes for strings
- Add semicolons
- Max line length: 100 characters

Run prettier to auto-format:
```bash
npm run format
```

### Linting

Follow ESLint rules:
```bash
npm run lint
npm run lintfix
```

## Project Structure

```
n8n-espn-api/
├── .github/              # GitHub configuration
│   ├── workflows/        # GitHub Actions workflows
│   ├── CONTRIBUTING.md   # This file
│   └── RELEASE.md        # Release documentation
├── nodes/                # Node implementations
│   └── EspnApi/
│       ├── EspnApi.node.ts  # Main node file
│       └── espn.svg         # Node icon
├── dist/                 # Compiled output (generated)
├── .eslintrc.js          # ESLint configuration
├── .prettierrc.js        # Prettier configuration
├── tsconfig.json         # TypeScript configuration
├── gulpfile.js           # Build configuration
├── package.json          # Package metadata
├── CHANGELOG.md          # Version history
└── README.md             # Main documentation
```

## Adding New Operations

To add a new operation to the ESPN API node:

1. **Add operation option** in `EspnApi.node.ts`:
   ```typescript
   {
     name: 'Get Something',
     value: 'something',
     description: 'Get something from ESPN',
     action: 'Get something',
   }
   ```

2. **Add operation parameters** (if needed):
   ```typescript
   {
     displayName: 'Parameter Name',
     name: 'parameterName',
     type: 'string',
     displayOptions: {
       show: {
         operation: ['something'],
       },
     },
     default: '',
     description: 'Description of parameter',
   }
   ```

3. **Implement operation logic** in the `execute` method:
   ```typescript
   else if (operation === 'something') {
     const param = this.getNodeParameter('parameterName', i) as string;
     endpoint = `https://site.api.espn.com/apis/site/v2/sports/${this.getSportPath(resource)}/something`;
     qs.param = param;
   }
   ```

4. **Update documentation** in README.md

5. **Update CHANGELOG.md** with the new feature

## Adding New Sports

To add support for a new sport:

1. **Add resource option**:
   ```typescript
   {
     name: 'Sport Name',
     value: 'sportname',
   }
   ```

2. **Add sport path** in `getSportPath` method:
   ```typescript
   sportname: 'category/sportname',
   ```

3. **Test the endpoints** to ensure they work

4. **Update documentation**

## Continuous Integration

All pull requests must pass:
- ✅ Linting checks
- ✅ Build process
- ✅ Code formatting

GitHub Actions will automatically run these checks.

## Release Process

Only maintainers can create releases. See [RELEASE.md](.github/RELEASE.md) for details.

## Questions?

If you have questions:
- Open an issue for discussion
- Check existing issues and PRs
- Review the [n8n documentation](https://docs.n8n.io/)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Thank You!

Your contributions help make this project better for everyone! 🎉
