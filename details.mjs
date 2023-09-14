import { ofetch } from "ofetch";

const frameworks = {
	angular: {
		repo: "angular/angular"
	},
	react: {
		repo: "facebook/react"
	},
	vue: {
		repo: "vuejs/core"
	},
	svelte: {
		repo: "sveltejs/svelte"
	},
	next: {
		repo: "vercel/next.js"
	},
	nuxt: {
		repo: "nuxt/nuxt"
	},
	"svelte-kit": {
		repo: "sveltejs/kit"
	},
	"astro": {
		repo: "withastro/astro"
	},
	"preact": {
		repo: "preactjs/preact"
	}
}

export async function details(framework) {
	let repoName = frameworks[framework].repo;

	const [{ repo }, { release }] = await Promise.all([
		ofetch(`https://ungh.cc/repos/${repoName}`),
		ofetch(`https://ungh.cc/repos/${repoName}/releases/latest`),
	]);

	const { description, stars, createdAt } = repo
	const { tag, publishedAt } = release

	return {
		description,
		stars,
		createdAt,
		version: tag,
		publishedAt,
		githubLink: `https://github.com/${repoName}`,
	}
}