import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { Posts } from "../../dummyData";
const Feed = ({ profile }) => {
    return (
        <div className={profile ? "feedProfile" : "feed"}>
            <div className="feedWrapper">
                <Share />
                {Posts.map((post) => (
                    <Post key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
};

export default Feed;
