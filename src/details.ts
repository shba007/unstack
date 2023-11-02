import { ofetch } from 'ofetch';
import { format, formatDistance, parseISO } from 'date-fns';
import ora from 'ora';

interface Framework {
  name: string;
  repo: string;
  pkg: string;
  color: string;
  publishedAt: string;
  author: string | string[];
  website: string;
  initCommend: string[];
}

export enum FrameworkName {
  Angular = 'angular',
  React = 'react',
  'Vue.js' = 'vue',
  Svelte = 'svelte',
  Astro = 'astro',
  Preact = 'preact',
  Gatsby = 'gatsby',
  'Solid.js' = 'solid',
  Remix = 'remix',
  Qwik = 'qwik',
  Lit = 'lit',
  'Alpine.js' = 'alpine',
  'Gridsome' = 'gridsome',
  'Next.js' = 'next',
  Nuxt = 'nuxt',
  'Svelte Kit' = 'svelte-kit',
  Vuepress = 'vuepress',
  Vitepress = 'vitepress',
  Docus = 'docus',
  'Express' = 'express',
}

export const frameworks: Record<FrameworkName, Framework> = {
  angular: {
    name: 'Angular',
    repo: 'angular/angular',
    pkg: '@angular/core',
    color: '#DD0032',
    publishedAt: '2016-09-13T00:00:00.000Z',
    author: 'Google',
    website: 'https://angular.io',
    initCommend: ['npm install -g @angular/cli', 'ng new'],
  },
  react: {
    name: 'React',
    repo: 'facebook/react',
    pkg: 'react',
    color: '#149ECA',
    publishedAt: '2013-05-28T00:00:00.000Z',
    author: 'Facebook',
    website: 'https://react.dev',
    initCommend: ['npm create vite@latest -- --template react'],
  },
  vue: {
    name: 'Vue.js',
    repo: 'vuejs/core',
    pkg: 'vue',
    color: '#40B983',
    publishedAt: '2014-01-31T00:00:00.000Z',
    author: 'Evan You',
    website: 'https://vuejs.org',
    initCommend: ['npm create vue@latest'],
  },
  svelte: {
    name: 'Svelte',
    repo: 'sveltejs/svelte',
    pkg: 'svelte',
    color: '#FF3E00',
    publishedAt: '2016-11-28T00:00:00.000Z',
    author: 'Rich Harris',
    website: 'https://svelte.dev',
    initCommend: ['npm create vite@latest -- --template svelte'],
  },
  astro: {
    name: 'Astro',
    repo: 'withastro/astro',
    pkg: 'astro',
    color: '#DC3E8B',
    publishedAt: '2022-06-07T00:00:00.000Z',
    author: 'Fred K. Schott',
    website: 'https://astro.build',
    initCommend: ['npm create astro@latest'],
  },
  preact: {
    name: 'Preact',
    repo: 'preactjs/preact',
    pkg: 'preact',
    color: '#673AB8',
    publishedAt: '2015-11-12T00:00:00.000Z',
    author: 'Jason Miller',
    website: 'https://preactjs.com',
    initCommend: ['npm init preact'],
  },
  gatsby: {
    name: 'Gatsby',
    repo: 'gatsbyjs/gatsby',
    pkg: 'gatsby',
    color: '#663399',
    publishedAt: '2022-11-07T00:00:00.000Z',
    author: 'Kyle Mathews',
    website: 'https://www.gatsbyjs.com',
    initCommend: ['npm init gatsby'],
  },
  solid: {
    name: 'Solid.js',
    repo: 'solidjs/solid',
    pkg: 'solid-js',
    color: '#4A80C1',
    publishedAt: '2021-04-05T00:00:00.000Z',
    author: 'Ryan Carniato',
    website: 'https://www.solidjs.com',
    initCommend: ['npm create vite@latest -- --template solid'],
  },
  remix: {
    name: 'Remix',
    repo: 'remix-run/remix',
    pkg: 'remix',
    color: '#E8F2FF',
    publishedAt: '2021-09-30T00:00:00.000Z',
    author: 'Michael Jackson',
    website: 'https://remix.run',
    initCommend: ['npx create-remix@latest --template remix-run/indie-stack'],
  },
  qwik: {
    name: 'Qwik',
    repo: 'BuilderIO/qwik',
    pkg: '@builder.io/qwik',
    color: '#AC7Ef4',
    publishedAt: '2022-09-19T00:00:00.000Z',
    author: 'Misko Hevery',
    website: 'https://qwik.builder.io',
    initCommend: ['npm create qwik@latest'],
  },
  lit: {
    name: 'Lit',
    repo: 'lit/lit',
    pkg: 'lit',
    color: '#324FFF',
    publishedAt: '2021-04-20T00:00:00.000Z',
    author: 'Kevin Christiansen',
    website: 'https://lit.dev',
    initCommend: ['npm init @open-wc', 'npm i lit'],
  },
  alpine: {
    name: 'Alpine.js',
    repo: 'alpinejs/alpine',
    pkg: 'alpinejs',
    color: '#77C1D2',
    publishedAt: '2019-11-28T00:00:00.000Z',
    author: 'Caleb Porzio',
    website: 'https://alpinejs.dev',
    initCommend: ['npm install alpinejs'],
  },
  gridsome: {
    name: 'Gridsome',
    repo: 'gridsome/gridsome',
    pkg: 'gridsome',
    color: '#52CAA1',
    publishedAt: '2018-09-16T00:00:00.000Z',
    author: 'Lindsay Kwardell',
    website: 'https://gridsome.org',
    initCommend: [
      'npm install --global @gridsome/cli',
      'gridsome create my-app',
    ],
  },
  next: {
    name: 'Next.js',
    repo: 'vercel/next.js',
    pkg: 'next',
    color: '#000000',
    publishedAt: '2016-10-24T00:00:00.000Z',
    author: 'Guillermo Rauch',
    website: 'https://nextjs.org',
    initCommend: ['npx create-next-app@latest'],
  },
  nuxt: {
    name: 'Nuxt',
    repo: 'nuxt/nuxt',
    pkg: 'nuxt',
    color: '#00dC82',
    publishedAt: '2016-10-25T00:00:00.000Z',
    author: 'Sébastien Chopin',
    website: 'https://nuxt.com',
    initCommend: ['npx nuxi@latest init'],
  },
  'svelte-kit': {
    name: 'Svelte Kit',
    repo: 'sveltejs/kit',
    pkg: '@sveltejs/kit',
    color: '#FF3E00',
    publishedAt: '2022-11-30T00:00:00.000Z',
    author: 'Rich Harris',
    website: 'https://kit.svelte.dev',
    initCommend: ['npm create svelte@latest'],
  },
  vuepress: {
    name: 'Vuepress',
    repo: 'vuejs/vuepress',
    pkg: 'vuepress',
    color: '#61BF85',
    publishedAt: '2018-04-12T00:00:00.000Z',
    author: 'Vue.js',
    website: 'https://vuepress.vuejs.org',
    initCommend: ['npx create-vuepress-site my-app']
  },
  vitepress: {
    name: 'Vitepress',
    repo: 'vuejs/vitepress',
    pkg: 'vitepress',
    color: '#837EFF',
    publishedAt: '2020-04-30T00:00:00.000Z',
    author: 'Evan You',
    website: 'https://vitepress.dev',
    initCommend: ['npm add -D vitepress']
  },
  docus: {
    name: 'Docus',
    repo: 'nuxt-themes/docus',
    pkg: '@nuxt-themes/docus',
    color: '#E8F2FF',
    publishedAt: '2020-11-11T00:00:00.000Z',
    author: 'Sébastien Chopin',
    website: 'https://docus.dev',
    initCommend: ['npx nuxi@latest init -t themes/docus'],
  },
  express: {
    name: 'Express',
    repo: 'expressjs/express',
    pkg: 'express',
    color: '#000000',
    publishedAt: '2010-11-15T00:00:00.000Z',
    author: 'TJ Holowaychuk',
    website: 'https://expressjs.com',
    initCommend: ['npx express-generator'],
  },
};

function getVersion(
  version: string | undefined,
  updatedAt: any
): string | undefined {
  return version
    ? `${version} (${formatDistance(parseISO(updatedAt[version]), new Date(), {
      addSuffix: true,
    })})`
    : undefined;
}

export async function getDetails(framework: FrameworkName) {
  const spinner = ora('Loading Details').start();

  let { repo, pkg, publishedAt, author, website, initCommend } =
    frameworks[framework];

  const [{ repo: details }, release] = await Promise.all([
    ofetch(`/repos/${repo}`, { baseURL: 'https://ungh.cc' }),
    ofetch(`/${pkg}`, { baseURL: 'https://registry.npmjs.org' }),
  ]);

  spinner.succeed('Loaded Details');
  const { description: repoDescription, stars } = details;
  const { description: releaseDescription, time: updatedAt } = release;
  const versions = release['dist-tags'];

  return {
    description: repoDescription,
    releaseDescription,
    stars,
    publishedAt: `${format(
      parseISO(publishedAt),
      'dd MMM, yyyy'
    )} (${formatDistance(parseISO(publishedAt), new Date(), {
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
  };
}
