import { Chat, RssFeed, Menu, Close } from "@mui/icons-material";
import "./sidebar.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const Sidebar = () => {
    const navigate = useNavigate();
    const [showSidebar, setShowSidebar] = useState(false);
    const logoutHandler = () => {
        localStorage.clear();
        navigate("/");
        window.location.reload();
    };
    return (
        <div className="sidebarContainer">
            <div className={`sidebar ${showSidebar ? "show" : ""}`}>
                <div className="sidebarWrapper">
                    <div>
                        <ul className="sidebarList">
                            <li onClick={() => navigate("/")} className="sidebarListItem">
                                <RssFeed className="sidebarIcon" />
                                <span className="sidebarListItemText">Feed</span>
                            </li>
                            <li onClick={() => navigate("/messenger")} className="sidebarListItem">
                                <Chat className="sidebarIcon" />
                                <span className="sidebarListItemText">Chats</span>
                            </li>
                        </ul>
                        <hr className="sidebarHr" />
                    </div>
                    <button onClick={() => logoutHandler()} className="logoutBtn">
                        Logout
                    </button>
                </div>
            </div>
            <div className={`menubar ${showSidebar ? "show" : ""}`}>
                {showSidebar ? (
                    <Close
                        onClick={() => setShowSidebar(!showSidebar)}
                        className="menu-icon"
                        color="inherit"
                    />
                ) : (
                    <Menu
                        onClick={() => setShowSidebar(!showSidebar)}
                        className="menu-icon"
                        color="inherit"
                    />
                )}
            </div>
        </div>
    );
};

export default Sidebar;
