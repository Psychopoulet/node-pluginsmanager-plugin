"use strict";

// deps

	// natives
	import { readFile } from "fs";

	// locals
	import checkFile from "./checkFile";

// module

export default function readJSONFile (file: string): Promise<any> {

	return checkFile(file).then((): Promise<string> => {

		return new Promise((resolve, reject): void => {

			readFile(file, "utf8", (err: Error | null, content: string): void => {
				return err ? reject(err) : resolve(content);
			});

		});

	}).then((content: string): Promise<any> => {
		return Promise.resolve(JSON.parse(content));
	});

};
