import "./rightbar.css";
import userPlaceholderImg from "../../assets/userprofile.svg";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import clientApi from "../../network/network";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add } from "@mui/icons-material";
const Rightbar = ({ user }) => {
    const { user: currentUser } = useContext(AuthContext);
    const [friends, setFriends] = useState([]);
    const [followed, setFollowed] = useState(false);

    useEffect(() => {
        setFollowed(currentUser.following.includes(user?._id));
    }, [currentUser, user?._id]);
    useEffect(() => {
        const getFriends = async () => {
            try {
                const friendsList = await clientApi.get(
                    "/users/friends/" + ((user && user._id) ?? currentUser._id)
                );
                setFriends(friendsList.data);
            } catch (error) {
                console.log(error);
            }
        };
        if (user?._id || currentUser?._id) {
            getFriends();
        }
    }, [currentUser, user]);

    const followHandler = async () => {
        try {
            if (followed) {
                await clientApi.put("/users/" + user._id + "/unfollow", {
                    user_id: currentUser._id,
                });
                setFollowed(false);
            } else {
                await clientApi.put("/users/" + user._id + "/follow", { user_id: currentUser._id });
                setFollowed(true);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const HomeRightbar = () => (
        <>
            {/* <div className="birthdayContainer">
                <img src={giftImg} alt="gift" className="birthdayImg" />
                <span className="birthdayText">
                    <b>Pola Foster</b> and <b>3 other friends</b> have a birthday today.
                </span>
            </div>
            <img src={addImg} alt="ad" className="rightbarAd" /> */}
            <h4 className="rightbarTitle">Friends</h4>
            <ul className="rightbarFriendList">
                {friends.map((user, index) => (
                    <Online key={user.id + "_" + index + "_" + "online"} user={user} />
                ))}
            </ul>
        </>
    );
    const ProfileRightbar = () => (
        <>
            {user.username !== currentUser.username && (
                <button onClick={followHandler} className="rightbarFollowButton">
                    {followed ? "Unfollow" : "Follow"} {!followed && <Add />}
                </button>
            )}
            <h4 className="rightbarTitle">User information</h4>
            <div className="rightbarInfo">
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">City:</span>
                    <span className="rightbarInfoValue">{user.city}</span>
                </div>
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">Country:</span>
                    <span className="rightbarInfoValue">{user.from}</span>
                </div>
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">Relationship:</span>
                    <span className="rightbarInfoValue">
                        {user.relationship === 1
                            ? "Single"
                            : user.relationship === 2
                            ? "Married"
                            : "-"}
                    </span>
                </div>
            </div>
            <h4 className="rightbarTitle">User friends</h4>
            <div className="rightbarFollowings">
                {friends.map((friend) => (
                    <Link
                        style={{ textDecoration: "none", color: "inherit" }}
                        key={"friendsItem" + friend._id}
                        to={"/profile/" + friend.username}>
                        <div className="rightbarFollowing">
                            <img
                                src={
                                    friend.profilePicture
                                        ? friend.profilePicture
                                        : userPlaceholderImg
                                }
                                alt=""
                                className="rightbarFollowingImg"
                            />
                            <span className="rightbarFollowingName">{friend.username}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
    return (
        <div className={user ? "rightbarProfile" : "rightbar"}>
            <div className="rightbarWrapper">{user ? <ProfileRightbar /> : <HomeRightbar />}</div>
        </div>
    );
};

export default Rightbar;
