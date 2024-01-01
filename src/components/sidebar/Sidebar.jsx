import { Chat, RssFeed } from "@mui/icons-material";
import "./sidebar.css";
import { useNavigate } from "react-router-dom";
const Sidebar = () => {
    const navigate = useNavigate();
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
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
        </div>
    );
};

export default Sidebar;
