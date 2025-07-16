import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Add } from '@mui/icons-material';
import { AuthContext } from '@/context/AuthContext';
import clientApi from '@/network/network';
import Online from './Online';
import userPlaceholderImg from '@/assets/userprofile.svg';
import birthdayImg from '@/assets/gift.png';
import adImg from '@/assets/ad.png';
import type { IUser, IApiResponse } from '@/types';

interface IRightbarProps {
    user?: IUser;
}

const Rightbar: React.FC<IRightbarProps> = ({ user }) => {
    const [friends, setFriends] = useState<readonly IUser[]>([]);
    const { user: currentUser } = useContext(AuthContext) || {};

    useEffect(() => {
        const getFriends = async (): Promise<void> => {
            if (user?._id) {
                try {
                    const friendList = await clientApi.get<IApiResponse<readonly IUser[]>>(`/users/friends/${user._id}`);
                    if (friendList.data) {
                        setFriends(friendList.data);
                    }
                } catch (error) {
                    console.error('Error fetching friends:', error);
                }
            }
        };

        void getFriends();
    }, [user]);

    const HomeRightbar = (): JSX.Element => {
        return (
            <>
                <div className="flex items-center">
                    <img className="w-10 h-10 mr-[10px]" src={birthdayImg} alt="Gift" />
                    <span className="font-light text-[15px]">
                        <b>Pola Foster</b> and <b>3 other friends</b> have a birthday today.
                    </span>
                </div>
                <img
                    className="w-full rounded-[10px] my-[30px]"
                    src={adImg}
                    alt="Advertisement"
                />
                <h4 className="text-lg font-medium mb-[10px]">Online Friends</h4>
                <ul className="m-0 p-0 list-none">
                    {[...Array(8)].map((_, index) => (
                        <Online
                            key={index}
                            user={{
                                _id: `user-${index}`,
                                username: `User ${index + 1}`,
                                email: `user${index + 1}@example.com`,
                                profilePicture: userPlaceholderImg,
                                followers: [],
                                following: [],
                                isAdmin: false,
                                createdAt: new Date().toISOString(),
                                updatedAt: new Date().toISOString(),
                            }}
                        />
                    ))}
                </ul>
            </>
        );
    };

    const ProfileRightbar = (): JSX.Element => {
        return (
            <>
                {user?.username !== currentUser?.username && (
                    <button className="mt-[30px] mb-[10px] border-none bg-[#1872f2] text-white rounded-[5px] py-[5px] px-[10px] flex w-[90px] h-[34px] items-center justify-center text-center text-base font-medium cursor-pointer focus:outline-none">
                        <Add className="mr-1" />
                        Follow
                    </button>
                )}
                <h4 className="text-lg font-medium mb-[10px]">User information</h4>
                <div className="mb-[30px]">
                    <div className="mb-[10px]">
                        <span className="font-medium mr-4 text-[#555]">City:</span>
                        <span className="font-light">
                            {user?.city || 'Not specified'}
                        </span>
                    </div>
                    <div className="mb-[10px]">
                        <span className="font-medium mr-4 text-[#555]">From:</span>
                        <span className="font-light">
                            {user?.from || 'Not specified'}
                        </span>
                    </div>
                    <div className="mb-[10px]">
                        <span className="font-medium mr-4 text-[#555]">Relationship:</span>
                        <span className="font-light">
                            {user?.relationship || 'Not specified'}
                        </span>
                    </div>
                </div>

                <h4 className="text-lg font-medium mb-[10px]">User friends</h4>
                <div className="flex flex-wrap gap-x-5">
                    {friends.slice(0, 6).map((friend) => (
                        <div
                            key={friend._id}
                            className="flex flex-col mb-5 cursor-pointer items-center"
                        >
                            <Link to={`/profile/${friend.username}`}>
                                <img
                                    className="w-[100px] h-[100px] object-cover rounded-[5px]"
                                    src={friend.profilePicture || userPlaceholderImg}
                                    alt={friend.username}
                                />
                                <span className="text-xs">{friend.username}</span>
                            </Link>
                        </div>
                    ))}
                </div>
            </>
        );
    };

    return (
        <div className={`${user ? "flex-[3.5] max-w-rightbar-profile" : "flex-[3.5] max-w-rightbar"} hidden md:block`}>
            <div className="py-5 pr-5 pl-0">
                {user ? <ProfileRightbar /> : <HomeRightbar />}
            </div>
        </div>
    );
};

export default Rightbar; 