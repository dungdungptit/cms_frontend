/* eslint-disable radix */
/* eslint-disable no-underscore-dangle */
import type { IUserRecord } from '@/models/users';
import { IColumn } from '@/utils/interfaces';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Divider, Popconfirm, Table } from 'antd';
import React, { useEffect } from 'react';
import { useModel } from 'umi';
import FormUser from './FormUser';

const Index = () => {
  const userModel = useModel('users');

  useEffect(() => {
    userModel.getData();
  }, []);

  const handleEdit = (record: IUserRecord) => {
    userModel.setVisibleForm(true);
    userModel.setEdit(true);
    userModel.setRecord(record);
  };

  const handleDel = async (record: IUserRecord) => {
    await userModel.del(record?.id ?? '');
  };

  const renderLast = (value: any, record: IUserRecord) => (
    <React.Fragment>
      <Button
        type="primary"
        shape="circle"
        icon={<EditOutlined />}
        title="Chỉnh sửa"
        onClick={() => handleEdit(record)}
      />
      <Divider type="vertical" />
      <Popconfirm
        title="Bạn có muốn xóa?"
        okText="Có"
        cancelText="Không"
        onConfirm={() => handleDel(record)}
      >
        <Button
          type="danger"
          shape="circle"
          icon={<DeleteOutlined />}
          title="Xóa"
        />
      </Popconfirm>
    </React.Fragment>
  );
  const columns: IColumn<IUserRecord>[] = [
    {
      title: 'STT',
      dataIndex: 'index',
      width: 80,
      align: 'center',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      search: 'search',
      notRegex: true,
      width: 200,
      align: 'center',
    },
    {
      title: 'Họ và tên đệm',
      dataIndex: 'first_name',
      search: 'search',
      notRegex: true,
      width: 300,
      align: 'center',
    },
    {
      title: 'Tên',
      dataIndex: 'last_name',
      search: 'search',
      notRegex: true,
      width: 150,
      align: 'center',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      search: 'search',
      notRegex: true,
      width: 300,
      align: 'center',
    },
    {
      title: 'Thao tác',
      align: 'center',
      render: (value: any, record: IUserRecord) => renderLast(value, record),
      fixed: 'right',
      width: 200,
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={userModel.danhSach.map((item, index) => ({
          ...item,
          index: index + 1,
          key: item.id,
        }))}
      />
    </>
  );
};

export default Index;
