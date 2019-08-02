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

## Interfaces


### iServerOptions

```typescript
interface iServerOptions {
  "mediator": Mediator; // mediator used by the class
}
```

### iOrchestratorOptions

```typescript
interface iOrchestratorOptions {
  "packageFile": string; // package file used by the plugin (absolute path)
  "mediatorFile": string; // mediator file used by the plugin (absolute path)
  "serverFile": string; // server file used by the plugin (absolute path)
}
```

## Classes

![Classes](./documentation/extends.jpg)

> Please note the fact that, in this version, init & release methods of each classes should not be re-writted anymore...

### Bootable (extends EventEmitter)

  -- Methods --

    --- protected ---

  * ``` protected _initWorkSpace(data?: any): Promise<void>; ``` MUST be re-writted (except in Orchestrator childs). Used to avoid full init logic re-writting.
  * ``` protected _releaseWorkSpace(data?: any): Promise<void>; ``` MUST be re-writted (except in Orchestrator childs). Used to avoid full release logic re-writting.

    --- public ---

  * ``` init(data?: any): Promise<void> ``` should NOT be re-writted. Each child has is own init logic.
  * ``` release(data?: any): Promise<void> ``` should NOT be re-writted. Each child has is own release logic.

### Mediator (extends Bootable)

  -- Events --

  * ``` initialized ``` fired when mediator is initialized
  * ``` released ``` fired when mediator is released

  -- Attributes --

  * ``` initialized: boolean ``` mediator status

### MediatorUser (extends Bootable)

  -- Attributes --

  * ``` _Mediator: Mediator | null ```

  -- Methods --

  * ``` checkMediator(void): Promise<void> ``` check mediator

### Server (extends MediatorUser)

  -- Constructor --

  * ``` constructor(options: iServerOptions) ```

  -- Methods --

  * ``` appMiddleware(req: Request, res: Response, next: function): void ``` middleware for express & others to add routes, should be re-writted
  * ``` httpMiddleware(req: Request, res: Response): boolean ``` middleware for native http[s] server to add routes, should be re-writted
  * ``` socketMiddleware(server: WebSocketServer): void ``` middleware for socket to add bilateral push events, should be re-writted if used

### Orchestrator (extends MediatorUser)

> "there is a major difference between "load" & "init" methods : "load" just load data from package file (and will always be executed), "init" create Mediator & Server instance and run the plugin (only if declared as enabled)
> "there is a major difference between "release" & "destroy" methods : "release" stop the plugin and destroy the Mediator and the Server instances but keep package data, "destroy" release the data (used when uninstall, update, etc...)
> you don't have to inherit "_initWorkSpace" & "_releaseWorkSpace" methods in Orchestrator childs

  -- Constructor --

  * ``` constructor(options: iOrchestratorOptions) ```

  -- Attributes --

    --- protected ---

  * ``` _Server: Server | null ``` server used by the class

  * ``` _packageFile: string ``` package file used by the plugin (absolute path) (see OrchestratorOptions)
  * ``` _mediatorFile: string ``` mediator file used by the plugin (absolute path) (see OrchestratorOptions)
  * ``` _serverFile: string ``` server file used by the plugin (absolute path) (see OrchestratorOptions)

  * ``` _extended: Array<string> ``` non-managed data's names, extracted from package file, used to properly destroy plugin if necessary

    --- public ---

  * ``` enabled: boolean ``` is plugin enable ? default=true (you should define it by re-write "isEnable" method)
  * ``` initialized: boolean ``` is plugin initialized ?

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

    --- checkers ---

  * ``` checkConf(void): Promise<void> ``` check plugin's conf (optional, should be re-writted if a specific conf is used)
  * ``` isEnable(void): Promise<void> ``` used to define plugin execution
  * ``` checkFiles(void): Promise<void> ``` check files existance
  * ``` checkServer(void): Promise<void> ``` check server
  * ``` checkServerSync(void): boolean ``` check server in a synchronous way

    --- middlewares ---

  * ``` appMiddleware(req: Request, res: Response, next: function): void ``` transfert to Server middleware
  * ``` httpMiddleware(req: Request, res: Response): boolean ``` transfert to Server middleware
  * ``` socketMiddleware(server: WebSocketServer): void ``` transfert to Server middleware

    --- load / destroy ---

  * ``` load(void): Promise<void> ``` load all data from package file, dynamically add new attributes
  * ``` destroy(void): Promise<void> ``` reset attributes (release does not do that)

    --- write ---

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

  _initWorkSpace () {
    return Promise.resolve();
  }

  _releaseWorkSpace () {
    return Promise.resolve();
  }

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

  _initWorkSpace () {
    return Promise.resolve();
  }

  _releaseWorkSpace () {
    return Promise.resolve();
  }

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
$ git clone git://github.com/Psychopoulet/node-pluginsmanager-plugin.git
$ cd ./node-pluginsmanager-plugin
$ npm install
$ npm run-script tests
```

## License

  [ISC](LICENSE)
