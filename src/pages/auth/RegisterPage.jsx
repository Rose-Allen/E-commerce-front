import React, { useState } from "react";
import { Layout } from "../../components/Layouts/Layout";
import { toast } from "react-hot-toast";
import "../../styles/AuthStyles.css";
import { useNavigate } from "react-router-dom";
import instance from "../../api/axios";
import axios from "axios";
export const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, email, password, phone, address, answer);
    try {
      const res = await instance.post("/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
        answer,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.error);
      }
    } catch (error) {
      console.log(error);
      toast.error("Не удалось зарегистрироваться!");
    }
  };
  return (
    <Layout title="Регистрация">
      <div className="form-container ">
        <h1>Регистрация</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Введите имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="exampleInputName"
              aria-describedby="nameHelp"
              placeholder="Введите телефон"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="exampleInputAddress"
              aria-describedby="addressHelp"
              placeholder="Введите адрес"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="exampleInputAddress"
              aria-describedby="addressHelp"
              placeholder="Введите любимый вид спорта"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Регистрация
          </button>
        </form>
      </div>
    </Layout>
  );
};
