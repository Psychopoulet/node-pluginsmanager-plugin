# DescriptorUser

[<= Main menu](https://github.com/Psychopoulet/node-pluginsmanager-plugin/README.md)

* [Resume](#resume)
* [Class](#class-extends-eventemitter)

## Resume

All the childs classes can use the [Descriptor](./Descriptor.md) shared by the [Orchestrator](./Orchestrator.md), and check its validity with the "checkDescriptor" method

More, the class add features like external ressources directory (to create files like local sqlite without impact the plugin's installation) and 4 init/release methods

## Interfaces

```typescript
interface iDescriptorUserOptions {
  "descriptor": object;
  "externalRessourcesDirectory": string; // used to write local data like sqlite database, json files, pictures, etc...
}
```

## Class (extends [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter))

> Please note the fact that, in this version, init and release methods of each classes should not be re-writted anymore...

### Attributes

#### protected

  * ``` protected _Descriptor: object | null ``` provided by "descriptor" option, sent by the [Orchestrator](./Orchestrator.md)
  * ``` protected _externalRessourcesDirectory: string ``` provided by "externalRessourcesDirectory" option, sent by the [Orchestrator](./Orchestrator.md)

#### public

nothing

### Constructor

  * ``` constructor(options: iDescriptorUserOptions) ```

### Methods

#### protected

  * ``` protected _initWorkSpace(data?: any): Promise<void>; ``` MUST be re-writted (optional in Orchestrator childs). Used to avoid full init logic re-writting.
  * ``` protected _releaseWorkSpace(data?: any): Promise<void>; ``` MUST be re-writted (optional in Orchestrator childs). Used to avoid full release logic re-writting.

#### public

  * ``` public init(data?: any): Promise<void> ``` should NOT be re-writted. Each child has is own init logic.
  * ``` public release(data?: any): Promise<void> ``` should NOT be re-writted. Each child has is own release logic.
  * ``` public checkDescriptor(void): Promise<void> ``` check Descriptor (type and content)

### Events

nothing
