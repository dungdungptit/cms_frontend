import axios from '../../utils/axios';
import { ip } from '@/utils/ip';

export const getProducts = (payload: any) => {
    return axios.get(`${ip}:9999/products`, { params: payload });
};

export const get_categories = (payload: any) => {
    return axios.get(`${ip}:9116/categories`, { params: payload });
};

export const getProduct = (id: any) => {
    return axios.get(`${ip}:9999/products/${id}`);
};

export const add_to_cart = (payload: any) => {
    return axios.post(`${ip}:9999/carts`, payload);
}