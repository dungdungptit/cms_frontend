import axios from '../utils/axios';
import { ip } from '@/utils/ip';

export const post_image = (payload: any) => {
    return axios.post(`${ip}:9111/upload_img`, payload);
}