# DescriptorUser (extends [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter))

[<= Architecture](./architecture.md)

* [Resume](#resume)
* [Interfaces](#interfaces)
* [Class](#class-extends-eventemitter)

## Resume

All the childs classes can use the [Descriptor](./Descriptor.md) shared by the [Orchestrator](./Orchestrator.md), and check its validity with the "checkDescriptor" method

More, the class add features like external ressources directory (to create files like local sqlite without impact the plugin's installation) and 4 init/release methods

## Code

> Please note the fact that "_initWorkSpace" and "_releaseWorkSpace" method MUST be re-writted in Mediator class, and not in MediatorUser childs.

> Please note the fact that "init" and "release" method MUST NOT be re-writted. Each child has is own init logic.

[check the TypeScript definition file](../lib/index.d.ts)

### Events

  * ``` initialized [, data?: any ] ``` fired when mediator is initialized
  * ``` released [, data?: any ] ``` fired when mediator is released
