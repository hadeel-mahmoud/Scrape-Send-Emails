import { useState } from "react";
import Wrapper from "../../components/Wrapper/Wrapper";
import styles from "./ScrapeEmails.module.css";
import { Button } from "../../components/Button/Button";
import { Dropdown } from "../../components/Dropdown/Dropdown";
export const SrapeEmails = (props) => {
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [selectedURL, setSelectedURL] = useState(null);

  function handleScrapeClick() {}
  return (
    <Wrapper>
      <label className={styles.communityLabel}>
        Choose a Community to Scrape Emails From
      </label>

      <Dropdown
        onDropdownChange={(value) => setSelectedCommunity(value)}
        data={props.communitiesData}
        placeholder={"Choose Community"}
        attribute="category"
      />

      {props.communitiesData[selectedCommunity]?.urls.length > 0 ? (
        <Dropdown
          onDropdownChange={(value) => setSelectedURL(value)}
          data={props.communitiesData[selectedCommunity].urls}
          placeholder={"Choose URL"}
        />
      ) : null}

      {props.communitiesData[selectedCommunity]?.urls.length === 0 ? (
        <p className={styles.noURLsLabel}>No urls for selected community</p>
      ) : null}
      <Button onClick={handleScrapeClick} buttonLabel="Scrape" />
    </Wrapper>
  );
};
