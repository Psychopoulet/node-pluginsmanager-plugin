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
  * multi-files support

## Architecture

![Functional](https://github.com/Psychopoulet/node-pluginsmanager-plugin/raw/master/documentation/pictures/functional.jpg)

[=> See doc](https://github.com/Psychopoulet/node-pluginsmanager-plugin/tree/master/documentation/architecture.md)

### Resume

* [Descriptor](https://github.com/Psychopoulet/node-pluginsmanager-plugin/tree/master/documentation/Descriptor.md) : OpenAPI (v3) description for Server and Mediator endpoints (this is NOT a js file, but a json/xaml/whatever OpenAPI file)
* [Mediator](https://github.com/Psychopoulet/node-pluginsmanager-plugin/tree/master/documentation/Mediator.md) : contains the plugin's logic (communication with targeted device/api/whatever)
* [Server](https://github.com/Psychopoulet/node-pluginsmanager-plugin/tree/master/documentation/Server.md) : expose plugin's roots to external use (API)
* [Orchestrator](https://github.com/Psychopoulet/node-pluginsmanager-plugin/tree/master/documentation/Orchestrator.md) : plugin's data (extracted from plugin's package.json) and Descriptor, Mediator & Server initializer

## Tests

```bash
$ git clone git://github.com/Psychopoulet/node-pluginsmanager-plugin.git
$ cd ./node-pluginsmanager-plugin
$ npm install
$ npm run-script tests
```

## License

  [ISC](LICENSE)
