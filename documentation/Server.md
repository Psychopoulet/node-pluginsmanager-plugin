# Server

[<= Architecture](./architecture.md)

* [Resume](#resume)
* [Class](#class-extends-mediatoruser)
* [Conventions](#conventions)
* [Descriptor interactions](#descriptor-interactions)
* [Sample](#sample)

## Resume

Plugin's API.

Expose the [Mediator](./Mediator.md)'s methods with the [Descriptor](./Descriptor.md) rules.

> You doesn't need any developpement in this part if you does not need "push" data from clients, everything is automaticly provided by the [Descriptor](./Descriptor.md).

> If you does not need "push" data from clients, you can extends this class and re-write "socketMiddleware" method

## Class (extends [MediatorUser](./MediatorUser.md))

### Attributes

#### protected

  * ``` protected _socketServer: WebSocketServer | SocketIOServer | null; ``` middleware for [WebSocket server](https://www.npmjs.com/package/ws) or [SocketIO server](https://www.npmjs.com/package/socket.io)
  * ``` protected _checkParameters: boolean; ``` default true, if true always automaticly check parameters sended with Descriptor

### Methods

#### public

> Please note the fact that "init" and "release" method MUST NOT be re-writted. Each child has is own init logic.

  * ``` disableCheckParameters(): this; ``` disable automatic sended parameters checking with Descriptor
  * ``` enableCheckParameters(): this; ``` enable automatic sended parameters checking with Descriptor
  * ``` public appMiddleware(req: Request, res: Response, next: Function): void; ``` middleware for express (& others) to add routes
  * ``` public socketMiddleware(server: WebSocketServer | SocketIOServer): void; ``` middleware for socket to add bilateral push events, should be re-writted if used
  * ``` public push(command: string, data?: any): this; ``` if socket server setted, push data to all clients

## Conventions

### REST

  * GET => read data
  * PUT => add data
  * POST => edit data
  * DELETE => remove data

### Callable urls

  * Paths must start with plugin name (same as descriptor.info.title)
  * If a path contains path parameter (ex : /plugin/api/users/{user-id}), the parameter MUST be defined in the "parameters" section of this path, with the same name, and a "path" type
  * Path parameters must only use this pattern : "[a-z-]" (ex : {user-id})
  * "/[descriptor.info.title]/descriptor" [GET] : return json [Descriptor](./Descriptor.md) (already and automaticly setted in parent Server, no need for "operationId" data in the [Descriptor](./Descriptor.md) for this path)
  * "/[descriptor.info.title]/api/[path]" : expose API path
  * "/[descriptor.info.title]/public/[path]" : expose plugins files (HTML, CSS, etc...)

### Used HTTP statusCode

  * [200](https://developer.mozilla.org/fr/docs/Web/HTTP/Status/200) (everything is fine with a content)
  * [201](https://developer.mozilla.org/fr/docs/Web/HTTP/Status/201) (everything is fine for PUT request, with or without content)
  * [204](https://developer.mozilla.org/fr/docs/Web/HTTP/Status/204) (everything is fine without content)
  * [400](https://developer.mozilla.org/fr/docs/Web/HTTP/Status/400) (the request does not match with the [Descriptor](./Descriptor.md))
  * [404](https://developer.mozilla.org/fr/docs/Web/HTTP/Status/404) (everything is fine for GET request, without content)
  * [411](https://developer.mozilla.org/fr/docs/Web/HTTP/Status/411) (the request does not have "Content-length" header)
  * [500](https://developer.mozilla.org/fr/docs/Web/HTTP/Status/500) (the [Mediator](./Mediator.md) generate an unknown error)
  * [501](https://developer.mozilla.org/fr/docs/Web/HTTP/Status/501) (there is no "operationId" for this path in the [Descriptor](./Descriptor.md) or the [Mediator](./Mediator.md) does not have the "operationId" method given by the [Descriptor](./Descriptor.md))

### WebSockets

To send a push message to clients, you should follow this formate :
```json
client.send(JSON.stringify({
  "plugin": [descriptor.info.title],
  "command": [executed command] // ex : "created"
});
client.send(JSON.stringify({
  "plugin": [descriptor.info.title],
  "command": [executed command], // ex : "created"
  "data": [data]
});
```

Or us the "push" method
```json
server.push([executed command]);
server.push([executed command], [data]);
```

## Descriptor interactions

> See [Descriptor sample](./Descriptor.json)

### Paths

![Descriptor interaction](./pictures/Server_DescriptorInteraction_1.jpg)

### HTTP usable methods

![Descriptor interaction](./pictures/Server_DescriptorInteraction_2.jpg)

### Mediator method called

![Descriptor interaction](./pictures/Mediator_DescriptorInteraction_1.jpg)

## Sample

```javascript
"use strict";

const { Server } = require('node-pluginsmanager-plugin');

class MyPluginServer extends Server {

  constructor (opt) {

    super(opt);

    this._onConnection = null;

  }

  _releaseWorkSpace () {

    return this._socketServer ? Promise.resolve().then(() => {

      if ("function" === typeof this._onConnection) {

        this._socketServer.removeListener("connection", this._onConnection);
        this._onConnection = null;

      }

    }) : Promise.resolve();

  }

  socketMiddleware (socketServer) {

    super.socketMiddleware(socketServer); // same as "this._socketServer = socketServer;"

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
