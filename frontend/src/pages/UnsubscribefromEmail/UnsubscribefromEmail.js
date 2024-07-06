import { useParams } from "react-router-dom";
import Wrapper from "../../components/Wrapper/Wrapper";
import styles from "./UnsubscribefromEmail.module.css";
import { useEffect, useState } from "react";
import { unsubscribeFromEmails } from "../../services/services";
import Loader from "../../components/Loader/Loader";

export const UnsubscribefromEmail = (props) => {
  const { id } = useParams();
  const [showLoader, setShowLoader] = useState(false);
  const [successfulyUnsubscribed, setSuccessfulyUnsubscribed] = useState(false);

  useEffect(() => {
    setShowLoader(true);
    unsubscribeFromEmails(id)
      .then((response) => {
        setShowLoader(false);
        if (response.status === 200) {
          setSuccessfulyUnsubscribed(true);
        } else {
          setSuccessfulyUnsubscribed(true);
        }
      })
      .catch(function (error) {
        setSuccessfulyUnsubscribed(false);
        setShowLoader(false);
      });
  }, [id]);
  return (
    <Wrapper>
      <h1 className={styles.header}>
        Sorry to see you go!
        <br />
      </h1>

      {successfulyUnsubscribed ? (
        <h1 className={styles.header}>Successfully Unsubscribed</h1>
      ) : (
        <h1 className={styles.header}>
          Something went wrong. Please try again later
        </h1>
      )}
      {showLoader ? <Loader /> : null}
    </Wrapper>
  );
};
