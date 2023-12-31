import clientApi from "./network/network";

export const loginCall = async (userCredential, dispatch) => {
    dispatch({ type: "LOGIN_START" });
    try {
        const res = await clientApi.post("auth/login", userCredential);
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        localStorage.setItem("user", JSON.stringify(res.data));
    } catch (err) {
        dispatch({ type: "LOGIN_FAILURE", payload: err });
    }
};
