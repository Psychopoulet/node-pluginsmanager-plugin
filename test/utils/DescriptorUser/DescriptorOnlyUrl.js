"use strict";

// deps

	// natives
	const { join } = require("path");

// consts

	const DESCRIPTOR_BASIC = require(join(__dirname, "DescriptorBasic.js"));

// module

module.exports = {
	...DESCRIPTOR_BASIC,
	...{
		"paths": {
			"/test/{path-param}": {
				"post": {
					"operationId": "create",
					"parameters": [
						{
							"name": "path-param",
							"in": "path",
							"required": true,
							"schema": {
								"type": "string"
							}
						}
					]
				}
			}
		}
	}
};
