import {AppSidebar} from "@/components/app-sidebar.tsx";
import {SidebarInset, SidebarMenuButton, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar.tsx";
import {ModeToggle} from "@/components/mode-toggle.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Mic, Paperclip, Send, SendHorizonal, Smile} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@radix-ui/react-avatar";
import {Textarea} from "@/components/ui/textarea.tsx";
import {useState} from "react";

const Chat = () => {
    const currentUserId = 1;

    const [messages] = useState([
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

    return (
      <SidebarProvider>
          <AppSidebar />
          <SidebarInset className={"break-all"}>
              <header className="sticky outline-1 dark:outline-[#212224] outline-[#e4e4e7] top-0  bg-background flex h-[63px] shrink-0 items-center gap-2">
                  <div className="flex gap-2 px-4 w-full justify-between items-center ">

                      <div className="flex items-center justify-center gap-2">
                          <SidebarTrigger className={`mr-1`}/>
                          <Avatar className="shrink-0 size-10 shadow-sm rounded-full overflow-hidden">
                              <AvatarImage src="https://images.freeimages.com/images/large-previews/fdd/man-avatar-1632964.jpg?fmt=webp&h=500" className="object-cover w-full h-full" />
                              <AvatarFallback className="text-background">HI</AvatarFallback>
                          </Avatar>
                          <div className="grid flex-1 text-left text-sm leading-tight ">
                              <span className="truncate font-medium">Steven William</span>
                              <span className="truncate text-xs text-muted-foreground">
                              Active 2 mins ago
                            </span>
                          </div>
                      </div>
                      <ModeToggle />

                  </div>
              </header>

              <div className="flex flex-1 flex-col gap-4 h-screen">
                  <div className="h-full flex flex-col justify-end  bg-muted/60   shadow-sm">
                      <div className="flex-1 overflow-y-auto p-2 space-y-2 flex justify-end flex-col " id="chat-container">
                          {messages.map((message) => {
                              const isCurrentUser = message.userId === currentUserId;
                              return (
                                  <div
                                      key={message.id}
                                      className={`flex gap-2 items-end  ${
                                          isCurrentUser ? "justify-end" : "justify-start"
                                      }`}
                                  >
                                      {/*{!isCurrentUser && (*/}
                                      {/*    <Avatar className="shrink-0 w-10 h-10 shadow-sm rounded-full bg-primary flex justify-center items-center overflow-hidden self-end">*/}
                                      {/*        <AvatarImage src={message.avatar} className="object-cover w-full h-full" />*/}
                                      {/*        <AvatarFallback className="text-background">HI</AvatarFallback>*/}
                                      {/*    </Avatar>*/}
                                      {/*)}*/}
                                      {isCurrentUser && ( <div className="invisible shrink-0 w-10 h-10"></div>)}
                                      <div
                                          className={`p-[10px] rounded-md shadow-sm border  ${
                                              isCurrentUser
                                                  ? "bg-primary text-primary-foreground"
                                                  : "bg-background text-foreground"
                                          }`}
                                      >
                                          <p className="text-sm">{message.text}</p>
                                          <p className={`text-xs line mt-2 leading-none text-right ${isCurrentUser ? "text-background":"text-primary"}`}>{message.time}</p>
                                      </div>
                                      {!isCurrentUser && ( <div className="invisible shrink-0 w-10 "></div>)}
                                  </div>
                              );
                          })}
                      </div>

                      <div className="sticky bottom-0 bg-none px-2 min-h-[63px] outline-1 dark:outline-[#212224] outline-[#e4e4e7] bg-background">
                          <div className="flex items-center gap-2 h-full">
                              <div>
                                  <Button size="icon" variant="ghost">
                                      <Paperclip className="size-5" />
                                  </Button>
                                  <Button size="icon" variant="ghost">
                                      <Smile className="size-5" />
                                  </Button>
                              </div>
                              <Textarea
                                  className="resize-none flex-1 max-h-12 min-h-8 break-all"
                              />
                              <Button size="icon" variant="ghost">
                                  <SendHorizonal className="size-5" />
                              </Button>
                          </div>
                      </div>

                  </div>
              </div>
          </SidebarInset>
      </SidebarProvider>
  )
}
export default Chat;