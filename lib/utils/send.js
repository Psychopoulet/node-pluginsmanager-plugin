"use strict";

// module

module.exports = function send (req, res, content, code) {

	const result = "undefined" !== typeof content ? JSON.stringify(content) : "";

	res.writeHead(code, {
		"Content-Type": "application/json; charset=utf-8",
		"Content-Length": Buffer.byteLength(result),
		"Status-Code-Url-Cat": "https://http.cat/" + code
	});

	res.end(result, "utf-8");

};
