import { ofetch } from "ofetch";
import { format, formatDistance, parseISO } from 'date-fns'


const frameworks = {
	angular: {
		name: "Angular",
		repo: "angular/angular",
		author: "Google",
		website: "https://angular.io"
	},
	react: {
		name: "React",
		repo: "facebook/react",
		author: "Facebook",
		website: "https://react.dev"
	},
	vue: {
		name: "Vue.js",
		repo: "vuejs/core",
		author: "Evan You",
		website: "https://vuejs.org"
	},
	svelte: {
		name: "Svelte",
		repo: "sveltejs/svelte",
		author: "Rich Harris",
		website: "https://svelte.dev"
	},
	next: {
		name: "Next.js",
		repo: "vercel/next.js",
		author: "Guillermo Rauch",
		website: "https://nextjs.org"
	},
	nuxt: {
		name: "Nuxt",
		repo: "nuxt/nuxt",
		author: ["Alexandre Chopin", "Sebastien Chopin", "Pooya Parsa"],
		website: "https://nuxt.com"
	},
	"svelte-kit": {
		name: "SvelteKit",
		repo: "sveltejs/kit",
		author: "Rich Harris",
		website: "https://kit.svelte.dev"
	},
	astro: {
		name: "Astro",
		repo: "withastro/astro",
		author: "Fred K. Schott",
		website: "https://astro.build"
	},
	preact: {
		name: "Preact",
		repo: "preactjs/preact",
		author: "Jason Miller",
		website: "https://preactjs.com"
	},
	gatsby: {
		name: "Gatsby",
		repo: "gatsbyjs/gatsby",
		author: "Kyle Mathews",
		website: "https://www.gatsbyjs.com"
	},
}

export async function details(framework) {
	let { repo: repoName, author, website } = frameworks[framework];

	const [{ repo }, { release }] = await Promise.all([
		ofetch(`https://ungh.cc/repos/${repoName}`),
		ofetch(`https://ungh.cc/repos/${repoName}/releases/latest`),
	]);

	const { description, stars, createdAt } = repo
	const { tag, publishedAt } = release

	return {
		description,
		stars,
		createdAt: `${format(parseISO(createdAt), 'dd MMM, yyyy')} (${formatDistance(parseISO(createdAt), new Date(), { addSuffix: true })})`,
		updatedAt: formatDistance(parseISO(publishedAt), new Date(), { addSuffix: true }),
		version: tag,
		author: author,
		githubLink: `https://github.com/${repoName}`,
		websiteLink: website
	}
}