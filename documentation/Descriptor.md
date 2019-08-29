# Descriptor

[<= Architecture](./architecture.md)

* [Resume](#resume)
* [Descriptor interactions](#descriptor-interactions)
  * [Server](#server)
  * [Mediator](#mediator)

## Resume

> This is NOT a js file, but an [OpenAPI](https://swagger.io/specification/) json file.

> It's the more critical stuff, which describe all the plugin's interactions and will be used by all your executives classes

It's loaded and shared by the [Orchestrator](./Orchestrator.md) and used by
* [Mediator](./Mediator.md) to check input data
* [Server](./Server.md) to manage plugin's API paths and find the rigth Mediator's method to call

## Descriptor interactions

> See [Descriptor sample](./Descriptor.json)

### Server

#### Paths

![Descriptor interaction](./pictures/Server_DescriptorInteraction_1.jpg)

#### HTTP usable methods

![Descriptor interaction](./pictures/Server_DescriptorInteraction_2.jpg)

#### Mediator method called

![Descriptor interaction](./pictures/Mediator_DescriptorInteraction_1.jpg)

### Mediator

#### Method called by the server

![Descriptor interaction](./pictures/Mediator_DescriptorInteraction_1.jpg)

#### First method parameter (url parameters)

![Descriptor interaction](./pictures/Mediator_DescriptorInteraction_2.jpg)

#### Second method parameter (body parameters)

![Descriptor interaction](./pictures/Mediator_DescriptorInteraction_3.jpg)

#### Method return

![Descriptor interaction](./pictures/Mediator_DescriptorInteraction_4.jpg)
