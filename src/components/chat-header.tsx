import { FC } from 'react';
import {Avatar, AvatarFallback, AvatarImage} from "@radix-ui/react-avatar";
import {SidebarTrigger} from "@/components/ui/sidebar.tsx";
import {ModeToggle} from "@/components/mode-toggle.tsx";

interface Chat {
    name: string;
    avatarUrl: string;
    lastSeen: string;
}

interface ChatHeaderProps {
    chat: Chat;
}

const ChatHeader: FC<ChatHeaderProps> = ({ chat }) => {
    const initials = chat.name.split(' ').map(part => part.charAt(0).toUpperCase()).join('');

    return (
        <header className="outline-1 dark:outline-[#212224] outline-[#e4e4e7] z-50 bg-background flex h-[63px] shrink-0 items-center gap-2">
            <div className="flex gap-2 px-4 w-full justify-between items-center">
                <div className="flex items-center justify-center gap-2">
                    <SidebarTrigger className={`mr-1`} />
                    <Avatar className="shrink-0 size-10 shadow-sm rounded-full overflow-hidden">
                        <AvatarImage
                            src={chat.avatarUrl}
                            className="object-cover w-full h-full"
                        />
                        <AvatarFallback className="text-background">
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-medium">{chat.name}</span>
                        <span className="truncate text-xs text-muted-foreground">{chat.lastSeen}</span>
                    </div>
                </div>
                <ModeToggle />
            </div>
        </header>
    );
};

export default ChatHeader;
