"use strict";

// types & interfaces

	// locals
	import { iIncomingMessage, iServerResponse } from "../components/Server";

// module

export default function send (req: iIncomingMessage, res: iServerResponse, code: number, content: any, options: {
	"apiVersion": string,
	"cors": boolean,
	"mime": string
}): Promise<void> {

	return Promise.resolve().then((): string => {

		if (!content) {
			return "";
		}
		else {

			let result: string = "";

				if (options.mime.includes("application/json")) {

					if ("string" === typeof content) {

						try {

							JSON.parse(content); // is content json & parseable ?

							result = content; // yes => valid JSON string, send it as it is

						}
						catch (e) {
							result = JSON.stringify(content); // no => not JSON string, send formatted one
						}

					}
					else {

						const stringified: string = JSON.stringify(content);

						if (stringified !== content) {
							result = stringified;
						}

					}

				}
				else {
					result = content;
				}

			return result;

		}

	}).then((stringifiedContent: string): Promise<void> => {

		return new Promise((resolve: () => void): void => {

			// force data for checking

			res.statusCode = code;

			res.headers = Object.assign({
				"Content-Type": options.mime,
				"Content-Length": stringifiedContent ? Buffer.byteLength(stringifiedContent) : 0,
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

			if ("" !== stringifiedContent) {

				res.body = content; // for Mediator response validator

				res.end(stringifiedContent, "utf-8", (): void => {
					resolve();
				});

			}
			else {

				res.end((): void => {
					resolve();
				});

			}

		});
	});

};
