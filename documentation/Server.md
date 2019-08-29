# Server

[<= Main menu](https://github.com/Psychopoulet/node-pluginsmanager-plugin)

* [Resume](#resume)
* [Class](#class-extends-mediatoruser)
* [Descriptor interaction](#descriptor-interaction)
* [Sample](#sample)

## Resume

Plugin's API.

Expose the [Mediator](./Mediator.md)'s methods with the [Descriptor](./Descriptor.md) rules.

> You doesn't need any developpement in this part if you does not use sockets, everything is automaticly provided by the [Descriptor](./Descriptor.md).

> If you use sockets, you can extends this class and re-write "socketMiddleware" method

## Interfaces

nothing

## Class (extends [MediatorUser](./MediatorUser.md))

### Attributes

#### protected

nothing

#### public

nothing

### Constructor

nothing

### Methods

#### protected

> Please note the fact that "_initWorkSpace" and "_releaseWorkSpace" method MUST be re-writted in Mediator class, and not in MediatorUser childs.

nothing

#### public

> Please note the fact that "init" and "release" method MUST NOT be re-writted. Each child has is own init logic.

  * ``` public appMiddleware(req: Request, res: Response, next: Function): void; ``` middleware for express (& others) to add routes
  * ``` public socketMiddleware(server: WebSocketServer): void; ``` middleware for socket to add bilateral push events, should be re-writted if used

### Events

nothing

## Descriptor interaction

> See [Descriptor sample](./Descriptor.json)

  * Callable urls

> Convention : "/[plugin-name]/descriptor" : return descriptor

> Convention : "/[plugin-name]/api/[path]" : expose API path

![Descriptor interaction](./pictures/Server_DescriptorInteraction_1.jpg)

  * HTTP usable methods

![Descriptor interaction](./pictures/Server_DescriptorInteraction_2.jpg)

  * Mediator method called

![Descriptor interaction](./pictures/Mediator_DescriptorInteraction_1.jpg)

## Sample

```javascript
"use strict";

const { Server } = require('node-pluginsmanager-plugin');

class MyPluginServer extends Server {

  constructor (opt) {

    super(opt);

    this._socketServer = null;
    this._onConnection = null;

  }

  _releaseWorkSpace () {

    return this._socketServer ? Promise.resolve().then(() => {

      if ("function" === typeof this._onConnection) {

        this._socketServer.removeListener("connection", this._onConnection);
        this._onConnection = null;

      }

      this._socketServer = null;

    }) : Promise.resolve();

  }

  socketMiddleware (socketServer) {

    this._socketServer = socketServer;
    this._onConnection = (socket) => { // not declared as a method to avoid "this" reference problems

      console.log('connected');

      socket.on('message', function close(payload) {
        console.log('message', payload);
      }).on('close', function close() {
        console.log('disconnected');
      });

    };

    this._socketServer.on("connection", this._onConnection);

  }

}
```
