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
			"/test": {
				"post": {
					"operationId": "create",
					"requestBody": {
						"content": {
							"application/json": {
								"schema": {
									"type": "object",
									"properties": {
										"body-param": {
											"type": "string"
										}
									},
									"required": [ "body-param" ]
								}
							}
						}
					}
				}
			}
		}
	}
};
