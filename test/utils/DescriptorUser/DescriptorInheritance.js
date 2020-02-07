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
			"/node-pluginsmanager-plugin/api/inheritance": {
				"put": {
					"description": "",
					"summary": "Simple API test for Server class",
					"operationId": "testInheritance",
					"requestBody": {
						"description": "test name",
						"content": {
							"application/json": {
								"schema": {
									"$ref": "#/components/schemas/TestCar"
								}
							}
						}
					},
					"responses": {
						"201": {
							"description": "Everything is fine"
						},
						"500": {
							"description": "An error occured"
						}
					}
				}
			}
		},
		"components": {
			"schemas": {
				"TestVehicle": {
					"type": "object",
					"properties": {
						"wheels": {
							"type": "object",
							"properties": {
								"count": {
									"type": "integer",
									"minimum": 1
								}
							},
							"required": [ "count" ]
						}
					},
					"required": [ "wheels" ]
				},
				"TestCar": {
					"type": "object",
					"allOf": [
						{
							"$ref": "#/components/schemas/TestVehicle"
						}, {
							"type": "object",
							"properties": {
								"doors": {
									"type": "object",
									"properties": {
										"count": {
											"type": "integer",
											"minimum": 1,
											"maximum": 5
										}
									},
									"required": [ "count" ]
								},
								"wheels": {
									"type": "object",
									"properties": {
										"count": {
											"type": "integer",
											"minimum": 4,
											"maximum": 4,
											"enum": [ 4 ]
										}
									},
									"required": [ "count" ]
								}
							},
							"required": [ "doors", "wheels" ]
						}
					]
				}
			}
		}
	}
};
