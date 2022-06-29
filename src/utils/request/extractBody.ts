"use strict";

// deps

	// locals

	import { iIncomingMessage } from "../../components/Server";

	import { checkInteger } from "../../checkers/TypeError/checkInteger";
	import { checkFunction } from "../../checkers/TypeError/checkFunction";
	import { checkNonEmptyObject } from "../../checkers/RangeError/checkNonEmptyObject";

// types & interfaces

	interface iResult {
		"value": string;
		"parsed": any;
	}

// module

export default function extractBody (req: iIncomingMessage): Promise<iResult> {

	return checkNonEmptyObject("req", req).then((): Promise<void> => {
		return checkFunction("req.on", req.on);
	}).then((): Promise<void> => {
		return checkNonEmptyObject("req.headers", req.headers);
	}).then((): Promise<void> => {
		return checkInteger("req.headers[\"content-length\"]", req.headers["content-length"]);
	}).then((): Promise<iResult> => {

		return new Promise((resolve: (res: iResult) => void, reject: (err: Error) => void): void => {

			let queryData: string = "";
			req.on("data", (data): void => {
				queryData += data.toString("utf8");
			}).on("end", (): void => {

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
							reject(e as Error);
						}

					}

				}

			});

		});

	});

};
