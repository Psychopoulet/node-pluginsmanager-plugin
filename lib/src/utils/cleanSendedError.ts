// module

export default function cleanSendedError (data: unknown): unknown {

    if ("object" === typeof data) {

        if (null === data) {
            return data;
        }
        else if (data instanceof Error) {
            return data.message;
        }
        else {

            Object.keys(data as Record<string, unknown>).forEach((key: string): void => {
                (data as Record<string, unknown>)[key] = cleanSendedError((data as Record<string, unknown>)[key]); // in practice, it's unknown, had to specify the type for linter
            });

            return data;

        }

    }

    return data;

}
