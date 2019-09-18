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
			},
			"/test/component": {
				"get": {
					"operationId": "testComponents",
					"parameters": [
						{
							"$ref": "#/components/parameters/path-param-component"
						}
					]
				}
			},
			"/test/{path-param-string}": {
				"get": {
					"operationId": "testString",
					"parameters": [
						{
							"name": "path-param-string",
							"in": "path",
							"required": true,
							"schema": {
								"type": "string"
							}
						}
					]
				}
			},
			"/test/{path-param-integer}": {
				"get": {
					"operationId": "testInteger",
					"parameters": [
						{
							"name": "path-param-integer",
							"in": "path",
							"required": true,
							"schema": {
								"type": "integer"
							}
						}
					]
				}
			},
			"/test/{path-param-number}": {
				"get": {
					"operationId": "testNumber",
					"parameters": [
						{
							"name": "path-param-number",
							"in": "path",
							"required": true,
							"schema": {
								"type": "number"
							}
						}
					]
				}
			},
			"/test/{path-param-float}": {
				"get": {
					"operationId": "testFloat",
					"parameters": [
						{
							"name": "path-param-float",
							"in": "path",
							"required": true,
							"schema": {
								"type": "float"
							}
						}
					]
				}
			},
			"/test/{path-param-boolean}": {
				"get": {
					"operationId": "testBoolean",
					"parameters": [
						{
							"name": "path-param-boolean",
							"in": "path",
							"required": true,
							"schema": {
								"type": "boolean"
							}
						}
					]
				}
			}
		},
		"components": {
			"parameters": {
				"path-param-component": {
					"name": "path-param-component",
					"in": "query",
					"required": true,
					"schema": {
						"type": "string"
					}
				}
			}
		}
	}
};
