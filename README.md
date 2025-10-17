# VimNav Product Website

This is the official product website for the VimNav Chrome extension, built with EJS templating for maintainability and component reuse.

## Architecture

The site uses an EJS templating system that generates static HTML files from reusable components and templates.

### File Structure

```
├── dist/                     # Generated static files (do not edit)
│   ├── index.html
│   ├── docs.html
│   ├── v1.0.html
│   ├── early-access.html
│   ├── feedback.html
│   ├── privacy.html
│   ├── styles.css
│   └── assets/
├── templates/                # EJS templates and components
│   ├── layouts/
│   │   └── base.ejs         # Shared HTML structure
│   ├── components/          # Reusable components
│   │   ├── header.ejs
│   │   ├── footer.ejs
│   │   ├── hero.ejs
│   │   ├── features.ejs
│   │   └── ...
│   └── pages/               # Page templates
│       ├── index.ejs
│       ├── docs.ejs
│       ├── early-access.ejs
│       ├── feedback.ejs
│       └── privacy.ejs
├── content/                 # Documentation content
│   ├── v1.2/sections/
│   └── v1.0/sections/
│   └── ... more versions
├── build.js                 # Build script
├── package.json             # Dependencies and scripts
├── versions.json            # Site configuration
└── styles.css              # Global styles
```

## Development

### Prerequisites

- Node.js (for EJS templating)
- npm (for package management)

### Setup

```bash
npm install
```

### Available Scripts

- `npm run build` - Generate static HTML files in `dist/`
- `npm run dev` - Build and watch for changes
- `npm run serve` - Serve the site locally on <http://localhost:3000>
- `npm run watch` - Watch templates and rebuild automatically
- `npm run clean` - Clean the dist directory

### Making Changes

1. **Edit templates** in the `templates/` directory
2. **Update content** in the `content/` directory (for docs)
3. **Modify configuration** in `versions.json`
4. **Run build** with `npm run build`
5. **Generated files** appear in `dist/`

**⚠️ Important: Never edit files in `dist/` directly - they are overwritten on each build.**

## Site Pages

### Generated Pages

- **`index.html`** - Homepage with hero, features, pricing, and installation
- **`docs.html`** - Latest documentation (v1.2) with version selector
- **`v1.0.html`** - Previous version documentation
- **`early-access.html`** - Waitlist signup with vim experience tracking
- **`feedback.html`** - Comprehensive feedback form with validation
- **`privacy.html`** - Privacy policy with custom styling

### Documentation Versions

The site supports multiple documentation versions, see file structure.

Add new versions by:

1. Creating content in `content/vX.X.X/sections/`
2. Updating `versions.json`
3. Running `npm run build`

## Features

- **EJS Templating** - Component-based architecture for maintainability
- **Version Management** - Support for multiple documentation versions
- **Static Generation** - Produces optimized static HTML files
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Form Handling** - Netlify Forms integration for feedback and waitlist
- **SEO Optimized** - Proper meta tags, structured data, and canonical URLs

## Design System

### Colors

VimNav uses the same dark palette as the extension to keep docs, marketing, and in-product UI consistent:

- Background: `#1a1b26`
- Surface: `#16161e`
- Surface Alt: `#24283b`
- Overlay: `rgba(16, 24, 32, 0.85)`
- Border: `#414868`
- Text Primary: `#c0caf5`
- Text Secondary: `#c5c9c5`
- Text Muted: `#565f89`
- Accent Primary: `#7aa2f7`
- Accent Secondary: `#bb9af7`
- Accent Success: `#9ece6a`
- Accent Warning: `#e0af68`
- Accent Danger: `#f7768e`
- Accent Info: `#00ffff`

### Theme Inspiration

Parts of this palette and aesthetic are inspired by the Tokyo Night theme (folke/tokyonight.nvim). Tokyo Night is licensed under Apache-2.0. We did not copy source code, but several color values and the overall styling draw from that work.

### Typography

- Primary font: Inter (headings and UI)
- Code font: JetBrains Mono (keybindings and code)

### Components

- Shared header/footer across all pages
- Responsive grid layouts
- Card-based sections
- Form components with validation
- Version selector for documentation
- Mode indicators with proper colors

## Configuration

### versions.json

Controls site structure and documentation versions:

```json
{
  "versions": [
    {
      "id": "v1.2.*",
      "label": "v1.2.* (Latest)",
      "isLatest": true,
      "outputFile": "docs.html"
    }
  ],
  "pages": [
    {
      "id": "index",
      "template": "index.ejs",
      "outputFile": "index.html",
      "title": "Page Title"
    }
  ]
}
```

## Deployment

### Build for Production

```bash
npm run build
```

### Deploy dist/ folder

The `dist/` directory contains all static files ready for deployment to:

- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

### Environment

- Node.js build process generates static files
- No server-side processing required in production
- All forms use Netlify Forms for processing
