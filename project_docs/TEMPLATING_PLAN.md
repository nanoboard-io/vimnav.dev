# EJS Templating Migration Plan for VimNav Documentation

## Overview

Transform the static HTML documentation into a reusable EJS templating system that generates static HTML files. This will enable easy version management and component reuse while maintaining the current static site structure.

## Architecture Goals

### 1. **Reusability**

- Shared layout and components across all versions
- Version-specific content modules
- Reusable keybinding displays, navigation sections

### 2. **Version Management**

- Easy addition of new documentation versions
- Centralized version configuration
- Automatic version selector generation

### 3. **Static Generation**

- Build process generates final static HTML files
- No runtime dependencies for the final site
- Maintains current hosting simplicity

## Proposed File Structure

```
vimnav.dev/
├── package.json
├── build.js                    # Build script for static generation
├── versions.json               # Version configuration
├── templates/                  # EJS templates
│   ├── layouts/
│   │   └── docs.ejs           # Base layout template
│   ├── components/
│   │   ├── header.ejs         # Site header
│   │   ├── footer.ejs         # Site footer
│   │   ├── version-selector.ejs  # Version dropdown
│   │   ├── sidebar.ejs        # Documentation sidebar
│   │   ├── quick-reference.ejs   # Quick reference section
│   │   └── keybinding-grid.ejs   # Reusable keybinding displays
│   └── pages/
│       └── docs.ejs           # Main docs page template
├── content/                   # Version-specific content
│   ├── v1.0.2/
│   │   ├── meta.json          # Version metadata
│   │   ├── navigation.json    # Sidebar navigation structure
│   │   └── sections/          # Documentation sections
│   │       ├── getting-started.ejs
│   │       ├── navigation.ejs
│   │       ├── modes.ejs
│   │       ├── search.ejs
│   │       └── ...
│   └── v1.2.0/
│       ├── meta.json
│       ├── navigation.json
│       └── sections/
│           ├── getting-started.ejs
│           ├── navigation.ejs
│           ├── modes.ejs
│           ├── vimedit-mode.ejs  # New in v1.2.0
│           ├── search.ejs
│           └── ...
├── dist/                      # Generated static files
│   ├── docs.html             # Generated latest version
│   ├── v1.0.2.html           # Generated v1.0.2
│   └── ...
└── assets/                   # Static assets (unchanged)
    ├── styles.css
    └── ...
```

## Configuration Files

### versions.json

```json
{
  "versions": [
    {
      "id": "v1.2.0",
      "label": "v1.2.0 (Latest)",
      "isLatest": true,
      "outputFile": "docs.html"
    },
    {
      "id": "v1.0.2",
      "label": "v1.0.2",
      "isLatest": false,
      "outputFile": "v1.0.2.html"
    }
  ]
}
```

### content/v1.2.0/meta.json

```json
{
  "version": "v1.2.0",
  "title": "VimNav Documentation",
  "description": "Complete guide to vim-style browser navigation",
  "canonical": "https://vimnav.dev/docs.html",
  "quickNavItems": [
    { "href": "#getting-started", "label": "Getting Started" },
    { "href": "#navigation", "label": "Navigation" },
    { "href": "#quick-navigation", "label": "Quick Nav" },
    { "href": "#modes", "label": "Modes" },
    { "href": "#vimedit-mode", "label": "VimEdit" },
    { "href": "#commands", "label": "Commands" },
    { "href": "#configuration", "label": "Configuration" },
    { "href": "#advanced", "label": "Advanced" }
  ]
}
```

## Component Structure

### 1. **Base Layout** (`templates/layouts/docs.ejs`)

- HTML document structure
- Head section with meta tags, CSS, fonts
- Include header, main content area, footer
- Version-specific JavaScript injection

### 2. **Reusable Components**

- **Header**: Navigation bar (reused across site)
- **Version Selector**: Dynamic dropdown with version list
- **Sidebar**: Generated from navigation.json per version
- **Footer**: Static footer content
- **Keybinding Displays**: Reusable keybinding grid/list components

### 3. **Content Sections**

- Modular EJS files for each documentation section
- Version-specific includes (VimEdit only in v1.2.0+)
- Shared sections use same template with version-specific data

## Build Process

### 1. **Build Script** (`build.js`)

```javascript
// Pseudo-code structure
const versions = require("./versions.json");

versions.forEach((version) => {
  const contentPath = `./content/${version.id}/`;
  const templateData = {
    version: version,
    meta: require(`${contentPath}meta.json`),
    navigation: require(`${contentPath}navigation.json`),
    // ... other data
  };

  const html = ejs.render(docsTemplate, templateData);
  fs.writeFileSync(`./dist/${version.outputFile}`, html);
});
```

### 2. **Development Workflow**

- `npm run build` - Generate all static HTML files
- `npm run dev` - Build + serve with file watching
- `npm run clean` - Clean dist directory

## Migration Strategy

### Phase 1: Foundation

1. Set up package.json and build system
2. Create base layout template
3. Extract header/footer components

### Phase 2: Content Extraction

1. Create version-specific content directories
2. Extract documentation sections into EJS modules
3. Create navigation configuration files

### Phase 3: Component Development

1. Build reusable keybinding components
2. Create version selector component
3. Develop sidebar generation

### Phase 4: Generation & Testing

1. Implement build script
2. Generate static files and compare with originals
3. Test version switching functionality

### Phase 5: Optimization

1. Add development server with hot reload
2. Optimize build performance
3. Add validation for content structure

## Benefits

### For Development

- **DRY Principle**: Shared components eliminate duplication
- **Easy Versioning**: Add new versions by creating content directory
- **Maintainability**: Changes to layout/styling update all versions
- **Type Safety**: JSON schemas can validate content structure

### For Content Management

- **Modular Content**: Documentation sections are independent modules
- **Version-Specific Features**: Easy to include/exclude features per version
- **Consistent Structure**: Enforced navigation and content patterns

### For Deployment

- **Static Output**: No server-side dependencies
- **Performance**: Pre-generated HTML loads instantly
- **SEO Friendly**: Static HTML with proper meta tags
- **Hosting Flexibility**: Works with any static host (GitHub Pages, Netlify, etc.)

## Implementation Plan

1. Create package.json and basic build setup
2. Extract base layout template from existing docs.html
3. Create reusable header/footer components
4. Extract content sections for both versions
5. Implement build script and test generation
6. Add development tooling and validation

This approach maintains the simplicity of static hosting while providing powerful templating capabilities for managing multiple documentation versions.

