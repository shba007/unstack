import { ofetch } from 'ofetch'
import { format, formatDistance, parseISO } from 'date-fns'
import { asciiPrint } from 'unascii'
import ora from 'ora'
import frameworks from './frameworks.json'

interface Framework {
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

export function getColor(framework: FrameworkName) {
  return frameworks[framework].color
}

export async function getImage(framework: FrameworkName) {
  const print = await asciiPrint(`./public/logos/${framework}.svg`, { width: 32, widthSkew: 2, output: 'console' })
  return print.getImage()
}

function getVersion(version: string | undefined, updatedAt: any): string | undefined {
  return version
    ? `${version} (${formatDistance(parseISO(updatedAt[version]), new Date(), {
        addSuffix: true,
      })})`
    : undefined
}

export async function getDetails(framework: FrameworkName) {
  const spinner = ora('Loading Details').start()

  const { repo, pkg, publishedAt, author, website, initCommend } = frameworks[framework]

  const [{ repo: details }, release] = await Promise.all([ofetch(`/repos/${repo}`, { baseURL: 'https://ungh.cc' }), ofetch(`/${pkg}`, { baseURL: 'https://registry.npmjs.org' })])

  spinner.succeed('Loaded Details')
  const { description: repoDescription, stars } = details
  const { description: releaseDescription, time: updatedAt } = release
  const versions = release['dist-tags']

  return {
    description: repoDescription,
    releaseDescription,
    stars,
    publishedAt: `${format(parseISO(publishedAt), 'dd MMM, yyyy')} (${formatDistance(parseISO(publishedAt), new Date(), {
      addSuffix: true,
    })})`,
    version: {
      stable: getVersion(versions.latest, updatedAt),
      experimental: new Date(updatedAt[versions.next]).getTime() > new Date(updatedAt[versions.latest]).getTime() ? getVersion(versions.next, updatedAt) : undefined,
    },
    author: author,
    website: website,
    github: `https://github.com/${repo}`,
    npm: `https://www.npmjs.com/package/${pkg}`,
    initCommend,
  }
}
