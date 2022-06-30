"use strict";

// deps

	// natives
	import { lstat } from "fs";

	// locals
	import { checkNonEmptyString } from "../../checkers/RangeError/checkNonEmptyString";

// module

export default function isFile (filename: string): Promise<boolean> {

	return checkNonEmptyString("filename", filename).then((): Promise<boolean> => {

		return new Promise((resolve): void => {

			lstat(filename, (err, stats): void => {
				return resolve(Boolean(!err && stats.isFile()));
			});

		});

	});

};
