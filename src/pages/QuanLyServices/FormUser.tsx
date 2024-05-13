/* eslint-disable no-underscore-dangle */
import {
  Form,
  Input,
  Button,
  Card,
  Select,
  Spin,
  InputNumber,
  Col,
  Row,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useModel } from 'umi';
import moment from 'moment';

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 15 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const FormUser = () => {
  const [form] = Form.useForm();
  const servicesModel = useModel('services');

  const handleFinish = async (values: any) => {
    if (servicesModel.edit) {
      if (servicesModel?.record?.id) {
        await servicesModel.upd({
          ...servicesModel?.record,
          ...values,
        });
      } else {
        await servicesModel.add(values);
      }
    } else {
      await servicesModel.add(values);
    }
  };
  // console.log(groupsModel, 'form.getFieldValue()');
  return (
    <Spin spinning={servicesModel.loading}>
      <Card
        title={servicesModel.edit ? 'Chỉnh sửa' : 'Thêm mới'}
        style={{
          marginTop: 20,
        }}
      >
        <Form
          {...layout}
          form={form}
          onFinish={handleFinish}
          initialValues={{
            ...(servicesModel?.record ?? {}),
          }}
        >
          <Form.Item label="service name" name="service_name">
            <Input placeholder="service name" disabled={servicesModel.edit} />
          </Form.Item>
          <Form.Item label="service url" name="service_url">
            <Input placeholder="service url" />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              {servicesModel.edit ? 'Cập nhật' : 'Thêm mới'}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Spin>
  );
};

export default FormUser;
