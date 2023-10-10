/* eslint-disable no-unused-vars */
import { useContext, useRef, useState } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@mui/material";

const Login = () => {
    const email = useRef();
    const pass = useRef();
    const { user, isFetching, error, dispatch } = useContext(AuthContext);
    const handleSubmit = (e) => {
        e.preventDefault();
        loginCall({ email: email.current.value, password: pass.current.value }, dispatch);
    };
    console.log(user);
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Socialize</h3>
                    <span className="loginDesc">
                        Connect with friends and the world around you on Socialize.
                    </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleSubmit}>
                        <input
                            type="email"
                            required
                            ref={email}
                            name="email"
                            placeholder="Email"
                            className="loginInput"
                        />
                        <input
                            type="password"
                            required
                            minLength={6}
                            ref={pass}
                            name="password"
                            placeholder="Password"
                            className="loginInput"
                        />
                        <button disabled={isFetching} type="submit" className="loginButton">
                            {isFetching ? (
                                <CircularProgress size="20px" color="inherit" />
                            ) : (
                                "Log In"
                            )}
                        </button>
                        <span className="loginForgot">Forgot Password?</span>
                        <button disabled={isFetching} type="button" className="loginRegisterButton">
                            Create a New Account
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
