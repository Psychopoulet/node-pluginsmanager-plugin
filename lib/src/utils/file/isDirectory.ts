// deps

    // natives
    import { lstat } from "node:fs";

    // locals
    import { checkNonEmptyString } from "../../checkers/RangeError/checkNonEmptyString";

// types & interfaces

    // natives
    import type { Stats } from "node:fs";

// module

export default function isDirectory (directoryPath: string): Promise<boolean> {

    return checkNonEmptyString("directoryPath", directoryPath).then((): Promise<boolean> => {

        return new Promise((resolve: (value: boolean) => void): void => {

            lstat(directoryPath, (err: NodeJS.ErrnoException | null, stats: Stats): void => {
                return resolve(Boolean(!err && stats.isDirectory()));
            });

        });

    });

}
