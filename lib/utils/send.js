/*
	eslint-disable max-params
*/

"use strict";

// module

module.exports = function send (req, res, content, code, cors = false) {

	const result = "undefined" !== typeof content ? JSON.stringify(content) : "";

	res.writeHead(code,
		Object.assign({
			"Content-Type": "application/json; charset=utf-8",
			"Content-Length": Buffer.byteLength(result),
			"Status-Code-Url-Cat": "https://http.cat/" + code
		}, cors ? {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Credentials": true,
			"Access-Control-Allow-Methods": req.headers["access-control-request-method"] ? req.headers["access-control-request-method"] : [
				"GET",
				"POST",
				"PUT",
				"DELETE",
				"PATCH",
				"OPTIONS"
			].join(", "),
			"Access-Control-Allow-Headers": req.headers["access-control-request-headers"] ? req.headers["access-control-request-headers"] : [
				"Origin",
				"Accept",
				"Accept-Version",
				"Content-Length",
				"Content-MD5",
				"Content-Type",
				"Date",
				"X-Api-Version",
				"X-File-Name",
				"X-CSRF-Token",
				"X-Requested-With"
			].join(", ")
		} : {})
	);

	res.end(result, "utf-8");

};
