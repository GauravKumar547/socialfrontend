import { AuthContext } from "../../context/AuthContext";
import clientApi from "../../network/network";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { useContext, useEffect, useState } from "react";
const Feed = ({ username }) => {
    const [posts, setPosts] = useState([]);
    const { user } = useContext(AuthContext);
    useEffect(() => {
        const fetchPosts = async () => {
            const res = username
                ? await clientApi.get(`posts/profile/${username}`)
                : await clientApi.get(`posts/timeline/${user?._id}`);
            setPosts(
                res.data.sort((p1, p2) => {
                    return new Date(p2.createdAt) - new Date(p1.createdAt);
                })
            );
        };
        fetchPosts();
    }, [username, user?._id]);
    return (
        <div className={username ? "feedProfile" : "feed"}>
            <div className="feedWrapper">
                {(!username || username === user.username) && <Share />}
                {posts.map((post, idx) => (
                    <Post key={"feedpost" + idx} post={post} />
                ))}
            </div>
        </div>
    );
};

export default Feed;
