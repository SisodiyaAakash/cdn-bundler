import emoji from 'node-emoji'
import { join, sep, isAbsolute, dirname } from 'path'
import * as fs from 'fs'
import { configFileName } from './default.json'

/**
 * Find config file from dir list
 * @param configPath - Configuration file path
 * @returns {string}
 */
export function getConfigPath(configPath: string = null): string {
    const pwd = process.cwd()
    let path: string

    if (configPath) {
        path = join(configPath, configFileName)
    } else {
        // Iterate until root dir
        let base = pwd
        let index = base.lastIndexOf(sep)

        while(index !== -1) {
            const abspath = join(base, configFileName)
    
            if (fs.existsSync(abspath)) {
                path = abspath
                break
            }
 
            // Reduce base dir
            base = base.slice(0, index)
            index = base.lastIndexOf(sep)
        }
    }
    return path
}

/**
 * Get emoji from "emoji" module
 * @param name - Emoji name
 * @param fallback - Fallback text
 * @returns {string}
 */
export function getEmoji (name: string, fallback: string): string {
    return emoji.hasEmoji(name)? emoji.get(name): fallback
}

/**
 * Write source bundle
 * @param sources - Source Array
 * @param outfile - Outfile path
 * @returns {boolean}
 */
export function writeBundle(sources: Array<any>, outfile: string): boolean {
    const path = (isAbsolute(outfile))? outfile: join(dirname(getConfigPath()), outfile)
    let isExists: boolean

    isExists = fs.existsSync(path)

    fs.writeFileSync(path, sources.join('\n'), 'UTF-8')

    return isExists
}

/**
 * Get config
 * @returns {BunderConfig}
 */
export function getConfig () : BundlerConfig {
    const configPath = getConfigPath()

    if (!configPath) {
        throw new Error(`Can\'t find ${configFileName}`)
    }

    return JSON.parse(fs.readFileSync(configPath, 'utf8'))
}