import styles from "./Header.module.scss";
import logo from '@img/logo.svg';
import favorite from '@img/favorite.svg';
import notification from '@img/notification.svg';
import foto from '@img/foto.png';
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className={styles.root}>
      <div className={styles.container}>
        <Link to="/">
          <img src={logo} alt="Logo" className={styles.logo} />
        </Link>
        <div className={styles.userActions}>
          <div className={styles.actionIcons}>
            <img src={favorite} alt="favorite" className={styles.favorite} />
            <img src={notification} alt="notification" className={styles.notification} />
          </div>
          <div className={styles.user}>
            <img src={foto} alt="avatar" className={styles.foto} />
            <p className={styles.text}>Ivan123</p>
          </div>
        </div>
      </div>
    </header>
  );
};
