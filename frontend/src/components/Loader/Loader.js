import styles from "./Loader.module.css"; // Optional: For styling the loader

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default Loader;
