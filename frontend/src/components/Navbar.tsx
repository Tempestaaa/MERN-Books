import { useQuery } from "@tanstack/react-query";
import { ChevronDown, Menu, Moon, Search, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { User } from "../types/user.type";
import LogoutButton from "./common/LogoutButton";

const navLink = [
  {
    name: "Home",
    link: "/",
    children: false,
  },
  {
    name: "Dashboard",
    link: "/dashboard",
    children: true,
  },
  {
    name: "Profile",
    link: "/profile",
    children: false,
  },
  {
    name: "About",
    link: "/about",
    children: false,
  },
];

const Navbar = () => {
  const { data: user } = useQuery<{ data: User }>({ queryKey: ["authUser"] });

  const [isSticky, setIsSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`max-w-screen-2xl container mx-auto md:px-20  bg-base-100 px-4 ${
        isSticky
          ? "bg-base-200 transition-all duration-300 ease-in-out shadow-md"
          : ""
      } fixed top-0 left-0 right-0`}
    >
      <div className="navbar">
        {/* NAV START */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <Menu />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navLink.map((item) => (
                <li key={item.link}>
                  <NavLink to={item.link}>{item.name}</NavLink>
                </li>
              ))}
            </ul>
          </div>
          <Link to="/" className="text-2xl font-bold">
            BookStore
          </Link>
        </div>

        {/* NAV END */}
        <div className="navbar-end flex gap-2">
          <div className="hidden lg:flex">
            <ul className="menu menu-horizontal px-1 flex-nowrap">
              {navLink.map((item) => (
                <li key={item.link} className="relative">
                  <NavLink to={item.link}>
                    <div className={`dropdown flex items-center`}>
                      <span>{item.name} </span>
                      <span>{item.children && <ChevronDown size={16} />}</span>
                    </div>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden md:block">
            <label className="input input-bordered flex items-center gap-2">
              <input type="search" className="grow" placeholder="Search..." />
              <Search className="opacity-60" />
            </label>
          </div>

          <div className="flex items-center">
            <label className="swap swap-rotate">
              <input
                type="checkbox"
                className="theme-controller"
                value="synthwave"
              />
              <Sun className="swap-off" size={28} />
              <Moon className="swap-on" size={28} />
            </label>
          </div>

          {user ? (
            <LogoutButton />
          ) : (
            <Link to="/login" className="btn btn-neutral">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
