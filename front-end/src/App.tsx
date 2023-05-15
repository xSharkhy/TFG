import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header, Footer, LoginForm, SignupForm, Lorem } from "./components";
import PhaserGame from "./screens/PhaserGame";
import HomeScreen from "./screens/HomeScreen";
import { useAuth } from "./hooks/useAuth";

const App: React.FC = () => {
    const isLoggedIn = useAuth();

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
