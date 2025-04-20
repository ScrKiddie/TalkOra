"use client"

import {
    CircleCheckBig,
    EllipsisVertical,
    Trash2,
} from "lucide-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import {useState} from "react";

export function NavChat({
                            chats,
                        }: {
    chats: {
        name: string
        message: string
        avatar: string
    }[]
}) {
    const {isMobile} = useSidebar()
    const [activeIndex, setActiveIndex] = useState<number | null>(null)
    const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null)
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
    return (
        <SidebarGroup>
            <SidebarMenu>
                {chats.map((chat, index) => (
                    <SidebarMenuItem key={index}>
                        <div
                            className="relative w-full"
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <DropdownMenu
                                onOpenChange={(open) => {
                                    setOpenMenuIndex(open ? index : null)
                                }}
                            >
                                <SidebarMenuButton
                                    onClick={() => setActiveIndex(index)}
                                    size="lg"
                                    className={`group relative flex items-center 
                                        data-[state=open]:bg-sidebar-accent 
                                        data-[state=open]:text-sidebar-accent-foreground 
                                        ${activeIndex === index ? "bg-muted text-foreground" : ""}
                                      `}
                                >

                                    <Avatar className="h-8 w-8 rounded-full " >
                                        <AvatarImage src={chat.avatar} alt={chat.name}/>
                                        <AvatarFallback className="rounded-lg">
                                            {chat.name[0].toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight ml-3">
                                        <span className="truncate font-medium">{chat.name}</span>
                                        <span className="truncate text-xs text-muted-foreground">
                      {chat.message}
                    </span>
                                    </div>
                                    <DropdownMenuTrigger asChild>
                                        <SidebarMenuAction
                                            className={`absolute right-2 top-1/2 -translate-y-1/2 transition-opacity duration-200
    ${((hoveredIndex === index || openMenuIndex === index)||isMobile)
                                                ? "opacity-100"
                                                : "opacity-0"}
  `}
                                        >
                                            <EllipsisVertical/>
                                        </SidebarMenuAction>
                                    </DropdownMenuTrigger>
                                </SidebarMenuButton>
                                <DropdownMenuContent
                                    className="w-fit rounded-lg"
                                    side={isMobile ? "bottom" : "right"}
                                    align={isMobile ? "end" : "start"}
                                >

                                    <DropdownMenuItem>
                                        <CircleCheckBig className="text-muted-foreground"/>
                                        <span>Read Chat</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator/>
                                    <DropdownMenuItem>
                                        <Trash2 className="text-muted-foreground"/>
                                        <span>Delete Chat</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}
