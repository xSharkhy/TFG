import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PhaserGame from "./screens/PhaserGame";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import HomeScreen from "./screens/HomeScreen";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Lorem from "./components/Lorem";

const App: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if user is logged in
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);
    return (
        <Router>
            <Header isLoggedIn={isLoggedIn} />
            <main className="container mx-auto">
                <Routes>
                    <Route index path="/" element={<HomeScreen />} />
                    <Route path="/game" element={<PhaserGame />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/signup" element={<SignupForm />} />
                    <Route path="/terms" element={<Lorem />} />
                    <Route path="/cookies" element={<Lorem />} />
                    <Route path="/privacy" element={<Lorem />} />
                    <Route
                        path="*"
                        element={
                            <div className="flex flex-col items-center justify-center h-full text-white py-36 bg-dark-charcoal">
                                <h1 className="mb-16 text-6xl font-bold text-center">
                                    ...Oops!
                                </h1>
                                <h2 className="text-2xl font-bold text-center">
                                    Page not found
                                </h2>
                            </div>
                        }
                    />
                </Routes>
            </main>
            <Footer />
        </Router>
    );
};

export default App;
