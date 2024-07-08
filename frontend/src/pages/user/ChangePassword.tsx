import { useForm } from "react-hook-form";
import Input from "../../components/common/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UserDataUpdatePassword,
  UserUpdatePassword,
} from "../../types/user.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePassword } from "../../apis/user.api";
import { toast } from "react-toastify";
import Loading from "../../components/common/Loading";

const ChangePassword = () => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserUpdatePassword>({
    resolver: zodResolver(UserDataUpdatePassword),
  });
  const { mutateAsync: updatePasswordApi, isPending } = useMutation({
    mutationFn: (formData: UserUpdatePassword) => updatePassword(formData),
    onSuccess: async () => {
      toast.success("Password updated");
      await queryClient.invalidateQueries({ queryKey: ["authUser"] });
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
      reset();
    },
  });

  const onSubmit = async (data: UserUpdatePassword) => {
    await updatePasswordApi(data);
  };

  return (
    <div className="w-full">
      <h1 className="text-4xl font-bold uppercase tracking-wide text-center md:text-left">
        Change Password
      </h1>

      <div className="divider" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 w-full md:w-1/2 lg:w-1/3"
      >
        <Input
          type="password"
          label="Old password"
          {...register("oldPassword")}
          error={errors.oldPassword}
        />
        <Input
          type="password"
          label="New password"
          {...register("newPassword")}
          error={errors.newPassword}
        />
        <Input
          type="password"
          label="Confirm password"
          {...register("confirm")}
          error={errors.confirm}
        />
        <button disabled={isPending} className="btn btn-neutral mt-2">
          {isPending ? <Loading /> : "Update"}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
