# node-pluginsmanager-plugin
An abstract parent plugin for node-pluginsmanager

[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=Psychopoulet_node-pluginsmanager-plugin&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=Psychopoulet_node-pluginsmanager-plugin)
[![Issues](https://img.shields.io/github/issues/Psychopoulet/node-pluginsmanager-plugin.svg)](https://github.com/Psychopoulet/node-pluginsmanager-plugin/issues)
[![Pull requests](https://img.shields.io/github/issues-pr/Psychopoulet/node-pluginsmanager-plugin.svg)](https://github.com/Psychopoulet/node-pluginsmanager-plugin/pulls)

[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=Psychopoulet_node-pluginsmanager-plugin&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=Psychopoulet_node-pluginsmanager-plugin)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=Psychopoulet_node-pluginsmanager-plugin&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=Psychopoulet_node-pluginsmanager-plugin)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=Psychopoulet_node-pluginsmanager-plugin&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=Psychopoulet_node-pluginsmanager-plugin)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=Psychopoulet_node-pluginsmanager-plugin&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=Psychopoulet_node-pluginsmanager-plugin)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=Psychopoulet_node-pluginsmanager-plugin&metric=bugs)](https://sonarcloud.io/summary/new_code?id=Psychopoulet_node-pluginsmanager-plugin)

[![Known Vulnerabilities](https://snyk.io/test/github/Psychopoulet/node-pluginsmanager-plugin/badge.svg)](https://snyk.io/test/github/Psychopoulet/node-pluginsmanager-plugin)

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
