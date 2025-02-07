import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";


const ProtectedRoutes = () => {
  const user = useSelector((state) => state.auth.user);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (!user) {
      toast.error(t("Please Login"));
    }
  }, [user]);

  if (!user) {
    return <Navigate to="/" />;
  }

  return <Outlet/>; 
};

export default ProtectedRoutes;
