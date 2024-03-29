//  deps

    // locals
    import { checkObjectSync } from "../TypeError/checkObject";

// module

export function checkArraySync (dataName: string, data: any): ReferenceError | TypeError | null {

    let err: ReferenceError | TypeError | null = checkObjectSync(dataName, data);

        if (!err && !(data instanceof Array)) {

            err = new TypeError(
                "\"" + dataName + "\" is not an Array"
            );

        }

    return err;

}

export function checkArray (dataName: string, data: any): Promise<void> {

    const err: ReferenceError | TypeError | null = checkArraySync(dataName, data);

    return err ? Promise.reject(err) : Promise.resolve();

}
