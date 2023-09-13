import { ofetch } from "ofetch";

export async function details(framework) {
	let repoName;

	switch (framework) {
		case "angular":
			repoName = "angular/angular"
			break;
		case "react":
			repoName = "facebook/react"
			break;
		case "vue":
			repoName = "vuejs/core"
			break;
		case "svelte":
			repoName = "sveltejs/svelte"
			break;
		case "next":
			repoName = "vercel/next.js"
		case "nuxt":
			repoName = "nuxt/nuxt"
			break;
		case "svelte-kit":
			repoName = "sveltejs/kit"

		default:
			break;
	}

	const { repo } = await ofetch(`https://ungh.cc/repos/${repoName}`);
	const { release } = await ofetch(`https://ungh.cc/repos/${repoName}/releases/latest`);

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