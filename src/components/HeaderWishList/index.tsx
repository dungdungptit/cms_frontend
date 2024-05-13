import React from 'react';
import { HeartOutlined } from '@ant-design/icons';
import { Badge } from 'antd';
import { history } from '@umijs/max';

const onSearch = (value: string) => history.push('/wishlist');

const App: React.FC = () => (
  <div style={{ display: 'flex', cursor: 'pointer' }} onClick={onSearch}>
    <Badge count={0}>
      <HeartOutlined style={{ fontSize: 24 }} />
    </Badge>
  </div>
);

export default App;
