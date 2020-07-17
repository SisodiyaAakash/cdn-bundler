/**
 * Find config file from dir list
 * @param configPath - Configuration file path
 * @returns {string}
 */
export declare function getConfigPath(configPath?: string): string;
/**
 * Get emoji from "emoji" module
 * @param name - Emoji name
 * @param fallback - Fallback text
 * @returns {string}
 */
export declare function getEmoji(name: string, fallback: string): string;
/**
 * Write source bundle
 * @param sources - Source Array
 * @param outfile - Outfile path
 * @returns {boolean}
 */
export declare function writeBundle(sources: Array<any>, outfile: string): boolean;
/**
 * Get config
 * @returns {BunderConfig}
 */
export declare function getConfig(): BundlerConfig;
