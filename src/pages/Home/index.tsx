import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import styles from './index.less';
import Carousel from './components/Carousel';
import { Fragment } from 'react';

const HomePage: React.FC = () => {
  const { name } = useModel('global');
  return (
    <div>
      <Carousel />
      <div className={styles.container}>
        <pre>
          {`
          1, [OK] đăng ký 
          2, [OK] đăng nhập 
          3, [OK] trang chủ
          4, [OK] trang sản phẩm
          5, [OK] trang chi tiết, có comment
          6, [OK] yêu thích
          7, [OK] giỏ hàng
          8, [OK] form(thêm địa chỉ giao hàng)
          9, [OK] form(thanh toán)
          10,[OK] trang thanh toán
          11,[OK] trang đơn hàng
          `}
        </pre>
      </div>
    </div>
  );
};

export default HomePage;
