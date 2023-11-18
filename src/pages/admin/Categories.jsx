import React, { useEffect, useState } from "react";
import { Layout } from "../../components/Layouts/Layout";
import AdminMenu from "../../components/Layouts/AdminMenu";
import toast from "react-hot-toast";
import instance from "../../api/axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await instance.post("/api/v1/category/create-category", {
        name,
      });
      console.log("data", data);
      if (data.success) {
        toast.success(`${name} успешно создан`);
        setName("");
        getAllCategory();
      } else {
        toast.error(`${data.message}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await instance.put(
        `/api/v1/category/update-category/${selected}`,
        {
          name: updatedName,
        }
      );
      console.log("data", data);
      if (data.success) {
        toast.success(data.message);
        setUpdatedName("");
        setSelected(null);
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleDelete = async (id) => {
    try {
      const { data } = await instance.delete(
        `/api/v1/category/delete-category/${id}`
      );
      console.log("data", data);
      if (data.success) {
        toast.success(data.message);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getAllCategory = async () => {
    try {
      const { data } = await instance.get("/api/v1/category/get-category");
      console.log("data", data);
      if (data.success) {
        setCategories(data.categories);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);
  return (
    <Layout title={"Админка - создание категории"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h3>Категории</h3>
            <div className="p-3 w-50">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">id</th>
                    <th scope="col">Название</th>
                    <th scope="col">Действие</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((c) => (
                    <>
                      <tr>
                        <th scope="row">{c._id}</th>

                        <td key={c._id}>{c.name}</td>
                        <td>
                          <button
                            className="btn btn-primary btn-sm ms-2"
                            onClick={() => {
                              setVisible(true);
                              setUpdatedName(c.name);
                              setSelected(c._id);
                            }}
                          >
                            Редактировать
                          </button>
                          <button
                            className="btn btn-danger btn-sm ms-2"
                            onClick={() => handleDelete(c._id)}
                          >
                            Удалить
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              visible={visible}
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
