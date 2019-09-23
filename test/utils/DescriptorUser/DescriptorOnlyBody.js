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
					"requestBody": {
						"content": {
							"application/json": {
								"schema": {
									"$ref": "#/components/schemas/body-param-component"
								}
							}
						}
					}
				}
			},
			"/test/string": {
				"post": {
					"operationId": "testString",
					"requestBody": {
						"content": {
							"application/json": {
								"schema": {
									"type": "object",
									"properties": {
										"body-param-string": {
											"type": "string"
										}
									},
									"required": [ "body-param-string" ]
								}
							}
						}
					}
				}
			},
			"/test/integer": {
				"post": {
					"operationId": "testInteger",
					"requestBody": {
						"content": {
							"application/json": {
								"schema": {
									"type": "object",
									"properties": {
										"body-param-integer": {
											"type": "integer"
										}
									},
									"required": [ "body-param-integer" ]
								}
							}
						}
					}
				}
			},
			"/test/number": {
				"post": {
					"operationId": "testNumber",
					"requestBody": {
						"content": {
							"application/json": {
								"schema": {
									"type": "object",
									"properties": {
										"body-param-number": {
											"type": "number"
										}
									},
									"required": [ "body-param-number" ]
								}
							}
						}
					}
				}
			},
			"/test/boolean": {
				"post": {
					"operationId": "testBoolean",
					"requestBody": {
						"content": {
							"application/json": {
								"schema": {
									"type": "object",
									"properties": {
										"body-param-boolean": {
											"type": "boolean"
										}
									},
									"required": [ "body-param-boolean" ]
								}
							}
						}
					}
				}
			},
			"/test/facultative": {
				"post": {
					"operationId": "testNonRequired",
					"requestBody": {
						"content": {
							"application/json": {
								"schema": {
									"type": "object",
									"properties": {
										"body-param-facultative": {
											"type": "string"
										}
									},
									"required": [ "body-param-facultative" ]
								}
							}
						}
					}
				}
			}
		},
		"components": {
			"schemas": {
				"body-param-component": {
					"type": "object",
					"properties": {
						"body-param-component": {
							"type": "string"
						}
					},
					"required": [ "body-param-component" ]
				}
			}
		}
	}
};
