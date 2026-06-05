import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/authContext";
import styles from "./Register.module.css";

const GoogleAuthSuccess = () => {
  const [, setAuth] = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const authParam = searchParams.get("auth");

    if (!authParam) {
      toast.error("Google sign-in failed");
      navigate("/");
      return;
    }

    try {
      const authData = JSON.parse(authParam);
      setAuth({ user: authData.user, token: authData.token });
      localStorage.setItem("auth", JSON.stringify(authData));
      toast.success(authData.message);
      navigate("/home-page");
    } catch (error) {
      toast.error("Google sign-in failed");
      navigate("/");
    }
  }, [navigate, searchParams, setAuth]);

  return (
    <Layout>
      <div className={styles.register}>
        <p className={styles.authHint}>Signing you in with Google...</p>
      </div>
    </Layout>
  );
};

export default GoogleAuthSuccess;
