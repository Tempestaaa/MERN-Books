import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Input from "../../components/common/Input";
import {
  User,
  UserDataUpdateProfile,
  UserUpdateProfile,
} from "../../types/user.type";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfile } from "../../apis/user.api";
import { toast } from "react-toastify";
import convertToBase64 from "../../utils/convertBase64";
import Loading from "../../components/common/Loading";

const Profile = () => {
  const queryClient = useQueryClient();
  const { data: user } = useQuery<User>({ queryKey: ["authUser"] });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserUpdateProfile>({
    resolver: zodResolver(UserDataUpdateProfile),
    values: user,
  });
  const { mutateAsync: updateProfileApi, isPending } = useMutation({
    mutationFn: (formData: UserUpdateProfile) => updateProfile(formData),
    onSuccess: async () => {
      toast.success("Profile updated");
      await queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = async (data: UserUpdateProfile) => {
    if (data.image && typeof data.image !== "string") {
      const b64 = await convertToBase64(data.image[0]);
      const userData = { ...data, image: b64 };
      updateProfileApi(userData);
    } else {
      updateProfileApi(data);
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-4xl font-bold uppercase tracking-wide text-center md:text-left">
        Profile
      </h1>

      <div className="divider" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 w-full md:w-1/2 lg:w-1/3"
      >
        <label className="w-40 aspect-square rounded-full overflow-hidden mx-auto border-2 border-neutral grid place-items-center">
          <img src={user?.image} alt="User Avatar" className="object-cover" />
          <input
            disabled={isPending}
            type="file"
            accept="image/*"
            {...register("image")}
            className="hidden"
          />
        </label>
        <Input
          label="Username"
          {...register("username")}
          error={errors.username}
        />
        <Input
          label="Fullname"
          {...register("fullName")}
          error={errors.fullName}
        />
        <button disabled={isPending} className="btn btn-neutral mt-2">
          {isPending ? <Loading /> : "Update"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
