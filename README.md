<p align="center">
  <picture>
    <source srcset="./public/logo-dark.png" media="(prefers-color-scheme: dark)">
    <source srcset="./public/logo-light.png" media="(prefers-color-scheme: light)">
    <img src="./public/logo-light.png" alt="Logo" width="128">
  </picture>
</p>

# UnStack

[![npm version](https://img.shields.io/npm/v/@shba007/unstack?color=blue)](https://npmjs.com/package/@shba007/unstack)
[![npm downloads](https://img.shields.io/npm/dm/@shba007/unstack?color=blue)](https://npmjs.com/package/@shba007/unstack)
[![License](https://img.shields.io/npm/l/@shba007/unstack?color=blue)](https://github.com/shba007/unstack?tab=MIT-1-ov-file)

> Print your favorite framework's logo and details into the cli

## Usage (CLI)

Globally run print with `npx`:

```sh
npx @shba007/unstack@latest
```

or

```sh
npx @shba007/unstack@latest -f [framework]
```

    Options:
    -f, --framework prints the framework's logo and details

Use `npx @shba007/unstack print --help` for more usage info.

## Usage (API)

Install package:

```sh
# ✨ Auto-detect
npx nypm install @shba007/unstack

# npm
npm install @shba007/unstack

# yarn
yarn add @shba007/unstack

# pnpm
pnpm install @shba007/unstack

# bun
bun install @shba007/unstack
```

Import:

**ESM** (Node.js, Bun)

```js
import {} from '@shba007/unstack'
```

**CommonJS** (Legacy Node.js)

```js
const {} = require('@shba007/unstack')
```

**CDN** (Deno, Bun and Browsers)

```js
import {} from 'https://esm.sh/@shba007/unstack'
```

## Feature

Currently supports the following

- Frameworks:-
  - Frontend:-
    - Angular
    - React
    - Vue
    - Svelte
    - Preact
    - Solid
    - Remix
    - Qwik
    - Lit
    - TiniJS
    - Alpine
    - Stencil
    - Mithril
    - Astro
    - Vuepress
    - Vitepress
    - Docus
    - Meteor

  - Backend:-
    - Express
    - Fastify
    - Koa
    - Feathers
    - NestJS
    - Nitro

  - FullStack:-
    - Analog
    - Next
    - Gatsby
    - Nuxt
    - Gridsome
    - Svelte Kit
    - Ember js
    - Fresh
    - Redwood
    - Hydrogen

Currently displays the following details

- Description
- Starts
- Published At
- Updated At
- Author
- Version
- GitHub Link
- Website Link
- Init Command

## Vision and Roadmap

- Update Published At Using NPM
- Include all framework's Icons of JS Ecosystem
  - Adonis JS
  - Django
  - Flask
  - FastAPI

- Add all Runtime
  - Node.js
  - Deno
  - Bun

- Add all Build Tools/Bundler
  - Webpack
  - Vite
  - Rollup
  - Parcel
  - Snowpack

## Development

<details>

<summary>local development</summary>

- Clone this repository
- Install latest LTS version of [Node.js](https://nodejs.org/en/)
- Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable`
- Install dependencies using `pnpm install`
- Run interactive tests using `pnpm dev`

</details>

## License

Published under the [MIT](https://github.com/shba007/unstack/blob/main/LICENSE) license.
<br><br>
<a href="https://github.com/shba007/unstack/graphs/contributors">
<img src="https://contrib.rocks/image?repo=shba007/unstack" />
</a>
