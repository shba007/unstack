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
  Preact = 'preact',
  'Solid.js' = 'solid',
  Remix = 'remix',
  Qwik = 'qwik',
  Lit = 'lit',
  'Alpine.js' = 'alpine',
  Stencil = 'stencil',
  Mithril = 'mithril',
  Astro = 'astro',
  Vuepress = 'vuepress',
  Vitepress = 'vitepress',
  Docus = 'docus',
  Express = 'express',
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
  Hydrogen = 'hydrogen'
}

export const frameworks: Record<FrameworkName, Framework> = {
  angular: {
    name: 'Angular',
    repo: 'angular/angular',
    pkg: '@angular/core',
    color: '#DD0032',
    publishedAt: '2016-04-28T04:23:30.108Z',
    author: 'Google',
    website: 'https://angular.io',
    initCommend: ['npm install -g @angular/cli', 'ng new'],
  },
  react: {
    name: 'React',
    repo: 'facebook/react',
    pkg: 'react',
    color: '#149ECA',
    publishedAt: '2011-10-26T17:46:22.746Z',
    author: 'Facebook',
    website: 'https://react.dev',
    initCommend: ['npm create vite@latest -- --template react'],
  },
  vue: {
    name: 'Vue.js',
    repo: 'vuejs/core',
    pkg: 'vue',
    color: '#40B983',
    publishedAt: '2013-12-07T06:09:48.297Z',
    author: 'Evan You',
    website: 'https://vuejs.org',
    initCommend: ['npm create vue@latest'],
  },
  svelte: {
    name: 'Svelte',
    repo: 'sveltejs/svelte',
    pkg: 'svelte',
    color: '#FF3E00',
    publishedAt: '2016-11-17T22:58:41.644Z',
    author: 'Rich Harris',
    website: 'https://svelte.dev',
    initCommend: ['npm create vite@latest -- --template svelte'],
  },
  preact: {
    name: 'Preact',
    repo: 'preactjs/preact',
    pkg: 'preact',
    color: '#673AB8',
    publishedAt: '2015-09-11T02:41:33.521Z',
    author: 'Jason Miller',
    website: 'https://preactjs.com',
    initCommend: ['npm init preact'],
  },
  solid: {
    name: 'Solid.js',
    repo: 'solidjs/solid',
    pkg: 'solid-js',
    color: '#4A80C1',
    publishedAt: '2018-04-25T04:09:31.395Z',
    author: 'Ryan Carniato',
    website: 'https://www.solidjs.com',
    initCommend: ['npm create vite@latest -- --template solid'],
  },
  remix: {
    name: 'Remix',
    repo: 'remix-run/remix',
    pkg: 'remix',
    color: '#E8F2FF',
    publishedAt: '2014-11-26T11:49:48.826Z',
    author: 'Michael Jackson',
    website: 'https://remix.run',
    initCommend: ['npx create-remix@latest --template remix-run/indie-stack'],
  },
  qwik: {
    name: 'Qwik',
    repo: 'BuilderIO/qwik',
    pkg: '@builder.io/qwik',
    color: '#AC7Ef4',
    publishedAt: '2021-06-01T16:09:32.677Z',
    author: 'Misko Hevery',
    website: 'https://qwik.builder.io',
    initCommend: ['npm create qwik@latest'],
  },
  lit: {
    name: 'Lit',
    repo: 'lit/lit',
    pkg: 'lit',
    color: '#324FFF',
    publishedAt: '2012-07-04T20:56:02.247Z',
    author: 'Kevin Christiansen',
    website: 'https://lit.dev',
    initCommend: ['npm init @open-wc', 'npm i lit'],
  },
  alpine: {
    name: 'Alpine.js',
    repo: 'alpinejs/alpine',
    pkg: 'alpinejs',
    color: '#77C1D2',
    publishedAt: '2019-12-18T20:28:47.929Z',
    author: 'Caleb Porzio',
    website: 'https://alpinejs.dev',
    initCommend: ['npm install alpinejs'],
  },
  stencil: {
    name: 'Stencil',
    repo: 'ionic-team/stencil',
    pkg: '@stencil/core',
    color: '#4942FF',
    publishedAt: '2017-07-06T20:23:20.664Z',
    author: 'Ionic Framework Team',
    website: 'https://stenciljs.com',
    initCommend: ['npm init stencil']
  },
  mithril: {
    name: 'Mithril',
    repo: 'MithrilJS/mithril.js',
    pkg: 'mithril',
    color: '#000000',
    publishedAt: '2014-04-02T02:27:07.149Z',
    author: 'Leo Horie',
    website: 'https://mithril.js.org',
    initCommend: ['npm init -y', 'npm install mithril --save']
  },
  astro: {
    name: 'Astro',
    repo: 'withastro/astro',
    pkg: 'astro',
    color: '#DC3E8B',
    publishedAt: '2021-03-13T14:19:42.693Z',
    author: 'Fred K. Schott',
    website: 'https://astro.build',
    initCommend: ['npm create astro@latest'],
  },
  vuepress: {
    name: 'Vuepress',
    repo: 'vuejs/vuepress',
    pkg: 'vuepress',
    color: '#61BF85',
    publishedAt: '2018-04-12T22:41:48.989Z',
    author: 'Vue.js',
    website: 'https://vuepress.vuejs.org',
    initCommend: ['npx create-vuepress-site my-app']
  },
  vitepress: {
    name: 'Vitepress',
    repo: 'vuejs/vitepress',
    pkg: 'vitepress',
    color: '#837EFF',
    publishedAt: '2020-04-30T22:35:36.455Z',
    author: 'Evan You',
    website: 'https://vitepress.dev',
    initCommend: ['npm add -D vitepress']
  },
  docus: {
    name: 'Docus',
    repo: 'nuxt-themes/docus',
    pkg: '@nuxt-themes/docus',
    color: '#E8F2FF',
    publishedAt: '2022-11-14T15:01:00.635Z',
    author: 'Sébastien Chopin',
    website: 'https://docus.dev',
    initCommend: ['npx nuxi@latest init -t themes/docus'],
  },
  express: {
    name: 'Express',
    repo: 'expressjs/express',
    pkg: 'express',
    color: '#000000',
    publishedAt: '2012-10-23T22:30:10.025Z',
    author: 'TJ Holowaychuk',
    website: 'https://expressjs.com',
    initCommend: ['npx express-generator'],
  },
  koa: {
    name: 'Koa',
    repo: 'koajs/koa',
    pkg: 'koa',
    color: '#33333E',
    publishedAt: '2013-11-06T20:11:52.916Z',
    author: 'Tobias Lütke, Chris Wanstrath',
    website: 'https://koajs.com',
    initCommend: ['mkdir my-app', 'npm init -y', 'npm i koa'],
  },
  feathers: {
    name: "Feather",
    repo: 'feathersjs/feathers',
    pkg: '@feathersjs/feathers',
    color: '#FFFFFF',
    publishedAt: '2017-10-20T23:40:48.540Z',
    author: '',
    website: 'https://feathersjs.com',
    initCommend: ['npm create feathers my-app']
  },
  nestjs: {
    name: 'NestJS',
    repo: 'nestjs/nest',
    pkg: '@nestjs/core',
    color: '#CE3951',
    publishedAt: '2017-05-14T13:40:50.632Z',
    author: 'Kamil Myśliwiec',
    website: 'https://nestjs.com',
    initCommend: ['npm i -g @nestjs/cli', 'nest new my-app']
  },
  nitro: {
    name: 'Nitro',
    repo: 'unjs/nitro',
    pkg: 'nitropack',
    color: '#F478CF',
    publishedAt: '2021-11-04T11:43:49.855Z',
    author: 'Pooya Parsa',
    website: 'https://nitro.unjs.io',
    initCommend: ['npx giget@latest nitro', 'cd nitro-app', 'npm install']
  },
  analog: {
    name: 'Analog',
    repo: 'analogjs/analog',
    pkg: '@analogjs/platform',
    color: '#DD0430',
    publishedAt: '2022-11-17T14:38:36.645Z',
    author: 'Brandon Roberts',
    website: 'https://analogjs.org',
    initCommend: ['npm create analog@latest'],
  },
  next: {
    name: 'Next.js',
    repo: 'vercel/next.js',
    pkg: 'next',
    color: '#000000',
    publishedAt: '2011-07-11T11:00:46.466Z',
    author: 'Guillermo Rauch',
    website: 'https://nextjs.org',
    initCommend: ['npx create-next-app@latest'],
  },
  gatsby: {
    name: 'Gatsby',
    repo: 'gatsbyjs/gatsby',
    pkg: 'gatsby',
    color: '#663399',
    publishedAt: '2015-05-21T22:45:18.317Z',
    author: 'Kyle Mathews',
    website: 'https://www.gatsbyjs.com',
    initCommend: ['npm init gatsby'],
  },
  nuxt: {
    name: 'Nuxt',
    repo: 'nuxt/nuxt',
    pkg: 'nuxt',
    color: '#00dC82',
    publishedAt: '2016-10-26T11:41:36.169Z',
    author: 'Sébastien Chopin',
    website: 'https://nuxt.com',
    initCommend: ['npx nuxi@latest init'],
  },
  gridsome: {
    name: 'Gridsome',
    repo: 'gridsome/gridsome',
    pkg: 'gridsome',
    color: '#52CAA1',
    publishedAt: '2018-09-16T21:28:58.435Z',
    author: 'Lindsay Kwardell',
    website: 'https://gridsome.org',
    initCommend: [
      'npm install --global @gridsome/cli',
      'gridsome create my-app',
    ],
  },
  'svelte-kit': {
    name: 'Svelte Kit',
    repo: 'sveltejs/kit',
    pkg: '@sveltejs/kit',
    color: '#FF3E00',
    publishedAt: '2020-10-14T04:10:35.965Z',
    author: 'Rich Harris',
    website: 'https://kit.svelte.dev',
    initCommend: ['npm create svelte@latest'],
  },
  ember: {
    name: 'Ember',
    repo: 'emberjs/ember.js',
    pkg: 'ember-source',
    color: '#E04E3A',
    publishedAt: '2016-10-07T19:46:37.587Z',
    author: 'Yehuda Katz',
    website: 'https://emberjs.com',
    initCommend: ['npm install -g ember-cli', 'ember new my-app --lang en']
  },
  fresh: {
    name: 'Fresh',
    repo: 'denoland/fresh',
    pkg: 'https://fresh.deno.dev',
    color: '#F9D94A',
    publishedAt: '2022-06-21T00:00:00.000Z',
    author: 'Luca Casonato',
    website: 'https://fresh.deno.dev',
    initCommend: ['deno run -A -r https://fresh.deno.dev'],
  },
  redwood: {
    name: 'Redwood',
    repo: 'redwoodjs/redwood',
    pkg: 'create-redwood-app',
    color: '#BF4722',
    publishedAt: '2020-01-15T20:08:35.633Z',
    author: 'Ryan Chenkie',
    website: 'https://redwoodjs.com',
    initCommend: ['npm create redwood-app my-app']
  },
  meteor: {
    name: 'Meteor',
    repo: 'meteor/meteor',
    pkg: 'meteor',
    color: '#F87171',
    publishedAt: '2012-11-30T01:32:01.761Z',
    author: 'Tom Coleman, Sacha Greif, Isaac Strack',
    website: 'https://www.meteor.com',
    initCommend: ['npm i -g meteor', 'meteor create']
  },
  hydrogen: {
    name: 'Hydrogen',
    repo: 'Shopify/hydrogen',
    pkg: '@shopify/hydrogen',
    color: '#6127f3',
    publishedAt: '2021-08-16T14:42:27.228Z',
    author: '',
    website: 'https://hydrogen.shopify.dev',
    initCommend: ['npm create @shopify/hydrogen@latest']
  }
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
