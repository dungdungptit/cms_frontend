import React, { useEffect, useState } from 'react';
import { useModel, history } from 'umi';
import styles from './index.less';
import { user_info } from '@/services/user/user';
import { Breadcrumb, Button, InputNumber, Table, Card, Divider } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ip } from '@/utils/ip';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const HomePage: React.FC = () => {
  const orders = useModel('orders');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const asyncFunc = async () => {
        const userId = await user_info();
        console.log(userId.data?.id, 'userId');
        const condition = {
          user_id: userId.data?.id,
        };
        orders.getData({ ...condition });
      };
      asyncFunc();
    }
  }, []);

  const columns: ColumnsType<DataType> = [
    {
      title: 'STT',
      dataIndex: 'key',
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'title',
      render: (value: any, record: any) => {
        // console.log(record, 'record');
        return <div>{String(record?.info?.title).slice(0, 10)}</div>;
      },
    },
    {
      title: 'Ảnh',
      dataIndex: 'image',
      render: (value: any, record: any) => {
        const replaceString = 'http://product-service:9000';
        const newString = `${ip}:9116`;
        const newImage = String(record?.info?.images[0]?.image).replace(
          replaceString,
          newString,
        );

        // console.log(newImage, 'newImage');

        return (
          <img
            src={newImage}
            style={{ width: 80, height: 80, objectFit: 'cover' }}
          />
        );
      },
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      render: (value: any, record: any) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {record?.quantity}
        </div>
      ),
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      render: (value: any, record: any) => {
        const config = {
          style: 'currency',
          currency: 'VND',
          maximumFractionDigits: 9,
        };
        const formatter = new Intl.NumberFormat('vi-VN', config);
        return <div>{formatter.format(Number(record?.price))}</div>;
      },
    },
    {
      title: 'Thành tiền',
      dataIndex: 'total',
      render: (value: any, record: any) => {
        const config = {
          style: 'currency',
          currency: 'VND',
          maximumFractionDigits: 9,
        };
        const formatter = new Intl.NumberFormat('vi-VN', config);
        return (
          <div>
            {formatter.format(Number(record?.price) * Number(record?.quantity))}
          </div>
        );
      },
    },
    {
      title: 'Thao tác',
      dataIndex: 'action',
      render: (value: any, record: any) => {
        return (
          <div>
            <Button
              type="primary"
              shape="circle"
              title="Xem chi tiết"
              icon={<EyeOutlined />}
              onClick={() => {
                history.push(`/products/${record?.info?.id}`);
              }}
            />

            {record?.shipment?.shipment_status === 'shipped' ? (
              <>
                <Divider type="vertical" />
                <Button
                  type="primary"
                  shape="circle"
                  title="Đánh giá"
                  icon={<EditOutlined />}
                  onClick={() => {
                    history.push(`/products/${record?.info?.id}`);
                  }}
                />
              </>
            ) : null}
          </div>
        );
      },
    },
  ];

  return (
    <div className={styles.container}>
      <Breadcrumb>
        <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item>Đơn hàng</Breadcrumb.Item>
      </Breadcrumb>

      {orders.danhSach?.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.empty__title}>Bạn chưa có đơn hàng nào</div>
          <Button
            type="primary"
            onClick={() => {
              history.push('/products');
            }}
          >
            Mua hàng
          </Button>
        </div>
      ) : (
        orders.danhSach?.map((item: any, index: number) => {
          return (
            <Card className={styles.order} key={index}>
              <div className={styles.order__title}>
                Đơn hàng {index + 1} -{' '}
                {new Date(item?.created).toLocaleDateString('vi-VN')}
              </div>
              <div className={styles.order__status}>
                Trạng thái:{' '}
                <span
                  style={{
                    color:
                      item?.shipment?.shipment_status === 'waiting'
                        ? 'red'
                        : 'green',
                  }}
                >
                  {item?.shipment?.shipment_status === 'waiting'
                    ? 'Chờ xác nhận'
                    : item?.shipment?.shipment_status === 'shipped'
                    ? 'Đã giao hàng'
                    : 'Đang giao hàng'}
                </span>
              </div>
              <Table
                columns={columns}
                dataSource={(item?.products || []).map(
                  (item: any, index: number) => {
                    return {
                      ...item,
                      key: index + 1,
                    };
                  },
                )}
              />
              <div className={styles.shipment}>
                <div style={{ width: '100%' }}>
                  <div className={styles.info}>
                    {item?.address?.receiver_name} -
                    {item?.address?.receiver_phone}
                  </div>
                  <div className={styles.address}>
                    {item?.address?.address}, {item?.address?.street},{' '}
                    {item?.address?.town}, {item?.address?.city}
                  </div>
                </div>
                <div className={styles.total}>
                  <div className={styles.total__title}>Tổng tiền</div>
                  <div className={styles.total__price}>
                    {item?.payment?.amount.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'VND',
                    })}
                  </div>
                </div>
              </div>
            </Card>
          );
        })
      )}
    </div>
  );
};

export default HomePage;
