import {
    MailPlus, MessageCirclePlus
} from "lucide-react"

import {
    DropdownMenu,
} from "@/components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Logo from "@/components/logo.tsx";
import {useTheme} from "@/components/theme-provider.tsx";
import {Button} from "@/components/ui/button.tsx";

export function NavHeader() {
    const {theme} = useTheme()
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <SidebarMenuButton
                        size="lg"
                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground gap-2 hover:bg-transparent active:bg-transparent hover:text-inherit"
                    >
                    <div
                            className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                            <Logo mode={theme} width={30} height={30}/>
                        </div>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-medium ">TalkOra</span>
                            <span className="truncate text-xs">Enjoy your talk</span>
                        </div>
                        <Button className={`size-8`} variant="outline" size="icon">
                            <MailPlus/>
                        </Button>
                        <Button className={`size-8 flex justify-center items-center`} variant="outline" size="icon" >
                            <MessageCirclePlus/>
                        </Button>
                    </SidebarMenuButton>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
