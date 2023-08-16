"use strict";

// deps

	// natives
	import { readFile } from "node:fs/promises";

	// locals
	import checkFile from "./checkFile";

// module

export default function readJSONFile (file: string): Promise<any> {

	return checkFile(file).then((): Promise<string> => {
		return readFile(file, "utf8");
	}).then((content: string): Promise<any> => {
		return Promise.resolve(JSON.parse(content));
	});

};
