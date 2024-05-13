// 全局共享数据示例
import { DEFAULT_NAME } from '@/constants';
import { useState } from 'react';
import { message } from 'antd';
import { getCarts, update_cartitem, delete_cartitem } from '../services/cart/cart';

export default () => {
    const [name, setName] = useState<string>(DEFAULT_NAME);
    const [danhSach, setDanhSach] = useState<any[]>([]);
    const [record, setRecord] = useState<any>({});

    const getData = (payload: any) => {
        try {
            getCarts(payload).then((res) => {
                setDanhSach(res.data?.data);
            });
        } catch (error) {
            console.log(error);
        }
    };

    const updateCartItem = (payload: { id: string, value: string, user_id: any }) => {
        try {
            const data = {
                id: payload.id,
                value: payload.value,
            };

            const user_id = {
                user_id: payload.user_id,
            }
            update_cartitem(data).then((res) => {
                if (res.status === 200) {
                    message.success('Cập nhật thành công');
                    getData({ ...user_id });
                }
            });
        } catch (error) {
            console.log(error);
            message.error('Lỗi cập nhật');
        }
    };

    const deleteCartItem = (payload: { id: string, user_id: any }) => {
        try {
            const data = {
                id: payload.id,
            };

            const user_id = {
                user_id: payload.user_id,
            }
            delete_cartitem(data).then((res) => {
                if (res.status === 204) {
                    message.success('Xóa thành công');
                    getData({ ...user_id });
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    return {
        name,
        setName,
        danhSach,
        setDanhSach,
        record,
        setRecord,

        getData,
        updateCartItem,
        deleteCartItem,
    };
};

