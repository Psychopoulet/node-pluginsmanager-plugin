"use strict";

// deps

	// locals
	import isFile from "./isFile"

// module

export default function checkFile (file: string): Promise<void> {

	return isFile(file).then((exists: boolean): Promise<void> => {

		return exists ? Promise.resolve() :
			Promise.reject(new Error("\"" + file + "\" does not exist."));

	});

};
