import {Attachment} from "@/types/message-types.tsx";
import {
    Download,
    FileArchiveIcon,
    FileAudioIcon,
    FileCodeIcon,
    FileCogIcon,
    FileIcon,
    FileTextIcon,
    FileVideoIcon, X
} from "lucide-react";
import {Card} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";

function formatBytes(bytes: number) {
    if (bytes === 0) return "0 B";
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / 1024 ** i).toFixed(i ? 1 : 0)} ${sizes[i]}`;
}

function getFileIconFromData(file: Attachment) {
    const extension = file.name.split(".").pop()?.toLowerCase() ?? "";

    if (file.type.startsWith("video/")) {
        return <FileVideoIcon size={28}/>;
    }

    if (file.type.startsWith("audio/")) {
        return <FileAudioIcon size={28}/>;
    }

    if (
        file.type.startsWith("text/") ||
        ["txt", "md", "rtf", "pdf"].includes(extension)
    ) {
        return <FileTextIcon size={28}/>;
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
        return <FileCodeIcon size={28}/>;
    }

    if (["zip", "rar", "7z", "tar", "gz", "bz2"].includes(extension)) {
        return <FileArchiveIcon/>;
    }

    if (
        ["exe", "msi", "app", "apk", "deb", "rpm"].includes(extension) ||
        file.type.startsWith("application/")
    ) {
        return <FileCogIcon/>;
    }

    return <FileIcon size={28}/>;
}


interface FilePreviewProps {
    file: Attachment;
    isSender?: boolean;
    isEditMode?: boolean;
    onClick: () => void;
}

const AttachmentCard: React.FC<FilePreviewProps> = ({file, isSender = true, isEditMode = false, onClick}) => {
    if (!file) return null;

    const isImage = file.type?.startsWith("image/");
    if (isImage && !isEditMode) {
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
            variant={isSender ? "revert" : "default"}
            className={`gap-[10px] h-fit-fit w-full p-3 rounded-md shadow-none flex justify-between flex-row items-center ${isSender ? '' : 'bg-background border'}`}
        >
            <div className="flex items-center justify-start gap-[10px] w-fit">
                {isImage ? (
                    <div
                        className={`size-[40px] flex items-center justify-center rounded-md ${isSender ? 'bg-[#17171a] dark:bg-[#f9f9f9]' : 'dark:bg-[#17171a] bg-[#f9f9f9]'}`}>
                        <img
                            src={file.src}
                            alt={file.name}
                            className="size-full rounded object-cover"
                        />
                    </div>
                ) : (
                    <div
                        className={`size-[40px] flex items-center justify-center rounded-md ${isSender ? 'bg-[#17171a] dark:bg-[#f9f9f9]' : 'dark:bg-[#17171a] bg-[#f9f9f9]'}`}>
                        {getFileIconFromData(file)}
                    </div>
                )}
                <div className={`flex flex-1 flex-col ${isSender ? 'text-background' : 'text-foreground'}`}>
                    <p className="line-clamp-1 font-medium text-sm">{file.name}</p>
                    <p className={`text-muted-foreground truncate text-xs`}>{formatBytes(file.size)}</p>
                </div>
            </div>
            <Button
                className={`size-7 rounded-md size-[28px] border-none`}
                variant={isSender ? "ghostRevert" : "ghost"}
                size="icon"
                onClick={onClick}
            >
                {isEditMode ? (
                    <X className={` ${isSender ? 'text-background' : 'text-foreground'}`}/>
                ) : (
                    <Download className={` ${isSender ? 'text-background' : 'text-foreground'}`}/>
                )}
            </Button>
        </Card>
    );
};

export default AttachmentCard;