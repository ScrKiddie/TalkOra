import './App.css';
import { ThemeProvider } from "@/components/theme-provider";
import Login from "@/pages/login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {SidebarProvider} from "@/components/ui/sidebar.tsx";
import ChatRoom from "@/pages/chat-room.tsx";
import {AppSidebar} from "@/components/app-sidebar.tsx";

function App() {
    return (
        <SidebarProvider>
        <ThemeProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<>
                        <AppSidebar/><ChatRoom/></>} />
                </Routes>
            </Router>
        </ThemeProvider>
            </SidebarProvider>
    );
}

export default App;
