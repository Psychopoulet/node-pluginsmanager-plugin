"use strict";

// types & interfaces

	// locals
	import { iIncomingMessage } from "../../components/Server";

// module

export default function send (req: iIncomingMessage, code: number, responses: {
	[key:string]: {
		"description": string;
		"content"?: {
			[key:string]: any
		}
	}
}): string {

	const stringifiedCode: string = String(code);

	let descriptorContent: { [key:string]: any } | undefined;

	if (responses[stringifiedCode]) {

		if (responses[stringifiedCode].content) {
			descriptorContent = responses[stringifiedCode].content;
		}

	}
	else if (responses.default && responses.default.content) {
		descriptorContent = responses.default.content;
	}
	else {
		throw new ReferenceError("No \"response\" detected in Descriptor");
	}

	// 201 (put) => may be without content
	// 204 => no content
	if (!descriptorContent && ![ "201", "204" ].includes(stringifiedCode)) {
		throw new TypeError("No valid \"response\" detected in Descriptor");
	}
	else {

		const [ mimeRequest, charsetRequest ] = req.headers["content-type"].split(";").map((content: string): string => {
			return content.trim().toLowerCase();
		});

		let mime: string = "";

		if (descriptorContent && Object.keys(descriptorContent).includes(mimeRequest)) {
			mime = mimeRequest;
		}

		if (!mime) {
			mime = mimeRequest || "text/plain";
		}

		if (mimeRequest && mimeRequest !== mime) {
			throw new RangeError("Mime detected in request (" + mimeRequest + ") is not the same than actually returned (" + mime + ")");
		}

		if (charsetRequest) {
			mime = mimeRequest + "; " + charsetRequest;
		}

		return mime;

	}

};
