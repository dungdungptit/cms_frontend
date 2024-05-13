import Footer from '@/components/Footer';
import RightContent from '@/components/RightContent';
import { RunTimeLayoutConfig, history } from '@umijs/max';
import Settings from '../config/defaultSettings';
import Header from '@/components/Header';
import NotAccessible from './pages/exception/403';
import NotFoundContent from './pages/exception/404';
import { user_info } from './services/user/user';
// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://next.umijs.org/docs/api/runtime-config#getinitialstate
const loginPath = '/user/login';
const registerPath = '/user/register';

enum ESystemRole {
  Admin = 'Admin',
  User = 'User',
  Staff = 'Staff',
}

export async function getInitialState(): Promise<{
  currentUser?: Login.User;
  // currentUser?: {
  //   hoDem: string;
  //   ten: string;
  //   systemRole: string;
  // };
  fetchUserInfo?: () => Promise<{ data: { data: Login.User } } | undefined>;
}> {
  const fetchUserInfo: () => Promise<any> = async () => {
    try {
      const auth = localStorage.getItem('vaiTro') as ESystemRole;
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('username');
      let currentUser;
      console.log(username);

      if (auth && token) {
        console.log('auth', auth);
        console.log(await user_info());
        currentUser = (await user_info())?.data;
      }
      return {
        ...currentUser,
        systemRole: auth,
      };
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('vaiTro');
      localStorage.removeItem('username');
      const { location } = history;
      // if (
      //   location.pathname === loginPath ||
      //   location.pathname === registerPath
      // ) {
      //   console.log('location.pathname', location.pathname);
      // }
    }
    return undefined;
  };
  if (history.location.pathname !== loginPath) {
    const currentUser: Login.User = await fetchUserInfo();
    console.log(currentUser);
    // const phanNhom = await getPhanNhom();
    return {
      fetchUserInfo,
      currentUser,
    };
  }

  return {
    fetchUserInfo,
  };
}

export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    // 常用属性
    unAccessible: <NotAccessible />,
    noFound: <NotFoundContent />,
    title: 'Ant Design',
    onPageChange: () => {
      // console.log('initialState', initialState);
      const { location } = history;
      const token = localStorage.getItem('token');
      if (
        location.pathname === loginPath ||
        location.pathname === registerPath
      ) {
        console.log('location.pathname', location.pathname);
      }
      // if (!token && location.pathname !== loginPath) {
      //   history.push(loginPath);
      // } else if (initialState?.currentUser && token) {
      //   history.push(location.pathname);
      // }
    },
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',

    // 默认布局调整
    footerRender: () => <Footer />,
    headerRender: () => <Header />,
    menuHeaderRender: undefined,
    ...Settings,

    // 其他属性见：https://procomponents.ant.design/components/layout#prolayout
  };
};
