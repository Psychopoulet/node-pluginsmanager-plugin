// deps

    // locals
    import removeFirstSlash from "../removeFirstSlash";

// module

export default function extractParams (patternPath: string, realPath: string): { [key:string]: any } {

    const params: { [key:string]: any } = {};

        const patternPathSplitted: Array<string> = removeFirstSlash(patternPath).split("/");

        removeFirstSlash(realPath).split("/").forEach((p: string, i: number): void => {

            if ("{" === patternPathSplitted[i][0]) {
                params[patternPathSplitted[i].replace("{", "").replace("}", "")] = decodeURI(p);
            }

        });

    return params;

}
