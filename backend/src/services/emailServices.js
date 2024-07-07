// services/emailService.js
const Email = require("../models/Email");

// Function to query top subscribed emails
const queryTopSubscribedEmails = async (limit) => {
  try {
    const query = { subscribed: true };
    const top50 = await Email.find(query).limit(limit); // Adjust limit as needed
    return top50;
  } catch (error) {
    console.error("Error querying top subscribed emails:", error);
    throw error;
  }
};

module.exports = {
  queryTopSubscribedEmails,
};
