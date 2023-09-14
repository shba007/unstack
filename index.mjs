#!/usr/bin/env node

import { program } from 'commander';
import { logos } from './logo.mjs'
import { details } from './details.mjs';


(async () => {
	program
		.name("framework-logo")
		.usage("[options]")
		.option('-f, --framework <framework>', 'prints the framework\'s logo and details');

	program.parse(process.argv);

	let { framework } = program.opts();

	if (framework) {
		framework = framework.toLowerCase()
		if (framework in logos) {
			console.log(logos[framework])
			console.table(await details(framework))
		}
		else
			console.log(`
Enter following framework names: 
- angular, react, vue, svelte, next, nuxt, svelte-kit, astro, preact
		`)
	}
	else
		console.log(`
Enter following framework names: 
- angular, react, vue, svelte, next, nuxt, svelte-kit, astro, preact
	`)
})()