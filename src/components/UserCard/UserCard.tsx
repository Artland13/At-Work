import { Dropdown } from "@components/Dropdown/Dropdown";
import styles from "./UserCard.module.scss";
import foto from "@img/foto.png";

interface IUser {
  id: number;
  username: string;
  company: string;
  city: string;
  isArchived: boolean;
}

export default function UserCard({
  id,
  username,
  company,
  city,
  isArchived,
}: IUser): React.ReactElement {
  return (
    <div className={styles.root}>
      <img
        className={`${styles.foto} ${isArchived ? styles.isArchived : ""}`}
        src={foto}
        alt="foto"
      />
      <div className={styles.container}>
        <div className={styles.info}>
          <p className={styles.headline} title={username}>
            {username}
          </p>
          <p className={styles.text2} title={company}>
            {company}
          </p>
          <p className={styles.caption} title={city}>
            {city}
          </p>
        </div>
        <Dropdown userId={id} isArchived={isArchived} />
      </div>
    </div>
  );
}
