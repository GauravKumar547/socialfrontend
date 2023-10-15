import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./profile.css";
import Rightbar from "../../components/rightbar/Rightbar";
import Feed from "../../components/feed/Feed";
import userProfilePlaceholder from "../../assets/userprofile.svg";
import userCoverPlaceholder from "../../assets/noCover.png";
import { useEffect, useState } from "react";
import clientApi from "../../network/network";
import { useParams } from "react-router";

const Profile = () => {
    const [user, setUser] = useState({});
    const params = useParams();
    useEffect(() => {
        const fetchUser = async () => {
            const res = await clientApi.get(`/users?username=${params.username}`);
            setUser(res.data);
        };
        fetchUser();
    }, [params.username]);
    return (
        <>
            <Topbar />
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img
                                src={user.coverPicture || userCoverPlaceholder}
                                alt="cover"
                                className="profileCoverImg"
                            />
                            <img
                                src={user.profilePicture || userProfilePlaceholder}
                                alt="profile"
                                className="profileUserImg"
                            />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.username}</h4>
                            <p className="profileInfoDesc">{user.description}</p>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username={params.username} />
                        <Rightbar user={user} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
