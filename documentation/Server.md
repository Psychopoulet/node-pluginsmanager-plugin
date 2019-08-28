# Server

[<= Main menu](https://github.com/Psychopoulet/node-pluginsmanager-plugin)

* [Resume](#resume)
* [Class](#class-extends-mediatoruser)

## Resume

Plugin's API.

Expose the [Mediator](./Mediator.md)'s methods with the [Descriptor](./Descriptor.md) rules.

## Interfaces

## Class (extends [MediatorUser](./MediatorUser.md))

### Attributes

#### protected

#### public

### Constructor

### Methods

#### protected

> Please note the fact that "_initWorkSpace" and "_releaseWorkSpace" method MUST be re-writted in Mediator class, and not in MediatorUser childs.

#### public

> Please note the fact that "init" and "release" method MUST NOT be re-writted. Each child has is own init logic.

### Events
