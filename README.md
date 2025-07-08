![GitHub language count](https://img.shields.io/github/languages/count/atalaydenknalbant/openpapers) 

# OpenPapers
The website for a project

## Usage
Open terminal, run `npm install` and then `npm start` to see the website locally.
Run `npx gulp build` anytime to regenerate the minified CSS and JavaScript assets.

## Deployment
The site is automatically built and published to **GitHub Pages** via
[GitHub Actions](.github/workflows/gh-pages.yml).
The workflow installs Node 20 and a temporary Sass dependency before running `gulp build`.