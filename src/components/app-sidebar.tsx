import * as React from "react"
import { NavChat } from "@/components/nav-chat.tsx"
import { NavHeader } from "@/components/nav-header.tsx"
import {
  Sidebar,
  SidebarContent, SidebarFooter, SidebarGroupLabel,
  SidebarHeader, SidebarInput,
  SidebarRail,
} from "@/components/ui/sidebar"
import {NavFooter} from "@/components/nav-footer.tsx";


const chats = [
  {
    name: "Steven William",
    message: "Wah seru! Aku sih masih belum pasti, tapi pengen coba hiking kalau cuacanya oke.",
    avatar: "https://images.freeimages.com/images/large-previews/fdd/man-avatar-1632964.jpg?fmt=webp&h=350",
  },
  {
    name: "Salsabila Anindya",
    message: "Tugas sudah selesai kak",
    avatar: "https://images.freeimages.com/images/large-previews/971/basic-shape-avatar-1632968.jpg?fmt=webp&h=350",
  },
  {
    name: "Aditya Nugraha",
    message: "Besok kita meeting ya",
    avatar: "https://images.freeimages.com/images/large-previews/023/geek-avatar-1632962.jpg?fmt=webp&h=350",
  },
]


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className={"bg-background"} collapsible="icon" {...props}>
      <SidebarHeader className="border-b bg-background">
        <NavHeader />
        {/*<SidebarInput placeholder="Type to search..." />*/}
      </SidebarHeader>
      <SidebarContent className="bg-background">
        <NavChat chats={chats} />
      </SidebarContent>

      <SidebarFooter className="border-t bg-background">
          <NavFooter />
      </SidebarFooter>
        <SidebarRail />
    </Sidebar>
  )
}
