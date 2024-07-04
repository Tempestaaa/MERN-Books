import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/common/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserDataLogin, UserLogin } from "../../types/user.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "../../apis/auth.api";
import { toast } from "react-toastify";
import Loading from "../../components/common/Loading";

const Login = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserLogin>({
    resolver: zodResolver(UserDataLogin),
  });

  const { mutateAsync: loginUserApi, isPending } = useMutation({
    mutationFn: (formData: UserLogin) => loginUser(formData),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("Login successful!");
      navigate("/", { replace: true });
    },
    onError: (error) => {
      toast.error(error.message);
      reset();
    },
  });

  const onSubmit = async (data: UserLogin) => {
    loginUserApi(data);
  };

  return (
    <div className="grid place-items-center w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 w-full md:w-1/2 lg:w-1/3"
      >
        <h1 className="uppercase font-bold text-4xl text-center">LOGIN</h1>
        <Input
          label="Username"
          autoComplete="username"
          {...register("username")}
          error={errors.username}
        />
        <Input
          type="password"
          label="Password"
          autoComplete="current-password"
          {...register("password")}
          error={errors.password}
        />
        <button className="btn btn-secondary mt-2" disabled={isPending}>
          {isPending ? <Loading /> : "Login"}
        </button>
        <p className="text-xs">
          Don't have an account?
          <Link to="/register" className="ml-1 font-bold text-error link">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
