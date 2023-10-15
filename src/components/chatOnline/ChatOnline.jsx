import "./chatOnline.css";
import userProfilePlaceholder from "../../assets/userprofile.svg";
import { useEffect, useState } from "react";
import clientApi from "../../network/network";

const ChatOnline = ({ onlineUsers, currentUserId, setCurrentChat }) => {
    const [friends, setFriends] = useState([]);
    const [onlinefriends, setOnlineFriends] = useState([]);
    useEffect(() => {
        const getFriends = async () => {
            const res = await clientApi.get("/users/friends/" + currentUserId);
            setFriends(res.data);
        };
        if (currentUserId) {
            getFriends();
        }
    }, [currentUserId]);
    useEffect(() => {
        setOnlineFriends(
            friends.filter((f) => onlineUsers.find((onlineUser) => f._id === onlineUser.user_id))
        );
    }, [friends, onlineUsers]);
    const handleClick = async (user) => {
        try {
            const res = await clientApi.get(`/conversations/find/${currentUserId}/${user?._id}`);
            setCurrentChat(res.data);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="chatOnline">
            {onlinefriends.length > 0 ? (
                onlinefriends?.map((friend) => (
                    <div
                        key={"online friend" + friend._id}
                        className="chatOnlineFriend"
                        onClick={() => handleClick(friend)}>
                        <div className="chatOnlineImgContainer">
                            <img
                                src={
                                    friend?.profilePicture
                                        ? friend?.profilePicture
                                        : userProfilePlaceholder
                                }
                                alt="conversation profile"
                                className="chatOnlineImg"
                            />
                            <div className="chatOnlineBadge"></div>
                        </div>
                        <span className="chatOnlineName">{friend.username}</span>
                    </div>
                ))
            ) : (
                <div className="noOnlineText">No friends are online</div>
            )}
        </div>
    );
};

export default ChatOnline;
