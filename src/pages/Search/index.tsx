import { Breadcrumb, Button } from 'antd';
import styles from './index.less';
import { useModel } from 'umi';
import { useEffect } from 'react';
import { ip } from '@/utils/ip';

const HomePage: React.FC = () => {
  const productsModel = useModel('products');

  const p = {
    id: 1,
    title:
      'T_SHIRT Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente, quam! Ullam similique, sunt atque ex modi dolor enim corporis eum voluptate fugiat id facere eveniet deleniti, ad quidem facilis nobis',
    quantity: 123,
    price: 12.34,
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt voluptas laboriosam, est ad aliquid perferendis ea voluptates veritatis, magni ab voluptatum repudiandae nemo dignissimos dolor hic corporis at accusamus totam?\nVoluptas totam eveniet enim reiciendis quam iusto quidem? Facilis recusandae exercitationem deserunt velit deleniti repellat consequatur architecto repellendus, eum inventore, ipsa harum odit, sequi aut? Eaque cum suscipit quaerat amet?\nExcepturi eos suscipit beatae velit eveniet aspernatur, quam reprehenderit veritatis. At harum numquam doloremque, minus sed voluptas porro illo sequi facilis. At sint officiis deserunt minus ratione saepe placeat inventore.',
    status: 'on',
    created: '2022-03-13T13:55:05.058000+07:00',
    updated: '2022-03-13T13:55:05.058000+07:00',
    categories: [
      {
        id: 1,
        name: 't-shirt',
        code: 't-shirt',
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt voluptas laboriosam, est ad aliquid perferendis ea voluptates veritatis, magni ab voluptatum repudiandae nemo dignissimos dolor hic corporis at accusamus totam?\nVoluptas totam eveniet enim reiciendis quam iusto quidem? Facilis recusandae exercitationem deserunt velit deleniti repellat consequatur architecto repellendus, eum inventore, ipsa harum odit, sequi aut? Eaque cum suscipit quaerat amet?\nExcepturi eos suscipit beatae velit eveniet aspernatur, quam reprehenderit veritatis. At harum numquam doloremque, minus sed voluptas porro illo sequi facilis. At sint officiis deserunt minus ratione saepe placeat inventore.',
        created: '2022-03-13T13:55:10.265000+07:00',
        updated: '2022-03-13T13:55:10.265000+07:00',
      },
    ],
    images: [
      {
        id: 1,
        image: 'http://product-service:9000/media/images/7352.jpg',
        product: 1,
      },
    ],
  };

  useEffect(() => {
    productsModel.getData({});
  }, []);

  return (
    <div className={styles.container}>
      <Breadcrumb>
        <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item>Sản phẩm</Breadcrumb.Item>
      </Breadcrumb>
      <div className={styles.content}>
        <div className={styles.filter}>
          <div className={styles.filterItem}>
            <span className={styles.filterItemLabel}>Danh mục</span>
            <select className={styles.filterItemSelect}>
              <option value="all">Tất cả</option>
              <option value="t-shirt">Áo thun</option>
              <option value="t-shirt">Áo sơ mi</option>
              <option value="t-shirt">Áo khoác</option>
            </select>
          </div>
          <div className={styles.filterItem}>
            <span className={styles.filterItemLabel}>Trạng thái</span>
            <select className={styles.filterItemSelect}>
              <option value="all">Tất cả</option>
              <option value="on">Đang bán</option>
              <option value="off">Ngừng bán</option>
            </select>
          </div>
        </div>

        <div className={styles.products}>
          <div className={styles.shortBar}>
            <div className={styles.shortBarItem}>
              <span className={styles.shortBarItemLabel}>Sắp xếp</span>
              <select className={styles.shortBarItemSelect}>
                <option value="all">Mặc định</option>
                <option value="on">Giá tăng dần</option>
                <option value="off">Giá giảm dần</option>
              </select>
            </div>
            <div className={styles.shortBarItem}>
              <span className={styles.shortBarItemLabel}>Hiển thị</span>
              <select className={styles.shortBarItemSelect}>
                <option value="all">20</option>
                <option value="on">40</option>
                <option value="off">60</option>
              </select>
            </div>
          </div>

          <div className={styles.danhSach}>
            {productsModel.danhSach.map((product, index) => (
              <div className={styles.productItem} key={index + 1}>
                <div className={styles.productItemImage}>
                  <img
                    src={
                      // product.images[0].image ||
                      String(product?.images[0]?.image).replace(
                        'http://product-service:9000',
                        `${ip}:9116`,
                      ) || ''
                    }
                    alt=""
                  />
                </div>
                <div className={styles.productItemInfo}>
                  <div className={styles.productItemInfoTitle}>
                    <span className={styles.productItemInfoTitleLabel}>
                      {product.title}
                    </span>
                  </div>
                  <div className={styles.productItemInfoPrice}>
                    <span className={styles.productItemInfoPriceLabel}>
                      {product.price} ₫
                    </span>
                  </div>
                  <div className={styles.productItemInfoAction}>
                    <Button
                      type="primary"
                      href={`/products/${product.id}`}
                      className={styles.productItemInfoActionButton}
                    >
                      Chi tiết
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
