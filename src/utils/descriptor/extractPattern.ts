"use strict";

// deps

	import { OpenApiDocument } from	"express-openapi-validate";

	// locals
	import removeFirstSlash from "../removeFirstSlash";

// module

export default function extractPattern (paths: OpenApiDocument["paths"], pathname: string, method: string): string {

	return "object" !== typeof paths ? "" : Object.keys(paths).filter((p: string): boolean => {
		return "undefined" !== typeof paths[p][method];
	}).find((p: string): boolean => {

		const pathnameSplitted: Array<string> = removeFirstSlash(pathname).split("/");
		const pathSplitted: Array<string> = removeFirstSlash(p).split("/");

		if (pathnameSplitted.length !== pathSplitted.length) {
			return false;
		}

		for (let i: number = 0; i < pathnameSplitted.length; ++i) {

			if ("{" !== pathSplitted[i][0] && pathSplitted[i] !== pathnameSplitted[i]) {
				return false;
			}

		}

		return true;

	}) || "";

};
