export interface Attachment {
    src: string;
    name: string;
    type: string;
    size: number;
}

export interface Message {
    id: number;
    userId: number;
    name: string;
    avatar: string;
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