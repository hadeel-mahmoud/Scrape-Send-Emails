import { useState } from "react";
import Wrapper from "../../components/Wrapper/Wrapper";
import styles from "./ScrapeEmails.module.css";
import { Button } from "../../components/Button/Button";
import { Dropdown } from "../../components/Dropdown/Dropdown";
import { scrapeEmails } from "../../services/services";
import Loader from "../../components/Loader/Loader";
export const SrapeEmails = (props) => {
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [selectedURL, setSelectedURL] = useState(null);
  const [showLoader, setShowLoader] = useState(false);

  const communitiesData = props.communitiesData;
  function handleScrapeClick() {
    console.log(communitiesData);
    // !showLoader is to avoid sending more than one request if user clicks more than once
    if (selectedURL && !showLoader) {
      setShowLoader(true);

      scrapeEmails(
        communitiesData[selectedCommunity].id,
        communitiesData[selectedCommunity].urls[selectedURL]
      )
        .then((response) => {
          setShowLoader(false);
          console.log(response);
          if (response.status === 201) {
            alert(
              response.data.message
                ? response.data.message
                : "Emails have been successfuly scraped and saved into the database"
            );
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
  function handleCommunitySelection(value) {
    setSelectedCommunity(value);
    //reset url selection
    setSelectedURL(null);
  }
  return (
    <Wrapper>
      <label className={styles.communityLabel}>
        Choose a Community to Scrape Emails From
      </label>

      <Dropdown
        onDropdownChange={(value) => handleCommunitySelection(value)}
        data={communitiesData}
        placeholder={"Choose Community"}
        attribute="category"
      />

      {communitiesData[selectedCommunity]?.urls.length > 0 ? (
        <Dropdown
          onDropdownChange={(value) => setSelectedURL(value)}
          data={communitiesData[selectedCommunity].urls}
          placeholder={"Choose URL"}
        />
      ) : null}

      {communitiesData[selectedCommunity]?.urls.length === 0 ? (
        <p className={styles.noURLsLabel}>No urls for selected community</p>
      ) : null}
      <Button onClick={() => handleScrapeClick()} buttonLabel="Scrape" />

      {showLoader ? <Loader /> : null}
    </Wrapper>
  );
};
