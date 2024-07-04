import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const tabs = [
  {
    name: "Dashboard",
    link: "",
  },
  {
    name: "Books",
    link: "books",
  },
  {
    name: "Add book",
    link: "add-book",
  },
  {
    name: "Users",
    link: "users",
  },
  {
    name: "Genres",
    link: "genres",
  },
];

const DashboardLayout = () => {
  return (
    <div className="w-full flex flex-col md:flex-row gap-2">
      <Sidebar tabs={tabs} />
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
