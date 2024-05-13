// 全局共享数据示例
import { DEFAULT_NAME } from '@/constants';
import { useState } from 'react';
import { message } from 'antd';
import { get_orders, post_order } from '../services/orders/orders';

export default () => {
    const [name, setName] = useState<string>(DEFAULT_NAME);
    const [danhSach, setDanhSach] = useState<any[]>([]);
    const [record, setRecord] = useState<any>({});

    const getData = (payload: any) => {
        try {
            get_orders(payload).then((res) => {
                setDanhSach(res.data?.data);
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
    };
};

