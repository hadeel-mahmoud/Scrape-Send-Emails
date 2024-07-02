import { useState } from "react";
import Wrapper from "../../components/Wrapper/Wrapper";
import styles from "./ScrapeEmails.module.css";
export const SrapeEmails = () => {
  const categories = [
    { category: "Podcasts", URLs: ["www.google.com"] },
    { category: "Skool", URLs: [] },
    { category: "Podcasts", URLs: [] },
  ];
  const [selectedCategory, setSelectedCategory] = useState(null);
  function handleScrapeClick() {
    //connect to API
  }
  return (
    <Wrapper>
      <label className={styles.communityLabel}>
        Choose a Community to Scrape Emails From
      </label>

      <select
        className={styles.dropdown}
        defaultValue={"DEFAULT"}
        onChange={(event) => {
          setSelectedCategory(event.target.value);
        }}
      >
        <option value={"DEFAULT"} disabled>
          Choose
        </option>
        {categories.map((category, index) => (
          <option key={index} value={index}>
            {category.category}
          </option>
        ))}
      </select>

      {categories[selectedCategory]?.URLs.length > 0 ? (
        <select
          onChange={(index) => {
            setSelectedCategory(index);
          }}
        >
          {categories[selectedCategory].URLs?.map((URL, index) => (
            <option key={index} value={index}>
              {URL}
            </option>
          ))}
        </select>
      ) : null}

      {categories[selectedCategory]?.URLs.length === 0 ? (
        <p className={styles.noURLsLabel}>No URLs for selected community</p>
      ) : null}
      <button onClick={handleScrapeClick} className={styles.scrapeButton}>
        Scrape
      </button>
    </Wrapper>
  );
};
