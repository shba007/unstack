import { ofetch } from "ofetch";
import { format, formatDistance, parseISO } from "date-fns"
import ora from "ora";

export const frameworks = {
	angular: {
		name: "Angular",
		repo: "angular/angular",
		publishedAt: "2016-09-13T18:30:00.000Z",
		author: "Google",
		website: "https://angular.io",
		initCommend: ["npm install -g @angular/cli", "ng new"]
	},
	react: {
		name: "React",
		repo: "facebook/react",
		publishedAt: "2013-05-28T18:30:00.000Z",
		author: "Facebook",
		website: "https://react.dev",
		initCommend: ["npm create vite@latest -- --template react"]
	},
	vue: {
		name: "Vue.js",
		repo: "vuejs/vue",
		publishedAt: "2014-01-31T18:30:00.000Z",
		author: "Evan You",
		website: "https://vuejs.org",
		initCommend: ["npm create vue@latest"]
	},
	svelte: {
		name: "Svelte",
		repo: "sveltejs/svelte",
		publishedAt: "2016-11-28T18:30:00.000Z",
		author: "Rich Harris",
		website: "https://svelte.dev",
		initCommend: ["npm create vite@latest -- --template svelte"]
	},
	next: {
		name: "Next.js",
		repo: "vercel/next.js",
		publishedAt: "2016-10-24T18:30:00.000Z",
		author: "Guillermo Rauch",
		website: "https://nextjs.org",
		initCommend: ["npx create-next-app@latest"]
	},
	nuxt: {
		name: "Nuxt",
		repo: "nuxt/nuxt",
		publishedAt: "2016-10-25T18:30:00.000Z",
		author: ["Alexandre Chopin", "Sebastien Chopin", "Pooya Parsa"],
		website: "https://nuxt.com",
		initCommend: ["npx nuxi@latest init"]
	},
	"svelte-kit": {
		name: "Svelte Kit",
		repo: "sveltejs/kit",
		publishedAt: "2022-11-30T18:30:00.000Z",
		author: "Rich Harris",
		website: "https://kit.svelte.dev",
		initCommend: ["npm create svelte@latest"]
	},
	astro: {
		name: "Astro",
		repo: "withastro/astro",
		publishedAt: "2022-06-07T18:30:00.000Z",
		author: "Fred K. Schott",
		website: "https://astro.build",
		initCommend: ["npm create astro@latest"]
	},
	preact: {
		name: "Preact",
		repo: "preactjs/preact",
		publishedAt: "2015-11-12T18:30:00.000Z",
		author: "Jason Miller",
		website: "https://preactjs.com",
		initCommend: ["npm init preact"]
	},
	gatsby: {
		name: "Gatsby",
		repo: "gatsbyjs/gatsby",
		publishedAt: "2022-11-07T18:30:00.000Z",
		author: "Kyle Mathews",
		website: "https://www.gatsbyjs.com",
		initCommend: ["npm init gatsby"]
	},
	solid: {
		name: "Solid.js",
		repo: "solidjs/solid",
		publishedAt: "2021-04-05T18:30:00.000Z",
		author: "Ryan Carniato",
		website: "https://www.solidjs.com",
		initCommend: ["npm create vite@latest -- --template solid"]
	},
	remix: {
		name: "Remix",
		repo: "remix-run/remix",
		publishedAt: "2021-09-30T18:30:00.000Z",
		author: "Michael Jackson",
		website: "https://remix.run",
		initCommend: ["npx create-remix@latest --template remix-run/indie-stack"]
	},
	qwik: {
		name: "Qwik",
		repo: "BuilderIO/qwik",
		publishedAt: "2022-09-19T18:30:00.000Z",
		author: "Misko Hevery",
		website: "https://qwik.builder.io",
		initCommend: ["npm create qwik@latest"]
	}
}

export async function getDetails(framework) {
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