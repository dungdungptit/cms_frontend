import { Breadcrumb, Button, Card, Slider, Pagination, Select } from 'antd';
import styles from './index.less';
import { useModel } from 'umi';
import { useEffect } from 'react';
import { ip } from '@/utils/ip';

const HomePage: React.FC = () => {
  const productsModel = useModel('products');

  useEffect(() => {
    productsModel.getData({});
    productsModel.getCategories({});
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
            <Card title="Danh mục">
              <div className={styles.filterItemCategory}>
                <div className={styles.filterItemCategoryItem}>
                  <Button
                    type="link"
                    onClick={() => {
                      productsModel.setCondition({});
                      productsModel.getData({});
                    }}
                    className={styles.filterItemCategoryItemButton}
                  >
                    Tất cả
                  </Button>
                </div>
                {productsModel.categories.map((category, index) => (
                  <div
                    className={styles.filterItemCategoryItem}
                    key={index + 1}
                  >
                    <Button
                      type="link"
                      onClick={() => {
                        productsModel.setCondition({
                          ...productsModel.condition,
                          categories: category.id,
                        });
                        productsModel.getData({
                          ...productsModel.condition,
                          categories: category.id,
                        });
                      }}
                      className={styles.filterItemCategoryItemButton}
                    >
                      {category.name}
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
          <div className={styles.filterItem}>
            <Card title="Giá">
              <div className={styles.filterItemPrice}>
                <div className={styles.filterItemPriceItem}>
                  <Slider
                    range
                    min={0}
                    max={100}
                    marks={{
                      0: '0₫',
                      100: '100.000₫',
                    }}
                    defaultValue={[0, 100]}
                    onChange={(value) => {
                      productsModel.setCondition({
                        ...productsModel.condition,
                        priceStart: value[0],
                        priceEnd: value[1],
                      });
                      productsModel.getData({
                        ...productsModel.condition,
                        priceStart: value[0],
                        priceEnd: value[1],
                      });
                    }}
                  />
                </div>
                <div className={styles.filterItemPriceItem}>
                  <Button
                    type="link"
                    onClick={() => {
                      productsModel.setCondition({
                        ...productsModel.condition,
                        priceStart: 0,
                        priceEnd: 100,
                      });
                      productsModel.getData({});
                    }}
                    className={styles.filterItemPriceItemButton}
                  >
                    Xóa
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className={styles.products}>
          <div className={styles.shortBar}>
            <div className={styles.shortBarItem1}>
              <span className={styles.shortBarItemLabel}>Sắp xếp</span>
              <Select
                defaultValue="all"
                className={styles.shortBarItemSelect}
                options={[
                  { value: 'all', label: 'Mặc định' },
                  { value: 'on', label: 'Giá tăng dần' },
                  { value: 'off', label: 'Giá giảm dần' },
                ]}
                onChange={(value) => {
                  if (value === 'on') {
                    productsModel.setDanhSach([
                      ...productsModel.danhSach.sort(
                        (a, b) => a.price - b.price,
                      ),
                    ]);
                  } else if (value === 'off') {
                    productsModel.setDanhSach([
                      ...productsModel.danhSach.sort(
                        (a, b) => b.price - a.price,
                      ),
                    ]);
                  } else {
                    productsModel.getData({});
                  }
                }}
              />
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
                      {product.price.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'VND',
                      })}{' '}
                      ₫
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

          <div className={styles.shortBarItem}>
            <Pagination
              defaultCurrent={productsModel.condition.page || 1}
              total={productsModel.total}
              onChange={(page) => {
                productsModel.setPage(page);
                productsModel.setCondition({
                  ...productsModel.condition,
                });
                productsModel.getData({
                  ...productsModel.condition,
                  page: page,
                });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
