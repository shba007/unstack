#!/usr/bin/env node

import { program } from 'commander';
import { select } from '@inquirer/prompts';

import { logos } from './logo.js'
import { frameworks, getDetails } from './details.js';

async function getFramework(framework) {
	framework = framework.toLowerCase()

	if (framework in logos) {
		console.log(logos[framework])
		console.table(await getDetails(framework))
	}
	else
		console.log(`
Enter following framework names: 
-${Object.entries(frameworks).map(([value, { name }]) => " " + value)}
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
			choices: Object.entries(frameworks).map(([value, { name }]) => ({
				name: name,
				value: value,
			}))
		});

		getFramework(framework)
	}
})()