import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner";
import instance from "../../api/axios";
import axios from "axios";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();
  useEffect(() => {
    const authCheck = async () => {
      const res = await instance.get("/api/v1/auth/user-auth");
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
}
