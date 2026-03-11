// deps

    // locals
    import removeFirstSlash from "../removeFirstSlash";

// module

export default function extractParams (patternPath: string, realPath: string): Record<string, string | number | boolean> {

    const params: Record<string, string | number | boolean> = {};

        const patternPathSplitted: string[] = removeFirstSlash(patternPath).split("/");

        removeFirstSlash(realPath).split("/").forEach((p: string, i: number): void => {

            if ("{" === patternPathSplitted[i][0]) {
                params[patternPathSplitted[i].replace("{", "").replace("}", "")] = decodeURI(p);
            }

        });

    return params;

}
