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
			"/test/component": {
				"get": {
					"operationId": "testComponents",
					"parameters": [
						{
							"$ref": "#/components/parameters/path-param-component"
						}
					],
					"responses": {
						"200": {
							"description": "Everything is fine"
						},
						"default": {
							"description": "An error occured"
						}
					}
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
								"type": "string",
								"minLength": 1,
								"maxLength": 5
							}
						}
					],
					"responses": {
						"200": {
							"description": "Everything is fine"
						},
						"default": {
							"description": "An error occured"
						}
					}
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
								"type": "integer",
								"minimum": 1,
								"maximum": 5
							}
						}
					],
					"responses": {
						"200": {
							"description": "Everything is fine"
						},
						"default": {
							"description": "An error occured"
						}
					}
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
								"type": "number",
								"minimum": 1.1,
								"maximum": 1.5
							}
						}
					],
					"responses": {
						"200": {
							"description": "Everything is fine"
						},
						"default": {
							"description": "An error occured"
						}
					}
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
					],
					"responses": {
						"200": {
							"description": "Everything is fine"
						},
						"default": {
							"description": "An error occured"
						}
					}
				}
			},
			"/test/facultative": {
				"get": {
					"operationId": "testNonRequired",
					"parameters": [
						{
							"name": "path-param-facultative",
							"in": "query",
							"required": false,
							"schema": {
								"type": "string"
							}
						}
					],
					"responses": {
						"200": {
							"description": "Everything is fine"
						},
						"default": {
							"description": "An error occured"
						}
					}
				}
			},
			"/test/enum": {
				"get": {
					"operationId": "testEnum",
					"parameters": [
						{
							"name": "path-param-enum",
							"in": "path",
							"required": true,
							"schema": {
								"type": "string",
								"enum": [ "test1", "test2" ]
							}
						}
					],
					"responses": {
						"200": {
							"description": "Everything is fine"
						},
						"default": {
							"description": "An error occured"
						}
					}
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
