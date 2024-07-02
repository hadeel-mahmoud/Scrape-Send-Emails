import { Button } from "../../components/Button/Button";
import Wrapper from "../../components/Wrapper/Wrapper";
import styles from "./SendEmails.module.css";

export const SendEmails = () => {
  function handleSendClick() {
    //connect to API
  }
  return (
    <Wrapper>
      <Button onClick={handleSendClick} buttonLabel="Send Emails" />
    </Wrapper>
  );
};
