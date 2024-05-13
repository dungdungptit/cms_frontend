import { useModel } from 'umi';
import { useEffect, useState } from 'react';
import { ip } from '@/utils/ip';
import AddressPanelForm from './AddressPanelForm';

import { Breadcrumb, Button, Modal, Radio } from 'antd';
import { user_info } from '@/services/user/user';

const App: React.FC = ({ title }) => {
  const address = useModel('address');

  const [user, setUser] = useState<any>({});
  const [value, setValue] = useState<any>({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const asyncFunc = async () => {
        const userId = await user_info();
        const condition = {
          user: userId.data?.id,
        };
        setUser(userId.data);
        address.getData({ ...condition });
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
    address.setRecordSelected(e.target.value);
  };

  return (
    <>
      <a type="primary" onClick={showModal}>
        {title}
      </a>
      <Modal
        title="Địa chỉ của tôi"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Xong"
        cancelText="Hủy"
      >
        <Radio.Group
          onChange={onChange}
          value={value}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          {address.danhSach?.map((item: any, index: number) => {
            return (
              <Radio value={item} key={index}>
                <div>
                  {user?.last_name} {user?.first_name} - {item.receiver_phone}
                </div>
                <div>
                  {item.address}, {item.street}, {item.town}, {item.city}
                </div>
              </Radio>
            );
          })}
        </Radio.Group>
        <AddressPanelForm />
      </Modal>
    </>
  );
};

export default App;
