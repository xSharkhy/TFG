import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import { Header, Footer, LoginForm, SignupForm, Lorem } from "./components";
import PhaserGame from "./screens/PhaserGame";
import HomeScreen from "./screens/HomeScreen";
import useAuth from "./hooks/useAuth";

const App: React.FC = () => {
    const { authData, loading } = useAuth();

    return (
        <Router>
            <Header isLoggedIn={authData.loggedIn} />
            <main className="container mx-auto">
                <Routes>
                    <Route index path="/" element={<HomeScreen />} />
                    {authData.loggedIn ? (
                        <>
                            {/* <Route path="/account" element={<UserProfile />} /> */}
                            <Route path="/game" element={<PhaserGame />} />
                            <Route
                                path="/login"
                                element={<Navigate to="/" />}
                            />
                            <Route
                                path="/signup"
                                element={<Navigate to="/" />}
                            />
                        </>
                    ) : (
                        <>
                            <Route
                                path="/game"
                                element={<Navigate to="/login" />}
                            />
                            <Route path="/login" element={<LoginForm />} />
                            <Route path="/signup" element={<SignupForm />} />
                        </>
                    )}
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
