import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";
import { Toaster } from "react-hot-toast";
function App() {
    const { user } = useContext(AuthContext);
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={user ? <Home /> : <Login />} />
                    <Route path="/profile/:username" element={<Profile />} />
                    <Route
                        path="/register"
                        element={user ? <Navigate to="/" replace /> : <Register />}
                    />
                    <Route path="/messenger" element={user ? <Messenger /> : <Login />} />
                    <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
                </Routes>
            </Router>
            <Toaster position="top-right" reverseOrder={false} />
        </div>
    );
}

export default App;
