// module

export default function jsonParser (content: string): any {

    try {

        let parsed: any = JSON.parse(content);

        if ("string" === typeof parsed) {
            parsed = jsonParser(parsed);
        }

        return parsed;

    }
    catch (e) {
        return content;
    }

}
