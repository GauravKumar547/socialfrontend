import "./online.css";
import userProfilePlaceholder from "../../assets/userprofile.svg";
import { Link } from "react-router-dom";
const Online = ({ user }) => {
    return (
        <li key={user._id + "_friend"}>
            <Link to={`/profile/${user.username}`} className="rightbarFriend">
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
