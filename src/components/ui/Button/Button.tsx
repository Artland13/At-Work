import { CSSProperties } from "react";
import styles from "./Button.module.scss";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  style?: CSSProperties;
}

export default function Button({
  title,
  onClick,
  type = "button",
  disabled = false,
  style,
  ...props
}: IProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={styles.root}
      style={style}
      {...props}
    >
      {title}
    </button>
  );
}
