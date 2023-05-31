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
    ApplyForm,
    ApplyIndex,
    ApplyShow,
    Lorem,
    MembersIndex,
    MembersShow,
    BlogIndex,
    BlogShow,
    BlogCreate,
} from "./components";
import PhaserGame from "./screens/PhaserGame";
import HomeScreen from "./screens/HomeScreen";
import AboutUs from "./screens/AboutUs";
const App: React.FC = () => {
    const {
        id: myId,
        token,
        role,
    } = JSON.parse(localStorage.getItem("authData") || "{}");
    const isLoggedIn = token !== undefined;
    const isAdmin = role === "admin";

    return (
        <Router>
            <Header isLoggedIn={isLoggedIn} />
            <main className="container mx-auto">
                <Routes>
                    <Route index path="/" element={<HomeScreen />} />
                    <Route path="/user">
                        <Route index element={<MembersIndex />} />
                        <Route path="show/:id" element={<MembersShow />} />
                    </Route>
                    <Route path="/blog">
                        <Route index element={<BlogIndex />} />
                        {isLoggedIn && (
                            <Route path="show/:id" element={<BlogShow />} />
                        )}
                        {isAdmin && (
                            <Route path="create" element={<BlogCreate />} />
                        )}
                    </Route>
                    <Route path="/jobApplication">
                        <Route index element={<ApplyForm />} />
                        {isAdmin && (
                            <>
                                <Route path="index" element={<ApplyIndex />} />
                                <Route
                                    path="show/:id"
                                    element={<ApplyShow />}
                                />
                            </>
                        )}
                    </Route>
                    {isLoggedIn ? (
                        <>
                            <Route
                                path="/account"
                                element={<Navigate to={`/user/show/${myId}`} />}
                            />
                            <Route path="/game" element={<PhaserGame />} />
                            <Route
                                path="/login"
                                element={<Navigate to="/" />}
                            />
                            <Route
                                path="/register"
                                element={<Navigate to="/" />}
                            />
                        </>
                    ) : (
                        <>
                            <Route path="/game" element={<LoginForm />} />
                            <Route path="/login" element={<LoginForm />} />
                            <Route path="/register" element={<SignupForm />} />
                        </>
                    )}
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/terms" element={<Lorem />} />
                    <Route path="/cookies" element={<Lorem />} />
                    <Route path="/privacy" element={<Lorem />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </main>
            <Footer />
        </Router>
    );
};

const NotFoundPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full mt-1 text-principal-0 dark:text-white py-36 bg-principal-3 dark:bg-principal-0">
            <h1 className="mb-16 text-6xl font-bold text-center">...Oops!</h1>
            <h2 className="text-2xl font-bold text-center">Page not found</h2>
        </div>
    );
};

export default App;
