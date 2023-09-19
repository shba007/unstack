#!/usr/bin/env node

import { program } from 'commander';
import { select } from '@inquirer/prompts';

import { logos } from './logo.js'
import { details } from './details.js';

async function getFramework(framework) {
	framework = framework.toLowerCase()

	if (framework in logos) {
		console.log(logos[framework])
		console.table(await details(framework))
	}
	else
		console.log(`
Enter following framework names: 
- angular, react, vue, svelte, next, nuxt, svelte-kit, astro, preact, gatsby, solid, remix
		`)
}

(async () => {
	program
		.name("framework-logo")
		.usage("[options]")
		.option('-f, --framework <framework>', 'prints the framework\'s logo and details');

	program.parse(process.argv);
	const { framework } = program.opts();

	if (framework) {
		getFramework(framework)
	}
	else {
		const framework = await select({
			message: 'Select framework',
			choices: [
				{
					name: "Angular",
					value: "angular"
				},
				{
					name: "React",
					value: "react"
				},
				{
					name: "Vue",
					value: "vue"
				},
				{
					name: "Svelte",
					value: "svelte"
				},
				{
					name: "Next",
					value: "next"
				},
				{
					name: "Nuxt",
					value: "nuxt"
				},
				{
					name: "Svelte Kit",
					value: "svelte-kit"
				},
				{
					name: "Astro",
					value: "astro"
				},
				{
					name: "Preact",
					value: "preact"
				},
				{
					name: "Gatsby",
					value: "gatsby"
				},
				{
					name: "Soild.js",
					value: "solid"
				},
				{
					name: "Remix",
					value: "remix"
				}
			]
		});

		getFramework(framework)
	}
})()