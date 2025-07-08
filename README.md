![GitHub language count](https://img.shields.io/github/languages/count/atalaydenknalbant/openpapers)

# OpenPapers

OpenPapers is a small front‑end project that showcases historical documents such as treaties and agreements. Visitors can read existing documents or add new ones through a simple form. All data is stored in the browser so everyone can create their own collection when running the site locally or via GitHub Pages.

## Features

- **Bootstrap theme** with responsive layout and Font Awesome icons
- **Add Document** page that stores information in `localStorage`
- **Dynamic paper pages** showing summary, location, date, signers and a PDF download
- **Home page** lists built‑in papers and those added through the form
- **Gulp build system** that minifies CSS and JavaScript
- **GitHub Actions** workflow builds the site with Node 20 and deploys it to GitHub Pages

## Usage

1. Clone the repository
2. Install dependencies with `npm install`
3. Run `npm start` to launch a local development server with BrowserSync
4. Use `npx gulp build` to regenerate the minified assets

Documents added through `add.html` are stored in your browser and will appear on the home page the next time you load the site from the same machine.

## Repository Structure

```
├── add.html           - Form for submitting new documents
├── paper.html         - Template for dynamically rendered papers
├── paper1.html        - Example static paper (Treaty of Versailles)
├── paper2.html        - Example static paper (Paris Agreement)
├── js/                - JavaScript files
├── css/               - Compiled CSS files
├── vendor/            - Third party libraries from npm
└── gulpfile.js        - Build tasks
```

## Development Notes

The project uses only client‑side storage and does not have a back end. All new documents live in the browser where they were created. To start a live development server that watches for file changes, run:

```
npm start
```

This invokes the `gulp watch` task defined in `package.json`. When you are ready to deploy or commit your changes, run the build step:

```
npx gulp build
```

The build step copies vendor assets from `node_modules`, minifies CSS and JavaScript, and places the results in the `vendor` and `css/js` directories.

## Deployment

Deployments are handled through [GitHub Actions](.github/workflows/gh-pages.yml). Every push triggers the workflow which installs Node 20, runs the build, and publishes the contents of the repository to the `gh-pages` branch so that the site is available through GitHub Pages.

## Contributing

Feel free to fork the repository and open pull requests. Because the project is entirely front end, contributions are generally limited to HTML, CSS, and JavaScript. Bug reports and suggestions are welcome in the issue tracker.

## GitHub Description

> A minimal site for sharing and archiving important documents. Add new papers through the built‑in form and view them instantly on GitHub Pages.

