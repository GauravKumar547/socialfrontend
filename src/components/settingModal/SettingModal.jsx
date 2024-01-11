import { Close, Edit } from "@mui/icons-material";
import userProfilePlaceholder from "../../assets/userprofile.svg";
import userCoverPlaceholder from "../../assets/noCover.png";
import "./settingModal.css";
import { useEffect, useRef, useState } from "react";
import clientApi from "../../network/network";
const SettingModal = ({ user, onClose }) => {
    const [profilePicInput, setProfilePicInput] = useState(null);
    const [coverPicInput, setCoverPicInput] = useState(null);
    const usernameRef = useRef(null);
    const cityRef = useRef(null);
    const fromRef = useRef(null);
    const relationRef = useRef(null);
    const descRef = useRef(null);
    const [userData, setUserData] = useState({});
    useEffect(() => {
        const fetchUser = async () => {
            const res = await clientApi.get(`/users?user_id=${user._id}`);
            setUserData(res.data);
            if (relationRef?.current) {
                relationRef.current.value = res.data.relationship;
            }
        };
        if (user?._id) {
            fetchUser();
        }
    }, [user]);
    const updateProfile = () => {};
    return (
        <div className="setting-modal">
            <div className="overlay"></div>
            <div className="setting-dialog">
                <div className="setting-header">
                    <div className="title">Profile Settings</div>
                    <div onClick={() => onClose()} className="settings-close">
                        <Close />
                    </div>
                </div>
                <div className="settings-content">
                    <div className="profile-cover">
                        <div className="cover-update">
                            <div className="coverimg-container">
                                <img
                                    src={
                                        coverPicInput
                                            ? URL.createObjectURL(coverPicInput)
                                            : userData?.coverPicture
                                            ? userData?.coverPicture
                                            : userCoverPlaceholder
                                    }
                                    alt="cover"
                                    className="coverimg"
                                />
                            </div>
                            <input
                                type="file"
                                onChange={(ev) => {
                                    setCoverPicInput(ev.target.files[0]);
                                }}
                                id="coverPic"
                                multiple={false}
                            />
                            <label className="edit-label1" htmlFor="coverPic">
                                <Edit />
                            </label>
                        </div>
                        <div className="profilepic-update">
                            <img
                                src={
                                    profilePicInput
                                        ? URL.createObjectURL(profilePicInput)
                                        : userData?.profilePicture
                                        ? userData?.profilePicture
                                        : userProfilePlaceholder
                                }
                                alt="user profile"
                                className="profileimg"
                            />
                            <input
                                type="file"
                                onChange={(ev) => {
                                    setProfilePicInput(ev.target.files[0]);
                                }}
                                id="profilePic"
                                multiple={false}
                            />
                            <label className="edit-label2" htmlFor="profilePic">
                                <Edit fontSize="small" />
                            </label>
                        </div>
                    </div>
                    <div className="username-container">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            placeholder="your username"
                            ref={usernameRef}
                            id="username"
                            defaultValue={userData?.username ?? ""}
                        />
                    </div>
                    <div className="desc-container">
                        <label htmlFor="desc">Bio: </label>
                        <textarea
                            name="desc"
                            id="desc"
                            cols="30"
                            placeholder="Enter your bio here..."
                            rows="2"
                            defaultValue={userData?.description ?? ""}
                            ref={descRef}
                        />
                    </div>
                    <div className="loc-container">
                        <div className="city-container">
                            <label htmlFor="city">City:</label>
                            <input
                                defaultValue={userData?.city ?? ""}
                                type="text"
                                placeholder="your city"
                                ref={cityRef}
                                id="city"
                            />
                        </div>
                        <div className="from-container">
                            <label htmlFor="from">Country:</label>
                            <input
                                type="text"
                                defaultValue={userData?.from ?? ""}
                                ref={fromRef}
                                placeholder="your country"
                                id="from"
                            />
                        </div>
                    </div>
                    <div className="relation-container">
                        <p htmlFor="Relationship">Relationship: </p>
                        <div className="relation-options-container">
                            <label htmlFor="single">Single:</label>
                            <input
                                name="relationship"
                                type="radio"
                                ref={relationRef}
                                value={1}
                                id="single"
                            />
                            <label htmlFor="married">Married:</label>
                            <input
                                name="relationship"
                                type="radio"
                                ref={relationRef}
                                id="married"
                                value={2}
                            />
                            <label htmlFor="divorced">Divorced:</label>
                            <input
                                name="relationship"
                                type="radio"
                                ref={relationRef}
                                id="divorced"
                                value={3}
                            />
                        </div>
                    </div>

                    <div className="update-btn-container">
                        <button onClick={() => updateProfile()} className="update-btn">
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingModal;
