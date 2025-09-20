import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import isAdminContext from "../context/isAdminContext";
import { useSelector } from "react-redux";



const ProtectedRoutes = ({ children }) => {
  // const { isAdmin } = useContext(isAdminContext)
  const isAdmin = useSelector((state) => state.admin.status);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) navigate("/admin-login");
  }, []);

  return children;
};

export default ProtectedRoutes;
