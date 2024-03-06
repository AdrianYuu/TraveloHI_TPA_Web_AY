import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useUser from "../contexts/user-context";

const AuthenticatedRoutes = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === undefined || user === null) {
      navigate("/login");
    }
  }, []);

  return <Outlet />;
};

export default AuthenticatedRoutes;
