import { ReactNode } from "react";
import styles from "./InputErrorMessage.module.css";

export default function InputErrorMessage({
  children,
}: {
  children: ReactNode;
}) {
  return <p className={styles.error}>{children}</p>;
}
