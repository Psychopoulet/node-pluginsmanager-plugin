# Orchestrator

[<= Architecture](./architecture.md)

* [Resume](#resume)
* [Interfaces](#interfaces)
* [Class](#class-extends-mediatoruser)
* [Sample](#sample)

## Resume

Check, initialize (and/or release) and execute the other main classes ([Mediator](./Mediator.md) and [Server](./Server.md))

> "there is a major difference between "load" & "init" methods : "load" just load data from package file (and will always be executed), "init" create Mediator & Server instance and run the plugin (only if declared as enabled)

> "there is a major difference between "release" & "destroy" methods : "release" stop the plugin and destroy the Mediator and the Server instances but keep package data, "destroy" release the data (used when uninstall, update, etc...)

## Interfaces

```typescript
interface iOrchestratorOptions {
  "externalRessourcesDirectory": string; // used to write local data like sqlite database, json files, pictures, etc...
  "packageFile": string; // package file used by the plugin (absolute path)
  "descriptorFile": string; // descriptor file used by the plugin (absolute path)
  "mediatorFile": string; // mediator file used by the plugin (absolute path)
  "serverFile": string; // server file used by the plugin (absolute path)
}
```

## Class (extends [MediatorUser](./MediatorUser.md))

### Attributes

#### protected

  * ``` protected _socketServer: boolean; ``` to delay socketMiddleware when Orchestrator is not initialized
  * ``` protected _checkParameters: boolean; ``` to delay checkParameters when Orchestrator is not initialized
  * ``` protected _Server: Server | null; ``` Server used by the class
  * ``` protected _packageFile: string; ``` package.json file used by the plugin (absolute path) (see iOrchestratorOptions)
  * ``` protected _descriptorFile: string; ``` Descriptor file used by the plugin (absolute path) (see iOrchestratorOptions)
  * ``` protected _mediatorFile: string; ``` Mediator file used by the plugin (absolute path) (see iOrchestratorOptions)
  * ``` protected _serverFile: string; ``` Server file used by the plugin (absolute path) (see iOrchestratorOptions)
  * ``` protected _extended: Array<string>; ``` non-managed data's names, extracted from package file, used to properly destroy plugin if necessary

#### public

  * ``` enabled: boolean; ``` is plugin enable ? default=true (you should define it by re-write "isEnable" method)

  * ``` authors: Array<string>; ```
  * ``` description: string; ```
  * ``` dependencies: object | null; ```
  * ``` devDependencies: object | null; ```
  * ``` engines: object | null; ```
  * ``` license: string; ```
  * ``` main: string; ```
  * ``` name: string; ```
  * ``` scripts: object | null; ```
  * ``` version: string; ```

### Constructor

  * ``` constructor(options: iOrchestratorOptions); ```

### Methods

#### public

> Please note the fact that "init" and "release" method MUST NOT be re-writted. Each child has is own init logic.

> "appMiddleware" and "socketMiddleware" send data to [Server](./Server.md) class

    --- checkers ---

  * ``` checkConf(void): Promise<void>; ``` check plugin's conf (optional, can be re-writted if a specific conf is used)
  * ``` isEnable(void): Promise<void>; ``` used to define plugin execution (optional, can be re-writted with a local plugins manager) (WARNING : it's an asynchronous setter, not a getter)
  * ``` checkFiles(void): Promise<void>; ``` check files existance
  * ``` checkServer(void): Promise<void>; ``` check server

    --- middlewares ---

  * ``` disableCheckParameters(): this; ``` execute [Server](./Server.md) disableCheckParameters
  * ``` enableCheckParameters(): this; ``` execute [Server](./Server.md) enableCheckParameters
  * ``` disableCors(): this; ``` block CORS requests
  * ``` enableCors(): this; ``` allow CORS requests
  * ``` appMiddleware(req: Request, res: Response, next: function): void; ``` transfert request to [Server](./Server.md) middleware
  * ``` socketMiddleware(server: WebSocketServer | SocketIOServer): void; ``` transfert to [Server](./Server.md) middleware

    --- load / destroy ---

  * ``` load(void): Promise<void>; ``` load all data from package file, dynamically add new attributes
  * ``` destroy(void): Promise<void>; ``` reset attributes (release does not do that)

    --- write ---

  * ``` install(data?: any): Promise<void>; ``` used after plugin installation (create ressources). can be re-writted.
  * ``` update(data?: any): Promise<void>; ``` used after plugin update. can be re-writted.
  * ``` uninstall(data?: any): Promise<void>; ``` used before plugin uninstall (remove ressources). can be re-writted.

## Sample

### package.json

```json
{
  "authors": [ "Sébastien VIDAL" ],
  "dependencies": {
    "simpletts": "~1.3.0"
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

### Orchestrator

```javascript
"use strict";

const { join } = require('path');
const { homedir } = require('os');
const { Orchestrator } = require('node-pluginsmanager-plugin');

class MyPluginOrchestrator extends Orchestrator {

    constructor (options) {

      super({
        "externalRessourcesDirectory": join(homedir(), "MyPluginOrchestrator"),
        "packageFile": join(__dirname, "package.json"),
        "descriptorFile": join(__dirname, "Descriptor.json"),
        "mediatorFile": join(__dirname, "Mediator.js"),
        "serverFile": join(__dirname, "Server.js")
      });

    }

}
```
