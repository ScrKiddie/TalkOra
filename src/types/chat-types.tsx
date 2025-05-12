import {User} from "@/types/user-types.tsx";
import {Message} from "@/types/message-types.tsx";

export enum ChatType{
    PrivateChat = "private",
    GroupChat = "group"
}

export interface Chat {
    id: number;
    createdAt: number;
    type: ChatType;
    privateChat?: PrivateChat;
    groupChat?: GroupChat;
    unreadCount: number;
}

export interface PrivateChat {
    type: ChatType.PrivateChat;
    participants: [User, User];
    lastMessage: Message;
}

export interface GroupChat {
    type: ChatType.GroupChat;
    name: string;
    profilePicture: string;
    about: string;
    participantsCount: number;
    lastMessage: Message;
}