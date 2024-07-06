import { useQuery } from "@tanstack/react-query";
import Input from "../../components/common/Input";
import { getAllUsers } from "../../apis/user.api";
import { UserBackEnd } from "../../types/user.type";
import Loading from "../../components/common/Loading";
import UserTable from "../../components/user/UserTable";

const UserList = () => {
  const { data: users, isLoading } = useQuery<{ data: UserBackEnd }>({
    queryKey: ["userList"],
    queryFn: () => getAllUsers(),
    retry: false,
  });
  const userList = users?.data.users;

  return (
    <div className="flex flex-col w-full">
      <h1 className="text-4xl font-bold uppercase tracking-wide">
        Users Management
      </h1>

      <div className="w-full md:w-3/4 lg:w-1/2 mt-2">
        <Input placeholder="Search..." />
      </div>

      <div className="divider" />

      {isLoading ? (
        <div className="grid place-items-center">
          <Loading />
        </div>
      ) : (
        <UserTable userList={userList} />
      )}
    </div>
  );
};

export default UserList;
