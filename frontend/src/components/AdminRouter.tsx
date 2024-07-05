import { useQuery } from "@tanstack/react-query";
import { User } from "../types/user.type";
import { Navigate, Outlet } from "react-router-dom";

const AdminRouter = () => {
  const { data: user } = useQuery<User>({ queryKey: ["authUser"] });
  return user?.isAdmin ? <Outlet /> : <Navigate to="/" replace />;
};

export default AdminRouter;
