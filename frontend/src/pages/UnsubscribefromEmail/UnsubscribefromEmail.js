import Wrapper from "../../components/Wrapper/Wrapper";
import styles from "./UnsubscribefromEmail.module.css";

export const UnsubscribefromEmail = (props) => {
  return (
    <Wrapper>
      <h1 className={styles.header}>
        Sorry to see you go!
        <br /> Successfully Unsubscribed
      </h1>
    </Wrapper>
  );
};
