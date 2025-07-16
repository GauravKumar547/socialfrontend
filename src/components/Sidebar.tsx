import {
    RssFeed,
    Chat,
    PlayCircleFilledOutlined,
    Group,
    Bookmark,
    HelpOutline,
    WorkOutline,
    Event,
    School,
    Menu,
} from "@mui/icons-material";
import CloseFriend from "./CloseFriend";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import type { IUser } from "@/types";

const Sidebar = () => {
    const { dispatch } = useContext(AuthContext);
    const [showMobile, setShowMobile] = useState(false);

    const handleLogout = () => {
        if (dispatch) {
            dispatch({ type: "LOGOUT" });
        }
        localStorage.removeItem("user");
    };

    const Users: IUser[] = [
        {
            _id: "1",
            username: "Jane Doe",
            email: "jane@example.com",
            profilePicture: "",
            followers: [],
            following: [],
            isAdmin: false,
            createdAt: "2023-01-01T00:00:00.000Z",
            updatedAt: "2023-01-01T00:00:00.000Z",
        },
    ];

    return (
        <>
            <div className="relative z-sidebar flex-[2.5] max-w-sidebar">
                <div
                    className={`h-screen-minus-topbar overflow-y-auto sticky top-[50px] max-w-[320px] cursor-pointer bg-white 
                    ${showMobile ? "flex flex-col gap-1 min-w-32 items-start justify-stretch absolute top-0 left-0" : ""}
                    md:block ${!showMobile ? "hidden md:block" : ""}`}
                >
                    <div className="p-5 flex h-[calc(100vh-100px)] flex-col items-stretch justify-between">
                        <div>
                            <ul className="p-0 m-0 list-none">
                                <li className="flex items-center mb-5">
                                    <RssFeed className="mr-4" />
                                    <span>Feed</span>
                                </li>
                                <li className="flex items-center mb-5">
                                    <Chat className="mr-4" />
                                    <span>Chats</span>
                                </li>
                                <li className="flex items-center mb-5">
                                    <PlayCircleFilledOutlined className="mr-4" />
                                    <span>Videos</span>
                                </li>
                                <li className="flex items-center mb-5">
                                    <Group className="mr-4" />
                                    <span>Groups</span>
                                </li>
                                <li className="flex items-center mb-5">
                                    <Bookmark className="mr-4" />
                                    <span>Bookmarks</span>
                                </li>
                                <li className="flex items-center mb-5">
                                    <HelpOutline className="mr-4" />
                                    <span>Questions</span>
                                </li>
                                <li className="flex items-center mb-5">
                                    <WorkOutline className="mr-4" />
                                    <span>Jobs</span>
                                </li>
                                <li className="flex items-center mb-5">
                                    <Event className="mr-4" />
                                    <span>Events</span>
                                </li>
                                <li className="flex items-center mb-5">
                                    <School className="mr-4" />
                                    <span>Courses</span>
                                </li>
                            </ul>

                            <button className="w-[150px] border-none p-[10px] rounded-[5px] font-medium">
                                Show More
                            </button>

                            <hr className="my-5" />

                            <ul className="p-0 m-0 list-none">
                                {Users.map((u) => (
                                    <CloseFriend key={u._id} user={u} />
                                ))}
                            </ul>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="py-2 px-4 border border-gray-400 text-blue-600 font-bold rounded-md cursor-pointer"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            <div
                className={`hidden md:hidden fixed top-14 left-2 text-white z-sidebar
                ${showMobile ? "left-32" : ""}`}
            >
                <Menu
                    className={`rounded-full z-sidebar bg-[#1877f2] p-1 shadow-lg shadow-[#1877f2]
                    ${showMobile ? "bg-[#188ff2]" : ""}`}
                    onClick={() => setShowMobile(!showMobile)}
                />
            </div>
        </>
    );
};

export default Sidebar; 