import { FC } from 'react';
import {Avatar, AvatarFallback, AvatarImage} from "@radix-ui/react-avatar";
import {SidebarTrigger} from "@/components/ui/sidebar.tsx";
import {ModeToggle} from "@/components/mode-toggle.tsx";
import {Chat, ChatType} from "@/types/chatTypes.tsx";

interface ChatHeaderProps {
    chat: Chat;
    currentID: number;
}

const ChatHeader: FC<ChatHeaderProps> = ({ chat, currentID }) => {
    const otherParticipant = chat.type === ChatType.PrivateChat
        ? chat.privateChat?.participants.find(p => p.id !== currentID)
        : null;

    const initials = chat.type === ChatType.PrivateChat
        ? otherParticipant?.name.split(' ').map(part => part.charAt(0).toUpperCase()).join('')
        : chat.groupChat?.name.split(' ').map(part => part.charAt(0).toUpperCase()).join('');

    return (
        <header className="outline-1 dark:outline-[#212224] outline-[#e4e4e7] z-50 bg-background flex h-[63px] shrink-0 items-center gap-2">
            <div className="flex gap-2 px-4 w-full justify-between items-center">
                <div className="flex items-center justify-center gap-2">
                    <SidebarTrigger className={`mr-1`} />
                    <Avatar className="shrink-0 size-10 shadow-sm rounded-full overflow-hidden">
                        <AvatarImage
                            src={chat.type === ChatType.PrivateChat ? otherParticipant?.profilePicture : chat.groupChat?.profilePicture}
                            className="object-cover w-full h-full"
                        />
                        <AvatarFallback className="text-background">
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">
              {chat.type === ChatType.PrivateChat ? otherParticipant?.name : chat.groupChat?.name}
            </span>
                        <span className="truncate text-xs text-muted-foreground">
              {chat.type === ChatType.PrivateChat
                  ? `Last seen: ${chat.privateChat?.lastSeen}`
                  : `Members: ${chat.groupChat?.participantsCount}`}
            </span>
                    </div>
                </div>
                <ModeToggle />
            </div>
        </header>
    );
};

export default ChatHeader;
