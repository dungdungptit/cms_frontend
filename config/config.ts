import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';

export default defineConfig({
  antd: {

  },
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    // https://umijs.org/zh-CN/plugins/plugin-layout
    locale: true,
    siderWidth: 220,
    ...defaultSettings,
  },
  locale: {
    // enable: true,
    default: 'vi-VN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: false,
    // baseSeparator: '_',
  },
  routes: [
    {
      path: '/user',
      layout: false,
      routes: [
        {
          path: '/user/login',
          layout: false,
          name: 'login',
          // component: './auth',
          component: './User/Login',
        },

        {
          path: '/user',
          redirect: '/user/login',
        },
        {
          name: 'register',
          layout: false,
          path: '/user/register',
          component: './User/Register',
        },
        {
          component: '404',
        },
      ],
    },
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: 'Trang chủ',
      path: '/home',
      component: './Home',
    },
    {
      name: 'Sản phẩm',
      path: '/products',
      component: './Products',
    },
    {
      name: 'Chi tiết sản phẩm',
      path: '/products/:id',
      component: './Products/components/ProductItem.tsx',
    },
    {
      name: 'Giới thiệu',
      path: '/about',
      component: './Abouts',
    },
    {
      name: 'Liên hệ',
      path: '/contact',
      component: './Contact',
    },
    {
      name: 'Giỏ hàng',
      path: '/cart',
      component: './Cart',
    },
    {
      name: 'Thanh toán',
      path: '/checkout',
      component: './Payment',
    },
    {
      name: 'Đơn hàng',
      path: '/orders',
      component: './Order',
    },
    {
      name: 'Wishlist',
      path: '/wishlist',
      component: './Wishlist',
    },
    {
      path: '/admin_user',
      name: 'danhsachnguoidung',
      component: './QuanLyNguoiDung',
    },
    {
      path: '/admin_service',
      name: 'danhsachservice',
      component: './QuanLyServices',
    },
    {
      component: '404',
    },
  ],
  npmClient: 'yarn',
});

