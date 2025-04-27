import {User} from "@/types/userTypes.tsx";
import {Message} from "@/types/messageTypes.tsx";

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
}

export interface PrivateChat {
    type: ChatType.PrivateChat;
    participants: [User, User];
    lastSeen: number;
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