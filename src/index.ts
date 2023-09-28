#!/usr/bin/env node

import { program } from 'commander';
import { select } from '@inquirer/prompts';
import chalk from 'chalk';

import { logos } from './logo.js'
import { FrameworkName, frameworks, getDetails } from './details.js';

async function getFramework(framework: FrameworkName) {
	framework = framework.toLowerCase() as FrameworkName

	if (framework in logos) {
		console.log(logos[framework])
		console.table(await getDetails(framework))
	}
	else
		console.log(`
Enter following framework names: 
-${Object.values(FrameworkName).map(name => " " + name)}
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
	} else {
		const framework = await select({
			message: 'Select framework',
			choices: Object.entries(FrameworkName).map(([name, value]) => ({
				name: chalk.hex(frameworks[value].color)(name),
				value
			}))
		});

		getFramework(framework)
	}
})()