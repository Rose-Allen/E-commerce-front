import React, { useState } from "react";
import { Layout } from "../../components/Layouts/Layout";
import { toast } from "react-hot-toast";
import "../../styles/AuthStyles.css";
import { useLocation, useNavigate } from "react-router-dom";
import instance from "../../api/axios";
import { useAuth } from "../../context/authContext";
import axios from "axios";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    try {
      const res = await instance.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Не удалось войти!");
    }
  };
  return (
    <Layout title="Регистрация">
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
              type="password"
              className="form-control"
              id="exampleInputPassword"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Войти
          </button>
          <div className="mt-3">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Забыл пароль?
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};
