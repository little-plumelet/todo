import styles from "./styles.module.css";
import avatar from "../../assets/avatar.png";
import { ITodo } from "../../interfaces/ITodo";

export const Todo: React.FC<ITodo> = ({
  title,
  completed,
  description,
  startDate,
  endDate,
  tagOne,
  tagTwo,
}: ITodo) => {
  return (
    <div className={styles.outerCard}>
      <div className={styles.card}>
        <header>
          <p className={styles.title}>
            <input
              type="checkbox"
              checked={completed}
              className={styles.checkbox}
            />
            {title}
          </p>
        </header>
        <div className={styles.body}>
          <div className={styles.datesContainer}>
            <div className={styles.date}>{startDate}</div>
            <div className={styles.date}>{endDate}</div>
          </div>
          <p className={styles.description}>{description}</p>
        </div>
        <footer className={styles.footer}>
          <div className={styles.tagOne}>{tagOne}</div>
          <div className={styles.tagTwoContainer}>
            <div className={styles.tagTwo}>{tagTwo}</div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="11"
              height="20"
              viewBox="0 0 11 20"
              fill="none"
            >
              <path
                d="M0 0H2.0775C3.29264 0 4.44189 0.552359 5.20098 1.50122L10.001 7.50122C11.1697 8.96209 11.1697 11.0379 10.001 12.4988L5.20098 18.4988C4.44189 19.4476 3.29264 20 2.0775 20H0V0Z"
                fill="#EBEEF6"
              />
            </svg>
          </div>
          <div className={styles.avatarContainer}>
            <img src={avatar} className={styles.avatar} />
          </div>
          
        </footer>
      </div>
    </div>
  );
};
