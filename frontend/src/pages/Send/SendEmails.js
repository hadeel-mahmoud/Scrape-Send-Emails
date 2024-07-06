import { useState } from "react";
import { Button } from "../../components/Button/Button";
import { Dropdown } from "../../components/Dropdown/Dropdown";
import Wrapper from "../../components/Wrapper/Wrapper";
import styles from "./SendEmails.module.css";

export const SendEmails = (props) => {
  const [selectedCommunity, setSelectedCommunity] = useState(null);

  function handleSendClick() {
    //connect to API
  }
  return (
    <Wrapper>
      <label className={styles.labels}>Send Emails To</label>
      <Dropdown
        onDropdownChange={(value) => setSelectedCommunity(value)}
        data={props.communitiesData}
        placeholder={"Choose Community"}
        attribute="category"
      />
      <label className={styles.labels}>Email Body</label>

      <textarea
        rows={18}
        placeholder="Note: To use spintax variations use this structure: {Hello|Hi}, this is a {test|demo}. Also use <br/> for starting a new line"
        className={styles.emailBody}
      />

      <Button onClick={handleSendClick} buttonLabel="Send Emails" />
    </Wrapper>
  );
};
