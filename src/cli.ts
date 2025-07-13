import { select } from '@inquirer/prompts'
import { defineCommand, runMain as _runMain } from 'citty'
import { consola } from 'consola'
import chalk from 'chalk'
import stringWidth from 'string-width'
import wrapAnsi from 'wrap-ansi'

import { name, description, version } from '../package.json'
import { getDetails, getColor, getImage } from '.'
import { FrameworkName } from './types'

function camelToSentence(key: string): string {
  const withSpaces = key.replace(/([A-Z])/g, ' $1')
  return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1)
}

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

    const artLines = (await getImage(framework)).split('\n')
    const artWidth = Math.max(...artLines.map((line) => stringWidth(line)))

    const rawMeta = Object.entries(await getDetails(framework)).map(([k, v]) => {
      const label = camelToSentence(k)
      const colored = chalk.hex(getColor(framework))(label)
      const valueText = typeof v === 'string' ? v : JSON.stringify(v, undefined, 2)

      return {
        text: `${colored}: ${valueText}`,
        indent: stringWidth(label) + 2,
      }
    })

    const gutter = '   '
    const termWidth = process.stdout.columns || 80
    const metaWidth = termWidth - artWidth - gutter.length

    const metaLines = [
      ...Array.from({ length: 4 }).fill(''),
      ...rawMeta.flatMap(({ text, indent }) => {
        const wrapped = wrapAnsi(text, metaWidth, { hard: true }).split('\n')
        return wrapped.map((line, i) => (i === 0 ? line : ' '.repeat(indent) + line))
      }),
    ]

    const total = Math.max(artLines.length, metaLines.length)
    const out: string[] = []

    for (let i = 0; i < total; i++) {
      const line = artLines[i] || ''
      const padCount = artWidth - stringWidth(line)
      const left = line + ' '.repeat(padCount)
      const right = metaLines[i] || ''
      out.push(`${left}   ${right}`)
    }

    consola.log(out.join('\n'))
  },
})

export const runMain = () => _runMain(main)
