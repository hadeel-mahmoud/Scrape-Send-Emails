import styles from "./Wrapper.module.css";

export default function Wrapper(props) {
  return (
    <div className={styles.fullContainer}>
      <div style={props.style} className={styles.container}>
        {props.children}
      </div>
    </div>
  );
}
