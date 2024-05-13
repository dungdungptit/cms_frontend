import axios from '../utils/axios';
import { ip } from '@/utils/ip';

export const get_address = (payload: any) => {
    return axios.get(`${ip}:9999/addresses`, { params: payload });
};

export const create_address = (payload: any) => {
    return axios.post(`${ip}:9999/addresses`, payload);
}

export const update_address = (payload: { id: string, value: any }) => {
    return axios.put(`${ip}:9999/addresses/${payload.id}`, { update: payload.value });
}

export const delete_address = (payload: { id: string }) => {
    return axios.delete(`${ip}:9999/addresses/${payload.id}`);
}