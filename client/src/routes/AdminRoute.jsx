import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const DataAdmin = () => {
  const user = useSelector((state) => state?.user);
  const token = localStorage.getItem("accesstoken");
  const role = user?.role;
  if (!token) {
    return <Navigate to={"/login"} replace />;
  }

  if (role === undefined) {
    return <div>Loading ... </div>;
  }
  if (role && !role.includes("ADMIN")) {
    return <Navigate to={"/notfound"} replace />;
  }

  return <Outlet />;
};
