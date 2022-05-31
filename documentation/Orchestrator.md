# Orchestrator (extends [MediatorUser](./MediatorUser.md))

[<= Architecture](./architecture.md)

* [Resume](#resume)
* [Interfaces](#interfaces)
* [Class](#class-extends-mediatoruser)
* [Sample](#sample)

## Resume

Check, initialize (and/or release) and execute the other main classes ([Mediator](./Mediator.md) and [Server](./Server.md))

> "there is a major difference between "load" & "init" methods : "load" just load data from package file (and will always be executed), "init" create Mediator & Server instance and run the plugin (only if declared as enabled)

> "there is a major difference between "release" & "destroy" methods : "release" stop the plugin and destroy the Mediator and the Server instances but keep package data, "destroy" release the data (used when uninstall, update, etc...)

## Code

> Please note the fact that "init" and "release" method MUST NOT be re-writted. Each child has is own init logic.

> "appMiddleware" and "socketMiddleware" send data to [Server](./Server.md) class

[check the TypeScript definition file](../lib/index.d.ts)

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
