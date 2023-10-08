import "./closefriend.css";
import userPlaceholderImg from "../../assets/userprofile.svg";
const CloseFriends = ({ user }) => {
    return (
        <li className="sidebarFriendListItem">
            <img
                src={user?.profilePicture ? user?.profilePicture : userPlaceholderImg}
                alt="friend"
                className="sidebarFriendImg"
            />
            <span className="sidebarFriendName">{user.username}</span>
        </li>
    );
};

export default CloseFriends;
