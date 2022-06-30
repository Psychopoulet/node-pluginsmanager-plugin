import { iIncomingMessage, iServerResponse } from "../components/Server";
export default function send(req: iIncomingMessage, res: iServerResponse, code: number, content: any, apiVersion: string, cors: boolean): Promise<void>;
