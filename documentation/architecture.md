# Architecture

[<= README](https://github.com/Psychopoulet/node-pluginsmanager-plugin/)

* [Functional](#functional)
* [Inheritence](#inheritence)
* [Classes resume](#classes-resume)
  * [Descriptor](#descriptor)
  * [EventEmitter](#eventemitter)
  * [DescriptorUser](#descriptoruser)
  * [Mediator](#mediator)
  * [MediatorUser](#mediatoruser)
  * [Server](#server)
  * [Orchestrator](#orchestrator)

## Functional

![Functional](./pictures/functional.jpg)

## Inheritence

![Inheritence](./pictures/extends.jpg)

## Classes resume

### Descriptor

[=> See doc](./Descriptor.md)

> This is NOT a js file, but an [OpenAPI](https://swagger.io/specification/) json file.

> It's the most critical stuff, which describe all the plugin's interactions and will be used by all your executives classes

It's loaded and shared by the [Orchestrator](./Orchestrator.md) and used by
* [Mediator](./Mediator.md) to check input data
* [Server](./Server.md) to manage plugin's API paths and find the rigth Mediator's method to call

### EventEmitter

[=> See doc](https://nodejs.org/api/events.html#events_class_eventemitter)

All the childs classes can use there own events, following your needs

### DescriptorUser

[=> See doc](./DescriptorUser.md)

All the childs classes can use the [Descriptor](./Descriptor.md) shared by the [Orchestrator](./Orchestrator.md), and check its validity with the "checkDescriptor" method

More, the class add features like external ressources directory (to create files like local sqlite without impact the plugin's installation) and 4 init/release methods

### Mediator

[=> See doc](./Mediator.md)

> It's the most important class, which contains the all plugin's logic.

You will have to add all the methods you need here to pilote the targeted use (API, device, etc...)

### MediatorUser

[=> See doc](./MediatorUser.md)

All the childs classes can use the [Mediator](./Mediator.md)

### Server

[=> See doc](./Server.md)

Plugin's API.

Expose the [Mediator](./Mediator.md)'s methods with the [Descriptor](./Descriptor.md) rules.

> You doesn't need any developpement in this part if you does not use sockets, everything is automaticly provided by the [Descriptor](./Descriptor.md).

> If you use sockets, you can extends this class and re-write "socketMiddleware" method

### Orchestrator

[=> See doc](./Orchestrator.md)

Check, initialize (and/or release) and execute the other main classes ([Mediator](./Mediator.md) and [Server](./Server.md))
