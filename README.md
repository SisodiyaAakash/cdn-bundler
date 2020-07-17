# CDN Bundler

It bundles CDN sources

## Install 

```sh
 $ npm install -g cdn-bundler
```

## Usage

Create **.bundler** file in your project which contain configuration like this:

```json
 [
     {
        "name": "Static Libs",
        "sources": [
            "https://rajatprototype.github.io/figs/lib/figs.js",
            "https://rajatprototype.github.io/Krypton/build/Krypton.js"
        ],
        "outfile": "bundle.js"
    }
 ]
```

and run 

```sh
 $ cdn-bundler
```

cdn-bundler will fetch source code from web which we defined in **sources** property
and bundles in single file.