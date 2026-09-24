import { select } from '@inquirer/prompts';
import { runMain as _runMain, defineCommand } from 'citty';
import { consola } from 'consola';
import chalk from 'chalk';
import stringWidth from 'string-width';
import wrapAnsi from 'wrap-ansi';

import { description, name, version } from '../package.json';
import { getColor, getDetails, getImage } from '.';
import { FrameworkName } from './types';

function camelToSentence(key: string): string {
  const withSpaces = key.replaceAll(/([A-Z])/g, ' $1');
  return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
}

export const main = defineCommand({
  args: {
    framework: {
      description: 'Name of the Framework',
      type: 'string',
    },
  },
  meta: {
    description,
    name,
    version,
  },
  async run({ args }) {
    const framework = (args.framework ??
        (await select({
          choices: Object.entries(FrameworkName).map(([name, value]) => ({
            name: chalk.hex(getColor(value))(name),
            value,
          })),
          message: 'Select framework',
        }))) as FrameworkName,
      validFrameworks = Object.values(FrameworkName);
    if (!validFrameworks.includes(framework)) {
      consola.error(`Invalid framework: ${framework}`);
      // eslint-disable-next-line unicorn/no-process-exit
      process.exit(1);
    }

    const artLines = (await getImage(framework)).split('\n'),
      artWidth = Math.max(...artLines.map((line) => stringWidth(line))),
      rawMeta = Object.entries(await getDetails(framework)).map(([k, v]) => {
        const label = camelToSentence(k),
          colored = chalk.hex(getColor(framework))(label),
          valueText = typeof v === 'string' ? v : JSON.stringify(v, undefined, 2);

        return {
          indent: stringWidth(label) + 2,
          text: `${colored}: ${valueText}`,
        };
      }),
      gutter = '   ',
      termWidth = process.stdout.columns || 80,
      metaWidth = termWidth - artWidth - gutter.length,
      metaLines = [
        ...Array.from({ length: 4 }).fill(''),
        ...rawMeta.flatMap(({ text, indent }) => {
          const wrapped = wrapAnsi(text, metaWidth, { hard: true }).split('\n');
          return wrapped.map((line, i) => (i === 0 ? line : ' '.repeat(indent) + line));
        }),
      ],
      total = Math.max(artLines.length, metaLines.length),
      out: string[] = [];

    for (let i = 0; i < total; i++) {
      const line = artLines[i] || '',
        padCount = artWidth - stringWidth(line),
        left = line + ' '.repeat(padCount),
        right = metaLines[i] || '';
      out.push(`${left}   ${right}`);
    }

    consola.log(out.join('\n'));
  },
});

export const runMain = () => _runMain(main);