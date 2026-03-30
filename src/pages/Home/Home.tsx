import UserCard from "@components/UserCard/UserCard";
import styles from "./Home.module.scss";
import { useUserStore } from "@store/useUserStore";
import { useUsers } from "@hooks/useUsers";
import { UseQueryResult } from "@tanstack/react-query";
import { useMemo } from "react";
import { IUser } from "types";

export default function Home(): React.ReactElement {
  const { users }: { users: IUser[] } = useUserStore();
  const { isLoading, error }: UseQueryResult<IUser[], Error> = useUsers();

  const { activeUsers, archivedUsers } = useMemo(
    () => ({
      activeUsers: users.filter((item) => !item.isArchived && !item.isHidden),
      archivedUsers: users.filter((item) => item.isArchived && !item.isHidden),
    }),
    [users],
  );

  if (isLoading) {
    return (
      <div className={styles.loader}>
        <p>Загрузка данных пользователя...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p className={styles.errorText}>
          Ошибка загрузки данных: {error.message}
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Дублирование кода для повышения читаемости(пишет не нейронка)*/}
      <section className={styles.root}>
        <h2 className={styles.title}>Активные</h2>
        <div className={styles.separator}></div>
        <div className={styles.container}>
          {activeUsers.map((item) => (
            <UserCard
              key={item.id}
              id={item.id}
              username={item.username}
              city={item.address.city}
              company={item.company.name}
              isArchived={item.isArchived}
            />
          ))}
        </div>
      </section>
      <section className={styles.root}>
        <h2 className={styles.title}>Архив</h2>
        <div className={styles.separator}></div>
        <div className={styles.container}>
          {archivedUsers.map((item) => (
            <UserCard
              key={item.id}
              id={item.id}
              username={item.username}
              city={item.address.city}
              company={item.company.name}
              isArchived={item.isArchived}
            />
          ))}
        </div>
      </section>
    </>
  );
}
