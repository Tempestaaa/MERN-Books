import { zodResolver } from "@hookform/resolvers/zod";
import { UserDataRegister, UserRegister } from "../../types/user.type";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerUser } from "../../apis/auth.api";
import { toast } from "react-toastify";
import Input from "../../components/common/Input";
import Loading from "../../components/common/Loading";

const Register = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserRegister>({
    resolver: zodResolver(UserDataRegister),
  });

  const { mutateAsync: registerUserApi, isPending } = useMutation({
    mutationFn: (formData: UserRegister) => registerUser(formData),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("Registration successful!");
      navigate("/", { replace: true });
    },
    onError: (error) => {
      toast.error(error.message);
      reset();
    },
  });

  const onSubmit = async (data: UserRegister) => {
    registerUserApi(data);
  };

  return (
    <div className="grid place-items-center w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 w-full md:w-1/2 lg:w-1/3"
      >
        <h1 className="uppercase font-bold text-4xl text-center">REGISTER</h1>
        <Input
          label="Username"
          autoComplete="username"
          {...register("username")}
          error={errors.username}
        />
        <Input
          label="Full name"
          autoComplete="name"
          {...register("fullName")}
          error={errors.fullName}
        />
        <Input
          type="password"
          label="Password"
          autoComplete="new-password"
          {...register("password")}
          error={errors.password}
        />
        <Input
          type="password"
          label="Confirm password"
          autoComplete="new-password"
          {...register("confirm")}
          error={errors.confirm}
        />
        <button className="btn btn-secondary mt-2" disabled={isPending}>
          {isPending ? <Loading /> : "Register"}
        </button>
        <p className="text-xs">
          Already have an account?
          <Link to="/login" className="ml-1 font-bold text-error link">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
