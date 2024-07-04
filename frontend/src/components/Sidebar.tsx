import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import LogoutButton from "./common/LogoutButton";

type Props = {
  tabs: {
    name: string;
    link: string;
  }[];
};

const Sidebar = ({ tabs }: Props) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");

  useEffect(() => {
    if (pathname.split("/")[2]) setActive(pathname.split("/")[2]);
    else setActive("");
  }, [pathname]);

  return (
    <div className="flex flex-col px-4 py-6 rounded-md md:max-w-[20ch] w-full">
      {tabs.map((item) => (
        <Link
          key={item.link}
          to={item.link}
          className={`p-4 rounded-md transition-all whitespace-nowrap hover:bg-neutral hover:font-bold hover:text-neutral-content ${
            active === item.link &&
            "font-bold bg-neutral hover:bg-neutral text-neutral-content"
          }`}
        >
          {item.name}
        </Link>
      ))}

      <div className="border my-4 rounded-full"></div>

      <LogoutButton />
    </div>
  );
};

export default Sidebar;
