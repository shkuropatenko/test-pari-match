module.exports = {
    /////////////////////
    // MUTABLE OPTIONS ////////////////////////////////
    // YOU CAN CHANGE THIS OPTIONS ALL THE TIME      //
    //                                               //
    // You need to restart builder to apply options. //
    ///////////////////////////////////////////////////
    "postcss": [],
    "svg": {
        "active": true,
        // symbols, sprite
        workflow: 'sprite',
        "symbolsConfig": {
            // separate-file, separate-file-with-link, inject
            "loadingType": "inject",
            "usePolyfillForExternalSymbols": true,
            "pathToExternalSymbolsFile": ""
        }
    },
    "css": {
        "workflow": "concat" // concat, manual
    },
    "js": {
        // concat, modular
        "workflow": "concat",
        // Only webpack is available right now
        "bundler": "webpack",
        "lint": true,
        "useBabel": false,
        "removeConsoleLog": true,
        "webpack": {
            "useHMR": false
        },
        "jsPathsToConcatBeforeModulesJs": [
        ],
        "lintJsCodeBeforeModules": false,
        "jsPathsToConcatAfterModulesJs": [
            "./markup/static/js/main.js"
        ],
        "lintJsCodeAfterModules": false
    },
    "sourcemaps": {
        "js": {
            "active": true,
            "inline": false
        },
        "css": {
            "active": true,
            "inline": false
        }
    },
    "notifyConfig": {
        "useNotify": true,
        "title": "TARS notification",
        "sounds": {},
        "taskFinishedText": "Task finished at: "
    },
    "minifyHtml": false,
    "generateStaticPath": true,
    "buildPath": "./builds/",
    "useBuildVersioning": false,
    "useArchiver": false,
    "ulimit": 4096,
    "templater": "handlebars",
    "cssPreprocessor": "scss",
    "useImagesForDisplayWithDpi": [
        96
    ],
    "fs": {
        "staticFolderName": "static",
        "imagesFolderName": "images",
        "componentsFolderName": "components"
    },
    "useFTP": true
};
