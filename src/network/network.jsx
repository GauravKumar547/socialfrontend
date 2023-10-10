import axios from "axios";

const clientApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
});
export default clientApi;
