import { select } from '@inquirer/prompts'
import { defineCommand, runMain as _runMain } from 'citty'
import consola from 'consola'
import chalk from 'chalk'

import { name, description, version } from '../package.json'
import { getDetails, getColor, getImage } from '.'
import { FrameworkName } from './types'

export const main = defineCommand({
  meta: {
    name,
    description,
    version,
  },
  args: {
    framework: {
      type: 'string',
      description: 'Name of the Framework',
    },
  },
  async run({ args }) {
    const framework = (args.framework ??
      (await select({
        message: 'Select framework',
        choices: Object.entries(FrameworkName).map(([name, value]) => ({
          name: chalk.hex(getColor(value))(name),
          value,
        })),
      }))) as FrameworkName

    const validFrameworks = Object.values(FrameworkName)
    if (!validFrameworks.includes(framework)) {
      consola.error(`Invalid framework: ${framework}`)
      // eslint-disable-next-line unicorn/no-process-exit
      process.exit(1)
    }

    consola.log(await getImage(framework))
    consola.log(await getDetails(framework))
  },
})

export const runMain = () => _runMain(main)