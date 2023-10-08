import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./profile.css";
import Rightbar from "../../components/rightbar/Rightbar";
import Feed from "../../components/feed/Feed";

const Profile = () => {
    return (
        <>
            <Topbar />
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img
                                src="https://scontent.fdel7-2.fna.fbcdn.net/v/t39.30808-6/373564750_139389795900291_3307263555332156428_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=9FehbAvQatgAX-q4gWi&_nc_ht=scontent.fdel7-2.fna&oh=00_AfDHSchzLcuK5eb45An3TdzhAvj5l7CHRHvAQtpHnGHIJQ&oe=6527A916"
                                alt="cover"
                                className="profileCoverImg"
                            />
                            <img
                                src="https://scontent.fdel7-2.fna.fbcdn.net/v/t39.30808-6/373564750_139389795900291_3307263555332156428_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=9FehbAvQatgAX-q4gWi&_nc_ht=scontent.fdel7-2.fna&oh=00_AfDHSchzLcuK5eb45An3TdzhAvj5l7CHRHvAQtpHnGHIJQ&oe=6527A916"
                                alt="profile"
                                className="profileUserImg"
                            />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">Username</h4>
                            <p className="profileInfoDesc">This is a temporory description</p>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed profile />
                        <Rightbar profile />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
