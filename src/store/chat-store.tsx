import { create } from 'zustand';
import {User} from "@/types/user-types.tsx";
import {Chat, ChatType} from "@/types/chat-types.tsx";
import {Message} from "@/types/message-types.tsx";

interface ChatState {
    currentUser: User | null;
    activeChatId: number | null;
    users: Record<number, User>;
    chats: Record<number, Chat>;
    messages: Record<number, Message>;

    setCurrentUser: (user: User) => void;
    setActiveChatId: (chatId: number | null) => void;
    setUser: (user: User) => void;
    setMessage: (message: Message) => void;
    updateMessage: (message: Message) => void;
    deleteMessage: (id: number) => void;
    setChat: (chat: Chat) => void;
    incrementReadCount: (messageId: number) => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
    currentUser: null,
    activeChatId: null,
    users: {},
    chats: {},
    messages: {},

    setCurrentUser: (user) => set({ currentUser: user }),
    setActiveChatId: (chatId) => {
        const { chats } = get();
        const chat = chats[chatId!];

        if (chat && chat.unreadCount) {
            const updatedChats = {
                ...chats,
                [chatId!]: {
                    ...chat,
                    unreadCount: 0,
                },
            };
            set({ activeChatId: chatId, chats: updatedChats });
        } else {
            set({ activeChatId: chatId });
        }
    },


    setUser: (user) => {
        const users = { ...get().users, [user.id]: user };

        const updatedMessages = { ...get().messages };
        Object.entries(updatedMessages).forEach(([id, msg]) => {
            if (msg.user.id === user.id) {
                updatedMessages[+id] = { ...msg, user };
            }
            if (msg.replyTo && msg.replyTo.user.id === user.id) {
                updatedMessages[+id] = {
                    ...updatedMessages[+id],
                    replyTo: {
                        ...msg.replyTo,
                        user,
                    },
                };
            }
        });

        const updatedChats = { ...get().chats };
        Object.entries(updatedChats).forEach(([chatId, chat]) => {
            if (chat.type === ChatType.PrivateChat) {
                const pc = chat.privateChat!;
                const participants = pc.participants.map((p) =>
                    p.id === user.id ? user : p
                ) as [User, User];
                const lastMessage =
                    pc.lastMessage?.user.id === user.id
                        ? { ...pc.lastMessage, user }
                        : pc.lastMessage;

                updatedChats[+chatId] = {
                    ...chat,
                    privateChat: {
                        ...pc,
                        participants,
                        lastMessage,
                    },
                };
            }
        });

        set({
            users,
            messages: updatedMessages,
            chats: updatedChats,
        });
    },


    setMessage: (msg) => {
        const { chats, activeChatId } = get();
        const chatId = msg.chatID;

        const updatedChats = { ...chats };

        if (chatId !== activeChatId) {
            const chat = updatedChats[chatId];
            if (chat) {
                const unread = (chat.unreadCount || 0) + 1;
                updatedChats[chatId] = {
                    ...chat,
                    unreadCount: unread,
                };
            }
        }

        set((state) => ({
            messages: { ...state.messages, [msg.id]: msg },
            chats: updatedChats,
        }));
    },


    updateMessage: (msg) => {
        const updatedMessages = { ...get().messages, [msg.id]: msg };

        Object.entries(updatedMessages).forEach(([id, message]) => {
            if (message.replyTo?.id === msg.id) {
                updatedMessages[+id] = {
                    ...message,
                    replyTo: msg,
                };
            }
        });

        set({ messages: updatedMessages });
    },


    deleteMessage: (id) => {
        const { messages } = get();
        const updatedMessages: Record<number, Message> = {};

        Object.entries(messages).forEach(([msgId, msg]) => {
            if (parseInt(msgId) === id) return;

            updatedMessages[+msgId] = {
                ...msg,
                replyTo: msg.replyTo?.id === id ? undefined : msg.replyTo,
            };
        });

        set({ messages: updatedMessages });
    },


    setChat: (chat) =>
        set((state) => ({
            chats: { ...state.chats, [chat.id]: chat },
        })),

    incrementReadCount: (messageId) => {
        const { messages, chats } = get();
        const message = messages[messageId];
        if (!message) return;

        const updatedMessage = {
            ...message,
            readCount: message.readCount + 1,
        };

        const updatedMessages = {
            ...messages,
            [messageId]: updatedMessage,
        };

        const updatedChats: Record<number, Chat> = {};

        Object.entries(chats).forEach(([chatId, chat]) => {
            if (chat.type === ChatType.PrivateChat && chat.privateChat?.lastMessage?.id === messageId) {
                updatedChats[+chatId] = {
                    ...chat,
                    privateChat: {
                        ...chat.privateChat,
                        lastMessage: updatedMessage,
                    },
                };
            } else if (chat.type === ChatType.GroupChat && chat.groupChat?.lastMessage?.id === messageId) {
                updatedChats[+chatId] = {
                    ...chat,
                    groupChat: {
                        ...chat.groupChat,
                        lastMessage: updatedMessage,
                    },
                };
            }
        });

        set({
            messages: updatedMessages,
            chats: {
                ...chats,
                ...updatedChats,
            },
        });
    },


}));
