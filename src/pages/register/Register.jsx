import "./register.css";

const Register = () => {
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
                    <div className="registerBox">
                        <input type="text" placeholder="Username" className="registerInput" />
                        <input type="text" placeholder="Email" className="registerInput" />
                        <input type="text" placeholder="Password" className="registerInput" />
                        <input
                            type="text"
                            placeholder="Confirm Password"
                            className="registerInput"
                        />
                        <button className="registerButton">Sign Up</button>
                        <button className="registerLoginButton">Log into Account</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
