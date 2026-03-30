import { useParams, useNavigate } from "react-router-dom";
import { useUserStore } from "@store/useUserStore";
import { useState } from "react";
import styles from "./EditUser.module.scss";
import foto from "@img/foto.png";
import backArrow from "@img/backarrow.svg";
import EditUserForm from "@components/EditUserForm/EditUserForm";
import { useUser } from "@hooks/useUsers";
import { IUser } from "types";

export default function EditUser() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { users }: { users: IUser[] } = useUserStore();
  const [activeCategory, setActiveCategory] = useState<number>(0);

  const localUser = users.find((u) => u.id === Number(id));
  const { data: apiUser, isLoading, error } = useUser(Number(id));
  const user = localUser || apiUser;

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
        <p>Ошибка загрузки: {error.message}</p>
        <button onClick={() => navigate("/")} className={styles.backBtn}>
          Вернуться на главную
        </button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={styles.error}>
        <p>Пользователь не найден</p>
        <button onClick={() => navigate("/")} className={styles.backBtn}>
          Вернуться на главную
        </button>
      </div>
    );
  }

  const categories: string[] = [
    "Данные профиля",
    "Рабочее пространство",
    "Приватность",
    "Безопасность",
  ];

  const profileTabsContents = [
    <EditUserForm user={user} />,
    <></>,
    <></>,
    <></>,
  ];

  return (
    <div className={styles.root}>
      <button onClick={() => navigate("/")} className={styles.backButton}>
        <img src={backArrow} alt="backArrow" /> Назад
      </button>
      <div className={styles.container}>
        <aside className={styles.profile}>
          <img src={foto} alt="avatar" className={styles.avatar} />
          <div className={styles.categories}>
            {categories.map((item, index) => (
              <button
                key={index}
                className={`${styles.category} ${activeCategory === index ? styles.activeCategory : ""}`}
                onClick={() => {
                  setActiveCategory(index);
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </aside>
        <section className={styles.profileTabsContent}>
          <h2 className={styles.titleContent}>{categories[activeCategory]}</h2>
          {profileTabsContents[activeCategory]}
        </section>
      </div>
    </div>
  );
}
