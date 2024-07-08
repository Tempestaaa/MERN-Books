import { useQuery } from "@tanstack/react-query";
import { User } from "../types/user.type";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRouter = () => {
  const { data: user } = useQuery<User>({ queryKey: ["authUser"] });
  return user ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRouter;
