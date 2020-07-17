
declare interface BundleConfigInstance {

    /**
     * Instance name
     */
    name?: string

    /**
     * CDN URLS
     */
    sources: Array<string>

    /**
     * Bundled filename
     */
    outfile: string
}

declare type BundlerConfig = Array<BundleConfigInstance>