import React from 'react';
import userProfilePlaceholder from '@/assets/userprofile.svg';
import type { IUser } from '@/types';

interface ICloseFriendProps {
    readonly user: IUser;
}

const CloseFriend: React.FC<ICloseFriendProps> = ({ user }) => {
    return (
        <li className="flex items-center mb-4">
            <img
                className="w-8 h-8 rounded-full bg-gray-light object-cover mr-[10px]"
                src={user.profilePicture || userProfilePlaceholder}
                alt={user.username}
            />
            <span>
                {user.username}
            </span>
        </li>
    );
};

export default CloseFriend; 