import { useState } from "react";
import { Button } from "../../components/Button/Button";
import { Dropdown } from "../../components/Dropdown/Dropdown";
import Wrapper from "../../components/Wrapper/Wrapper";
import styles from "./SendEmails.module.css";

export const SendEmails = () => {
  const categories = [
    { category: "All Communities", URLs: [] },
    { category: "Podcasts", URLs: ["www.google.com"] },
    { category: "Skool", URLs: [] },
    { category: "Podcasts", URLs: [] },
  ];
  const [selectedCategory, setSelectedCategory] = useState(null);

  function handleSendClick() {
    //connect to API
  }
  return (
    <Wrapper>
      <label className={styles.labels}>Send Emails To</label>
      <Dropdown
        onDropdownChange={(value) => setSelectedCategory(value)}
        data={categories}
        placeholder={"Choose Community"}
        attribute="category"
      />
      <label className={styles.labels}>Email Body</label>

      <textarea
        rows={18}
        placeholder="Enter the email content..."
        className={styles.emailBody}
      />

      <Button onClick={handleSendClick} buttonLabel="Send Emails" />
    </Wrapper>
  );
};
