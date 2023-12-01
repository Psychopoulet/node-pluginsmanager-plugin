"use strict";

// types & interfaces

	// locals
	import { iIncomingMessage, iServerResponse } from "../components/Server";

// module

export default function send (req: iIncomingMessage, res: iServerResponse, code: number, content: string, options: {
	"apiVersion": string,
	"cors": boolean,
	"mime": string
}): Promise<void> {

	return new Promise((resolve: () => void): void => {

		// force data for checking

		res.statusCode = code;

		res.headers = Object.assign({
			"Content-Type": options.mime,
			"Content-Length": content ? Buffer.byteLength(content) : 0,
			"Status-Code-Url-Cat": "https://http.cat/" + code,
			"API-Version": options.apiVersion
		}, options.cors ? {
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

		if (content) {

			res.body = content; // for Mediator response validator

			res.end(content, "utf-8", (): void => {
				resolve();
			});

		}
		else {

			res.end((): void => {
				resolve();
			});

		}

	});

};
