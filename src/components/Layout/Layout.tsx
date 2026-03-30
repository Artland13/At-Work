import { type ReactNode } from 'react';
import styles from "./Layout.module.scss";
import { Header } from "../Header/Header";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <main className={styles.main}>{children}</main>
    </>
  );
};
