import "./post.css";
import userProfilePlaceholder from "../../assets/userprofile.svg";
import likeImg from "../../assets/like.png";
import heartImg from "../../assets/heart.png";
import { MoreVert } from "@mui/icons-material";
import { useEffect, useState } from "react";
import clientApi from "../../network/network";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
const Post = ({ post }) => {
    const [user, setUser] = useState({});
    const [likes, setLikes] = useState(post.like);
    const [isLiked, setIsLiked] = useState(false);
    useEffect(() => {
        const fetchUser = async () => {
            const res = await clientApi.get(`users?user_id=${post.user_id}`);
            setUser(res.data);
        };
        fetchUser();
    }, [post.user_id]);
    const likeHandler = () => {
        setLikes(isLiked ? likes - 1 : likes + 1);
        setIsLiked(!isLiked);
    };
    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`/profile/${user.username}`}>
                            <img
                                src={
                                    user?.profilePicture
                                        ? user?.profilePicture
                                        : userProfilePlaceholder
                                }
                                alt="postuser"
                                className="postProfileImg"
                            />
                        </Link>
                        <span className="postUsername">{user?.username}</span>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    {post?.description && <p className="postText">{post?.description}</p>}
                    {post?.img && <img src={post?.img} className="postImg" alt="post" />}
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img onClick={likeHandler} src={likeImg} alt="" className="likeIcon" />
                        <img onClick={likeHandler} src={heartImg} alt="" className="likeIcon" />
                        <span className="postLikeCounter">{likes} people like it</span>
                    </div>
                    <div className="postBottomCenter">
                        <span className="postCommentText">{post.comment} comments</span>
                    </div>
                    {/* <div className="postBottomRight"></div> */}
                </div>
            </div>
        </div>
    );
};

export default Post;
