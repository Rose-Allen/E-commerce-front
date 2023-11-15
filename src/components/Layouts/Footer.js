import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div className="footer">
      <h1 className="text-center">Все права защищены &copy; E-Commerce</h1>
      <p className="text-center mt-3">
        <Link to="/about">О нас</Link>|<Link to="/contact">Контакты</Link>|
        <Link to="/policy">Политика конфиденциальности</Link>
      </p>
    </div>
  );
};
