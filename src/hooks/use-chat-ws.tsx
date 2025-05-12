import { useEffect } from 'react';
import { useChatStore } from '@/store/chat-store.tsx';
import {User} from "@/types/user-types.tsx";
import {Chat} from "@/types/chat-types.tsx";
import {Message} from "@/types/message-types.tsx";

export const useChatWebSocket = (url: string) => {
    const {
        setUser,
        setMessage,
        updateMessage,
        deleteMessage,
        setChat,
        incrementReadCount,
    } = useChatStore();

    useEffect(() => {
        const ws = new WebSocket(url);

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);

            switch (data.type) {
                case 'messageCreate':
                    setMessage(data.payload as Message);
                    break;

                case 'messageUpdate':
                    updateMessage(data.payload as Message);
                    break;

                case 'messageDelete':
                    deleteMessage(data.payload.id);
                    break;

                case 'messageRead':
                    incrementReadCount(data.payload.messageId);
                    break;

                case 'userUpdate':
                    setUser(data.payload as User);
                    break;

                case 'groupChatUpdate':
                    setChat(data.payload as Chat);
                    break;

                case 'chatStatus':
                case 'chatType':
                    break;

                default:
                    console.warn(`Unknown event type: ${data.type}`);
            }
        };

        return () => ws.close();
    }, [url]);
};
