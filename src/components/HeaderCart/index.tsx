import React, { useEffect } from 'react';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Badge } from 'antd';
import { history, useModel } from '@umijs/max';
import { user_info } from '@/services/user/user';

const onSearch = (value: string) => history.push('/cart');

const App: React.FC = () => {
  const cart = useModel('cart');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const asyncFunc = async () => {
        const userId = await user_info();
        console.log(userId.data?.id, 'userId');
        const condition = {
          user_id: userId.data?.id,
        };
        cart.getData({ ...condition });
      };
      asyncFunc();
    }
  }, []);

  return (
    <div style={{ display: 'flex', cursor: 'pointer' }} onClick={onSearch}>
      <Badge count={cart.danhSach.length}>
        <ShoppingCartOutlined style={{ fontSize: 24 }} />
      </Badge>
    </div>
  );
};

export default App;
