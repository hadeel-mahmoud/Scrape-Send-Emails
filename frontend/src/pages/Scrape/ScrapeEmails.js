import { useState } from "react";
import Wrapper from "../../components/Wrapper/Wrapper";
import styles from "./ScrapeEmails.module.css";
import { Button } from "../../components/Button/Button";
import { Dropdown } from "../../components/Dropdown/Dropdown";
export const SrapeEmails = () => {
  const categories = [
    { category: "Podcasts", URLs: ["www.google.com"] },
    { category: "Skool", URLs: [] },
    { category: "Podcasts", URLs: [] },
  ];
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedURL, setSelectedURL] = useState(null);

  function handleScrapeClick() {
    //connect to API
  }
  return (
    <Wrapper>
      <label className={styles.communityLabel}>
        Choose a Community to Scrape Emails From
      </label>

      <Dropdown
        onDropdownChange={(value) => setSelectedCategory(value)}
        data={categories}
        placeholder={"Choose Community"}
        attribute="category"
      />

      {categories[selectedCategory]?.URLs.length > 0 ? (
        <Dropdown
          onDropdownChange={(value) => setSelectedURL(value)}
          data={categories[selectedCategory].URLs}
          placeholder={"Choose URL"}
        />
      ) : null}

      {categories[selectedCategory]?.URLs.length === 0 ? (
        <p className={styles.noURLsLabel}>No URLs for selected community</p>
      ) : null}
      <Button onClick={handleScrapeClick} buttonLabel="Scrape" />
    </Wrapper>
  );
};
