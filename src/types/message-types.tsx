import {User} from "@/types/user-types.tsx";

export interface Attachment {
    src: string;
    name: string;
    type: string;
    size: number;
}

export interface Message {
    id: number;
    chatID: number;
    user: User;
    text: string;
    time: string;
    replyTo?: Message;
    attachment?: Attachment[];
    updatedAt: number;
    readCount: number;
}

export interface EditAttachment extends Attachment {
    delete: boolean;
}

export interface EditMessage extends Omit<Message, 'attachment'> {
    attachment?: EditAttachment[];
}