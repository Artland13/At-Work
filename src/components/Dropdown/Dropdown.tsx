import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@store/useUserStore";
import styles from "./Dropdown.module.scss";
import { useClickOutside } from "@hooks/useClickOutside";

interface DropdownProps {
  userId: number;
  isArchived: boolean;
}

export const Dropdown: React.FC<DropdownProps> = ({ userId, isArchived }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { archiveUser, unarchiveUser, hideUser } = useUserStore();

  useClickOutside(dropdownRef, () => setIsOpen(false));

  const handleEdit = () => {
    navigate(`/EditUser/${userId}`);
    setIsOpen(false);
  };

  const handleArchive = () => {
    archiveUser(userId);
    setIsOpen(false);
  };

  const handleActive = () => {
    unarchiveUser(userId);
    setIsOpen(false);
  };

  const handleHide = () => {
    hideUser(userId);
    setIsOpen(false);
  };

  return (
    <div className={styles.root} ref={dropdownRef}>
      <button className={styles.button} onClick={() => setIsOpen(!isOpen)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16C10.9 16 10 16.9 10 18ZM10 6C10 7.1 10.9 8 12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6ZM10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10C10.9 10 10 10.9 10 12Z"
            fill="currentColor"
          />
        </svg>
      </button>

      {isOpen && (
        <div className={styles.menu}>
          {!isArchived ? (
            <>
              <button onClick={handleEdit} className={styles.menuItem}>
                Редактировать
              </button>
              <button onClick={handleArchive} className={styles.menuItem}>
                Архивировать
              </button>
              <button onClick={handleHide} className={styles.menuItem}>
                Скрыть
              </button>
            </>
          ) : (
            <button onClick={handleActive} className={styles.menuItem}>
              Активировать
            </button>
          )}
        </div>
      )}
    </div>
  );
};
