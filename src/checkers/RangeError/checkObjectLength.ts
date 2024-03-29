//  deps

    // locals
    import { checkObjectSync } from "./../TypeError/checkObject";
    import { checkIntegerSync } from "./../TypeError/checkInteger";

// private

    // methods


// module

export function checkObjectLengthSync (dataName: string, data: any, _length: number): ReferenceError | TypeError | RangeError | null {

    let err: ReferenceError | TypeError | RangeError | null = checkObjectSync(dataName, data);

        if (!err) {
            err = checkIntegerSync(dataName + "/length", _length);
        }

        if (!err) {

            const { length }: { "length": number; } = Object.keys(data as Record<string, any>);

            if (_length !== length) {

                err = new RangeError(
                    "\"" + dataName + "\" keys count must be equal to " + _length
                );

            }

        }

    return err;

}

export function checkObjectLength (dataName: string, data: any, length: number): Promise<void> {

    const err: ReferenceError | TypeError | RangeError | null = checkObjectLengthSync(dataName, data, length);

    return err ? Promise.reject(err) : Promise.resolve();

}
