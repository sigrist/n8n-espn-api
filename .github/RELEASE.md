# Release Process

This document describes how to create releases for the n8n-nodes-espn-api package.

## Prerequisites

### 1. NPM Token

To publish packages to npm, you need to set up an NPM authentication token:

1. Log in to [npmjs.com](https://www.npmjs.com/)
2. Go to Access Tokens in your account settings
3. Click "Generate New Token"
4. Select "Automation" type
5. Copy the generated token

### 2. GitHub Secret Configuration

Add the NPM token to your GitHub repository secrets:

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `NPM_TOKEN`
5. Value: Paste your NPM token
6. Click **Add secret**

## Release Methods

### Method 1: Manual Release (Recommended)

1. **Update version and changelog**
   ```bash
   # Update version in package.json
   npm version patch  # or minor, or major

   # Update CHANGELOG.md with new version details
   # Add release notes under a new version heading
   ```

2. **Commit and push changes**
   ```bash
   git add package.json CHANGELOG.md
   git commit -m "chore: bump version to x.y.z"
   git push
   ```

3. **Create a GitHub Release**
   - Go to the [Releases page](../../releases)
   - Click **Draft a new release**
   - Click **Choose a tag** and create a new tag (e.g., `v1.0.0`)
   - Fill in the release title: `Release v1.0.0`
   - Add release notes (copy from CHANGELOG.md)
   - For pre-release: Check **Set as a pre-release**
   - Click **Publish release**

4. **Automated workflow triggers**
   - The `release.yml` workflow will automatically:
     - Build the project
     - Run linter
     - Publish to npm (with appropriate tag)
     - Upload package tarball to the release
     - Upload build artifacts

### Method 2: Automated Release Workflow

Use the manual workflow dispatch:

1. Go to **Actions** → **Auto Release**
2. Click **Run workflow**
3. Enter the version number (e.g., `1.0.0`)
4. Select if it's a pre-release
5. Click **Run workflow**

This will:
- Update `package.json` version
- Create a git tag
- Create a GitHub release
- Trigger the npm publish workflow

## Release Types

### Regular Release (Production)

- Published to npm with the `latest` tag
- Semantic version: `x.y.z` (e.g., `1.0.0`)
- GitHub release is NOT marked as pre-release
- Users install with: `npm install @paulo.sigrist/n8n-nodes-espn-api`

### Pre-release (Beta/RC)

- Published to npm with the `next` tag
- Semantic version: `x.y.z-beta.n` or `x.y.z-rc.n` (e.g., `1.1.0-beta.1`)
- GitHub release IS marked as pre-release
- Users install with: `npm install @paulo.sigrist/n8n-nodes-espn-api@next`

## Version Numbering

Follow [Semantic Versioning](https://semver.org/):

- **MAJOR** (`x.0.0`): Breaking changes
- **MINOR** (`1.x.0`): New features, backward compatible
- **PATCH** (`1.0.x`): Bug fixes, backward compatible

Examples:
```bash
npm version patch  # 1.0.0 → 1.0.1
npm version minor  # 1.0.1 → 1.1.0
npm version major  # 1.1.0 → 2.0.0
npm version prepatch --preid=beta  # 1.0.0 → 1.0.1-beta.0
npm version preminor --preid=rc    # 1.0.0 → 1.1.0-rc.0
```

## Workflow Overview

### CI Workflow (`ci.yml`)
- **Triggers**: Push to main/develop, Pull Requests
- **Purpose**: Validate code quality
- **Actions**:
  - Lint code
  - Build project
  - Test on multiple Node.js versions (18.x, 20.x)
  - Upload build artifacts

### Release Workflow (`release.yml`)
- **Triggers**: GitHub Release created
- **Purpose**: Publish to npm
- **Actions**:
  - Build and lint
  - Determine npm tag (latest or next)
  - Publish to npm
  - Upload package to release
  - Upload build artifacts

### Build Workflow (`build.yml`)
- **Triggers**: Manual dispatch, Git tags
- **Purpose**: Build package on demand
- **Actions**:
  - Lint and format check
  - Build project
  - Create tarball
  - Upload artifacts

### Auto Release Workflow (`auto-release.yml`)
- **Triggers**: Manual dispatch
- **Purpose**: Automated release creation
- **Actions**:
  - Update version in package.json
  - Create git tag
  - Create GitHub release
  - Extract changelog

## Troubleshooting

### NPM Publish Fails

**Error**: `npm ERR! code E401`
- **Solution**: Check that `NPM_TOKEN` secret is set correctly

**Error**: `npm ERR! code E403`
- **Solution**: Verify package name is available and you have publish permissions

### Build Fails

**Error**: Linting errors
- **Solution**: Run `npm run lintfix` locally and commit fixes

**Error**: TypeScript compilation errors
- **Solution**: Run `npm run build` locally and fix errors

### Release Not Publishing

- Check the **Actions** tab for workflow errors
- Verify the release was created (not just saved as draft)
- Check that workflows have proper permissions

## Best Practices

1. **Always update CHANGELOG.md** before creating a release
2. **Test locally** before releasing:
   ```bash
   npm run lint
   npm run build
   npm pack  # Creates tarball to inspect
   ```
3. **Use pre-releases** for testing:
   - Let users test beta versions before official release
   - Gather feedback without affecting stable users
4. **Write clear release notes**:
   - List new features
   - Document breaking changes
   - Include migration guides if needed
5. **Follow semantic versioning** strictly

## Example Release Checklist

- [ ] Update version in `package.json`
- [ ] Update `CHANGELOG.md` with version and changes
- [ ] Commit changes
- [ ] Create git tag
- [ ] Create GitHub release
- [ ] Verify npm publish succeeded
- [ ] Test installation: `npm install @paulo.sigrist/n8n-nodes-espn-api@latest`
- [ ] Verify package on [npmjs.com](https://www.npmjs.com/package/n8n-nodes-espn-api)
- [ ] Announce release (if applicable)

## Support

For issues with the release process, please open an issue in the repository.
