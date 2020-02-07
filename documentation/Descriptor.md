# Descriptor

[<= Architecture](./architecture.md)

* [Resume](#resume)
* [Descriptor interactions](#descriptor-interactions)
  * [Server](#server)
  * [Mediator](#mediator)

## Resume

> This is NOT a js file, but an [OpenAPI](https://swagger.io/specification/) json file.

> It's the most critical stuff, which describe all the plugin's interactions and will be used by all your executives classes

It's loaded and shared by the [Orchestrator](./Orchestrator.md) and used by
* [Mediator](./Mediator.md) to check input data
* [Server](./Server.md) to manage plugin's API paths and find the rigth Mediator's method to call

## Conventions

### info

  * There MUST have an "info" section
  * The "info.title" must be equal to the plugin's name
  * The "info.version" must be equal to the plugin's version

### paths

  * There MUST have an "paths" section
  * You only need this section if you want to create an API for your plugin, but you have to create an empty object if not

## Descriptor interactions

> See [Descriptor sample](./Descriptor.json)

### Server

#### Conventions

> See [Server conventions](./Server.md#conventions)

#### Interactions

> See [Server conventions](./Server.md#descriptor-interactions)

### Mediator

#### Interactions

> See [Server interactions](./Mediator.md#descriptor-interactions)
