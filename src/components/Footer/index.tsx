import { DefaultFooter } from '@ant-design/pro-layout';
import { Layout, Menu, Typography, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import styles from './index.less';
import logofooter from '@/assets/footer/logo-footer.webp';

const listItem1 = ["Tin tức", "Tham vấn chính sách", "Toạ đàm về chính sách", "Chính sách và cuộc sống"];

const listItem2 = ["Lấy ý kiến nhân dân dự thảo VBQPPL",
  "Hướng dẫn thực hiện chính sách",
  "Media"];

export default () => {
  return (
    <div className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.container}>
          <div className={styles.infor}>
            <div className={styles.inforTop}>
              <a href="#" className={styles.image}>
                <img src={logofooter} alt="logo" style={{ width: 147 }} />
              </a>
              <div className={styles.name}>
                <p className={styles.text1}>© CỔNG THÔNG TIN ĐIỆN TỬ CHÍNH PHỦ</p>
                <p className={styles.text1}>Tổng Giám đốc: Nguyễn Hồng Sâm</p>
              </div>
            </div>
            <div className={styles.address}>
              <p className={styles.text2}>Trụ sở: 16 Lê Hồng Phong - Ba Đình - Hà Nội; Điện thoại: 080.43162</p>
              <p className={styles.text2}>Fax: 080.48924; Email: thongtinchinhphu@chinhphu.vn</p>
            </div>
          </div>
          <ul className={styles.menu}>
            {listItem1.map((item, index) => (
              <li key={index} className={styles.text3}><a href="#">{item}</a></li>
            ))}
          </ul>
          <ul className={styles.menu}>
            {listItem2.map((item, index) => (
              <li key={index} className={styles.text3}><a href="#">{item}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.container}>
          <p className={styles.textBottom}>Bản quyền thuộc Cổng Thông tin điện tử Chính phủ.</p>
          <p className={styles.textBottom}>Ghi rõ nguồn 'Cổng Thông tin điện tử Chính phủ' hoặc 'www.chinhphu.vn' khi phát hành lại thông tin từ các nguồn này.</p>
        </div>
      </div>
    </div >
  );
};
