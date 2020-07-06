# projectName

Project uses [TARS](https://github.com/tars/tars/blob/master/README.md) markup builder, which is based on [Gulp.js](http://gulpjs.com/).
You can use [TARS-CLI](https://github.com/tars/tars-cli) via NPM. (TARS-CLI — Command Line Interface for the TARS markup builder).

### Usual Commands of TARS-CLI

* [tars dev](https://github.com/tars/tars-cli/blob/master/docs/en/commands.md#tars-dev) — run dev task in TARS.
* [tars build](https://github.com/tars/tars-cli/blob/master/docs/en/commands.md#tars-build) — run build task in TARS.
* [tars add-module](https://github.com/tars/tars-cli/blob/master/docs/en/commands.md#tars-add-module-modulename) — add module to markup/modules.
* [tars add-page](https://github.com/tars/tars-cli/blob/master/docs/en/commands.md#tars-add-page-pagename) — add page to markup/pages.

You can find more commands on [TARS-CLI](https://github.com/tars/tars-cli)

TARS works under the [MIT License (MIT)](https://github.com/tars/tars/blob/master/LICENSE)

### Files strucrure


```
└── builds/                 # Lastest markup ready for production
    └── components/         # Components
    └── pages/              # Page's templates
    └── static/             # Static-files (css, js and so on)
└── tars/                   # Tasks and helpers for gulp
    └── helpers/            # Helpers
    └── tasks/              # System tasks
    └── user-tasks/         # User's tasks
    └── watchers/           # System watchers
    └── user-watchers/      # User's watchers
    └── tars.js             # Main file of the builder
└── markup/                 # The main project folder
    └── components/         # Components
    └── pages/              # Page's templates
    └── static/             # Static-files (css, js and so on)
├── gulpfile.js             # gulpfile of builder
├── tars.json               # System file with info about builder
├── tars-config.js          # Config file
├── package.json            # Basic dependencies
├── .babelrc                # Config for Babel
├── .eslintrc               # Config for eslint
├── user-package.json       # User dependencies
```

Read more about [TARS files strucrure](https://github.com/tars/tars/blob/master/docs/en/file-structure.md)