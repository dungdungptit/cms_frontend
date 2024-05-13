import React, { useState } from 'react';
import { PictureOutlined, PlusOutlined } from '@ant-design/icons';
import { Input, Form, Upload, Modal, Button } from 'antd';
import { useModel } from 'umi';
import { post_image } from '@/services/ai_search';
import styles from './index.less';

const { Search } = Input;

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const productsModel = useModel('products');
  const [formSearch] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    // console.log(formSearch.getFieldsValue(), 'form.getFieldValue()');
    const { fileList } = formSearch.getFieldsValue();
    console.log(fileList, 'fileList');
    const formData = new FormData();
    formData.append('file', fileList?.fileList[0]?.originFileObj);

    const res = await post_image(formData);
    console.log(res, 'res');
    productsModel.setCondition({
      ...productsModel.condition,
      search: res.data,
    });

    productsModel.getData({
      ...productsModel.condition,
      search: res.data,
    });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const suffix = (
    <PictureOutlined
      style={{
        fontSize: 16,
        color: '#1890ff',
      }}
      onClick={() => showModal()}
    />
  );

  const onSearch = (value: string) => {
    productsModel.setCondition({
      ...productsModel.condition,
      search: value,
    });
    productsModel.getData({
      ...productsModel.condition,
      search: value,
    });
  };

  return (
    <Search
      className={styles.searchInput}
      placeholder="Tìm kiếm"
      size="middle"
      allowClear
      onSearch={onSearch}
    />
  );
};

export default App;
