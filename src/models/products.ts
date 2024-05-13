// 全局共享数据示例
import { DEFAULT_NAME } from '@/constants';
import { useState } from 'react';
import { message } from 'antd';
import { getProducts, getProduct, add_to_cart, get_categories } from '../services/products/products';

export default () => {
    const [name, setName] = useState<string>(DEFAULT_NAME);
    const [danhSach, setDanhSach] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [product, setProduct] = useState<any>(null);
    const [condition, setCondition] = useState<any>({});
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(20);
    const [total, setTotal] = useState<number>(0);

    const getData = (payload: any) => {
        try {
            getProducts(payload).then((res) => {
                setDanhSach(res.data?.data);
                setTotal(res.data?.count);
            });
        } catch (error) {
            console.log(error);
        }
    };

    const getCategories = (payload: any) => {
        try {
            get_categories(payload).then((res) => {
                setCategories(res.data?.results);
            });
        } catch (error) {
            console.log(error);
        }
    };

    const getProductById = (id: any) => {
        try {
            getProduct(id).then((res) => {
                setProduct(res.data?.data);
            });
        } catch (error) {
            console.log(error);
        }
    };

    const addToCart = (payload: any) => {
        try {
            add_to_cart(payload).then((res) => {
                if (res.status === 201) message.success('Thêm vào giỏ hàng thành công');
            });
        } catch (error) {
            console.log(error);
            message.error('Sản phẩm đã hết hoặc ngừng kinh doanh');
        }
    };

    return {
        name,
        setName,
        danhSach,
        setDanhSach,
        categories,
        setCategories,
        product,
        setProduct,
        condition,
        setCondition,
        page,
        setPage,
        pageSize,
        setPageSize,
        total,
        setTotal,

        getData,
        getProductById,
        addToCart,
        getCategories
    };
};

