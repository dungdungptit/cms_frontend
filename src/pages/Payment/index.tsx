import React, { useEffect, useState } from 'react';
import { useModel, history } from '@umijs/max';
import styles from './index.less';
import { user_info } from '@/services/user/user';
import {
  Breadcrumb,
  Button,
  Card,
  InputNumber,
  Table,
  Radio,
  Form,
  Input,
  message,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ip } from '@/utils/ip';
import AddressPanel from './components/AddressPanel';
import { post_order } from '@/services/orders/orders';

const HomePage: React.FC = () => {
  const address = useModel('address');
  const cart = useModel('cart');
  const [user, setUser] = useState<any>({});
  // const [cartState, setCartState] = useState<any>({});
  const [valueShipmentMethod, setValueShipmentMethod] = useState<any>('normal');
  const [valuePaymentMethod, setValuePaymentMethod] = useState<any>('cash');
  const [cardInfo, setCardInfo] = useState<any>({});
  const [note, setNote] = useState<any>('');

  useEffect(() => {
    // console.log(history.location, 'history.location.query');
    // setCartState(history.location.state);
    const token = localStorage.getItem('token');
    if (token) {
      const asyncFunc = async () => {
        const userId = await user_info();
        console.log(userId.data?.id, 'userId');
        const condition = {
          user: userId.data?.id,
        };
        setUser(userId.data);
        address.getData({ ...condition });
      };
      asyncFunc().then(() => {
        if (address.danhSach.length > 0) {
          address.setRecordSelected(address.danhSach[0]);
        }
      });
    }
  }, []);
  // console.log(address.danhSach, 'address.danhSach');
  // console.log(user, 'user');
  // console.log(cardInfo, 'cardInfo');

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
        return <div>{String(record?.product?.title).slice(0, 10)}</div>;
      },
    },
    {
      title: 'Ảnh',
      dataIndex: 'image',
      render: (value: any, record: any) => {
        const replaceString = 'http://product-service:9000';
        const newString = `${ip}:9116`;
        const newImage = String(record?.product?.images[0]?.image).replace(
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
        return <div>{formatter.format(Number(record?.product?.price))}</div>;
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
            {formatter.format(
              Number(record?.product?.price) * Number(record?.quantity),
            )}
          </div>
        );
      },
    },
  ];

  const onChangeShipmentMethod = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValueShipmentMethod(e.target.value);
  };

  const onChangePaymentMethod = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValuePaymentMethod(e.target.value);
  };

  const onChangeNote = (e: any) => {
    setNote(e.target.value);
  };

  const handleOrder = async () => {
    let cost = 0;
    if (valueShipmentMethod === 'normal') {
      cost = 10;
    } else if (valueShipmentMethod === 'fast') {
      cost = 20;
    } else {
      cost = 30;
    }
    if (valuePaymentMethod === 'card') {
      const data = {
        user_id: user.id,
        address_id: address.recordSelected?.id,
        payment_method: valuePaymentMethod,
        shipment_method: valueShipmentMethod,
        cost: cost,
        note: note,
        cart_ids: cart.record?.selectedRows.map((item: any) => item.id),
        cart_number: cardInfo.cart_number,
        cvv: cardInfo.cvv,
      };
      console.log(data, 'data');
      await post_order(data).then((res) => {
        message.success('Đặt hàng thành công');
        history.push('/orders');
      });
    } else {
      const data = {
        user_id: user.id,
        address_id: address.recordSelected?.id,
        payment_method: valuePaymentMethod,
        shipment_method: valueShipmentMethod,
        cost: cost,
        note: note,
        cart_ids: cart.record?.selectedRows.map((item: any) => item.id),
      };
      console.log(data, 'data');
      await post_order(data).then((res) => {
        message.success('Đặt hàng thành công');
        history.push('/orders');
      });
    }
  };

  return (
    <div className={styles.container}>
      <Breadcrumb>
        <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item>Thanh toán</Breadcrumb.Item>
      </Breadcrumb>

      <Card title="Địa chỉ giao hàng" style={{ width: '100%' }}>
        <div className={styles.info}>
          {address.recordSelected?.receiver_name} -
          {address.recordSelected?.receiver_phone}
        </div>
        <div className={styles.address}>
          {address.recordSelected?.address}, {address.recordSelected?.street},{' '}
          {address.recordSelected?.town}, {address.recordSelected?.city}
        </div>
        <AddressPanel
          title={address.danhSach.length > 0 ? 'Thay đổi' : 'Thêm địa chỉ'}
        />
      </Card>

      <Table
        columns={columns}
        dataSource={(cart.record?.selectedRows || []).map(
          (item: any, index: number) => {
            return {
              ...item,
              key: index + 1,
            };
          },
        )}
      />

      <Card title="Phương thức giao hàng" style={{ width: '100%' }}>
        <Radio.Group
          onChange={onChangeShipmentMethod}
          value={valueShipmentMethod}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <Radio value={'normal'} key={'normal'}>
            {' '}
            Giao hàng tiêu chuẩn (4-5 ngày, phí 10.000đ)
          </Radio>
          <Radio value={'fast'} key={'fast'}>
            {' '}
            Giao hàng nhanh (2-3 ngày, phí 20.000đ)
          </Radio>
          <Radio value={'express'} key={'express'}>
            {' '}
            Giao hàng hỏa tốc (1 ngày, phí 30.000đ)
          </Radio>
        </Radio.Group>
      </Card>

      <Card title="Lưu ý" style={{ width: '100%' }}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={() => {}}
          onFinishFailed={() => {}}
          autoComplete="off"
        >
          <Form.Item name="note">
            <Input onChange={onChangeNote} />
          </Form.Item>
        </Form>
      </Card>

      <Card title="Phương thức thanh toán" style={{ width: '100%' }}>
        <Radio.Group
          onChange={onChangePaymentMethod}
          value={valuePaymentMethod}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <Radio value={'cash'} key={'cash'}>
            {' '}
            Thanh toán khi nhận hàng
          </Radio>
          <Radio value={'card'} key={'card'}>
            {' '}
            Thanh toán bằng thẻ
          </Radio>
        </Radio.Group>
      </Card>

      {valuePaymentMethod === 'card' && (
        <Card title="Thông tin thẻ" style={{ width: '100%' }}>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={() => {}}
            onFinishFailed={() => {}}
            autoComplete="off"
          >
            <Form.Item
              label="Số thẻ"
              name="card_number"
              rules={[{ required: true, message: 'Nhập số thẻ!' }]}
            >
              <Input
                onChange={(e) =>
                  setCardInfo({ ...cardInfo, card_number: e.target.value })
                }
              />
            </Form.Item>

            <Form.Item
              label="Tên chủ thẻ"
              name="card_name"
              rules={[{ required: true, message: 'Nhập tên chủ thẻ!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Ngày hết hạn"
              name="card_expired"
              rules={[{ required: true, message: 'Nhập ngày hết hạn!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Mã CVV"
              name="cvv"
              rules={[{ required: true, message: 'Nhập mã CVV!' }]}
            >
              <Input
                onChange={(e) =>
                  setCardInfo({ ...cardInfo, cvv: e.target.value })
                }
              />
            </Form.Item>
          </Form>
        </Card>
      )}

      <div className={styles.total}>
        <div className={styles.total__title}>Tổng tiền</div>
        <div className={styles.total__price}>
          {cart.record?.total?.toLocaleString('en-US', {
            style: 'currency',
            currency: 'VND',
          })}
          <Button type="primary" onClick={handleOrder}>
            Đặt hàng
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
