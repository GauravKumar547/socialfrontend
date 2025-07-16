import React, { useContext, useEffect, useRef, useState } from 'react';
import { io, type Socket } from 'socket.io-client';
import Topbar from '@/components/Topbar';
import Conversation from '@/components/Conversation';
import Message from '@/components/Message';
import ChatOnline from '@/components/ChatOnline';
import { AuthContext } from '@/context/AuthContext';
import clientApi from '@/network/network';
import type {
    IConversation,
    IMessage,
    IUser,
    IOnlineUser,
    IApiResponse,
    ISocketMessage,
    IArrivingMessage
} from '@/types';

const Messenger: React.FC = () => {
    const [conversations, setConversations] = useState<readonly IConversation[]>([]);
    const [currentChat, setCurrentChat] = useState<IConversation | null>(null);
    const [messages, setMessages] = useState<readonly IMessage[]>([]);
    const [newMessage, setNewMessage] = useState<string>('');
    const [arrivalMessage, setArrivalMessage] = useState<IArrivingMessage | null>(null);
    const [onlineUsers, setOnlineUsers] = useState<readonly IOnlineUser[]>([]);
    const [inputVal, setInputVal] = useState<string>('');
    const [friends, setFriends] = useState<readonly IUser[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);
    const socket = useRef<Socket>();

    const { user } = useContext(AuthContext) || {};

    useEffect(() => {
        socket.current = io('ws://localhost:8080');
        socket.current?.on('getMessage', (data: ISocketMessage) => {
            setArrivalMessage({
                sender: data.sender_id,
                text: data.text,
                createdAt: new Date(),
            });
        });

        return () => {
            socket.current?.disconnect();
        };
    }, []);

    useEffect(() => {
        const getFriends = async (): Promise<void> => {
            if (!user?._id) return;

            try {
                const res = await clientApi.get<IApiResponse<readonly IUser[]>>(`/users/friends/${user._id}`);
                if (res.data) {
                    setFriends(res.data);
                }
            } catch (error) {
                console.error('Error fetching friends:', error);
            }
        };

        void getFriends();
    }, [user]);

    useEffect(() => {
        if (arrivalMessage && currentChat?.members.includes(arrivalMessage.sender)) {
            const messageToAdd: IMessage = {
                _id: `temp-${Date.now()}`,
                conversationId: currentChat._id,
                sender: arrivalMessage.sender,
                text: arrivalMessage.text,
                createdAt: arrivalMessage.createdAt.toISOString(),
                updatedAt: arrivalMessage.createdAt.toISOString(),
            };
            setMessages((prev) => [...prev, messageToAdd]);
        }
    }, [arrivalMessage, currentChat]);

    useEffect(() => {
        if (user?._id) {
            socket.current?.emit('addUser', user._id);
            socket.current?.on('getUsers', (users: readonly IOnlineUser[]) => {
                setOnlineUsers(users);
            });
        }
    }, [user]);

    useEffect(() => {
        const getConversations = async (): Promise<void> => {
            if (!user?._id) return;

            try {
                const res = await clientApi.get<IApiResponse<readonly IConversation[]>>(
                    `/conversation/${user._id}`
                );
                if (res.data) {
                    setConversations(res.data);
                }
            } catch (error) {
                console.error('Error fetching conversations:', error);
            }
        };

        void getConversations();
    }, [user]);

    useEffect(() => {
        const getMessages = async (): Promise<void> => {
            if (!currentChat?._id) return;

            try {
                const res = await clientApi.get<IApiResponse<readonly IMessage[]>>(
                    `/message/${currentChat._id}`
                );
                if (res.data) {
                    setMessages(res.data);
                }
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        void getMessages();
    }, [currentChat]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        if (!newMessage.trim() || !currentChat?._id || !user?._id) return;

        const message = {
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id,
        };

        const receiverId = currentChat.members.find((member) => member !== user._id);
        if (receiverId) {
            socket.current?.emit('sendMessage', {
                sender_id: user._id,
                receiver_id: receiverId,
                text: newMessage,
            });
        }

        try {
            const res = await clientApi.post<IApiResponse<IMessage>>('/message', message);
            if (res.data) {
                setMessages((prev) => [...prev, res.data!]);
                setNewMessage('');
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const startNewConversation = async (friend: IUser): Promise<void> => {
        if (!user?._id) return;

        const existingConversation = conversations.find((conv) =>
            conv.members.includes(friend._id) && conv.members.includes(user._id)
        );

        if (existingConversation) {
            setCurrentChat(existingConversation);
            setInputVal('');
            return;
        }

        try {
            const res = await clientApi.post<IApiResponse<IConversation>>('/conversation', {
                sender_id: user._id,
                receiver_id: friend._id,
            });

            if (res.data) {
                setConversations((prev) => [...prev, res.data!]);
                setCurrentChat(res.data);
                setInputVal('');
            }
        } catch (error) {
            console.error('Error creating conversation:', error);
        }
    };

    const filteredFriends = friends.filter((friend) =>
        inputVal.trim() === '' ||
        friend.username.toLowerCase().includes(inputVal.toLowerCase())
    );

    return (
        <>
            <Topbar />
            <div className="h-[calc(100vh-70px)] flex">
                <div className="flex-[3.5] border-r border-gray-200">
                    <div className="p-4 bg-white h-full">
                        <input
                            placeholder="Search for friends"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                            onChange={(e) => setInputVal(e.target.value)}
                            value={inputVal}
                        />

                        <div className="space-y-2">
                            {conversations.map((c) => (
                                <div
                                    key={c._id}
                                    onClick={() => setCurrentChat(c)}
                                    className={`cursor-pointer rounded-lg transition-colors ${currentChat?._id === c._id ? 'bg-blue-50' : 'hover:bg-gray-50'
                                        }`}
                                >
                                    <Conversation
                                        conversation={c}
                                        currentUser={user || null}
                                        searchedVal={inputVal}
                                    />
                                </div>
                            ))}
                        </div>

                        {inputVal.trim() && (
                            <div className="mt-6">
                                <h3 className="text-lg font-semibold text-gray-700 mb-3">
                                    Start New Conversation
                                </h3>
                                <div className="space-y-2">
                                    {filteredFriends
                                        .filter((friend) =>
                                            !conversations.some((conv) =>
                                                conv.members.includes(friend._id) && conv.members.includes(user?._id || '')
                                            )
                                        )
                                        .map((friend) => (
                                            <div
                                                key={friend._id}
                                                onClick={() => startNewConversation(friend)}
                                                className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                                            >
                                                <img
                                                    className="w-10 h-10 rounded-full object-cover mr-3"
                                                    src={friend.profilePicture || '/assets/userprofile.svg'}
                                                    alt={friend.username}
                                                />
                                                <span className="font-medium text-gray-900">
                                                    {friend.username}
                                                </span>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex-[5.5]">
                    {currentChat ? (
                        <div className="h-full flex flex-col">
                            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                                {messages.map((m) => (
                                    <div key={m._id} ref={scrollRef}>
                                        <Message message={m} own={m.sender === user?._id} />
                                    </div>
                                ))}
                            </div>

                            <div className="p-4 bg-white border-t border-gray-200">
                                <form onSubmit={handleSubmit} className="flex space-x-3">
                                    <textarea
                                        className="flex-1 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Write something..."
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        value={newMessage}
                                        rows={1}
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                e.preventDefault();
                                                handleSubmit(e as any);
                                            }
                                        }}
                                    />
                                    <button
                                        type="submit"
                                        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                                        disabled={!newMessage.trim()}
                                    >
                                        Send
                                    </button>
                                </form>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center bg-gray-50">
                            <span className="text-4xl text-gray-400 text-center">
                                Open a conversation to start a chat.
                            </span>
                        </div>
                    )}
                </div>

                <div className="flex-[3] border-l border-gray-200">
                    <div className="p-4 bg-white h-full">
                        <ChatOnline
                            onlineUsers={onlineUsers}
                            currentUserId={user?._id || ''}
                            setCurrentChat={setCurrentChat}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Messenger; 