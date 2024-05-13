// import { Setting } from '@/utils/constants';
import { useMediaQuery } from 'react-responsive';
import RightContent from '@/components/RightContent';
import HeaderSearch from '@/components/HeaderSearch';
import HeaderWishList from '@/components/HeaderWishList';
import HeaderCart from '@/components/HeaderCart';
import { useState } from 'react';
import MenuItem from './MenuItem';
import { history, useAccess } from '@umijs/max';

import logo from '@/assets/header/logo.webp';

import styles from './index.less';
import { Typography } from 'antd';

const Header = () => {
  const access = useAccess();

  const isMediumScreen = useMediaQuery({
    query: '(min-width: 950px)',
  });

  const [visible, setVisible] = useState(false);

  const onVisibleChange = (b: boolean) => {
    setVisible(!b);
  };

  return (
    <div className={styles.header}>
      <div className={styles.headerTop}>
        <div className={styles.container}>
          <a href="#" className={styles.logo}>
            <img src={logo} alt="logo" />
          </a>
          <div className={styles.headerText}>
            <h3 className={styles.headerTextTitle}>CỔNG THÔNG TIN ĐIỆN TỬ CHÍNH PHỦ</h3>
            <h3 className={styles.headerTextContent}>BẠN HỌC SỐ</h3>
            <p className={styles.headerTextDescription}>Đưa thầy giỏi đến học sinh nghèo</p>
          </div>
          <div className={styles.headerSearch}>
            <HeaderSearch />
          </div>
        </div>
      </div>
      <div className={styles.headerBottom}>

      </div>
    </div>
  );
};

export default Header;
