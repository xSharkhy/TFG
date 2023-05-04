import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PhaserGame from "./PhaserGame";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import HomeScreen from "./screens/HomeScreen";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Router>
                <Header isLoggedIn={false} />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<HomeScreen />} />
                        <Route path="/game" element={<PhaserGame />} />
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/signup" element={<SignupForm />} />
                    </Routes>
                </main>
                <Footer />
            </Router>
        </div>
    );
};

export default App;
