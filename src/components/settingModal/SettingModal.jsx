import { Close, Edit } from "@mui/icons-material";
import userProfilePlaceholder from "../../assets/userprofile.svg";
import userCoverPlaceholder from "../../assets/noCover.png";
import "./settingModal.css";
import storage from "../../firebase";
import { getDownloadURL, ref, uploadBytesResumable, deleteObject } from "firebase/storage";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import clientApi from "../../network/network";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const SettingModal = ({ user, onClose }) => {
    const [profilePicInput, setProfilePicInput] = useState(null);
    const [coverPicInput, setCoverPicInput] = useState(null);
    const [username, setUsername] = useState(user?.username);
    const cityRef = useRef(null);
    const fromRef = useRef(null);
    const descRef = useRef(null);
    const [relationship, setRelationship] = useState(user?.relationship);
    const [userData, setUserData] = useState({});
    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate();
    const fetchUser = useCallback(
        async (contextUpdate) => {
            const res = await clientApi.get(`/users?user_id=${user._id}`);
            if (contextUpdate) {
                dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
                localStorage.setItem("user", JSON.stringify(res.data));
            }
            setUserData(res.data);
            if (res.data.relationship) {
                setRelationship(res.data.relationship);
            }
        },
        [dispatch, user]
    );

    useEffect(() => {
        if (user?._id) {
            fetchUser();
        }
    }, [fetchUser, user]);
    const uploadToFirebase = async (file) => {
        const storageRef = ref(storage, `/files/${user._id}/${file.name}`);
        const uploadTask = await uploadBytesResumable(storageRef, file);
        const url = await getDownloadURL(uploadTask.ref);
        return url;
    };
    const updateProfile = async () => {
        const data = { user_id: user._id };
        if (username && username.length > 3) {
            data["username"] = username;
        }
        if (descRef.current?.value && descRef.current?.value.length > 0) {
            data["description"] = descRef.current.value;
        }
        if (cityRef.current?.value && cityRef.current?.value.length > 0) {
            data["city"] = cityRef.current.value;
        }
        if (fromRef.current?.value && fromRef.current?.value.length > 0) {
            data["from"] = fromRef.current.value;
        }
        data["relationship"] = relationship == 2 || relationship == 3 ? relationship : 1;
        if (profilePicInput) {
            data["profilePicture"] = await uploadToFirebase(profilePicInput);
        }
        if (coverPicInput) {
            data["coverPicture"] = await uploadToFirebase(coverPicInput);
        }
        try {
            if (userData.profilePicture && profilePicInput) {
                const fileProfileRef = ref(storage, userData.profilePicture);
                await deleteObject(fileProfileRef);
            }
        } catch (error) {
            console.log(error);
        } finally {
            try {
                if (userData.coverPicture && coverPicInput) {
                    const fileCoverRef = ref(storage, userData.coverPicture);
                    await deleteObject(fileCoverRef);
                }
            } catch (error) {
                console.log(error);
            } finally {
                try {
                    await clientApi.put(`/users/${user._id}`, data);
                } catch (error) {
                    console.log("update failed");
                } finally {
                    fetchUser(true);
                    onClose();
                    navigate("/");
                }
            }
        }
    };
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
                            id="username"
                            onChange={(ev) => {
                                if (ev.target.value.includes(" ")) {
                                    toast.error("Spaces in username not allowed");
                                } else {
                                    setUsername(ev.target.value);
                                }
                            }}
                            value={username}
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
                                onChange={() => {
                                    setRelationship(1);
                                }}
                                defaultChecked={relationship == 1}
                                value={1}
                                id="single"
                            />
                            <label htmlFor="married">Married:</label>
                            <input
                                name="relationship"
                                type="radio"
                                onChange={() => {
                                    setRelationship(2);
                                }}
                                id="married"
                                defaultChecked={relationship == 2}
                                value={2}
                            />
                            <label htmlFor="divorced">Divorced:</label>
                            <input
                                name="relationship"
                                type="radio"
                                onChange={() => {
                                    setRelationship(3);
                                }}
                                id="divorced"
                                defaultChecked={relationship == 3}
                                value={3}
                            />
                        </div>
                    </div>

                    <div className="update-btn-container">
                        <button
                            onClick={(ev) => {
                                ev.preventDefault();
                                updateProfile();
                            }}
                            className="update-btn">
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingModal;
