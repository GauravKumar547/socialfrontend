import React from 'react';
import userProfilePlaceholder from '@/assets/userprofile.svg';
import type { IMessage } from '@/types';

interface IMessageProps {
    readonly message: IMessage;
    readonly own: boolean;
}

const Message: React.FC<IMessageProps> = ({ message, own }) => {
    const formatTime = (date: string): string => {
        try {
            const messageDate = new Date(date);
            const now = new Date();
            const diffInMinutes = Math.floor((now.getTime() - messageDate.getTime()) / 60000);

            if (diffInMinutes < 1) return 'now';
            if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
            if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
            return `${Math.floor(diffInMinutes / 1440)}d ago`;
        } catch {
            return 'Unknown time';
        }
    };

    return (
        <div className={`flex mb-4 ${own ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex max-w-xs lg:max-w-md ${own ? 'flex-row-reverse' : 'flex-row'} items-end space-x-2`}>
                {!own && (
                    <img
                        className="w-8 h-8 rounded-full object-cover"
                        src={userProfilePlaceholder}
                        alt="User"
                    />
                )}

                <div className={`flex flex-col space-y-1 ${own ? 'items-end' : 'items-start'}`}>
                    <div
                        className={`px-4 py-2 rounded-lg ${own
                                ? 'bg-blue-500 text-white rounded-br-none'
                                : 'bg-gray-200 text-gray-800 rounded-bl-none'
                            }`}
                    >
                        <p className="text-sm break-words">{message.text}</p>
                    </div>

                    <span className="text-xs text-gray-500 px-1">
                        {formatTime(message.createdAt)}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Message;