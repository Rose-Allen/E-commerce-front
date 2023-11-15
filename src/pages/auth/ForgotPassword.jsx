import { Layout } from "../../components/Layouts/Layout";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import "../../styles/AuthStyles.css";
import { useLocation, useNavigate } from "react-router-dom";
import instance from "../../api/axios";
import { useAuth } from "../../context/authContext";
import axios from "axios";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [answer, setAnswer] = useState();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, newPassword, answer);
    try {
      const res = await instance.post("/api/v1/auth/forgot-password", {
        email,
        newPassword,
        answer,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Не удалось войти!");
    }
  };

  return (
    <Layout title={"Сброс пароля"}>
      <div className="form-container ">
        <h1>Вход</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Введите email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Введите название вашего любимого спорта"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword"
              placeholder="Введите новый пароль"
              value={newPassword}
              onChange={(e) => setnewPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Воостановить
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
