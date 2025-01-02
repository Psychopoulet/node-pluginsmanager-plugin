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
						},
                        "required": true
					},
					"responses": {
						"200": {
							"description": "Everything is fine"
						},
						"default": {
							"description": "An error occured",
							"content": {
								"application/json": {
									"schema": {
										"$ref": "#/components/schemas/Error"
									}
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
											"type": "string",
											"minLength": 1,
											"maxLength": 5
										}
									},
									"required": [ "body-param-string" ]
								}
							}
						},
                        "required": true
					},
					"responses": {
						"200": {
							"description": "Everything is fine"
						},
						"default": {
							"description": "An error occured",
							"content": {
								"application/json": {
									"schema": {
										"$ref": "#/components/schemas/Error"
									}
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
											"type": "integer",
											"minimum": 1,
											"maximum": 5
										}
									},
									"required": [ "body-param-integer" ]
								}
							}
						},
                        "required": true
					},
					"responses": {
						"200": {
							"description": "Everything is fine"
						},
						"default": {
							"description": "An error occured",
							"content": {
								"application/json": {
									"schema": {
										"$ref": "#/components/schemas/Error"
									}
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
											"type": "number",
											"minimum": 0.1,
											"maximum": 0.5
										}
									},
									"required": [ "body-param-number" ]
								}
							}
						},
                        "required": true
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
						},
                        "required": true
					},
					"responses": {
						"200": {
							"description": "Everything is fine"
						},
						"default": {
							"description": "An error occured",
							"content": {
								"application/json": {
									"schema": {
										"$ref": "#/components/schemas/Error"
									}
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
											"$ref": "#/components/schemas/Test"
										}
									},
									"required": [ "body-param-facultative" ]
								}
							}
						},
                        "required": true
					},
					"responses": {
						"200": {
							"description": "Everything is fine"
						},
						"default": {
							"description": "An error occured",
							"content": {
								"application/json": {
									"schema": {
										"$ref": "#/components/schemas/Error"
									}
								}
							}
						}
					}
				}
			},
			"/test/object": {
				"post": {
					"operationId": "testObject",
					"requestBody": {
						"content": {
							"application/json": {
								"schema": {
									"type": "object",
									"properties": {
										"body-param-object": {
											"type": "object",
											"properties": {
												"body-param-object-test": {
													"$ref": "#/components/schemas/Test"
												}
											},
											"required": [ "body-param-object-test" ]
										}
									},
									"required": [ "body-param-object" ]
								}
							}
						},
                        "required": true
					},
					"responses": {
						"200": {
							"description": "Everything is fine"
						},
						"default": {
							"description": "An error occured",
							"content": {
								"application/json": {
									"schema": {
										"$ref": "#/components/schemas/Error"
									}
								}
							}
						}
					}
				}
			},
			"/test/array": {
				"post": {
					"operationId": "testArray",
					"requestBody": {
						"content": {
							"application/json": {
								"schema": {
									"type": "object",
									"properties": {
										"body-param-array": {
											"type": "array",
											"items": {
												"$ref": "#/components/schemas/Test"
											},
											"minItems": 1,
											"maxItems": 5
										}
									},
									"required": [ "body-param-array" ]
								}
							}
						},
                        "required": true
					},
					"responses": {
						"200": {
							"description": "Everything is fine"
						},
						"default": {
							"description": "An error occured",
							"content": {
								"application/json": {
									"schema": {
										"$ref": "#/components/schemas/Error"
									}
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
				},
				"Test": {
					"type": "string"
				}
			}
		}
	}
};
