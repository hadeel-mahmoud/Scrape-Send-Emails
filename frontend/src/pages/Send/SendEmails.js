import { useState } from "react";
import { Button } from "../../components/Button/Button";
import { Dropdown } from "../../components/Dropdown/Dropdown";
import Wrapper from "../../components/Wrapper/Wrapper";
import styles from "./SendEmails.module.css";
import Loader from "../../components/Loader/Loader";
import { sendEmails } from "../../services/services";

export const SendEmails = (props) => {
  const communitiesData = props.communitiesData;
  const [emailBody, setEmailBody] = useState(null);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [showLoader, setShowLoader] = useState(false);

  function handleSendClick() {
    // !showLoader is to avoid sending more than one request if user clicks more than once
    if (selectedCommunity && emailBody && !showLoader) {
      setShowLoader(true);
      console.log(11, emailBody, communitiesData[selectedCommunity]["_id"]);
      sendEmails(emailBody, communitiesData[selectedCommunity]["_id"])
        .then((response) => {
          setShowLoader(false);
          if (response.status === 200) {
            alert("Emails Sent Successfuly");
          } else {
            alert("Oops! Something went wrong");
          }
        })
        .catch(function (error) {
          alert(`Oops! Something went wrong ${error}`);
          setShowLoader(false);
        });
    }
  }
  return (
    <Wrapper>
      <label className={styles.labels}>Send Emails To</label>
      <Dropdown
        onDropdownChange={(value) => setSelectedCommunity(value)}
        data={communitiesData}
        placeholder={"Choose Community"}
        attribute="category"
      />
      <label className={styles.labels}>Email Body</label>

      <textarea
        onChange={(event) => {
          setEmailBody(event.target.value);
        }}
        rows={18}
        placeholder="Note: To use spintax variations use this structure: {Hello|Hi}, this is a {test|demo}. Also use <br/> for starting a new line"
        className={styles.emailBody}
      />

      <Button onClick={() => handleSendClick()} buttonLabel="Send Emails" />

      {showLoader ? <Loader /> : null}
    </Wrapper>
  );
};
