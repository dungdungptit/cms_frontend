import axios from '../../utils/axios';
import { ip } from '@/utils/ip';

export const get_orders = (payload: any) => {
    return axios.get(`${ip}:9999/orders`, { params: payload });
};

export const post_order = (payload: any) => {
    return axios.post(`${ip}:9999/orders`, payload);
}
