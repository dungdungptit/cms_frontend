/* eslint-disable radix */
/* eslint-disable no-underscore-dangle */
import { IColumn } from '@/utils/interfaces';
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleFilled,
} from '@ant-design/icons';
import { Button, Divider, Popconfirm, Table, Modal, Card } from 'antd';
import React, { useEffect } from 'react';
import { useModel } from 'umi';
import FormUser from './FormUser';

const Index = () => {
  const servicesModel = useModel('services');

  useEffect(() => {
    servicesModel.getData();
  }, []);

  const handleEdit = (record: any) => {
    servicesModel.setVisibleForm(true);
    servicesModel.setEdit(true);
    servicesModel.setRecord(record);
  };

  const handleDel = async (record: any) => {
    await servicesModel.del(record?.service_name ?? '');
    servicesModel.getData();
  };

  const renderLast = (value: any, record: any) => (
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
  const columns: IColumn<any>[] = [
    {
      title: 'STT',
      dataIndex: 'index',
      width: 80,
      align: 'center',
    },
    {
      title: 'service name',
      dataIndex: 'service_name',
      search: 'search',
      notRegex: true,
      width: 200,
      align: 'center',
    },
    {
      title: 'service url',
      dataIndex: 'service_url',
      search: 'search',
      notRegex: true,
      width: 300,
      align: 'center',
    },

    {
      title: 'Thao tác',
      align: 'center',
      render: (value: any, record: any) => renderLast(value, record),
      fixed: 'right',
      width: 200,
    },
  ];

  return (
    <>
      <Modal
        width={600}
        onCancel={() => {
          servicesModel.setVisibleForm(false);
        }}
        destroyOnClose
        footer={false}
        bodyStyle={{ padding: 0 }}
        visible={servicesModel.visibleForm}
      >
        <FormUser />
      </Modal>

      <Card>
        <Button
          style={{
            width: 'max-content',
            marginBottom: 10,
          }}
          onClick={() => {
            servicesModel.setVisibleForm(true);
            servicesModel.setEdit(false);
            servicesModel.setRecord({});
          }}
          icon={<PlusCircleFilled />}
          type="primary"
        >
          Thêm mới
        </Button>

        <Table
          columns={columns}
          dataSource={servicesModel.danhSach.map((item, index) => ({
            ...item,
            index: index + 1,
            key: item.id,
          }))}
        />
      </Card>
    </>
  );
};

export default Index;
