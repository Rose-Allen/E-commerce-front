import React from "react";
import { Link } from "react-router-dom";
import { Layout } from "../components/Layouts/Layout";

export const Pagenotfound = () => {
  return (
    <Layout title="Страница не найдена!">
      <div className="pnf">
        <h1 className="pnf-title">404</h1>
        <h2 className="pnf-heading">Ой! Страница не найдена</h2>
        <Link to="/" className="pnf-btn">
          Вернуться назад
        </Link>
      </div>
    </Layout>
  );
};
