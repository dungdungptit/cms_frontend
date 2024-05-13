import { Tooltip } from 'antd';
import React from 'react';
import { history } from 'umi';

const MenuItem = ({ title, path, name }) => {
  return (
    <Tooltip placement={'bottom'} title={title}>
      <div
        style={{
          flex: 'auto',
          minWidth: 0,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          cursor: 'pointer',
        }}
        onClick={() => {
          history.push(path);
        }}
      >
        {name}
      </div>
    </Tooltip>
  );
};

export default MenuItem;
