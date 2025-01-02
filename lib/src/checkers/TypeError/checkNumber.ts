//  deps

    // locals
    import { checkExistsSync } from "../ReferenceError/checkExists";

// module

export function checkNumberSync (dataName: string, data: any): ReferenceError | TypeError | null {

    let err: ReferenceError | null = checkExistsSync(dataName, data);

        if (!err && "number" !== typeof data) {

            err = new TypeError(
                "\"" + dataName + "\" is not a number"
            );

        }

    return err;

}

export function checkNumber (dataName: string, data: any): Promise<void> {

    const err: ReferenceError | TypeError | null = checkNumberSync(dataName, data);

    return err ? Promise.reject(err) : Promise.resolve();

}
