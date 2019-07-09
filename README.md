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

## Architecture

![Architecture](./documentation/functional.jpg)

## Classes

![Classes](./documentation/extends.jpg)

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
  * ``` appMiddleware(req: Request, res: Response, next: function): void ``` transfert request to Server middleware (if the plugin is initialized)
  * ``` httpMiddleware(req: Request, res: Response): boolean ``` transfert request to Server middleware (if the plugin is initialized)

## Examples

 * package.json sample

```json
{
  "authors": [ "Sébastien VIDAL" ],
  "dependencies": {
    "simpletts": "^1.3.0"
  },
  "description": "A test for node-pluginsmanager-plugin",
  "license": "ISC",
  "main": "main.js",
  "name": "MyPlugin",
  "version": "0.0.2",
  "core": false,
  "linuxOnly": true
}
```

 * Mediator sample

```javascript
"use strict";

const { get } = require('https');
const { Mediator } = require('node-pluginsmanager-plugin');

class MyPluginMediator extends Mediator {

  _query (search) {

    return new Promise((resolve, reject) => {

      get("https://www.google.fr/search?q=" + search, (res) => {

        try {

          res.setEncoding("utf8");

          let rawData = "";

          res.on("error", (err) => {
            reject(err);
          }).on("data", (chunk) => {
            rawData += chunk;
          }).on("end", () => {
            resolve(rawData);
          });

        }
        catch (e) {
          reject(e);
        }

      });

    });

  }

  page1 () {
    return this._query("page1");
  }

  page2 () {
    return this._query("page2");
  }

}
```

 * Server sample

```javascript
"use strict";

const { Server } = require('node-pluginsmanager-plugin');

class MyPluginServer extends Server {

  appMiddleware (req, res, next) {

    switch (req.url) {

      case "/myplugin/page1":

        this.checkMediator().then(() => {
          return this._Mediator.page1();
        }).then((data) => {
          res.status(200).send(data);
        }).catch((err) => {
          res.status(500).send(err.message ? err.message : err);
        });

      break;

      case "/myplugin/page2":

        this.checkMediator().then(() => {
          this._Mediator.page2();
        }).then((data) => {
          res.status(200).send(data);
        }).catch((err) => {
          res.status(500).send(err.message ? err.message : err);
        });

      break;

      default:
        return next();

    }

    return null;

  }

}
```

 * Orchestrator sample

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

}
```

## Tests

```bash
$ npm run-script tests
```

## License

  [ISC](LICENSE)
