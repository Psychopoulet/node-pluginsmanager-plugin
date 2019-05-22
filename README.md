# node-pluginsmanager-plugin
An abstract parent plugin for node-pluginsmanager

[![Build status](https://api.travis-ci.org/Psychopoulet/node-pluginsmanager-plugin.svg?branch=master)](https://travis-ci.org/Psychopoulet/node-pluginsmanager-plugin)
[![Coverage status](https://coveralls.io/repos/github/Psychopoulet/node-pluginsmanager-plugin/badge.svg?branch=master)](https://coveralls.io/github/Psychopoulet/node-pluginsmanager-plugin)
[![Dependency status](https://david-dm.org/Psychopoulet/node-pluginsmanager-plugin/status.svg)](https://david-dm.org/Psychopoulet/node-pluginsmanager-plugin)
[![Dev dependency status](https://david-dm.org/Psychopoulet/node-pluginsmanager-plugin/dev-status.svg)](https://david-dm.org/Psychopoulet/node-pluginsmanager-plugin?type=dev)
[![Issues](https://img.shields.io/github/issues/Psychopoulet/node-pluginsmanager-plugin.svg)](https://github.com/Psychopoulet/node-pluginsmanager-plugin/issues)
[![Pull requests](https://img.shields.io/github/issues-pr/Psychopoulet/node-pluginsmanager-plugin.svg)](https://github.com/Psychopoulet/node-pluginsmanager-plugin/pulls)

## Installation

```bash
$ npm install node-pluginsmanager-plugin
```

## Features

  * create a inheritable parent for node-pluginsmanager's plugins

## Doc

  -- Attributes -- 

  * ``` authors: Array<string> ```
  * ``` description: string ```
  * ``` dependencies: object ```
  * ``` devDependencies: object ```
  * ``` engines: object ```
  * ``` license: string ```
  * ``` main: string ```
  * ``` name: string ```
  * ``` scripts: object ```
  * ``` version: string ```

  * ``` directory: string ``` current plugin directory
  * ``` designs: Array<string> ``` css files for this plugin (ex : "css/design.css")
  * ``` javascripts: Array<string> ``` js files for this plugin (ex : "scripts/controller.js")
  * ``` templates: Array<string> ``` html files for this plugin (ex : "templates/myPlugin.html")

  -- Constructor --

  * ``` constructor(directory : string) ```

  -- Methods --

  * ``` loadDataFromPackageFile(void): Promise<Plugin> ``` load all package data. automaticly add non-managed data to the plugin instance.
  * ``` load(): Promise<void> ``` init plugin (communications, crons, etc...). automatically called by "install" & "update" methods.
  * ``` unload(destroy = false : boolean): Promise<void> ``` release plugin (free sockets, stop tasks, etc...). "destroy" is use to force attributes destruction. automatically called by "uninstall" & "update" methods.
  * ``` install(): Promise<void> ``` process for specific plugin's installation (download ressources, files creations, etc...)
  * ``` update(): Promise<void> ``` process for specific plugin's update
  * ``` uninstall(): Promise<void> ``` process for specific plugin's removal (remove created files, etc...)

## Examples

 * package.json sample

```json
{
  "authors": [ "Sébastien VIDAL" ],
  "dependencies": {
    "simpletts": "^1.3.0"
  },
  "designs": [ "design.css"],
  "description": "A test for simpleplugin",
  "javascripts": [ "javascript.js"],
  "license": "ISC",
  "main": "main.js",
  "name": "MyPlugin",
  "version": "0.0.2",
  "templates": [ "template.html" ],
  "core": false,
  "linuxOnly": true
}
```

 * main.js sample

```javascript
"use strict";

class MyPlugin extends require('node-pluginsmanager-plugin') {

    load (data) {

      return super.load().then(() => {

        console.log("your working place");
        console.log("automatically called by \"install\" & \"update\" methods, create virtual ressources like array, sockets, etc...");
        console.log("optional data", data);

        return Promise.resolve();

      });

    }

    unload (data) {

      return super.unload().then(() => {

        console.log("your working place");
        console.log("automatically called by \"uninstall\" & \"update\" methods, close & release virtual ressources like array, sockets, etc...");
        console.log("optional data", data);

        return Promise.resolve();

      });

    }

    install (data) {

      return super.install().then(() => {

        console.log("your working place");
        console.log("create physical ressources like directories, files, etc...");
        console.log("optional data", data);

        return Promise.resolve();

      });

    }

    update (data) {

      return super.update().then(() => {

        console.log("your working place");
        console.log("update your ressources like sql database structure, etc...");
        console.log("optional data", data);

        return Promise.resolve();

      });

    }

    uninstall (data) {

      return super.uninstall().then(() => {

        console.log("your working place");
        console.log("remove all the created ressources like directories, files, etc...");
        console.log("optional data", data);

        return Promise.resolve();

      });

    }

}
```

## Tests

```bash
$ npm run-script tests
```

## License

  [ISC](LICENSE)
