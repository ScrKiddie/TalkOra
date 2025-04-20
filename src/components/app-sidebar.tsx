import * as React from "react"
import { NavChat } from "@/components/nav-chat.tsx"
import { NavHeader } from "@/components/nav-header.tsx"
import {
  Sidebar,
  SidebarContent, SidebarFooter,
  SidebarHeader
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

const current = {
    name: "Hilmi Raif",
    avatar: "https://images.freeimages.com/images/large-previews/d1f/lady-avatar-1632967.jpg?fmt=webp&h=350",
    email: "hilmiraif@gmail.com",
}

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
          <NavFooter current={current} />
      </SidebarFooter>
        {/*<SidebarRail />*/}
    </Sidebar>
  )
}
