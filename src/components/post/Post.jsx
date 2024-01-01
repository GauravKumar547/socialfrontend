import "./post.css";
import userProfilePlaceholder from "../../assets/userprofile.svg";
import likeImg from "../../assets/like.png";
import heartImg from "../../assets/heart.png";
import { MoreVert } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import clientApi from "../../network/network";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
const Post = ({ post, removeThePost }) => {
    const [user, setUser] = useState({});
    const [likes, setLikes] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const { user: currentUser } = useContext(AuthContext);
    useEffect(() => {
        const fetchUser = async () => {
            const res = await clientApi.get(`users?user_id=${post.user_id}`);
            setUser(res.data);
        };
        fetchUser();
    }, [post.user_id]);
    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id));
    }, [currentUser._id, post.likes]);
    const likeHandler = async () => {
        try {
            await clientApi.put(`/posts/${post._id}/like`, { user_id: currentUser._id });
            setLikes(isLiked ? likes - 1 : likes + 1);
            setIsLiked(!isLiked);
        } catch (error) {
            console.log(error);
        }
    };
    const deleteHandler = async () => {
        try {
            await clientApi.delete(`/posts/${post._id}`, { data: { user_id: currentUser._id } });
            removeThePost();
            setShowDialog(false);
        } catch (error) {
            console.log(error);
            setShowDialog(false);
        }
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
                        <MoreVert className="vertBtn" onClick={() => setShowDialog(!showDialog)} />
                        {showDialog && (
                            <div className="postOptionDialog">
                                <button onClick={() => deleteHandler()} className="deletePost">
                                    Delete
                                </button>
                            </div>
                        )}
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
