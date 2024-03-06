import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useUser from "../contexts/user-context";

const AdminRoutes = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === undefined || user === null) {
      navigate("/login");
    } else if (user.RoleID !== 1) {
      navigate("/");
    }
  }, [user, navigate]);

  return <Outlet />;
};

export default AdminRoutes;
