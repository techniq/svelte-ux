# Svelte UX

The projects aims to simplify building highly interactive and visual applications. It provides over 200 components, actions, stores, and utils, with many more planned.

The components are built using Tailwind with extensibility and customization in mind through the use of theming, variants, granule class overrides, and slots. A rich design token system is also currently in the works.

See also [LayerChart](https://layerchart.com) for a large collection of composable chart components to build a wide range of visualizations.

## Publishing

- `npm run changeset` for each changelog worthy change
- `npm run version` to bump `package.json` version based on changesets, materialize changesets into CHANGELOG.md
- Commit as `Version bump to x.y.z` (TODO: automate)
- `npm run publish` to publish version to npm
- `git push --tags` to publish tags to Github
