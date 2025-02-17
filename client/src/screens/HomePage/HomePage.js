import React from "react";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/authContext";

const HomePage = () => {
  const [auth, setAuth] = useAuth();

  console.log("auth", auth);

  // ! JSX START
  return (
    <Layout>
      <h1>Welcome {auth?.user?.name}</h1>
      <h2>Email id : {auth?.user?.email}</h2>
      <p>{JSON.stringify(auth)}</p>
    </Layout>
  );
};

export default HomePage;
