//  deps

    // locals
    import { checkExistsSync } from "../ReferenceError/checkExists";

// module

export function checkFunctionSync (dataName: string, data: any): ReferenceError | TypeError | null {

    let err: ReferenceError | null = checkExistsSync(dataName, data);

        if (!err && "function" !== typeof data) {

            err = new TypeError(
                "\"" + dataName + "\" is not a function"
            );

        }

    return err;

}

export function checkFunction (dataName: string, data: any): Promise<void> {

    const err: ReferenceError | TypeError | null = checkFunctionSync(dataName, data);

    return err ? Promise.reject(err) : Promise.resolve();

}
