import "./share.css";
import userProfilePlaceholder from "../../assets/userprofile.svg";
import { Cancel, EmojiEmotions, Label, PermMedia, Room } from "@mui/icons-material";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import clientApi from "../../network/network";
import storage from "../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { CircularProgress } from "@mui/material";
const Share = () => {
    const { user } = useContext(AuthContext);
    const desc = useRef();
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const submitHandler = async (ev) => {
        ev.preventDefault();
        if (!desc.current.value && !file) {
            desc.current.setCustomValidity("Cannot share empty post");
            desc.current.reportValidity();
            return;
        }
        setIsLoading(true);
        const newPost = {
            user_id: user._id,
            description: desc.current.value,
        };
        try {
            if (file) {
                const storageRef = ref(storage, `/files/${user._id}/${file.name}`);
                const uploadTask = await uploadBytesResumable(storageRef, file);
                const url = await getDownloadURL(uploadTask.ref);
                newPost.img = url;
            }
            await clientApi.post("/posts", newPost);
            document.getElementById("file").value = null;
            setFile(null);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };
    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img
                        src={user?.profilePicture ? user.profilePicture : userProfilePlaceholder}
                        alt="profile"
                        className="shareProfileImg"
                    />
                    <input
                        type="text"
                        placeholder={`What's in your mind ${user?.username}?`}
                        className="shareInput"
                        ref={desc}
                    />
                </div>
                <hr className="shareHr" />
                {file && (
                    <div className="shareImgContainer">
                        <img src={URL.createObjectURL(file)} className="shareImg" alt="uploaded" />
                        <Cancel
                            className="shareCancelImg"
                            onClick={() => {
                                setFile(null);
                                document.getElementById("file").value = null;
                            }}
                        />
                    </div>
                )}
                <form className="shareBottom" onSubmit={submitHandler}>
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">
                            <PermMedia htmlColor="tomato" className="shareIcon" />
                            <span className="shareOptionText">Photo or Video</span>
                            <input
                                type="file"
                                name="file"
                                hidden
                                accept="image/png,image/jpeg,image/jpg"
                                onChange={(ev) => {
                                    setFile(ev.target.files[0]);
                                }}
                                id="file"
                            />
                        </label>
                        <div className="shareOption">
                            <Label htmlColor="blue" className="shareIcon" />
                            <span className="shareOptionText">Tag</span>
                        </div>
                        <div className="shareOption">
                            <Room htmlColor="green" className="shareIcon" />
                            <span className="shareOptionText">Location</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
                            <span className="shareOptionText">Feelings</span>
                        </div>
                    </div>
                    <button disabled={isLoading} type="submit" className="shareButton">
                        {isLoading ? <CircularProgress size={13} color="inherit" /> : "Share"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Share;
