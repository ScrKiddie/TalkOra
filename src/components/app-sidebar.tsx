import * as React from "react"
import { NavChat } from "@/components/nav-chat.tsx"
import { NavHeader } from "@/components/nav-header.tsx"
import {
  Sidebar,
  SidebarContent, SidebarGroupLabel,
  SidebarHeader, SidebarInput,
  SidebarRail,
} from "@/components/ui/sidebar"


const chats = [
  {
    name: "Hilmi Raif",
    message: "Halo kita ada melakukan sesuatu",
    avatar: "/avatars/hilmi.jpg",
  },
  {
    name: "Salsabila Anindya",
    message: "Tugas sudah selesai kak",
    avatar: "/avatars/salsa.jpg",
  },
  {
    name: "Aditya Nugraha",
    message: "Besok kita meeting ya",
    avatar: "/avatars/adit.jpg",
  },
]


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="border-b">
        <NavHeader />
        {/*<SidebarInput placeholder="Type to search..." />*/}
      </SidebarHeader>
      <SidebarContent>
        <NavChat chats={chats} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
