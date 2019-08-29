# Mediator

[<= Architecture](./architecture.md)

* [Resume](#resume)
* [Class](#class-extends-descriptoruser)
* [Descriptor interactions](#descriptor-interactions)
* [Sample](#sample)

## Resume

> It's the most important class, which contains the all plugin's logic.

You will have to add all the methods you need here to pilote the targeted use (API, device, etc...)

## Class (extends [DescriptorUser](./DescriptorUser.md))

### Attributes

#### public

  * ``` public initialized: boolean; ``` mediator status

### Events

  * ``` initialized ``` fired when mediator is initialized
  * ``` released ``` fired when mediator is released

## Descriptor interactions

> See [Descriptor sample](./Descriptor.json)

  * Method called by the server

![Descriptor interaction](./pictures/Mediator_DescriptorInteraction_1.jpg)

  * First method parameter (url parameters)

![Descriptor interaction](./pictures/Mediator_DescriptorInteraction_2.jpg)

  * Second method parameter (body parameters)

![Descriptor interaction](./pictures/Mediator_DescriptorInteraction_3.jpg)

  * Method return

![Descriptor interaction](./pictures/Mediator_DescriptorInteraction_4.jpg)

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

    }).then((content) => {

      return Promise.resolve({
        "search": search,
        "content": content
      });

    });

  }

  page1 () {
    return this._query("page1");
  }

  page2 () {
    return this._query("page2");
  }

  test (urlParameters, bodyParameters) {

    /*
    urlParameters : {
      "url-param": string
    }
    */

    /*
    bodyParameters : {
      "body-param": string
    }
    */

    return this._query(urlParameters["url-param"] + "_" + bodyParameters.["body-param"]);

  }

}
```
