import { program } from 'commander';
import { logos } from './logo.mjs'

program
	.option('-f, --framework <framework>');


program.parse(process.argv);

const options = program.opts();

if (options.framework)
	console.log(logos[options.framework])