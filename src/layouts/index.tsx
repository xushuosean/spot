import { Link, Outlet } from 'umi';
import 'antd/dist/antd.css';
import styles from './index.less';

export default function Layout() {
  return (
    <div className={styles.navs}>
      <Outlet />
    </div>
  );
}
