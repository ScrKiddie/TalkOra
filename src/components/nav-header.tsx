import {
    ChevronsUpDown, Moon, Plus,
    SquarePen, Sun, UserRound,
    UsersRound
} from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
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
                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    >
                        <div
                            className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                            <Logo mode={theme} width={28} height={28}/>
                        </div>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-medium">TalkOra</span>
                            <span className="truncate text-xs">Enjoy your talk</span>
                        </div>
                        <Button className={`size-8 flex justify-center items-center`} variant="outline" size="icon" >
                            <SquarePen/>
                        </Button>
                    </SidebarMenuButton>

                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
