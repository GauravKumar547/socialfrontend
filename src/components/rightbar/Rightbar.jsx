import "./rightbar.css";
import giftImg from "../../assets/gift.png";
import addImg from "../../assets/ad.png";
import userPlaceholderImg from "../../assets/userprofile.svg";
import { Users } from "../../dummyData";
import Online from "../online/Online";
const Rightbar = ({ user }) => {
    const HomeRightbar = () => (
        <>
            {" "}
            <div className="birthdayContainer">
                <img src={giftImg} alt="gift" className="birthdayImg" />
                <span className="birthdayText">
                    <b>Pola Foster</b> and <b>3 other friends</b> have a birthday today.
                </span>
            </div>
            <img src={addImg} alt="ad" className="rightbarAd" />
            <h4 className="rightbarTitle">Online Friends</h4>
            <ul className="rightbarFriendList">
                {Users.map((user) => (
                    <Online key={user.id} user={user} />
                ))}
            </ul>
        </>
    );
    const ProfileRightbar = () => (
        <>
            <h4 className="rightbarTitle">User information</h4>
            <div className="rightbarInfo">
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">City:</span>
                    <span className="rightbarInfoValue">{user.city}</span>
                </div>
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">From:</span>
                    <span className="rightbarInfoValue">{user.from}</span>
                </div>
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">Relationship:</span>
                    <span className="rightbarInfoValue">
                        {user.relationship === 1
                            ? "Single"
                            : user.relationship === 2
                            ? "Married"
                            : "-"}
                    </span>
                </div>
            </div>
            <h4 className="rightbarTitle">User friends</h4>
            <div className="rightbarFollowings">
                <div className="rightbarFollowing">
                    <img src={userPlaceholderImg} alt="" className="rightbarFollowingImg" />
                    <span className="rightbarFollowingName">John Carter</span>
                </div>
                <div className="rightbarFollowing">
                    <img src={userPlaceholderImg} alt="" className="rightbarFollowingImg" />
                    <span className="rightbarFollowingName">John Carter</span>
                </div>
                <div className="rightbarFollowing">
                    <img src={userPlaceholderImg} alt="" className="rightbarFollowingImg" />
                    <span className="rightbarFollowingName">John Carter</span>
                </div>
                <div className="rightbarFollowing">
                    <img src={userPlaceholderImg} alt="" className="rightbarFollowingImg" />
                    <span className="rightbarFollowingName">John Carter</span>
                </div>
                <div className="rightbarFollowing">
                    <img src={userPlaceholderImg} alt="" className="rightbarFollowingImg" />
                    <span className="rightbarFollowingName">John Carter</span>
                </div>
            </div>
        </>
    );
    return (
        <div className={user ? "rightbarProfile" : "rightbar"}>
            <div className="rightbarWrapper">{user ? <ProfileRightbar /> : <HomeRightbar />}</div>
        </div>
    );
};

export default Rightbar;
