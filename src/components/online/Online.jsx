import "./online.css";
import userProfilePlaceholder from "../../assets/userprofile.svg";
import { Link } from "react-router-dom";
const Online = ({ user, emptyState }) => {
    return (
        <li key={user._id + "_friend"}>
            <Link
                onClick={() => {
                    if (emptyState) {
                        emptyState();
                    }
                }}
                to={`/profile/${user.username}`}
                className="rightbarFriend">
                <div className="rightbarProfileImgContainer">
                    <img
                        src={user?.profilePicture ? user?.profilePicture : userProfilePlaceholder}
                        alt=""
                        className="rightbarProfileImg"
                    />
                    {/* <span className="rightbarOnline"></span> */}
                </div>
                <span className="rightbarUsername">{user?.username}</span>
            </Link>
        </li>
    );
};

export default Online;
