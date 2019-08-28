# Mediator

[<= Main menu](https://github.com/Psychopoulet/node-pluginsmanager-plugin//README.md)

* [Resume](#resume)
* [Class](#class-extends-descriptoruser)
* [Sample](#sample)

## Resume

> It's the most important class, which contains the all plugin's logic.

You will have to add all the methods you need here to pilote the targeted use (API, device, etc...)

## Interfaces

## Class (extends [DescriptorUser](./DescriptorUser.md))

### Attributes

#### protected

nothing

#### public

  * ``` public initialized: boolean ``` mediator status

### Constructor

nothing

### Methods

#### protected

nothing

#### public

nothing

### Events

  * ``` initialized ``` fired when mediator is initialized
  * ``` released ``` fired when mediator is released

## Sample

```javascript
"use strict";

const { get } = require('https');
const { Mediator } = require('node-pluginsmanager-plugin');

class MyPluginMediator extends Mediator {

  constructor (opts) {

    super(opt);

    this._url = "";

  }

  _initWorkSpace () {

    this._url = "https://www.google.fr/search?q=";

    return Promise.resolve();

  }

  _releaseWorkSpace () {

    this._url = "";

    return Promise.resolve();

  }

  _query (search) {

    return new Promise((resolve, reject) => {

      get(this._url + search, (res) => {

          res.setEncoding("utf8");

          let rawData = "";

          res.on("error", (err) => {
            reject(err);
          }).on("data", (chunk) => {
            rawData += chunk;
          }).on("end", () => {
            resolve(rawData);
          });

      });

    });

  }

  page1 () {
    return this._query("page1");
  }

  page2 () {
    return this._query("page2");
  }

}
```