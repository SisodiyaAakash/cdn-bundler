#!/usr/bin/env node

import fetch from 'node-fetch'
import chalk from 'chalk'
import * as utils from './utils'

let config: BundlerConfig
const xEmoji = utils.getEmoji('x', chalk.red('X'))
const checkEmoji = utils.getEmoji('heavy_check_mark', chalk.bgGreen('DONE'))

try {
    config = utils.getConfig()
} catch (err) {
    process.stdout.write(chalk.red(err) + '\n')
    process.exit(0)
}

// Convert to array
if (config && typeof config === 'object' && !Array.isArray(config)) {
    config = [config]
}

function validateConfigInstance (task: BundleConfigInstance): never | void {
    let message: string

    if (task.sources === undefined || task.sources.length === 0) {
        message = 'Require \'source\' list in config'
    }
    if (task.outfile === undefined || task.outfile.length === 0) {
        message = 'Require \'outfile\' in config'
    }

    if (message) {
        process.stdout.write(chalk.red(message.concat('\n')))
        process.exit()
    }
}

const tasks = config.map(task => {
    const { name, outfile } = task

    validateConfigInstance(task)

    return {
        name,
        outfile,
        state: Promise.all(
            task.sources.map(async url => {
                const response = await fetch(url, { method: 'GET' })

                if (response.status !== 200) {
                    throw new Error(`Can't get ${chalk.bold(url)}`)
                }
                return await response.text()
            })
        )
    }
})

tasks.forEach((task) => {
    let sign: string
    let message: string
    let name = chalk.white(task.name || task.outfile)

    task.state
        .then(source => {
            sign = checkEmoji

            const isExists = utils.writeBundle(source, task.outfile)

            message = chalk.green(isExists ? 'Updated' : 'Created')
        })
        .catch(err => {
            sign = xEmoji
            message = chalk.red(err.message)
        })
        .finally(() => {
            process.stdout.write(`${sign}  ${message} ${name}\n`)
        })
})

