"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
	const {
		checkNonEmptyObject,
		checkInteger,
		checkFunction
	} = require(join(__dirname, "..", "..", "checkers", "main.js"));

// module

module.exports = function extractBody (req) {

	return checkNonEmptyObject("req", req).then(() => {
		return checkFunction("req.on", req.on);
	}).then(() => {
		return checkNonEmptyObject("req.headers", req.headers);
	}).then(() => {
		return checkInteger("req.headers[\"content-length\"]", req.headers["content-length"]);
	}).then(() => {

		return new Promise((resolve, reject) => {

			let queryData = "";
			req.on("data", (data) => {
				queryData += data.toString("utf8");
			}).on("end", () => {

				if ("" === queryData || "null" === queryData) {

					resolve({
						"value": "",
						"parsed": {}
					});

				}
				else {

					req.headers["content-length"] = parseInt(req.headers["content-length"], 10);

					if (req.headers["content-length"] !== Buffer.byteLength(queryData)) {

						reject(new Error(
							"\"Content-Length\" header (" + Buffer.byteLength(queryData) + ")" +
							" is not as expected (" + req.headers["content-length"] + ")." +
							" Do not forget the fact that it is a 8-bit bytes number."
						));

					}
					else {

						try {

							resolve({
								"value": queryData,
								"parsed": JSON.parse(queryData)
							});

						}
						catch (e) {
							reject(e);
						}

					}

				}

			});

		});

	});

};
