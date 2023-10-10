import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
function App() {
    const { user } = useContext(AuthContext);
    return (
        <Router>
            <Routes>
                <Route path="/" element={user ? <Home /> : <Login />} />
                <Route path="/profile/:username" element={<Profile />} />
                <Route path="/register" element={user ? <Home /> : <Register />} />
                <Route path="/login" element={user ? <Home /> : <Login />} />
            </Routes>
        </Router>
    );
}

export default App;