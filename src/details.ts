import { ofetch } from "ofetch";
import { format, formatDistance, parseISO } from "date-fns"
import ora from "ora";

interface Framework {
	name: string;
	repo: string;
	color: string;
	publishedAt: string;
	author: string | string[];
	website: string;
	initCommend: string[];
}

export enum FrameworkName {
	Angular = 'angular',
	React = 'react',
	"Vue.js" = 'vue',
	Svelte = 'svelte',
	"Next.js" = 'next',
	Nuxt = 'nuxt',
	"Svelte Kit" = 'svelte-kit',
	Astro = 'astro',
	Preact = 'preact',
	Gatsby = 'gatsby',
	"Solid.js" = 'solid',
	Remix = 'remix',
	Qwik = 'qwik',
	Lit = 'lit',
	"Alpine.js" = "alpine",
	"Express" = "express"
}


export const frameworks: Record<FrameworkName, Framework> = {
	angular: {
		name: "Angular",
		repo: "angular/angular",
		color: "#DD0032",
		publishedAt: "2016-09-13T18:30:00.000Z",
		author: "Google",
		website: "https://angular.io",
		initCommend: ["npm install -g @angular/cli", "ng new"]
	},
	react: {
		name: "React",
		repo: "facebook/react",
		color: "#149ECA",
		publishedAt: "2013-05-28T18:30:00.000Z",
		author: "Facebook",
		website: "https://react.dev",
		initCommend: ["npm create vite@latest -- --template react"]
	},
	vue: {
		name: "Vue.js",
		repo: "vuejs/vue",
		color: "#40B983",
		publishedAt: "2014-01-31T18:30:00.000Z",
		author: "Evan You",
		website: "https://vuejs.org",
		initCommend: ["npm create vue@latest"]
	},
	svelte: {
		name: "Svelte",
		repo: "sveltejs/svelte",
		color: "#FF3E00",
		publishedAt: "2016-11-28T18:30:00.000Z",
		author: "Rich Harris",
		website: "https://svelte.dev",
		initCommend: ["npm create vite@latest -- --template svelte"]
	},
	next: {
		name: "Next.js",
		repo: "vercel/next.js",
		color: "#000000",
		publishedAt: "2016-10-24T18:30:00.000Z",
		author: "Guillermo Rauch",
		website: "https://nextjs.org",
		initCommend: ["npx create-next-app@latest"]
	},
	nuxt: {
		name: "Nuxt",
		repo: "nuxt/nuxt",
		color: "#00dC82",
		publishedAt: "2016-10-25T18:30:00.000Z",
		author: ["Alexandre Chopin", "Sebastien Chopin", "Pooya Parsa"],
		website: "https://nuxt.com",
		initCommend: ["npx nuxi@latest init"]
	},
	"svelte-kit": {
		name: "Svelte Kit",
		repo: "sveltejs/kit",
		color: "#FF3E00",
		publishedAt: "2022-11-30T18:30:00.000Z",
		author: "Rich Harris",
		website: "https://kit.svelte.dev",
		initCommend: ["npm create svelte@latest"]
	},
	astro: {
		name: "Astro",
		repo: "withastro/astro",
		color: "#DC3E8B",
		publishedAt: "2022-06-07T18:30:00.000Z",
		author: "Fred K. Schott",
		website: "https://astro.build",
		initCommend: ["npm create astro@latest"]
	},
	preact: {
		name: "Preact",
		repo: "preactjs/preact",
		color: "#673AB8",
		publishedAt: "2015-11-12T18:30:00.000Z",
		author: "Jason Miller",
		website: "https://preactjs.com",
		initCommend: ["npm init preact"]
	},
	gatsby: {
		name: "Gatsby",
		repo: "gatsbyjs/gatsby",
		color: "#663399",
		publishedAt: "2022-11-07T18:30:00.000Z",
		author: "Kyle Mathews",
		website: "https://www.gatsbyjs.com",
		initCommend: ["npm init gatsby"]
	},
	solid: {
		name: "Solid.js",
		repo: "solidjs/solid",
		color: "#4A80C1",
		publishedAt: "2021-04-05T18:30:00.000Z",
		author: "Ryan Carniato",
		website: "https://www.solidjs.com",
		initCommend: ["npm create vite@latest -- --template solid"]
	},
	remix: {
		name: "Remix",
		repo: "remix-run/remix",
		color: "#E8F2FF",
		publishedAt: "2021-09-30T18:30:00.000Z",
		author: "Michael Jackson",
		website: "https://remix.run",
		initCommend: ["npx create-remix@latest --template remix-run/indie-stack"]
	},
	qwik: {
		name: "Qwik",
		repo: "BuilderIO/qwik",
		color: "#AC7Ef4",
		publishedAt: "2022-09-19T18:30:00.000Z",
		author: "Misko Hevery",
		website: "https://qwik.builder.io",
		initCommend: ["npm create qwik@latest"]
	},
	lit: {
		name: "Lit",
		repo: "lit/lit",
		color: "#324FFF",
		publishedAt: "2021-04-20T18:30:00.000Z",
		author: "Kevin Christiansen",
		website: "https://lit.dev",
		initCommend: ["npm init @open-wc", "npm i lit"]
	},
	alpine: {
		name: "Alpine.js",
		repo: "alpinejs/alpine",
		color: "#77C1D2",
		publishedAt: "2019-11-28T18:30:00.000Z",
		author: "Caleb Porzio",
		website: "https://alpinejs.dev",
		initCommend: ["npm install alpinejs"]
	},
	express: {
		name: "Express",
		repo: "expressjs/express",
		color: "#000000",
		publishedAt: "2010-11-15T18:30:00.000Z",
		author: "TJ Holowaychuk",
		website: "https://expressjs.com",
		initCommend: ["npx express-generator"]
	},
}

export async function getDetails(framework: FrameworkName) {
	const spinner = ora("Loading Details").start();

	let { repo: repoName, publishedAt, author, website, initCommend } = frameworks[framework];

	const [{ repo }, { release }] = await Promise.all([
		ofetch(`https://ungh.cc/repos/${repoName}`),
		ofetch(`https://ungh.cc/repos/${repoName}/releases/latest`),
	]);

	spinner.succeed("Loaded Details");
	const { description, stars } = repo
	const { tag, publishedAt: updatedAt } = release

	return {
		description,
		stars,
		publishedAt: `${format(parseISO(publishedAt), "dd MMM, yyyy")} (${formatDistance(parseISO(publishedAt), new Date(), { addSuffix: true })})`,
		updatedAt: formatDistance(parseISO(updatedAt), new Date(), { addSuffix: true }),
		version: tag,
		author: author,
		githubLink: `https://github.com/${repoName}`,
		websiteLink: website,
		initCommend
	}
}