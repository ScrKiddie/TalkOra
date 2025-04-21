import {AppSidebar} from "@/components/app-sidebar.tsx";
import {SidebarInset, SidebarProvider, SidebarTrigger, useSidebar} from "@/components/ui/sidebar.tsx";

import {ModeToggle} from "@/components/mode-toggle.tsx";
import {Button} from "@/components/ui/button.tsx";
import {
    Check,
    CheckCheck, CircleCheckBig,
    EllipsisVertical,
    Forward,
    LoaderCircle,
    Reply,
    SendHorizonal,
    Smile,
    Trash, Trash2
} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@radix-ui/react-avatar";
import {Textarea} from "@/components/ui/textarea.tsx";
import {useRef, useState} from "react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

const Chat = () => {
    const currentUserId = 1;
    const [isGroup] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [isLoading] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            userId: 2,
            name: "Steven William",
            avatar: "https://images.freeimages.com/images/large-previews/fdd/man-avatar-1632964.jpg?fmt=webp&h=350",
            text: "Halo! Ini pesan dummy dari user 😁",
            time: "10:06 AM",
        },
        {
            id: 2,
            userId: 1,
            name: "You",
            avatar: "https://images.freeimages.com/images/large-previews/d1f/lady-avatar-1632967.jpg?fmt=webp&h=350",
            text: "Hai Steven! Apa kabar? 😄",
            time: "10:06 AM",
        },
        {
            id: 3,
            userId: 2,
            name: "Steven William",
            avatar: "https://images.freeimages.com/images/large-previews/fdd/man-avatar-1632964.jpg?fmt=webp&h=350",
            text: "Baik banget, makasih! Kamu sendiri gimana?",
            time: "10:06 AM",
        },
        {
            id: 4,
            userId: 1,
            name: "You",
            avatar: "https://images.freeimages.com/images/large-previews/d1f/lady-avatar-1632967.jpg?fmt=webp&h=350",
            text: "Lagi santai juga sih, habis ngopi bareng temen di kafe dekat rumah.",
            time: "10:06 AM",
        },
        {
            id: 5,
            userId: 2,
            name: "Steven William",
            avatar: "https://images.freeimages.com/images/large-previews/fdd/man-avatar-1632964.jpg?fmt=webp&h=350",
            text: "Asik banget! Cuacanya juga mendukung ya, adem banget hari ini.",
            time: "10:06 AM",
        },
        {
            id: 6,
            userId: 1,
            name: "You",
            avatar: "https://images.freeimages.com/images/large-previews/d1f/lady-avatar-1632967.jpg?fmt=webp&h=350",
            text: "Iya, enak banget buat nongkrong atau jalan-jalan sore.",
            time: "10:06 AM",
        },
        {
            id: 7,
            userId: 2,
            name: "Steven William",
            avatar: "https://images.freeimages.com/images/large-previews/fdd/man-avatar-1632964.jpg?fmt=webp&h=350",
            text: "By the way, kerjaan kamu gimana akhir-akhir ini?",
            time: "10:06 AM",
        },
        {
            id: 8,
            userId: 1,
            name: "You",
            avatar: "https://images.freeimages.com/images/large-previews/d1f/lady-avatar-1632967.jpg?fmt=webp&h=350",
            text: "Lagi lumayan padat, tapi seru sih. Banyak project baru yang bikin semangat!",
            time: "10:06 AM",
        },
        {
            id: 9,
            userId: 2,
            name: "Steven William",
            avatar: "https://images.freeimages.com/images/large-previews/fdd/man-avatar-1632964.jpg?fmt=webp&h=350",
            text: "Mantap! Emang paling enak kalau kerjaan itu bisa dinikmatin.",
            time: "10:06 AM",
        },
        {
            id: 10,
            userId: 2,
            name: "Steven William",
            avatar: "https://images.freeimages.com/images/large-previews/fdd/man-avatar-1632964.jpg?fmt=webp&h=350",
            text: "Kamu ada rencana akhir pekan ini?",
            time: "10:06 AM",
        },
        {
            id: 11,
            userId: 1,
            name: "You",
            avatar: "https://images.freeimages.com/images/large-previews/d1f/lady-avatar-1632967.jpg?fmt=webp&h=350",
            text: "Mungkin mau staycation di Puncak, pengen refreshing sebentar. Kamu?",
            time: "10:06 AM",
        },
        {
            id: 12,
            userId: 2,
            name: "Steven William",
            avatar: "https://images.freeimages.com/images/large-previews/fdd/man-avatar-1632964.jpg?fmt=webp&h=350",
            text: "Wah seru! Aku sih masih belum pasti, tapi pengen coba hiking kalau cuacanya oke.",
            time: "10:06 AM",
        },
    ]);
    const [message, setMessage] = useState("");

    return (
        <>
            <AppSidebar/>
            <SidebarInset className={"break-all overflow-y-visible"}>
                <div className="h-screen overflow-hidden flex flex-col">
                    <header
                        className="outline-1 dark:outline-[#212224] outline-[#e4e4e7] z-50 bg-background flex h-[63px] shrink-0 items-center gap-2">
                        <div className="flex gap-2 px-4 w-full justify-between items-center ">

                            <div className="flex items-center justify-center gap-2">
                                <SidebarTrigger className={`mr-1`}/>
                                <Avatar className="shrink-0 size-10 shadow-sm rounded-full overflow-hidden">
                                    <AvatarImage
                                        src="https://images.freeimages.com/images/large-previews/fdd/man-avatar-1632964.jpg?fmt=webp&h=500"
                                        className="object-cover w-full h-full"/>
                                    <AvatarFallback className="text-background">HI</AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight ">
                                    <span className="truncate font-medium">Steven William</span>
                                    <span className="truncate text-xs text-muted-foreground">
                              Active 2 mins ago
                            </span>
                                </div>
                            </div>
                            <ModeToggle/>

                        </div>
                    </header>

                    <main className="flex flex-col gap-4 flex-1 px-2 overflow-auto">
                        <div className="flex flex-col flex-1 bg-none">
                            <div className="flex-1 p-2 space-y-2 flex justify-end flex-col " id="chat-container">
                                {messages.map((message) => {
                                    const isCurrentUser = message.userId === currentUserId;
                                    return (
                                        <div
                                            key={message.id}
                                            className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
                                        >
                                            <div className="group flex gap-2 items-end">
                                                {!isCurrentUser && isGroup && (
                                                    <Avatar
                                                        className="shrink-0 w-10 h-10 rounded-full bg-primary flex justify-center items-center overflow-hidden self-end">
                                                        <AvatarImage src={message.avatar}
                                                                     className="object-cover w-full h-full"/>
                                                        <AvatarFallback className="text-background">HI</AvatarFallback>
                                                    </Avatar>
                                                )}
                                                <DropdownMenu modal={false}>
                                                    {isCurrentUser && (
                                                        <div className="self-stretch shrink-0 size-10"/>
                                                    )}
                                                    <DropdownMenuTrigger asChild className={"hover:cursor-pointer"}>
                                                        <div
                                                            className={`p-[10px] rounded-md border ${
                                                                isCurrentUser
                                                                    ? "bg-primary text-primary-foreground"
                                                                    : "bg-background text-foreground"
                                                            }`}
                                                        >
                                                            {!isCurrentUser && isGroup &&
                                                                <p className="text-sm font-[500]">{message.name}</p>}
                                                            <p className="text-sm">{message.text}</p>
                                                            <div className="flex justify-end w-full items-end gap-1">
                                                                <p
                                                                    className={`text-xs line mt-2 text-right ${
                                                                        isCurrentUser ? "text-background" : "text-primary"
                                                                    }`}
                                                                >
                                                                    {message.time}
                                                                </p>
                                                                {isCurrentUser ? (isLoading ?
                                                                    <LoaderCircle className="size-4"/> :
                                                                    <CheckCheck className="size-4"/>) : ""}
                                                            </div>
                                                        </div>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent

                                                        className="w-fit rounded-lg shadow-none z-10 border-0 bg-transparent"
                                                        side={"right"}
                                                        align={"center"}
                                                    >

                                                        {isCurrentUser ? (<>

                                                            <DropdownMenuItem className={"p-2 bg-primary hover:bg-primary focus:bg-primary border"}
                                                                             >
                                                                <Trash2 className="text-background"/>

                                                            </DropdownMenuItem></>) : (<>
                                                            <DropdownMenuItem className={"p-2 bg-background hover:bg-background focus:bg-background border"}>
                                                                <Reply className="text-primary"/>

                                                            </DropdownMenuItem>

                                                           </>)}
                                                    </DropdownMenuContent>
                                                    {!isCurrentUser && (
                                                        <div className="self-stretch shrink-0 size-10"/>
                                                    )}
                                                </DropdownMenu>
                                            </div>
                                        </div>

                                    );
                                })}
                            </div>
                        </div>
                    </main>


                    <footer className=" mx-auto px-2 pb-2 min-h-[63px] bg- w-full flex items-start">
                        <div
                            className="flex items-center  outline-1 dark:outline-[#212224] outline-[#e4e4e7] z-50 rounded-md gap-2 p-2 h-full bg-background w-full">
                            <div>
                                <Button size="icon" variant="ghost">
                                    <Smile className="size-5"/>
                                </Button>
                            </div>
                            <Textarea
                                className="resize-none rounded-md flex-1 max-h-18 min-h-8 break-all"
                                ref={textareaRef}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <Button size="icon" variant="ghost" onClick={(e) => {
                                e.preventDefault();

                                if (message.trim() === "") return;

                                const newMessage = {
                                    id: messages.length + 1,
                                    userId: currentUserId,
                                    name: "You",
                                    avatar:
                                        "https://images.freeimages.com/images/large-previews/d1f/lady-avatar-1632967.jpg?fmt=webp&h=350",
                                    text: message,
                                    time: new Date().toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    }),
                                };

                                setMessages((prev) => [...prev, newMessage]);
                                setMessage("");

                                if (textareaRef.current) {
                                    textareaRef.current.value = "";
                                    textareaRef.current.focus();
                                }

                            }}>
                                <SendHorizonal className="size-5"/>
                            </Button>
                        </div>
                    </footer>
                </div>
            </SidebarInset>
        </>
    )
}
export default Chat;