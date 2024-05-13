import { Breadcrumb, Button, Typography, InputNumber, Rate, Form } from 'antd';
import styles from './index.less';
import { useModel } from 'umi';
import { useEffect, useState } from 'react';
import { ip } from '../../../utils/ip';
import { user_info } from '@/services/user/user';

const ProductItem = () => {
  const productsModel = useModel('products');
  const cart = useModel('cart');
  const pathname = window.location.pathname;
  const id = pathname.split('/').pop();
  const [quantity, setQuantity] = useState(1);
  // const [form] = Form.useForm();

  useEffect(() => {
    productsModel.getProductById(id);
  }, []);

  // console.log(productsModel.product);

  useEffect(() => {
    productsModel.getData({});
  }, []);

  const onChange = (value: number) => {
    console.log('changed', value);
    setQuantity(value);
  };

  const addToCart = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      const userId = await user_info();
      console.log(userId.data?.id, 'userId');
      const data = {
        user_id: userId.data?.id,
        product_id: productsModel.product?.id,
        quantity: quantity,
      };
      console.log(data);
      productsModel.addToCart(data);
      const condition = {
        user_id: userId.data?.id,
      };
      cart.getData({ ...condition });
    }
  };

  // console.log(form.getFieldsValue(), 'form.getFieldValue()');

  return (
    <div className={styles.container}>
      <Breadcrumb>
        <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item>Sản phẩm</Breadcrumb.Item>
        <Breadcrumb.Item>
          {String(productsModel.product?.title).slice(0, 10)}
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.image}>
            <img
              src={
                String(productsModel.product?.images[0]?.image).replace(
                  'http://product-service:9000',
                  `${ip}:9116`,
                ) || ''
              }
              alt=""
            />
          </div>
        </div>
        <div className={styles.right}>
          <Typography.Title style={{ marginTop: 0 }} level={4}>
            {productsModel.product?.title}
          </Typography.Title>
          <div className={styles.description}>
            <Typography.Title style={{ marginTop: 0 }} level={4}>
              Mô tả
            </Typography.Title>
            {productsModel.product?.description}
          </div>
          <div className={styles.status}>
            {productsModel.product?.status === 'on'
              ? 'Còn hàng'
              : 'Sản phẩm này đã hết hàng hoặc không có sẵn.'}
          </div>
          <div className={styles.price}>{productsModel.product?.price} ₫</div>
          <InputNumber
            className={styles.quantity}
            defaultValue={1}
            onChange={onChange}
            min={1}
            max={productsModel.product?.quantity}
          />
          <div className={styles.button}>
            <Button type="primary" onClick={addToCart}>
              Thêm vào giỏ hàng
            </Button>
            <Button type="primary">Mua ngay</Button>
            <Button type="primary">Thêm vào yêu thích</Button>
          </div>
        </div>
      </div>

      <div className={styles.review}>
        <Typography.Title style={{ marginTop: 0, marginBottom: 0 }} level={4}>
          Đánh giá sản phẩm
        </Typography.Title>
        <div className={styles.reviewList}>
          {productsModel.product?.comments?.map((item: any, idx: number) => {
            return (
              <div className={styles.reviewItem} key={idx}>
                <div className={styles.reviewItemTop}>
                  <Typography.Title style={{ marginTop: 0 }} level={4}>
                    {item?.title}
                  </Typography.Title>
                  <Typography.Title style={{ marginTop: 0 }} level={5}>
                    {`${item?.user?.username}`}
                  </Typography.Title>
                  <div className={styles.reviewItemLeftDate}>
                    {String(item?.created).replace('T', ' ').slice(0, 19)}
                  </div>
                  <Rate disabled defaultValue={Number(item?.rating)} />
                </div>
                <div className={styles.reviewItemBottom}>
                  <div className={styles.reviewItemBottomContent}>
                    Sản phẩm tuyệt vời, mình rất thích
                  </div>
                  <div className={styles.reviewItemBottomImage}>
                    {item?.images?.map((image: any, index: number) => {
                      return (
                        <img
                          key={index}
                          src={`${ip}:9113${image?.image}`}
                          alt=""
                          style={{
                            width: '100px',
                            height: '100px',
                            objectFit: 'cover',
                          }}
                        />
                      );
                    })}
                  </div>
                  <div className={styles.reviewItemBottomVideo}>
                    {item?.videos?.map((video: any, index: number) => {
                      return (
                        <video
                          key={index}
                          controls
                          style={{
                            width: '100px',
                            height: '100px',
                            objectFit: 'cover',
                          }}
                        >
                          <source
                            src={`${ip}:9113${video?.video}`}
                            type="video/mp4"
                          />
                        </video>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
