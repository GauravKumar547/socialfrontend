import { useRef } from "react";
import "./register.css";
import clientApi from "../../network/network";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const email = useRef();
    const pass = useRef();
    const confirmPass = useRef();
    const username = useRef();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (pass.current.value !== confirmPass.current.value) {
            confirmPass.current.setCustomValidity("Confirm Password don't match");
        } else {
            const user = {
                username: username.current.value,
                password: pass.current.value,
                email: email.current.value,
            };
            try {
                await clientApi.post("/auth/register", user);
                navigate("/login");
            } catch (error) {
                console.log(error);
            }
        }
    };
    return (
        <div className="register">
            <div className="registerWrapper">
                <div className="registerLeft">
                    <h3 className="registerLogo">Socialize</h3>
                    <span className="registerDesc">
                        Connect with friends and the world around you on Socialize.
                    </span>
                </div>
                <div className="registerRight">
                    <form onSubmit={handleSubmit} className="registerBox">
                        <input
                            type="text"
                            required
                            ref={username}
                            placeholder="Username"
                            className="registerInput"
                        />
                        <input
                            type="email"
                            required
                            ref={email}
                            placeholder="Email"
                            className="registerInput"
                        />
                        <input
                            type="password"
                            required
                            ref={pass}
                            minLength={6}
                            placeholder="Password"
                            className="registerInput"
                        />
                        <input
                            type="password"
                            required
                            ref={confirmPass}
                            minLength={6}
                            placeholder="Confirm Password"
                            className="registerInput"
                        />
                        <button type="submit" className="registerButton">
                            Sign Up
                        </button>
                        <Link to={"/login"} className="registerLoginButton">
                            Log into Account
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
