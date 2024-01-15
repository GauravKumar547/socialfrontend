import { Search, Settings, Close } from "@mui/icons-material";
import "./topbar.css";
import userProfilePlaceholder from "../../assets/userprofile.svg";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import SettingModal from "../settingModal/SettingModal";
import Online from "../online/Online";
import clientApi from "../../network/network";
const Topbar = () => {
    const { user } = useContext(AuthContext);
    const [showSettings, setShowSettings] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [users, setUsers] = useState([]);
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
                        onChange={(ev) => {
                            setSearchInput(ev.target.value);
                        }}
                        placeholder="Search for a user..."
                        value={searchInput}
                        className="searchInput"
                    />
                    {searchInput.length > 0 && (
                        <Close
                            onClick={() => {
                                setSearchInput("");
                                setUsers([]);
                            }}
                            style={{ cursor: "pointer" }}
                            className="searchicon"
                        />
                    )}
                </div>
            </div>
            <div className="topbarRight">
                {/* <div className="topbarLinks">
                    <span className="topbarLink">Homepage</span>
                    <span className="topbarLink">Timeline</span>
                </div> */}
                <div className="topbarIcons">
                    {/* <div className="topbarIconItem">
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
                    </div> */}
                    <div onClick={() => setShowSettings(!showSettings)} className="topbarIconItem">
                        <Settings />
                    </div>
                </div>
                <Link to={`/profile/${user?.username}`}>
                    <img
                        src={user?.profilePicture ? user?.profilePicture : userProfilePlaceholder}
                        alt="userprofile"
                        className="topbarImg"
                    />
                </Link>
            </div>
            {showSettings && <SettingModal user={user} onClose={() => setShowSettings(false)} />}
            {searchInput.length > 0 &&
                (searchInput.length > 1 && users?.length > 0 ? (
                    users?.length > 0 && (
                        <ul className="searchDialog">
                            {searchInput.length > 1 && (
                                <div
                                    className="searchbutton"
                                    style={{ marginBottom: "0.85rem" }}
                                    onClick={() => {
                                        clientApi
                                            .get(`/users/all?name=${searchInput}`)
                                            .then((res) => {
                                                setUsers(res.data?.users ?? []);
                                            });
                                    }}>
                                    Click here to search
                                </div>
                            )}
                            {users.map((userVal, index) =>
                                user?._id == userVal.id ? null : (
                                    <Online
                                        key={userVal.id + "_" + index + "_" + "searched"}
                                        user={userVal}
                                        emptyState={() => {
                                            setSearchInput("");
                                            setUsers([]);
                                        }}
                                    />
                                )
                            )}
                        </ul>
                    )
                ) : (
                    <div className="searchDialog" style={{ textAlign: "center" }}>
                        {searchInput.length > 1 && (
                            <div
                                className="searchbutton"
                                onClick={() => {
                                    clientApi.get(`/users/all?name=${searchInput}`).then((res) => {
                                        setUsers(res.data?.users ?? []);
                                    });
                                }}>
                                Click here to search
                            </div>
                        )}
                        <div
                            className="result-container"
                            style={{
                                paddingTop: searchInput.length > 1 ? "0.85rem" : 0,
                                paddingBottom: "0.85rem",
                            }}>
                            {searchInput.length <= 1
                                ? "Input atleast 2 characters"
                                : "No user found!"}
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default Topbar;
