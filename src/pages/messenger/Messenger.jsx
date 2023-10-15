import "./messenger.css";
import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/conversation/conversation";
import Message from "../../components/message/message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import clientApi from "../../network/network";
import { io } from "socket.io-client";
const Messenger = () => {
    const { user } = useContext(AuthContext);
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState(null);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const scrollRef = useRef(null);
    const socket = useRef();
    useEffect(() => {
        socket.current = io("ws://localhost:8080");
        socket?.current?.on("getMessage", (data) => {
            setArrivalMessage({
                sender: data.sender_id,
                text: data.text,
                createdAt: new Date(),
            });
        });
    }, []);

    useEffect(() => {
        if (arrivalMessage && currentChat?.members.includes(arrivalMessage.sender)) {
            setMessages((prev) => [...prev, arrivalMessage]);
        }
    }, [arrivalMessage, currentChat]);

    useEffect(() => {
        if (user?._id) {
            socket.current.emit("addUser", user._id);
            socket.current.on("getUsers", (users) => setOnlineUsers(users));
        }
    }, [user?._id]);

    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await clientApi.get("/conversations/" + user._id);
                setConversations(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        if (user?._id) {
            getConversations();
        }
    }, [user?._id]);
    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await clientApi.get("/messages/" + currentChat._id);
                setMessages(await res.data);
            } catch (error) {
                console.log(error);
            }
        };
        if (currentChat?._id) {
            getMessages();
        }
    }, [currentChat?._id]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const msg = {
            conversation_id: currentChat?._id,
            sender: user?._id,
            text: newMessage,
        };
        const receiver_id = currentChat.members.find((member) => member !== user?._id);
        socket.current.emit("sendMessage", {
            sender_id: user?._id,
            receiver_id,
            text: newMessage,
        });
        try {
            const response = await clientApi.post("/messages", msg);
            setMessages([...messages, response.data]);
            setNewMessage("");
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
    return (
        <>
            <Topbar />
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input
                            type="text"
                            placeholder="Search for friends"
                            className="chatMenuInput"
                        />
                        {conversations.map((conversation) => (
                            <div
                                onClick={() => setCurrentChat(conversation)}
                                key={"conversation" + conversation._id}>
                                <Conversation conversation={conversation} currentUser={user} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {currentChat ? (
                            <>
                                <div className="chatBoxTop">
                                    {messages?.map((msg) => (
                                        <div ref={scrollRef} key={"message" + msg._id}>
                                            <Message message={msg} own={msg.sender === user?._id} />
                                        </div>
                                    ))}
                                </div>
                                <form className="chatBoxBottom" onSubmit={handleSubmit}>
                                    <textarea
                                        required
                                        name="messageInput"
                                        id="messageInput"
                                        onChange={(ev) => setNewMessage(ev.target.value)}
                                        value={newMessage}
                                        className="chatMessageInput"
                                        placeholder="write something..."></textarea>
                                    <button type="submit" className="chatSubmitButton">
                                        Send
                                    </button>
                                </form>
                            </>
                        ) : (
                            <span className="noConversationText">
                                Open a conversation to start a chat.
                            </span>
                        )}
                    </div>
                </div>
                <div className="chatOnlineContainer">
                    <div className="chatOnlineWrapper">
                        <ChatOnline
                            onlineUsers={onlineUsers}
                            currentUserId={user?._id}
                            setCurrentChat={setCurrentChat}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Messenger;
