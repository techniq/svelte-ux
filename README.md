# Svelte UX

![](https://img.shields.io/github/license/techniq/svelte-ux?style=flat)
[![](https://img.shields.io/github/actions/workflow/status/techniq/svelte-ux/ci.yml?style=flat)](https://github.com/techniq/svelte-ux/actions/workflows/ci.yml)
[![](https://img.shields.io/npm/v/svelte-ux?style=flat)](https://www.npmjs.com/package/svelte-ux)
![npm](https://img.shields.io/npm/dw/svelte-ux?style=flat&color=orange)

![](https://img.shields.io/github/license/svelte-ux?style=flat)
[![](https://dcbadge.vercel.app/api/server/697JhMPD3t?style=flat)](https://discord.gg/697JhMPD3t)

The projects aims to simplify building highly interactive and visual applications. It provides over 200 components, actions, stores, and utils, with many more planned.

The components are built using Tailwind with extensibility and customization in mind through the use of theming, variants, granule class overrides, and slots. A rich design token system is also currently in the works.

See also [LayerChart](https://layerchart.com) for a large collection of composable chart components to build a wide range of visualizations.

## Publishing

- `npm run changeset` for each changelog worthy change
- `npm run version` to bump `package.json` version based on changesets, materialize changesets into CHANGELOG.md
- Commit as `Version bump to x.y.z` (TODO: automate)
- `npm run publish` to publish version to npm
- `git push --tags` to publish tags to Github
