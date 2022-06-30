import { iIncomingMessage } from "../../components/Server";
interface iResult {
    "value": string;
    "parsed": any;
}
export default function extractBody(req: iIncomingMessage): Promise<iResult>;
export {};
