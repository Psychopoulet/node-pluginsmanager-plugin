// deps

    // locals
    import removeFirstSlash from "../removeFirstSlash";

// types & interfaces

    // locals
    import type { PathsObject, PathItemObject } from "../../openAPITypes";

// module

export default function extractPattern (paths: PathsObject, pathname: string, method: keyof PathItemObject): string {

    return "object" !== typeof paths ? "" : Object.keys(paths).find((p: string): boolean => {

        if ("undefined" === typeof paths[p][method]) {
            return false;
        }

        const pathnameSplitted: string[] = removeFirstSlash(pathname).split("/");
        const pathSplitted: string[] = removeFirstSlash(p).split("/");

        if (pathnameSplitted.length !== pathSplitted.length) {
            return false;
        }

        for (let i: number = 0; i < pathnameSplitted.length; ++i) {

            if ("{" !== pathSplitted[i][0] && pathSplitted[i] !== pathnameSplitted[i]) {
                return false;
            }

        }

        return true;

    }) ?? "";

}
