/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import axios from '@/utils/axios';
import { ip } from '@/utils/ip';


export interface IPayload {
  page: number,
  limit: number,
  cond: object,
}

class Users<T> {
  name: string;
  url: string;

  constructor({ name, url }: { name: string; url: string }) {
    this.name = name;
    this.url = url || name;
  }

  del = async (id: string) => {
    return axios.delete(`${ip}:9999/${this.url}/${id}`);
  };

  get = async (payload: any) => {
    // console.log(payload);
    return axios.get(`${ip}:9999/${this.url}`, { params: payload });
  };

  add = async (payload: T) => {
    Object.keys(payload).forEach((key) => {
      // payload[key] = payload[key];
      payload[key] = payload[key];
    });
    return axios.post(`${ip}:9999/${this.url}`, payload);
  };

  add2 = async (payload: T) => {
    Object.keys(payload).forEach((key) => {
      // payload[key] = payload[key];
      payload[key] = payload[key];
    });
    return axios.post(`${ip}:9999/auth/${this.url}/`, payload);
  };

  upd = async (payload: any) => {
    const { service_name, service_url } = payload;
    return axios.put(`${ip}:9999/${this.url}/${service_name}`, { service_url });
  };
}

const users = new Users({ name: 'services', url: 'services' });

export default users;
