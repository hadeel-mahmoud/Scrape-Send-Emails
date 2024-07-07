import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5000";

export const getCommunities = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/communities`);
    return response;
  } catch (error) {
    console.error("Error getting communities", error);
    throw error;
  }
};

export const scrapeEmails = async (communityTypeID, url) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/scrapeEmails/insert-url-scraped-emails`,
      { communityTypeID: communityTypeID, url: url }
    );
    return response;
  } catch (error) {
    console.error("Error getting communities", error);
    throw error;
  }
};

export const unsubscribeFromEmails = async (id) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/sendEmails/update-subscription-status`,
      { id: id }
    );
    return response;
  } catch (error) {
    console.error("Error getting communities", error);
    throw error;
  }
};

export const sendEmails = async (emailBody, communityTypeID) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/sendEmails/send-emails`,
      { communityTypeID: communityTypeID, emailBody: emailBody }
    );
    return response;
  } catch (error) {
    console.error("Error getting communities", error);
    throw error;
  }
};
