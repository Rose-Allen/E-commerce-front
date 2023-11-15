import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Helmet } from "react-helmet";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";
export const Layout = ({ children, title, keywords, author, description }) => {
  return (
    <>
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "80vh" }}>
        <ToastContainer />
        <Toaster />
        {children}
      </main>
      <Footer />
    </>
  );
};

Layout.defaultProps = {
  title: "Ecommerce App",
  description: "mern stack project",
  keywords: "mern,react,node,mongo,express",
  author: "lvlupcode10",
};
