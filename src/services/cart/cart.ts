import axios from '../../utils/axios';
import { ip } from '@/utils/ip';

export const getCarts = (payload: any) => {
    return axios.get(`${ip}:9999/carts`, { params: payload });
};

export const update_cartitem = (payload: { id: string, value: string }) => {
    return axios.put(`${ip}:9999/carts/${payload.id}`, { update: payload.value });
}

export const delete_cartitem = (payload: { id: string }) => {
    return axios.delete(`${ip}:9999/carts/${payload.id}`);
}