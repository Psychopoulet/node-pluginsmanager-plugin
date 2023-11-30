/*
	eslint max-params: 0
*/

"use strict";

// deps

	// natives
	const { join } = require("path");
	const { request } = require("http");
	const { parse } = require("url");
	const { strictEqual } = require("assert");

	// externals
	const readJSONFile = require(join(__dirname, "..", "..", "lib", "cjs", "utils", "file", "readJSONFile.js"));

// module

module.exports = function httpRequestTest (
	urlpath, method, params,
	returnCode, returnResponse, returnContent,
	contentType = "application/json; charset=utf-8"
) {

	return readJSONFile.default(join(__dirname, "DescriptorUser", "Descriptor.json")).then((content) => {

		const url = parse(content.servers[0].url + urlpath);

		return new Promise((resolve, reject) => {

			const bodyParams = "undefined" !== typeof params ? JSON.stringify(params) : "";

			const opts = {
				"protocol": url.protocol,
				"hostname": url.hostname,
				"port": url.port,
				"path": url.path,
				"query": url.query,
				"method": method.toUpperCase(),
				"headers": {
					"Content-Type": contentType,
					"Content-Length": Buffer.byteLength(bodyParams)
				}
			};

			const req = request(opts, (res) => {

				try {

					strictEqual(res.statusCode, returnCode, "The statusCode is not " + returnCode);
					strictEqual(res.statusMessage, returnResponse, "The statusMessage is not valid");

					strictEqual(typeof res.headers, "object", "The headers are not an object");
					strictEqual(
						res.headers["content-type"].toLowerCase(),
						contentType,
						"The content-type header is not as expected"
					);

					if (404 !== res.statusCode) {

						strictEqual(
							res.headers["api-version"].toLowerCase(),
							content.info.version,
							"The api-version header is not as expected"
						);

					}

					res.setEncoding("utf-8");

					let rawData = "";
					res.on("data", (chunk) => {
						rawData += chunk;
					}).on("end", () => {

						try {

							strictEqual(typeof rawData, "string", "The returned content is not a string");

							if (res.headers["content-length"]) {

								strictEqual(
									parseInt(res.headers["content-length"], 10),
									Buffer.byteLength(rawData),
									"The content-length header are not as expected"
								);

							}

							if ("undefined" !== typeof returnContent) {

								if (contentType.includes("application/json")) {
									strictEqual(rawData, JSON.stringify(returnContent), "The returned content is not as expected");
								}
								else {
									strictEqual(rawData, returnContent, "The returned content is not as expected");
								}

							}

							resolve();

						}
						catch (_e) {
							reject(_e);
						}

					});

				}
				catch (e) {
					reject(e);
				}

			});

			req.on("error", reject);

			req.write(bodyParams);
			req.end();

		});

	});

};
