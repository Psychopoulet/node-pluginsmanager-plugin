# MediatorUser

[<= Main menu](https://github.com/Psychopoulet/node-pluginsmanager-plugin)

* [Resume](#resume)
* [Class](#class-extends-descriptoruser)

## Resume

All the childs classes can use the [Mediator](./Mediator.md)

## Interfaces

> See [iDescriptorUserOptions](./DescriptorUser.md#interfaces)

```typescript
interface iMediatorUserOptions extends iDescriptorUserOptions {
	"mediator": Mediator | null;
}
```

## Class (extends [DescriptorUser](./DescriptorUser.md))

### Attributes

#### protected

  * ``` protected _Mediator: Mediator | null; ``` provided by "mediator" option, sent by the [Orchestrator](./Orchestrator.md)

### Constructor

  * ``` constructor(options: iMediatorUserOptions); ```

### Methods

#### public

> Please note the fact that "init" and "release" method MUST NOT be re-writted. Each child has is own init logic.

  * ``` public checkMediator(void): Promise<void> ``` check Descriptor (type and content)
