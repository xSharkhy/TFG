import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import {
    Header,
    Footer,
    LoginForm,
    SignupForm,
    Lorem,
    ApplyForm,
    ApplyIndex,
    ApplyShow,
} from "./components";
import PhaserGame from "./screens/PhaserGame";
import HomeScreen from "./screens/HomeScreen";
import AboutUs from "./screens/AboutUs";
import MembersIndex from "./components/members/MembersIndex";
import MembersShow from "./components/members/MembersShow";
import BlogCreate from "./components/forms/BlogCreate";
import BlogIndex from "./components/blog/BlogIndex";
import BlogShow from "./components/blog/BlogShow";

const App: React.FC = () => {
    const myId = localStorage.getItem("id");
    const isLoggedIn = localStorage.getItem("token") != undefined;
    const isAdmin = localStorage.getItem("role") == "admin";

    return (
        <Router>
            <Header isLoggedIn={isLoggedIn} />
            <main className="container mx-auto">
                <Routes>
                    <Route index path="/" element={<HomeScreen />} />
                    <Route path="/user/index" element={<MembersIndex />} />

                    <Route path="/blog" element={<BlogIndex />} />
                    {/* <Route path="/forum" element={<ForumIndex />} /> */}

                    <Route path="/jobApplication" element={<ApplyForm />} />
                    {isLoggedIn ? (
                        <>
                            <Route
                                path="/blog/show/:id"
                                element={<BlogShow />}
                            />

                            <Route
                                path="/account"
                                element={<Navigate to={`/user/show/${myId}`} />}
                            />
                            <Route path="/game" element={<PhaserGame />} />
                            <Route
                                path="/user/show/:id"
                                element={<MembersShow />}
                            />

                            <Route
                                path="/login"
                                element={<Navigate to="/" />}
                            />
                            <Route
                                path="/register"
                                element={<Navigate to="/" />}
                            />
                            {isAdmin && (
                                <>
                                    <Route
                                        path="/jobApplication/index"
                                        element={<ApplyIndex />}
                                    />
                                    <Route
                                        path="/jobApplication/show/:id"
                                        element={<ApplyShow />}
                                    />
                                    <Route
                                        path="/blog/create"
                                        element={<BlogCreate />}
                                    />
                                </>
                            )}
                        </>
                    ) : (
                        <>
                            <Route path="/game" element={<Navigate to="/" />} />
                            <Route path="/login" element={<LoginForm />} />
                            <Route path="/register" element={<SignupForm />} />
                        </>
                    )}
                    <Route path="/about" element={<AboutUs />} />
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
