import axios from "../../utils/axios";
import { ip } from "../../utils/ip";

export const register = (data: any) => {
    console.log(data);
    return axios.post(`${ip}:9118/users/auth/register`, data);
};

export const login = (data: any) => {
    return axios.post(`${ip}:9118/users/auth/login`, data);
};

export const logout = (data: any) => {
    return axios.post(`${ip}:9118/users/auth/logout`, data);
};

export const user_info = () => {
    return axios.get(`${ip}:9118/users/me`);
};