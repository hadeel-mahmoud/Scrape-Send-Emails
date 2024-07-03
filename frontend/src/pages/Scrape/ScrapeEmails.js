import { useState } from "react";
import Wrapper from "../../components/Wrapper/Wrapper";
import styles from "./ScrapeEmails.module.css";
import { Button } from "../../components/Button/Button";
import { Dropdown } from "../../components/Dropdown/Dropdown";
export const SrapeEmails = (props) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedURL, setSelectedURL] = useState(null);

  function handleScrapeClick() {
    //connect to API
    // fetch("http://127.0.0.1:5000/things")
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error("Network response was not ok " + response.statusText);
    //     }
    //     return response.json();
    //   })
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((error) => {
    //     console.error("There was a problem with the fetch operation:", error);
    //   });
  }
  return (
    <Wrapper>
      <label className={styles.communityLabel}>
        Choose a Community to Scrape Emails From
      </label>

      <Dropdown
        onDropdownChange={(value) => setSelectedCategory(value)}
        data={props.communitiesData}
        placeholder={"Choose Community"}
        attribute="category"
      />

      {props.communitiesData[selectedCategory]?.URLs.length > 0 ? (
        <Dropdown
          onDropdownChange={(value) => setSelectedURL(value)}
          data={props.communitiesData[selectedCategory].URLs}
          placeholder={"Choose URL"}
        />
      ) : null}

      {props.communitiesData[selectedCategory]?.URLs.length === 0 ? (
        <p className={styles.noURLsLabel}>No URLs for selected community</p>
      ) : null}
      <Button onClick={handleScrapeClick} buttonLabel="Scrape" />
    </Wrapper>
  );
};
