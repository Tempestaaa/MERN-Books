import { Check, Trash, X } from "lucide-react";
import { User } from "../../types/user.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../../apis/user.api";
import { toast } from "react-toastify";

type Props = {
  userList: User[] | undefined;
};

const UserTable = ({ userList }: Props) => {
  const queryClient = useQueryClient();
  const { mutateAsync: deleteUserApi, isPending } = useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: async () => {
      toast.success("User deleted");
      await queryClient.invalidateQueries({ queryKey: ["userList"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <section className="overflow-x-auto flex-1">
      <table className="table">
        <thead>
          <tr className="bg-neutral text-neutral-content">
            <th>Avatar</th>
            <th>Username</th>
            <th>Fullname</th>
            <th>Admin</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {userList?.map((item) => (
            <tr key={item._id} className="hover duration-300">
              {/* USER AVATAR */}
              <th>
                <div className="mask mask-squircle h-12 aspect-square mx-auto">
                  <img src={item.image} alt="User Avatar" />
                </div>
              </th>

              {/* USERNAME */}
              <td>
                <span className="line-clamp-2">{item.username}</span>
              </td>

              {/* FULLNAME */}
              <td>
                <span className="line-clamp-2">{item.fullName}</span>
              </td>

              {/* ADMIN */}
              <td>
                {item.isAdmin ? (
                  <Check className="text-green-400" />
                ) : (
                  <X className="text-error" />
                )}
              </td>

              {/* CONTROLLERS */}
              <th>
                <button
                  disabled={isPending}
                  onClick={async () => await deleteUserApi(item._id)}
                >
                  <Trash />
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default UserTable;
