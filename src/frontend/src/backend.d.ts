import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Message {
    name: string;
    text: string;
    email: string;
}
export interface backendInterface {
    deleteMessage(id: bigint): Promise<void>;
    getAllMessages(): Promise<Array<Message>>;
    sendMessage(name: string, email: string, text: string): Promise<void>;
}
