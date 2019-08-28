# Architecture

[<= Main menu](https://github.com/Psychopoulet/node-pluginsmanager-plugin/README.md)

## Inheritence

![Inheritence](https://github.com/Psychopoulet/node-pluginsmanager-plugin/documentation/extends.jpg)

## Functional

![Functional](https://github.com/Psychopoulet/node-pluginsmanager-plugin/documentation/functional.jpg)

## Classes resume

### [Descriptor](https://github.com/Psychopoulet/node-pluginsmanager-plugin/documentation/Descriptor.md)

[OpenAPI](https://swagger.io/specification/) json file.

> It's the more critical stuff, which describe all the plugin's interactions and will be used by all your executives classes

It's loaded and shared by the [Orchestrator](https://github.com/Psychopoulet/node-pluginsmanager-plugin/documentation/Orchestrator.md) and used by
* [Mediator](https://github.com/Psychopoulet/node-pluginsmanager-plugin/documentation/Mediator.md) to check input data
* [Server](https://github.com/Psychopoulet/node-pluginsmanager-plugin/documentation/Server.md) to manage plugin's API paths and find the rigth Mediator's method to call

### [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter)

All the following classes can use there own events, following your needs

### [DescriptorUser](https://github.com/Psychopoulet/node-pluginsmanager-plugin/documentation/DescriptorUser.md)

All the following classes can use the [Descriptor](https://github.com/Psychopoulet/node-pluginsmanager-plugin/documentation/Descriptor.md) shared by the [Orchestrator](https://github.com/Psychopoulet/node-pluginsmanager-plugin/documentation/Orchestrator.md), and check its validity with the "checkDescriptor" method

More, the class add features like external ressources directory (to create files like local sqlite without impact the plugin's installation) and 4 init/release methods

### [Mediator](https://github.com/Psychopoulet/node-pluginsmanager-plugin/documentation/Mediator.md)

> It's the most important class, which contains the all plugin's logic.

You will have to add all the methods you need here to pilote the targeted use (API, device, etc...)

### [MediatorUser](https://github.com/Psychopoulet/node-pluginsmanager-plugin/documentation/MediatorUser.md)

All the following classes can use the [Mediator](https://github.com/Psychopoulet/node-pluginsmanager-plugin/documentation/Mediator.md)

### [Server](https://github.com/Psychopoulet/node-pluginsmanager-plugin/documentation/Server.md)

Plugin's API.

Expose the [Mediator](https://github.com/Psychopoulet/node-pluginsmanager-plugin/documentation/Mediator.md)'s methods with the [Descriptor](https://github.com/Psychopoulet/node-pluginsmanager-plugin/documentation/Descriptor.md) rules.

### [Orchestrator](https://github.com/Psychopoulet/node-pluginsmanager-plugin/documentation/Orchestrator.md)

Check, initialize (and/or release) and execute the other main classes ([Mediator](https://github.com/Psychopoulet/node-pluginsmanager-plugin/documentation/Mediator.md) and [Server](https://github.com/Psychopoulet/node-pluginsmanager-plugin/documentation/Server.md))
