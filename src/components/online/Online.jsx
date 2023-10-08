import "./online.css";
import userProfilePlaceholder from "../../assets/userprofile.svg";
const Online = ({ user }) => {
    return (
        <li className="rightbarFriend">
            <div className="rightbarProfileImgContainer">
                <img
                    src={user?.profilePicture ? user?.profilePicture : userProfilePlaceholder}
                    alt=""
                    className="rightbarProfileImg"
                />
                <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUsername">{user?.username}</span>
        </li>
    );
};

export default Online;
