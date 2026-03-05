// module

export default function cleanSendedError (data: Error | Record<string, unknown> | string | null): Record<string, unknown> | string | null {

    if ("object" === typeof data) {

        if (null === data) {
            return data;
        }
        else if (data instanceof Error) {
            return data.message;
        }
        else {

            Object.keys(data).forEach((key: string): void => {
                data[key] = cleanSendedError(data[key] as Error | Record<string, unknown> | string | null); // in practice, it's unknown, had to specify the type for linter
            });

            return data;

        }

    }

    return data;

}
