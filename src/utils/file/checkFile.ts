// deps

    // locals
    import isFile from "./isFile";

// module

export default function checkFile (filename: string): Promise<void> {

    return isFile(filename).then((exists: boolean): Promise<void> => {

        return exists
            ? Promise.resolve()
            : Promise.reject(new Error("\"" + filename + "\" does not exist."));

    });

}
