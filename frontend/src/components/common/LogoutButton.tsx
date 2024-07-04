import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutUser } from "../../apis/auth.api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutateAsync: logoutUserApi } = useMutation({
    mutationFn: () => logoutUser(),
    onSuccess: async () => {
      toast.success("Logout successful!");
      await queryClient.invalidateQueries({ queryKey: ["authUser"] });
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return (
    <button className="btn btn-outline" onClick={() => logoutUserApi()}>
      Logout
    </button>
  );
};

export default LogoutButton;
