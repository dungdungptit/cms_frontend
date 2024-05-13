import { useModel } from 'umi';
import { useEffect, useState } from 'react';
import { ip } from '@/utils/ip';
import { local } from '../../../utils/constants';

import { Breadcrumb, Button, Modal, Radio, Form, Input, Select } from 'antd';
import { user_info } from '@/services/user/user';
import { create_address } from '@/services/address';

// tên tỉnh thành phố
const tenTinh = local.map((item: any) => {
  return item.name;
});

// tên quận huyện
const tenQuan = local.map((item: any) => {
  return item.districts.map((item: any) => {
    return item.name;
  });
});

// tên phường xã
const tenPhuong = local.map((item: any) => {
  return item.districts.map((item: any) => {
    return item.wards.map((item: any) => {
      return item.name;
    });
  });
});

const App: React.FC = ({ title }) => {
  const address = useModel('address');

  const [user, setUser] = useState<any>({});
  const [value, setValue] = useState<any>({});

  const [tinh, setTinh] = useState('');
  const [quan, setQuan] = useState([]);
  const [phuong, setPhuong] = useState([]);
  const onCitySelect = (e) => {
    setTinh(e);
    setQuan(tenQuan[tenTinh.indexOf(e)]);
    // console.log('onCitySelect', tenQuan[tenTinh.indexOf(e)]);
  };

  const onTownSelect = (e) => {
    setPhuong(
      tenPhuong[tenTinh.indexOf(tinh)][
        tenQuan[tenTinh.indexOf(tinh)].indexOf(e)
      ],
    );
    // console.log(
    //   'onTownSelect',
    //   tenPhuong[tenTinh.indexOf(tinh)][
    //     tenQuan[tenTinh.indexOf(tinh)].indexOf(e)
    //   ],
    // );
  };

  const onWardSelect = (e) => {
    // console.log('onWardSelect', e);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const asyncFunc = async () => {
        const userId = await user_info();
        setUser(userId.data);
      };
      asyncFunc();
    }
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  const onFinish = (values: any) => {
    // console.log('values:', values);
    const town_address = `${values.ward}, ${values.town}`;
    const data = {
      user: user.id,
      town: town_address,
      city: values.city,
      receiver_name: values.receiver_name,
      receiver_phone: values.receiver_phone,
      street: values.street,
      address: values.address,
    };

    address.setRecord(data);
    console.log('record', address.record);

    const asyncFunc = async (payload: any) => {
      const res = await create_address(payload);
      console.log('res', res);
    };
    asyncFunc(data).then(() => {
      address.getData({ user: user.id });
      handleOk();
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <a type="primary" onClick={showModal}>
        Thêm địa chỉ mới
      </a>
      <Modal
        title="Địa chỉ mới"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Xong"
        cancelText="Hủy"
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Người nhận"
            name="receiver_name"
            rules={[{ required: true, message: 'Nhập tên người nhận!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="receiver_phone"
            rules={[{ required: true, message: 'Nhập số điện thoại!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Tỉnh/Thành phố"
            name="city"
            rules={[{ required: true, message: 'Chọn tỉnh/thành phố!' }]}
          >
            <Select onChange={(e) => onCitySelect(e)}>
              {tenTinh.map((item: any, index: number) => {
                return (
                  <Select.Option key={index} value={item}>
                    {item}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item
            label="Quận/Huyện"
            name="town"
            rules={[{ required: true, message: 'Chọn quận/huyện!' }]}
          >
            <Select onChange={onTownSelect}>
              {quan?.map((item: any, index: number) => {
                return (
                  <Select.Option key={index} value={item}>
                    {item}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item
            label="Phường/Xã"
            name="ward"
            rules={[{ required: true, message: 'Chọn phường/xã!' }]}
          >
            <Select onChange={onWardSelect}>
              {phuong?.map((item: any, index: number) => {
                return (
                  <Select.Option key={index} value={item}>
                    {item}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item
            label="Tên đường"
            name="street"
            rules={[{ required: true, message: 'Nhập tên đường!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Địa chỉ cụ thể"
            name="address"
            rules={[{ required: true, message: 'Nhập địa chỉ cụ thể!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Thêm
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default App;
