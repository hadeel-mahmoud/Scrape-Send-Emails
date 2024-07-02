import styles from "./Header.module.css";
import icon from "../../assets/email-icon.png";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className={styles.div}>
      <img src={icon} className={styles.icon} alt="Email Icon"></img>
      <button className={styles.button} onClick={() => navigate("/")}>
        Scrape
      </button>
      <button className={styles.button} onClick={() => navigate("sendEmails")}>
        Send
      </button>
    </header>
  );
};
