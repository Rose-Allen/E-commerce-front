import "./App.css";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { Policy } from "./pages/Policy";
import { Pagenotfound } from "./pages/Pagenotfound";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { LoginPage } from "./pages/auth/LoginPage";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import AdminRoute from "./components/Routes/AdminRoute";
import ForgotPassword from "./pages/auth/ForgotPassword";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Categories from "./pages/admin/Categories";
import Products from "./pages/admin/Products";
import Users from "./pages/admin/Users";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/orders" element={<Orders />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<Categories />} />
          <Route path="admin/create-product" element={<Products />} />
          <Route path="admin/users" element={<Users />} />
        </Route>
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/*" element={<Pagenotfound />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </>
  );
}

export default App;
