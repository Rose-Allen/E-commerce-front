import React from "react";
import { Layout } from "../../components/Layouts/Layout";
import AdminMenu from "../../components/Layouts/AdminMenu";

const Categories = () => {
  return (
    <Layout title={"Админка - создание категории"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h3>Категории</h3>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
