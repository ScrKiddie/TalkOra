import './App.css';
import { ThemeProvider } from "@/components/theme-provider";
import Chat from "@/pages/chat";
import Login from "@/pages/login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
    return (
        <ThemeProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Chat/>} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
