export interface Framework {
  name: string
  repo: string
  pkg: string
  color: string
  publishedAt: string
  author: string | string[]
  website: string
  initCommend: string[]
}

export enum FrameworkName {
  Angular = 'angular',
  React = 'react',
  'Vue.js' = 'vue',
  Svelte = 'svelte',
  Preact = 'preact',
  'Solid.js' = 'solid',
  Remix = 'remix',
  Qwik = 'qwik',
  Lit = 'lit',
  Tini = 'tinijs',
  'Alpine.js' = 'alpine',
  Stencil = 'stencil',
  Mithril = 'mithril',
  Astro = 'astro',
  Vuepress = 'vuepress',
  Vitepress = 'vitepress',
  Docus = 'docus',
  Express = 'express',
  Fastify = 'fastify',
  Koa = 'koa',
  Feathers = 'feathers',
  NestJS = 'nestjs',
  Nitro = 'nitro',
  Analog = 'analog',
  'Next.js' = 'next',
  Gatsby = 'gatsby',
  Nuxt = 'nuxt',
  Gridsome = 'gridsome',
  'Svelte Kit' = 'svelte-kit',
  Ember = 'ember',
  Fresh = 'fresh',
  Redwood = 'redwood',
  Meteor = 'meteor',
  Hydrogen = 'hydrogen',
}