# Orchestrator

[<= Main menu](https://github.com/Psychopoulet/node-pluginsmanager-plugin)

* [Resume](#resume)
* [Class](#class-extends-mediatoruser)

## Resume

Check, initialize (and/or release) and execute the other main classes ([Mediator](./Mediator.md) and [Server](./Server.md))

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
