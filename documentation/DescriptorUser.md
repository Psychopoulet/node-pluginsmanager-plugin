# DescriptorUser

[<= Architecture](./architecture.md)

* [Resume](#resume)
* [Interfaces](#interfaces)
* [Class](#class-extends-eventemitter)

## Resume

All the childs classes can use the [Descriptor](./Descriptor.md) shared by the [Orchestrator](./Orchestrator.md), and check its validity with the "checkDescriptor" method

More, the class add features like external ressources directory (to create files like local sqlite without impact the plugin's installation) and 4 init/release methods

## Interfaces

```typescript
type tLogType = "log" | "info" | "warning" | "error";

interface iDescriptorUserOptions {
  "descriptor": object | null;
  "externalRessourcesDirectory": string; // used to write local data like sqlite database, json files, pictures, etc...
  "logger": Function | null;
}
```

## Class (extends [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter))

### Attributes

#### protected

  * ``` protected _externalRessourcesDirectory: string; ``` provided by "externalRessourcesDirectory" option, sent by the [Orchestrator](./Orchestrator.md)
  * ``` protected _descriptorValidated: boolean; ``` if checkDescriptor is already successfuly executed, do not execute it again (for performances)
  * ``` protected _Descriptor: object | null; ``` provided by "descriptor" option, sent by the [Orchestrator](./Orchestrator.md)
  * ``` protected _Logger: Function | null; ``` provided by "logger" option, sent by the [Orchestrator](./Orchestrator.md)

### Constructor

  * ``` constructor(options: iDescriptorUserOptions); ```

### Methods

#### protected

> Please note the fact that "_initWorkSpace" and "_releaseWorkSpace" method MUST be re-writted in Mediator class, and not in MediatorUser childs.

  * ``` protected _initWorkSpace(data?: any): Promise<void>; ``` Used to avoid full init logic re-writting.
  * ``` protected _releaseWorkSpace(data?: any): Promise<void>; ``` Used to avoid full release logic re-writting.
  * ``` protected _log(type: tLogType, message: string, bold?: boolean): this; ``` Use "logger" function if provided, do nothing if not

#### public

> Please note the fact that "init" and "release" method MUST NOT be re-writted. Each child has is own init logic.

  * ``` public init(data?: any): Promise<void>; ``` // returned data : defined by "_initWorkSpace" return
  * ``` public release(data?: any): Promise<void>; ``` // returned data : defined by "_releaseWorkSpace" return
  * ``` public checkDescriptor(void): Promise<void>; ``` check Descriptor (type and content)
