import { ofetch } from "ofetch";
import { format, formatDistance, parseISO } from 'date-fns'

const frameworks = {
	angular: {
		name: "Angular",
		repo: "angular/angular",
		publishedAt: "2016-09-13T18:30:00.000Z",
		author: "Google",
		website: "https://angular.io"
	},
	react: {
		name: "React",
		repo: "facebook/react",
		publishedAt: "2013-05-28T18:30:00.000Z",
		author: "Facebook",
		website: "https://react.dev"
	},
	vue: {
		name: "Vue.js",
		repo: "vuejs/vue",
		publishedAt: "2014-01-31T18:30:00.000Z",
		author: "Evan You",
		website: "https://vuejs.org"
	},
	svelte: {
		name: "Svelte",
		repo: "sveltejs/svelte",
		publishedAt: "2016-11-28T18:30:00.000Z",
		author: "Rich Harris",
		website: "https://svelte.dev"
	},
	next: {
		name: "Next.js",
		repo: "vercel/next.js",
		publishedAt: "2016-10-24T18:30:00.000Z",
		author: "Guillermo Rauch",
		website: "https://nextjs.org"
	},
	nuxt: {
		name: "Nuxt",
		repo: "nuxt/nuxt",
		publishedAt: "2016-10-25T18:30:00.000Z",
		author: ["Alexandre Chopin", "Sebastien Chopin", "Pooya Parsa"],
		website: "https://nuxt.com"
	},
	"svelte-kit": {
		name: "SvelteKit",
		repo: "sveltejs/kit",
		publishedAt: "2022-11-30T18:30:00.000Z",
		author: "Rich Harris",
		website: "https://kit.svelte.dev"
	},
	astro: {
		name: "Astro",
		repo: "astro/build",
		publishedAt: "2022-06-07T18:30:00.000Z",
		author: "Fred K. Schott",
		website: "https://astro.build"
	},
	preact: {
		name: "Preact",
		repo: "preactjs/preact",
		publishedAt: "2015-11-12T18:30:00.000Z",
		author: "Jason Miller",
		website: "https://preactjs.com"
	},
	gatsby: {
		name: "Gatsby",
		repo: "gatsbyjs/gatsby",
		publishedAt: "2022-11-07T18:30:00.000Z",
		author: "Kyle Mathews",
		website: "https://www.gatsbyjs.com"
	},
	solid: {
		name: "Solid.js",
		repo: "solidjs/solid",
		publishedAt: "2021-04-05T18:30:00.000Z",
		author: "Ryan Carniato",
		website: "https://www.solidjs.com"
	}
}

export async function details(framework) {
	let { repo: repoName, publishedAt, author, website } = frameworks[framework];

	const [{ repo }, { release }] = await Promise.all([
		ofetch(`https://ungh.cc/repos/${repoName}`),
		ofetch(`https://ungh.cc/repos/${repoName}/releases/latest`),
	]);

	const { description, stars } = repo
	const { tag, publishedAt: updatedAt } = release

	return {
		description,
		stars,
		publishedAt: `${format(parseISO(publishedAt), 'dd MMM, yyyy')} (${formatDistance(parseISO(publishedAt), new Date(), { addSuffix: true })})`,
		updatedAt: formatDistance(parseISO(updatedAt), new Date(), { addSuffix: true }),
		version: tag,
		author: author,
		githubLink: `https://github.com/${repoName}`,
		websiteLink: website
	}
}