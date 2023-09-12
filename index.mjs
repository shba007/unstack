#!/usr/bin/env node

import { program } from 'commander';
import { logos } from './logo.mjs'

program.option('-f, --framework <framework>');

program.parse(process.argv);

const options = program.opts();

const framework = options.framework.toLowerCase()

if (framework) {
	if (framework in logos)
		console.log(logos[framework])
	else
		console.log(`\n
Enter following framework names: 
- angular, react, vue, svelte, next, nuxt
	`)
}
else
	console.log("Enter a framework name");