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

  * inheritable parent for node-pluginsmanager's plugins
  * proper architecture for simple plugin creation
  * heritable classes for each usage

## Classes

[Classes](./documentation/extends.jpg)

  * [EventEmitter](#events)
  * [Bootable](#bootable)
  * [Mediator](#mediator)
  * [MediatorUser](#mediatoruser)
  * [Server](#server)
  * [Orchestrator](#orchestrator)

## Architecture

[Architecture](./documentation/functional.jpg)

## Doc

### Bootable (extends EventEmitter)

  -- Methods --

  * ``` init(data?: any): Promise<void> ``` method used in EACH child. must be re-writted.
  * ``` release(data?: any): Promise<void> ``` method used in EACH child. can be re-writted, but don't forget to call removeAllListeners.

### Mediator (extends Bootable)

  -- Events --

  * ``` initialized ``` fired when mediator is initialized

  -- Attributes --

  * ``` initialized: boolean ```

  -- Methods --

  * ``` _fireInitialized(void): Promise<void> ``` set "initialized" to true and fire "initialized" event
  * ``` checkConf(void): Promise<void> ``` used to check plugin's configuration. should be re-writted.

### MediatorUserOptions (extends object)

  * ``` mediator: Mediator ``` mediator used by the class

### MediatorUser (extends Bootable)

  -- Constructor --

  * ``` constructor(options: MediatorUserOptions) ```

  -- Attributes --

  * ``` _Mediator: Mediator | null ```

  -- Methods --

  * ``` checkMediator(void): Promise<void> ``` check mediator, ensure inheritance & "initialized" status

### Server (extends MediatorUser)

  -- Methods --

  * ``` appMiddleware(req: Request, res: Response, next: function): void ``` middleware for express & others to add routes, should be re-writted
  * ``` httpMiddleware(req: Request, res: Response): boolean ``` middleware for native http[s] server to add routes, should be re-writted

### OrchestratorOptions (extends MediatorUserOptions)

  * ``` packageFile: string ``` package file used by the plugin (absolute path)
  * ``` mediatorFile: string ``` mediator file used by the plugin (absolute path)
  * ``` serverFile: string ``` server file used by the plugin (absolute path)

### Orchestrator (extends MediatorUser)

  -- Constructor --

  * ``` constructor(options: OrchestratorOptions) ```

  -- Attributes --

  * ``` _Server: Server | null ```
  * ``` _packageFile: string ```
  * ``` _mediatorFile: string ```
  * ``` _serverFile: string ```
  * ``` authors: Array<string> ```
  * ``` description: string ```
  * ``` dependencies: object | null ```
  * ``` devDependencies: object | null ```
  * ``` engines: object | null ```
  * ``` license: string ```
  * ``` main: string ```
  * ``` name: string ```
  * ``` scripts: object ```
  * ``` version: string ```

  -- Methods --

  * ``` checkFiles(void): Promise<void> ``` check files existance
  * ``` checkServer(void): Promise<void> ``` check server, ensure inheritance
  * ``` loadDataFromPackageFile(void): Promise<void> ``` load all data from package file, dynamically add new attributes
  * ``` destroy(void): Promise<void> ``` reset standards attributes (release does not do that)
  * ``` install(data?: any): Promise<void> ``` used after plugin installation (create ressources). should be re-writted.
  * ``` update(data?: any): Promise<void> ``` used after plugin update. should be re-writted.
  * ``` uninstall(data?: any): Promise<void> ``` used before plugin uninstall (remove ressources). should be re-writted.

## Examples

 * package.json sample

```json
{
  "authors": [ "Sébastien VIDAL" ],
  "dependencies": {
    "simpletts": "^1.3.0"
  },
  "description": "A test for simpleplugin",
  "license": "ISC",
  "main": "main.js",
  "name": "MyPlugin",
  "version": "0.0.2",
  "core": false,
  "linuxOnly": true
}
```

 * main.js sample

```javascript
"use strict";

const { join } = require('path');
const { Orchestrator } = require('node-pluginsmanager-plugin');

class MyPluginOrchestrator extends Orchestrator {

    constructor (options) {

      super({
        "packageFile": join(__dirname, "package.json"),
        "mediatorFile": join(__dirname, "Mediator.js"),
        "serverFile": join(__dirname, "Server.js")
      });

    }

    init (data) {

      return super.init().then(() => {

        console.log("your working place");
        console.log("automatically called by \"install\" & \"update\" methods, create virtual ressources like array, sockets, etc...");
        console.log("optional data", data);

        return Promise.resolve();

      });

    }

    release (data) {

      return super.release().then(() => {

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
