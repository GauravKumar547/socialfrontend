import React, { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { loginCall } from '@/apiCalls';
import { AuthContext } from '@/context/AuthContext';

const Login: React.FC = () => {
    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const { isFetching, dispatch } = useContext(AuthContext) || {};

    const handleClick = (e: React.FormEvent): void => {
        e.preventDefault();
        if (email.current && password.current && dispatch) {
            loginCall(
                { email: email.current.value, password: password.current.value },
                dispatch
            );
        }
    };

    return (
        <div className="w-screen h-screen bg-[#f0f2f5] flex items-center justify-center">
            <div className="w-3/5 h-[70%] gap-5 flex flex-col md:flex-row">
                <div className="flex-1 flex flex-col justify-center">
                    <h3 className="text-[50px] font-extrabold text-[#1775ee] mb-[10px]">Socialize</h3>
                    <span className="text-2xl">
                        Connect with friends and the world around you on Socialize.
                    </span>
                </div>
                <div className="flex-1 flex flex-col justify-center">
                    <form onSubmit={handleClick} className="h-[300px] max-w-auth-box p-[25px] bg-white rounded-[10px] flex flex-col justify-between">
                        <input
                            placeholder="Email"
                            type="email"
                            required
                            className="h-[50px] rounded-[10px] border border-gray-400 text-lg pl-5 focus:outline-none"
                            ref={email}
                        />
                        <input
                            placeholder="Password"
                            type="password"
                            required
                            minLength={6}
                            className="h-[50px] rounded-[10px] border border-gray-400 text-lg pl-5 focus:outline-none"
                            ref={password}
                        />
                        <button
                            className="h-[50px] rounded-[10px] border-none bg-[#1775ee] text-white text-xl font-medium cursor-pointer disabled:cursor-not-allowed"
                            type="submit"
                            disabled={isFetching}
                        >
                            {isFetching ? (
                                <CircularProgress color="inherit" size="20px" />
                            ) : (
                                'Log In'
                            )}
                        </button>
                        <span className="text-center text-[#1775ee]">Forgot Password?</span>
                        <Link
                            to="/register"
                            className="w-fit py-[5px] px-5 self-center flex items-center justify-center text-center h-[50px] rounded-[10px] border-none bg-[#42b72a] text-white text-xl font-medium cursor-pointer no-underline"
                        >
                            Create a New Account
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login; 