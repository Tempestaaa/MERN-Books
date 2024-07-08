import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const tabs = [
  {
    name: "Profile",
    link: "",
  },
  {
    name: "Change password",
    link: "change-password",
  },
  {
    name: "Favourites",
    link: "favourites",
  },
];
const ProfileLayout = () => {
  return (
    <div className="w-full flex flex-col md:flex-row gap-2">
      <Sidebar tabs={tabs} />
      <Outlet />
    </div>
  );
};

export default ProfileLayout;
