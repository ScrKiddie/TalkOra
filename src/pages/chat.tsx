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
    Trash, Trash2, X
} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@radix-ui/react-avatar";
import {Textarea} from "@/components/ui/textarea.tsx";
import {useEffect, useRef, useState} from "react";
import {Card} from "@/components/ui/card.tsx";

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
            time: "10:07 AM",
        },
        {
            id: 4,
            userId: 1,
            name: "You",
            avatar: "https://images.freeimages.com/images/large-previews/d1f/lady-avatar-1632967.jpg?fmt=webp&h=350",
            text: "Lagi santai juga sih, habis ngopi bareng temen di kafe dekat rumah.",
            time: "10:08 AM",
        },
        {
            id: 5,
            userId: 2,
            name: "Steven William",
            avatar: "https://images.freeimages.com/images/large-previews/fdd/man-avatar-1632964.jpg?fmt=webp&h=350",
            text: "Asik banget! Cuacanya juga mendukung ya, adem banget hari ini.",
            time: "10:09 AM",
        },
        {
            id: 6,
            userId: 1,
            name: "You",
            avatar: "https://images.freeimages.com/images/large-previews/d1f/lady-avatar-1632967.jpg?fmt=webp&h=350",
            text: "Iya, enak banget buat nongkrong atau jalan-jalan sore.",
            time: "10:10 AM",
        },
        {
            id: 7,
            userId: 2,
            name: "Steven William",
            avatar: "https://images.freeimages.com/images/large-previews/fdd/man-avatar-1632964.jpg?fmt=webp&h=350",
            text: "By the way, kerjaan kamu gimana akhir-akhir ini?",
            time: "10:11 AM",
        },
        {
            id: 8,
            userId: 1,
            name: "You",
            avatar: "https://images.freeimages.com/images/large-previews/d1f/lady-avatar-1632967.jpg?fmt=webp&h=350",
            text: "Lagi lumayan padat, tapi seru sih. Banyak project baru yang bikin semangat!",
            time: "10:12 AM",
        },
        {
            id: 9,
            userId: 2,
            name: "Steven William",
            avatar: "https://images.freeimages.com/images/large-previews/fdd/man-avatar-1632964.jpg?fmt=webp&h=350",
            text: "Mantap! Emang paling enak kalau kerjaan itu bisa dinikmatin.",
            time: "10:13 AM",
        },
        {
            id: 10,
            userId: 2,
            name: "Steven William",
            avatar: "https://images.freeimages.com/images/large-previews/fdd/man-avatar-1632964.jpg?fmt=webp&h=350",
            text: "Kamu ada rencana akhir pekan ini?",
            time: "10:14 AM",

        },
        {
            id: 11,
            userId: 1,
            name: "You",
            avatar: "https://images.freeimages.com/images/large-previews/d1f/lady-avatar-1632967.jpg?fmt=webp&h=350",
            text: "Mungkin mau staycation di Puncak, pengen refreshing sebentar. Kamu?",
            time: "10:15 AM",

            reply: {
                name: "Steven William",
                message: "Kamu ada rencana akhir pekan ini?"
            }
        },
        {
            id: 12,
            userId: 2,
            name: "Steven William",
            avatar: "https://images.freeimages.com/images/large-previews/fdd/man-avatar-1632964.jpg?fmt=webp&h=350",
            text: "Wah seru! Aku sih masih belum pasti, tapi pengen coba hiking kalau cuacanya oke.",
            time: "10:16 AM",
            reply: {
                name: "You",
                message: "Mungkin mau staycation di Puncak, pengen refreshing sebentar. Kamu?"
            }
        },
    ]);

    const [message, setMessage] = useState("");
    const [activeMessageId, setActiveMessageId] = useState<number | null>(null);


    const handleClick = (messageId: number) => {
        setActiveMessageId(messageId);
    };

    const [replyTo, setReplyTo] = useState<null | { id: number; name: string; message: string }>(null);


    return (
        <>
            <AppSidebar/>
            <SidebarInset className={"break-all overflow-y-visible"} >
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

                    <main className="flex flex-col gap-4 flex-1 px-2 overflow-auto" >
                        <div className="flex flex-col flex-1 bg-none">
                            <div className="flex-1 p-2 space-y-2 flex justify-end flex-col " id="chat-container">
                                {messages.map((message) => {
                                    const isCurrentUser = message.userId === currentUserId;
                                    return (
                                        <div
                                            key={message.id}
                                            className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
                                        >
                                            <div className="group flex gap-2 items-end" onClick={message.userId !== currentUserId ? () => handleClick(message.id) : () => {}}
                                            >

                                            {!isCurrentUser && isGroup && (
                                                    <Avatar
                                                        className="shrink-0 w-10 h-10 rounded-full bg-primary flex justify-center items-center overflow-hidden self-end">
                                                        <AvatarImage src={message.avatar}
                                                                     className="object-cover w-full h-full"/>
                                                        <AvatarFallback className="text-background">HI</AvatarFallback>
                                                    </Avatar>
                                                )}
                                                    {isCurrentUser && (
                                                        <div
                                                            className="self-stretch shrink-0 size-10 flex h-full items-center justify-center group"
                                                        >
                                                            {/*<Button*/}
                                                            {/*    size={"icon"}*/}
                                                            {/*    className={`*/}
                                                            {/*    size-fit p-[6px] bg-foreground border rounded-full*/}
                                                            {/*    hidden*/}
                                                            {/*    group-hover:flex */}
                                                            {/*    ${activeMessageId === message.id && 'flex'}*/}
                                                            {/*`}*/}
                                                            {/*                                                        >*/}
                                                            {/*    <Trash className="text-background size-4" />*/}
                                                            {/*</Button>*/}
                                                        </div>

                                                    )}
                                                    <div
                                                        className={`p-[10px] rounded-md border flex flex-col gap-[4px] ${
                                                            isCurrentUser
                                                                ? "bg-foreground text-background"
                                                                : "bg-background  text-foreground"
                                                        }`}
                                                    >
                                                        {!isCurrentUser && isGroup &&
                                                            <p className="text-sm font-[500]">{message.name}</p>}
                                                        {
                                                            message.reply &&
                                                            <Card variant={isCurrentUser ? "revert" : "default"}
                                                                  className={`w-full flex-1 rounded-md gap-1 p-2 shadow-none border-l-6 border-foreground ${isCurrentUser && "border-background"}`}>
                                                                <div className={"flex justify-between items-center w-full gap-2"}>
                                                                    <p className="text-sm font-[500] ">{message.reply.name}</p>
                                                                </div>
                                                                <p className="text-sm">
                                                                    {message.reply.message}
                                                                </p>
                                                            </Card>
                                                        }
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
                                                    {!isCurrentUser && (
                                                        <div className="self-stretch shrink-0 size-10 flex h-full items-center justify-center">
                                                            <Button
                                                                variant={"ghost"}
                                                                size={"icon"}
                                                                className={`
                                                                size-fit p-2 bg-background border rounded-full
                                                                hidden
                                                                group-hover:flex 
                                                                ${activeMessageId === message.id && 'flex'}
                                                            `}
                                                                onClick={() =>
                                                                    setReplyTo({
                                                                        id: message.id,
                                                                        name: message.name,
                                                                        message: message.text
                                                                    })
                                                                }
                                                            >
                                                                <Reply className="text-foreground size-4"/>
                                                            </Button>

                                                        </div>
                                                    )}
                                            </div>
                                        </div>

                                    );
                                })}
                            </div>
                        </div>
                    </main>


                    <footer className=" mx-auto px-2 pb-2 min-h-[63px] gap-2 bg- w-full flex flex-col items-start">

                        <div
                            className="flex items-center  outline-1 dark:outline-[#212224] outline-[#e4e4e7] z-50 rounded-md gap-2 p-2 h-full bg-background w-full">
                            <div className={"flex flex-col  w-full gap-2"}>
                                {replyTo && (<div className={"flex justify-between items-center w-full gap-2 "}>

                                        <Card className={"w-full flex-1 rounded-md gap-1 p-2 shadow-none border-l-6 border-foreground"}>
                                            <div className={"flex justify-between items-center w-full gap-2"}>
                                                <p className="text-sm font-[500]">Reply to {replyTo.name}</p>
                                                <X className="size-4 hover:cursor-pointer" onClick={() => setReplyTo(null)} />
                                            </div>
                                            <p className="text-sm">{replyTo.message}</p>
                                        </Card>



                                </div>)}
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
                                            ...(replyTo && {
                                                reply: {
                                                    id: replyTo.id,
                                                    name: replyTo.name,
                                                    message: replyTo.message
                                                }
                                            })
                                        };

                                        setMessages((prev) => [...prev, newMessage]);
                                        setMessage("");
                                        setReplyTo(null);


                                        if (textareaRef.current) {
                                            textareaRef.current.value = "";
                                            textareaRef.current.focus();
                                        }

                                    }}>
                                        <SendHorizonal className="size-5" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </SidebarInset>
        </>
    )
}
export default Chat;