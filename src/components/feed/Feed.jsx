import clientApi from "../../network/network";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { useEffect, useState } from "react";
const Feed = ({ username }) => {
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        const res = username
            ? await clientApi.get(`posts/profile/${username}`)
            : await clientApi.get("posts/timeline/652262da5c4cddf8f7a0514f");
        setPosts(res.data);
    };
    useEffect(() => {
        fetchPosts();
    }, []);
    return (
        <div className={username ? "feedProfile" : "feed"}>
            <div className="feedWrapper">
                <Share />
                {posts.map((post, idx) => (
                    <Post key={"feedpost" + idx} post={post} />
                ))}
            </div>
        </div>
    );
};

export default Feed;
