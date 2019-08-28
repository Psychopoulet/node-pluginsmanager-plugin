# Architecture

[<= Main menu](./README.md)

## Inheritence

![Inheritence](./documentation/extends.jpg)

## Functional

![Functional](./documentation/functional.jpg)

## Classes resume

### [Descriptor](./documentation/Descriptor.md)

[OpenAPI](https://swagger.io/specification/) json file.

> It's the more critical stuff, which describe all the plugin's interactions and will be used by all your executives classes

It's loaded and shared by the [Orchestrator](./documentation/Orchestrator.md) and used by
* [Mediator](./documentation/Mediator.md) to check input data
* [Server](./documentation/Server.md) to manage plugin's API paths and find the rigth Mediator's method to call

### [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter)

All the following classes can use there own events, following your needs

### [DescriptorUser](./documentation/DescriptorUser.md)

All the following classes can use the [Descriptor](./documentation/Descriptor.md) shared by the [Orchestrator](./documentation/Orchestrator.md), and check its validity with the "checkDescriptor" method

More, the class add features like external ressources directory (to create files like local sqlite without impact the plugin's installation) and 4 init/release methods

### [Mediator](./documentation/Mediator.md)

> It's the most important class, which contains the all plugin's logic.

You will have to add all the methods you need here to pilote the targeted use (API, device, etc...)

### [MediatorUser](./documentation/MediatorUser.md)

All the following classes can use the [Mediator](./documentation/Mediator.md)

### [Server](./documentation/Server.md)

Plugin's API.

Expose the [Mediator](./documentation/Mediator.md)'s methods with the [Descriptor](./documentation/Descriptor.md) rules.

### [Orchestrator](./documentation/Orchestrator.md)

Check, initialize (and/or release) and execute the other main classes ([Mediator](./documentation/Mediator.md) and [Server](./documentation/Server.md))
