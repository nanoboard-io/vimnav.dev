const fs = require("fs");
const path = require("path");
const ejs = require("ejs");

// Configuration
const versions = require("./versions.json");
const templatesDir = "./templates";
const contentDir = "./content";
const distDir = "./dist";

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Helper function to read JSON file
function readJsonFile(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    console.warn(`Warning: Could not read ${filePath}`, error.message);
    return {};
  }
}

// Helper function to read EJS file
function readEjsFile(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch (error) {
    console.warn(`Warning: Could not read ${filePath}`, error.message);
    return "";
  }
}

// Build each version
async function buildVersion(version) {
  console.log(`Building ${version.id}...`);

  const versionContentDir = path.join(contentDir, version.id);

  // Load version-specific data
  const meta = readJsonFile(path.join(versionContentDir, "meta.json"));
  const navigation = readJsonFile(
    path.join(versionContentDir, "navigation.json"),
  );

  // Load content sections
  const sectionsDir = path.join(versionContentDir, "sections");
  const sections = {};

  if (fs.existsSync(sectionsDir)) {
    const sectionFiles = fs
      .readdirSync(sectionsDir)
      .filter((file) => file.endsWith(".ejs"));
    for (const file of sectionFiles) {
      const sectionName = path.basename(file, ".ejs");
      const sectionTemplate = readEjsFile(path.join(sectionsDir, file));

      // Render the section with version data
      try {
        sections[sectionName] = ejs.render(sectionTemplate, {
          version: version,
          versions: versions.versions,
          meta: meta,
          navigation: navigation,
        });
      } catch (error) {
        console.warn(
          `Warning: Could not render section ${sectionName}:`,
          error.message,
        );
        sections[sectionName] = sectionTemplate; // Fallback to raw content
      }
    }
  }

  // Prepare template data
  const templateData = {
    version: version,
    versions: versions.versions,
    meta: meta,
    navigation: navigation,
    sections: sections,
    // Helper functions
    include: function (componentPath, data = {}) {
      const fullPath = path.join(templatesDir, "components", componentPath);
      try {
        const template = fs.readFileSync(fullPath, "utf8");
        return ejs.render(template, { ...templateData, ...data });
      } catch (error) {
        console.warn(
          `Warning: Could not include ${componentPath}`,
          error.message,
        );
        return "";
      }
    },
  };

  try {
    // Render the main docs template
    const docsTemplate = fs.readFileSync(
      path.join(templatesDir, "pages", "docs.ejs"),
      "utf8",
    );
    const html = ejs.render(docsTemplate, templateData, {
      filename: path.join(templatesDir, "pages", "docs.ejs"),
      root: templatesDir,
    });

    // Write the generated HTML
    const outputPath = path.join(distDir, version.outputFile);
    fs.writeFileSync(outputPath, html);
    console.log(`✓ Generated ${outputPath}`);
  } catch (error) {
    console.error(`Error building ${version.id}:`, error.message);
    process.exit(1);
  }
}

// Generate dynamic sitemap.xml
function generateSitemap() {
  console.log("Generating sitemap.xml...");

  const currentDate = new Date().toISOString();
  const baseUrl = "https://vimnav.dev";

  // Define all pages with their priorities
  const pages = [
    { url: "/", priority: "1.00", changefreq: "weekly" },
    { url: "/docs.html", priority: "0.90", changefreq: "weekly" },
    { url: "/v1.0.html", priority: "0.70", changefreq: "monthly" },
    { url: "/early-access.html", priority: "0.80", changefreq: "monthly" },
    { url: "/feedback.html", priority: "0.80", changefreq: "monthly" },
    { url: "/privacy.html", priority: "0.60", changefreq: "yearly" },
  ];

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
`;

  for (const page of pages) {
    sitemap += `<url>
  <loc>${baseUrl}${page.url}</loc>
  <lastmod>${currentDate}</lastmod>
  <changefreq>${page.changefreq}</changefreq>
  <priority>${page.priority}</priority>
</url>
`;
  }

  sitemap += `
</urlset>`;

  fs.writeFileSync(path.join(distDir, "sitemap.xml"), sitemap);
  console.log(`✓ Generated sitemap.xml with ${pages.length} URLs`);
}

// Copy static assets
function copyAssets() {
  console.log("Copying static assets...");

  const staticFiles = ["styles.css", "assets", "robots.txt"];

  for (const file of staticFiles) {
    if (fs.existsSync(file)) {
      if (fs.statSync(file).isDirectory()) {
        // Copy directory
        fs.cpSync(file, path.join(distDir, file), { recursive: true });
      } else {
        // Copy file
        fs.copyFileSync(file, path.join(distDir, file));
      }
      console.log(`✓ Copied ${file}`);
    }
  }
}

// Build regular pages (index, early-access, feedback, etc.)
async function buildPage(page) {
  console.log(`Building ${page.id} page...`);

  // Prepare template data for regular pages
  const templateData = {
    page: page,
    versions: versions.versions,
    // Helper functions
    include: function (componentPath, data = {}) {
      const fullPath = path.join(templatesDir, "components", componentPath);
      try {
        const template = fs.readFileSync(fullPath, "utf8");
        return ejs.render(template, { ...templateData, ...data });
      } catch (error) {
        console.warn(
          `Warning: Could not include ${componentPath}`,
          error.message,
        );
        return "";
      }
    },
  };

  try {
    // Render the page template
    const pageTemplate = fs.readFileSync(
      path.join(templatesDir, "pages", page.template),
      "utf8",
    );
    const html = ejs.render(pageTemplate, templateData, {
      filename: path.join(templatesDir, "pages", page.template),
      root: templatesDir,
    });

    // Write the generated HTML
    const outputPath = path.join(distDir, page.outputFile);
    fs.writeFileSync(outputPath, html);
    console.log(`✓ Generated ${outputPath}`);
  } catch (error) {
    console.error(`Error building ${page.id}:`, error.message);
    process.exit(1);
  }
}

// Main build function
async function build() {
  console.log("🏗️  Building VimNav website...\n");

  // Copy static assets first
  copyAssets();

  // Generate dynamic sitemap
  generateSitemap();

  // Build documentation versions
  for (const version of versions.versions) {
    await buildVersion(version);
  }

  // Build regular pages
  if (versions.pages) {
    for (const page of versions.pages) {
      await buildPage(page);
    }
  }

  console.log("\n✅ Build complete!");
  console.log(`📁 Generated files in ${distDir}/`);
  console.log('🚀 Run "npm run serve" to preview the site');
}

// Run build if this script is executed directly
if (require.main === module) {
  build().catch((error) => {
    console.error("Build failed:", error);
    process.exit(1);
  });
}

module.exports = { build };
