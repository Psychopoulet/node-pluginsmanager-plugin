// deps

    // natives
    import { readFile } from "node:fs/promises";

    // locals
    import checkFile from "./checkFile";

// module

export default function readJSONFile (file: string): Promise<unknown> {

    return checkFile(file).then((): Promise<string> => {
        return readFile(file, "utf-8");
    }).then((content: string): Promise<unknown> => {
        return Promise.resolve(JSON.parse(content));
    });

}
