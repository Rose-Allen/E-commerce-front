import React from "react";
import { Layout } from "../components/Layouts/Layout";
import { useAuth } from "../context/authContext";

export const HomePage = () => {
  const [auth, setAuth] = useAuth();
  return (
    <Layout title="Главная">
      <h1>HomePage</h1>
      <pre>{JSON.stringify(auth, null, 4)}</pre>
    </Layout>
  );
};
