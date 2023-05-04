import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PhaserGame from "./PhaserGame";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" Component={LoginForm} />
                <Route path="/signup" Component={SignupForm} />
                <Route path="/game" Component={PhaserGame} />
            </Routes>
        </Router>
    );
};

export default App;
