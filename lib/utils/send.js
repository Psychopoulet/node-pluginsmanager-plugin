/*
	eslint-disable max-params
*/

"use strict";

// module

module.exports = function send (req, res, code, content, apiVersion, cors) {

	return new Promise((resolve) => {

		// formate content

		if ("undefined" !== typeof content) {
			res.body = JSON.stringify(content);
		}

		// force data for checking

		res.statusCode = code;

		res.headers = Object.assign({
			"Content-Type": "application/json; charset=utf-8",
			"Content-Length": res.body ? Buffer.byteLength(res.body) : 0,
			"Status-Code-Url-Cat": "https://http.cat/" + code,
			"API-Version": apiVersion
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
		} : {});

		// send data

		res.writeHead(res.statusCode, res.headers);

		if (res.body) {

			res.end(res.body, "utf-8", () => {
				resolve();
			});

		}
		else {

			res.end(() => {
				resolve();
			});

		}

	});

};
