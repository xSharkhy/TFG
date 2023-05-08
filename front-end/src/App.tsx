import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PhaserGame from "./screens/PhaserGame";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import HomeScreen from "./screens/HomeScreen";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Lorem from "./components/Lorem";

const App: React.FC = () => {
    return (
        <Router>
            <Header isLoggedIn={false} />
            <main className="container mx-auto">
                <Routes>
                    <Route path="/" element={<HomeScreen />} />
                    <Route path="/game" element={<PhaserGame />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/signup" element={<SignupForm />} />
                    <Route path="/terms" element={<Lorem />} />
                </Routes>
            </main>
            <Footer />
        </Router>
    );
};

export default App;
