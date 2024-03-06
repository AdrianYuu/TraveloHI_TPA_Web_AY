import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useUser from "../contexts/user-context";

const GuestRoutes = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user !== null) {
      navigate("/");
    }
  }, []);

  return <Outlet />;
};

export default GuestRoutes;
