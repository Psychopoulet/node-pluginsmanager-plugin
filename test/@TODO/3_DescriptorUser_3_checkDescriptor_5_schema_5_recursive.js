"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");

	// locals

		// plugin
		const checkSchema = require(join(
			__dirname, "..", "lib", "utils", "checkDescriptor",
			"schemas", "checkSchema.js"
		));

// tests

describe("DescriptorUser / checkDescriptor / checkSchema / recursive", () => {

	describe("missing data for object", () => {

		it("should test missing properties", () => {

			const err = checkSchema("/test", "get", "parameters", "body-param.test", {
				"type": "object"
			});

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

		});

		it("should test wrong type properties", () => {

			const err = checkSchema("/test", "get", "parameters", "body-param.test", {
				"type": "object",
				"properties": false
			});

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

		});

		it("should test empty properties", () => {

			const err = checkSchema("/test", "get", "parameters", "body-param.test", {
				"type": "object",
				"properties": {}
			});

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

		});

		it("should test wrong type data", () => {

			const err = checkSchema("/test", "get", "parameters", "body-param.test", {
				"type": "object",
				"properties": {
					"test": false
				}
			});

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

		});

		it("should test empty data", () => {

			const err = checkSchema("/test", "get", "parameters", "body-param.test", {
				"type": "object",
				"properties": {
					"test": {}
				}
			});

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

		});

		it("should test wrong type data", () => {

			const err = checkSchema("/test", "get", "parameters", "body-param.test", {
				"type": "object",
				"properties": {
					"test": {
						"type": false
					}
				}
			});

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

		});

		it("should test param full valid object data", () => {

			const err = checkSchema("/test", "get", "parameters", "body-param.test", {
				"type": "object",
				"properties": {
					"test": {
						"type": "string"
					}
				}
			});

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err, null, "Generated error is not as expected");

		});

		describe("recursivity lvl2", () => {

			it("should test missing properties", () => {

				const err = checkSchema("/test", "get", "parameters", "body-param.lvl1.lvl2", {
					"type": "object",
					"properties": {
						"lvl1": {
							"type": "object"
						}
					}
				});

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

			});

			it("should test wrong type properties", () => {

				const err = checkSchema("/test", "get", "parameters", "body-param.lvl1.lvl2", {
					"type": "object",
					"properties": {
						"lvl1": {
							"type": "object",
							"properties": false
						}
					}
				});

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

			});

			it("should test empty properties", () => {

				const err = checkSchema("/test", "get", "parameters", "body-param.lvl1.lvl2", {
					"type": "object",
					"properties": {
						"lvl1": {
							"type": "object",
							"properties": {}
						}
					}
				});

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

			});

			it("should test wrong type data", () => {

				const err = checkSchema("/test", "get", "parameters", "body-param.lvl1.lvl2", {
					"type": "object",
					"properties": {
						"lvl1": {
							"type": "object",
							"properties": {
								"lvl2": false
							}
						}
					}
				});

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

			});

			it("should test empty data", () => {

				const err = checkSchema("/test", "get", "parameters", "body-param.lvl1.lvl2", {
					"type": "object",
					"properties": {
						"lvl1": {
							"type": "object",
							"properties": {
								"lvl2": {}
							}
						}
					}
				});

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

			});

			it("should test wrong type data", () => {

				const err = checkSchema("/test", "get", "parameters", "body-param.lvl1.lvl2", {
					"type": "object",
					"properties": {
						"lvl1": {
							"type": "object",
							"properties": {
								"lvl2": {
									"type": false
								}
							}
						}
					}
				});

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

			});

			it("should test param full valid object data", () => {

				const err = checkSchema("/test", "get", "parameters", "body-param.lvl1.lvl2", {
					"type": "object",
					"properties": {
						"lvl1": {
							"type": "object",
							"properties": {
								"lvl2": {
									"type": "string"
								}
							}
						}
					}
				});

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err, null, "Generated error is not as expected");

			});

		});

	});

	describe("missing data for array", () => {

		it("should test missing properties", () => {

			const err = checkSchema("/test", "get", "parameters", "body-param", {
				"body-param": {
					"schema": {
						"type": "array"
					}
				}
			});

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

		});

		it("should test wrong type items", () => {

			const err = checkSchema("/test", "get", "parameters", "body-param", {
				"type": "array",
				"items": false
			});

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

		});

		it("should test empty items", () => {

			const err = checkSchema("/test", "get", "parameters", "body-param", {
				"type": "array",
				"items": {}
			});

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

		});

		it("should test wrong type recursive data", () => {

			const err = checkSchema("/test", "get", "parameters", "body-param", {
				"type": "array",
				"items": {
					"type": false
				}
			});

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

		});

		it("should test empty recursive data", () => {

			const err = checkSchema("/test", "get", "parameters", "body-param", {
				"type": "array",
				"items": {
					"type": ""
				}
			});

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

		});

	});

	describe("valid object", () => {

		it("should test param full valid recursive data", () => {

			const err = checkSchema("/test", "get", "parameters", "body-param.test", {
				"type": "object",
				"properties": {
					"test": {
						"type": "string"
					}
				}
			});

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err, null, "Generated error is not as expected");

		});

		it("should test param full valid recursive data with components", () => {

			const err = checkSchema("/test", "get", "parameters", "body-param.test", {
				"type": "object",
				"properties": {
					"test": {
						"$ref": "#/components/schemas/test"
					}
				}
			}, {
				"schemas": {
					"test": {
						"type": "object",
						"properties": {
							"test": {
								"$ref": "#/components/schemas/test2"
							}
						}
					},
					"test2": {
						"type": "string"
					}
				}
			});

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err, null, "Generated error is not as expected");

		});

	});

	describe("valid array", () => {

		it("should test param full valid recursive data", () => {

			const err = checkSchema("/test", "get", "parameters", "body-param.test", {
				"type": "array",
				"items": {
					"type": "string"
				}
			});

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err, null, "Generated error is not as expected");

		});

		it("should test param full valid recursive data with components", () => {

			const err = checkSchema("/test", "get", "parameters", "body-param.test", {
				"type": "array",
				"items": {
					"$ref": "#/components/schemas/test"
				}
			}, {
				"schemas": {
					"test": {
						"type": "object",
						"properties": {
							"test": {
								"$ref": "#/components/schemas/test2"
							}
						}
					},
					"test2": {
						"type": "string"
					}
				}
			});

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err, null, "Generated error is not as expected");

		});

	});

});
