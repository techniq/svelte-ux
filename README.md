<p align="center">
  <img alt="svelte-ux logo" height="100px" src="./static/logos/logo.jpg" />  
</p>
<h1 align="center">Svelte UX</h1>

![](https://img.shields.io/github/license/techniq/svelte-ux?style=flat)
[![](https://img.shields.io/github/actions/workflow/status/techniq/svelte-ux/ci.yml?style=flat)](https://github.com/techniq/svelte-ux/actions/workflows/ci.yml)
[![](https://img.shields.io/npm/v/svelte-ux?style=flat)](https://www.npmjs.com/package/svelte-ux)
[![](https://img.shields.io/npm/dw/svelte-ux?style=flat&color=orange)](https://www.npmjs.com/package/svelte-ux)

[![](https://img.shields.io/badge/Open_in-SvelteLab-black?logo=svelte&color=%23FF3E00)](https://www.sveltelab.dev/?provider=github&owner=techniq&repo=svelte-ux&branch=main&path=%2Fpackages%2Fcreate-svelte-ux%2Ftemplates%2Fstarter) [![](https://img.shields.io/badge/Open_in-StackBlitz-black?logo=stackblitz&color=%231269D3)](https://stackblitz.com/github/techniq/svelte-ux/tree/main/packages/create-svelte-ux/templates/starter) [![](https://img.shields.io/badge/Open_in-CodeSandbox-black?logo=codesandbox&color=%23151515)](https://codesandbox.io/p/sandbox/github/techniq/svelte-ux/tree/main/packages/create-svelte-ux/templates/starter)

![](https://img.shields.io/github/license/svelte-ux?style=flat)
[![](https://dcbadge.vercel.app/api/server/697JhMPD3t?style=flat)](https://discord.gg/697JhMPD3t)

The projects aims to simplify building highly interactive and visual applications. It provides over 200 components, actions, stores, and utils, with many more planned.

The components are built using Tailwind with extensibility and customization in mind through the use of theming, variants, granular class overrides, and slots. A rich design token system is also currently in the works.

See also the companion library [LayerChart](https://layerchart.com) for a large collection of composable chart components to build a wide range of visualizations and [LayerStack](https://layerstack.dev) for a collection of svelte stores, actions, and general utilities.

## Contributing

### Install dependencies

```
pnpm i
```

### Run dev server for `svelte-ux` package

```
cd packages/svelte-ux
pnpm dev
```

### Run test for `svelte-ux` package

```
cd packages/svelte-ux
pnpm test:unit
```

### Run tests for all packages

```
pnpm -r test:unit
```

### Run a script from the root

```
pnpm -F svelte-ux dev
```

### Add changeset to include change in changelog and determine next version

```
pnpm changeset
```

## Sponsors

This project is supported by the following beautiful people/organizations:

<p align="center">
  <a href="https://github.com/sponsors/techniq">
    <img src='https://github.com/techniq/sponsorkit/blob/main/sponsors.svg?raw=true' alt="Logos from Sponsors" />
  </a>
</p>

## Community

Join the Discord server to ask questions, find collaborators, or just say hi!

<a href="https://discord.gg/697JhMPD3t" alt="LayerStack Discord community">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://invidget.switchblade.xyz/697JhMPD3t">
  <img alt="LayerStack Discord community" src="https://invidget.switchblade.xyz/697JhMPD3t?theme=light">
</picture>
</a>
