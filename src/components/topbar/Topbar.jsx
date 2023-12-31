import { Search } from "@mui/icons-material";
import "./topbar.css";
import userProfilePlaceholder from "../../assets/userprofile.svg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
const Topbar = () => {
    const { user } = useContext(AuthContext);
    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link to="/" className="logo">
                    Socialize
                </Link>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <Search className="searchicon" />
                    <input
                        type="text"
                        placeholder="Search for friend or post "
                        className="searchInput"
                    />
                </div>
            </div>
            <div className="topbarRight">
                {/* <div className="topbarLinks">
                    <span className="topbarLink">Homepage</span>
                    <span className="topbarLink">Timeline</span>
                </div> */}
                {/* <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Person />
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Chat />
                        <span className="topbarIconBadge">2</span>
                    </div>
                    <div className="topbarIconItem">
                        <Notifications />
                        <span className="topbarIconBadge">1</span>
                    </div>
                </div> */}
                <Link to={`/profile/${user?.username}`}>
                    <img
                        src={user?.profilePicture ? user?.profilePicture : userProfilePlaceholder}
                        alt="userprofile"
                        className="topbarImg"
                    />
                </Link>
            </div>
        </div>
    );
};

export default Topbar;
