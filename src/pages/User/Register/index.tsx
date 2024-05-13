import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
// import { getInfo, login } from '@/services/Auth/auth';
import { Link, useModel } from 'umi';
import styles from './index.less';
import Title from 'antd/lib/typography/Title';
import {
  EditOutlined,
  LockOutlined,
  MailOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { history } from 'umi';
// import data from '@/utils/data';

const Login: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const { loading, setLoading, registerModel } = useModel('user');

  const onFinish = async (values: any) => {
    // console.log('Success:', values);
    console.log('Success:', values?.user);
    const user = values?.user;
    const res = await registerModel({ user });
    console.log('res', res);
    if (res.status === 201) {
      history.push('/user/login');
    }
    return;
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.top}>
          <Link to="/" className={styles.header}>
            <img alt="logo" className={styles.logo} src="/logo.svg" />
            <Title level={1} className={styles.title}>
              Ecommerce
            </Title>
          </Link>
        </div>

        <div className={styles.main}>
          <Form
            name="normal_login"
            className={styles.loginForm}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            validateMessages={validateMessages}
          >
            <Form.Item
              name={['user', 'first_name']}
              className={styles.loginForm}
              rules={[{ required: true }]}
            >
              <Input
                prefix={<EditOutlined className="site-form-item-icon" />}
                placeholder="First Name"
              />
            </Form.Item>
            <Form.Item
              name={['user', 'last_name']}
              className={styles.loginForm}
              rules={[{ required: true }]}
            >
              <Input
                prefix={<EditOutlined className="site-form-item-icon" />}
                placeholder="Last Name"
              />
            </Form.Item>
            <Form.Item
              name={['user', 'email']}
              className={styles.loginForm}
              rules={[{ required: true, type: 'email' }]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name={['user', 'username']}
              rules={[{ required: true, message: 'Nhập tài khoản!' }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Tài khoản"
              />
            </Form.Item>
            <Form.Item
              name={['user', 'password']}
              rules={[{ required: true, message: 'Nhập mật khẩu!' }]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Mật khẩu"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.loginFormButton}
              >
                Đăng ký
              </Button>
              <a href="/user/login" className={styles.loginFormRegister}>
                Đăng nhập
              </a>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
