import styles from "./Button.module.css";

export const Button = (props) => {
  return (
    <button onClick={props.onClick} className={styles.scrapeButton}>
      {props.buttonLabel}
    </button>
  );
};
