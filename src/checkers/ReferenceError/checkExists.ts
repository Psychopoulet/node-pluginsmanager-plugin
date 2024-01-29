// module

export function checkExistsSync (dataName: string, data: any): ReferenceError | null {

    let err: ReferenceError | null = null;

        if ("undefined" === typeof data) {

            err = new ReferenceError(
                "\"" + dataName + "\" does not exist"
            );

        }

    return err;

}

export function checkExists (dataName: string, data: any): Promise<void> {

    const err: ReferenceError | null = checkExistsSync(dataName, data);

    return err ? Promise.reject(err) : Promise.resolve();

}
