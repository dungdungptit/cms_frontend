import { Button, Dropdown, MenuProps, Space, Spin } from 'antd';
import React from 'react';
import { useAccess, useModel, history } from 'umi';
// import NoticeIcon from '../NoticeIcon';
import Avatar from './AvatarDropdown';
import styles from './index.less';

export type SiderTheme = 'light' | 'dark';

const loading = (
  <span>
    <Spin
      size="small"
      style={{
        marginLeft: 8,
        marginRight: 8,
      }}
    />
  </span>
);

const App: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const userModel = useModel('user');
  const access = useAccess();

  console.log('access', access);

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a rel="noopener noreferrer" href="#">
          Trang cá nhân
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <span
          onClick={() => {
            history.push('/orders');
          }}
        >
          Đơn hàng
        </span>
      ),
    },
    {
      key: '3',
      label: (
        <span
          onClick={() => {
            userModel.logoutModel({});
            setInitialState({ ...initialState, currentUser: undefined });
            history.push('/user/login');
          }}
        >
          Đăng xuất
        </span>
      ),
    },
  ];
  if (!initialState) {
    return loading;
  }

  const { currentUser } = initialState;
  if (!currentUser) {
    return loading;
  }

  if (access.admin === true) {
    // clear items
    items.splice(0, items.length);
    items.push({
      key: '1',
      label: (
        <span
          onClick={() => {
            history.push('/admin_service');
          }}
        >
          Service Discovery
        </span>
      ),
    });
    items.push({
      key: '2',
      label: (
        <span
          onClick={() => {
            history.push('/admin_user');
          }}
        >
          Quản lý người dùng
        </span>
      ),
    });
    items.push({
      key: '3',
      label: (
        <span
          onClick={() => {
            userModel.logoutModel({});
            setInitialState({ ...initialState, currentUser: undefined });
            history.push('/user/login');
          }}
        >
          Đăng xuất
        </span>
      ),
    });
  }

  return (
    <Space direction="vertical" style={{ marginRight: 17 }}>
      <Space wrap>
        <Dropdown menu={{ items }} placement="bottomLeft">
          <Button>{`${currentUser?.username}` || `Dung`}</Button>
        </Dropdown>
      </Space>
    </Space>
  );
};

export default App;
