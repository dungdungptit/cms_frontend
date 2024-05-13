import { useState } from 'react';
import {
    login,
    register,
    logout,
} from '../services/user/user';

export default () => {
    // const { initialState, setInitialState } = useModel('@@initialState');
    const [loading, setLoading] = useState<boolean>(false);

    const loginModel = async (payload: { username: string; password: string }) => {
        setLoading(true);
        const response = await login(payload);
        console.log(response);
        const token = response.data;

        localStorage.setItem('token', token);

        setLoading(false);
        return response;
    };

    const logoutModel = async (payload: any) => {
        console.log('logout');
        // const response = await logout(payload);

        localStorage.removeItem('token');
        localStorage.removeItem('vaiTro');
        localStorage.removeItem('username');
        // return response;
    };

    const registerModel = async (payload: any) => {
        setLoading(true);
        const response = await register(payload?.user);
        setLoading(false);
        return response;
    };

    return {
        loading,
        setLoading,
        loginModel,
        logoutModel,
        registerModel,
    };
};
