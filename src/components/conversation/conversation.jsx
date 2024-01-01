import "./conversation.css";
import userProfilePlaceholder from "../../assets/userprofile.svg";
import { useEffect, useState } from "react";
import clientApi from "../../network/network";
const Conversation = ({ conversation, currentUser, searchedVal }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const friendId = conversation.members.find((m) => m !== currentUser._id);
        const getUser = async () => {
            try {
                const res = await clientApi.get("/users?user_id=" + friendId);
                setUser(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        if (friendId) {
            getUser();
        }
    }, [currentUser, conversation]);
    return searchedVal.trim().length == 0 || user?.username?.toLowerCase().includes(searchedVal) ? (
        <div className="conversation">
            <img
                src={user?.profilePicture ? user?.profilePicture : userProfilePlaceholder}
                alt="conversation profile"
                className="conversationImg"
            />
            <span className="conversationName">{user?.username}</span>
        </div>
    ) : null;
};

export default Conversation;
