# node-pluginsmanager-plugin
An abstract parent plugin for node-pluginsmanager

[![Build status](https://api.travis-ci.org/Psychopoulet/node-pluginsmanager-plugin.svg?branch=master)](https://travis-ci.org/Psychopoulet/node-pluginsmanager-plugin)
[![Coverage status](https://coveralls.io/repos/github/Psychopoulet/node-pluginsmanager-plugin/badge.svg?branch=master)](https://coveralls.io/github/Psychopoulet/node-pluginsmanager-plugin)
[![Dependency status](https://david-dm.org/Psychopoulet/node-pluginsmanager-plugin/status.svg)](https://david-dm.org/Psychopoulet/node-pluginsmanager-plugin)
[![Dev dependency status](https://david-dm.org/Psychopoulet/node-pluginsmanager-plugin/dev-status.svg)](https://david-dm.org/Psychopoulet/node-pluginsmanager-plugin?type=dev)
[![Issues](https://img.shields.io/github/issues/Psychopoulet/node-pluginsmanager-plugin.svg)](https://github.com/Psychopoulet/node-pluginsmanager-plugin/issues)
[![Pull requests](https://img.shields.io/github/issues-pr/Psychopoulet/node-pluginsmanager-plugin.svg)](https://github.com/Psychopoulet/node-pluginsmanager-plugin/pulls)

## Installation

```bash
$ npm install node-pluginsmanager-plugin
```

## Features

  * inheritable parent for node-pluginsmanager's plugins
  * proper architecture for simple plugin creation
  * heritable classes for each usage

## [Architecture](https://github.com/Psychopoulet/node-pluginsmanager-plugin/documentation/architecture.md)

### Resume

* Descriptor : OpenAPI (v3) description for Server and Mediator endpoints (this is NOT a js file, but a json OpenAPI file)
* Mediator : contains the plugin's logic (communication with targeted device/api/whatever)
* Server : expose plugin's roots to external use (API)
* Orchestrator : plugin's data (extracted from plugin's package.json) and Descriptor, Mediator & Server initializer

## Examples

 * package.json sample

```json
{
  "authors": [ "Sébastien VIDAL" ],
  "dependencies": {
    "simpletts": "^1.3.0"
  },
  "description": "A test for node-pluginsmanager-plugin",
  "license": "ISC",
  "main": "main.js",
  "name": "MyPlugin",
  "version": "0.0.2",
  "core": false,
  "linuxOnly": true
}
```

## Tests

```bash
$ git clone git://github.com/Psychopoulet/node-pluginsmanager-plugin.git
$ cd ./node-pluginsmanager-plugin
$ npm install
$ npm run-script tests
```

## License

  [ISC](LICENSE)
