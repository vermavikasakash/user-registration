import React from "react";
import styles from "./GoogleSignInButton.module.css";

const GoogleSignInButton = () => {
  const googleLoginUrl = `${process.env.REACT_APP_API}/api/v1/auth/google`;

  return (
    <a className={styles.googleButton} href={googleLoginUrl}>
      <span className={styles.googleIcon}>G</span>
      <span>Continue with Google</span>
    </a>
  );
};

export default GoogleSignInButton;
