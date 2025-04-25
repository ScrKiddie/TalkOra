import {AppSidebar} from "@/components/app-sidebar.tsx";
import {SidebarInset} from "@/components/ui/sidebar.tsx";
import {Button} from "@/components/ui/button.tsx";
import {
    CheckCheck, Download,
    DownloadCloud,
    FileArchiveIcon,
    FileAudioIcon,
    FileCodeIcon,
    FileCogIcon,
    FileIcon,
    FileTextIcon,
    FileVideoIcon,
    LoaderCircle,
    Paperclip,
    Pen,
    Reply,
    SendHorizonal,
    Smile,
    SquarePen,
    Trash2,
    Upload,
    X
} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@radix-ui/react-avatar";
import {Textarea} from "@/components/ui/textarea.tsx";
import {useEffect, useRef, useState} from "react";
import {Card} from "@/components/ui/card.tsx";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog.tsx";
import ChatHeader from "@/components/chat-header.tsx";
import * as FileUpload from "@/components/ui/file-upload";
import {
    FileUploadDropzone,
    FileUploadItem, FileUploadItemDelete,
    FileUploadItemMetadata,
    FileUploadItemPreview,
    FileUploadList,
    FileUploadTrigger
} from "@/components/ui/file-upload";
import * as React from "react";
import {toast, Toaster} from "sonner";
import {GridBackgrounds} from "@/pages/login.tsx";


interface Reply {
    name: string;
    text: string;
}

interface Attachment {
    src: string;
    name: string;
    type: string;
    size: string;
}

interface Message {
    id: number;
    userId: number;
    name: string;
    avatar: string;
    text: string;
    time: string;
    replyTo?: Reply;
    attachment?: Attachment[];
    updatedAt: number;
}

interface Chat {
    name: string;
    avatarUrl: string;
    lastSeen: string;
}

const Chat = () => {
    const current = {
        id: 1,
        name: "Hilmi Raif",
    }
    const [isGroup] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [isLoadingMessage] = useState(false);

    const chat: Chat = {
        name: 'Steven William',
        avatarUrl: 'https://images.freeimages.com/images/large-previews/fdd/man-avatar-1632964.jpg?fmt=webp&h=500',
        lastSeen: 'Active 2 mins ago',
    }

    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            userId: 2,
            name: "Steven William",
            avatar: "https://images.freeimages.com/images/large-previews/fdd/man-avatar-1632964.jpg?fmt=webp&h=350",
            text: "Halo! Ini pesan dummy dari user 😁",
            time: "10:06 AM",
            replyTo: {
                name: "Steven William",
                text: "Halo! Ini pesan dummy dari user 😁",
            },
            attachment:[{
                src:"https://images.freeimages.com/images/large-previews/d1f/lady-avatar-1632967.jpg?fmt=webp&h=350",
                name:"chat.cpp",
                type:"image/jpg",
                size:"1024",
            },{
                src:"https://images.freeimages.com/images/large-previews/d1f/lady-avatar-1632967.jpg?fmt=webp&h=350",
                name:"chat.cpp",
                type:"",
                size:"1024",
            },{
                src:"https://images.freeimages.com/images/large-previews/d1f/lady-avatar-1632967.jpg?fmt=webp&h=350",
                name:"chat.cpp",
                type:"",
                size:"1024",
            }],
            updatedAt: 0
        },
        {
            id: 2,
            userId: 1,
            name: "You",
            avatar: "https://images.freeimages.com/images/large-previews/d1f/lady-avatar-1632967.jpg?fmt=webp&h=350",
            text: "Hai Steven! Apa kabar? 😄",
            time: "10:06 AM",
            replyTo: {
                name: "Steven William",
                text: "Halo! Ini pesan dummy dari user 😁",
            },
            attachment:[{
                src:"https://images.freeimages.com/images/large-previews/d1f/lady-avatar-1632967.jpg?fmt=webp&h=350",
                name:"chat.cpp",
                type:"",
                size:"1024",
            },{
                src:"https://images.freeimages.com/images/large-previews/d1f/lady-avatar-1632967.jpg?fmt=webp&h=350",
                name:"chat.cpp",
                type:"",
                size:"1024",
            }],
            updatedAt: 10000
        },
    ]);

    const [message, setMessage] = useState("");
    const [activeMessageId, setActiveMessageId] = useState<number | null>(null);
    const handleClick = (messageId: number) => {
        setActiveMessageId(messageId);
    };

    const [replyTo, setReplyTo] = useState<null | { id: number; name: string; text: string }>(null);
    const [editMessage, setEditMessage] = useState<null | { id: number; text: string }>(null);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [messageToDelete, setMessageToDelete] = useState<number | null>(null);

    const messageRefs = useRef<Record<number, HTMLDivElement | null>>({});
    const [attachmentMode, setAttachmentMode] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (showDeleteModal) return;
            if (activeMessageId !== null) {
                const ref = messageRefs.current[activeMessageId];
                if (ref && !ref.contains(event.target as Node)) {
                    setActiveMessageId(null);
                }
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [activeMessageId, showDeleteModal]);

    const handleDeleteMessage = () => {
        if (messageToDelete !== null) {
            if (messageToDelete == editMessage?.id) {
                setEditMessage(null);
                if (textareaRef.current) {
                    textareaRef.current.value = "";
                    textareaRef.current.focus();
                }
            }
            if (messageToDelete == replyTo?.id) {
                setReplyTo(null);
                if (textareaRef.current) {
                    textareaRef.current.value = "";
                    textareaRef.current.focus();
                }
            }
            setMessages((prev) => prev.filter((msg) => msg.id !== messageToDelete));
            setShowDeleteModal(false);
            setMessageToDelete(null);
        }
    };

    const [files, setFiles] = React.useState<File[]>([]);

    const onFileValidate = React.useCallback(
        (file: File): string | null => {
            // if (files.length >= 2) {
            //     return "You can only upload up to 2 files";
            // }

            // Validate file type (only images)
            // if (!file.type.startsWith("image/")) {
            //     return "Only image files are allowed";
            // }
            //
            // const MAX_SIZE = 2 * 1024 * 1024; // 2MB
            // if (file.size > MAX_SIZE) {
            //     return `File size must be less than ${MAX_SIZE / (1024 * 1024)}MB`;
            // }

            return null;
        },
        [files],
    );

    const onFileReject = React.useCallback((file: File, message: string) => {
        toast(message, {
            description: `"${file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name}" has been rejected`,
        });
    }, []);

    function getFileIconFromData(file: Attachment) {
        const extension = file.name.split(".").pop()?.toLowerCase() ?? "";

        if (file.type.startsWith("video/")) {
            return <FileVideoIcon />;
        }

        if (file.type.startsWith("audio/")) {
            return <FileAudioIcon />;
        }

        if (
            file.type.startsWith("text/") ||
            ["txt", "md", "rtf", "pdf"].includes(extension)
        ) {
            return <FileTextIcon />;
        }

        if (
            [
                "html",
                "css",
                "js",
                "jsx",
                "ts",
                "tsx",
                "json",
                "xml",
                "php",
                "py",
                "rb",
                "java",
                "c",
                "cpp",
                "cs",
            ].includes(extension)
        ) {
            return <FileCodeIcon />;
        }

        if (["zip", "rar", "7z", "tar", "gz", "bz2"].includes(extension)) {
            return <FileArchiveIcon />;
        }

        if (
            ["exe", "msi", "app", "apk", "deb", "rpm"].includes(extension) ||
            file.type.startsWith("application/")
        ) {
            return <FileCogIcon />;
        }

        return <FileIcon />;
    }


    function renderFilePreview(file: Attachment, isSender:boolean=true) {
        if (!file) return null;

        const isImage = file.type?.startsWith("image/");

        if (isImage) {
            return (
                <img
                    src={file.src}
                    alt={file.name}
                    className="size-full rounded object-cover"
                />
            );
        }

        return (
            <Card
                variant={isSender ? "revert" : undefined}
                className={`h-fit-fit w-full p-3 rounded-md shadow-none flex justify-between flex-row items-center ${isSender ? '' : 'bg-background border'}`}
            >
                <div className="flex items-center justify-start gap-2 w-fit">
                    <div className={`w-fit p-2 rounded-md ${isSender ? 'bg-[#17171a] dark:bg-[#f9f9f9]' : 'dark:bg-[#17171a] bg-[#f9f9f9]'}`}>
                        {getFileIconFromData(file)}
                    </div>
                    <div className={`flex flex-col text-sm ${isSender ? 'text-background' : 'text-foreground'}`}>
                        <p className="font-[450]">{file.name}</p>
                        <p className={`text-xs ${isSender ? 'dark:text-[#717883] text-[#969fa9]' : 'text-[#717883] dark:text-[#969fa9]'}`}>{file.size} KB</p>
                    </div>
                </div>
                <Button
                    className={`rounded-md size-fit p-2 ${isSender ? 'bg-foreground border dark:border-[#e4e4e7] border-[#212224]' : 'bg-background border'}`}
                    variant={isSender ? undefined : "ghost"}
                    size="icon"
                >
                    <Download className={`size-4 ${isSender ? 'text-background' : 'text-foreground'}`} />
                </Button>
            </Card>
        );

    }


    return (
        <>
            <Toaster />
            <AppSidebar/>
            <SidebarInset className={"break-all overflow-y-visible"}>
                <div className="h-screen overflow-hidden flex flex-col">
                    <ChatHeader chat={chat}/>
                    <main className="flex flex-col gap-4 flex-1 px-2 overflow-auto">
                        <div className="flex flex-col flex-1 bg-none">
                            <div className="flex-1 p-2 space-y-2 flex justify-end flex-col " id="chat-container">
                                {messages.map((message) => {
                                    const isCurrentUser = message.userId === current.id;
                                    return (
                                        <div key={message.id}
                                             className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
                                            <div ref={(el) => (messageRefs.current[message.id] = el)}
                                                 className="group flex gap-2 items-end"
                                                 onClick={() => handleClick(message.id)}>
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
                                                        className="self-stretch shrink-0 size-14 flex h-full items-center justify-center group">
                                                        <Button
                                                            size={"icon"}
                                                            className={`size-fit p-[6px] bg-foreground border rounded-full hidden group-hover:flex ${activeMessageId === message.id && 'flex'}`}
                                                            onClick={() => {
                                                                if (editMessage){
                                                                    setEditMessage(null);
                                                                    setMessage("")
                                                                    if (textareaRef.current) {
                                                                        textareaRef.current.value = "";
                                                                        textareaRef.current.focus();
                                                                    }}
                                                                setReplyTo({
                                                                    id: message.id,
                                                                    name: message.name,
                                                                    text: message.text
                                                                });
                                                            }}
                                                        >
                                                            <Reply className="text-background size-4"/>
                                                        </Button>
                                                        <div className="group flex flex-col gap-1 pr-1 items-center ">
                                                            <Button
                                                                size={"icon"}
                                                                className={`size-fit p-[6px] bg-foreground border rounded-full hidden group-hover:flex ${activeMessageId === message.id && 'flex'}`}
                                                                onClick={() => {
                                                                    setFiles([])
                                                                    setAttachmentMode(false)
                                                                    setReplyTo(null);
                                                                    setMessage("")
                                                                    setEditMessage({
                                                                        id: message.id,
                                                                        text: message.text
                                                                    });
                                                                    setMessage(message.text);
                                                                    if (textareaRef.current) {
                                                                        textareaRef.current.value = message.text;
                                                                        textareaRef.current.focus();
                                                                    }
                                                                }}
                                                            >
                                                                <Pen className="text-background size-4"/>
                                                            </Button>
                                                            <Button
                                                                size={"icon"}
                                                                className={`size-fit p-[6px] bg-foreground border rounded-full hidden group-hover:flex ${activeMessageId === message.id && 'flex'}`}
                                                                onClick={() => {
                                                                    setMessageToDelete(message.id);
                                                                    setShowDeleteModal(true);
                                                                }}
                                                            >
                                                                <Trash2 className="text-background size-4"/>
                                                            </Button>
                                                        </div>
                                                    </div>
                                                )}
                                                <div
                                                    className={`p-[10px] rounded-md border flex flex-col gap-2 ${isCurrentUser ? "bg-foreground text-background" : "bg-background  text-foreground"}`}>
                                                    {!isCurrentUser && isGroup &&
                                                        <p className="text-sm font-[500]">{message.name}</p>}
                                                    {message.replyTo &&
                                                        <Card variant={isCurrentUser ? "revert" : "default"}
                                                              className={`w-full flex-1 rounded-md gap-1 p-2 shadow-none border-l-6 `}>
                                                            <div
                                                                className={"flex justify-between items-center w-full gap-2"}>
                                                                <p className="text-sm font-[500] ">{message.replyTo.name}</p>
                                                            </div>
                                                            <p className="text-sm">
                                                                {message.replyTo.text}
                                                            </p>
                                                        </Card>
                                                    }
                                                    {message.attachment &&
                                                        message.attachment.map((item, index) => (
                                                            item && <div key={index}>
                                                                {renderFilePreview(item,isCurrentUser)}
                                                            </div>
                                                        ))
                                                    }

                                                    <p className="text-sm">{message.text}</p>
                                                    <div className="flex justify-end w-full items-center gap-1">
                                                        {message.updatedAt != 0 && <Pen className="size-3"/>}
                                                        <p className={`text-xs line  text-right ${isCurrentUser ? "text-background" : "text-primary"}`}>{message.time}</p>
                                                        {isCurrentUser ? (isLoadingMessage ?
                                                            <LoaderCircle className="size-4"/> :
                                                            <CheckCheck className="size-4"/>) : ""}
                                                    </div>
                                                </div>
                                                {!isCurrentUser && (
                                                    <div
                                                        className="self-stretch shrink-0 size-10 flex h-full items-center justify-center">
                                                        <Button
                                                            variant={"ghost"}
                                                            size={"icon"}
                                                            className={`size-fit p-2 bg-background border rounded-full hidden group-hover:flex ${activeMessageId === message.id && 'flex'}`}
                                                            onClick={() => {
                                                                if (editMessage){
                                                                    setEditMessage(null);
                                                                    setMessage("")
                                                                    if (textareaRef.current) {
                                                                        textareaRef.current.value = "";
                                                                        textareaRef.current.focus();
                                                                }}
                                                                setReplyTo({
                                                                    id: message.id,
                                                                    name: message.name,
                                                                    text: message.text
                                                                });
                                                            }}>
                                                            <Reply className="text-foreground size-4"/>
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </main>


                    <footer className=" mx-auto px-2 pb-2 min-h-[63px] gap-2 w-full flex flex-col items-start ">
                        <div
                            className="flex items-center  outline-1 dark:outline-[#212224] outline-[#e4e4e7] z-50 rounded-md gap-2 p-2 h-full bg-background w-full ">
                            <div className={"flex flex-col  w-full gap-2"}>
                                {(replyTo || editMessage) && (
                                    <div className="flex justify-between items-center w-full gap-2">
                                        <Card className="w-full flex-1 rounded-md gap-1 p-2 shadow-none bg-background ">
                                            <div className="flex justify-between items-center w-full gap-2">
                                                <p className="text-sm font-[500]">{replyTo ? `Reply to ${replyTo.name}` : 'Edit Message'}</p>
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="size-6"
                                                    onClick={() => {
                                                        if (replyTo) {
                                                            setReplyTo(null)
                                                        } else if(editMessage) {
                                                            setMessage("")
                                                            setEditMessage(null)
                                                            if (textareaRef.current) {
                                                                textareaRef.current.value = '';
                                                                textareaRef.current.focus();
                                                            }
                                                        }
                                                    }}
                                                >
                                                    <X className="size-4 hover:cursor-pointer"/>
                                                </Button>
                                            </div>
                                            <p className="text-sm">{replyTo ? replyTo.text : editMessage?.text}</p>
                                        </Card>
                                    </div>
                                )}
                                {attachmentMode && <div className="flex justify-between items-center w-full gap-2">
                                    <FileUpload.Root className={"w-full "}  value={files}
                                                     onValueChange={setFiles}
                                        // onFileValidate={onFileValidate}
                                        // onFileReject={onFileReject}
                                        // accept="image/*"
                                        // maxFiles={2}
                                                     multiple>
                                        <FileUpload.Dropzone >
                                            <div className="flex flex-col items-center gap-1">
                                                <div className="flex items-center justify-center rounded-full border">
                                                    <Upload className="size-6 text-muted-foreground" />
                                                </div>
                                                <p className="font-medium text-sm">Drag & drop files here</p>
                                                <p className="text-muted-foreground text-xs">
                                                    Or click to browse
                                                </p>
                                            </div>
                                            {/*<FileUploadTrigger asChild>*/}
                                            {/*    <Button variant="outline" size="sm" className="mt-2 w-fit">*/}
                                            {/*        Browse files*/}
                                            {/*    </Button>*/}
                                            {/*</FileUploadTrigger>*/}
                                        </FileUpload.Dropzone>
                                        <FileUploadList className={"overflow-auto max-h-[8.7rem] z-[51]"}>
                                            {files.map((file, index) => (
                                                <FileUploadItem key={index} value={file}>
                                                    <FileUploadItemPreview />
                                                    <FileUploadItemMetadata />
                                                    <FileUploadItemDelete asChild>
                                                        <Button variant="ghost" size="icon" className="size-7">
                                                            <X />
                                                        </Button>
                                                    </FileUploadItemDelete>
                                                </FileUploadItem>
                                            ))}
                                        </FileUploadList>
                                        {/*<FileUpload.Clear />*/}
                                    </FileUpload.Root>
                                </div>}
                                <div
                                    className="flex items-center  outline-1 dark:outline-[#212224] outline-[#e4e4e7] z-50 rounded-md gap-2 p-2 h-full bg-background w-full">
                                    <div>
                                        <Button size="icon" variant="ghost" onClick={() => {
                                            setAttachmentMode((prev) => !prev)
                                            if (!attachmentMode){
                                                setFiles([])
                                            }
                                        }}>
                                            {attachmentMode ? <X className="size-5"/> : <Paperclip className="size-5"/>}
                                        </Button>
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
                                        if (editMessage) {
                                            setMessages((prev) =>
                                                prev.map((msg) =>
                                                    msg.id === editMessage.id
                                                        ? { ...msg, text: message, updatedAt: Date.now() }
                                                        : msg
                                                )
                                            );
                                            setEditMessage(null);
                                            setMessage("");
                                            if (textareaRef.current) {
                                                textareaRef.current.value = "";
                                                textareaRef.current.focus();
                                            }
                                            return;
                                        }

                                        const newMessage: Message = {
                                            updatedAt: 0,
                                            id: Math.floor(Math.random() * 1_000_000),
                                            userId: current.id,
                                            name: current.name,
                                            avatar: "https://images.freeimages.com/images/large-previews/d1f/lady-avatar-1632967.jpg?fmt=webp&h=350",
                                            text: message,
                                            time: new Date().toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            }),
                                            ...(replyTo && {
                                                replyTo: {
                                                    id: replyTo.id,
                                                    name: replyTo.name,
                                                    text: replyTo.text
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
                                        setAttachmentMode(false)
                                    }}>
                                        <SendHorizonal className="size-5"/>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </footer>
                    <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
                        <DialogContent className="[&>button]:hidden" onInteractOutside={(e) => e.preventDefault()}>
                            <DialogHeader>
                                <DialogTitle>Do you want to delete this message?</DialogTitle>
                                <DialogDescription>
                                    This will delete it for everyone in this chat.
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <Button variant={"outline"} onClick={() => setShowDeleteModal(false)}>
                                    Cancel
                                </Button>
                                <Button onClick={handleDeleteMessage}>
                                    Delete
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </SidebarInset>
        </>
    )
}
export default Chat;