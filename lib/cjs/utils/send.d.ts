import type { IncomingMessage, ServerResponse } from "node:http";
import type { iFormatedServerResponseForValidation } from "../components/Server";
export default function send(req: IncomingMessage, res: ServerResponse, code: number, content: unknown, options: {
    "apiVersion": string;
    "cors": boolean;
    "mime": string;
}): Promise<iFormatedServerResponseForValidation>;
