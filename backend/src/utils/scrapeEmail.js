const scrapeEmails = (html_data, communityTypeID) => {
  const emailPattern = /[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/g;
  // match into set so that we make sure there are no email duplicates =>
  const emailAddresses = new Set(html_data.match(emailPattern) || []);
  // add attributes to email object before creating
  return manipulateDataForm(Array.from(emailAddresses), communityTypeID);
};

const manipulateDataForm = (emails, communityTypeID) => {
  const emailObjects = emails.map((email) => ({
    email,
    communityTypeID,
  }));
  return emailObjects;
};
module.exports = scrapeEmails;
