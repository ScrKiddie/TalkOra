import {AppSidebar} from "@/components/app-sidebar.tsx";
import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar.tsx";
import {ModeToggle} from "@/components/mode-toggle.tsx";

const Chat = () => {
  return (
      <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
              <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                  <div className="flex gap-2 px-4 w-full justify-between items-center">
                      <SidebarTrigger className="-ml-1" />
                      <ModeToggle></ModeToggle>
                  </div>
              </header>
              <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                  <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
              </div>
          </SidebarInset>
      </SidebarProvider>
  )
}
export default Chat;